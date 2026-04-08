import type { IncomingMessage, ServerResponse } from "node:http";

export type ApiRequest = IncomingMessage & {
  body?: unknown;
  query?: Record<string, string | string[] | undefined>;
};

const recommendedPublicHost = "exhibit-beta.vercel.app";

function firstHeaderValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] || "";
  }

  return value || "";
}

export function getRequestHost(req: IncomingMessage) {
  return firstHeaderValue(req.headers.host).trim() || recommendedPublicHost;
}

export function getRequestProtocol(req: IncomingMessage) {
  const forwarded = firstHeaderValue(req.headers["x-forwarded-proto"])
    .split(",")
    .map((part) => part.trim())
    .find(Boolean);

  return forwarded || "https";
}

export function buildRequestUrl(req: IncomingMessage) {
  return new URL(req.url || "/", `${getRequestProtocol(req)}://${getRequestHost(req)}`);
}

function buildEnvironmentSummary() {
  return {
    nodeEnv: process.env.NODE_ENV || "development",
    vercelEnv: process.env.VERCEL_ENV || null,
    platform: process.env.VERCEL ? "vercel" : "node",
  };
}

export function buildPublicHealthPayload(_req: IncomingMessage, path: string) {
  return {
    ok: true,
    route: path,
    timestamp: new Date().toISOString(),
    environment: buildEnvironmentSummary(),
  };
}

export function buildAgentHandlerHealthPayload() {
  return {
    ok: true,
    route: "/api/agent",
    handler_loaded: true,
    timestamp: new Date().toISOString(),
  };
}

function setCorsHeaders(res: ServerResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

export function sendJson(res: ServerResponse, statusCode: number, payload: unknown) {
  setCorsHeaders(res);
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

export function sendJsonHeaders(res: ServerResponse, statusCode: number) {
  setCorsHeaders(res);
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end();
}

export function sendNoContent(res: ServerResponse, allow: string) {
  setCorsHeaders(res);
  res.statusCode = 204;
  res.setHeader("Allow", allow);
  res.setHeader("Cache-Control", "no-store");
  res.end();
}

export function sendMethodNotAllowed(res: ServerResponse, allow = "GET") {
  res.setHeader("Allow", allow);
  sendJson(res, 405, { message: "Method not allowed." });
}

export async function readJsonBody(req: ApiRequest): Promise<unknown> {
  if (req.body !== undefined) {
    return req.body;
  }

  const chunks: Uint8Array[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  if (chunks.length === 0) {
    return {};
  }

  const raw = Buffer.concat(chunks).toString("utf8").trim();
  return raw ? JSON.parse(raw) : {};
}