import { agentQuestionRequestSchema, agentResolutionRequestSchema, getAgentQuestionResponse, getAgentResolutionResponse } from "../server/operational-workbench-bundle.js";
import { buildAgentHandlerHealthPayload, buildRequestUrl, readJsonBody, sendJson, sendJsonHeaders, sendMethodNotAllowed, sendNoContent } from "../server/public-api.js";

export default async function handler(req: any, res: any) {
  const allow = "GET, POST, HEAD, OPTIONS";

  if (req.method === "OPTIONS") {
    sendNoContent(res, allow);
    return;
  }

  if (req.method === "HEAD") {
    const url = buildRequestUrl(req);
    if (url.searchParams.get("health") === "1") {
      res.setHeader("Cache-Control", "no-store");
      sendJsonHeaders(res, 200);
      return;
    }

    res.setHeader("Cache-Control", "public, max-age=300");
    sendJsonHeaders(res, 200);
    return;
  }

  if (req.method === "GET") {
    const url = buildRequestUrl(req);
    if (url.searchParams.get("health") === "1") {
      res.setHeader("Cache-Control", "no-store");
      sendJson(res, 200, buildAgentHandlerHealthPayload());
      return;
    }

    res.setHeader("Cache-Control", "public, max-age=300");
    const question = url.searchParams.get("question") || url.searchParams.get("scenario") || url.searchParams.get("prompt");
    if (!question) {
      sendJson(res, 200, getAgentQuestionResponse());
      return;
    }

    sendJson(res, 200, getAgentQuestionResponse(agentQuestionRequestSchema.parse({
      question,
      platform: url.searchParams.get("platform") || undefined,
      goal: url.searchParams.get("goal") || undefined,
      routeHint: url.searchParams.get("routeHint") || undefined,
      context: url.searchParams.get("context") || undefined,
      agentContextSummary: url.searchParams.get("agentContextSummary") || undefined,
    })));
    return;
  }

  if (req.method === "POST") {
    res.setHeader("Cache-Control", "public, max-age=300");
    const body = await readJsonBody(req) as Record<string, unknown>;
    const isStageRequest = body.stage === "workflow-audit-and-iteration"
      || body.stage === "elevation-audit"
      || body.stage === "funnel-strategy"
      || body.stage === "iteration-verify";
    const isResolutionRequest = typeof body.surfaceType === "string"
      || typeof body.sector === "string"
      || typeof body.route === "string"
      || typeof body.goal === "string"
      || Array.isArray(body.screenshots)
      || typeof body.context === "object"
      || typeof body.output === "object"
      || Array.isArray(body.layoutNeeds)
      || Array.isArray(body.workspaceModules)
      || typeof body.funnelContext === "object"
      || isStageRequest;

    if (isResolutionRequest) {
      sendJson(res, 200, await getAgentResolutionResponse(agentResolutionRequestSchema.parse(body)));
      return;
    }

    const question = typeof body.question === "string"
      ? body.question
      : typeof body.scenario === "string"
        ? body.scenario
        : typeof body.prompt === "string"
          ? body.prompt
          : undefined;
    sendJson(res, 200, getAgentQuestionResponse(question ? agentQuestionRequestSchema.parse({
      question,
      prompt: typeof body.prompt === "string" ? body.prompt : undefined,
      platform: typeof body.platform === "string" ? body.platform : undefined,
      goal: typeof body.goal === "string" ? body.goal : undefined,
      routeHint: typeof body.routeHint === "string" ? body.routeHint : undefined,
      context: typeof body.context === "string" ? body.context : undefined,
      agentContextSummary: typeof body.agentContextSummary === "string" ? body.agentContextSummary : undefined,
    }) : undefined));
    return;
  }

  sendMethodNotAllowed(res, allow);
}