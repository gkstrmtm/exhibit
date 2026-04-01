import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout";
import { ComponentPreview } from "@/components/ui/component-preview";
import { useRoute, Link } from "wouter";
import { Search, X, Loader2 } from "lucide-react";
import type { Exhibit } from "@shared/schema";

export default function Home() {
  const [match, params] = useRoute("/category/:category");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

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

  const filteredExhibits = activeTag 
    ? exhibits.filter(e => e.tags?.includes(activeTag))
    : exhibits;

  const allTags = Array.from(new Set(exhibits.flatMap(e => e.tags || []))).sort();

  const categoryTitle = resolvedCategory || "All Exhibits";

  return (
    <Layout>
      <div className="space-y-2 mb-8">
        <h2 data-testid="text-page-title" className="text-3xl font-display font-bold tracking-tight">{categoryTitle}</h2>
        <p className="text-muted-foreground text-lg max-w-2xl">
          {searchQuery 
            ? `Showing results for "${searchQuery}"`
            : match 
              ? `Browsing our collection of curated ${resolvedCategory?.toLowerCase()} components.`
              : "A curated collection of hand-crafted UI patterns for the modern web."
          }
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          data-testid="input-search"
          type="search"
          placeholder="Search components, tags, categories..."
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setActiveTag(null); }}
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

      {/* Tag Pills */}
      {allTags.length > 0 && !searchQuery && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            data-testid="button-tag-all"
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
              !activeTag 
                ? "bg-foreground text-background border-foreground" 
                : "bg-card text-muted-foreground border-border hover:border-foreground/30"
            }`}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              data-testid={`button-tag-${tag}`}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                activeTag === tag 
                  ? "bg-foreground text-background border-foreground" 
                  : "bg-card text-muted-foreground border-border hover:border-foreground/30"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Exhibits Grid */}
      {!isLoading && (
        <div className="grid grid-cols-1 gap-12">
          {filteredExhibits.map((item: any) => (
            <Link key={item.id} href={`/exhibit/${item.slug}`}>
              <ComponentPreview
                title={item.title}
                description={item.description}
                code={item.code}
                htmlPreview={item.htmlPreview}
                tags={item.tags || []}
                creatorName={item.creatorName}
                creatorId={item.creatorId}
                saveCount={item.saveCount}
                remixCount={item.remixCount}
              />
            </Link>
          ))}

          {filteredExhibits.length === 0 && (
            <div className="text-center py-20 bg-muted/20 rounded-lg border border-dashed border-border">
              <div className="text-4xl mb-4">🔍</div>
              <div className="text-foreground font-medium mb-1">No components found</div>
              <div className="text-muted-foreground text-sm">Try a different search term or category.</div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}
