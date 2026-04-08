/**
 * Dropdown vs Segmented Anti-Pattern
 * Category: Inputs
 * Tags: dropdown, segmented, anti-pattern, comparison, mode-switch, controls
 * Description: Side-by-side comparison: wrong pattern uses a dropdown for a 3-option mode switch that is changed frequently — the current mode is invisible at a glance. Right pattern uses a segmented control so the active mode is always visible. Both are interactive.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/dropdown-vs-segmented-anti-pattern.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Mode = "All cases" | "My cases" | "Team cases";
const MODES: Mode[] = ["All cases", "My cases", "Team cases"];
const COUNTS: Record<Mode, number> = { "All cases": 147, "My cases": 14, "Team cases": 61 };

function WrongDropdown() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("All cases");
  return (
    <div className="border border-red-200 rounded-lg overflow-hidden">
      <div className="bg-red-50 px-3 py-1.5 text-[10px] font-semibold text-red-600 uppercase tracking-wide border-b border-red-200">
        ✗ Wrong — dropdown for mode
      </div>
      <div className="p-3 bg-white flex items-center gap-2">
        <span className="text-xs text-neutral-500">View:</span>
        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-1.5 border border-neutral-300 rounded-md px-3 py-1.5 text-sm text-neutral-700 bg-white hover:bg-neutral-50 min-w-[120px] justify-between"
          >
            {mode}
            <ChevronDown size={13} strokeWidth={2} className="text-neutral-400" />
          </button>
          {open && (
            <div className="absolute left-0 top-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-sm z-10 w-full py-1">
              {MODES.map((m) => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 text-sm hover:bg-neutral-50 ${m === mode ? "font-semibold text-neutral-900" : "text-neutral-700"}`}
                >
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="px-3 pb-2 text-xs text-neutral-700 bg-white">
        Showing <strong>{COUNTS[mode]}</strong> cases
      </div>
      <div className="px-3 py-1.5 border-t border-neutral-100 bg-neutral-50 text-[10px] text-red-500">
        Must open dropdown to see what mode is active — hidden state, extra click
      </div>
    </div>
  );
}

function RightSegmented() {
  const [mode, setMode] = useState<Mode>("All cases");
  return (
    <div className="border border-emerald-200 rounded-lg overflow-hidden">
      <div className="bg-emerald-50 px-3 py-1.5 text-[10px] font-semibold text-emerald-700 uppercase tracking-wide border-b border-emerald-200">
        ✓ Right — segmented control
      </div>
      <div className="p-3 bg-white">
        <div className="inline-flex gap-0.5 bg-neutral-100 p-0.5 rounded-lg w-full">
          {MODES.map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 px-2 py-1.5 rounded-md text-[11px] font-medium transition-all select-none ${
                mode === m
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              {m.replace(" cases", "")}
            </button>
          ))}
        </div>
      </div>
      <div className="px-3 pb-2 text-xs text-neutral-700 bg-white">
        Showing <strong>{COUNTS[mode]}</strong> cases
      </div>
      <div className="px-3 py-1.5 border-t border-neutral-100 bg-neutral-50 text-[10px] text-emerald-600">
        Active mode always visible — no extra click, no hidden state
      </div>
    </div>
  );
}

export default function DropdownVsSegmentedAntiPattern() {
  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-4">
        Mode switch — dropdown vs segmented control
      </div>
      <div className="grid grid-cols-2 gap-3">
        <WrongDropdown />
        <RightSegmented />
      </div>
      <div className="mt-4 text-[11px] text-neutral-400">
        Rule: If the user switches this control more than once per session and options are ≤4, use segmented. Dropdown is for selection from a long list, not for toggling a known-mode set.
      </div>
    </div>
  );
}
