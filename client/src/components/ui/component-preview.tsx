import { useState, useRef, useEffect, type MouseEvent, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CodeBlock } from "./code-block";
import { Eye, Code2, Monitor, Smartphone, Tablet, Heart, GitFork, User, ChevronLeft, ChevronRight } from "lucide-react";
import { HtmlPreviewFrame, type PreviewScene } from "@/components/ui/html-preview-frame";
import { cn } from "@/lib/utils";

interface ComponentPreviewProps {
  slug?: string;
  title: string;
  category?: string;
  description?: string;
  code: string;
  htmlPreview: string;
  tags?: string[];
  creatorName?: string;
  creatorId?: number;
  saveCount?: number;
  remixCount?: number;
  variants?: ComponentPreviewVariant[];
  onOpenExhibit?: (slug: string) => void;
}

type PreviewDevice = "desktop" | "tablet" | "mobile";

type ComponentPreviewVariant = {
  slug: string;
  title: string;
  description?: string;
  category?: string;
  htmlPreview: string;
  tags?: string[];
};

type PreviewVariantMeta = {
  label: string;
  tone: string;
  typography: string;
};

type FunnelPreviewStage = {
  id: string;
  label: string;
  summary: string;
  scene: PreviewScene;
};

type FunnelDeckFamily = "event" | "confirmation" | "precall" | "conversation" | "narrative" | "qualification" | "vsl";

type FunnelPreviewDeck = {
  family: FunnelDeckFamily;
  badge: string;
  headline: string;
  intro: string;
  shellClass: string;
  badgeClass: string;
  eyebrowClass: string;
  stageIdleClass: string;
  stageActiveClass: string;
  frameClass: string;
  stages: FunnelPreviewStage[];
};

function isFunnelPreview(category: string | undefined, tags: string[], title: string) {
  if (category === "Funnels") {
    return true;
  }

  const haystack = `${title} ${tags.join(" ")}`.toLowerCase();
  return /funnel|webinar|vsl|application-first|qualification|pre-call|advertorial|dm-to-call|webinar-to-call/.test(haystack);
}

function buildFunnelStages(definitions: Array<Omit<FunnelPreviewStage, "id">>) {
  return definitions.map((stage, index) => ({
    ...stage,
    id: `${stage.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index}`,
  }));
}

function getTagValue(tags: string[], prefix: string) {
  return tags.find((tag) => tag.startsWith(prefix))?.slice(prefix.length) || "";
}

function getPreviewVariantMeta(variant: ComponentPreviewVariant): PreviewVariantMeta {
  const tags = variant.tags || [];
  const labelToken = getTagValue(tags, "variant-");
  const toneToken = getTagValue(tags, "tone-");
  const typographyToken = getTagValue(tags, "typography-");

  const labelMap: Record<string, string> = {
    balanced: "Balanced",
    executive: "Executive Brief",
    operator: "Operator Console",
  };
  const toneMap: Record<string, string> = {
    balanced: "Balanced tone",
    executive: "Calm boardroom tone",
    operator: "Sharper operator tone",
  };
  const typographyMap: Record<string, string> = {
    sans: "Sans-led hierarchy",
    serif: "Serif-led hierarchy",
    mono: "Mono utility accents",
  };

  return {
    label: labelMap[labelToken] || variant.title,
    tone: toneMap[toneToken] || "Live variation",
    typography: typographyMap[typographyToken] || "System typography",
  };
}

function getStoredVariantKey(componentSlug: string) {
  if (typeof window === "undefined") {
    return null;
  }

  return `component-preview:variant:${window.location.pathname}:${componentSlug}`;
}

function readStoredVariantSlug(componentSlug: string) {
  const key = getStoredVariantKey(componentSlug);
  if (!key || typeof window === "undefined") {
    return null;
  }

  return window.sessionStorage.getItem(key);
}

