/**
 * feedback-intelligence.ts
 *
 * Stores intent-level feedback from iteration-verify responses and returns
 * route-scoped boost tables that the workflow-audit resolver uses to rerank
 * its fix list by historical miss rate.
 *
 * No external dependencies beyond pg (already a project dependency).
 * Gracefully degrades to empty boosts on DB-unavailable or cold-start paths.
 */

import pg from "pg";

// ─── Types ───────────────────────────────────────────────────────────────────

export type BoostTable = Record<string, number>; // intentCategory -> missRate 0.0–1.0

type IntentCounts = { missed: number; honored: number };

export type FeedbackSignal = {
  route: string;
  intentCategory: string;
  wasHonored: boolean;
  verificationStatus?: string;
};

export type BulkFeedbackPayload = {
  route: string;
  verificationStatus: string;
  intentMap: {
    honored: Array<{ item: string; intents: string[]; method?: string }>;
    missed: Array<{ item: string; intents: string[] }>;
  };
};

// ─── In-memory accumulator ───────────────────────────────────────────────────
// Survives within a warm serverless instance. On cold starts this is empty
// and the DB read fills it; on warm instances it accumulates between calls.

const memoryCache = new Map<string, IntentCounts>();

function cacheKey(route: string, intentCategory: string) {
  return `${route}\x00${intentCategory}`;
}

function accumulateMemory(route: string, intentCategory: string, wasHonored: boolean) {
  const key = cacheKey(route, intentCategory);
  const current = memoryCache.get(key) ?? { missed: 0, honored: 0 };
  if (wasHonored) {
    current.honored++;
  } else {
    current.missed++;
  }
  memoryCache.set(key, current);
}

// ─── Database pool ───────────────────────────────────────────────────────────
// Lazy singleton. Uses a small pool separate from the main storage pool
// so feedback I/O doesn't compete with catalog queries.

let _pool: pg.Pool | null = null;
let _dbReady = false;   // table has been created
let _dbAvailable = true; // set false on any irrecoverable error

function getPool(): pg.Pool | null {
  if (!process.env.DATABASE_URL) return null;
  if (!_dbAvailable) return null;
  if (!_pool) {
    _pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      max: 2,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 3_000,
    });
    _pool.on("error", () => {
      _dbAvailable = false;
    });
  }
  return _pool;
}

