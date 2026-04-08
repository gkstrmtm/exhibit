import { buildRequestUrl, sendJson, sendMethodNotAllowed } from "../server/public-api.js";
import { getPublicCatalogComponent } from "../server/public-catalog.js";

export default function handler(req: any, res: any) {
  if (req.method !== "GET") {
    sendMethodNotAllowed(res);
    return;
  }

  const slug = buildRequestUrl(req).searchParams.get("slug") || "";
  const component = getPublicCatalogComponent(slug);

  if (!component) {
    sendJson(res, 404, { message: "Component not found." });
    return;
  }

  sendJson(res, 200, component);
}