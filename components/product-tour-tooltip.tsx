/**
 * Product Tour Tooltip
 * Category: Onboarding
 * Tags: tour, tooltip, walkthrough, highlight, steps, coachmark
 * Description: A multi-step product tour implemented with step-indexed coachmarks. Each step highlights a different UI element via a ring and shows a positioned tooltip with a title and description. Back/Next navigation moves through steps and a progress indicator shows current position. Demonstrates the coachmark product tour pattern.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/product-tour-tooltip.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { X } from "lucide-react";

const STEPS = [
  { target: "nav", title: "Navigation", desc: "Switch between your main workspace areas using the sidebar." },
  { target: "create", title: "Create new", desc: "Click here to start a new project, document, or workflow." },
  { target: "search", title: "Search everything", desc: "Press ⌘K or click here to find anything instantly." },
  { target: "avatar", title: "Your account", desc: "Manage settings, billing, and your profile from this menu." },
];

export default function ProductTourTooltip() {
  const [step, setStep] = useState<number | null>(0);

  if (step === null) return (
    <div className="bg-white border border-neutral-200 rounded-xl p-5 w-full max-w-xs text-center space-y-2">
      <div className="text-sm font-semibold text-neutral-900">Tour complete!</div>
      <p className="text-xs text-neutral-500">You're ready to explore on your own.</p>
      <button onClick={() => setStep(0)} className="text-[10px] text-blue-600 hover:underline">Restart tour</button>
    </div>
  );

  const current = STEPS[step];

  return (
    <div className="bg-neutral-100 border border-neutral-200 rounded-xl p-4 w-full max-w-xs space-y-3">
      {/* Mock UI */}
      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
        {/* Mock sidebar */}
        <div className="flex h-32">
          <div className={`w-10 bg-neutral-900 flex flex-col items-center py-2 gap-2 transition-all ${current.target === "nav" ? "ring-2 ring-blue-500 ring-offset-1 rounded" : ""}`}>
            {["▪", "▫", "▫", "▫"].map((d, i) => (
              <div key={i} className={`w-5 h-5 rounded ${d === "▪" ? "bg-neutral-500" : "bg-neutral-700"}`} />
            ))}
          </div>
          {/* Mock main */}
          <div className="flex-1 p-2 flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <div className={`flex-1 h-5 bg-neutral-100 rounded flex items-center px-2 transition-all ${current.target === "search" ? "ring-2 ring-blue-500" : ""}`}>
                <span className="text-[9px] text-neutral-400">Search…</span>
              </div>
              <div className={`w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-[9px] cursor-pointer transition-all ${current.target === "create" ? "ring-2 ring-blue-400" : ""}`}>+</div>
              <div className={`w-5 h-5 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 transition-all ${current.target === "avatar" ? "ring-2 ring-blue-500" : ""}`} />
            </div>
            <div className="space-y-1">
              {[1, 2, 3].map(i => <div key={i} className="h-3 bg-neutral-100 rounded w-full" />)}
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      <div className="bg-neutral-900 text-white rounded-xl p-3 space-y-1.5">
        <div className="flex items-start justify-between">
          <div className="text-xs font-semibold">{current.title}</div>
          <button onClick={() => setStep(null)} className="text-neutral-400 hover:text-white -mt-0.5">
            <X size={12} />
          </button>
        </div>
        <p className="text-[11px] text-neutral-300 leading-relaxed">{current.desc}</p>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex gap-1">
            {STEPS.map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === step ? "bg-white" : "bg-neutral-600"}`} />
            ))}
          </div>
          <div className="flex gap-1.5">
            {step > 0 && (
              <button onClick={() => setStep(s => (s ?? 0) - 1)} className="text-[10px] text-neutral-400 hover:text-white">Back</button>
            )}
            <button
              onClick={() => setStep(s => s !== null && s < STEPS.length - 1 ? s + 1 : null)}
              className="text-[10px] font-medium text-white bg-blue-600 hover:bg-blue-500 rounded px-2 py-0.5 transition-colors"
            >
              {step < STEPS.length - 1 ? "Next" : "Done"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
