import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { apiRequest } from "@/lib/queryClient";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import {
  Bot, Copy, Check, Layers, Zap, ChevronLeft, ChevronRight,
  ArrowRight, ExternalLink, Code2, LoaderCircle, PlayCircle, Sparkles, Target,
} from "lucide-react";

type OverviewHintTone = "primary" | "muted";

// --- Copy Button ---

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

// --- Overview Canvas ---

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
          known &rarr; route | unknown &rarr; crawl
        </div>
      </div>
    </div>
  );
}

// --- Overview URL Card ---

function OverviewUrlCard({
  title, mode, url, copyLabel, chips, hoverTitle, hoverBody, hoverPoints, tone = "primary",
}: {
  title: string; mode: string; url: string; copyLabel: string; chips: string[];
  hoverTitle: string; hoverBody: string; hoverPoints: string[]; tone?: "primary" | "muted";
}) {
  const shellClass = tone === "primary" ? "border-primary/25 bg-primary/[0.06]" : "border-border bg-background/80";
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
                <span className="rounded-full border border-border bg-background px-2 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground">why</span>
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
                    <div key={point} className="rounded-2xl border border-border bg-card/70 px-3 py-2 text-xs leading-relaxed text-muted-foreground">{point}</div>
                  ))}
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        <CopyButton text={url} label={copyLabel} />
      </div>
      <div className="mt-4 rounded-2xl border border-border bg-card/80 p-3 font-mono text-xs break-all text-primary/85">{url}</div>
      <div className="mt-4 flex flex-wrap gap-2">
        {chips.map((chip) => (
          <span key={chip} className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground">{chip}</span>
        ))}
      </div>
    </div>
  );
}

// --- Overview Hint Chip ---

