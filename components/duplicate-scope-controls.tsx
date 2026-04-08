/**
 * Duplicate Scope Controls Anti-Pattern
 * Category: Inputs
 * Tags: anti-pattern, scope, filter, duplicate, confusion, controls
 * Description: Shows the UX anti-pattern where two controls that do the same job (scope the data to "mine vs all") appear simultaneously — one in the page header and one in the filter bar. The wrong version creates confusion about which wins. The right version shows a single authoritative scope selector.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/duplicate-scope-controls.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState } from "react";

type Scope = "All" | "Mine" | "Team";

function WrongPanel() {
  const [headerScope, setHeaderScope] = useState<Scope>("All");
  const [filterScope, setFilterScope] = useState<Scope>("Mine");

  const count = headerScope === "Mine" || filterScope === "Mine" ? 14 : headerScope === "Team" || filterScope === "Team" ? 61 : 147;

  return (
    <div className="border border-red-200 rounded-lg overflow-hidden bg-white">
      <div className="bg-red-50 px-3 py-1.5 text-[10px] font-semibold text-red-600 uppercase tracking-wide border-b border-red-200">
        ✗ Wrong — two scope controls
      </div>

      {/* Header scope */}
      <div className="flex items-center gap-2 px-3 py-2 bg-neutral-50 border-b border-neutral-100">
        <span className="text-[10px] text-neutral-500">View:</span>
        {(["All", "Mine", "Team"] as Scope[]).map((s) => (
          <button
            key={s}
            onClick={() => setHeaderScope(s)}
            className={`text-[10px] px-2 py-1 rounded-md font-medium transition-colors ${headerScope === s ? "bg-neutral-800 text-white" : "text-neutral-600 hover:bg-neutral-200"}`}
          >
            {s}
          </button>
        ))}
        <span className="ml-auto text-[9px] text-neutral-400">header scope</span>
      </div>

      {/* Filter bar — also has scope */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-neutral-100">
        <span className="text-[10px] text-neutral-500">Assigned:</span>
        {(["All", "Mine", "Team"] as Scope[]).map((s) => (
          <button
            key={s}
            onClick={() => setFilterScope(s)}
            className={`text-[10px] px-2 py-1 rounded-md font-medium transition-colors ${filterScope === s ? "bg-blue-600 text-white" : "text-neutral-600 hover:bg-neutral-200"}`}
          >
            {s}
          </button>
        ))}
        <span className="ml-auto text-[9px] text-neutral-400">filter scope</span>
      </div>

      <div className="px-3 py-2 text-xs text-neutral-600">
        Showing <strong>{count}</strong> items —{" "}
        <span className="text-red-500 text-[10px]">which control wins? user doesn't know</span>
      </div>
    </div>
  );
}

function RightPanel() {
  const [scope, setScope] = useState<Scope>("All");
  const count = scope === "Mine" ? 14 : scope === "Team" ? 61 : 147;

  return (
    <div className="border border-emerald-200 rounded-lg overflow-hidden bg-white">
      <div className="bg-emerald-50 px-3 py-1.5 text-[10px] font-semibold text-emerald-700 uppercase tracking-wide border-b border-emerald-200">
        ✓ Right — single scope control
      </div>

      {/* Single scope in filter bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-neutral-100">
        <span className="text-[10px] text-neutral-500">Scope:</span>
        <div className="inline-flex bg-neutral-100 p-0.5 rounded-lg gap-0.5">
          {(["All", "Mine", "Team"] as Scope[]).map((s) => (
            <button
              key={s}
              onClick={() => setScope(s)}
              className={`text-[10px] px-2.5 py-1 rounded-md font-medium transition-all ${scope === s ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="px-3 py-2 text-xs text-neutral-600">
        Showing <strong>{count}</strong> items —{" "}
        <span className="text-emerald-600 text-[10px]">one control, unambiguous</span>
      </div>
      <div className="px-3 py-1.5 border-t border-neutral-100 bg-neutral-50 text-[9px] text-neutral-400">
        (empty row where filter bar was — page is less tall too)
      </div>
    </div>
  );
}

export default function DuplicateScopeControls() {
  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-4">
        Duplicate scope controls — anti-pattern
      </div>
      <div className="grid grid-cols-2 gap-3">
        <WrongPanel />
        <RightPanel />
      </div>
      <div className="mt-4 text-[11px] text-neutral-400">
        Rule: A scope selector ("mine / all / team") should exist exactly once per view. If a filter bar and a page header both control scope, merge them into one authoritative control in the toolbar.
      </div>
    </div>
  );
}
