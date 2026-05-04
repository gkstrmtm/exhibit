import { z } from "zod";
import {
  bulkRecordFromVerifyResponse,
  getRouteFeedbackStats,
  recordFeedback,
} from "../server/feedback-intelligence.js";
import { buildRequestUrl, readJsonBody, sendJson, sendJsonHeaders, sendMethodNotAllowed, sendNoContent } from "../server/public-api.js";

const singleSignalSchema = z.object({
  route: z.string().min(2).max(120),
  intentCategory: z.string().min(2).max(80),
  wasHonored: z.boolean(),
  verificationStatus: z.string().max(60).optional(),
});

const bulkSignalSchema = z.object({
  route: z.string().min(2).max(120),
  verificationStatus: z.string().max(60),
  intentMap: z.object({
    honored: z.array(z.object({
      item: z.string(),
      intents: z.array(z.string()),
      method: z.string().optional(),
    })).default([]),
    missed: z.array(z.object({
      item: z.string(),
      intents: z.array(z.string()),
    })).default([]),
  }),
});

const multiSignalSchema = z.object({
  route: z.string().min(2).max(120),
  verificationStatus: z.string().max(60).optional(),
  signals: z.array(z.object({
    intentCategory: z.string().min(2).max(80),
    wasHonored: z.boolean(),
  })).min(1).max(100),
});

export default async function handler(req: any, res: any) {
  const allow = "GET, POST, OPTIONS, HEAD";

  if (req.method === "OPTIONS") {
    sendNoContent(res, allow);
    return;
  }

  if (req.method === "HEAD") {
    sendJsonHeaders(res, 200);
    return;
  }

  if (req.method === "GET") {
    res.setHeader("Cache-Control", "no-store");
    const url = buildRequestUrl(req);
    const route = url.searchParams.get("route") || "";

    if (!route) {
      sendJson(res, 400, {
        error: "route query param is required",
        example: "/api/agent/feedback?route=operational-workbench",
      });
      return;
    }

    const stats = await getRouteFeedbackStats(route);
    sendJson(res, 200, {
      ok: true,
      ...stats,
    });
    return;
  }

  if (req.method === "POST") {
    res.setHeader("Cache-Control", "no-store");
    let body: Record<string, unknown>;
    try {
      body = await readJsonBody(req) as Record<string, unknown>;
    } catch {
      sendJson(res, 400, { error: "Invalid JSON body." });
      return;
    }

    // Route A: bulk from iteration-verify response (has intentMap)
    if (body.intentMap && typeof body.intentMap === "object") {
      const parsed = bulkSignalSchema.safeParse(body);
      if (!parsed.success) {
        sendJson(res, 400, { error: "Invalid bulk payload.", issues: parsed.error.issues });
        return;
      }
      await bulkRecordFromVerifyResponse(parsed.data);
      sendJson(res, 200, { ok: true, recorded: "bulk", route: parsed.data.route });
      return;
    }

    // Route B: array of signals under { route, signals: [] }
    if (Array.isArray(body.signals)) {
      const parsed = multiSignalSchema.safeParse(body);
      if (!parsed.success) {
        sendJson(res, 400, { error: "Invalid signals payload.", issues: parsed.error.issues });
        return;
      }
      await Promise.all(
        parsed.data.signals.map((s) =>
          recordFeedback({
            route: parsed.data.route,
            intentCategory: s.intentCategory,
            wasHonored: s.wasHonored,
            verificationStatus: parsed.data.verificationStatus,
          })
        ),
      );
      sendJson(res, 200, { ok: true, recorded: parsed.data.signals.length, route: parsed.data.route });
      return;
    }

    // Route C: single signal
    const parsed = singleSignalSchema.safeParse(body);
    if (!parsed.success) {
      sendJson(res, 400, { error: "Invalid signal payload.", issues: parsed.error.issues });
      return;
    }
    await recordFeedback(parsed.data);
    sendJson(res, 200, { ok: true, recorded: 1, route: parsed.data.route });
    return;
  }

  sendMethodNotAllowed(res, allow);
}
