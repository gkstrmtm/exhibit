/**
 * Checklist Card
 * Category: Cards
 * Tags: checklist, task, card, todo, progress, compact
 * Description: A titled card containing a mini task checklist. Items can be individually checked. A progress bar at the top of the card fills as tasks are completed. Completed items show a strikethrough label. A "Reset" link restores all items to unchecked.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/checklist-card.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { CheckCircle2, Circle, ClipboardList } from "lucide-react";

const INITIAL_ITEMS = [
  { id: 1, text: "Define acceptance criteria" },
  { id: 2, text: "Design mockups approved" },
  { id: 3, text: "API contract finalized" },
  { id: 4, text: "Unit tests written" },
  { id: 5, text: "Reviewed by a team member" },
  { id: 6, text: "Deployed to staging" },
];

export default function ChecklistCard() {
  const [checked, setChecked] = useState<Set<number>>(new Set([1, 2]));

  const toggle = (id: number) => setChecked(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const pct = Math.round((checked.size / INITIAL_ITEMS.length) * 100);

  return (
    <div className="bg-white border border-neutral-200 rounded-xl w-full max-w-xs overflow-hidden">
      {/* Progress bar */}
      <div className="h-0.5 bg-neutral-100">
        <div
          className="h-full bg-emerald-400 transition-all duration-300"
          style={{ width: pct + "%" }}
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <ClipboardList size={12} strokeWidth={1.5} className="text-neutral-400" />
            <span className="text-[11px] font-semibold text-neutral-700">Release checklist</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-neutral-400">{checked.size}/{INITIAL_ITEMS.length}</span>
            {checked.size > 0 && (
              <button onClick={() => setChecked(new Set())} className="text-[9px] text-neutral-400 hover:text-neutral-600 underline transition-colors">Reset</button>
            )}
          </div>
        </div>

        <div className="space-y-1">
          {INITIAL_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              className="w-full flex items-center gap-2 py-1 px-1 rounded-md hover:bg-neutral-50 transition-colors text-left"
            >
              {checked.has(item.id)
                ? <CheckCircle2 size={13} strokeWidth={1.5} className="text-emerald-500 flex-shrink-0" />
                : <Circle size={13} strokeWidth={1.5} className="text-neutral-300 flex-shrink-0" />}
              <span className={`text-[10px] transition-colors ${checked.has(item.id) ? "line-through text-neutral-400" : "text-neutral-700"}`}>
                {item.text}
              </span>
            </button>
          ))}
        </div>

        {pct === 100 && (
          <div className="mt-3 flex items-center justify-center gap-1.5 py-1.5 bg-emerald-50 border border-emerald-100 rounded-lg">
            <CheckCircle2 size={11} strokeWidth={1.5} className="text-emerald-500" />
            <span className="text-[10px] font-medium text-emerald-700">All done! Ready to ship.</span>
          </div>
        )}
      </div>
    </div>
  );
}
