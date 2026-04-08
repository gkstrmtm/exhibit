import { runUiAnalysis, uiAnalysisRequestSchema } from "../../server/ai.js";
import { readJsonBody, sendJson, sendMethodNotAllowed } from "../../server/public-api.js";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    sendMethodNotAllowed(res, "POST");
    return;
  }

  try {
    const body = uiAnalysisRequestSchema.parse(await readJsonBody(req));
    const result = await runUiAnalysis(body);
    sendJson(res, 200, result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error.";
    sendJson(res, message.includes("OPENAI_API_KEY") ? 503 : 500, { message });
  }
}