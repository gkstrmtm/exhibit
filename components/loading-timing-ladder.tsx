/**
 * Loading Timing Ladder
 * Category: Feedback
 * Tags: loading, skeleton, timing, ux-pattern, latency, states
 * Description: Four interactive loading scenarios at different latency thresholds: instant swap (0ms — no loader needed), light-delay skeleton (150ms), sustained skeleton (800ms), and failed load with error recovery. Each panel is independently triggerable.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/loading-timing-ladder.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState, useRef, useEffect } from "react";
import { RefreshCw, AlertCircle } from "lucide-react";

type SlotState = "idle" | "loading" | "loaded" | "failed";

function RowSkeleton({ width = "full" }: { width?: string }) {
  return (
    <div className="flex items-center gap-2 py-2 border-b border-neutral-100 last:border-0">
      <div className="h-6 w-6 rounded-md bg-neutral-200 animate-pulse shrink-0" />
      <div className={`flex-1 flex gap-2`}>
        <div className={`h-3 bg-neutral-200 rounded animate-pulse`} style={{ width: "38%" }} />
        <div className={`h-3 bg-neutral-200 rounded animate-pulse`} style={{ width: "22%" }} />
      </div>
    </div>
  );
}

const ROWS = [
  { name: "Invoice #1024", amount: "$1,200", status: "Paid" },
  { name: "Invoice #1025", amount: "$340", status: "Pending" },
  { name: "Invoice #1026", amount: "$860", status: "Draft" },
];

interface SlotConfig {
  label: string;
  tagline: string;
  delay: number;
  fails?: boolean;
  note: string;
}

const SLOTS: SlotConfig[] = [
  { label: "Instant swap", tagline: "0 ms — no loader, just render", delay: 0, note: "Under ~100ms: skip spinners entirely. Appear immediately." },
  { label: "Light-delay skeleton", tagline: "~150 ms — skeleton briefly visible", delay: 150, note: "100–300ms: show skeleton so layout stays stable, then settle fast." },
  { label: "Sustained skeleton", tagline: "~800 ms — skeleton holds", delay: 800, note: "300ms+: skeleton should match real content structure exactly." },
  { label: "Failed load", tagline: "Network timeout simulation", delay: 800, fails: true, note: "Always give a retry action. Never leave a blank panel." },
];

function LoadingSlot({ config }: { config: SlotConfig }) {
  const [state, setState] = useState<SlotState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  function trigger() {
    setState("loading");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setState(config.fails ? "failed" : "loaded");
    }, Math.max(config.delay, 80));
  }

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
      <div className="px-3 pt-3 pb-2 border-b border-neutral-100 flex items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold text-neutral-800">{config.label}</p>
          <p className="text-[10px] text-neutral-400 mt-0.5">{config.tagline}</p>
        </div>
        <button
          onClick={trigger}
          disabled={state === "loading"}
          className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-600 font-medium disabled:opacity-40 shrink-0"
        >
          <RefreshCw size={10} className={state === "loading" ? "animate-spin" : ""} />
          Load
        </button>
      </div>

      <div className="min-h-[110px] px-3 py-1">
        {state === "idle" && (
          <p className="text-[11px] text-neutral-400 pt-3 text-center">Press Load ↑</p>
        )}
        {state === "loading" && (
          <>
            <RowSkeleton />
            <RowSkeleton />
            <RowSkeleton />
          </>
        )}
        {state === "loaded" && (
          <div>
            {ROWS.map((r) => (
              <div key={r.name} className="flex items-center gap-2 py-2 border-b border-neutral-100 last:border-0">
                <div className="h-6 w-6 rounded-md bg-neutral-100 shrink-0" />
                <span className="flex-1 text-xs text-neutral-800">{r.name}</span>
                <span className="text-xs text-neutral-500">{r.amount}</span>
                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${r.status === "Paid" ? "bg-emerald-100 text-emerald-700" : r.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-neutral-100 text-neutral-500"}`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        )}
        {state === "failed" && (
          <div className="flex flex-col items-center justify-center gap-2 py-4">
            <AlertCircle size={16} className="text-red-400" />
            <p className="text-xs text-neutral-500">Failed to load</p>
            <button onClick={trigger} className="text-[11px] text-neutral-600 underline hover:text-neutral-800">
              Try again
            </button>
          </div>
        )}
      </div>
      <div className="px-3 py-1.5 border-t border-neutral-100 bg-neutral-50 text-[10px] text-neutral-500">
        {config.note}
      </div>
    </div>
  );
}

export default function LoadingTimingLadder() {
  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-4">
        Loading timing ladder
      </div>
      <div className="grid grid-cols-2 gap-3">
        {SLOTS.map((s) => (
          <LoadingSlot key={s.label} config={s} />
        ))}
      </div>
      <div className="mt-4 text-[11px] text-neutral-400">
        Rule: Match skeleton complexity to real content structure. Never show a generic spinner when you know the shape of the data that will arrive.
      </div>
    </div>
  );
}
