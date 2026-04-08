/**
 * Drawer Overlay
 * Category: Layout
 * Tags: drawer, overlay, panel, slide, backdrop
 * Description: A right-side drawer that slides over content without pushing the layout. A semi-transparent backdrop is placed beneath the drawer. Clicking the backdrop or the close button dismisses the drawer. Demonstrates the overlay drawer pattern used for detail panels, filters, and contextual settings.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/drawer-overlay.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";

const FILTERS = [
  { label: "Status", options: ["Active", "Inactive", "Pending"] },
  { label: "Priority", options: ["Critical", "High", "Normal", "Low"] },
  { label: "Assignee", options: ["Alice", "Bob", "Carol", "Unassigned"] },
];

export default function DrawerOverlay() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative bg-neutral-50 border border-neutral-200 rounded-xl overflow-hidden h-72 w-full max-w-sm">
      {/* Main content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-neutral-700">Issues (48)</span>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-900 border border-neutral-200 rounded px-2 py-1 bg-white transition-colors"
          >
            <SlidersHorizontal size={11} strokeWidth={2} />
            Filters
          </button>
        </div>

        <div className="space-y-1.5">
          {["Design system audit", "Onboarding flow refresh", "API rate limit review", "Token refresh bug", "Dashboard perf"].map((item) => (
            <div key={item} className="bg-white border border-neutral-150 rounded px-3 py-2 text-xs text-neutral-700">
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="absolute inset-0 bg-black/20 z-10 transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className="absolute top-0 right-0 h-full w-52 bg-white border-l border-neutral-200 z-20 flex flex-col shadow-lg transition-transform duration-200"
        style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
      >
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-neutral-200">
          <span className="text-xs font-semibold text-neutral-800">Filters</span>
          <button
            onClick={() => setOpen(false)}
            className="p-0.5 rounded text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            <X size={13} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {FILTERS.map(({ label, options }) => (
            <div key={label}>
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide mb-1.5">{label}</div>
              <div className="space-y-1">
                {options.map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-xs text-neutral-700 cursor-pointer">
                    <input type="checkbox" className="rounded border-neutral-300 w-3 h-3" />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-neutral-200">
          <button
            onClick={() => setOpen(false)}
            className="w-full text-xs font-medium bg-neutral-900 text-white rounded px-2 py-1.5 hover:bg-neutral-700 transition-colors"
          >
            Apply filters
          </button>
        </div>
      </div>
    </div>
  );
}