function writeStoredVariantSlug(componentSlug: string, variantSlug: string) {
  const key = getStoredVariantKey(componentSlug);
  if (!key || typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(key, variantSlug);
}

function getFunnelPreviewDeck(tags: string[]): FunnelPreviewDeck {
  const haystack = tags.join(" ").toLowerCase();

  if (/webinar|training|event/.test(haystack)) {
    return {
      family: "event",
      badge: "Event Funnel Deck",
      headline: "Broadcast storyboard, not a shrunk sales page.",
      intro: "One umbrella stage plus focused checkpoints for the event promise, teaching loop, and signup rail.",
      shellClass: "border border-sky-200 bg-[linear-gradient(135deg,rgba(239,246,255,0.96),rgba(255,255,255,0.96))]",
      badgeClass: "border-sky-300 bg-sky-100 text-sky-800",
      eyebrowClass: "text-sky-700",
      stageIdleClass: "border-sky-100 bg-white text-slate-600 hover:border-sky-300 hover:bg-sky-50",
      stageActiveClass: "border-sky-500 bg-sky-50 text-sky-900 shadow-sm",
      frameClass: "border-sky-200 bg-white",
      stages: buildFunnelStages([
        { label: "Umbrella stage", summary: "See the full event surface before zooming in.", scene: { width: 1600, scale: 0.28, offsetX: 0, offsetY: 0 } },
        { label: "Event promise", summary: "Top-of-page signal, schedule, and promise stack.", scene: { width: 1600, scale: 0.66, offsetX: -40, offsetY: -30 } },
        { label: "Teach loop", summary: "Broadcast card and segment framing instead of generic proof rows.", scene: { width: 1600, scale: 0.68, offsetX: -620, offsetY: -60 } },
        { label: "Signup rail", summary: "Registration ticket, fields, and who-it's-for action lane.", scene: { width: 1600, scale: 0.72, offsetX: -920, offsetY: -20 } },
      ]),
    };
  }

  if (/confirmation|confirmed|reminder|receipt|thank-you|thank you/.test(haystack)) {
    return {
      family: "confirmation",
      badge: "Confirmation Funnel Deck",
      headline: "Appointment receipt with next-step reinforcement.",
      intro: "The umbrella stage shows the whole confirmation surface first, then the carousel isolates the receipt, logistics, follow-up, and prep handoff lanes.",
      shellClass: "border border-emerald-200 bg-[linear-gradient(135deg,rgba(236,253,245,0.96),rgba(255,255,255,0.96))]",
      badgeClass: "border-emerald-300 bg-emerald-100 text-emerald-900",
      eyebrowClass: "text-emerald-800",
      stageIdleClass: "border-emerald-100 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50",
      stageActiveClass: "border-emerald-500 bg-emerald-50 text-emerald-950 shadow-sm",
      frameClass: "border-emerald-200 bg-white",
      stages: buildFunnelStages([
        { label: "Umbrella stage", summary: "Full post-booking confirmation surface in one frame.", scene: { width: 1600, scale: 0.3, offsetX: 0, offsetY: 0 } },
        { label: "Receipt header", summary: "Confirmation signal, appointment status, and reassurance above the fold.", scene: { width: 1600, scale: 0.7, offsetX: -40, offsetY: -10 } },
        { label: "Logistics block", summary: "Calendar, meeting link, reminders, and concrete appointment details.", scene: { width: 1600, scale: 0.74, offsetX: -360, offsetY: -120 } },
        { label: "Prep handoff", summary: "Next actions and the bridge into pre-call preparation.", scene: { width: 1600, scale: 0.76, offsetX: -980, offsetY: -20 } },
      ]),
    };
  }

  if (/pre-call|indoctrination|show-up|prep/.test(haystack)) {
    return {
      family: "precall",
      badge: "Pre-Call Deck",
      headline: "Briefing board for the call before the call.",
      intro: "Use the umbrella stage first, then jump between the context video, prep system, and show-up reinforcement lanes.",
      shellClass: "border border-cyan-200 bg-[linear-gradient(135deg,rgba(236,254,255,0.96),rgba(255,255,255,0.96))]",
      badgeClass: "border-cyan-300 bg-cyan-100 text-cyan-900",
      eyebrowClass: "text-cyan-800",
      stageIdleClass: "border-cyan-100 bg-white text-slate-600 hover:border-cyan-300 hover:bg-cyan-50",
      stageActiveClass: "border-cyan-500 bg-cyan-50 text-cyan-950 shadow-sm",
      frameClass: "border-cyan-200 bg-white",
      stages: buildFunnelStages([
        { label: "Umbrella stage", summary: "Full call-conditioning surface in one pass.", scene: { width: 1600, scale: 0.3, offsetX: 0, offsetY: 0 } },
        { label: "Context video", summary: "Hero signal and video stage that resets the room before the call.", scene: { width: 1600, scale: 0.68, offsetX: -40, offsetY: -20 } },
        { label: "Prep system", summary: "Agenda, prep brief, and completion logic.", scene: { width: 1600, scale: 0.72, offsetX: -600, offsetY: -30 } },
        { label: "Show-up signals", summary: "Checklist and reinforcement modules that protect attendance quality.", scene: { width: 1600, scale: 0.72, offsetX: -900, offsetY: -180 } },
      ]),
    };
  }

  if (/dm|conversation|chat|social/.test(haystack)) {
    return {
      family: "conversation",
      badge: "Conversation Funnel Deck",
      headline: "Thread logic and handoff context stay visible.",
      intro: "The carousel holds the chat context, diagnosis pass, and booking handoff separately so it does not blur into a generic landing page.",
      shellClass: "border border-amber-200 bg-[linear-gradient(135deg,rgba(255,251,235,0.96),rgba(255,255,255,0.96))]",
      badgeClass: "border-amber-300 bg-amber-100 text-amber-900",
      eyebrowClass: "text-amber-800",
      stageIdleClass: "border-amber-100 bg-white text-slate-600 hover:border-amber-300 hover:bg-amber-50",
      stageActiveClass: "border-amber-500 bg-amber-50 text-amber-950 shadow-sm",
      frameClass: "border-amber-200 bg-white",
      stages: buildFunnelStages([
        { label: "Umbrella stage", summary: "Full thread-to-call surface before focus mode.", scene: { width: 1600, scale: 0.28, offsetX: 0, offsetY: 0 } },
        { label: "Chat context", summary: "Conversation recap and handoff tone.", scene: { width: 1600, scale: 0.7, offsetX: -40, offsetY: -10 } },
        { label: "Diagnosis", summary: "Compact diagnosis rather than long-form sales proof.", scene: { width: 1600, scale: 0.72, offsetX: -430, offsetY: -150 } },
        { label: "Handoff rail", summary: "Booking bridge that still feels like the same thread.", scene: { width: 1600, scale: 0.76, offsetX: -980, offsetY: -20 } },
      ]),
    };
  }

  if (/advertorial|story|editorial|bridge/.test(haystack)) {
    return {
      family: "narrative",
      badge: "Narrative Funnel Deck",
      headline: "Editorial spread with chapters, not a utility dashboard.",
      intro: "The carousel separates the editorial hook, story proof, and application bridge so the preview reads like a sequence, not a shrunk page.",
      shellClass: "border border-orange-200 bg-[linear-gradient(135deg,rgba(255,247,237,0.96),rgba(255,255,255,0.96))]",
      badgeClass: "border-orange-300 bg-orange-100 text-orange-900",
      eyebrowClass: "text-orange-800",
      stageIdleClass: "border-orange-100 bg-white text-slate-600 hover:border-orange-300 hover:bg-orange-50",
      stageActiveClass: "border-orange-500 bg-orange-50 text-orange-950 shadow-sm",
      frameClass: "border-orange-200 bg-white",
      stages: buildFunnelStages([
        { label: "Umbrella stage", summary: "Whole editorial surface in one umbrella frame.", scene: { width: 1600, scale: 0.28, offsetX: 0, offsetY: 0 } },
        { label: "Narrative hook", summary: "Masthead and opening tension.", scene: { width: 1600, scale: 0.68, offsetX: -30, offsetY: -20 } },
        { label: "Story proof", summary: "Long-form case and narrative conviction band.", scene: { width: 1600, scale: 0.72, offsetX: -390, offsetY: -180 } },
        { label: "Application bridge", summary: "Selective ask after the story has earned it.", scene: { width: 1600, scale: 0.74, offsetX: -980, offsetY: -20 } },
      ]),
    };
  }

  if (/application|qualification|qualify|survey/.test(haystack)) {
    return {
      family: "qualification",
      badge: "Qualification Funnel Deck",
      headline: "Operator worksheet with gates, proof, and intake logic.",
      intro: "The umbrella stage holds the whole intake system, then the carousel breaks out the gate, evaluator proof, and worksheet separately.",
      shellClass: "border border-slate-300 bg-[linear-gradient(135deg,rgba(248,250,252,0.96),rgba(255,255,255,0.96))]",
      badgeClass: "border-slate-300 bg-slate-100 text-slate-900",
      eyebrowClass: "text-slate-700",
      stageIdleClass: "border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:bg-slate-50",
      stageActiveClass: "border-slate-600 bg-slate-100 text-slate-950 shadow-sm",
      frameClass: "border-slate-300 bg-white",
      stages: buildFunnelStages([
        { label: "Umbrella stage", summary: "Whole qualification system before the focus pass.", scene: { width: 1600, scale: 0.29, offsetX: 0, offsetY: 0 } },
        { label: "Gatekeeper", summary: "Disqualification headline, fit scorecard, and operator brief.", scene: { width: 1600, scale: 0.72, offsetX: -20, offsetY: -20 } },
        { label: "Evaluation proof", summary: "Accepted-buyer proof and fit criteria instead of generic testimonials.", scene: { width: 1600, scale: 0.72, offsetX: -220, offsetY: -160 } },
        { label: "Intake worksheet", summary: "Worksheet-style form and booking eligibility lane.", scene: { width: 1600, scale: 0.78, offsetX: -860, offsetY: -30 } },
      ]),
    };
  }

  return {
    family: "vsl",
    badge: "VSL Funnel Deck",
    headline: "Cinematic sales control room with one dominant stage.",
    intro: "The umbrella stage gives you the whole premium sales surface, then the carousel isolates the authority stage, conviction stack, and booking rail.",
    shellClass: "border border-rose-200 bg-[linear-gradient(135deg,rgba(255,241,242,0.96),rgba(255,255,255,0.96))]",
    badgeClass: "border-rose-300 bg-rose-100 text-rose-900",
    eyebrowClass: "text-rose-700",
    stageIdleClass: "border-rose-100 bg-white text-slate-600 hover:border-rose-300 hover:bg-rose-50",
    stageActiveClass: "border-rose-500 bg-rose-50 text-rose-950 shadow-sm",
    frameClass: "border-rose-200 bg-white",
    stages: buildFunnelStages([
      { label: "Umbrella stage", summary: "Full VSL and offer room in one frame.", scene: { width: 1600, scale: 0.27, offsetX: 0, offsetY: 0 } },
      { label: "VSL stage", summary: "Authority build and primary media moment.", scene: { width: 1600, scale: 0.68, offsetX: -20, offsetY: -20 } },
      { label: "Conviction stack", summary: "Proof, mechanism, and argument body.", scene: { width: 1600, scale: 0.7, offsetX: -340, offsetY: -180 } },
      { label: "Booking rail", summary: "Calendar or next-step rail without crushing the whole page into one frame.", scene: { width: 1600, scale: 0.78, offsetX: -930, offsetY: -20 } },
    ]),
  };
}

function FunnelDeckPager({
  stageIndex,
  stageCount,
  onStageChange,
  buttonClassName,
}: {
  stageIndex: number;
  stageCount: number;
  onStageChange: (index: number) => void;
  buttonClassName?: string;
}) {
  const baseButtonClassName = buttonClassName ?? "inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-slate-500 hover:text-slate-950";

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onStageChange((stageIndex - 1 + stageCount) % stageCount);
        }}
        className={baseButtonClassName}
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        Prev
      </button>
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onStageChange((stageIndex + 1) % stageCount);
        }}
        className={baseButtonClassName}
      >
        Next
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function FunnelDeckFrame({
  title,
  htmlPreview,
  activeStage,
  viewport,
  frameClass,
  height,
  className,
  innerClassName,
  header,
}: {
  title: string;
  htmlPreview: string;
  activeStage: FunnelPreviewStage;
  viewport: PreviewDevice;
  frameClass: string;
  height?: number;
  className?: string;
  innerClassName?: string;
  header?: ReactNode;
}) {
  const isDesktop = viewport === "desktop";
  const frameHeight = height ?? (viewport === "mobile" ? 667 : viewport === "tablet" ? 500 : 430);
  const frameScene = viewport === "desktop" ? activeStage.scene : undefined;

  return (
    <div className={cn("overflow-hidden rounded-[28px] border p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)]", frameClass, className)}>
      {header}
      <div className={cn(
        "overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm",
        isDesktop ? "w-full" : "mx-auto",
        viewport === "mobile" ? "w-[375px] max-w-full" : viewport === "tablet" ? "w-[768px] max-w-full" : "",
        innerClassName,
      )}>
        <HtmlPreviewFrame
          htmlPreview={htmlPreview}
          title={`${title} ${activeStage.label} preview`}
          viewport={viewport}
          height={frameHeight}
          scene={frameScene}
          className="bg-white"
        />
      </div>
    </div>
  );
}

