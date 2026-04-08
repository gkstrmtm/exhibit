import { buildRequestUrl, sendJson, sendMethodNotAllowed } from "../../server/public-api.js";
import { filterPublicCatalogExhibits } from "../../server/public-catalog.js";

export default function handler(req: any, res: any) {
  if (req.method !== "GET") {
    sendMethodNotAllowed(res);
    return;
  }

  const url = buildRequestUrl(req);
  sendJson(
    res,
    200,
    filterPublicCatalogExhibits({
      category: url.searchParams.get("category"),
      query: url.searchParams.get("q"),
    })
  );
}