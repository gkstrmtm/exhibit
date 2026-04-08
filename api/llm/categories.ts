import { getPublicCatalogCategories, getPublicCatalogComponents } from "../../server/public-catalog.js";
import { sendJson, sendMethodNotAllowed } from "../../server/public-api.js";

export default function handler(req: any, res: any) {
  if (req.method !== "GET") {
    sendMethodNotAllowed(res);
    return;
  }

  const categories = getPublicCatalogCategories();
  sendJson(res, 200, {
    total: categories.length,
    componentTotal: getPublicCatalogComponents({}).length,
    categories: categories.map((category) => {
      const components = getPublicCatalogComponents({ category });
      return {
        name: category,
        slug: category.toLowerCase().replace(/\s+/g, "-"),
        count: components.length,
        apiUrl: `/api/llm/components?category=${encodeURIComponent(category)}`,
        components: components.map((component) => ({
          slug: component.slug,
          title: component.title,
          tags: component.tags,
        })),
      };
    }),
  });
}