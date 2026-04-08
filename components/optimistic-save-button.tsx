/**
 * Optimistic Save Button
 * Category: Inputs
 * Tags: optimistic, save, button, async, states, feedback, mutation
 * Description: A form save button with four distinct states: idle → saving (spinner, disabled) → saved (check + "Saved" label, 2s) → back to idle. Demonstrates "apply first" feedback with graceful recovery when save fails. A toggle switches to the failure path.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/optimistic-save-button.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState, useRef, useEffect } from "react";
import { Loader2, Check, AlertCircle } from "lucide-react";

type SaveState = "idle" | "saving" | "saved" | "failed";

function SaveButton({ shouldFail }: { shouldFail: boolean }) {
  const [state, setState] = useState<SaveState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  function handleSave() {
    if (state !== "idle") return;
    setState("saving");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (shouldFail) {
        setState("failed");
        timer.current = setTimeout(() => setState("idle"), 2500);
      } else {
        setState("saved");
        timer.current = setTimeout(() => setState("idle"), 2000);
      }
    }, 1100);
  }

  const BASE = "min-w-[108px] flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all select-none";

  const variants: Record<SaveState, string> = {
    idle: `${BASE} bg-neutral-900 text-white hover:bg-neutral-700 active:scale-95 cursor-pointer`,
    saving: `${BASE} bg-neutral-400 text-white cursor-not-allowed`,
    saved: `${BASE} bg-emerald-600 text-white`,
    failed: `${BASE} bg-red-600 text-white`,
  };

  const labels: Record<SaveState, React.ReactNode> = {
    idle: "Save changes",
    saving: <><Loader2 size={14} className="animate-spin" /> Saving…</>,
    saved: <><Check size={14} /> Saved</>,
    failed: <><AlertCircle size={14} /> Failed — retry</>,
  };

  return (
    <button className={variants[state]} onClick={handleSave} disabled={state === "saving"}>
      {labels[state]}
    </button>
  );
}

export default function OptimisticSaveButton() {
  const [simulateFail, setSimulateFail] = useState(false);

  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full max-w-sm">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-4">
        Save button states
      </div>

      {/* Fake form */}
      <div className="bg-white border border-neutral-200 rounded-lg p-4 mb-4 space-y-3">
        <div>
          <label className="text-[10px] text-neutral-400 uppercase tracking-wide block mb-1">Display name</label>
          <input
            defaultValue="Sarah Chen"
            className="w-full border border-neutral-200 rounded-md px-3 py-2 text-sm text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-400"
          />
        </div>
        <div>
          <label className="text-[10px] text-neutral-400 uppercase tracking-wide block mb-1">Timezone</label>
          <input
            defaultValue="America / New_York"
            className="w-full border border-neutral-200 rounded-md px-3 py-2 text-sm text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-400"
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <SaveButton shouldFail={simulateFail} />
          {simulateFail && (
            <span className="text-[10px] text-red-500 font-medium">Failure mode on</span>
          )}
        </div>
      </div>

      {/* Failure toggle */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-neutral-500">Simulate network failure</span>
        <button
          onClick={() => setSimulateFail((v) => !v)}
          className={`relative w-9 h-5 rounded-full transition-colors ${simulateFail ? "bg-red-500" : "bg-neutral-300"}`}
        >
          <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${simulateFail ? "translate-x-4" : "translate-x-0.5"}`} />
        </button>
      </div>
      <div className="mt-3 text-[11px] text-neutral-400">
        idle → saving (disabled, spinner) → saved (green, 2s) → idle. Error path: saving → failed (red, 2.5s) → idle. Button width is fixed — no layout shift between states.
      </div>
    </div>
  );
}
