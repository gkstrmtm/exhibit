import assert from "node:assert/strict";

type CatalogListPayload = {
  total: number;
  filter: {
    category?: string | null;
    q?: string | null;
    tag?: string | null;
  };
  components: Array<{
    slug: string;
    tags?: string[];
  }>;
};

type CatalogDetailPayload = {
  slug: string;
  htmlPreview?: string;
  sourceUrl?: string | null;
  version?: string;
  accessible?: boolean;
};

type CategoryPayload = {
  total: number;
  componentTotal: number;
  categories: Array<{
    name: string;
    count: number;
    apiUrl: string;
    funnelApiUrl?: string | null;
    components: Array<{
      slug: string;
    }>;
  }>;
};

const baseUrl = (process.env.CATALOG_VERIFY_URL || "http://127.0.0.1:5000").replace(/\/$/, "");

async function requestJson<T>(path: string): Promise<T> {
  const response = await fetch(new URL(path, `${baseUrl}/`), {
    headers: {
      Accept: "application/json",
    },
  });

  const raw = await response.text();
  const payload = raw ? JSON.parse(raw) as T : null;

  if (!response.ok) {
    throw new Error(`Request to ${path} failed with ${response.status}: ${raw}`);
  }

  return payload as T;
}

function hasTag(tags: string[] | undefined, expected: string) {
  return (tags || []).some((tag) => tag.toLowerCase().includes(expected));
}

async function verifyFunnelTagFilter(tag: string, requiredSlug: string, forbiddenSlug: string) {
  const payload = await requestJson<CatalogListPayload>(`/api/llm/components?category=Funnels&tag=${encodeURIComponent(tag)}`);

  assert.equal(payload.filter.category, "Funnels");
  assert.equal(payload.filter.tag, tag);
  assert.ok(payload.total >= 1, `Expected at least one funnel component for tag ${tag}.`);
  assert.ok(
    payload.components.some((component) => component.slug === requiredSlug),
    `Expected ${requiredSlug} to be present for tag ${tag}.`,
  );
  assert.ok(
    payload.components.every((component) => hasTag(component.tags, tag)),
    `Expected every returned component to include the ${tag} tag.`,
  );
  assert.ok(
    !payload.components.some((component) => component.slug === forbiddenSlug),
    `Expected ${forbiddenSlug} to be excluded from the ${tag} filter.`,
  );
}

async function verifyComponentDetail() {
  const payload = await requestJson<CatalogDetailPayload>("/api/llm/components/high-ticket-vsl-booking-page");

  assert.equal(payload.slug, "high-ticket-vsl-booking-page");
  assert.equal(typeof payload.htmlPreview, "string");
  assert.match(payload.sourceUrl || "", /components\/high-ticket-vsl-booking-page\.tsx$/);
  assert.equal(typeof payload.version, "string");
  assert.equal(typeof payload.accessible, "boolean");
}

async function verifyCategoryMetadata() {
  const payload = await requestJson<CategoryPayload>("/api/llm/categories");
  const funnels = payload.categories.find((category) => category.name === "Funnels");

  assert.ok(funnels, "Expected a Funnels category in /api/llm/categories.");
  assert.equal(funnels?.apiUrl, "/api/llm/components?category=Funnels");
  assert.equal(funnels?.funnelApiUrl, "/api/llm/components?category=Funnels");
  assert.ok(
    funnels?.components.some((component) => component.slug === "webinar-registration-call-funnel"),
    "Expected webinar-registration-call-funnel in Funnels category metadata.",
  );
}

async function main() {
  await verifyFunnelTagFilter("vsl", "high-ticket-vsl-booking-page", "dm-to-call-conversation-brief");
  await verifyFunnelTagFilter("dm", "dm-to-call-conversation-brief", "high-ticket-vsl-booking-page");
  await verifyFunnelTagFilter("webinar", "webinar-registration-call-funnel", "pre-call-context-vsl");
  await verifyComponentDetail();
  await verifyCategoryMetadata();

  console.log(`Catalog route verification passed against ${baseUrl}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});