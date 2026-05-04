import { buildRequestUrl, sendJson, sendMethodNotAllowed } from "../../../server/public-api.js";
import { getPublicCatalogComponents } from "../../../server/public-catalog.js";

export default function handler(req: any, res: any) {
  if (req.method !== "GET") {
    sendMethodNotAllowed(res);
    return;
  }

  const url = buildRequestUrl(req);
  const category = url.searchParams.get("category");
  const query = url.searchParams.get("q");
  const tag = url.searchParams.get("tag");
  const components = getPublicCatalogComponents({ category, query, tag });

  sendJson(res, 200, {
    total: components.length,
    filter: { category, q: query, tag },
    components,
  });
}