function OverviewHintChip({
  label, title, body, points, tone = "muted",
}: {
  label: string; title: string; body: string; points: string[]; tone?: OverviewHintTone;
}) {
  const shellClass = tone === "primary"
    ? "border-primary/25 bg-primary/10 text-primary"
    : "border-border bg-card text-muted-foreground";
  return (
    <HoverCard openDelay={90} closeDelay={70}>
      <HoverCardTrigger asChild>
        <button type="button" className={`rounded-full border px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em] transition-colors hover:bg-background ${shellClass}`}>{label}</button>
      </HoverCardTrigger>
      <HoverCardContent className="w-[320px] rounded-[20px] border-border bg-background/95 p-4 shadow-[0_20px_40px_rgba(15,23,42,0.14)] backdrop-blur-sm">
        <div className="space-y-3">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">{title}</div>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{body}</p>
          </div>
          <div className="space-y-1.5">
            {points.map((point) => (
              <div key={point} className="rounded-2xl border border-border bg-card/70 px-3 py-2 text-xs leading-relaxed text-muted-foreground">{point}</div>
            ))}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

// --- Mode Data ---

type ModeColor = "blue" | "violet" | "amber" | "emerald";

interface ModeEntry {
  id: string;
  label: string;
  color: ModeColor;
  description: string;
  returns: string[];
  stage: string | null;
}

const MODES: ModeEntry[] = [
  {
    id: "resolution",
    label: "Component Resolution",
    color: "blue",
    description:
      "The main mode. Send a problem statement — what the surface is, what the complaint is, who uses it, and what it needs to do. The API classifies the surface, routes it to the right design profile, and comes back with ranked component recommendations and the reasoning behind each one. Attach screenshots and the response gets grounded against what is actually on screen.",
    returns: [
      "Surface classification and design profile",
      "Ranked component matches per UI category",
      "Composition and interaction guidance",
      "Screenshot-grounded routing when images are included",
    ],
    stage: null,
  },
  {
    id: "workflow-audit",
    label: "Workflow Audit",
    color: "violet",
    description:
      "Your surface has a direction and you're iterating on it. Send the current state as a dense summary and get back exactly three things: what to keep, what to fix in this pass, and what to defer. A forcing function — instead of restarting from scratch, it names the specific failures worth addressing right now and nothing else.",
    returns: [
      "What is working and must not be touched",
      "Specific structural pitfalls and workflow flaws",
      "Prioritized fix list scoped to this iteration only",
      "Prompting adjustments for the next agent pass",
    ],
    stage: "workflow-audit-and-iteration",
  },
  {
    id: "elevation-audit",
    label: "Elevation Audit",
    color: "amber",
    description:
      "Your surface is functional and structured but still feels like generic software. This mode names the exact traps making it look like every other app, identifies specific moves that create separation from baseline tooling, and returns a ranked execution sequence. Ends with a single design maxim written for this specific surface.",
    returns: [
      "What is already good and should not be touched",
      "Generic trap inventory with specific offenders named",
      "Ranked differentiating moves per elevation layer",
      "Elevation sequence: structure > copy > interaction > data signals > color > polish",
    ],
    stage: "elevation-audit",
  },
  {
    id: "funnel-strategy",
    label: "Funnel Strategy",
    color: "emerald",
    description:
      "Tell it your business type, audience warmth, and what commitment the page asks for. Returns a full conversion blueprint — friction level, funnel pattern, six ordered page sections, one design direction, positioning angles, and the logic behind where the page earns and spends attention. An agent with CRM access can populate the business profile field directly without any manual configuration.",
    returns: [
      "Friction profile and traffic temperature classification",
      "Pattern classification like VSL to calendar, webinar to call, or advertorial to application",
      "Full page flow from attention through objection handling",
      "Per-section layout blueprint with hierarchy, content blocks, and interaction",
      "One controlled design direction applied across the whole page",
      "Conversion logic explaining where attention is controlled and friction is removed",
    ],
    stage: "funnel-strategy",
  },
];

type FunnelAudienceWarmth = "cold" | "warm" | "hot";
type FunnelCommitment = "none" | "email" | "trial" | "purchase" | "application";
type FunnelPricePoint = "free" | "low" | "medium" | "high" | "enterprise";
type FunnelLayoutFamily = "minimal-conversion" | "authority-consulting" | "high-ticket-offer" | "direct-response" | "editorial-premium" | "event-driven" | "conversational-sales" | "diagnostic-proof" | "selective-intake" | "utility-reassurance";

const FUNNEL_LAYOUT_FAMILIES: Array<{
  value: FunnelLayoutFamily;
  label: string;
  summary: string;
  visualPosture: string;
  layoutNeeds: string[];
}> = [
  {
    value: "minimal-conversion",
    label: "Minimal Conversion",
    summary: "Tight hierarchy, restrained proof, and direct next-step pressure.",
    visualPosture: "restrained, decisive, and conversion-first",
    layoutNeeds: ["compressed hero", "direct proof rail", "tight booking step"],
  },
  {
    value: "authority-consulting",
    label: "Authority / Consulting",
    summary: "Operator-led audit framing with credibility, diagnosis, and trust cues.",
    visualPosture: "operational, credible, and consultant-led",
    layoutNeeds: ["operator intro", "proof-led diagnostic blocks", "consulting CTA rail"],
  },
  {
    value: "high-ticket-offer",
    label: "High-Ticket Offer",
    summary: "Premium sales posture with proof, qualification, and selective booking.",
    visualPosture: "premium, selective, and sales-ready",
    layoutNeeds: ["founder-led VSL", "qualification before calendar", "availability rail"],
  },
  {
    value: "direct-response",
    label: "Direct Response",
    summary: "Clear mechanism, strong CTA pacing, and punchier sequence framing.",
    visualPosture: "urgent, legible, and response-oriented",
    layoutNeeds: ["teaching promise", "response CTA blocks", "high-clarity sequence steps"],
  },
  {
    value: "editorial-premium",
    label: "Editorial / Premium",
    summary: "Narrative proof, longer reading rhythm, and story-to-intent transitions.",
    visualPosture: "editorial, premium, and story-led",
    layoutNeeds: ["narrative masthead", "long-form proof pacing", "story bridge to application"],
  },
  {
    value: "event-driven",
    label: "Event-Driven",
    summary: "Registration-first pacing with agenda clarity, event checkpoints, and live-session momentum.",
    visualPosture: "scheduled, energetic, and registration-led",
    layoutNeeds: ["agenda-first hero", "event pacing", "registration checkpoint CTA"],
  },
  {
    value: "conversational-sales",
    label: "Conversational Sales",
    summary: "Compact handoff framing for warm chat-led buyers who should not feel dropped into a new campaign.",
    visualPosture: "conversational, credible, and handoff-led",
    layoutNeeds: ["conversation handoff", "operator diagnosis", "booking bridge"],
  },
  {
    value: "diagnostic-proof",
    label: "Diagnostic Proof",
    summary: "Analytical case-study pacing with evidence-heavy sections and a boardroom-clear CTA.",
    visualPosture: "analytical, proof-led, and decision-ready",
    layoutNeeds: ["case-study spine", "diagnostic evidence", "boardroom-clear CTA rail"],
  },
  {
    value: "selective-intake",
    label: "Selective Intake",
    summary: "Qualification-first framing that makes the application feel serious, finite, and earned.",
    visualPosture: "selective, procedural, and intake-led",
    layoutNeeds: ["fit threshold framing", "qualification sequence", "approval-to-booking bridge"],
  },
  {
    value: "utility-reassurance",
    label: "Utility Reassurance",
    summary: "Confirmation and prep flows with calm hierarchy, checklists, and obvious next steps.",
    visualPosture: "calm, practical, and reassurance-led",
    layoutNeeds: ["confirmation state", "prep checklist", "operational next-step rail"],
  },
];

const FUNNEL_LAYOUT_FAMILY_MAP = Object.fromEntries(
  FUNNEL_LAYOUT_FAMILIES.map((family) => [family.value, family]),
) as Record<FunnelLayoutFamily, (typeof FUNNEL_LAYOUT_FAMILIES)[number]>;

type FunnelPlaygroundForm = {
  prompt: string;
  audienceWarmth: FunnelAudienceWarmth;
  commitmentRequired: FunnelCommitment;
  pricePoint: FunnelPricePoint;
  businessType: string;
  industry: string;
  targetAudience: string;
  productType: string;
  conversionGoal: string;
  layoutFamily: FunnelLayoutFamily;
  visualPosture: string;
};

type FunnelPositioningVariant = {
  label: string;
  premise?: string;
  ctaFrame?: string;
  bestFor?: string;
};

type FunnelPageFlowEntry = {
  section?: string;
  label?: string;
  purpose?: string;
  sequenceIntent?: string;
};

type FunnelLayoutBlueprintEntry = {
  section?: string;
  label?: string;
  layoutType?: string;
  visualHierarchy?: {
    dominant?: string;
    supporting?: string;
  };
  contentBlocks?: string[];
  interaction?: string[];
};

type FunnelDesignDirection = {
  name?: string;
  rationale?: string;
  visualRules?: string[];
};

type FunnelConversionLogic = {
  whyThisStructureConverts?: string;
  attentionControl?: string;
  actionPressure?: string;
  frictionReduction?: string;
};

type FunnelTimingEntry = {
  stage?: string;
  moment?: string;
  label?: string;
  deliverNow?: string[];
  deferUntil?: string[];
};

type FunnelStrategyPayload = {
  funnelPattern?: string;
  frictionProfile?: string;
  conversionMechanism?: string;
  tensionStrategy?: string[];
  sequenceBlueprint?: string[];
  pageFlow?: FunnelPageFlowEntry[];
  layoutBlueprint?: FunnelLayoutBlueprintEntry[];
  designDirection?: FunnelDesignDirection;
  offerPositioningVariants?: FunnelPositioningVariant[];
  timingMap?: FunnelTimingEntry[];
  dropoffRisks?: string[];
  conversionLogic?: FunnelConversionLogic;
};

type FunnelPlaygroundData = {
  request: Record<string, unknown>;
  strategy: FunnelStrategyPayload;
};

const DEFAULT_FUNNEL_FORM: FunnelPlaygroundForm = {
  prompt: "Need a founder-led VSL funnel that warms cold traffic, qualifies hard, and moves the right buyers into a booked strategy call.",
  audienceWarmth: "cold",
  commitmentRequired: "application",
  pricePoint: "high",
  businessType: "coaching",
  industry: "business education",
  targetAudience: "founders selling premium transformation offers",
  productType: "VSL funnel",
  conversionGoal: "Book more sales-ready strategy calls",
  layoutFamily: "selective-intake",
  visualPosture: "selective, procedural, and intake-led",
};

const FUNNEL_PLAYGROUND_SCENARIOS: Array<{
  id: string;
  title: string;
  summary: string;
  form: FunnelPlaygroundForm;
}> = [
  {
    id: "vsl-to-call",
    title: "VSL to call",
    summary: "Cold traffic into authority-led VSL, qualifier, and calendar.",
    form: DEFAULT_FUNNEL_FORM,
  },
  {
    id: "vsl-gated-application",
    title: "Selective VSL gate",
    summary: "Media-first VSL stage with approval gating before the calendar unlocks.",
    form: {
      prompt: "Need a founder-led VSL funnel that warms cold traffic, qualifies hard, and only opens the calendar after the application is approved.",
      audienceWarmth: "cold",
      commitmentRequired: "application",
      pricePoint: "high",
      businessType: "coaching",
      industry: "business education",
      targetAudience: "premium transformation buyers who need founder authority before applying",
      productType: "VSL application gate",
      conversionGoal: "Drive approved applications before any calendar access opens",
      layoutFamily: "high-ticket-offer",
      visualPosture: "premium, selective, and sales-ready",
    },
  },
  {
    id: "application-first-compare",
    title: "Application-first intake",
    summary: "Operator-led qualification worksheet where fit scoring happens before any booking access.",
    form: {
      prompt: "Need a premium application-first funnel where the right buyer self-qualifies before the call opens.",
      audienceWarmth: "cold",
      commitmentRequired: "application",
      pricePoint: "high",
      businessType: "consulting",
      industry: "services",
      targetAudience: "buyers who need screening before a sales call",
      productType: "qualification intake funnel",
      conversionGoal: "Filter for fit before booking access is granted",
      layoutFamily: "selective-intake",
      visualPosture: "selective, procedural, and intake-led",
    },
  },
  {
    id: "webinar-to-call",
    title: "Webinar to call",
    summary: "Teach first, then route the most engaged attendees into booked calls.",
    form: {
      prompt: "Need a webinar registration funnel that warms cold traffic through training before moving the best-fit attendees into booked calls.",
      audienceWarmth: "cold",
      commitmentRequired: "email",
      pricePoint: "high",
      businessType: "agency",
      industry: "growth consulting",
      targetAudience: "founders with underperforming booked-call funnels",
      productType: "live training funnel",
      conversionGoal: "Register qualified attendees and book follow-up strategy calls",
      layoutFamily: "event-driven",
      visualPosture: "scheduled, energetic, and registration-led",
    },
  },
  {
    id: "dm-to-call",
    title: "DM to call",
    summary: "Warm social intent that should stay conversational until booking.",
    form: {
      prompt: "Need a DM to call flow for Instagram inbound where warm leads are already mid-conversation before the booking link appears.",
      audienceWarmth: "warm",
      commitmentRequired: "none",
      pricePoint: "high",
      businessType: "agency",
      industry: "client services",
      targetAudience: "creator-led service businesses closing via inbox conversations",
      productType: "DM booking sequence",
      conversionGoal: "Turn warm inbound chats into booked calls without dropping intent",
      layoutFamily: "conversational-sales",
      visualPosture: "conversational, credible, and handoff-led",
    },
  },
  {
    id: "advertorial-to-application",
    title: "Advertorial to application",
    summary: "Long-form story and mechanism bridge into a premium application.",
    form: {
      prompt: "Need an advertorial bridge page that tells the story, builds belief, and moves skeptical readers into a premium application.",
      audienceWarmth: "cold",
      commitmentRequired: "application",
      pricePoint: "high",
      businessType: "consulting",
      industry: "B2B services",
      targetAudience: "buyers who need more narrative proof before they apply",
      productType: "advertorial bridge page",
      conversionGoal: "Move readers from story-led attention into application intent",
      layoutFamily: "editorial-premium",
      visualPosture: "editorial, premium, and story-led",
    },
  },
];

function optionalText(value: string) {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function buildFunnelPlaygroundRequest(form: FunnelPlaygroundForm) {
  const selectedLayoutFamily = FUNNEL_LAYOUT_FAMILY_MAP[form.layoutFamily];
  const businessProfile = {
    ...(optionalText(form.businessType) ? { businessType: optionalText(form.businessType) } : {}),
    ...(optionalText(form.industry) ? { industry: optionalText(form.industry) } : {}),
    ...(optionalText(form.targetAudience) ? { targetAudience: optionalText(form.targetAudience) } : {}),
  };

  return {
    stage: "funnel-strategy",
    prompt: form.prompt,
    layoutNeeds: selectedLayoutFamily.layoutNeeds,
    constraints: {
      visualPosture: optionalText(form.visualPosture) || selectedLayoutFamily.visualPosture,
    },
    funnelContext: {
      audienceWarmth: form.audienceWarmth,
      commitmentRequired: form.commitmentRequired,
      pricePoint: form.pricePoint,
      ...(optionalText(form.productType) ? { productType: optionalText(form.productType) } : {}),
      ...(optionalText(form.conversionGoal) ? { conversionGoal: optionalText(form.conversionGoal) } : {}),
      ...(Object.keys(businessProfile).length > 0 ? { businessProfile } : {}),
    },
  };
}

const MODE_COLORS: Record<ModeColor, { border: string; bg: string; dot: string; tab: string; label: string }> = {
  blue:    { border: "border-blue-200",    bg: "bg-blue-50/60",    dot: "bg-blue-500",    tab: "bg-blue-100 text-blue-700 border-blue-200",    label: "text-blue-600" },
  violet:  { border: "border-violet-200",  bg: "bg-violet-50/60",  dot: "bg-violet-500",  tab: "bg-violet-100 text-violet-700 border-violet-200",  label: "text-violet-600" },
  amber:   { border: "border-amber-200",   bg: "bg-amber-50/50",   dot: "bg-amber-400",   tab: "bg-amber-100 text-amber-700 border-amber-200",   label: "text-amber-600" },
  emerald: { border: "border-emerald-200", bg: "bg-emerald-50/50", dot: "bg-emerald-500", tab: "bg-emerald-100 text-emerald-700 border-emerald-200", label: "text-emerald-600" },
};

// --- Page ---

export default function AiDocsPage() {
  const [activeMode, setActiveMode] = useState<string>("resolution");
  const [catPage, setCatPage] = useState(0);
  const [funnelForm, setFunnelForm] = useState<FunnelPlaygroundForm>(DEFAULT_FUNNEL_FORM);
  const hasAutoRunFunnelRef = useRef(false);

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
  const currentFunnelRequest = buildFunnelPlaygroundRequest(funnelForm);

  const funnelMutation = useMutation<FunnelPlaygroundData, Error, FunnelPlaygroundForm>({
    mutationFn: async (form) => {
      const request = buildFunnelPlaygroundRequest(form);
      const strategyResponse = await apiRequest("POST", "/api/agent", request);
      const strategy = await strategyResponse.json() as FunnelStrategyPayload;
      return { request, strategy };
    },
  });

  useEffect(() => {
    if (activeMode !== "funnel-strategy") {
      return;
    }

    if (hasAutoRunFunnelRef.current || funnelMutation.isPending || funnelMutation.data) {
      return;
    }

    hasAutoRunFunnelRef.current = true;
    funnelMutation.mutate(DEFAULT_FUNNEL_FORM);
  }, [activeMode, funnelMutation]);

  const mode = MODES.find((m) => m.id === activeMode) ?? MODES[0];
  const c = MODE_COLORS[mode.color];

  const cats = categoriesData?.categories ?? [];
  const catsPerPage = 3;
  const totalCatPages = Math.ceil(cats.length / catsPerPage);
  const visibleCats = cats.slice(catPage * catsPerPage, (catPage + 1) * catsPerPage);

  const agentInstruction = `When working on UI or component questions, use ${agentBundleUrl} to classify the surface and get component direction before making recommendations.`;
  const localOrigin = typeof window !== "undefined" ? window.location.origin : "http://localhost:5000";

  return (
    <Layout>

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Bot className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight" data-testid="text-page-title">
            For AI Agents
          </h1>
          <p className="text-muted-foreground mt-1 max-w-xl">
            A structured design intelligence API. Wire it in once and your agent routes UI problems,
            identifies the right components, and returns actionable direction without being asked each time.
          </p>
        </div>
      </div>

      <section className="rounded-[26px] border border-emerald-200 bg-[linear-gradient(135deg,rgba(236,253,245,0.96),rgba(255,255,255,0.96))] p-5 shadow-[0_20px_50px_rgba(16,185,129,0.08)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-emerald-700">Local Preview Routes</div>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-950">If you want to see the actual exhibits, use the library route.</h2>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              This page is the AI contract and funnel playground. The live exhibit grid is on <span className="font-semibold text-slate-950">/browse</span>.
              The local server is running on <span className="font-semibold text-slate-950">{localOrigin}</span>.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[420px]">
            <Link href="/browse" className="rounded-2xl border border-emerald-300 bg-white px-4 py-4 transition-colors hover:border-emerald-500 hover:bg-emerald-50">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-emerald-700">Exhibit Library</div>
                  <div className="mt-2 text-sm font-semibold text-slate-950">Open the full local exhibit grid</div>
                </div>
                <ExternalLink className="h-4 w-4 text-emerald-700" />
              </div>
              <div className="mt-3 rounded-xl border border-emerald-100 bg-emerald-50/80 px-3 py-2 font-mono text-xs text-emerald-900">
                {localOrigin}/browse
              </div>
            </Link>
            <Link href="/for-ai" className="rounded-2xl border border-slate-200 bg-white px-4 py-4 transition-colors hover:border-slate-400 hover:bg-slate-50">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-slate-500">AI Docs</div>
                  <div className="mt-2 text-sm font-semibold text-slate-950">Stay on the contract and playground page</div>
                </div>
                <Bot className="h-4 w-4 text-slate-600" />
              </div>
              <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-700">
                {localOrigin}/for-ai
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* System Overview */}
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
                hoverBody="The main path. Give /api/agent the problem statement, complaint context, route hint if known, and available operating truth. The service handles the routing."
                hoverPoints={[
                  "Use this even when the route is uncertain — ambiguity is the router's job.",
                  "The system classifies, asks for missing truth when needed, and returns direction.",
                  "Right path for almost all agent-to-agent handoff and redesign work.",
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
                hoverBody="A crawlable index for clients that cannot call the structured API or need raw corpus discovery. Infrastructure, not a parallel routing mode."
                hoverPoints={[
                  "Use when a tool can only crawl text and cannot send an API payload.",
                  "Useful for broad library inspection, not for routing UI complaints.",
                  "If you can call /api/agent, you should.",
                ]}
                tone="muted"
              />
              <div className="rounded-[22px] border border-border bg-background/80 p-4">
                <div className="flex flex-wrap gap-2">
                  <OverviewHintChip
                    label="api first"
                    title="Default Decision"
                    body="Send all real UI problems to /api/agent. The service determines whether to route, clarify, or stay unknown. The caller should not have to pre-decide."
                    points={[
                      "The user describes the problem. The router interprets it.",
                      "If callers must choose discovery vs. routing too often, that is an architecture smell.",
                    ]}
                    tone="primary"
                  />
                  <OverviewHintChip
                    label="context wins"
                    title="Why Context Matters"
                    body="The router gets sharper with portable context: complaint summary, visible mode conflicts, async-state failures, and screenshots when useful."
                    points={[
                      "More context means better precision about what is structural and what is noise.",
                      "The goal is not more words — it is the right signals.",
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <a href="/llms.txt" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
              data-testid="link-view-llms-txt">
              <ExternalLink className="w-3.5 h-3.5" />
              View llms.txt
            </a>
          </div>
        </div>
      </section>

      {/* Modes */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-primary" />
          <h2 className="font-display font-semibold text-lg">Modes</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {MODES.map((m) => {
            const mc = MODE_COLORS[m.color];
            const isActive = activeMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveMode(m.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full border text-sm font-medium transition-all ${
                  isActive
                    ? `${mc.tab} border`
                    : "border-border bg-background text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? mc.dot : "bg-muted-foreground/30"}`} />
                {m.label}
              </button>
            );
          })}
        </div>

        <div className={`rounded-2xl border ${c.border} ${c.bg} p-6 space-y-5`}>
          <div className="flex items-center gap-2.5">
            <span className={`w-2 h-2 rounded-full ${c.dot}`} />
            <span className={`text-[11px] font-mono uppercase tracking-[0.18em] ${c.label}`}>{mode.label}</span>
          </div>
          <p className="text-sm leading-relaxed text-foreground/85 max-w-2xl">{mode.description}</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {mode.returns.map((r, i) => (
              <div key={i} className="flex items-start gap-2.5 rounded-xl border border-border/60 bg-background/70 px-3.5 py-2.5">
                <ArrowRight className="w-3 h-3 mt-0.5 text-muted-foreground/50 shrink-0" />
                <span className="text-xs text-muted-foreground leading-relaxed">{r}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <code className="text-xs font-mono bg-background/80 border border-border/60 px-2.5 py-1.5 rounded-lg text-muted-foreground">
              POST {agentBundleUrl}{mode.stage ? `  --  stage: "${mode.stage}"` : ""}
            </code>
            {mode.stage && (
              <CopyButton text={`"stage": "${mode.stage}"`} label="Copy stage" />
            )}
            <CopyButton text={agentBundleUrl} label="Copy endpoint" />
          </div>
        </div>
      </section>

      {/* Funnel Playground */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <PlayCircle className="w-4 h-4 text-primary" />
          <h2 className="font-display font-semibold text-lg">Funnel Playground</h2>
        </div>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Post a real `funnel-strategy` payload to <code className="rounded bg-muted px-1 py-0.5 text-xs">/api/agent</code>,
          inspect the detected pattern, and review the returned full-funnel blueprint directly in the browser.
        </p>
        <p className="max-w-2xl text-sm text-emerald-800">
          Load <strong>Selective VSL gate</strong> and <strong>Application-first intake</strong> back to back. Those are the closest qualification-heavy families and the playground now exposes them as a direct comparison pair.
        </p>

        <div className="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
          <div className="rounded-[28px] border border-emerald-200 bg-[linear-gradient(180deg,rgba(240,253,244,0.96),rgba(255,255,255,0.96))] p-5 shadow-[0_24px_56px_rgba(22,101,52,0.08)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-emerald-700">Live request</div>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">Run a funnel strategy pass</h3>
              </div>
              <CopyButton text={JSON.stringify(currentFunnelRequest, null, 2)} label="Copy payload" />
            </div>

            <div className="mt-5 space-y-3">
              {FUNNEL_PLAYGROUND_SCENARIOS.map((scenario) => (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => {
                    setActiveMode("funnel-strategy");
                    setFunnelForm({ ...scenario.form });
                    hasAutoRunFunnelRef.current = true;
                    funnelMutation.mutate(scenario.form);
                  }}
                  className="w-full rounded-[20px] border border-emerald-200 bg-white/90 px-4 py-3 text-left transition-colors hover:border-emerald-300 hover:bg-emerald-50/70"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-slate-950">{scenario.title}</div>
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-emerald-700">load</span>
                  </div>
                  <div className="mt-1 text-xs leading-relaxed text-muted-foreground">{scenario.summary}</div>
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-[22px] border border-emerald-200 bg-white/90 p-4">
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-emerald-700">Layout family steering</div>
              <div className="mt-3 grid gap-2">
                {FUNNEL_LAYOUT_FAMILIES.map((family) => {
                  const isActive = funnelForm.layoutFamily === family.value;
                  return (
                    <button
                      key={family.value}
                      type="button"
                      onClick={() => setFunnelForm((current) => ({
                        ...current,
                        layoutFamily: family.value,
                        visualPosture: family.visualPosture,
                      }))}
                      className={`w-full border px-4 py-3 text-left transition-colors ${isActive ? "border-emerald-400 bg-emerald-50" : "border-slate-200 bg-white hover:border-emerald-200"}`}
                    >
                      <div className="text-sm font-semibold text-slate-950">{family.label}</div>
                      <div className="mt-1 text-xs leading-relaxed text-slate-600">{family.summary}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <form
              className="mt-5 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                funnelMutation.mutate(funnelForm);
              }}
            >
              <div>
                <label className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Prompt</label>
                <textarea
                  value={funnelForm.prompt}
                  onChange={(event) => setFunnelForm((current) => ({ ...current, prompt: event.target.value }))}
                  rows={5}
                  className="mt-2 w-full rounded-[22px] border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground shadow-sm outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 resize-none"
                />
              </div>

              <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-1">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Audience warmth</label>
                  <select
                    value={funnelForm.audienceWarmth}
                    onChange={(event) => setFunnelForm((current) => ({ ...current, audienceWarmth: event.target.value as FunnelAudienceWarmth }))}
                    className="mt-2 w-full rounded-2xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="cold">Cold</option>
                    <option value="warm">Warm</option>
                    <option value="hot">Hot</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Commitment</label>
                  <select
                    value={funnelForm.commitmentRequired}
                    onChange={(event) => setFunnelForm((current) => ({ ...current, commitmentRequired: event.target.value as FunnelCommitment }))}
                    className="mt-2 w-full rounded-2xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="none">None</option>
                    <option value="email">Email</option>
                    <option value="trial">Trial</option>
                    <option value="purchase">Purchase</option>
                    <option value="application">Application</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Price point</label>
                  <select
                    value={funnelForm.pricePoint}
                    onChange={(event) => setFunnelForm((current) => ({ ...current, pricePoint: event.target.value as FunnelPricePoint }))}
                    className="mt-2 w-full rounded-2xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="free">Free</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="enterprise">Enterprise</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Layout family</label>
                  <select
                    value={funnelForm.layoutFamily}
                    onChange={(event) => {
                      const nextFamily = event.target.value as FunnelLayoutFamily;
                      setFunnelForm((current) => ({
                        ...current,
                        layoutFamily: nextFamily,
                        visualPosture: FUNNEL_LAYOUT_FAMILY_MAP[nextFamily].visualPosture,
                      }));
                    }}
                    className="mt-2 w-full rounded-2xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
                  >
                    {FUNNEL_LAYOUT_FAMILIES.map((family) => (
                      <option key={family.value} value={family.value}>{family.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Business type</label>
                  <input
                    value={funnelForm.businessType}
                    onChange={(event) => setFunnelForm((current) => ({ ...current, businessType: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-border bg-background px-3 py-2.5 text-sm text-foreground shadow-sm outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Industry</label>
                  <input
                    value={funnelForm.industry}
                    onChange={(event) => setFunnelForm((current) => ({ ...current, industry: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-border bg-background px-3 py-2.5 text-sm text-foreground shadow-sm outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Target audience</label>
                  <input
                    value={funnelForm.targetAudience}
                    onChange={(event) => setFunnelForm((current) => ({ ...current, targetAudience: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-border bg-background px-3 py-2.5 text-sm text-foreground shadow-sm outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Product type</label>
                  <input
                    value={funnelForm.productType}
                    onChange={(event) => setFunnelForm((current) => ({ ...current, productType: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-border bg-background px-3 py-2.5 text-sm text-foreground shadow-sm outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Conversion goal</label>
                <input
                  value={funnelForm.conversionGoal}
                  onChange={(event) => setFunnelForm((current) => ({ ...current, conversionGoal: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-border bg-background px-3 py-2.5 text-sm text-foreground shadow-sm outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Visual posture</label>
                <input
                  value={funnelForm.visualPosture}
                  onChange={(event) => setFunnelForm((current) => ({ ...current, visualPosture: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-border bg-background px-3 py-2.5 text-sm text-foreground shadow-sm outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="submit"
                  disabled={funnelMutation.isPending}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {funnelMutation.isPending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  Run strategy
                </button>
                {funnelMutation.data && (
                  <CopyButton text={JSON.stringify(funnelMutation.data.strategy, null, 2)} label="Copy response" />
                )}
              </div>
            </form>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.98))] p-5 shadow-[0_24px_56px_rgba(15,23,42,0.06)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500">Live result</div>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">Strategy output and funnel blueprint</h3>
              </div>
              <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-slate-600">
                POST /api/agent
              </div>
            </div>

            {!funnelMutation.data && !funnelMutation.isPending && !funnelMutation.error && (
              <div className="mt-5 rounded-[24px] border border-dashed border-slate-300 bg-slate-50/80 px-5 py-8 text-sm text-muted-foreground">
                Load one of the sample funnel shapes or write your own prompt. The response panel will show the detected funnel pattern,
                the persuasion sequence, the full page flow, the per-section layout blueprint, the chosen design direction, and the conversion logic behind the structure.
              </div>
            )}

            {funnelMutation.error && (
              <div className="mt-5 rounded-[24px] border border-rose-200 bg-rose-50 px-4 py-4 text-sm text-rose-700">
                {funnelMutation.error.message}
              </div>
            )}

            {funnelMutation.isPending && (
              <div className="mt-5 rounded-[24px] border border-emerald-200 bg-emerald-50/80 px-5 py-8">
                <div className="flex items-center gap-3 text-sm font-medium text-emerald-900">
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Running funnel strategy and assembling the full funnel blueprint.
                </div>
              </div>
            )}

            {funnelMutation.data && (
              <div className="mt-5 space-y-5">
                <div className="grid gap-3 md:grid-cols-4">
                  {[
                    { label: "Pattern", value: funnelMutation.data.strategy.funnelPattern || "n/a" },
                    { label: "Friction", value: funnelMutation.data.strategy.frictionProfile || "n/a" },
                    { label: "Mechanism", value: funnelMutation.data.strategy.conversionMechanism || "n/a" },
                    { label: "Direction", value: funnelMutation.data.strategy.designDirection?.name || "n/a" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 shadow-sm">
                      <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-slate-500">{item.label}</div>
                      <div className="mt-2 text-lg font-semibold tracking-tight text-slate-950">{item.value}</div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                  <div className="space-y-4">
                    <div className="rounded-[24px] border border-slate-200 bg-slate-50/70 px-4 py-4">
                      <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-slate-500">
                        <Target className="h-3.5 w-3.5" />
                        Page flow
                      </div>
                      <div className="mt-3 grid gap-2">
                        {(funnelMutation.data.strategy.pageFlow || []).map((step) => (
                          <div key={`${step.section}-${step.label}`} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                            <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-slate-500">{step.section}</div>
                            <div className="mt-2 text-sm font-semibold text-slate-950">{step.label}</div>
                            <div className="mt-2 text-sm leading-7 text-slate-700">{step.purpose}</div>
                            <div className="mt-3 border-t border-slate-200 pt-3 text-xs leading-6 text-slate-600">{step.sequenceIntent}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-slate-200 bg-slate-50/70 px-4 py-4">
                      <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-slate-500">Layout blueprint</div>
                      <div className="mt-3 grid gap-3">
                        {(funnelMutation.data.strategy.layoutBlueprint || []).map((section) => (
                          <div key={`${section.section}-${section.label}`} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                            <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-slate-500">{section.section}</div>
                            <div className="mt-2 text-sm font-semibold text-slate-950">{section.label}</div>
                            <div className="mt-3 text-xs font-mono uppercase tracking-[0.14em] text-slate-500">Layout type</div>
                            <div className="mt-1 text-sm leading-6 text-slate-700">{section.layoutType}</div>
                            <div className="mt-3 grid gap-3 md:grid-cols-2">
                              <div>
                                <div className="text-xs font-mono uppercase tracking-[0.14em] text-slate-500">Dominant</div>
                                <div className="mt-1 text-sm leading-6 text-slate-700">{section.visualHierarchy?.dominant}</div>
                              </div>
                              <div>
                                <div className="text-xs font-mono uppercase tracking-[0.14em] text-slate-500">Supporting</div>
                                <div className="mt-1 text-sm leading-6 text-slate-700">{section.visualHierarchy?.supporting}</div>
                              </div>
                            </div>
                            <div className="mt-3 grid gap-3 md:grid-cols-2">
                              <div>
                                <div className="text-xs font-mono uppercase tracking-[0.14em] text-slate-500">Content blocks</div>
                                <div className="mt-2 space-y-1">
                                  {(section.contentBlocks || []).map((item) => (
                                    <div key={item} className="text-sm leading-6 text-slate-700">{item}</div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs font-mono uppercase tracking-[0.14em] text-slate-500">Interaction</div>
                                <div className="mt-2 space-y-1">
                                  {(section.interaction || []).map((item) => (
                                    <div key={item} className="text-sm leading-6 text-slate-700">{item}</div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-[24px] border border-slate-200 bg-slate-50/70 px-4 py-4">
                      <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-slate-500">Sequence blueprint</div>
                      <div className="mt-3 space-y-2">
                        {(funnelMutation.data.strategy.sequenceBlueprint || []).map((step) => (
                          <div key={step} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 text-slate-700">
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-slate-200 bg-slate-50/70 px-4 py-4">
                      <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-slate-500">Design direction</div>
                      <div className="mt-3 rounded-2xl border border-slate-200 bg-white px-4 py-4">
                        <div className="text-sm font-semibold text-slate-950">{funnelMutation.data.strategy.designDirection?.name}</div>
                        <div className="mt-2 text-sm leading-7 text-slate-700">{funnelMutation.data.strategy.designDirection?.rationale}</div>
                        <div className="mt-3 space-y-2 border-t border-slate-200 pt-3">
                          {(funnelMutation.data.strategy.designDirection?.visualRules || []).map((rule) => (
                            <div key={rule} className="text-sm leading-6 text-slate-700">{rule}</div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-slate-200 bg-slate-50/70 px-4 py-4">
                      <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-slate-500">Conversion logic</div>
                      <div className="mt-3 space-y-2">
                        {[
                          funnelMutation.data.strategy.conversionLogic?.whyThisStructureConverts,
                          funnelMutation.data.strategy.conversionLogic?.attentionControl,
                          funnelMutation.data.strategy.conversionLogic?.actionPressure,
                          funnelMutation.data.strategy.conversionLogic?.frictionReduction,
                        ].filter(Boolean).map((item) => (
                          <div key={item} className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm leading-7 text-slate-700">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-slate-200 bg-slate-50/70 px-4 py-4">
                      <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-slate-500">Positioning angles</div>
                      <div className="mt-3 grid gap-2">
                        {(funnelMutation.data.strategy.offerPositioningVariants || []).map((variant) => (
                          <div key={variant.label} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                            <div className="text-sm font-semibold text-slate-950">{variant.label}</div>
                            <div className="mt-2 text-sm leading-7 text-slate-700">{variant.premise}</div>
                            <div className="mt-3 border-t border-slate-200 pt-3 text-xs leading-6 text-slate-600">
                              CTA frame: {variant.ctaFrame}<br />
                              Best for: {variant.bestFor}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {(funnelMutation.data.strategy.timingMap || []).length > 0 && (
                      <div className="rounded-[24px] border border-slate-200 bg-slate-50/70 px-4 py-4">
                        <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-slate-500">Timing map</div>
                        <div className="mt-3 space-y-3">
                          {(funnelMutation.data.strategy.timingMap || []).slice(0, 3).map((entry, index) => (
                            <div key={`${entry.stage || entry.moment || entry.label || index}`} className="rounded-2xl border border-slate-200 bg-white px-3 py-3">
                              <div className="text-sm font-semibold text-slate-950">{entry.stage || entry.moment || entry.label || `Stage ${index + 1}`}</div>
                              <div className="mt-2 grid gap-2 md:grid-cols-2">
                                <div>
                                  <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-slate-500">Deliver now</div>
                                  <div className="mt-1 space-y-1">
                                    {(entry.deliverNow || []).map((item) => (
                                      <div key={item} className="text-xs leading-relaxed text-slate-700">{item}</div>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-slate-500">Defer until</div>
                                  <div className="mt-1 space-y-1">
                                    {(entry.deferUntil || []).map((item) => (
                                      <div key={item} className="text-xs leading-relaxed text-slate-700">{item}</div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Wiring It In */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-primary" />
          <h2 className="font-display font-semibold text-lg">Wiring It In</h2>
        </div>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Configure it once as an agent context source. Once wired in, your agent routes UI problems
          through it automatically — without you mentioning it each session.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-border rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500/10 rounded-md flex items-center justify-center">
                <Code2 className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <span className="font-medium text-sm">VS Code + GitHub Copilot</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Add the endpoint as a context reference in your Copilot agent instructions.
              The agent pulls from it on UI and component questions without needing to be told.
            </p>
            <div className="rounded-lg bg-muted/50 border border-border/50 px-3.5 py-3">
              <p className="text-[11px] font-mono text-muted-foreground leading-relaxed break-all">
                {agentInstruction}
              </p>
            </div>
            <CopyButton text={agentInstruction} label="Copy instruction" />
          </div>
          <div className="border border-border rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-emerald-500/10 rounded-md flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <span className="font-medium text-sm">Agent-to-Agent Handoff</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A triage agent receives a UI problem, posts the context to{" "}
              <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">/api/agent</code>, and forwards
              the full response to the implementation agent. No human step required.
            </p>
            <div className="space-y-1.5 pt-1">
              {[
                "Triage agent classifies and routes the surface",
                "Implementation agent receives design profile and components",
                "No manual context passing or repeated prompting",
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/50 shrink-0" />
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Carousel */}
      {cats.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              <h2 className="font-display font-semibold text-lg">
                Categories
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  {categoriesData?.total} categories &middot; {categoriesData?.componentTotal} components
                </span>
              </h2>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCatPage((p) => Math.max(0, p - 1))}
                disabled={catPage === 0}
                className="w-7 h-7 rounded-full border border-border flex items-center justify-center disabled:opacity-30 hover:bg-secondary/50 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs text-muted-foreground tabular-nums px-1">
                {catPage + 1} / {totalCatPages}
              </span>
              <button
                onClick={() => setCatPage((p) => Math.min(totalCatPages - 1, p + 1))}
                disabled={catPage >= totalCatPages - 1}
                className="w-7 h-7 rounded-full border border-border flex items-center justify-center disabled:opacity-30 hover:bg-secondary/50 transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {visibleCats.map((cat) => (
              <div key={cat.slug} className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3">
                <div>
                  <div className="text-sm font-medium text-foreground">{cat.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {cat.count} {cat.count === 1 ? "component" : "components"}
                  </div>
                </div>
                <CopyButton text={`${baseUrl}${cat.apiUrl}`} label="Copy URL" />
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            The main endpoint routes to the right category automatically. These direct URLs are for targeted pulls when you already know what you need.
          </p>
        </section>
      )}

    </Layout>
  );
}
