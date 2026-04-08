import { buildRequestUrl, sendJson, sendMethodNotAllowed } from "../server/public-api.js";
import { getPublicCatalogExhibitBySlug } from "../server/public-catalog.js";

export default function handler(req: any, res: any) {
  if (req.method !== "GET") {
    sendMethodNotAllowed(res);
    return;
  }

  const slug = buildRequestUrl(req).searchParams.get("slug") || "";
  const exhibit = getPublicCatalogExhibitBySlug(slug);

  if (!exhibit) {
    sendJson(res, 404, { message: "Exhibit not found." });
    return;
  }

  sendJson(res, 200, exhibit);
}