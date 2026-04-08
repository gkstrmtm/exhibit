import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { BrandWordmark } from "@/components/brand-wordmark";
import { ArrowLeft, ArrowRight, Check, Loader2, Sparkles, Code2, Palette, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

const SKILL_OPTIONS = [
  "React", "Vue", "Angular", "Svelte", "Next.js", "TypeScript",
  "CSS/Tailwind", "Animation", "Accessibility", "Design Systems",
  "Figma", "UI Design", "UX Design", "Responsive Design",
  "Performance", "Testing", "Node.js", "Python", "Go", "Rust",
];

const STACK_OPTIONS = [
  "React", "Vue", "Svelte", "Next.js", "Nuxt", "Remix",
  "Tailwind CSS", "CSS Modules", "Styled Components", "Framer Motion",
  "GSAP", "Three.js", "D3.js", "Radix UI", "shadcn/ui", "Chakra UI",
];

const ACCENT_COLORS = [
  "#2563eb", "#7c3aed", "#db2777", "#dc2626", "#ea580c",
  "#16a34a", "#0d9488", "#0284c7", "#4f46e5", "#1d4ed8",
];

const STYLE_REFS = [
  "Minimal & Clean", "Bold & Expressive", "Brutalist", "Glassmorphism",
  "Neumorphism", "Retro/Vintage", "Corporate Professional", "Playful & Fun",
  "Dark Mode First", "High Contrast",
];

function CreatorOnboarding() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(0);

  const [creatorRole, setCreatorRole] = useState<"designer" | "developer" | "both">("both");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedStack, setSelectedStack] = useState<string[]>([]);
  const [themeAccent, setThemeAccent] = useState("#2563eb");
  const [signatureStamp, setSignatureStamp] = useState("");
  const [handle, setHandle] = useState("");
  const [headline, setHeadline] = useState("");

  const submitMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/onboarding/creator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creatorRole,
          skillTags: selectedSkills,
          stackTags: selectedStack,
          themeAccent,
          signatureStampText: signatureStamp,
          handle: handle || undefined,
          headline: headline || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to complete onboarding");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      setLocation("/browse");
    },
  });

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : prev.length < 10 ? [...prev, skill] : prev);
  };

  const toggleStack = (stack: string) => {
    setSelectedStack(prev => prev.includes(stack) ? prev.filter(s => s !== stack) : prev.length < 10 ? [...prev, stack] : prev);
  };

  const steps = [
    {
      title: "What's your role?",
      subtitle: "This helps us tailor your experience.",
      content: (
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {([
            { value: "designer" as const, label: "Designer", icon: <Palette className="w-8 h-8" />, desc: "Visual design, UI/UX" },
            { value: "developer" as const, label: "Developer", icon: <Code2 className="w-8 h-8" />, desc: "Frontend code, components" },
            { value: "both" as const, label: "Both", icon: <Layers className="w-8 h-8" />, desc: "Design + development" },
          ]).map(role => (
            <button
              key={role.value}
              data-testid={`button-role-${role.value}`}
              onClick={() => setCreatorRole(role.value)}
              className={cn(
                "p-6 rounded-xl border-2 text-center transition-all",
                creatorRole === role.value
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/30"
              )}
            >
              <div className={cn("mx-auto mb-3", creatorRole === role.value ? "text-primary" : "text-muted-foreground")}>{role.icon}</div>
              <div className="font-semibold text-sm mb-1">{role.label}</div>
              <div className="text-xs text-muted-foreground">{role.desc}</div>
            </button>
          ))}
        </div>
      ),
      valid: true,
    },
    {
      title: "Pick your skills",
      subtitle: "Choose up to 10 skills that define your expertise.",
      content: (
        <div className="flex flex-wrap gap-2 max-w-lg mx-auto justify-center">
          {SKILL_OPTIONS.map(skill => (
            <button
              key={skill}
              onClick={() => toggleSkill(skill)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium border transition-all",
                selectedSkills.includes(skill)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-primary/30"
              )}
            >
              {selectedSkills.includes(skill) && <Check className="w-3 h-3 inline mr-1" />}
              {skill}
            </button>
          ))}
        </div>
      ),
      valid: selectedSkills.length > 0,
    },
    {
      title: "Your tech stack",
      subtitle: "Optional. What frameworks and tools do you use?",
      content: (
        <div className="flex flex-wrap gap-2 max-w-lg mx-auto justify-center">
          {STACK_OPTIONS.map(stack => (
            <button
              key={stack}
              onClick={() => toggleStack(stack)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium border transition-all",
                selectedStack.includes(stack)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-primary/30"
              )}
            >
              {selectedStack.includes(stack) && <Check className="w-3 h-3 inline mr-1" />}
              {stack}
            </button>
          ))}
        </div>
      ),
      valid: true,
    },
    {
      title: "Personalize your profile",
      subtitle: "Choose your accent color and set a signature stamp.",
      content: (
        <div className="max-w-md mx-auto space-y-8">
          <div>
            <label className="text-sm font-medium mb-3 block">Accent Color</label>
            <div className="flex gap-3 justify-center flex-wrap">
              {ACCENT_COLORS.map(color => (
                <button
                  key={color}
                  onClick={() => setThemeAccent(color)}
                  className={cn("w-10 h-10 rounded-xl transition-all", themeAccent === color ? "ring-2 ring-offset-2 ring-foreground scale-110" : "hover:scale-105")}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Signature Stamp (optional)</label>
            <p className="text-xs text-muted-foreground mb-3">A small mark that can appear on your exhibits. Keep it short.</p>
            <input
              data-testid="input-signature-stamp"
              type="text"
              value={signatureStamp}
              onChange={(e) => setSignatureStamp(e.target.value.slice(0, 40))}
              placeholder="e.g., crafted by @yourname"
              className="w-full px-3 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            {signatureStamp && (
              <div className="mt-3 flex justify-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border text-xs font-mono tracking-wider opacity-70" style={{ borderColor: themeAccent, color: themeAccent }}>
                  <Sparkles className="w-3 h-3" />{signatureStamp}
                </div>
              </div>
            )}
          </div>
        </div>
      ),
      valid: true,
    },
    {
      title: "Almost done!",
      subtitle: "Set your handle and headline.",
      content: (
        <div className="max-w-md mx-auto space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Handle (optional)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
              <input
                data-testid="input-handle"
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 40))}
                placeholder="your_handle"
                className="w-full pl-8 pr-3 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Headline (optional)</label>
            <input
              data-testid="input-headline"
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value.slice(0, 200))}
              placeholder="e.g., UI Engineer building accessible components"
              className="w-full px-3 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      ),
      valid: true,
    },
  ];

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted">
        <div className="h-full bg-primary transition-all duration-500" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="font-display font-bold text-lg tracking-tight flex items-center gap-2.5">
          <BrandWordmark size="sm" />
        </div>
        <button onClick={() => setLocation("/browse")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Skip for now
        </button>
      </div>

      {/* Step Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl text-center">
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Step {step + 1} of {steps.length}</div>
          <h2 className="text-3xl font-display font-bold tracking-tight mb-2">{currentStep.title}</h2>
          <p className="text-muted-foreground mb-10">{currentStep.subtitle}</p>
          {currentStep.content}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between p-6 border-t border-border">
        <button
          onClick={() => step > 0 && setStep(step - 1)}
          disabled={step === 0}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />Back
        </button>
        {isLastStep ? (
          <button
            data-testid="button-complete-onboarding"
            onClick={() => submitMutation.mutate()}
            disabled={submitMutation.isPending}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            Complete Setup
          </button>
        ) : (
          <button
            data-testid="button-next-step"
            onClick={() => currentStep.valid && setStep(step + 1)}
            disabled={!currentStep.valid}
            className="flex items-center gap-1.5 px-6 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Continue<ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {submitMutation.error && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 px-4 py-2 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
          {(submitMutation.error as Error).message}
        </div>
      )}
    </div>
  );
}

function FounderOnboarding() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(0);

  const [buildingDescription, setBuildingDescription] = useState("");
  const [stylePrefs, setStylePrefs] = useState<string[]>([]);
  const [stackPrefs, setStackPrefs] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");

  const submitMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/onboarding/founder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buildingDescription,
          stylePreferences: stylePrefs,
          stackPreferences: stackPrefs,
          timelineRange: timeline,
          budgetRange: budget,
        }),
      });
      if (!res.ok) throw new Error("Failed to complete onboarding");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      setLocation("/scout");
    },
  });

  const steps = [
    {
      title: "What are you building?",
      subtitle: "Help us understand your project.",
      content: (
        <div className="max-w-md mx-auto">
          <textarea
            data-testid="input-building-description"
            value={buildingDescription}
            onChange={(e) => setBuildingDescription(e.target.value)}
            placeholder="e.g., A SaaS dashboard for analytics with complex data visualizations and a clean modern design..."
            className="w-full px-4 py-3 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[120px] resize-none"
          />
        </div>
      ),
      valid: buildingDescription.length > 0,
    },
    {
      title: "Style preference",
      subtitle: "What visual direction resonates with your project?",
      content: (
        <div className="flex flex-wrap gap-2 max-w-lg mx-auto justify-center">
          {STYLE_REFS.map(style => (
            <button
              key={style}
              onClick={() => setStylePrefs(prev => prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style])}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium border transition-all",
                stylePrefs.includes(style) ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/30"
              )}
            >
              {stylePrefs.includes(style) && <Check className="w-3 h-3 inline mr-1" />}{style}
            </button>
          ))}
        </div>
      ),
      valid: true,
    },
    {
      title: "Stack preference",
      subtitle: "Do you have a preferred tech stack?",
      content: (
        <div className="flex flex-wrap gap-2 max-w-lg mx-auto justify-center">
          {STACK_OPTIONS.map(stack => (
            <button
              key={stack}
              onClick={() => setStackPrefs(prev => prev.includes(stack) ? prev.filter(s => s !== stack) : [...prev, stack])}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium border transition-all",
                stackPrefs.includes(stack) ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/30"
              )}
            >
              {stackPrefs.includes(stack) && <Check className="w-3 h-3 inline mr-1" />}{stack}
            </button>
          ))}
        </div>
      ),
      valid: true,
    },
    {
      title: "Timeline & Budget",
      subtitle: "This helps creators assess fit.",
      content: (
        <div className="max-w-md mx-auto space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Timeline</label>
            <div className="grid grid-cols-2 gap-3">
              {["ASAP", "1-2 weeks", "1 month", "Flexible"].map(t => (
                <button
                  key={t}
                  onClick={() => setTimeline(t)}
                  className={cn("px-4 py-3 rounded-lg text-sm font-medium border transition-all", timeline === t ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/30")}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Budget Range</label>
            <div className="grid grid-cols-2 gap-3">
              {["< $500", "$500 - $2K", "$2K - $10K", "$10K+"].map(b => (
                <button
                  key={b}
                  onClick={() => setBudget(b)}
                  className={cn("px-4 py-3 rounded-lg text-sm font-medium border transition-all", budget === b ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/30")}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
      valid: true,
    },
  ];

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted">
        <div className="h-full bg-primary transition-all duration-500" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
      </div>

      <div className="flex items-center justify-between p-6">
        <div className="font-display font-bold text-lg tracking-tight flex items-center gap-2.5">
          <BrandWordmark size="sm" />
        </div>
        <button onClick={() => setLocation("/scout")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Skip for now
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl text-center">
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Step {step + 1} of {steps.length}</div>
          <h2 className="text-3xl font-display font-bold tracking-tight mb-2">{currentStep.title}</h2>
          <p className="text-muted-foreground mb-10">{currentStep.subtitle}</p>
          {currentStep.content}
        </div>
      </div>

      <div className="flex items-center justify-between p-6 border-t border-border">
        <button onClick={() => step > 0 && setStep(step - 1)} disabled={step === 0} className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 transition-all">
          <ArrowLeft className="w-4 h-4" />Back
        </button>
        {isLastStep ? (
          <button
            data-testid="button-complete-founder-onboarding"
            onClick={() => submitMutation.mutate()}
            disabled={submitMutation.isPending}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            Start Scouting
          </button>
        ) : (
          <button
            onClick={() => currentStep.valid && setStep(step + 1)}
            disabled={!currentStep.valid}
            className="flex items-center gap-1.5 px-6 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Continue<ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  const params = new URLSearchParams(window.location.search);
  const intent = params.get("intent");

  if (intent === "founder") {
    return <FounderOnboarding />;
  }
  return <CreatorOnboarding />;
}
