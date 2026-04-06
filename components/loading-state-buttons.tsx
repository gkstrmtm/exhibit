/**
 * Loading State Buttons
 * Category: Buttons
 * Tags: loading, spinner, state, async, ux, feedback
 * Description: Buttons that communicate progress. Spinner inline, disabled feedback, and completion state. Critical for any action with async wait — form submission, payments, API calls.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/loading-state-buttons.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";
import { Loader2, Check } from "lucide-react";

export default function LoadingStateButtons() {
  const [states, setStates] = useState({ a: "idle", b: "idle", c: "idle" });
  const trigger = (key: "a" | "b" | "c") => {
    setStates(s => ({ ...s, [key]: "loading" }));
    setTimeout(() => setStates(s => ({ ...s, [key]: "done" })), 2000);
    setTimeout(() => setStates(s => ({ ...s, [key]: "idle" })), 3500);
  };
  return (
    <div className="p-8 bg-white flex flex-col gap-8 items-start">
      <div className="flex flex-col gap-3">
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Click to simulate</div>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => trigger("a")} disabled={states.a !== "idle"}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-blue-600 text-white rounded-lg disabled:opacity-70 transition-all min-w-[140px] justify-center">
            {states.a === "loading" ? <><Loader2 className="w-4 h-4 animate-spin" />Saving…</> :
             states.a === "done"    ? <><Check className="w-4 h-4" />Saved!</>    : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}