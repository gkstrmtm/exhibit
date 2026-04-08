import { sendJson, sendMethodNotAllowed, sendNoContent } from "../server/public-api.js";
import { openapiSpec as spec } from "../server/openapi-spec.js";

export default function handler(req: any, res: any) {
  const allow = "GET, HEAD, OPTIONS";

  if (req.method === "OPTIONS") {
    sendNoContent(res, allow);
    return;
  }

  if (req.method === "GET" || req.method === "HEAD") {
    res.setHeader("Cache-Control", "public, max-age=3600");
    sendJson(res, 200, spec);
    return;
  }

  sendMethodNotAllowed(res, allow);
}
