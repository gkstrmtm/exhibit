import { getPublicCatalogCategories, getPublicCatalogEntries } from "./public-catalog.js";

export async function buildLlmsText() {
  const categories = getPublicCatalogCategories();
  const allExhibits = getPublicCatalogEntries();

  const categorySummary = categories
    .map((cat) => {
      const count = allExhibits.filter((e) => e.category === cat).length;
      return `- ${cat} (${count} components): /api/llm/components?category=${encodeURIComponent(cat)}`;
    })
    .join("\n");

  return `# EXHIBIT — UI Component Library for AI Assistants

> EXHIBIT is a proof-first UI component library with ${allExhibits.length} production-ready React components across ${categories.length} categories.
> All components are self-contained React + TypeScript + Tailwind CSS. No external UI library required.

## STEP 1 — Fetch design foundations first (always do this before building any UI)

Before writing a single component, fetch the design rulebook. It defines typography, color, spacing,
layout, component sizing, density modes, and the anti-patterns to avoid.

  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/design-foundations.json

Human-readable version:
  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/design-foundations.md

The design foundations include:
- Font families: Inter (body), Space Grotesk (display), JetBrains Mono (code/data)
- Full type scale with pixel sizes, weights, and usage rules
- Color system: neutral palette, semantic states (success/warning/error/info), interactive variants
- 4px spacing grid with correct values for cards, pages, and components
- Layout dimensions: sidebar widths, nav heights, max-widths for content and reading columns
- Elevation levels (shadow-sm through shadow-2xl) with correct use cases
- Component sizing: buttons, inputs, tables, avatars, badges
- Density modes: compact / default / comfortable — when to use each
- Anti-patterns list: the most common AI UI mistakes and how to fix them

Reference exhibits (fetch for visual anchors):
  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/full-reference-dashboard.tsx
  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/design-token-reference.tsx
  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/anti-pattern-contrast.tsx

## STEP 2 — Fetch components

Full index with all component code:
  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json

Single component by slug:
  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/{slug}.tsx

Category list with slugs:
  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/categories.json

## Live API (requires server)

### Get all components in a category
GET /api/llm/components?category=<CategoryName>

### Narrow a category by tag
GET /api/llm/components?category=Funnels&tag=vsl

### Search for components by keyword
GET /api/llm/components?q=<search term>

### Get a single component with full code
GET /api/llm/components/{slug}

### List all categories with component counts
GET /api/llm/categories

## Component Categories (${categories.length} total)

${categorySummary}

## Response Format (components.json)

Each entry includes:
- slug: unique identifier  e.g. "command-palette-shell"
- title: component name
- description: what it does
- category: which category it belongs to
- tags: relevant keywords
- code: full React/TypeScript source code ready to paste
- sourceUrl: raw GitHub URL for this component's .tsx file

## Example prompts for AI assistants

"First fetch https://raw.githubusercontent.com/gkstrmtm/exhibit/main/design-foundations.json, then fetch https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json and build me a polished admin dashboard"
"Get https://raw.githubusercontent.com/gkstrmtm/exhibit/main/design-foundations.json and use it as the design system for this entire project"
"Fetch https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/full-reference-dashboard.tsx as the visual target for this dashboard"
"Get https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/command-palette-shell.tsx and use it in my app"

## GitHub

Source: https://github.com/gkstrmtm/exhibit
`;
}