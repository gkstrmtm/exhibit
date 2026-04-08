import { getPublicCatalogCategories } from "../server/public-catalog.js";
import { sendJson, sendMethodNotAllowed } from "../server/public-api.js";

export default function handler(req: any, res: any) {
  if (req.method !== "GET") {
    sendMethodNotAllowed(res);
    return;
  }

  sendJson(res, 200, getPublicCatalogCategories());
}