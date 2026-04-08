/**
 * Back Forward Nav Buttons
 * Category: Navigation
 * Tags: back, forward, history, navigation, stack, browser
 * Description: Browser-style back and forward navigation buttons backed by an in-memory history stack. The back button is disabled when at the beginning and the forward button is disabled when at the end. Clicking a page link navigates to it and truncates any forward history. Demonstrates client-side history stack management.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/back-forward-nav-buttons.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PAGES = [
  { id: "dashboard", label: "Dashboard", desc: "Main overview with key metrics and recent activity." },
  { id: "projects", label: "Projects", desc: "All active and archived projects for your workspace." },
  { id: "analytics", label: "Analytics", desc: "Traffic, engagement, and conversion data over time." },
  { id: "settings", label: "Settings", desc: "Account preferences, notifications, and integrations." },
  { id: "billing", label: "Billing", desc: "Current plan, invoices, and payment methods." },
];

export default function BackForwardNavButtons() {
  // history is a stack of page ids; cursor points at current
  const [history, setHistory] = useState(["dashboard"]);
  const [cursor, setCursor] = useState(0);

  const canBack = cursor > 0;
  const canForward = cursor < history.length - 1;
  const current = PAGES.find((p) => p.id === history[cursor])!;

  function goBack() { if (canBack) setCursor((c) => c - 1); }
  function goForward() { if (canForward) setCursor((c) => c + 1); }
  function navigate(id: string) {
    const newHistory = [...history.slice(0, cursor + 1), id];
    setHistory(newHistory);
    setCursor(newHistory.length - 1);
  }

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl overflow-hidden w-full max-w-sm">
      {/* Nav bar */}
      <div className="flex items-center gap-1 px-3 py-2 bg-neutral-100 border-b border-neutral-200">
        <button
          onClick={goBack}
          disabled={!canBack}
          className="p-1 rounded text-neutral-500 hover:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Back"
        >
          <ChevronLeft size={14} strokeWidth={2} />
        </button>
        <button
          onClick={goForward}
          disabled={!canForward}
          className="p-1 rounded text-neutral-500 hover:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Forward"
        >
          <ChevronRight size={14} strokeWidth={2} />
        </button>

        {/* URL bar */}
        <div className="flex-1 bg-white border border-neutral-200 rounded text-xs text-neutral-600 px-2 py-1 mx-1">
          /{current.id}
        </div>

        <div className="text-[9px] text-neutral-400">
          {cursor + 1} / {history.length}
        </div>
      </div>

      {/* Page content */}
      <div className="p-4">
        <div className="text-sm font-semibold text-neutral-900 mb-1">{current.label}</div>
        <p className="text-xs text-neutral-600 leading-relaxed mb-3">{current.desc}</p>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-1.5">
          {PAGES.filter((p) => p.id !== current.id).map((p) => (
            <button
              key={p.id}
              onClick={() => navigate(p.id)}
              className="text-left text-xs text-blue-600 hover:underline"
            >
              → {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
