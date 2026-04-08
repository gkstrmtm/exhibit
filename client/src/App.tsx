import { Suspense, lazy } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth";

const NotFound = lazy(() => import("@/pages/not-found"));
const Landing = lazy(() => import("@/pages/landing"));
const Home = lazy(() => import("@/pages/home"));
const AuthPage = lazy(() => import("@/pages/auth"));
const ExhibitDetail = lazy(() => import("@/pages/exhibit-detail"));
const ProfilePage = lazy(() => import("@/pages/profile"));
const ChallengesPage = lazy(() => import("@/pages/challenges"));
const MarketplacePage = lazy(() => import("@/pages/marketplace"));
const ScoutPage = lazy(() => import("@/pages/scout"));
const AdminPage = lazy(() => import("@/pages/admin"));
const OnboardingPage = lazy(() => import("@/pages/onboarding"));
const ProfileSettingsPage = lazy(() => import("@/pages/profile-settings"));
const AiDocsPage = lazy(() => import("@/pages/ai-docs"));
const PromptsPage = lazy(() => import("@/pages/prompts"));

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-sm font-medium text-muted-foreground">Loading page...</div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/welcome" component={Landing} />
      <Route path="/" component={Home} />
      <Route path="/browse" component={Home} />
      <Route path="/category/:category" component={Home} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/exhibit/:slug" component={ExhibitDetail} />
      <Route path="/profile/:userId" component={ProfilePage} />
      <Route path="/challenges" component={ChallengesPage} />
      <Route path="/marketplace" component={MarketplacePage} />
      <Route path="/scout" component={ScoutPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/onboarding" component={OnboardingPage} />
      <Route path="/settings/profile" component={ProfileSettingsPage} />
      <Route path="/for-ai" component={AiDocsPage} />
      <Route path="/prompts" component={PromptsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Suspense fallback={<RouteFallback />}>
            <Router />
          </Suspense>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
