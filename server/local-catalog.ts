import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { transformSync } from "esbuild";
import * as LucideIcons from "lucide-react";
import * as React from "react";
import * as ReactJsxRuntime from "react/jsx-runtime";
import { renderToStaticMarkup } from "react-dom/server";
import type { Exhibit } from "../shared/schema.js";

type LocalCatalogEntry = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags?: string[];
  style?: string;
  sourceUrl?: string;
  code: string;
};

const repoRoot = process.cwd();
const catalogPath = path.join(repoRoot, "components.json");
const componentsPath = path.join(repoRoot, "components");
const defaultTimestamp = new Date("2024-01-01T00:00:00.000Z");

let cachedExhibits: Exhibit[] | null = null;
let cachedEntries: LocalCatalogEntry[] | null = null;
const loggedPreviewFailures = new Set<string>();

type PreviewModule = {
  default?: React.ComponentType;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildFallbackPreview(entry: LocalCatalogEntry): string {
  const tags = (entry.tags || [])
    .slice(0, 4)
    .map(
      (tag) =>
        `<span style="display:inline-flex;align-items:center;padding:0.3rem 0.55rem;border:1px solid #d4d4d8;border-radius:999px;background:#fafafa;color:#52525b;font-size:0.7rem;font-weight:500">${escapeHtml(tag)}</span>`
    )
    .join("");

  return `<div style="min-height:240px;padding:1.5rem;border:1px solid #e4e4e7;border-radius:1rem;background:linear-gradient(180deg,#fcfcfd 0%,#f4f4f5 100%);display:flex;flex-direction:column;justify-content:space-between;font-family:Inter,system-ui,sans-serif;color:#18181b">
  <div>
    <div style="display:inline-flex;align-items:center;padding:0.25rem 0.55rem;border-radius:999px;background:#18181b;color:#fafafa;font-size:0.68rem;font-weight:600;letter-spacing:0.04em;text-transform:uppercase">${escapeHtml(entry.category)}</div>
    <h3 style="margin:1rem 0 0.5rem 0;font-size:1.15rem;line-height:1.2;font-weight:700">${escapeHtml(entry.title)}</h3>
    <p style="margin:0;color:#52525b;font-size:0.875rem;line-height:1.55">${escapeHtml(entry.description)}</p>
  </div>
  <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:1.25rem">${tags}</div>
</div>`;
}

function resolvePreviewImport(specifier: string) {
  switch (specifier) {
    case "react":
      return React;
    case "react/jsx-runtime":
    case "react/jsx-dev-runtime":
      return ReactJsxRuntime;
    case "lucide-react":
      return LucideIcons;
    default:
      throw new Error(`Unsupported preview import: ${specifier}`);
  }
}

function buildRenderedPreview(entry: LocalCatalogEntry): string {
  const transpiled = transformSync(entry.code, {
    loader: "tsx",
    format: "cjs",
    target: "es2020",
    jsx: "automatic",
  }).code;

  const module = { exports: {} as PreviewModule | React.ComponentType };
  const context = {
    module,
    exports: module.exports,
    require: resolvePreviewImport,
    console,
    process: { env: { NODE_ENV: "production" } },
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
  };

  const script = new vm.Script(transpiled, {
    filename: `${entry.slug}.preview.cjs`,
  });

  script.runInNewContext(context, { timeout: 1000 });

  const exported = module.exports as PreviewModule | React.ComponentType;
  const Component = typeof exported === "function" ? exported : exported.default;

  if (!Component) {
    throw new Error("Preview module does not export a default React component.");
  }

  return renderToStaticMarkup(React.createElement(Component));
}

function buildHtmlPreview(entry: LocalCatalogEntry): string {
  try {
    return buildRenderedPreview(entry);
  } catch (error) {
    if (!loggedPreviewFailures.has(entry.slug)) {
      loggedPreviewFailures.add(entry.slug);
      const message = error instanceof Error ? error.message : String(error ?? "unknown error");
      console.warn(`Falling back to generic preview for ${entry.slug}: ${message}`);
    }

    return buildFallbackPreview(entry);
  }
}

function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((segment) => {
      if (segment.toLowerCase() === "llm") return "LLM";
      return segment.charAt(0).toUpperCase() + segment.slice(1);
    })
    .join(" ");
}

