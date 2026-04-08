import { sendJson, sendMethodNotAllowed } from "../server/public-api.js";

export default function handler(req: any, res: any) {
  if (req.method !== "GET") {
    sendMethodNotAllowed(res);
    return;
  }

  sendJson(res, 200, []);
}