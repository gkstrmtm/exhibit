/**
 * Mutation Timeline Branch
 * Category: Feedback
 * Tags: optimistic, mutation, timeline, branch, async, error, rollback
 * Description: Visualizes the two paths of an async mutation: the success branch (optimistic → confirmed) and the failure branch (optimistic → rollback → error state). Shows a before-state record, an in-flight indicator, and the after-state for both paths. User can trigger each path.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/mutation-timeline-branch.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState, useRef, useEffect } from "react";
import { Check, X, Loader2, ArrowRight } from "lucide-react";

type BranchState = "before" | "inflight" | "success" | "failure";

function TimelineNode({ label, sub, type }: {
  label: string; sub: string;
  type: "neutral" | "active" | "success" | "failure";
}) {
  const ring: Record<string, string> = {
    neutral: "border-neutral-300 bg-white",
    active: "border-blue-400 bg-blue-50",
    success: "border-emerald-400 bg-emerald-50",
    failure: "border-red-300 bg-red-50",
  };
  const dot: Record<string, string> = {
    neutral: "bg-neutral-300",
    active: "bg-blue-400",
    success: "bg-emerald-400",
    failure: "bg-red-400",
  };
  const textCol: Record<string, string> = {
    neutral: "text-neutral-600",
    active: "text-blue-700",
    success: "text-emerald-700",
    failure: "text-red-600",
  };

  return (
    <div className={`flex flex-col items-center gap-1 px-3 py-2.5 rounded-lg border ${ring[type]} min-w-[90px]`}>
      <div className={`h-2.5 w-2.5 rounded-full ${dot[type]}`} />
      <span className={`text-[11px] font-semibold ${textCol[type]}`}>{label}</span>
      <span className="text-[9px] text-neutral-400 text-center leading-tight">{sub}</span>
    </div>
  );
}

function Arrow() {
  return <ArrowRight size={13} className="text-neutral-300 shrink-0 mt-3" />;
}

function Branch({ title, delay, fails }: { title: string; delay: number; fails: boolean }) {
  const [state, setState] = useState<BranchState>("before");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  function trigger() {
    setState("inflight");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setState(fails ? "failure" : "success");
    }, delay);
  }

  function reset() { setState("before"); clearTimeout(timer.current); }

  return (
    <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
      <div className="px-3 py-2 border-b border-neutral-100 flex items-center justify-between">
        <span className="text-xs font-semibold text-neutral-700">{title}</span>
        <div className="flex gap-1">
          <button
            onClick={trigger}
            disabled={state === "inflight"}
            className="text-[10px] px-2 py-1 bg-neutral-100 hover:bg-neutral-200 rounded-md text-neutral-600 disabled:opacity-40"
          >
            {state === "inflight" ? <><Loader2 size={9} className="inline animate-spin mr-0.5" />Running</> : "Run"}
          </button>
          {state !== "before" && state !== "inflight" && (
            <button onClick={reset} className="text-[10px] px-2 py-1 bg-neutral-100 hover:bg-neutral-200 rounded-md text-neutral-500">
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="px-3 py-3 flex items-start gap-1.5 overflow-x-auto">
        {/* Step 1 — Before */}
        <TimelineNode label="Before" sub="Status: Open" type="neutral" />
        <Arrow />

        {/* Step 2 — Optimistic apply */}
        <TimelineNode
          label="Optimistic"
          sub="Status: Done (local)"
          type={state === "before" ? "neutral" : "active"}
        />
        <Arrow />

        {/* Step 3 — In-flight */}
        {state === "inflight" ? (
          <div className="flex flex-col items-center gap-1 px-3 py-2.5 rounded-lg border border-blue-400 bg-blue-50 min-w-[90px]">
            <Loader2 size={10} className="text-blue-400 animate-spin" />
            <span className="text-[11px] font-semibold text-blue-700">Saving…</span>
            <span className="text-[9px] text-neutral-400">network call</span>
          </div>
        ) : (
          <TimelineNode
            label={state === "success" ? "Confirmed" : state === "failure" ? "Rollback" : "Server"}
            sub={state === "success" ? "Status: Done (synced)" : state === "failure" ? "Status: Open (restored)" : "awaiting…"}
            type={state === "success" ? "success" : state === "failure" ? "failure" : "neutral"}
          />
        )}

        {/* Step 4 — Result */}
        {state === "success" && (
          <>
            <Arrow />
            <div className="flex flex-col items-center gap-1 px-3 py-2.5 rounded-lg border border-emerald-200 bg-emerald-50 min-w-[90px]">
              <Check size={12} className="text-emerald-500" />
              <span className="text-[11px] font-semibold text-emerald-700">Done</span>
              <span className="text-[9px] text-neutral-400">persisted</span>
            </div>
          </>
        )}
        {state === "failure" && (
          <>
            <Arrow />
            <div className="flex flex-col items-center gap-1 px-3 py-2.5 rounded-lg border border-red-200 bg-red-50 min-w-[90px]">
              <X size={12} className="text-red-400" />
              <span className="text-[11px] font-semibold text-red-600">Failed</span>
              <span className="text-[9px] text-neutral-400">show toast</span>
            </div>
          </>
        )}
      </div>

      <div className="px-3 py-1.5 border-t border-neutral-100 bg-neutral-50 text-[10px] text-neutral-500">
        {fails
          ? "On failure: reverse the optimistic change and surface an inline error or toast"
          : "On success: local state is already correct — server confirmation just ensures sync"}
      </div>
    </div>
  );
}

export default function MutationTimelineBranch() {
  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-4">
        Mutation timeline — success vs failure branch
      </div>
      <div className="flex flex-col gap-3">
        <Branch title="✓ Success path" delay={1000} fails={false} />
        <Branch title="✗ Failure path — rollback" delay={1000} fails={true} />
      </div>
      <div className="mt-4 text-[11px] text-neutral-400">
        Rule: Always prepare the rollback path before shipping optimistic updates. UI state must be restorable from the pre-mutation snapshot stored at click time.
      </div>
    </div>
  );
}
