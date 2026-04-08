/**
 * Breadcrumb with Overflow
 * Category: Navigation
 * Tags: breadcrumb, overflow, ellipsis, collapse, path
 * Description: A breadcrumb component that collapses middle segments into an ellipsis button when the path is long. Clicking the ellipsis expands all segments. The last segment is the current page (non-link). Demonstrates the overflow breadcrumb pattern used in file browsers and deep navigation trees.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/breadcrumb-with-overflow.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { ChevronRight, MoreHorizontal, Home } from "lucide-react";

const SHORT_PATH = ["Home", "Projects", "Website"];
const LONG_PATH = ["Home", "Projects", "Marketing", "Campaigns", "Q4 2024", "Email Templates", "welcome-series.html"];

export default function BreadcrumbWithOverflow() {
  const [expandedShort, setExpandedShort] = useState(false);
  const [expandedLong, setExpandedLong] = useState(false);

  function Crumbs({ path, expanded, setExpanded }: { path: string[]; expanded: boolean; setExpanded: (v: boolean) => void }) {
    const COLLAPSE_THRESHOLD = 4;
    const shouldCollapse = path.length > COLLAPSE_THRESHOLD && !expanded;
    const first = path[0];
    const last = path[path.length - 1];
    const middle = path.slice(1, -1);

    return (
      <nav className="flex items-center gap-0.5 flex-wrap">
        {/* First */}
        <a href="#" className="flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 transition-colors">
          <Home size={11} strokeWidth={1.5} />
          <span>{first}</span>
        </a>

        {shouldCollapse ? (
          <>
            <ChevronRight size={11} className="text-neutral-300 shrink-0" />
            <button
              onClick={() => setExpanded(true)}
              className="text-xs text-neutral-400 hover:text-neutral-700 border border-dashed border-neutral-300 rounded px-1.5 py-0.5 transition-colors"
              title="Show full path"
            >
              <MoreHorizontal size={11} />
            </button>
            <ChevronRight size={11} className="text-neutral-300 shrink-0" />
            <a href="#" className="text-xs text-neutral-500 hover:text-neutral-900">
              {path[path.length - 2]}
            </a>
          </>
        ) : (
          middle.map((seg) => (
            <span key={seg} className="flex items-center gap-0.5">
              <ChevronRight size={11} className="text-neutral-300 shrink-0" />
              <a href="#" className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors">{seg}</a>
            </span>
          ))
        )}

        {/* Last = current */}
        <ChevronRight size={11} className="text-neutral-300 shrink-0" />
        <span className="text-xs font-medium text-neutral-900">{last}</span>
      </nav>
    );
  }

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 space-y-5 w-full max-w-lg">
      <div>
        <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-2">Short path (no overflow)</div>
        <Crumbs path={SHORT_PATH} expanded={expandedShort} setExpanded={setExpandedShort} />
      </div>
      <div>
        <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-2">Long path (collapsed → click … to expand)</div>
        <Crumbs path={LONG_PATH} expanded={expandedLong} setExpanded={setExpandedLong} />
      </div>
    </div>
  );
}
