import { useState, type ComponentType } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Bot, Copy, Check, Terminal, Code2, Layers, Search, ExternalLink, ChevronDown, ChevronRight, Zap } from "lucide-react";

type OverviewHintTone = "primary" | "muted";

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      data-testid="button-copy-snippet"
      onClick={copy}
      className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied!" : (label || "Copy")}
    </button>
  );
}

function CodeBlock({ code, language = "bash" }: { code: string; language?: string }) {
  return (
    <div className="relative rounded-xl border border-border bg-[#0d0d0d] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/50">
        <span className="text-xs font-mono text-muted-foreground">{language}</span>
        <CopyButton text={code} />
      </div>
      <pre className="p-4 text-sm font-mono text-green-400 overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function EndpointCard({
  method,
  path,
  description,
  example,
}: {
  method: string;
  path: string;
  description: string;
  example?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const methodColors: Record<string, string> = {
    GET: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    POST: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        data-testid={`button-endpoint-${path.replace(/\//g, "-")}`}
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-secondary/30 transition-colors text-left"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded border ${methodColors[method] || "bg-muted text-muted-foreground"}`}>
            {method}
          </span>
          <code className="text-sm font-mono text-foreground truncate">{path}</code>
        </div>
        <div className="flex items-center gap-3 ml-4 shrink-0">
          <span className="text-xs text-muted-foreground hidden sm:block">{description}</span>
          {expanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
        </div>
      </button>
      {expanded && example && (
        <div className="border-t border-border px-5 py-4 space-y-2 bg-secondary/10">
          <p className="text-sm text-muted-foreground">{description}</p>
          <CodeBlock code={example} language="json response" />
        </div>
      )}
    </div>
  );
}

function OverviewUrlCard({
  title,
  mode,
  url,
  copyLabel,
  chips,
  hoverTitle,
  hoverBody,
  hoverPoints,
  tone = "primary",
}: {
  title: string;
  mode: string;
  url: string;
  copyLabel: string;
  chips: string[];
  hoverTitle: string;
  hoverBody: string;
  hoverPoints: string[];
  tone?: "primary" | "muted";
}) {
  const shellClass = tone === "primary"
    ? "border-primary/25 bg-primary/[0.06]"
    : "border-border bg-background/80";
  const badgeClass = tone === "primary"
    ? "border-primary/25 bg-primary/10 text-primary"
    : "border-border bg-card text-muted-foreground";

  return (
    <div className={`rounded-[22px] border p-4 ${shellClass}`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">{title}</div>
          <HoverCard openDelay={90} closeDelay={70}>
            <HoverCardTrigger asChild>
              <div className="mt-2 inline-flex cursor-help items-center gap-2 rounded-full pr-2 transition-colors hover:bg-background/60">
                <div className="text-sm font-semibold text-foreground">{mode}</div>
                <span className={`rounded-full border px-2 py-1 text-[10px] font-mono uppercase tracking-[0.16em] ${badgeClass}`}>
                  {tone === "primary" ? "known" : "unknown"}
                </span>
                <span className="rounded-full border border-border bg-background px-2 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                  why
                </span>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-[320px] rounded-[20px] border-border bg-background/95 p-4 shadow-[0_20px_40px_rgba(15,23,42,0.14)] backdrop-blur-sm">
              <div className="space-y-3">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">{hoverTitle}</div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">{hoverBody}</p>
                </div>
                <div className="space-y-1.5">
                  {hoverPoints.map((point) => (
                    <div key={point} className="rounded-2xl border border-border bg-card/70 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        <CopyButton text={url} label={copyLabel} />
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-card/80 p-3 font-mono text-xs break-all text-primary/85">
        {url}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {chips.map((chip) => (
          <span key={chip} className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground">
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}

function OverviewHintChip({
  label,
  title,
  body,
  points,
  tone = "muted",
}: {
  label: string;
  title: string;
  body: string;
  points: string[];
  tone?: OverviewHintTone;
}) {
  const shellClass = tone === "primary"
    ? "border-primary/25 bg-primary/10 text-primary"
    : tone === "muted"
      ? "border-border bg-card text-muted-foreground"
      : "border-border bg-card text-muted-foreground";

  return (
    <HoverCard openDelay={90} closeDelay={70}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          className={`rounded-full border px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em] transition-colors hover:bg-background ${shellClass}`}
        >
          {label}
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-[320px] rounded-[20px] border-border bg-background/95 p-4 shadow-[0_20px_40px_rgba(15,23,42,0.14)] backdrop-blur-sm">
        <div className="space-y-3">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">{title}</div>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{body}</p>
          </div>
          <div className="space-y-1.5">
            {points.map((point) => (
              <div key={point} className="rounded-2xl border border-border bg-card/70 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
                {point}
              </div>
            ))}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function OverviewCanvas() {
  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-[28px] border border-border bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(234,179,8,0.10),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.86),rgba(248,250,252,0.96))] p-5">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:28px_28px] opacity-40" />

      <div className="relative h-full min-h-[380px]">
        <div className="absolute left-4 top-5 flex items-center gap-3 md:left-6 md:top-8">
          <div className="rounded-[24px] border border-primary/25 bg-white/90 p-3 shadow-[0_18px_34px_rgba(59,130,246,0.12)]">
            <div className="space-y-2">
              <div className="h-2.5 w-20 rounded-full bg-primary/70" />
              <div className="h-2.5 w-14 rounded-full bg-primary/35" />
              <div className="h-2.5 w-16 rounded-full bg-primary/20" />
            </div>
          </div>
          <div className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-primary">known</div>
        </div>

        <div className="absolute bottom-6 left-4 flex items-center gap-3 md:bottom-9 md:left-8">
          <div className="relative h-20 w-20 rounded-full border border-amber-300/50 bg-white/85 shadow-[0_18px_34px_rgba(234,179,8,0.12)]">
            <span className="absolute left-3 top-3 h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="absolute right-4 top-5 h-2 w-2 rounded-full bg-amber-300" />
            <span className="absolute bottom-4 left-5 h-2 w-2 rounded-full bg-amber-500" />
            <span className="absolute bottom-5 right-5 h-3 w-3 rounded-full border border-amber-400/70" />
          </div>
          <div className="rounded-full border border-amber-300/40 bg-amber-100/70 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-amber-700">unknown</div>
        </div>

        <div className="absolute left-[39%] top-[20%] h-px w-[18%] bg-gradient-to-r from-primary/0 via-primary/45 to-primary/0 md:left-[25%] md:top-[26%] md:w-[26%]" />
        <span className="absolute left-[56%] top-[19%] h-2.5 w-2.5 rounded-full bg-primary animate-pulse md:left-[50%] md:top-[25%]" />

        <div className="absolute left-[25%] top-[69%] h-px w-[32%] rotate-[-18deg] bg-gradient-to-r from-amber-300/0 via-amber-400/60 to-amber-300/0 md:left-[22%] md:top-[71%] md:w-[30%]" />
        <span className="absolute left-[51%] top-[60%] h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse md:left-[47%] md:top-[63%]" />

        <div className="absolute left-1/2 top-1/2 h-[164px] w-[164px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25 bg-white/70 shadow-[0_24px_50px_rgba(15,23,42,0.10)] backdrop-blur-sm">
          <div className="absolute inset-4 rounded-full border border-primary/15" />
          <div className="absolute inset-8 rounded-full border border-primary/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full border border-primary/25 bg-primary/10 px-4 py-2.5 text-center">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-primary">route</div>
              <div className="mt-1 h-2.5 w-14 rounded-full bg-primary/70" />
            </div>
          </div>
        </div>

        <div className="absolute right-4 top-6 w-[150px] rounded-[24px] border border-primary/25 bg-white/90 p-4 shadow-[0_18px_34px_rgba(59,130,246,0.12)] md:right-7 md:top-9 md:w-[200px]">
          <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-primary">apply</div>
          <div className="mt-3 space-y-2">
            <div className="h-2.5 w-20 rounded-full bg-slate-900" />
            <div className="h-2.5 w-24 rounded-full bg-slate-400/70" />
            <div className="h-2.5 w-16 rounded-full bg-primary/45" />
          </div>
        </div>

        <div className="absolute right-4 bottom-6 w-[156px] rounded-[24px] border border-amber-300/45 bg-white/90 p-4 shadow-[0_18px_34px_rgba(234,179,8,0.12)] md:right-7 md:bottom-9 md:w-[208px]">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-amber-700">crawl</div>
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className={`h-10 rounded-xl border ${index === 1 ? "border-amber-400/60 bg-amber-100/70" : "border-slate-200 bg-slate-50"}`} />
            ))}
          </div>
        </div>

        <div className="absolute right-[15%] top-[32%] h-px w-[18%] bg-gradient-to-r from-primary/0 via-primary/45 to-primary/0 md:right-[22%] md:top-[31%] md:w-[18%]" />
        <div className="absolute right-[18%] bottom-[27%] h-px w-[20%] bg-gradient-to-r from-amber-300/0 via-amber-400/60 to-amber-300/0 md:right-[22%] md:bottom-[29%] md:w-[18%]" />

        <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full border border-border bg-white/90 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
          known -&gt; route | unknown -&gt; crawl
        </div>
      </div>
    </div>
  );
}

export default function AiDocsPage() {
  const { data: categoriesData } = useQuery<{
    total: number;
    componentTotal: number;
    categories: { name: string; slug: string; count: number; apiUrl: string }[];
  }>({
    queryKey: ["/api/llm/categories"],
    queryFn: async () => {
      const res = await fetch("/api/llm/categories");
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  const baseUrl = window.location.origin;

  const llmsTxtUrl = `${baseUrl}/llms.txt`;
  const agentBundleUrl = `${baseUrl}/api/agent`;

  const endpoints = [
    {
      method: "GET",
      path: "/api/agent",
      description: "Question router for lightweight classification and follow-up prompts",
      example: `{
  "mode": "question-router",
  "endpoint": "/api/agent",
  "question": "this is an internal operations dashboard",
  "classification": {
    "confidence": 0.74,
    "supported": true,
    "archetype": {
      "id": "internal-operations",
      "label": "Internal Operations / Company System"
    },
    "sector": {
      "id": "policy-admin",
      "label": "Policy / Admin Operations"
    }
  },
  "designProfile": {
    "id": "operational-compact",
    "label": "Operational Compact"
  },
  "nextQuestions": [
    "What is the one thing the user is trying to finish on this screen right now?"
  ]
}`,
    },
    {
      method: "POST",
      path: "/api/agent",
      description: "Structured resolution mode for ranked component recommendations, optional AI merge, source hydration, and screenshot-grounded routing",
      example: `{
  "mode": "component-resolution",
  "endpoint": "/api/agent",
  "portableContext": {
    "goal": "Route resources for a weak operations UI",
    "routeHint": "operational-workbench",
    "context": "The user says the UI feels generic, the tabs do not communicate enough, and the selects feel raw.",
    "agentContextSummary": "This came from another agent doing first-pass triage."
  },
  "contextDigest": {
    "contextSummary": "This is a routed handoff from another agent.",
    "problemStatement": "The interface needs better control choice, clearer communication, and stronger cross-pane continuity.",
    "routingIntent": "Return interaction-focused resources rather than generic dashboard ideas.",
    "originalPrompt": "make this feel like a real assistant workspace",
    "userComplaint": "the result was too generic and lost the intake context",
    "primaryObject": "client relationship",
    "userRoles": ["operations manager", "service operator"],
    "dataSources": ["CRM account record", "task queue", "delivery status feed"],
    "mutations": ["assign owner", "update status", "schedule follow-up"],
    "timelineMoments": ["intake", "qualification", "delivery", "follow-up"],
    "observedAsyncProblems": ["tab switch blanks the pane", "focus jumps on refresh"],
    "visibleModes": ["Discuss", "Operational"],
    "competingControls": ["Focus dropdown with Discuss, Summary, Mute, Reply, Draft"],
    "desiredResources": ["assistant shells", "typography guidance", "artifact panel"]
  },
  "classification": {
    "archetype": { "id": "internal-operations", "label": "Internal Operations / Company System" },
    "sector": { "id": "policy-admin", "label": "Policy / Admin Operations" },
    "route": "operational-workbench"
  },
  "designProfile": {
    "id": "operational-compact",
    "density": "compact",
    "iconLibrary": "Lucide",
    "motion": "minimal functional",
    "elevation": "border-first"
  },
  "foundationCommunication": {
    "surfacePosture": "serious internal system",
    "inferredTone": "calm, operational, and direct",
    "assumedUserPreferences": {
      "likelyLikes": ["strong hierarchy", "task-first copy", "restrained icons"],
      "likelyDislikes": ["dashboard-card clutter", "soft landing-page tone"]
    },
    "preferenceProbe": {
      "ask": "Should this employee entry point feel more security-led or more AI-workspace led?"
    }
  },
  "contextIntelligence": {
    "adequacy": { "level": "usable", "canProceed": true },
    "complaintTranslation": {
      "interpretedAs": "The complaint likely points to hierarchy and control-choice failures, not just taste.",
      "likelyDesignFailures": ["weak hierarchy", "wrong control model", "soft tone for a serious task"]
    },
    "nextBestQuestion": {
      "ask": "What is the one thing the user is trying to finish on this screen right now?"
    }
  },
  "operationalTruthIntelligence": {
    "thresholdAssessment": {
      "overall": "strong",
      "canSafelyDesignShell": true,
      "canSafelyDesignDetailedUI": true,
      "shouldAskFirst": false,
      "fillerRisk": "low"
    },
    "placeholderPolicy": {
      "ban": ["fake filters, fake counts, fake status chips, and invented field labels"],
      "allow": ["question-first scaffolding that names what is missing instead of hiding it behind filler UI"]
    },
    "bridgePlan": {
      "forNonDesigners": [
        "What is the main thing this screen is about?",
        "Where does that information come from?",
        "What can the user actually change here?",
        "What stages or moments does it move through over time?"
      ]
    }
  },
  "discoveryIntelligence": {
    "gapAssessment": {
      "severity": "multi-region",
      "changeScope": "targeted-multi-region",
      "affectedLayers": ["mode-switch controls", "loading and transition behavior", "scope language and state communication"]
    },
    "investigateFirst": [
      { "area": "Control-model conflict", "impact": "high" },
      { "area": "Loading and transition continuity", "impact": "high" }
    ],
    "changeBudget": {
      "mustChange": ["remove duplicate mode-switch controls", "define per-region loading behavior"],
      "canDefer": ["decorative motion polish", "minor icon swaps"]
    },
    "bullshitFilter": {
      "likelyBullshit": ["keeping both the tabs and dropdown while merely restyling one of them"]
    }
  },
  "screenshotGrounding": {
    "applied": true,
    "visibleSummary": "The screenshot reads like a soft, airy employee-entry page instead of a serious internal access point.",
    "visibleIssues": ["hero-like composition", "weak task framing", "soft tone for employee access"]
  },
  "transitionStateIntelligence": {
    "posture": "Thread and tab changes should feel like one continuous workspace.",
    "tabAndModeSwitching": {
      "duplicateModeConflict": {
        "detected": true,
        "doInstead": ["keep Discuss and Operational visible", "remove the duplicate dropdown for the same mode set"]
      }
    },
    "loadingStrategy": {
      "defaultMode": "Preserve shell chrome and swap only the content region that is loading."
    },
    "repairTargets": ["replace duplicate dropdown-plus-tab switching", "preserve focus and scroll anchors on refresh"]
  },
  "implementationReadiness": {
    "canStart": true,
    "requiresOnlyApproval": true,
    "inferredPlatform": "desktop-web"
  },
  "approvalPrompt": {
    "ask": "Approve applying the operational foundation and selected shell/components.",
    "scopeIfApproved": [ ... ]
  },
  "implementationStarter": {
    "foundationSetup": {
      "fonts": { ... },
      "spacing": { ... },
      "hierarchy": { ... }
    },
    "firstPassAssets": [ ... ]
  },
  "iconAndInteractionIntelligence": {
    "iconUse": {
      "recommendedLibrary": "Lucide",
      "bestDefault": "Start with restrained 14-16px neutral icons and fix copy before adding emphasis."
    },
    "interactionModel": {
      "dropdownStrategy": { "preferInsteadOfRawSelect": [ ... ] },
      "viewSwitching": { "bestDefault": { "slug": "segmented-button-controls" } },
      "feedbackAndReaction": { "bestDefault": { "slug": "notification-toast-stack" } },
      "continuityAcrossWindows": { "bestDefault": { "slug": "minimal-sidebar" } }
    },
    "repairTargets": [ ... ]
  },
  "shell": {
    "appShell": { "slug": "ide-three-panel-shell" },
    "toolbar": { "slug": "filter-bar-chips" },
    "table": { "slug": "modern-table" },
    "inspector": { "slug": "master-detail-shell" }
  },
  "componentRecommendations": [
    { "category": "table", "primary": { "slug": "modern-table" }, "alternatives": [ ... ] },
    { "category": "filters", "primary": { "slug": "filter-bar-chips" }, "alternatives": [ ... ] }
  ],
  "compositionPlan": [ ... ]
}`,
    },
    {
      method: "POST",
      path: "/api/agent",
      description: "Workflow audit mode for now-vs-later iteration guidance on an active routed surface",
      example: `{
  "mode": "workflow-audit-and-iteration",
  "endpoint": "/api/agent",
  "stage": "workflow-audit-and-iteration",
  "currentDirectionToPreserve": [ "..." ],
  "majorPitfallsOrWorkflowFlaws": [ "..." ],
  "whatToFixInThisIteration": [ "..." ],
  "whatToDeferUntilLater": [ "..." ],
  "promptingOrWorkflowAdjustments": [ "..." ]
}`,
    },
    {
      method: "POST",
      path: "/api/agent",
      description: "Elevation audit mode — distinguishes what is already good from what makes a surface genuinely great",
      example: `{
  "mode": "elevation-audit",
  "stage": "elevation-audit",
  "elevationReadiness": "ready_to_elevate",
  "whatIsAlreadyGood": [ "..." ],
  "genericTraps": [ "..." ],
  "frictionCuts": [ "..." ],
  "differentiatingMoves": [ "..." ],
  "elevationSequence": [ "1. Structure", "2. Copy", "3. Interaction", "4. Data signals", "5. Color semantics", "6. Polish" ],
  "elevationMaxim": "..."
}`,
    },
    {
      method: "POST",
      path: "/api/agent",
      description: "Funnel strategy mode — derives friction profile, tension strategy, CTA guidance, and timing map from business profile and funnel context",
      example: `{
  "mode": "funnel-strategy",
  "stage": "funnel-strategy",
  "funnelType": "frictionless lead capture for local service",
  "frictionProfile": "frictionless",
  "trafficTemperature": "cold",
  "conversionMechanism": "email-capture",
  "tensionStrategy": [ "..." ],
  "ctaGuidance": { "primary": "...", "secondaryCta": "...", "timing": "...", "copyDirection": "..." },
  "dataCollectionOrder": [ "..." ],
  "dropoffRisks": [ "..." ],
  "progressionAnchors": [ "..." ],
  "trustSignalPlacement": [ "..." ],
  "timingMap": [ { "moment": "0–3s", "userState": "...", "deliverNow": [], "deferUntil": [] } ],
  "componentSuggestions": [ "marketing-hero-shell", "hero-cta-buttons", "..." ]
}`,
    },
    {
      method: "GET",
      path: "/api/llm/components",
      description: "All components with full source code",
      example: `{
  "total": 177,
  "filter": { "category": null, "q": null },
  "components": [
    {
      "slug": "primary-button-variants",
      "title": "Primary Button Variants",
      "description": "Five button states including default, hover, loading, disabled, and icon.",
      "category": "Buttons",
      "tags": ["button", "interactive", "states"],
      "code": "export function PrimaryButton() { ... }",
      "techStack": ["react", "tailwind"],
      "licenseType": "free"
    }
  ]
}`,
    },
    {
      method: "GET",
      path: "/api/llm/components?category=Loading",
      description: "Filter by category name",
      example: `{
  "total": 3,
  "filter": { "category": "Loading", "q": null },
  "components": [ ... ]
}`,
    },
    {
      method: "GET",
      path: "/api/llm/components?q=button",
      description: "Search components by keyword",
      example: `{
  "total": 5,
  "filter": { "category": null, "q": "button" },
  "components": [ ... ]
}`,
    },
    {
      method: "GET",
      path: "/api/llm/components/:slug",
      description: "Single component — full code, metadata, preview",
      example: `{
  "slug": "stat-cards-with-trends",
  "title": "Stat Cards with Trends",
  "description": "Dashboard KPI cards with trend indicators.",
  "category": "Dashboard",
  "code": "export function StatCard({ ... }) { ... }",
  "techStack": ["react", "tailwind", "recharts"],
  "verified": true,
  "productionReady": true
}`,
    },
    {
      method: "GET",
      path: "/api/llm/categories",
      description: "All categories with component counts and direct API URLs",
      example: `{
  "total": 25,
  "componentTotal": 177,
  "categories": [
    {
      "name": "Buttons",
      "slug": "buttons",
      "count": 4,
      "apiUrl": "/api/llm/components?category=Buttons",
      "components": [
        { "slug": "primary-button-variants", "title": "Primary Button Variants", "tags": [...] }
      ]
    }
  ]
}`,
    },
  ];

  const cursorInstructions = `Add this URL to your Cursor AI context when you want the full admin/workbench redesign bundle in one shot:
${agentBundleUrl}

Then ask:
"Use this bundle as the design system and redesign my reconciliation workbench"
"Build a dense approvals UI using the shell, table, filter, and decision patterns in this bundle"`;

  const directFetchPayload = `{
  "surfaceType": "internal-operations",
  "sector": "policy-admin",
  "route": "operational-workbench",
  "goal": "resolve precise component recommendations for an internal company portal",
  "constraints": {
    "density": "compact",
    "visualPosture": "serious, restrained, operational"
  },
  "layoutNeeds": ["left navigation", "compact top bar", "filter toolbar", "table-first workspace", "right-side inspector"],
  "context": {
    "summary": "This is a handoff from another agent routing a live UI complaint.",
    "problemStatement": "The controls and copy are weak, and the surface does not communicate the current work state clearly.",
    "routingIntent": "Return interaction-quality resources and a stronger operational shell.",
    "agentNotes": ["Treat the payload as the live problem statement", "Do not assume any local session context"],
    "originalPrompt": "make this feel like an operational inventory instead of a dashboard",
    "userComplaint": "tabs, dropdowns, icons, and sign-out all feel weak and generic",
    "primaryObject": "inventory item",
    "userRoles": ["warehouse operator", "inventory manager"],
    "dataSources": ["inventory database", "cycle-count exceptions queue"],
    "mutations": ["adjust quantity", "assign recount", "approve exception"],
    "timelineMoments": ["received", "counted", "reconciled", "approved"],
    "knownProblems": ["unstyled selects", "ambiguous labels", "weak cross-window continuity"],
    "observedAsyncProblems": ["tab switch blanks the pane", "chat thread refresh resets focus"],
    "visibleModes": ["Discuss", "Operational"],
    "competingControls": ["Focus dropdown with Discuss, Summary, Mute, Reply, Draft"],
    "transitionsNeedingCoverage": ["tab switch", "thread loading", "inspector refresh"],
    "desiredResources": ["tabs and filter guidance", "dropdown alternatives", "icon posture", "interaction feedback"]
  },
  "screenshots": [
    {
      "name": "employee-login.png",
      "type": "image/png",
      "dataUrl": "data:image/png;base64,<redacted>"
    }
  ],
  "output": {
    "rankedComponents": true,
    "alternativesPerCategory": 3,
    "includeAnatomy": true,
    "includeStateCoverage": true,
    "includeTransitionGuidance": true,
    "includeCompositionGuidance": true,
    "includeTokenPosture": true,
    "includeAiReasoning": true,
    "includeComponentSource": true,
    "maxSourceMatches": 2
  }
}`;

  const directFetchCommand = `curl -X POST "${agentBundleUrl}" \\
  -H "Content-Type: application/json" \\
  -d @agent-payload.json \\
  | jq '{ surfaceType, dominantTaskSurface, confidenceMode, shellRecommendation, aiReasoningStatus, componentMatches: [.componentMatches[0:3][] | { slug, deliveryMode, implementationPosture, sourcePath: .source.path }] }'`;

  const workflowAuditPayload = `{
  "stage": "workflow-audit-and-iteration",
  "route": "operational-workbench",
  "prompt": "This is an internal operations workbench for a company system. Primary user: manager. Primary object: client relationship, account, event, and task records moving through acquisition, onboarding, fulfillment, and retention. Data sources: CRM, scheduling API, internal task queue, and role-based operational records. Allowed mutations: assign ownership, update status, schedule or reschedule work, add notes, move lifecycle stage, and route follow-up. Lifecycle: new client, qualification, cadence, fulfillment, recovery, review. Target surface under review: cross-workspace control system for Clients, Fulfillment, and Workday. What already works: the portal reads as a serious internal system, the workspaces are clearer, and the shared controls are more compact. Current problems: some surfaces still risk layout instability, some control systems can still feel heavier than the work they govern, and cross-workspace consistency can drift during local fixes. Relevant recent changes: shared controls were compacted, sticky workspace-toolbar behavior was removed, and empty states were stabilized. What must not be lost: the operational posture, the client-lifecycle-first model, the denser workbench feel, and the stronger first-step guidance."
}`;

  const workflowAuditCommand = `curl -X POST "${agentBundleUrl}" \\
  -H "Content-Type: application/json" \\
  -d @workflow-audit.json \\
  | jq '{ mode, stage, currentDirectionToPreserve, whatToFixInThisIteration, whatToDeferUntilLater }'`;

  const workflowAuditResponse = `{
  "mode": "workflow-audit-and-iteration",
  "stage": "workflow-audit-and-iteration",
  "currentDirectionToPreserve": [
    "Keep the serious operational posture.",
    "Preserve the client-lifecycle-first model.",
    "Keep shared controls compact.",
    "Preserve stronger first-step guidance."
  ],
  "majorPitfallsOrWorkflowFlaws": [
    "Cross-workspace consistency can drift during local fixes.",
    "Some state changes still threaten layout stability.",
    "Control systems can get heavier than the work they govern.",
    "Workspace-level fixes can quietly weaken shell rules.",
    "Lifecycle language can drift from the actual record model."
  ],
  "whatToFixInThisIteration": [
    "Lock shared control ownership.",
    "Fix unstable transitions without adding new containers.",
    "Normalize control grammar across workspaces.",
    "Keep empty and populated states structurally aligned.",
    "Remove control weight that is not earning its place."
  ],
  "whatToDeferUntilLater": [
    "Secondary visual polish.",
    "Non-critical motion polish.",
    "Broader shell expansion before rules are stable."
  ],
  "promptingOrWorkflowAdjustments": [
    "State what must remain fixed before local changes.",
    "Describe control ownership explicitly.",
    "Separate structural fixes from visual polish.",
    "Force now-vs-later decisions.",
    "Treat cross-workspace consistency as a first-class evaluation target."
  ]
}`;

  const elevationAuditPayload = `{
  "stage": "elevation-audit",
  "route": "operational-workbench",
  "prompt": "Internal client management workbench. Primary object: client record.",
  "context": {
    "userComplaint": "The surface feels generic — cards everywhere, kebab menus on every row, and labels like Dashboard and Overview that could belong to any software.",
    "primaryObject": "client record",
    "userRoles": ["operations manager"],
    "existingSurfaceSignals": ["client queue", "task panel", "lifecycle tracker"]
  }
}`;

  const elevationAuditCommand = `curl -X POST "${agentBundleUrl}" \\
  -H "Content-Type: application/json" \\
  -d @elevation-audit.json \\
  | jq '{ mode, elevationReadiness, genericTraps, differentiatingMoves, elevationMaxim }'`;

  const elevationAuditResponse = `{
  "mode": "elevation-audit",
  "stage": "elevation-audit",
  "elevationReadiness": "ready_to_elevate",
  "whatIsAlreadyGood": [
    "Established surface vocabulary: client queue and task panel are present and routed correctly.",
    "Surface is correctly classified as Internal Operations — foundational design discipline is in place.",
    "User role (operations manager) is named — the surface has a clear operator, not an imagined audience."
  ],
  "genericTraps": [
    "Card-as-container dependency: borders and card elevation are doing organizational work that type weight and proximity should handle.",
    "Generic surface labels (dashboard, overview, manage) — no product-specific language tied to the actual objects.",
    "Kebab menus or 'More options' everywhere — if 2–3 actions are always relevant, they should be visible as in-context controls."
  ],
  "frictionCuts": [
    "Reduce decision friction at the primary entry point: the first action requires no scanning to find.",
    "Reduce copy friction: replace any label that requires reading with one understood on sight.",
    "Reduce state friction: every state transition communicates specifically what changed and what to do next."
  ],
  "differentiatingMoves": [
    "Typography as structure: remove card borders from grouped regions and let heading weight do the organization.",
    "Object-specific copy: rename labels to reflect the actual object lifecycle — 'Client Pipeline' not 'Dashboard'.",
    "Monospace data signals: apply JetBrains Mono to IDs, timestamps, money, and counts.",
    "Purposeful micro-transitions: 100–150ms ease-in-out on hover for rows, panels, drawers."
  ],
  "elevationSequence": [
    "1. Structure: Type hierarchy replaces borders and card elevation.",
    "2. Copy: Generic labels replaced with object-specific language.",
    "3. Interaction: Single timing token applied uniformly to all interactive regions.",
    "4. Data signals: Monospace token applied to all IDs, timestamps, currencies, counts.",
    "5. Color semantics: Accent audited — action only, no decorative uses.",
    "6. Polish: Motion depth, spacing rhythm, empty-state craft."
  ],
  "elevationMaxim": "Great operational software reads like precision instruments: every label names something real, every control does exactly one thing, and the surface communicates competence before beauty."
}`;

  const funnelStrategyPayload = `{
  "stage": "funnel-strategy",
  "prompt": "Lead capture landing page for a local HVAC company running Facebook ads to cold traffic.",
  "funnelContext": {
    "audienceWarmth": "cold",
    "commitmentRequired": "email",
    "businessProfile": {
      "businessType": "local service",
      "industry": "home services",
      "targetAudience": "homeowners in the metro area"
    }
  }
}`;

  const funnelStrategyCommand = `curl -X POST "${agentBundleUrl}" \\
  -H "Content-Type: application/json" \\
  -d @funnel-strategy.json \\
  | jq '{ mode, frictionProfile, trafficTemperature, ctaGuidance, timingMap }'`;

  const funnelStrategyResponse = `{
  "mode": "funnel-strategy",
  "stage": "funnel-strategy",
  "funnelType": "frictionless lead capture for local service",
  "frictionProfile": "frictionless",
  "trafficTemperature": "cold",
  "conversionMechanism": "email-capture",
  "tensionStrategy": [
    "Transform-first hook: lead with the specific outcome the visitor will gain, not the product features, in the first 3 seconds.",
    "Minimum viable commitment: email or one-click — every additional field reduces completion by 15–20%.",
    "Social proof after decision, not before: logo bars build recognition; testimonials near CTA validate the action.",
    "Price invisible at cold entry — emotional buy-in before financial commitment.",
    "Make the CTA the only decision: one primary action, one page, one promise."
  ],
  "ctaGuidance": {
    "primary": "Get [specific outcome] free — name the transformation, not the product.",
    "secondaryCta": "See how it works — a softer option for skeptics.",
    "timing": "Above the fold, visible without scrolling.",
    "copyDirection": "Outcome-first, benefit-specific, zero feature language."
  },
  "timingMap": [
    { "moment": "0–3s first impression", "userState": "Curious but skeptical", "deliverNow": ["Transformation headline", "Social proof number"], "deferUntil": ["Pricing", "Feature lists"] },
    { "moment": "3–15s value scan", "userState": "Evaluating belief", "deliverNow": ["Logo bar or count", "1-sentence benefit"], "deferUntil": ["Long testimonials", "FAQ"] },
    { "moment": "15–40s decision point", "userState": "Ready to act or leave", "deliverNow": ["Primary CTA", "Privacy note"], "deferUntil": ["Multi-field expansion", "Pricing"] }
  ],
  "componentSuggestions": ["marketing-hero-shell", "hero-cta-buttons", "sign-in-form-clean", "testimonial-card", "review-card", "trial-banner"]
}`;

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Bot className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight" data-testid="text-page-title">
            For AI Assistants
          </h1>
          <p className="text-muted-foreground mt-1 max-w-xl">
            Use /api/agent as the main contract. Use llms.txt only as a crawlable fallback when a client cannot
            call the structured API and needs raw library discovery instead.
          </p>
        </div>
      </div>

      {/* Overview */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          <h2 className="font-display font-semibold text-lg">System Overview</h2>
        </div>
        <div className="rounded-2xl border border-primary/25 bg-primary/4 p-6 space-y-5">
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_360px]">
            <OverviewCanvas />

            <div className="grid gap-4 content-start">
              <OverviewUrlCard
                title="Default Path"
                mode="Structured API"
                url={agentBundleUrl}
                copyLabel="Copy API URL"
                chips={["default path", "structured contract", "route here first"]}
                hoverTitle="Structured API"
                hoverBody="This is the main path. Give /api/agent the problem statement, complaint context, route hint if you have one, and any useful operating truth. The service should do the routing work."
                hoverPoints={[
                  "Use this even when the route is uncertain; ambiguity is the router's job, not the caller's burden.",
                  "The system classifies, asks for missing truth when needed, and returns guidance or resolution posture.",
                  "This is the right path for almost all agent-to-agent handoff and redesign work.",
                ]}
                tone="primary"
              />
              <OverviewUrlCard
                title="Fallback Path"
                mode="Library Index"
                url={llmsTxtUrl}
                copyLabel="Copy llms.txt"
                chips={["fallback only", "crawlable corpus", "non-API clients"]}
                hoverTitle="Library Index"
                hoverBody="This is not a second product-routing mode. It is a crawlable library index for clients that cannot use the structured API or need raw corpus discovery."
                hoverPoints={[
                  "Use it when a tool only knows how to crawl text documents and cannot send a real API payload.",
                  "Use it for broad library inspection, not for deciding whether a screen deserves routing.",
                  "If you can call /api/agent, you usually should.",
                ]}
                tone="muted"
              />
              <div className="rounded-[22px] border border-border bg-background/80 p-4">
                <div className="flex flex-wrap gap-2">
                  <OverviewHintChip
                    label="api first"
                    title="Default Decision"
                    body="The caller should not have to pre-decide between routing and browsing in normal product use. If you have a real UI problem statement, send it to /api/agent and let the service determine whether it can route, must ask, or should stay unknown."
                    points={[
                      "The user describes the problem. The router interprets it. That is the actual contract.",
                      "If callers must choose discovery versus routing too often, that is a product-architecture smell.",
                    ]}
                    tone="primary"
                  />
                  <OverviewHintChip
                    label="llms.txt is fallback"
                    title="When To Use The Index"
                    body="Use llms.txt only when the consuming agent cannot call the structured endpoint or needs raw library crawling for offline or external retrieval. It is infrastructure, not a parallel product mode."
                    points={[
                      "llms.txt is useful for discovery tooling, corpus indexing, and broad reference search.",
                      "It should not be the thing that decides whether a real UI complaint deserves routing.",
                    ]}
                  />
                  <OverviewHintChip
                    label="context first"
                    title="Why Context Wins"
                    body="The router gets sharper when it receives portable context: complaint summary, visible mode conflicts, async-state failures, structural pressure, and screenshots when useful."
                    points={[
                      "More context means better precision about what is structural, what is noise, and what should be inspected first.",
                      "The goal is not more words; the goal is the right signals.",
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <a
              href="/llms.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
              data-testid="link-view-llms-txt"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View llms.txt
            </a>
          </div>
        </div>
      </section>

      {/* How to use in AI tools */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-primary" />
          <h2 className="font-display font-semibold text-lg">Using with AI Coding Assistants</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-border rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-purple-500/10 rounded-md flex items-center justify-center">
                <Code2 className="w-3.5 h-3.5 text-purple-400" />
              </div>
              <span className="font-medium text-sm">Cursor</span>
            </div>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Open Cursor Settings → Docs</li>
              <li>Add <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">{agentBundleUrl}</code></li>
              <li>Ask a precise question like “this is an internal company operations dashboard”</li>
            </ol>
            <CopyButton text={cursorInstructions} label="Copy instructions" />
          </div>
          <div className="border border-border rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500/10 rounded-md flex items-center justify-center">
                <Code2 className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <span className="font-medium text-sm">VS Code + GitHub Copilot</span>
            </div>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Paste <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">{agentBundleUrl}</code> in chat</li>
              <li>Use it to classify the surface and get the right resource pull first</li>
              <li>Set <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">includeComponentSource</code> or <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">includeAiReasoning</code> on the same endpoint when you need implementation-ready or merged guidance</li>
            </ol>
          </div>
          <div className="border border-border rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-500/10 rounded-md flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-orange-400" />
              </div>
              <span className="font-medium text-sm">ChatGPT / Claude</span>
            </div>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Paste <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">{agentBundleUrl}</code> directly</li>
              <li>Ask the model to classify the UI type before writing any redesign</li>
              <li>Use the returned <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">surfaceType</code>, <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">dominantTaskSurface</code>, and <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">componentMatches</code> as the build route</li>
            </ol>
          </div>
          <div className="border border-border rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500/10 rounded-md flex items-center justify-center">
                <Terminal className="w-3.5 h-3.5 text-green-400" />
              </div>
              <span className="font-medium text-sm">Direct fetch in scripts</span>
            </div>
            <p className="text-sm text-muted-foreground">
              If you attach screenshots to <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">POST /api/agent</code>, the server grounds the complaint privately before routing. The API key stays server-side.
            </p>
            <p className="text-sm text-muted-foreground">
              Add <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">includeAiReasoning</code> when you want the static packet merged with model judgment, and <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">includeComponentSource</code> when you want eligible matches hydrated with real component files.
            </p>
            <div className="rounded-lg border border-border bg-secondary/10 p-3 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <code className="rounded bg-background px-2 py-1 text-[11px] font-mono text-primary/80">POST /api/agent</code>
                <span className="text-xs text-muted-foreground">Keep the script path compact here. Copy the command and payload separately.</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <CopyButton text={directFetchCommand} label="Copy curl" />
                <CopyButton text={directFetchPayload} label="Copy JSON payload" />
                <CopyButton text={agentBundleUrl} label="Copy endpoint" />
              </div>
              <div className="rounded-md border border-border bg-background px-3 py-2">
                <code className="block text-[11px] font-mono leading-relaxed text-muted-foreground break-all">{directFetchCommand}</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-primary" />
          <h2 className="font-display font-semibold text-lg">Workflow Audit Mode</h2>
        </div>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="rounded-2xl border border-border p-5 space-y-4">
            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">when to use it</div>
              <p className="text-sm text-muted-foreground leading-6">
                Use this stage when the surface already has a routed direction and you need iteration judgment instead of another generic redesign pass. It returns preserve, pitfalls, fix-now, defer-later, and prompting-adjustment guidance.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground">stage hint</span>
              <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground">now vs later</span>
              <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground">workflow critique</span>
            </div>
            <div className="rounded-lg border border-border bg-secondary/10 p-3 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <code className="rounded bg-background px-2 py-1 text-[11px] font-mono text-primary/80">POST /api/agent</code>
                <span className="text-xs text-muted-foreground">Set stage to workflow-audit-and-iteration and send the current routed surface as one dense prompt.</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <CopyButton text={workflowAuditCommand} label="Copy curl" />
                <CopyButton text={workflowAuditPayload} label="Copy audit payload" />
                <CopyButton text={workflowAuditResponse} label="Copy sample response" />
              </div>
              <div className="rounded-md border border-border bg-background px-3 py-2">
                <code className="block text-[11px] font-mono leading-relaxed text-muted-foreground break-all">{workflowAuditCommand}</code>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-border p-5 space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">payload shape</div>
              <CodeBlock code={workflowAuditPayload} language="json" />
            </div>
            <div className="rounded-2xl border border-border p-5 space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">response shape</div>
              <CodeBlock code={workflowAuditResponse} language="json" />
            </div>
          </div>
        </div>
      </section>

      {/* Elevation Audit Mode */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-primary" />
          <h2 className="font-display font-semibold text-lg">Elevation Audit Mode</h2>
        </div>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="rounded-2xl border border-border p-5 space-y-4">
            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">when to use it</div>
              <p className="text-sm text-muted-foreground leading-6">
                Use this stage when the surface is functional and structurally sound but still feels generic. It returns what's already working, the generic traps present, specific friction cuts, ranked differentiating moves, an elevation sequence, and a one-sentence design maxim for this surface.
              </p>
              <p className="text-sm text-muted-foreground leading-6">
                Good is functional, smooth, and easy to understand. Great is cutting down friction points and applying design moves that create separation from basic software — object-specific copy, typography as structure, purposeful micro-transitions, semantic color, and monospace data signals.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground">elevation sequence</span>
              <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground">generic trap detection</span>
              <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground">friction cuts</span>
            </div>
            <div className="rounded-lg border border-border bg-secondary/10 p-3 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <code className="rounded bg-background px-2 py-1 text-[11px] font-mono text-primary/80">POST /api/agent</code>
                <span className="text-xs text-muted-foreground">Set stage to elevation-audit. Include userComplaint, existingSurfaceSignals, and primaryObject for sharpest output.</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <CopyButton text={elevationAuditCommand} label="Copy curl" />
                <CopyButton text={elevationAuditPayload} label="Copy payload" />
                <CopyButton text={elevationAuditResponse} label="Copy sample response" />
              </div>
              <div className="rounded-md border border-border bg-background px-3 py-2">
                <code className="block text-[11px] font-mono leading-relaxed text-muted-foreground break-all">{elevationAuditCommand}</code>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-border p-5 space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">payload shape</div>
              <CodeBlock code={elevationAuditPayload} language="json" />
            </div>
            <div className="rounded-2xl border border-border p-5 space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">response shape</div>
              <CodeBlock code={elevationAuditResponse} language="json" />
            </div>
          </div>
        </div>
      </section>

      {/* Funnel Strategy Mode */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-primary" />
          <h2 className="font-display font-semibold text-lg">Funnel Strategy Mode</h2>
        </div>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="rounded-2xl border border-border p-5 space-y-4">
            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">when to use it</div>
              <p className="text-sm text-muted-foreground leading-6">
                Use this stage when building a conversion surface. Pass a <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">funnelContext</code> object with audience warmth, commitment level, price point, and a <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">businessProfile</code> (type, industry, target audience). The business profile is designed to be populated directly from a CRM contact record — an agent with access to a GHL or similar platform passes this in automatically.
              </p>
              <p className="text-sm text-muted-foreground leading-6">
                Returns friction profile, tension strategy, CTA guidance, data collection order, dropoff risks, progression anchors, trust signal timing, a temporal timing map (what to reveal and when in the visitor journey), and catalog component slugs — no bundle load, Vercel-safe.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground">friction profile</span>
              <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground">timing map</span>
              <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground">business profile aware</span>
            </div>
            <div className="rounded-lg border border-border bg-secondary/10 p-3 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <code className="rounded bg-background px-2 py-1 text-[11px] font-mono text-primary/80">POST /api/agent</code>
                <span className="text-xs text-muted-foreground">Set stage to funnel-strategy. Pass funnelContext.businessProfile for automatic friction profile derivation from business type.</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <CopyButton text={funnelStrategyCommand} label="Copy curl" />
                <CopyButton text={funnelStrategyPayload} label="Copy payload" />
                <CopyButton text={funnelStrategyResponse} label="Copy sample response" />
              </div>
              <div className="rounded-md border border-border bg-background px-3 py-2">
                <code className="block text-[11px] font-mono leading-relaxed text-muted-foreground break-all">{funnelStrategyCommand}</code>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-border p-5 space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">payload shape</div>
              <CodeBlock code={funnelStrategyPayload} language="json" />
            </div>
            <div className="rounded-2xl border border-border p-5 space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">response shape</div>
              <CodeBlock code={funnelStrategyResponse} language="json" />
            </div>
          </div>
        </div>
      </section>

      {/* Example prompts */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-primary" />
          <h2 className="font-display font-semibold text-lg">Example Prompts</h2>
        </div>
        <div className="grid gap-3">
          {[
            {
              prompt: "Ask /api/agent whether this is an internal operations dashboard and use the returned resource pull before fetching any deeper references",
              url: `${agentBundleUrl}?question=this+is+an+internal+operations+dashboard`,
            },
            {
              prompt: "Post stage=workflow-audit-and-iteration to /api/agent and return preserve, fix-now, and defer-later guidance for this current workbench iteration",
              url: `${agentBundleUrl}  (POST with stage payload)`,
            },
            {
              prompt: "Post stage=elevation-audit to /api/agent with the current surface complaint and return genericTraps, differentiatingMoves, and elevationMaxim",
              url: `${agentBundleUrl}  (POST with elevation-audit stage)`,
            },
            {
              prompt: "Post stage=funnel-strategy with funnelContext.businessProfile populated from the CRM contact record and return frictionProfile, ctaGuidance, and timingMap",
              url: `${agentBundleUrl}  (POST with funnel-strategy stage)`,
            },
            {
              prompt: "Fetch /api/llm/components?category=Loading and give me a skeleton loader for a card grid",
              url: `${baseUrl}/api/llm/components?category=Loading`,
            },
            {
              prompt: "Get /api/llm/components/stat-cards-with-trends and adapt it for my analytics dashboard",
              url: `${baseUrl}/api/llm/components/stat-cards-with-trends`,
            },
            {
              prompt: "Search /api/llm/components?q=empty+state and use the first result in my data table",
              url: `${baseUrl}/api/llm/components?q=empty+state`,
            },
            {
              prompt: "List /api/llm/categories and tell me what authentication components are available",
              url: `${baseUrl}/api/llm/categories`,
            },
          ].map(({ prompt, url }) => (
            <div key={url} className="border border-border rounded-lg p-4 space-y-2.5 hover:bg-secondary/20 transition-colors">
              <p className="text-sm italic text-muted-foreground">"{prompt}"</p>
              <div className="flex items-center gap-2">
                <code className="text-xs font-mono text-primary/80 flex-1 truncate">{url}</code>
                <CopyButton text={url} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* API Reference */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-primary" />
          <h2 className="font-display font-semibold text-lg">API Reference</h2>
        </div>
        <p className="text-sm text-muted-foreground">Click any endpoint to see the response format.</p>
        <div className="space-y-2">
          {endpoints.map((ep) => (
            <EndpointCard key={ep.path} {...ep} />
          ))}
        </div>
      </section>

      {/* Categories quick reference */}
      {categoriesData && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            <h2 className="font-display font-semibold text-lg">
              All Categories ({categoriesData.total})
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {categoriesData.categories.map((cat) => {
              const url = `${baseUrl}${cat.apiUrl}`;
              return (
                <div
                  key={cat.name}
                  data-testid={`card-category-${cat.slug}`}
                  className="border border-border rounded-lg p-4 space-y-2 hover:bg-secondary/20 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{cat.name}</span>
                    <span className="text-xs text-muted-foreground font-mono">{cat.count}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs font-mono text-primary/70 truncate flex-1">{cat.apiUrl}</code>
                    <CopyButton text={url} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Raw llms.txt preview */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-primary" />
            <h2 className="font-display font-semibold text-lg">llms.txt Discovery File</h2>
          </div>
          <a
            href="/llms.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            data-testid="link-open-llms-txt"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open in browser
          </a>
        </div>
        <p className="text-sm text-muted-foreground">
          The <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">/llms.txt</code> file follows the emerging{" "}
          <a href="https://llmstxt.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">llmstxt.org</a>{" "}
          standard. Many AI assistants can parse it automatically when you add the URL to their context.
          Use it for discovery mode. If you want the one-shot full-context path instead, use <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">/api/agent</code>.
        </p>
      </section>
    </Layout>
  );
}
