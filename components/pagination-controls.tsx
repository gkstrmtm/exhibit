/**
 * Pagination Controls
 * Category: Navigation
 * Tags: pagination, navigation, pages, next, prev
 * Description: Classic prev/next pagination with visible page numbers, ellipsis for skipped ranges, and current-page highlight. No external library.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/pagination-controls.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";
export default function PaginationControls() {
  const [page, setPage] = useState(4);
  const total = 12;
  const pages = [1, 2, "...", 3, 4, 5, "...", 11, 12];
  return (
    <div className="flex items-center gap-1">
      <button onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1.5 text-sm border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50 disabled:opacity-40" disabled={page === 1}>← Prev</button>
      {pages.map((p, i) => (
        typeof p === "string"
          ? <span key={i} className="w-8 text-center text-sm text-neutral-400">…</span>
          : <button key={i} onClick={() => setPage(p)} className={`w-8 h-8 text-sm rounded-lg ${page === p ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-neutral-100"}`}>{p}</button>
      ))}
      <button onClick={() => setPage(p => Math.min(total, p + 1))} className="px-3 py-1.5 text-sm border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50 disabled:opacity-40" disabled={page === total}>Next →</button>
    </div>
  );
}