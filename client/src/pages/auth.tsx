import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { Link } from "wouter";
import { Loader2, Eye, EyeOff } from "lucide-react";

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { user, login, register } = useAuth();

  const params = new URLSearchParams(window.location.search);
  const initialMode = params.get("mode") === "register" ? "register" : "login";
  const [mode, setMode] = useState<"login" | "register">(initialMode);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) setLocation("/browse");
  }, [user, setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "register") {
        await register(email, password, displayName);
      } else {
        await login(email, password);
      }
      setLocation("/browse");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <Link href="/">
            <div className="font-display font-bold text-xl tracking-tight flex items-center gap-2.5 mb-8 cursor-pointer">
              <img src="/images/brand/exhibit-logo.png" alt="EXHIBIT" className="w-7 h-7 object-contain" />
              EXHIBIT
            </div>
          </Link>

          <h1 data-testid="text-auth-title" className="text-2xl font-display font-bold tracking-tight mb-2">
            {mode === "register" ? "Create your account" : "Welcome back"}
          </h1>
          <p className="text-muted-foreground text-sm mb-8">
            {mode === "register"
              ? "Start publishing, competing, and selling."
              : "Sign in to continue."
            }
          </p>

          {error && (
            <div data-testid="text-auth-error" className="mb-4 p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">
                  Display Name
                </label>
                <input
                  data-testid="input-displayname"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  minLength={2}
                  className="w-full px-3 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="Your name"
                />
              </div>
            )}
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Email
              </label>
              <input
                data-testid="input-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <input
                  data-testid="input-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-3 py-2.5 pr-10 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder={mode === "register" ? "Min. 8 characters" : "Your password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              data-testid="button-auth-submit"
              type="submit"
              disabled={loading}
              className="w-full py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === "register" ? "Create Account" : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground text-center">
            {mode === "register" ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              data-testid="button-toggle-auth-mode"
              onClick={() => { setMode(mode === "register" ? "login" : "register"); setError(""); }}
              className="text-primary font-medium hover:underline"
            >
              {mode === "register" ? "Sign in" : "Create one"}
            </button>
          </p>
        </div>
      </div>

      {/* Right - Visual */}
      <div className="hidden lg:flex flex-1 bg-muted/30 items-center justify-center p-12 border-l border-border">
        <div className="max-w-md space-y-6">
          <div className="text-6xl">🎨</div>
          <h2 className="text-2xl font-display font-bold tracking-tight">
            {mode === "register" ? "Start building your reputation" : "Your work speaks for itself"}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {mode === "register"
              ? "Publish components, compete in challenges, earn badges, and get discovered by founders looking for real talent."
              : "Pick up where you left off. Your exhibits, collections, and reputation are waiting."
            }
          </p>
          <div className="flex gap-2">
            <div className="px-3 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 text-xs rounded-full font-medium">Proof-first</div>
            <div className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-xs rounded-full font-medium">Fair ranking</div>
            <div className="px-3 py-1 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400 text-xs rounded-full font-medium">Real opportunities</div>
          </div>
        </div>
      </div>
    </div>
  );
}
