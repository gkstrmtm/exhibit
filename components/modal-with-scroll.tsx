/**
 * Modal with Scroll
 * Category: Layout
 * Tags: modal, dialog, scroll, footer, header, overflow
 * Description: A modal dialog with a fixed header and footer while only the body content scrolls. This prevents the action buttons from disappearing on long-form content. Clicking the backdrop or cancel button closes the modal. Demonstrates the correct modal anatomy for tall content.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/modal-with-scroll.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { X } from "lucide-react";

const CHANGELOG = [
  { v: "v2.4.0", date: "Jun 18", notes: "Redesigned command palette with fuzzy search, improved keyboard navigation, and better match highlighting." },
  { v: "v2.3.2", date: "Jun 10", notes: "Fixed scroll restoration on browser back navigation. Resolved edge case in token refresh for long-idle sessions." },
  { v: "v2.3.0", date: "May 29", notes: "New onboarding checklist for first-time users. Added keyboard shortcuts panel (press ?)." },
  { v: "v2.2.1", date: "May 14", notes: "Performance pass: reduced JS bundle size by 18%, improved time-to-interactive on slow connections." },
  { v: "v2.2.0", date: "May 1", notes: "Launched export-to-CSV for all data tables. New dark mode preference respected from OS." },
  { v: "v2.1.0", date: "Apr 15", notes: "API versioning introduced. All existing integrations remain on v1 — see migration guide." },
  { v: "v2.0.0", date: "Apr 2", notes: "Major redesign. New navigation structure, updated design tokens, and improved accessibility across all components." },
];

export default function ModalWithScroll() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center h-64 bg-neutral-100 rounded-xl w-full border border-neutral-200">
      <button
        onClick={() => setOpen(true)}
        className="text-xs font-medium bg-neutral-900 text-white px-3 py-1.5 rounded hover:bg-neutral-700 transition-colors"
      >
        View changelog
      </button>

      {open && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />

          {/* Modal */}
          <div className="relative bg-white rounded-xl shadow-2xl w-80 flex flex-col max-h-72 z-10 overflow-hidden">
            {/* Fixed header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 shrink-0">
              <div>
                <div className="text-sm font-semibold text-neutral-900">What's new</div>
                <div className="text-[10px] text-neutral-400 mt-0.5">{CHANGELOG.length} releases</div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 rounded text-neutral-400 hover:text-neutral-700">
                <X size={13} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
              {CHANGELOG.map(({ v, date, notes }) => (
                <div key={v} className="pb-3 border-b border-neutral-100 last:border-b-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold text-neutral-900">{v}</span>
                    <span className="text-[10px] text-neutral-400">{date}</span>
                  </div>
                  <p className="text-[11px] text-neutral-600 leading-relaxed">{notes}</p>
                </div>
              ))}
            </div>

            {/* Fixed footer */}
            <div className="px-4 py-3 border-t border-neutral-200 shrink-0 flex justify-between items-center bg-neutral-50">
              <a href="#" className="text-[11px] text-blue-600 hover:underline">View full changelog →</a>
              <button
                onClick={() => setOpen(false)}
                className="text-xs font-medium bg-neutral-900 text-white px-3 py-1.5 rounded hover:bg-neutral-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
