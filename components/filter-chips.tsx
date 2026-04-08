/**
 * Filter Chips
 * Category: Navigation
 * Tags: filter, chips, tags, toggle, facets, multi-select
 * Description: A horizontal scrollable row of toggleable filter chip buttons. Multiple chips can be active at once. An active chip fills with its category color. An "All" chip clears all selections. The filtered count is shown as a badge next to the panel title.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/filter-chips.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { X } from "lucide-react";

const CHIPS = [
  { id: "design", label: "Design", color: "bg-violet-100 text-violet-700 border-violet-200", active: "bg-violet-600 text-white border-violet-600" },
  { id: "engineering", label: "Engineering", color: "bg-blue-100 text-blue-700 border-blue-200", active: "bg-blue-600 text-white border-blue-600" },
  { id: "product", label: "Product", color: "bg-emerald-100 text-emerald-700 border-emerald-200", active: "bg-emerald-600 text-white border-emerald-600" },
  { id: "growth", label: "Growth", color: "bg-amber-100 text-amber-700 border-amber-200", active: "bg-amber-600 text-white border-amber-600" },
  { id: "infra", label: "Infrastructure", color: "bg-rose-100 text-rose-700 border-rose-200", active: "bg-rose-600 text-white border-rose-600" },
  { id: "data", label: "Data", color: "bg-cyan-100 text-cyan-700 border-cyan-200", active: "bg-cyan-600 text-white border-cyan-600" },
];

const ITEMS = [
  { id: 1, name: "Design tokens overhaul", tags: ["design"] },
  { id: 2, name: "API v3 migration", tags: ["engineering", "infra"] },
  { id: 3, name: "Onboarding A/B test", tags: ["growth", "product"] },
  { id: 4, name: "Component showcase", tags: ["design", "engineering"] },
  { id: 5, name: "Data pipeline refactor", tags: ["data", "infra"] },
  { id: 6, name: "Growth dashboard", tags: ["growth", "data"] },
];

export default function FilterChips() {
  const [active, setActive] = useState<Set<string>>(new Set());

  const toggle = (id: string) => setActive(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const clearAll = () => setActive(new Set());

  const filtered = active.size === 0 ? ITEMS : ITEMS.filter(item => item.tags.some(t => active.has(t)));

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 w-full max-w-xs space-y-3">
      {/* Chips */}
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={clearAll}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-[9px] font-medium transition-colors ${active.size === 0 ? "bg-neutral-900 text-white border-neutral-900" : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300"}`}
        >
          All
        </button>
        {CHIPS.map(chip => (
          <button
            key={chip.id}
            onClick={() => toggle(chip.id)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-[9px] font-medium transition-colors ${active.has(chip.id) ? chip.active : chip.color}`}
          >
            {chip.label}
            {active.has(chip.id) && <X size={8} strokeWidth={2} />}
          </button>
        ))}
      </div>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Items</span>
          <span className="text-[9px] text-neutral-500">{filtered.length} shown</span>
        </div>
        <div className="space-y-1">
          {filtered.map(item => (
            <div key={item.id} className="flex items-center justify-between bg-white border border-neutral-100 rounded-lg px-2.5 py-1.5">
              <span className="text-[10px] text-neutral-700">{item.name}</span>
              <div className="flex gap-1">
                {item.tags.map(t => {
                  const chip = CHIPS.find(c => c.id === t);
                  return chip
                    ? <span key={t} className={`px-1.5 py-0.5 rounded-full text-[7px] font-medium border ${chip.color}`}>{chip.label}</span>
                    : null;
                })}
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="text-center text-[10px] text-neutral-400 py-3">No items match the selected filters.</div>}
        </div>
      </div>
    </div>
  );
}
