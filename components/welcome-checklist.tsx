/**
 * Welcome Checklist
 * Category: Onboarding
 * Tags: onboarding, checklist, setup, welcome, steps
 * Description: Setup checklist for new users. Checkable steps, completion percentage, and a completion state when all are done. Classic first-run pattern.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/welcome-checklist.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";
const STEPS = ["Complete your profile","Publish your first exhibit","Join a challenge","Follow 3 creators"];
export default function WelcomeChecklist() {
  const [done, setDone] = useState(new Set([0]));
  const toggle = (i: number) => setDone(s => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; });
  const pct = Math.round((done.size / STEPS.length) * 100);
  return (
    <div className="bg-white border border-neutral-100 rounded-xl p-5 max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-semibold text-neutral-900">Getting started</div>
        <div className="text-xs text-neutral-500">{done.size}/{STEPS.length} done</div>
      </div>
      <div className="h-1 bg-neutral-100 rounded-full mb-4 overflow-hidden">
        <div className="h-full bg-neutral-900 rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
      {STEPS.map((s, i) => (
        <button key={i} onClick={() => toggle(i)} className="w-full flex items-center gap-3 py-2.5 text-left group">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${done.has(i) ? "border-neutral-900 bg-neutral-900" : "border-neutral-200 group-hover:border-neutral-400"}`}>
            {done.has(i) && <span className="text-white text-xs">✓</span>}
          </div>
          <span className={`text-sm ${done.has(i) ? "line-through text-neutral-400" : "text-neutral-700"}`}>{s}</span>
        </button>
      ))}
    </div>
  );
}