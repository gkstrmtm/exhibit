import { buildPublicHealthPayload, sendJson } from "../server/public-api.js";

export default function handler(req: any, res: any) {
  res.setHeader("Cache-Control", "no-store");
  sendJson(res, 200, buildPublicHealthPayload(req, "/api/health"));
}