async function ensureTable(): Promise<void> {
  const pool = getPool();
  if (!pool) return;
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS agent_feedback_signals (
        id          SERIAL PRIMARY KEY,
        route       TEXT          NOT NULL,
        intent_cat  TEXT          NOT NULL,
        was_honored BOOLEAN       NOT NULL,
        verify_status TEXT,
        created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
      )
    `);
    await pool.query(`
      CREATE INDEX IF NOT EXISTS afb_route_cat_idx
        ON agent_feedback_signals (route, intent_cat)
    `);
    _dbReady = true;
  } catch {
    _dbAvailable = false;
  }
}

async function withDb(fn: (pool: pg.Pool) => Promise<void>): Promise<void> {
  const pool = getPool();
  if (!pool) return;
  if (!_dbReady) await ensureTable();
  if (!_dbAvailable) return;
  try {
    await fn(pool);
  } catch {
    // Never throw from feedback ops — degrades silently
  }
}

// ─── Write ───────────────────────────────────────────────────────────────────

export async function recordFeedback(signal: FeedbackSignal): Promise<void> {
  accumulateMemory(signal.route, signal.intentCategory, signal.wasHonored);

  // Fire-and-forget DB write — don't await in hot path
  withDb(async (pool) => {
    await pool.query(
      `INSERT INTO agent_feedback_signals (route, intent_cat, was_honored, verify_status)
       VALUES ($1, $2, $3, $4)`,
      [signal.route, signal.intentCategory, signal.wasHonored, signal.verificationStatus ?? null],
    );
  });
}

export async function bulkRecordFromVerifyResponse(payload: BulkFeedbackPayload): Promise<void> {
  const writes: Promise<void>[] = [];

  for (const { intents } of payload.intentMap.honored) {
    for (const intent of intents) {
      writes.push(
        recordFeedback({
          route: payload.route,
          intentCategory: intent,
          wasHonored: true,
          verificationStatus: payload.verificationStatus,
        }),
      );
    }
  }

  for (const { intents } of payload.intentMap.missed) {
    for (const intent of intents) {
      writes.push(
        recordFeedback({
          route: payload.route,
          intentCategory: intent,
          wasHonored: false,
          verificationStatus: payload.verificationStatus,
        }),
      );
    }
  }

  await Promise.all(writes);
}

// ─── Read ────────────────────────────────────────────────────────────────────

const MIN_SAMPLES_MEMORY = 3; // minimum observations before memory boost activates
const MIN_SAMPLES_DB = 5;     // minimum observations before DB boost activates

export async function getRouteBoosts(route: string): Promise<BoostTable> {
  const result: BoostTable = {};

  // Seed from in-memory accumulator
  for (const [key, counts] of Array.from(memoryCache.entries())) {
    const [r, ...catParts] = key.split("\x00");
    if (r !== route) continue;
    const cat = catParts.join("\x00");
    const total = counts.missed + counts.honored;
    if (total >= MIN_SAMPLES_MEMORY) {
      result[cat] = counts.missed / total;
    }
  }

  // Merge DB aggregates — DB wins on overlap (larger sample)
  await withDb(async (pool) => {
    const { rows } = await pool.query<{
      intent_cat: string;
      miss_count: string;
      honor_count: string;
    }>(
      `SELECT intent_cat,
              SUM(CASE WHEN was_honored = false THEN 1 ELSE 0 END)::text AS miss_count,
              SUM(CASE WHEN was_honored = true  THEN 1 ELSE 0 END)::text AS honor_count
       FROM agent_feedback_signals
       WHERE route = $1
       GROUP BY intent_cat
       HAVING COUNT(*) >= $2`,
      [route, MIN_SAMPLES_DB],
    );

    for (const row of rows) {
      const missed = parseInt(row.miss_count, 10);
      const honored = parseInt(row.honor_count, 10);
      const total = missed + honored;
      if (total > 0) {
        result[row.intent_cat] = missed / total;
      }
    }
  });

  return result;
}

export async function getRouteBoostsSafe(route: string): Promise<BoostTable> {
  try {
    return await getRouteBoosts(route);
  } catch {
    return {};
  }
}

// ─── Stats (for GET /api/agent/feedback) ─────────────────────────────────────

type FeedbackStats = {
  route: string;
  sampleSize: number;
  boosts: BoostTable;
  topMissedCategories: Array<{ category: string; missRate: string; samples: number }>;
  topHonoredCategories: Array<{ category: string; honorRate: string; samples: number }>;
  dataSource: "db" | "memory" | "none";
};

export async function getRouteFeedbackStats(route: string): Promise<FeedbackStats> {
  const boosts = await getRouteBoostsSafe(route);
  let sampleSize = 0;
  let dataSource: FeedbackStats["dataSource"] = "none";

  // Collect per-category stats from DB
  const categoryStats: Array<{
    category: string;
    missed: number;
    honored: number;
  }> = [];

  await withDb(async (pool) => {
    const { rows } = await pool.query<{
      intent_cat: string;
      miss_count: string;
      honor_count: string;
    }>(
      `SELECT intent_cat,
              SUM(CASE WHEN was_honored = false THEN 1 ELSE 0 END)::text AS miss_count,
              SUM(CASE WHEN was_honored = true  THEN 1 ELSE 0 END)::text AS honor_count
       FROM agent_feedback_signals
       WHERE route = $1
       GROUP BY intent_cat`,
      [route],
    );

    for (const row of rows) {
      const missed = parseInt(row.miss_count, 10);
      const honored = parseInt(row.honor_count, 10);
      categoryStats.push({ category: row.intent_cat, missed, honored });
      sampleSize += missed + honored;
    }
    if (categoryStats.length > 0) dataSource = "db";
  });

  // Fall back to memory if DB empty
  if (categoryStats.length === 0) {
    for (const [key, counts] of Array.from(memoryCache.entries())) {
      const [r, ...catParts] = key.split("\x00");
      if (r !== route) continue;
      categoryStats.push({ category: catParts.join("\x00"), ...counts });
      sampleSize += counts.missed + counts.honored;
    }
    if (categoryStats.length > 0) dataSource = "memory";
  }

  const sorted = [...categoryStats].sort((a, b) => {
    const aTotal = a.missed + a.honored;
    const bTotal = b.missed + b.honored;
    const aMiss = aTotal > 0 ? a.missed / aTotal : 0;
    const bMiss = bTotal > 0 ? b.missed / bTotal : 0;
    return bMiss - aMiss;
  });

  const topMissed = sorted
    .filter((c) => c.missed + c.honored >= 3)
    .slice(0, 5)
    .map((c) => {
      const total = c.missed + c.honored;
      return {
        category: c.category,
        missRate: Math.round((c.missed / total) * 100) + "%",
        samples: total,
      };
    });

  const topHonored = [...categoryStats]
    .sort((a, b) => {
      const aTotal = a.missed + a.honored;
      const bTotal = b.missed + b.honored;
      const aHonor = aTotal > 0 ? a.honored / aTotal : 0;
      const bHonor = bTotal > 0 ? b.honored / bTotal : 0;
      return bHonor - aHonor;
    })
    .filter((c) => c.missed + c.honored >= 3)
    .slice(0, 5)
    .map((c) => {
      const total = c.missed + c.honored;
      return {
        category: c.category,
        honorRate: Math.round((c.honored / total) * 100) + "%",
        samples: total,
      };
    });

  return {
    route,
    sampleSize,
    boosts,
    topMissedCategories: topMissed,
    topHonoredCategories: topHonored,
    dataSource,
  };
}
