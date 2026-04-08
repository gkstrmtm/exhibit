import { sendJson, sendMethodNotAllowed } from "../../server/public-api.js";

export default function handler(req: any, res: any) {
  if (req.method !== "POST") {
    sendMethodNotAllowed(res, "POST");
    return;
  }

  sendJson(res, 200, { ok: true });
}