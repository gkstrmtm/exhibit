import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import type { Exhibit } from "../shared/schema.js";

export type PublicCatalogEntry = {
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
const generatedCatalogPath = path.join(repoRoot, "generated", "public-catalog.json");
const catalogPath = path.join(repoRoot, "components.json");
const defaultTimestamp = new Date("2024-01-01T00:00:00.000Z");

type PublicCatalogRecord = Exhibit & {
  sourceUrl: string | null;
};

let cachedEntries: PublicCatalogEntry[] | null = null;
let cachedRecords: PublicCatalogRecord[] | null = null;

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildFallbackPreview(entry: PublicCatalogEntry): string {
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

export function getPublicCatalogEntries(): PublicCatalogEntry[] {
  if (!cachedEntries) {
    const fileContents = readFileSync(catalogPath, "utf8");
    cachedEntries = JSON.parse(fileContents) as PublicCatalogEntry[];
  }

  return cachedEntries;
}

function toPublicRecord(entry: PublicCatalogEntry, index: number): PublicCatalogRecord {
  return {
    id: index + 1,
    slug: entry.slug,
    title: entry.title,
    description: entry.description,
    category: entry.category,
    tags: entry.tags || [],
    code: entry.code,
    htmlPreview: buildFallbackPreview(entry),
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
    sourceUrl: entry.sourceUrl || null,
  };
}

function loadGeneratedRecords(): PublicCatalogRecord[] | null {
  if (!existsSync(generatedCatalogPath)) {
    return null;
  }

  const fileContents = readFileSync(generatedCatalogPath, "utf8");
  return JSON.parse(fileContents) as PublicCatalogRecord[];
}

function getPublicCatalogRecords(): PublicCatalogRecord[] {
  if (!cachedRecords) {
    cachedRecords = loadGeneratedRecords() || getPublicCatalogEntries().map(toPublicRecord);
  }

  return cachedRecords;
}

export function getPublicCatalogExhibits(): Exhibit[] {
  return getPublicCatalogRecords().map(({ sourceUrl: _sourceUrl, ...exhibit }) => exhibit);
}

export function getPublicCatalogExhibitBySlug(slug: string): Exhibit | undefined {
  return getPublicCatalogExhibits().find((entry) => entry.slug === slug);
}

export function getPublicCatalogCategories(): string[] {
  return Array.from(new Set(getPublicCatalogRecords().map((entry) => entry.category))).sort((a, b) =>
    a.localeCompare(b)
  );
}

export function filterPublicCatalogExhibits(options: { category?: string | null; query?: string | null }): Exhibit[] {
  const normalizedCategory = options.category?.trim().toLowerCase() || "";
  const normalizedQuery = options.query?.trim().toLowerCase() || "";

  return getPublicCatalogExhibits().filter((entry) => {
    const matchesCategory = !normalizedCategory || entry.category.trim().toLowerCase() === normalizedCategory;
    const matchesQuery =
      !normalizedQuery ||
      [entry.title, entry.description, entry.category, ...(entry.tags || [])].some((value) =>
        value.toLowerCase().includes(normalizedQuery)
      );

    return matchesCategory && matchesQuery;
  });
}

export function getPublicCatalogComponent(slug: string) {
  const entry = getPublicCatalogRecords().find((candidate) => candidate.slug === slug);
  if (!entry) {
    return null;
  }

  return {
    slug: entry.slug,
    title: entry.title,
    description: entry.description,
    category: entry.category,
    tags: entry.tags || [],
    code: entry.code,
    sourceUrl: entry.sourceUrl,
    techStack: ["react", "typescript", "tailwind"],
    licenseType: "free",
    productionReady: true,
    verified: false,
  };
}

export function getPublicCatalogComponents(options: { category?: string | null; query?: string | null }) {
  const normalizedCategory = options.category?.trim().toLowerCase() || "";
  const normalizedQuery = options.query?.trim().toLowerCase() || "";

  return getPublicCatalogRecords()
    .filter((entry) => {
      const matchesCategory = !normalizedCategory || entry.category.trim().toLowerCase() === normalizedCategory;
      const matchesQuery =
        !normalizedQuery ||
        [entry.title, entry.description, entry.category, ...(entry.tags || [])].some((value) =>
          value.toLowerCase().includes(normalizedQuery)
        );

      return matchesCategory && matchesQuery;
    })
    .map((entry) => ({
      slug: entry.slug,
      title: entry.title,
      description: entry.description,
      category: entry.category,
      tags: entry.tags || [],
      code: entry.code,
      sourceUrl: entry.sourceUrl,
      techStack: ["react", "typescript", "tailwind"],
      licenseType: "free",
      productionReady: true,
      verified: false,
    }));
}