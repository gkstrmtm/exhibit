/**
 * Filter Ownership Visible
 * Category: Data Density
 * Tags: filter, chips, visible-state, toolbar, filter-ownership, clarity
 * Description: Filter state that is always visible as chips in the toolbar — never hidden inside a dropdown. The active filter set is readable at a glance. Each chip shows the dimension and value, can be individually removed, and a clear-all action is available when multiple filters are active.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/filter-ownership-visible.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";

type FilterChip = { id: string; dimension: string; value: string; color: string };

const INITIAL_FILTERS: FilterChip[] = [
  { id: "status", dimension: "Status", value: "Open", color: "bg-blue-50 border-blue-200 text-blue-700" },
  { id: "assignee", dimension: "Assignee", value: "Amara Singh", color: "bg-violet-50 border-violet-200 text-violet-700" },
  { id: "priority", dimension: "Priority", value: "High", color: "bg-red-50 border-red-200 text-red-700" },
];

const ADDABLE: FilterChip[] = [
  { id: "type", dimension: "Type", value: "Invoice", color: "bg-amber-50 border-amber-200 text-amber-700" },
  { id: "region", dimension: "Region", value: "US-East", color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
];

export default function FilterOwnershipVisible() {
  const [active, setActive] = useState<FilterChip[]>(INITIAL_FILTERS);
  const [showAdd, setShowAdd] = useState(false);

  function remove(id: string) {
    setActive((prev) => prev.filter((f) => f.id !== id));
  }

  function add(chip: FilterChip) {
    if (active.find((f) => f.id === chip.id)) return;
    setActive((prev) => [...prev, chip]);
    setShowAdd(false);
  }

  const available = ADDABLE.filter((a) => !active.find((f) => f.id === a.id));

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden w-full max-w-lg">
      {/* Toolbar */}
      <div className="px-4 py-3 border-b border-neutral-200 bg-neutral-50 flex items-start gap-3 flex-wrap min-h-[52px]">
        <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
          <SlidersHorizontal size={13} strokeWidth={2} className="text-neutral-400" />
          <span className="text-xs font-medium text-neutral-500">Filters</span>
        </div>

        {/* Active filter chips — always visible */}
        <div className="flex flex-wrap gap-1.5 flex-1">
          {active.length === 0 && (
            <span className="text-xs text-neutral-400 italic">No filters active</span>
          )}
          {active.map((chip) => (
            <span
              key={chip.id}
              className={`inline-flex items-center gap-1 border rounded-full px-2.5 py-1 text-[11px] font-medium ${chip.color}`}
            >
              <span className="opacity-60">{chip.dimension}:</span>
              <span>{chip.value}</span>
              <button
                onClick={() => remove(chip.id)}
                className="ml-0.5 hover:opacity-70 transition-opacity"
                aria-label={`Remove ${chip.dimension} filter`}
              >
                <X size={10} strokeWidth={2.5} />
              </button>
            </span>
          ))}

          {/* Add filter */}
          {available.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setShowAdd((v) => !v)}
                className="inline-flex items-center gap-1 border border-dashed border-neutral-300 rounded-full px-2.5 py-1 text-[11px] text-neutral-500 hover:text-neutral-700 hover:border-neutral-400 transition-colors"
              >
                + Add filter
              </button>
              {showAdd && (
                <div className="absolute left-0 top-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-sm z-10 min-w-[140px] py-1">
                  {available.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => add(a)}
                      className="w-full text-left px-3 py-1.5 text-xs text-neutral-700 hover:bg-neutral-50"
                    >
                      {a.dimension}: {a.value}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Clear all — only when multiple active */}
        {active.length > 1 && (
          <button
            onClick={() => setActive([])}
            className="text-[11px] text-neutral-400 hover:text-neutral-600 shrink-0 pt-0.5"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Result count */}
      <div className="px-4 py-2.5 text-sm text-neutral-700">
        <span className="font-semibold text-neutral-900">
          {active.length === 0 ? "2,841" : active.length === 1 ? "412" : active.length === 2 ? "78" : "14"}
        </span>{" "}
        <span className="text-neutral-500">results</span>
      </div>

      {/* Rows */}
      {["INV-1041 — Acme Corp", "INV-1038 — Bright Co", "INV-1035 — Global Ltd"].slice(0, active.length === 0 ? 3 : active.length >= 3 ? 1 : 2).map((r) => (
        <div key={r} className="px-4 py-2 border-t border-neutral-100 text-xs text-neutral-700">{r}</div>
      ))}

      <div className="px-4 py-2.5 border-t border-neutral-100 bg-neutral-50 text-[11px] text-neutral-400">
        Active filters stay visible as labeled chips — the filter state is never hidden inside a dropdown.
      </div>
    </div>
  );
}
