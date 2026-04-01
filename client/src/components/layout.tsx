import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { LayoutGrid, Type, MousePointer2, Component, Box, Layers, Navigation, CreditCard, Menu, Trophy, ShoppingBag, Users, Shield, LogOut, User, PanelLeft, BarChart3, Table2, FileQuestion, Loader2, Footprints, Lock, UserCog, DollarSign, Receipt, Database, ShieldCheck, Store, Gamepad2, MessageSquare, AlertTriangle, Palette, Bot } from "lucide-react";
import { useState } from "react";

const iconMap: Record<string, React.ElementType> = {
  "Buttons": MousePointer2,
  "Cards": CreditCard,
  "Data Display": Component,
  "Data Density": Database,
  "Feedback": AlertTriangle,
  "Inputs": Type,
  "Layout": Box,
  "Navigation": Navigation,
  "App Shells": PanelLeft,
  "Dashboard": BarChart3,
  "Tables": Table2,
  "Empty States": FileQuestion,
  "Loading": Loader2,
  "Onboarding": Footprints,
  "Authentication": Lock,
  "Account": UserCog,
  "Pricing": DollarSign,
  "Commerce": ShoppingBag,
  "Billing": Receipt,
  "Admin": ShieldCheck,
  "Marketplace": Store,
  "Gamification": Gamepad2,
  "Communication": MessageSquare,
  "Style Families": Palette,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  const { data: categories = [] } = useQuery<string[]>({
    queryKey: ["/api/categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
  });

  const categoryItems = [
    { label: "All Exhibits", href: "/browse", icon: LayoutGrid },
    ...categories.map(cat => ({
      label: cat,
      href: `/category/${cat.toLowerCase().replace(/\s+/g, "-")}`,
      icon: iconMap[cat] || Component,
    })),
  ];

  const platformItems = [
    { label: "Challenges", href: "/challenges", icon: Trophy },
    { label: "Marketplace", href: "/marketplace", icon: ShoppingBag },
    { label: "Scout Talent", href: "/scout", icon: Users },
    { label: "For AI / LLMs", href: "/for-ai", icon: Bot },
    ...(user?.role === "admin" ? [{ label: "Admin", href: "/admin", icon: Shield }] : []),
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 border-b border-border bg-card/80 backdrop-blur-md z-50 flex items-center justify-between px-4">
        <Link href="/">
          <h1 className="font-display font-bold text-lg tracking-tight flex items-center gap-2 cursor-pointer">
            <img src="/images/brand/exhibit-logo.png" alt="EXHIBIT" className="w-6 h-6 object-contain" />
            EXHIBIT
          </h1>
        </Link>
        <button 
          data-testid="button-mobile-menu"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-md hover:bg-muted transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileOpen(false)}>
          <div className="absolute top-14 left-0 right-0 bg-card border-b border-border shadow-lg p-4 space-y-1" onClick={e => e.stopPropagation()}>
            {[...categoryItems, ...platformItems].map((item) => (
              <Link key={item.href} href={item.href}>
                <div 
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-all cursor-pointer",
                    location === item.href 
                      ? "bg-secondary text-primary" 
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-card z-50 hidden md:flex flex-col">
        <div className="p-6 border-b border-border">
          <Link href="/">
            <h1 className="font-display font-bold text-xl tracking-tight flex items-center gap-2.5 cursor-pointer">
              <img src="/images/brand/exhibit-logo.png" alt="EXHIBIT" className="w-7 h-7 object-contain" />
              EXHIBIT
            </h1>
          </Link>
          <p className="text-xs text-muted-foreground mt-1">Proof-First UI Library</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-auto">
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3 px-2 mt-2">Library</div>
          {categoryItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all group cursor-pointer",
                location === item.href 
                  ? "bg-secondary text-primary" 
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}>
                <item.icon className={cn("w-4 h-4 transition-colors", location === item.href ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                {item.label}
              </div>
            </Link>
          ))}

          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3 px-2 mt-6">Platform</div>
          {platformItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all group cursor-pointer",
                location === item.href 
                  ? "bg-secondary text-primary" 
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}>
                <item.icon className={cn("w-4 h-4 transition-colors", location === item.href ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                {item.label}
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border space-y-3">
          {user ? (
            <div className="space-y-2">
              <Link href={`/profile/${user.id}`}>
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-md hover:bg-secondary/50 cursor-pointer transition-all">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">
                    {user.displayName.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-sm font-medium truncate">{user.displayName}</div>
                </div>
              </Link>
              <button
                data-testid="button-logout"
                onClick={() => logout()}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary/50 transition-all"
              >
                <LogOut className="w-4 h-4" />Sign out
              </button>
            </div>
          ) : (
            <Link href="/auth?mode=login">
              <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary hover:bg-secondary/50 rounded-md cursor-pointer transition-all">
                <User className="w-4 h-4" />Sign In
              </div>
            </Link>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen pt-14 md:pt-0">
        <div className="max-w-5xl mx-auto p-6 md:p-12 space-y-12">
          {children}
        </div>
      </main>
    </div>
  );
}
