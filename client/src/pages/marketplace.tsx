import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout";
import { Link } from "wouter";
import { useAuth } from "@/lib/auth";
import { ShoppingBag, Package, ArrowRight, Loader2, DollarSign } from "lucide-react";
import type { Pack } from "@shared/schema";

export default function MarketplacePage() {
  const { user } = useAuth();

  const { data: packs = [], isLoading } = useQuery<Pack[]>({
    queryKey: ["/api/packs"],
    queryFn: async () => {
      const res = await fetch("/api/packs");
      return res.json();
    },
  });

  return (
    <Layout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 data-testid="text-marketplace-title" className="text-3xl font-display font-bold tracking-tight mb-2 flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-purple-500" />
            Marketplace
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Premium UI packs from top creators. Clear licensing, production-ready code, instant access.
          </p>
        </div>
        {user && (
          <Link href="/create-pack">
            <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
              Create Pack
            </button>
          </Link>
        )}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {!isLoading && packs.length === 0 && (
        <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed border-border">
          <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground/40" />
          <h3 className="text-lg font-semibold mb-2">No packs listed yet</h3>
          <p className="text-muted-foreground text-sm mb-6">Be the first to publish a premium UI pack.</p>
          {user && (
            <Link href="/create-pack">
              <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg">
                Publish a Pack
              </button>
            </Link>
          )}
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packs.map((pack) => (
          <Link key={pack.id} href={`/marketplace/${pack.slug}`}>
            <div className="border border-border rounded-xl bg-card overflow-hidden hover:shadow-md transition-all cursor-pointer group">
              <div className="h-40 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-950 dark:to-blue-950 flex items-center justify-center">
                <Package className="w-12 h-12 text-muted-foreground/30" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{pack.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{pack.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {pack.priceCents === 0 ? (
                      <span className="text-emerald-600 font-semibold text-sm">Free</span>
                    ) : (
                      <span className="flex items-center text-foreground font-semibold text-sm">
                        <DollarSign className="w-3.5 h-3.5" />
                        {(pack.priceCents / 100).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{pack.licenseType}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
