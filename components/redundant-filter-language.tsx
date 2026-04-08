/**
 * Redundant Filter Language Anti-Pattern
 * Category: Inputs
 * Tags: anti-pattern, filter, language, redundancy, labels, clarity
 * Description: Contrasts two filter bar designs. The wrong version repeats the dimension name in every chip label ("Status: Open", "Status: Closed", "Owner: Mine") — verbose and harder to scan. The right version uses compact chips with the dimension as a header and the value as the label.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/redundant-filter-language.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState } from "react";
import { X } from "lucide-react";

interface Chip { id: number; dimension: string; value: string; color: string; }

const INITIAL_CHIPS: Chip[] = [
  { id: 1, dimension: "Status", value: "Open", color: "bg-blue-100 text-blue-700" },
  { id: 2, dimension: "Status", value: "In Review", color: "bg-amber-100 text-amber-700" },
  { id: 3, dimension: "Owner", value: "Mine", color: "bg-purple-100 text-purple-700" },
  { id: 4, dimension: "Priority", value: "High", color: "bg-red-100 text-red-600" },
];

function WrongPanel() {
  const [chips, setChips] = useState(INITIAL_CHIPS);
  return (
    <div className="border border-red-200 rounded-lg overflow-hidden bg-white">
      <div className="bg-red-50 px-3 py-1.5 text-[10px] font-semibold text-red-600 uppercase tracking-wide border-b border-red-200">
        ✗ Wrong — dimension repeated in every chip
      </div>
      <div className="flex flex-wrap gap-1.5 px-3 py-3 min-h-[70px]">
        {chips.map((c) => (
          <div key={c.id} className="flex items-center gap-1 px-2 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-[11px] text-neutral-700">
            <span className="font-medium">{c.dimension}: {c.value}</span>
            <button onClick={() => setChips((cs) => cs.filter((x) => x.id !== c.id))} className="text-neutral-400 hover:text-neutral-600 ml-0.5">
              <X size={9} />
            </button>
          </div>
        ))}
        {chips.length === 0 && <span className="text-[11px] text-neutral-400">No active filters</span>}
      </div>
      <div className="px-3 py-1.5 border-t border-neutral-100 bg-neutral-50 text-[9px] text-red-500">
        "Status: Open" + "Status: In Review" repeats "Status" twice — cognitive weight, harder to scan at speed
      </div>
    </div>
  );
}

function RightPanel() {
  const [chips, setChips] = useState(INITIAL_CHIPS);

  // Group by dimension
  const groups: Record<string, Chip[]> = {};
  chips.forEach((c) => {
    if (!groups[c.dimension]) groups[c.dimension] = [];
    groups[c.dimension].push(c);
  });

  return (
    <div className="border border-emerald-200 rounded-lg overflow-hidden bg-white">
      <div className="bg-emerald-50 px-3 py-1.5 text-[10px] font-semibold text-emerald-700 uppercase tracking-wide border-b border-emerald-200">
        ✓ Right — grouped compact chips
      </div>
      <div className="flex flex-wrap gap-1.5 px-3 py-3 min-h-[70px] items-start">
        {Object.entries(groups).map(([dim, cs]) => (
          <div key={dim} className="flex items-center gap-0.5 border border-neutral-200 rounded-full overflow-hidden bg-neutral-50">
            <span className="text-[9px] text-neutral-400 pl-2 pr-1 uppercase tracking-wide">{dim}</span>
            {cs.map((c) => (
              <div key={c.id} className={`flex items-center gap-0.5 ${c.color} px-1.5 py-0.5 text-[10px] font-medium`}>
                {c.value}
                <button onClick={() => setChips((cs2) => cs2.filter((x) => x.id !== c.id))} className="opacity-60 hover:opacity-100 ml-0.5">
                  <X size={8} />
                </button>
              </div>
            ))}
          </div>
        ))}
        {chips.length === 0 && <span className="text-[11px] text-neutral-400">No active filters</span>}
      </div>
      <div className="px-3 py-1.5 border-t border-neutral-100 bg-neutral-50 text-[9px] text-emerald-600">
        Dimension label appears once as a prefix — multiple values for same dimension are visually grouped
      </div>
    </div>
  );
}

export default function RedundantFilterLanguage() {
  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-4">
        Redundant filter language — anti-pattern
      </div>
      <div className="grid grid-cols-2 gap-3">
        <WrongPanel />
        <RightPanel />
      </div>
      <div className="mt-4 text-[11px] text-neutral-400">
        Rule: The filter dimension (Status, Owner, Priority) should appear once as structural scaffolding. Values live inside it. Repeating the dimension label in every chip is label inflation — it slows scanning.
      </div>
    </div>
  );
}
