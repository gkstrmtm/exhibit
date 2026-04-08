import { writeFileSync } from "node:fs";
import path from "node:path";

import { getLocalCatalogEntries } from "../server/local-catalog.ts";

const repoRoot = process.cwd();

function buildCategories(entries: ReturnType<typeof getLocalCatalogEntries>) {
  const categoryMap = new Map<string, string[]>();

  for (const entry of entries) {
    const slugs = categoryMap.get(entry.category) ?? [];
    slugs.push(entry.slug);
    categoryMap.set(entry.category, slugs);
  }

  return Array.from(categoryMap.entries())
    .sort((left, right) => left[0].localeCompare(right[0]))
    .map(([name, slugs]) => ({
      name,
      count: slugs.length,
      slugs: [...slugs].sort((left, right) => left.localeCompare(right)),
    }));
}

function main() {
  const entries = getLocalCatalogEntries();
  const categories = buildCategories(entries);

  writeFileSync(path.join(repoRoot, "components.json"), `${JSON.stringify(entries, null, 2)}\n`);
  writeFileSync(path.join(repoRoot, "categories.json"), `${JSON.stringify(categories, null, 2)}\n`);

  console.log(`Synced ${entries.length} components across ${categories.length} categories.`);
}

main();