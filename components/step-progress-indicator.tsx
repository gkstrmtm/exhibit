/**
 * Step Progress Indicator
 * Category: Navigation
 * Tags: stepper, steps, progress, wizard, indicator, numbered
 * Description: A numbered step progress indicator. Shows steps with numbered circles, labels, and connecting lines. Completed steps show a check icon, the active step is highlighted, and future steps are dimmed. Clicking a completed step and using Previous/Next navigates between steps.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/step-progress-indicator.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

const STEPS = [
  { label: "Account info", desc: "Name & email" },
  { label: "Profile setup", desc: "Role & avatar" },
  { label: "Choose plan", desc: "Free or Pro" },
  { label: "Confirmation", desc: "Review & submit" },
];

export default function StepProgressIndicator() {
  const [step, setStep] = useState(1);

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 w-full max-w-xs space-y-5">
      {/* Indicator */}
      <div className="flex items-center">
        {STEPS.map((s, i) => {
          const n = i + 1;
          const done = n < step;
          const active = n === step;
          return (
            <div key={s.label} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => done && setStep(n)}
                className="flex flex-col items-center gap-0.5 cursor-default"
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold transition-colors ${done ? "bg-neutral-900 text-white cursor-pointer hover:bg-neutral-700" : active ? "bg-neutral-900 text-white ring-2 ring-neutral-900 ring-offset-2" : "bg-neutral-200 text-neutral-500"}`}>
                  {done ? <Check size={10} strokeWidth={2.5} /> : n}
                </div>
                <div className={`text-[8px] font-medium leading-none ${active ? "text-neutral-800" : done ? "text-neutral-500" : "text-neutral-400"}`}>{s.label}</div>
              </button>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-1 mb-3 ${n < step ? "bg-neutral-900" : "bg-neutral-200"}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Content area */}
      <div className="bg-white border border-neutral-200 rounded-lg p-3 min-h-[52px] flex items-center">
        <div>
          <div className="text-[11px] font-semibold text-neutral-800">{STEPS[step - 1].label}</div>
          <div className="text-[9px] text-neutral-400">{STEPS[step - 1].desc}</div>
        </div>
      </div>

      {/* Nav */}
      <div className="flex justify-between">
        <button
          onClick={() => setStep(s => Math.max(1, s - 1))}
          disabled={step === 1}
          className="flex items-center gap-1 px-2.5 py-1 text-[10px] border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 transition-colors"
        >
          <ChevronLeft size={10} strokeWidth={1.5} />Back
        </button>
        <button
          onClick={() => setStep(s => Math.min(STEPS.length, s + 1))}
          disabled={step === STEPS.length}
          className="flex items-center gap-1 px-2.5 py-1 text-[10px] bg-neutral-900 text-white rounded-lg hover:bg-neutral-700 disabled:opacity-40 transition-colors"
        >
          Next<ChevronRight size={10} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
