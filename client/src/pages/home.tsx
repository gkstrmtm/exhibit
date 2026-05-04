import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout";
import { ComponentPreview } from "@/components/ui/component-preview";
import { useRoute, useLocation } from "wouter";
import { Search, X, Loader2, Sparkles, ArrowRight } from "lucide-react";
import type { Exhibit } from "@shared/schema";
import { readBrowseState, rememberExhibitSource, restoreBrowseScroll, writeBrowseState } from "@/lib/exhibit-navigation";

type FunnelLens = "all" | "funnels" | "other";

const FUNNEL_PATTERNS = [
  { label: "All patterns", value: "all", summary: "Every funnel exhibit in the working library." },
  { label: "VSL + Calendar", value: "vsl", summary: "Authority-led video and a direct booking path." },
  { label: "Application First", value: "application", summary: "Qualification before the calendar opens." },
  { label: "Pre-Call Context", value: "pre-call", summary: "Booked-call conditioning and show-up lift." },
  { label: "Webinar to Call", value: "webinar", summary: "Teach first, then route engaged attendees forward." },
  { label: "Advertorial to App", value: "advertorial", summary: "Long-form belief building into premium application." },
  { label: "DM to Call", value: "dm", summary: "Conversational inbound that stays high-context through booking." },
];

const FUNNEL_STAGES = [
  { label: "All stages", value: "all", summary: "See the full sequence without narrowing the lane." },
  { label: "Hook / Teach", value: "hook", summary: "Top-of-sequence persuasion, mechanism, and authority." },
  { label: "Qualify", value: "qualify", summary: "Application, fit, and buyer screening surfaces." },
  { label: "Book", value: "book", summary: "Calendar, appointment, and booking decision steps." },
  { label: "Pre-Call", value: "pre-call", summary: "Confirmation, indoctrination, and show-up preparation." },
];

function isFunnelExhibit(item: Exhibit) {
  return item.category === "Funnels" || (item.tags || []).some((tag) => /funnel|vsl|webinar|application|booking|call|pre-call|advertorial|dm/i.test(tag));
}

function getConceptKey(item: Exhibit) {
  return (item.tags || []).find((tag) => tag.startsWith("concept-")) || null;
}

function isPreviewVariantExhibit(item: Exhibit) {
  return (item.tags || []).includes("preview-variant");
}

function isConceptPrimaryExhibit(item: Exhibit) {
  return (item.tags || []).includes("concept-primary");
}

function matchesPattern(item: Exhibit, pattern: string) {
  if (pattern === "all") return true;
  const tags = (item.tags || []).map((tag) => tag.toLowerCase());
  if (pattern === "vsl") return tags.some((tag) => /vsl|video|booking|calendar/.test(tag));
  if (pattern === "application") return tags.some((tag) => /application|qualification|qualify/.test(tag));
  if (pattern === "pre-call") return tags.some((tag) => /pre-call|indoctrination|show-up|confirmation|prep/.test(tag));
  if (pattern === "webinar") return tags.some((tag) => /webinar|training|masterclass|event/.test(tag));
  if (pattern === "advertorial") return tags.some((tag) => /advertorial|long-form|bridge|story/.test(tag));
  if (pattern === "dm") return tags.some((tag) => /dm|conversation|chat|social/.test(tag));
  return true;
}

function matchesStage(item: Exhibit, stage: string) {
  if (stage === "all") return true;
  const tags = (item.tags || []).map((tag) => tag.toLowerCase());
  if (stage === "hook") return tags.some((tag) => /vsl|webinar|advertorial|authority|story/.test(tag));
  if (stage === "qualify") return tags.some((tag) => /application|qualification|qualify|survey/.test(tag));
  if (stage === "book") return tags.some((tag) => /booking|calendar|call|appointment/.test(tag));
  if (stage === "pre-call") return tags.some((tag) => /pre-call|confirmation|show-up|prep|indoctrination/.test(tag));
  return true;
}

