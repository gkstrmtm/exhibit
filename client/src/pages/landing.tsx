import { Link } from "wouter";
import { useAuth } from "@/lib/auth";
import { ArrowRight, Code2, Eye, Users, Trophy, ShoppingBag, Sparkles } from "lucide-react";

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/">
            <div className="font-display font-bold text-lg tracking-tight flex items-center gap-2.5 cursor-pointer">
              <img src="/images/brand/exhibit-logo.png" alt="EXHIBIT" className="w-6 h-6 object-contain" />
              EXHIBIT
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/browse" className="hover:text-foreground transition-colors">Library</Link>
            <Link href="/challenges" className="hover:text-foreground transition-colors">Challenges</Link>
            <Link href="/marketplace" className="hover:text-foreground transition-colors">Marketplace</Link>
            <Link href="/scout" className="hover:text-foreground transition-colors">Hire Talent</Link>
          </nav>
          <div className="flex items-center gap-3">
            {user ? (
              <Link href="/browse">
                <button data-testid="button-go-to-app" className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                  Open App
                </button>
              </Link>
            ) : (
              <>
                <Link href="/auth?mode=login">
                  <button data-testid="button-login" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Sign In
                  </button>
                </Link>
                <Link href="/auth?mode=register">
                  <button data-testid="button-signup" className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                    Get Started
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
            <Sparkles className="w-3 h-3" />
            Proof-first UI library
          </div>
          <h1 data-testid="text-hero-title" className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-[0.95] mb-6">
            Build with UI that<br />actually works.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            A curated library of production-ready UI components with live previews and copyable code. 
            Compete in challenges, sell your work, and get hired based on proof — not claims.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/browse">
              <button data-testid="button-browse-library" className="px-8 py-3.5 text-sm font-semibold bg-foreground text-background rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg">
                Browse Library <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/auth?mode=register&intent=creator">
              <button data-testid="button-start-creating" className="px-8 py-3.5 text-sm font-semibold border border-border rounded-xl hover:bg-muted transition-colors">
                Start Publishing
              </button>
            </Link>
            <Link href="/scout">
              <button data-testid="button-hire-talent" className="px-8 py-3.5 text-sm font-semibold border border-border rounded-xl hover:bg-muted transition-colors">
                Hire Talent
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-border bg-card hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Live Preview + Code</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Every component comes with a live, sandboxed preview and production-ready source code. 
                Responsive toggles, one-click copy, file trees where needed.
              </p>
            </div>
            <div className="p-8 rounded-2xl border border-border bg-card hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Challenges + Ranking</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Weekly design challenges with real voting and ranking. Build your reputation, earn badges, 
                and prove your skills through code — not portfolios.
              </p>
            </div>
            <div className="p-8 rounded-2xl border border-border bg-card hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Proof-Based Hiring</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Founders and teams scout talent based on real work, not resumes. 
                Filter by stack, style, speed, and reliability scores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-bold tracking-tight text-center mb-12">Three ways to use the platform</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                <Code2 className="w-7 h-7" />
              </div>
              <h3 className="font-semibold mb-2">Find UI</h3>
              <p className="text-muted-foreground text-sm">Browse curated, production-ready components. Copy code and ship faster.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="font-semibold mb-2">Publish + Sell</h3>
              <p className="text-muted-foreground text-sm">Upload your components, build packs, and earn money. Clear licensing, fair platform rates.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="font-semibold mb-2">Hire Talent</h3>
              <p className="text-muted-foreground text-sm">Scout designers and devs by their real work. No guesswork, no wasted time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">
            Ready to build with real UI?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join creators and builders using proof-first components.
          </p>
          <Link href="/auth?mode=register">
            <button className="px-8 py-3.5 text-sm font-semibold bg-foreground text-background rounded-xl hover:opacity-90 transition-opacity">
              Create Free Account
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display font-bold text-sm tracking-tight flex items-center gap-2">
            <img src="/images/brand/exhibit-logo.png" alt="EXHIBIT" className="w-5 h-5 object-contain" />
            EXHIBIT
          </div>
          <div className="text-xs text-muted-foreground">
            Built for creators who ship.
          </div>
        </div>
      </footer>
    </div>
  );
}