function parseComponentFileEntry(fileName: string): LocalCatalogEntry | null {
  const slug = fileName.replace(/\.tsx$/, "");
  const filePath = path.join(componentsPath, fileName);
  const fileContents = readFileSync(filePath, "utf8");
  const headerMatch = fileContents.match(/^\/\*\*([\s\S]*?)\*\/\s*/);
  const code = fileContents.replace(/^\/\*\*[\s\S]*?\*\/\s*/, "");

  if (!code.trim()) {
    return null;
  }

  const headerLines = (headerMatch?.[1] || "")
    .split("\n")
    .map((line) => line.replace(/^\s*\*\s?/, "").trim())
    .filter(Boolean);

  const findHeaderValue = (label: string) =>
    headerLines.find((line) => line.startsWith(`${label}:`))?.slice(label.length + 1).trim();

  const title =
    headerLines.find((line) => !line.includes(":")) ||
    findHeaderValue("Title") ||
    titleFromSlug(slug);
  const category = findHeaderValue("Category") || "App Shells";
  const tags = (findHeaderValue("Tags") || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const description = findHeaderValue("Description") || `${title} component.`;
  const sourceUrl =
    findHeaderValue("Source") ||
    `https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/${slug}.tsx`;

  return {
    slug,
    title,
    description,
    category,
    tags,
    style: "",
    sourceUrl,
    code,
  };
}

function buildLocalEntries(): LocalCatalogEntry[] {
  const fileContents = readFileSync(catalogPath, "utf8");
  const jsonEntries = JSON.parse(fileContents) as LocalCatalogEntry[];
  const entriesBySlug = new Map(jsonEntries.map((entry) => [entry.slug, entry]));

  const discoveredEntries = readdirSync(componentsPath)
    .filter((fileName) => fileName.endsWith(".tsx"))
    .map((fileName) => parseComponentFileEntry(fileName))
    .filter((entry): entry is LocalCatalogEntry => Boolean(entry))
    .sort((left, right) => left.title.localeCompare(right.title));

  for (const entry of discoveredEntries) {
    entriesBySlug.set(entry.slug, entry);
  }

  return Array.from(entriesBySlug.values());
}

export function getLocalCatalogEntries(): LocalCatalogEntry[] {
  if (!cachedEntries) {
    cachedEntries = buildLocalEntries();
  }

  return cachedEntries;
}

function buildLocalExhibits(): Exhibit[] {
  const entries = getLocalCatalogEntries();

  return entries.map((entry, index) => ({
    id: index + 1,
    slug: entry.slug,
    title: entry.title,
    description: entry.description,
    category: entry.category,
    tags: entry.tags || [],
    code: entry.code,
    htmlPreview: buildHtmlPreview(entry),
    style: entry.style || "",
    creatorId: null,
    techStack: ["React", "TypeScript", "Tailwind CSS"],
    licenseType: "free",
    version: "1.0.0",
    parentExhibitId: null,
    viewCount: 0,
    saveCount: 0,
    remixCount: 0,
    status: "published",
    verified: false,
    accessible: false,
    productionReady: true,
    createdAt: defaultTimestamp,
    updatedAt: defaultTimestamp,
  }));
}

export function getLocalCatalogExhibits(): Exhibit[] {
  if (!cachedExhibits) {
    cachedExhibits = buildLocalExhibits();
  }

  return cachedExhibits;
}

export function getLocalCatalogExhibitById(id: number): Exhibit | undefined {
  return getLocalCatalogExhibits().find((entry) => entry.id === id);
}

export function getLocalCatalogExhibitBySlug(slug: string): Exhibit | undefined {
  return getLocalCatalogExhibits().find((entry) => entry.slug === slug);
}

export function getLocalCatalogExhibitsByCategory(category: string): Exhibit[] {
  const normalizedCategory = category.trim().toLowerCase();
  return getLocalCatalogExhibits().filter(
    (entry) => entry.category.trim().toLowerCase() === normalizedCategory
  );
}

export function searchLocalCatalogExhibits(query: string): Exhibit[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return getLocalCatalogExhibits();
  }

  return getLocalCatalogExhibits().filter((entry) => {
    const haystacks = [entry.title, entry.description, entry.category, ...(entry.tags || [])];
    return haystacks.some((value) => value.toLowerCase().includes(normalizedQuery));
  });
}

export function getLocalCatalogCategories(): string[] {
  return Array.from(new Set(getLocalCatalogExhibits().map((entry) => entry.category))).sort((a, b) =>
    a.localeCompare(b)
  );
}