export default function Home() {
  const [match, params] = useRoute("/category/:category");
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [lens, setLens] = useState<FunnelLens>("all");
  const [pattern, setPattern] = useState("all");
  const [stage, setStage] = useState("all");

  useEffect(() => {
    const savedState = readBrowseState(location);
    if (!savedState) {
      setSearchQuery("");
      setLens("all");
      setPattern("all");
      setStage("all");
      return;
    }

    setSearchQuery(savedState.searchQuery || "");
    setLens((savedState.lens as FunnelLens) || "all");
    setPattern(savedState.pattern || "all");
    setStage(savedState.stage || "all");
  }, [location]);

  useEffect(() => {
    writeBrowseState(location, { searchQuery, lens, pattern, stage });
  }, [location, searchQuery, lens, pattern, stage]);

  const { data: categories = [] } = useQuery<string[]>({
    queryKey: ["/api/categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
  });

  const categorySlug = match ? params?.category : null;
  const resolvedCategory = categorySlug
    ? categories.find(c => c.toLowerCase().replace(/\s+/g, "-") === categorySlug) || null
    : null;

  const queryParams = new URLSearchParams();
  if (searchQuery) queryParams.set("q", searchQuery);
  else if (resolvedCategory) queryParams.set("category", resolvedCategory);

  const { data: exhibits = [], isLoading } = useQuery<Exhibit[]>({
    queryKey: ["/api/exhibits", searchQuery, resolvedCategory],
    queryFn: async () => {
      const res = await fetch(`/api/exhibits?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch exhibits");
      return res.json();
    },
    enabled: !categorySlug || !!resolvedCategory || !match,
  });

  const isBrowseRoot = !match && (location === "/" || location === "/browse");

  const filteredExhibits = useMemo(() => {
    const hasSearchQuery = searchQuery.trim().length > 0;
    const displayableExhibits = hasSearchQuery
      ? exhibits
      : exhibits.filter((item) => !isPreviewVariantExhibit(item));

    return displayableExhibits.filter((item) => {
      const funnel = isFunnelExhibit(item);
      const matchesLens = lens === "all" || (lens === "funnels" ? funnel : !funnel);
      if (hasSearchQuery) {
        return matchesLens;
      }

      return matchesLens && matchesPattern(item, pattern) && matchesStage(item, stage);
    });
  }, [exhibits, lens, pattern, searchQuery, stage]);

  const conceptVariantsByKey = useMemo(() => {
    const groups = new Map<string, Exhibit[]>();

    exhibits.forEach((item) => {
      const conceptKey = getConceptKey(item);
      if (!conceptKey) {
        return;
      }

      const current = groups.get(conceptKey) || [];
      current.push(item);
      groups.set(conceptKey, current);
    });

    groups.forEach((items, key) => {
      items.sort((left, right) => {
        if (isConceptPrimaryExhibit(left) && !isConceptPrimaryExhibit(right)) return -1;
        if (!isConceptPrimaryExhibit(left) && isConceptPrimaryExhibit(right)) return 1;
        return left.title.localeCompare(right.title);
      });
      groups.set(key, items);
    });

    return groups;
  }, [exhibits]);

  const funnelCount = useMemo(() => exhibits.filter((item) => isFunnelExhibit(item)).length, [exhibits]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    restoreBrowseScroll(location);
  }, [isLoading, location, filteredExhibits.length]);

  const categoryTitle = isBrowseRoot
    ? lens === "funnels"
      ? "High-Converting Funnel Library"
      : resolvedCategory || "All Exhibits"
    : resolvedCategory || "All Exhibits";

  const introCopy = searchQuery
    ? `Showing results for "${searchQuery}"`
    : isBrowseRoot && lens === "funnels"
      ? "A working library of VSL, application, booking, webinar, advertorial, and pre-call funnel exhibits built to help the AI choose the right sequence instead of guessing."
      : match
        ? `Browsing our collection of curated ${resolvedCategory?.toLowerCase()} components.`
        : "A curated collection of hand-crafted UI patterns for the modern web.";

  return (
    <Layout>
      <div className="space-y-2 mb-8">
        <h2 data-testid="text-page-title" className="text-3xl font-display font-bold tracking-tight">{categoryTitle}</h2>
        <p className="text-muted-foreground text-lg max-w-2xl">
          {introCopy}
        </p>
      </div>

      {isBrowseRoot && (
        <div className="mb-8 overflow-hidden border border-emerald-200 bg-[linear-gradient(180deg,#f7fcf8_0%,#edf6f0_100%)] shadow-[0_18px_40px_rgba(16,185,129,0.06)]">
          <div className="grid gap-5 px-5 py-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-6">
            <div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
                  <Sparkles className="h-3.5 w-3.5" />
                  Funnel systems index
                </div>
                <div className="mt-1 text-sm text-slate-600">Browse the actual sequence library the strategy engine should pull from.</div>
              </div>
              <h3 className="mt-5 max-w-2xl text-[2rem] font-display font-bold tracking-tight text-slate-950">
                Inspect the funnel exhibits by sequence logic, not generic category chrome.
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-7 text-slate-700">
                This lane is for checking what the builder can actually assemble: VSL booking paths, qualification gates, webinar sequences, advertorial bridges, DM-to-call flows, and post-booking pre-call conditioning.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: "Funnel exhibits", value: funnelCount },
                { label: "Visible now", value: filteredExhibits.length },
                { label: "Main browse lane", value: lens === "funnels" ? "Funnels" : "All" },
              ].map((stat) => (
                <div key={stat.label} className="border border-emerald-100 bg-white px-4 py-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">{stat.label}</div>
                  <div className="mt-2 text-2xl font-black tracking-[-0.03em] text-slate-950">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-emerald-200/70 bg-white/70 px-5 py-4 lg:px-6">
            <div className="flex flex-wrap gap-2">
              {[
                { label: "All exhibits", value: "all" },
                { label: "Funnels only", value: "funnels" },
                { label: "Everything else", value: "other" },
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => setLens(item.value as FunnelLens)}
                  className={`border px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${lens === item.value ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="mt-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Pattern lanes</div>
              <div className="mt-3 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
              {FUNNEL_PATTERNS.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setPattern(item.value)}
                  className={`border px-4 py-3 text-left transition-colors ${pattern === item.value ? "border-emerald-700 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}
                >
                  <div className="text-sm font-semibold text-current">{item.label}</div>
                  <div className="mt-1 text-xs leading-relaxed text-inherit/80">{item.summary}</div>
                </button>
              ))}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Stage filters</div>
              <div className="mt-3 grid gap-2 md:grid-cols-2 xl:grid-cols-5">
              {FUNNEL_STAGES.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setStage(item.value)}
                  className={`border px-4 py-3 text-left transition-colors ${stage === item.value ? "border-violet-700 bg-violet-50 text-violet-700" : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}
                >
                  <div className="text-sm font-semibold text-current">{item.label}</div>
                  <div className="mt-1 text-xs leading-relaxed text-inherit/80">{item.summary}</div>
                </button>
              ))}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <a className="inline-flex items-center gap-1 font-medium text-slate-700 hover:text-slate-950" href="/for-ai">
                See the AI contract
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <span>Programmatic filter: <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px]">/api/llm/components?category=Funnels&tag=vsl</code></span>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative max-w-xl mb-10">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          data-testid="input-search"
          type="search"
          placeholder="Search components, tags, categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/60"
        />
        {searchQuery && (
          <button
            data-testid="button-clear-search"
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Exhibits Grid */}
      {!isLoading && (
        <div className="grid grid-cols-1 gap-12">
          {filteredExhibits.map((item: any) => {
            const conceptKey = getConceptKey(item);
            const conceptVariants = conceptKey ? conceptVariantsByKey.get(conceptKey) || [item] : [item];

            return (
              <ComponentPreview
                key={item.id}
                slug={item.slug}
                title={item.title}
                category={item.category}
                description={item.description}
                code={item.code}
                htmlPreview={item.htmlPreview}
                tags={item.tags || []}
                creatorName={item.creatorName}
                creatorId={item.creatorId}
                saveCount={item.saveCount}
                remixCount={item.remixCount}
                variants={conceptVariants.map((variant) => ({
                  slug: variant.slug,
                  title: variant.title,
                  description: variant.description,
                  category: variant.category,
                  htmlPreview: variant.htmlPreview,
                  tags: variant.tags || [],
                }))}
                onOpenExhibit={(slug) => {
                  rememberExhibitSource(slug, location, window.scrollY);
                  window.location.href = `/exhibit/${slug}`;
                }}
              />
            );
          })}

          {filteredExhibits.length === 0 && (
            <div className="text-center py-20 bg-muted/20 rounded-lg border border-dashed border-border">
              <div className="text-4xl mb-4">🔍</div>
              <div className="text-foreground font-medium mb-1">No exhibits found</div>
              <div className="text-muted-foreground text-sm">Try a different search term, lens, pattern, or stage filter.</div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}
