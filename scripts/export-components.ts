/**
 * Exports all exhibit data from the database to static files:
 *   components/{slug}.tsx   — raw React component source (one file per exhibit)
 *   components.json         — full index (metadata + code + GitHub raw URLs)
 *   categories.json         — category list with counts and slugs
 *
 * Run: npx tsx scripts/export-components.ts
 */

import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { db } from "../server/storage.ts";
import { exhibits } from "../shared/schema.ts";
import { asc } from "drizzle-orm";

const GITHUB_RAW_BASE =
  "https://raw.githubusercontent.com/gkstrmtm/exhibit/main";

async function main() {
  const all = await db.select().from(exhibits).orderBy(asc(exhibits.category), asc(exhibits.title));

  const outDir = join(process.cwd(), "components");
  mkdirSync(outDir, { recursive: true });

  // ── 1. Individual .tsx files ───────────────────────────────────────────────
  for (const exhibit of all) {
    const header = `/**
 * ${exhibit.title}
 * Category: ${exhibit.category}
 * Tags: ${(exhibit.tags || []).join(", ")}
 * Description: ${exhibit.description}
 *
 * Source: ${GITHUB_RAW_BASE}/components/${exhibit.slug}.tsx
 * Index:  ${GITHUB_RAW_BASE}/components.json
 */

`;
    writeFileSync(join(outDir, `${exhibit.slug}.tsx`), header + (exhibit.code || ""));
  }

  // ── 2. components.json ─────────────────────────────────────────────────────
  const index = all.map((e) => ({
    slug: e.slug,
    title: e.title,
    description: e.description,
    category: e.category,
    tags: e.tags || [],
    style: e.style || "",
    sourceUrl: `${GITHUB_RAW_BASE}/components/${e.slug}.tsx`,
    code: e.code,
  }));

  writeFileSync(
    join(process.cwd(), "components.json"),
    JSON.stringify(index, null, 2)
  );

  // ── 3. categories.json ─────────────────────────────────────────────────────
  const catMap: Record<string, string[]> = {};
  for (const e of all) {
    if (!catMap[e.category]) catMap[e.category] = [];
    catMap[e.category].push(e.slug);
  }

  const categories = Object.entries(catMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, slugs]) => ({
      name,
      count: slugs.length,
      slugs,
    }));

  writeFileSync(
    join(process.cwd(), "categories.json"),
    JSON.stringify(categories, null, 2)
  );

  console.log(`✓ Exported ${all.length} components to components/`);
  console.log(`✓ Wrote components.json (${index.length} entries)`);
  console.log(`✓ Wrote categories.json (${categories.length} categories)`);
  console.log(
    `\nAI agents can fetch:\n` +
      `  ${GITHUB_RAW_BASE}/components.json      ← full index + all code\n` +
      `  ${GITHUB_RAW_BASE}/categories.json      ← category list + slugs\n` +
      `  ${GITHUB_RAW_BASE}/components/{slug}.tsx ← single component source`
  );

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