function FunnelPreviewDeckView({
  title,
  description,
  htmlPreview,
  deck,
  device,
  stageIndex,
  onStageChange,
}: {
  title: string;
  description?: string;
  htmlPreview: string;
  deck: FunnelPreviewDeck;
  device: PreviewDevice;
  stageIndex: number;
  onStageChange: (index: number) => void;
}) {
  const activeStage = deck.stages[stageIndex];

  if (deck.family === "event") {
    return (
      <div className={cn("w-full min-h-[520px] p-5", deck.shellClass)}>
        <div className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)]">
          <div className="space-y-4">
            <div className={cn("inline-flex items-center border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em]", deck.badgeClass)}>
              {deck.badge}
            </div>
            <div className="border border-sky-950 bg-[#06203a] p-5 text-white shadow-[0_20px_60px_rgba(6,32,58,0.35)]">
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-sky-200">Broadcast storyboard</div>
              <h4 className="mt-3 font-display text-2xl font-bold tracking-tight">{deck.headline}</h4>
              <p className="mt-3 text-sm leading-7 text-sky-50/85">{deck.intro}</p>
              {description && <p className="mt-3 text-sm leading-7 text-sky-100/70">{description}</p>}
            </div>
            <div className="space-y-3">
              {deck.stages.map((stage, index) => {
                const isActive = index === stageIndex;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      onStageChange(index);
                    }}
                    className={cn(
                      "w-full border px-4 py-3 text-left transition-all",
                      isActive ? deck.stageActiveClass : deck.stageIdleClass,
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-inherit/70">Segment {index + 1}</div>
                        <div className="mt-1 text-sm font-semibold text-current">{stage.label}</div>
                      </div>
                      <div className="text-[10px] font-mono uppercase tracking-[0.16em] opacity-60">Run of show</div>
                    </div>
                    <div className="mt-2 text-xs leading-relaxed text-inherit/80">{stage.summary}</div>
                  </button>
                );
              })}
            </div>
            <FunnelDeckPager stageIndex={stageIndex} stageCount={deck.stages.length} onStageChange={onStageChange} />
          </div>

          <div className="space-y-4">
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_260px]">
              <div className="border border-sky-200 bg-white px-5 py-4 shadow-sm">
                <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-sky-700">Active segment</div>
                <div className="mt-2 text-xl font-semibold tracking-tight text-slate-950">{activeStage.label}</div>
                <p className="mt-2 text-sm leading-7 text-slate-700">{activeStage.summary}</p>
              </div>
              <div className="border border-sky-100 bg-sky-50 px-4 py-4">
                <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-sky-700">Event logic</div>
                <p className="mt-2 text-sm leading-7 text-slate-700">Education earns the call here, so the preview needs show-format cues, not a generic feature stack.</p>
              </div>
            </div>

            <FunnelDeckFrame
              title={title}
              htmlPreview={htmlPreview}
              activeStage={activeStage}
              viewport={device}
              frameClass={deck.frameClass}
              className="rounded-none shadow-none"
              innerClassName="rounded-none"
              header={
                <div className="mb-4 border border-sky-200 bg-white px-4 py-3">
                  <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-sky-700">Why this frame matters</div>
                  <div className="mt-2 text-sm leading-7 text-slate-700">The card isolates the event promise, teaching motion, and registration rail instead of squeezing the whole funnel into one viewport.</div>
                </div>
              }
            />
          </div>
        </div>
      </div>
    );
  }

  if (deck.family === "precall") {
    return (
      <div className={cn("w-full min-h-[520px] p-5", deck.shellClass)}>
        <div className="space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-4 border border-cyan-200 bg-white px-5 py-4 shadow-sm">
            <div>
              <div className={cn("inline-flex items-center border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em]", deck.badgeClass)}>
                {deck.badge}
              </div>
              <h4 className="mt-3 font-display text-2xl font-bold tracking-tight text-slate-950">{deck.headline}</h4>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-700">{deck.intro}</p>
            </div>
            <div className="border border-cyan-100 bg-cyan-50 px-4 py-3 text-sm leading-7 text-slate-700">
              Show-up quality lives in the prep system, not the palette.
            </div>
          </div>

          <div className="grid gap-2 lg:grid-cols-4">
            {deck.stages.map((stage, index) => {
              const isActive = index === stageIndex;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onStageChange(index);
                  }}
                  className={cn(
                      "border px-4 py-3 text-left transition-all",
                    isActive ? deck.stageActiveClass : deck.stageIdleClass,
                  )}
                >
                  <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-inherit/70">Checkpoint {index + 1}</div>
                  <div className="mt-1 text-sm font-semibold text-current">{stage.label}</div>
                </button>
              );
            })}
          </div>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
            <div className="space-y-4">
              <FunnelDeckFrame
                title={title}
                htmlPreview={htmlPreview}
                activeStage={activeStage}
                viewport={device}
                frameClass={deck.frameClass}
                className="rounded-none shadow-none"
                innerClassName="rounded-none"
                header={
                    <div className="mb-4 flex items-center justify-between gap-3 border border-cyan-100 bg-white px-4 py-3">
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-cyan-800">Current prep lens</div>
                      <div className="mt-1 text-lg font-semibold text-slate-950">{activeStage.label}</div>
                    </div>
                    <div className="text-right text-sm leading-6 text-slate-600">{activeStage.summary}</div>
                  </div>
                }
              />
              <FunnelDeckPager stageIndex={stageIndex} stageCount={deck.stages.length} onStageChange={onStageChange} />
            </div>

            <div className="space-y-3">
              <div className="border border-cyan-100 bg-white px-4 py-4 shadow-sm">
                <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-cyan-800">Call brief</div>
                <p className="mt-2 text-sm leading-7 text-slate-700">This deck should read like a prep packet: why the call matters, what the buyer brings, and how attendance gets protected.</p>
              </div>
              <div className="border border-cyan-100 bg-cyan-50 px-4 py-4">
                <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-cyan-800">Active stage</div>
                <div className="mt-2 text-base font-semibold text-slate-950">{activeStage.label}</div>
                <p className="mt-2 text-sm leading-7 text-slate-700">{activeStage.summary}</p>
              </div>
              <div className="border border-cyan-100 bg-white px-4 py-4 shadow-sm">
                <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-cyan-800">Attendance rule</div>
                <p className="mt-2 text-sm leading-7 text-slate-700">Conditioning, preparation, and expectation setting should look operational, not theatrical.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (deck.family === "confirmation") {
    return (
      <div className={cn("w-full min-h-[520px] p-5", deck.shellClass)}>
        <div className="grid gap-5 xl:grid-cols-[300px_minmax(0,1fr)]">
          <div className="space-y-4 rounded-[28px] border border-emerald-200 bg-white/85 p-4 shadow-sm backdrop-blur-sm">
            <div className={cn("inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em]", deck.badgeClass)}>
              {deck.badge}
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-emerald-800">Booking receipt</div>
              <h4 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-950">{deck.headline}</h4>
              <p className="mt-2 text-sm leading-7 text-slate-700">{deck.intro}</p>
            </div>
            <div className="space-y-3">
              {deck.stages.map((stage, index) => {
                const isActive = index === stageIndex;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      onStageChange(index);
                    }}
                    className={cn(
                      "block w-full rounded-[22px] border px-4 py-3 text-left transition-all",
                      isActive ? deck.stageActiveClass : deck.stageIdleClass,
                    )}
                  >
                    <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-inherit/70">Step {index + 1}</div>
                    <div className="mt-1 text-sm font-semibold text-current">{stage.label}</div>
                    <div className="mt-2 text-xs leading-relaxed text-inherit/80">{stage.summary}</div>
                  </button>
                );
              })}
            </div>
            <FunnelDeckPager stageIndex={stageIndex} stageCount={deck.stages.length} onStageChange={onStageChange} />
          </div>

          <div className="space-y-4">
            <div className="rounded-[28px] border border-emerald-300 bg-white px-5 py-4 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-emerald-800">Transactional clarity</div>
                  <p className="mt-2 text-sm leading-7 text-slate-700">Confirmation funnels should feel like real service-booking software: clear appointment details, immediate reassurance, and an obvious next step into prep.</p>
                </div>
                <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-emerald-800">Active: {activeStage.label}</div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
              <FunnelDeckFrame
                title={title}
                htmlPreview={htmlPreview}
                activeStage={activeStage}
                viewport={device}
                frameClass={deck.frameClass}
                className="bg-white"
              />
              <div className="space-y-3">
                <div className="rounded-[24px] border border-emerald-100 bg-emerald-50 px-4 py-4">
                  <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-emerald-800">Current focus</div>
                  <div className="mt-2 text-base font-semibold text-slate-950">{activeStage.label}</div>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{activeStage.summary}</p>
                </div>
                <div className="rounded-[24px] border border-emerald-100 bg-white px-4 py-4 shadow-sm">
                  <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-emerald-800">Receipt rule</div>
                  <p className="mt-2 text-sm leading-7 text-slate-700">No dead-end thank-you screen. The card should prove the booking is real and move the buyer straight into the prep sequence.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (deck.family === "conversation") {
    return (
      <div className={cn("w-full min-h-[520px] p-5", deck.shellClass)}>
        <div className="grid gap-5 xl:grid-cols-[310px_minmax(0,1fr)]">
          <div className="rounded-[30px] border border-amber-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
            <div className={cn("inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em]", deck.badgeClass)}>
              {deck.badge}
            </div>
            <div className="mt-4">
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-amber-800">Thread map</div>
              <h4 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-950">{deck.headline}</h4>
              <p className="mt-2 text-sm leading-7 text-slate-700">{deck.intro}</p>
            </div>
            <div className="mt-4 space-y-3">
              {deck.stages.map((stage, index) => {
                const isActive = index === stageIndex;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      onStageChange(index);
                    }}
                    className={cn(
                      "block w-full rounded-[22px] border px-4 py-3 text-left transition-all",
                      index % 2 === 0 ? "mr-8" : "ml-8",
                      isActive ? deck.stageActiveClass : deck.stageIdleClass,
                    )}
                  >
                    <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-inherit/70">Message {index + 1}</div>
                    <div className="mt-1 text-sm font-semibold text-current">{stage.label}</div>
                    <div className="mt-2 text-xs leading-relaxed text-inherit/80">{stage.summary}</div>
                  </button>
                );
              })}
            </div>
            <div className="mt-4">
              <FunnelDeckPager stageIndex={stageIndex} stageCount={deck.stages.length} onStageChange={onStageChange} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[30px] border border-amber-300 bg-[#2a1606] px-5 py-4 text-amber-50 shadow-[0_20px_50px_rgba(120,53,15,0.28)]">
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-amber-200">Context-preserving handoff</div>
              <div className="mt-2 grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px]">
                <p className="text-sm leading-7 text-amber-50/85">DM funnels should look like continuity between conversation and booking, not like a generic landing page pretending a chat ever happened.</p>
                <div className="rounded-[20px] border border-white/10 bg-white/8 px-4 py-3 text-sm leading-7 text-amber-50/85">Active lane: {activeStage.label}</div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
              <FunnelDeckFrame
                title={title}
                htmlPreview={htmlPreview}
                activeStage={activeStage}
                viewport={device}
                frameClass={deck.frameClass}
                className="bg-white"
              />
              <div className="space-y-3">
                <div className="rounded-[24px] border border-amber-100 bg-white px-4 py-4 shadow-sm">
                  <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-amber-800">Diagnosis cue</div>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{activeStage.summary}</p>
                </div>
                <div className="rounded-[24px] border border-amber-100 bg-amber-50 px-4 py-4">
                  <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-amber-800">Handoff rule</div>
                  <p className="mt-2 text-sm leading-7 text-slate-700">The booking ask should feel like the next message in the thread, not a jump cut into standard funnel chrome.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (deck.family === "narrative") {
    return (
      <div className={cn("w-full min-h-[520px] p-5", deck.shellClass)}>
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_290px]">
          <div className="space-y-4">
            <div className={cn("inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em]", deck.badgeClass)}>
              {deck.badge}
            </div>
            <div className="border-b border-orange-300 pb-4">
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-orange-800">Editorial spread</div>
              <h4 className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-[-0.03em] text-slate-950">{deck.headline}</h4>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-700">{deck.intro}</p>
              {description && <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{description}</p>}
            </div>
            <FunnelDeckFrame
              title={title}
              htmlPreview={htmlPreview}
              activeStage={activeStage}
              viewport={device}
              frameClass={deck.frameClass}
              className="bg-white/90"
            />
            <FunnelDeckPager stageIndex={stageIndex} stageCount={deck.stages.length} onStageChange={onStageChange} />
          </div>

          <div className="space-y-4">
            <div className="rounded-[28px] border border-orange-200 bg-white/80 px-5 py-4 shadow-sm">
              <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-orange-800">Current chapter</div>
              <div className="mt-2 font-serif text-2xl font-semibold leading-tight text-slate-950">{activeStage.label}</div>
              <p className="mt-3 text-sm leading-7 text-slate-700">{activeStage.summary}</p>
            </div>

            <div className="overflow-hidden rounded-[28px] border border-orange-200 bg-white/80 shadow-sm">
              {deck.stages.map((stage, index) => {
                const isActive = index === stageIndex;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      onStageChange(index);
                    }}
                    className={cn(
                      "flex w-full items-start gap-4 border-b border-orange-100 px-4 py-4 text-left transition-colors last:border-b-0",
                      isActive ? "bg-orange-50" : "bg-white hover:bg-orange-50/60",
                    )}
                  >
                    <div className="font-serif text-2xl leading-none text-orange-500">0{index + 1}</div>
                    <div>
                      <div className="text-sm font-semibold text-slate-950">{stage.label}</div>
                      <div className="mt-1 text-xs leading-relaxed text-slate-600">{stage.summary}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="rounded-[28px] border border-orange-200 bg-[#fff7ed] px-5 py-4 text-sm leading-7 text-slate-700">
              Narrative funnels need chapter rhythm, tension, and release. If this preview reads like a dashboard, it failed.
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (deck.family === "qualification") {
    return (
      <div className={cn("w-full min-h-[520px] p-5", deck.shellClass)}>
        <div className="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)_240px]">
          <div className="space-y-4">
            <div className={cn("inline-flex items-center border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em]", deck.badgeClass)}>
              {deck.badge}
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-600">Operator worksheet</div>
              <h4 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-950">{deck.headline}</h4>
              <p className="mt-2 text-sm leading-7 text-slate-700">{deck.intro}</p>
            </div>
            <div className="space-y-3">
              {deck.stages.map((stage, index) => {
                const isActive = index === stageIndex;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      onStageChange(index);
                    }}
                    className={cn(
                      "flex w-full items-start gap-3 border px-4 py-3 text-left transition-all",
                      isActive ? deck.stageActiveClass : deck.stageIdleClass,
                    )}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-current/20 text-[11px] font-mono">{index + 1}</div>
                    <div>
                      <div className="text-sm font-semibold text-current">{stage.label}</div>
                      <div className="mt-1 text-xs leading-relaxed text-inherit/80">{stage.summary}</div>
                    </div>
                  </button>
                );
              })}
            </div>
            <FunnelDeckPager stageIndex={stageIndex} stageCount={deck.stages.length} onStageChange={onStageChange} />
          </div>

          <FunnelDeckFrame
            title={title}
            htmlPreview={htmlPreview}
            activeStage={activeStage}
            viewport={device}
            frameClass={deck.frameClass}
            className="rounded-none shadow-none"
            innerClassName="rounded-none"
            header={
              <div className="mb-4 grid gap-3 sm:grid-cols-3">
                <div className="border border-slate-200 bg-white px-4 py-3">
                  <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-slate-500">Fit gate</div>
                  <div className="mt-2 text-sm font-semibold text-slate-950">Selective entry</div>
                </div>
                <div className="border border-slate-200 bg-white px-4 py-3">
                  <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-slate-500">Proof mode</div>
                  <div className="mt-2 text-sm font-semibold text-slate-950">Evaluator criteria</div>
                </div>
                <div className="border border-slate-200 bg-white px-4 py-3">
                  <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-slate-500">Worksheet</div>
                  <div className="mt-2 text-sm font-semibold text-slate-950">Decision inputs</div>
                </div>
              </div>
            }
          />

          <div className="space-y-3">
            <div className="border border-slate-200 bg-white px-4 py-4 shadow-sm">
              <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-slate-500">Active stage</div>
              <div className="mt-2 text-base font-semibold text-slate-950">{activeStage.label}</div>
              <p className="mt-2 text-sm leading-7 text-slate-700">{activeStage.summary}</p>
            </div>
            <div className="border border-slate-200 bg-slate-50 px-4 py-4">
              <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-slate-500">Screening principle</div>
              <p className="mt-2 text-sm leading-7 text-slate-700">Qualification previews should feel like controlled intake, not hype. The structure should imply filtration and operator judgment.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (deck.family === "vsl") {
    return (
      <div className="w-full min-h-[520px] overflow-hidden bg-[#17090f] text-white">
        <div className="border-b border-white/10 px-5 py-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className={cn("inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em]", deck.badgeClass, "border-white/15 bg-white/5 text-rose-100")}>
                {deck.badge}
              </div>
              <div className="mt-3 text-[11px] font-mono uppercase tracking-[0.18em] text-rose-200">Cinematic control room</div>
              <h4 className="mt-2 max-w-3xl font-display text-3xl font-bold tracking-tight text-white">{deck.headline}</h4>
            </div>
            <p className="max-w-md text-sm leading-7 text-rose-50/80">{deck.intro}</p>
          </div>

          <div className="mt-5 grid gap-2 lg:grid-cols-4">
            {deck.stages.map((stage, index) => {
              const isActive = index === stageIndex;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onStageChange(index);
                  }}
                  className={cn(
                    "rounded-[20px] border px-4 py-3 text-left transition-all",
                    isActive ? "border-rose-400 bg-rose-500/10 text-white shadow-[0_0_0_1px_rgba(251,113,133,0.2)]" : "border-white/10 bg-white/5 text-rose-50/80 hover:border-rose-400/50 hover:text-white",
                  )}
                >
                  <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-inherit/70">Lens {index + 1}</div>
                  <div className="mt-1 text-sm font-semibold text-current">{stage.label}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 p-5 xl:grid-cols-[minmax(0,1fr)_280px]">
          <FunnelDeckFrame
            title={title}
            htmlPreview={htmlPreview}
            activeStage={activeStage}
            viewport={device}
            frameClass="border-white/10 bg-white/5"
            className="shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
            header={
              <div className="mb-4 flex items-center justify-between gap-3 rounded-[22px] border border-white/10 bg-black/20 px-4 py-3">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-rose-200">Active stage</div>
                  <div className="mt-1 text-lg font-semibold text-white">{activeStage.label}</div>
                </div>
                <div className="max-w-sm text-right text-sm leading-6 text-rose-50/75">{activeStage.summary}</div>
              </div>
            }
          />

          <div className="space-y-3">
            <div className="rounded-[24px] border border-white/10 bg-white/5 px-4 py-4">
              <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-rose-200">Argument body</div>
              <p className="mt-2 text-sm leading-7 text-rose-50/80">VSL previews should privilege the dominant media moment and the conviction stack around it. It should feel staged and singular.</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-black/20 px-4 py-4">
              <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-rose-200">Current lens</div>
              <div className="mt-2 text-base font-semibold text-white">{activeStage.label}</div>
              <p className="mt-2 text-sm leading-7 text-rose-50/75">{activeStage.summary}</p>
            </div>
            <FunnelDeckPager
              stageIndex={stageIndex}
              stageCount={deck.stages.length}
              onStageChange={onStageChange}
              buttonClassName="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-rose-50 transition-colors hover:border-rose-300 hover:text-white"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full min-h-[520px] p-5", deck.shellClass)}>
      <div className="grid gap-5 xl:grid-cols-[300px_minmax(0,1fr)]">
        <div className="space-y-4">
          <div className={cn("inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em]", deck.badgeClass)}>
            {deck.badge}
          </div>
          <div>
            <div className={cn("text-[11px] font-mono uppercase tracking-[0.18em]", deck.eyebrowClass)}>Preview mode</div>
            <h4 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-950">{deck.headline}</h4>
            <p className="mt-2 text-sm leading-7 text-slate-700">{deck.intro}</p>
            {description && <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>}
          </div>
          <div className="space-y-2.5">
            {deck.stages.map((stage, index) => {
              const isActive = index === stageIndex;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onStageChange(index);
                  }}
                  className={cn("w-full rounded-2xl border px-4 py-3 text-left transition-all", isActive ? deck.stageActiveClass : deck.stageIdleClass)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-current">{stage.label}</div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.16em] opacity-70">{index + 1}/{deck.stages.length}</div>
                  </div>
                  <div className="mt-1 text-xs leading-relaxed text-inherit/80">{stage.summary}</div>
                </button>
              );
            })}
          </div>
          <FunnelDeckPager stageIndex={stageIndex} stageCount={deck.stages.length} onStageChange={onStageChange} />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500">Active stage</div>
              <div className="mt-1 text-lg font-semibold text-slate-950">{activeStage.label}</div>
            </div>
            <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-slate-600">
              {title}
            </div>
          </div>
          <FunnelDeckFrame
            title={title}
            htmlPreview={htmlPreview}
            activeStage={activeStage}
            viewport={device}
            frameClass={deck.frameClass}
            header={
              <div className="mb-4 rounded-[22px] border border-slate-200 bg-white px-4 py-3">
                <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-slate-500">Why this stage exists</div>
                <div className="mt-2 text-sm leading-7 text-slate-700">{activeStage.summary}</div>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}

export function ComponentPreview({ slug, title, category, description, code, htmlPreview, tags = [], creatorName, creatorId, saveCount, remixCount, variants, onOpenExhibit }: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [device, setDevice] = useState<PreviewDevice>("desktop");
  const [funnelStageIndex, setFunnelStageIndex] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);
  const fallbackVariantSlug = slug || title.toLowerCase().replace(/\s+/g, "-");
  const resolvedVariants = [
    ...(variants || []),
    ...(variants?.some((variant) => variant.slug === fallbackVariantSlug) ? [] : [{
      slug: fallbackVariantSlug,
      title,
      description,
      category,
      htmlPreview,
      tags,
    }]),
  ].filter((variant, index, collection) => collection.findIndex((candidate) => candidate.slug === variant.slug) === index);
  const [activeVariantIndex, setActiveVariantIndex] = useState(() => {
    const storedVariantSlug = readStoredVariantSlug(fallbackVariantSlug);
    if (!storedVariantSlug) {
      return 0;
    }

    const storedVariantIndex = resolvedVariants.findIndex((variant) => variant.slug === storedVariantSlug);
    return storedVariantIndex >= 0 ? storedVariantIndex : 0;
  });
  const activeVariant = resolvedVariants[activeVariantIndex] || resolvedVariants[0];
  const activeTags = activeVariant?.tags || tags;
  const activeCategory = activeVariant?.category || category;
  const activePreviewTitle = activeVariant?.title || title;
  const activePreviewDescription = activeVariant?.description || description;
  const activeVariantMeta = activeVariant ? getPreviewVariantMeta(activeVariant) : null;
  const funnelDeck = isFunnelPreview(activeCategory, activeTags, activePreviewTitle) ? getFunnelPreviewDeck(activeTags) : null;

  const handleControlClick = (event: MouseEvent<HTMLButtonElement>, action: () => void) => {
    event.preventDefault();
    event.stopPropagation();
    action();
  };

  useEffect(() => {
    if (!funnelDeck && device === "desktop" && previewRef.current) {
      previewRef.current.innerHTML = activeVariant?.htmlPreview || htmlPreview;
    }
  }, [activeTab, activeVariant, device, funnelDeck, htmlPreview]);

  useEffect(() => {
    setFunnelStageIndex(0);
  }, [activeVariant?.slug]);

  useEffect(() => {
    if (!activeVariant?.slug) {
      return;
    }

    writeStoredVariantSlug(fallbackVariantSlug, activeVariant.slug);
  }, [activeVariant?.slug, fallbackVariantSlug]);

  const variationCount = resolvedVariants.length;
  const openActiveVariant = () => {
    if (onOpenExhibit && activeVariant) {
      writeStoredVariantSlug(fallbackVariantSlug, activeVariant.slug);
      onOpenExhibit(activeVariant.slug);
    }
  };

  return (
    <div
      data-testid={`card-exhibit-${title.toLowerCase().replace(/\s+/g, "-")}`}
      className={cn(
        "group border border-border bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300",
        onOpenExhibit ? "cursor-pointer" : "",
      )}
      onClick={() => openActiveVariant()}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-neutral-50/50 dark:bg-neutral-900/50 backdrop-blur-sm">
        <div className="flex flex-col gap-0.5 min-w-0 mr-4">
          <h3 className="text-sm font-semibold font-display tracking-tight text-foreground truncate">{title}</h3>
          {description && <p className="text-[11px] text-muted-foreground line-clamp-1">{description}</p>}
          {activeVariantMeta && funnelDeck && (
            <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              <span className="rounded-full border border-border bg-background px-2 py-0.5">{variationCount} live {variationCount === 1 ? "variation" : "variations"}</span>
              <span className="rounded-full border border-border bg-background px-2 py-0.5">Viewing {activeVariantMeta.label}</span>
            </div>
          )}
          {tags.length > 0 && (
            <div className="flex gap-1 mt-1 flex-wrap">
              {tags.slice(0, 4).map(tag => (
                <span key={tag} className="px-1.5 py-0.5 bg-muted text-muted-foreground text-[10px] rounded font-mono">{tag}</span>
              ))}
              {tags.length > 4 && <span className="text-[10px] text-muted-foreground">+{tags.length - 4}</span>}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          {activeTab === "preview" && (
            <div className="hidden sm:flex items-center bg-background/50 border border-border/50 rounded-lg p-0.5 backdrop-blur-sm">
              <button 
                data-testid="button-device-desktop"
                onClick={(event) => handleControlClick(event, () => setDevice("desktop"))}
                className={cn("p-1.5 rounded-md transition-all duration-200", device === "desktop" ? "bg-white dark:bg-neutral-800 text-foreground shadow-sm scale-105" : "text-muted-foreground hover:text-foreground")}
                title="Desktop view"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button 
                data-testid="button-device-tablet"
                onClick={(event) => handleControlClick(event, () => setDevice("tablet"))}
                className={cn("p-1.5 rounded-md transition-all duration-200", device === "tablet" ? "bg-white dark:bg-neutral-800 text-foreground shadow-sm scale-105" : "text-muted-foreground hover:text-foreground")}
                title="Tablet view"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button 
                data-testid="button-device-mobile"
                onClick={(event) => handleControlClick(event, () => setDevice("mobile"))}
                className={cn("p-1.5 rounded-md transition-all duration-200", device === "mobile" ? "bg-white dark:bg-neutral-800 text-foreground shadow-sm scale-105" : "text-muted-foreground hover:text-foreground")}
                title="Mobile view"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="flex items-center bg-muted/50 p-0.5 rounded-lg border border-border/50">
            <button
              data-testid="button-tab-preview"
              onClick={(event) => handleControlClick(event, () => setActiveTab("preview"))}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200",
                activeTab === "preview" 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Preview</span>
            </button>
            <button
              data-testid="button-tab-code"
              onClick={(event) => handleControlClick(event, () => setActiveTab("code"))}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200",
                activeTab === "code" 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Code</span>
            </button>
          </div>

          {onOpenExhibit && activeVariant && (
            <button
              type="button"
              onClick={(event) => handleControlClick(event, () => {
                writeStoredVariantSlug(fallbackVariantSlug, activeVariant.slug);
                onOpenExhibit(activeVariant.slug);
              })}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-border/50 bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            >
              Open page
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className={cn("relative bg-neutral-100/30 dark:bg-neutral-900/30", funnelDeck ? "min-h-[520px]" : "min-h-[400px]")}>
        {funnelDeck && activeTab === "preview" && activeVariantMeta && (
          <div className="border-b border-border bg-white/80 px-4 py-4 backdrop-blur-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Concept variations</div>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-700">
                  One concept card, real live pages behind it. Do not multiply top-level cards just to fake tone changes.
                </p>
              </div>
              <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-slate-600">
                Active: {activeVariantMeta.label}
              </div>
            </div>
            <div className={cn("mt-4 grid gap-2", variationCount > 1 ? "md:grid-cols-3" : "md:grid-cols-1")}>
              {resolvedVariants.map((variant, index) => {
                const variantMeta = getPreviewVariantMeta(variant);
                const isActive = index === activeVariantIndex;

                return (
                  <button
                    key={variant.slug}
                    type="button"
                    onClick={(event) => handleControlClick(event, () => {
                      writeStoredVariantSlug(fallbackVariantSlug, variant.slug);
                      setActiveVariantIndex(index);
                    })}
                    className={cn(
                      "rounded-2xl border px-4 py-3 text-left transition-colors",
                      isActive ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400",
                    )}
                  >
                    <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-current/70">{variantMeta.tone}</div>
                    <div className="mt-1 text-sm font-semibold text-current">{variantMeta.label}</div>
                    <div className="mt-2 text-xs leading-relaxed text-current/80">{variantMeta.typography}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
        <AnimatePresence mode="wait">
          {activeTab === "preview" ? (
            funnelDeck ? (
              <motion.div
                key={`funnel-preview-${activeVariant?.slug || title}-${device}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full min-h-[520px] overflow-hidden"
              >
                <FunnelPreviewDeckView
                  title={activePreviewTitle}
                  description={activePreviewDescription}
                  htmlPreview={activeVariant?.htmlPreview || htmlPreview}
                  deck={funnelDeck}
                  device={device}
                  stageIndex={funnelStageIndex}
                  onStageChange={setFunnelStageIndex}
                />
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full min-h-[400px] flex items-center justify-center p-8 overflow-hidden"
              >
                <div 
                  className={cn(
                    "transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] border border-border/40 bg-background shadow-sm overflow-hidden rounded-md ring-1 ring-black/5",
                    device === "mobile" ? "w-[375px] max-h-[667px] shadow-xl" : device === "tablet" ? "w-[768px] max-h-[500px] shadow-lg" : "w-full"
                  )}
                >
                  {device === "desktop" ? (
                    <div ref={previewRef} className="w-full overflow-auto" />
                  ) : (
                    <HtmlPreviewFrame
                      htmlPreview={htmlPreview}
                      title={`${title} ${device} preview`}
                      viewport={device}
                      className="bg-neutral-50 dark:bg-neutral-950"
                    />
                  )}
                </div>
              </motion.div>
            )
          ) : (
            <motion.div
              key="code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-[#1e1e1e]"
            >
              <CodeBlock code={code} className="h-full border-0 rounded-none" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Social Proof Footer */}
      {(creatorName || saveCount !== undefined || remixCount !== undefined) && (
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-border bg-neutral-50/50 dark:bg-neutral-900/50">
          {creatorName && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <User className="w-3 h-3" />
              <span data-testid={`text-creator-${creatorId}`}>{creatorName}</span>
            </div>
          )}
          <div className="flex items-center gap-3 text-xs text-muted-foreground ml-auto">
            {saveCount !== undefined && saveCount > 0 && (
              <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{saveCount}</span>
            )}
            {remixCount !== undefined && remixCount > 0 && (
              <span className="flex items-center gap-1"><GitFork className="w-3 h-3" />{remixCount}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
