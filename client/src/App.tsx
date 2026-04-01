import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import AuthPage from "@/pages/auth";
import ExhibitDetail from "@/pages/exhibit-detail";
import ProfilePage from "@/pages/profile";
import ChallengesPage from "@/pages/challenges";
import MarketplacePage from "@/pages/marketplace";
import ScoutPage from "@/pages/scout";
import AdminPage from "@/pages/admin";
import OnboardingPage from "@/pages/onboarding";
import ProfileSettingsPage from "@/pages/profile-settings";
import AiDocsPage from "@/pages/ai-docs";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
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
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
