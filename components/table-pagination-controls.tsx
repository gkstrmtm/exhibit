/**
 * Table Pagination Controls
 * Category: Tables
 * Tags: table, pagination, page, navigation, rows-per-page
 * Description: A table with full pagination controls: previous/next buttons, page indicator, jump-to-page input, and rows-per-page selector. Page content is sliced from a full dataset. Demonstrates the canonical data-table pagination footer.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/table-pagination-controls.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const ALL_ROWS = Array.from({ length: 47 }, (_, i) => ({
  id: i + 1,
  name: ["Homepage redesign", "API docs", "Mobile QA", "Billing fix", "Brand refresh", "Onboarding", "Dashboard v2", "Admin panel"][i % 8],
  owner: ["Sarah", "James", "Maya", "Leo", "Jordan", "Riley", "Priya", "Sam"][i % 8],
  status: ["Open", "In Review", "Done", "Open", "In Review", "Done", "Open", "Done"][i % 8],
}));

const PAGE_SIZES = [5, 10, 20];

const STATUS_COLORS: Record<string, string> = {
  "In Review": "bg-amber-100 text-amber-700",
  Open: "bg-blue-100 text-blue-700",
  Done: "bg-emerald-100 text-emerald-700",
};

export default function TablePaginationControls() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [jumpVal, setJumpVal] = useState("");

  const totalPages = Math.ceil(ALL_ROWS.length / pageSize);
  const start = (page - 1) * pageSize;
  const slice = ALL_ROWS.slice(start, start + pageSize);

  function go(p: number) { setPage(Math.max(1, Math.min(totalPages, p))); }

  function handleJump(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      const n = parseInt(jumpVal, 10);
      if (!isNaN(n)) go(n);
      setJumpVal("");
    }
  }

  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full max-w-xl">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
        Table pagination
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_auto_auto] text-[10px] font-semibold text-neutral-400 uppercase tracking-wide px-3 py-2 border-b border-neutral-100 bg-neutral-50">
          <span className="w-6 mr-3">#</span>
          <span>Task</span>
          <span className="w-20 text-center">Status</span>
          <span className="w-14 text-right">Owner</span>
        </div>

        {slice.map((row) => (
          <div key={row.id} className="grid grid-cols-[auto_1fr_auto_auto] items-center px-3 py-2.5 border-b border-neutral-100 last:border-0">
            <span className="text-[10px] text-neutral-400 w-6 mr-3">{row.id}</span>
            <span className="text-xs text-neutral-800 truncate">{row.name} #{row.id}</span>
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full w-20 text-center ${STATUS_COLORS[row.status]}`}>{row.status}</span>
            <span className="text-xs text-neutral-500 w-14 text-right">{row.owner}</span>
          </div>
        ))}

        {/* Pagination footer */}
        <div className="flex items-center justify-between gap-3 px-3 py-2.5 border-t border-neutral-100 bg-neutral-50">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-neutral-500">Rows:</span>
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
              className="text-[11px] border border-neutral-200 rounded px-1.5 py-0.5 bg-white text-neutral-700 focus:outline-none"
            >
              {PAGE_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <span className="text-[10px] text-neutral-400 ml-1">
              {start + 1}–{Math.min(start + pageSize, ALL_ROWS.length)} of {ALL_ROWS.length}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button onClick={() => go(1)} disabled={page === 1} className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-30">
              <ChevronsLeft size={13} />
            </button>
            <button onClick={() => go(page - 1)} disabled={page === 1} className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-30">
              <ChevronLeft size={13} />
            </button>
            <span className="text-[11px] text-neutral-600 px-1.5">
              {page} / {totalPages}
            </span>
            <button onClick={() => go(page + 1)} disabled={page === totalPages} className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-30">
              <ChevronRight size={13} />
            </button>
            <button onClick={() => go(totalPages)} disabled={page === totalPages} className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-30">
              <ChevronsRight size={13} />
            </button>
            <input
              value={jumpVal}
              onChange={(e) => setJumpVal(e.target.value)}
              onKeyDown={handleJump}
              placeholder="go to…"
              className="ml-2 w-14 text-[11px] border border-neutral-200 rounded px-2 py-0.5 text-center focus:outline-none focus:ring-1 focus:ring-neutral-400 text-neutral-600 placeholder:text-neutral-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
