import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout";
import { Link } from "wouter";
import { useAuth } from "@/lib/auth";
import { Users, Search, MapPin, Globe, Code2, Loader2, Filter, Star, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CreatorProfile, User } from "@shared/schema";

export default function ScoutPage() {
  const { user } = useAuth();
  const [availableOnly, setAvailableOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: creators = [], isLoading } = useQuery<(CreatorProfile & { user: Pick<User, "id" | "displayName" | "avatarUrl"> })[]>({
    queryKey: ["/api/creators", availableOnly],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (availableOnly) params.set("available", "true");
      const res = await fetch(`/api/creators?${params.toString()}`);
      return res.json();
    },
  });

  const filtered = searchQuery
    ? creators.filter(c =>
        c.user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.headline || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.skillTags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : creators;

  return (
    <Layout>
      <div className="mb-8">
        <h1 data-testid="text-scout-title" className="text-3xl font-display font-bold tracking-tight mb-2 flex items-center gap-3">
          <Users className="w-8 h-8 text-blue-500" />
          Scout Talent
        </h1>
        <p className="text-muted-foreground max-w-xl">
          Find designers and developers based on real work. Filter by skills, availability, and proof of quality.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            data-testid="input-scout-search"
            type="search"
            placeholder="Search by name, skills, headline..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <button
          data-testid="button-filter-available"
          onClick={() => setAvailableOnly(!availableOnly)}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border transition-all",
            availableOnly ? "bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400" : "border-border hover:bg-muted"
          )}
        >
          <Filter className="w-4 h-4" />
          Available for hire
        </button>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {!isLoading && filtered.length === 0 && (
        <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed border-border">
          <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground/40" />
          <h3 className="text-lg font-semibold mb-2">No creators found</h3>
          <p className="text-muted-foreground text-sm">Try adjusting your filters or check back later.</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((creator) => {
          const initials = creator.user.displayName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
          return (
            <Link key={creator.id} href={`/profile/${creator.userId}`}>
              <div className="p-6 border border-border rounded-xl bg-card hover:shadow-md transition-all cursor-pointer group">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold group-hover:text-primary transition-colors truncate">{creator.user.displayName}</div>
                    {creator.headline && <div className="text-xs text-muted-foreground truncate">{creator.headline}</div>}
                  </div>
                </div>
                {creator.bio && <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{creator.bio}</p>}
                <div className="flex flex-wrap gap-1 mb-4">
                  {(creator.skillTags || []).slice(0, 4).map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-muted text-xs rounded-full font-medium">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    {creator.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{creator.location}</span>}
                    {creator.reputationScore > 0 && <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-500" />{creator.reputationScore.toFixed(1)}</span>}
                  </div>
                  {creator.hireAvailable && (
                    <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 text-xs font-medium rounded-full">Hireable</span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Layout>
  );
}
