/**
 * Table Empty Search State
 * Category: Tables
 * Tags: table, empty-state, search, filter, no-results, zero-state
 * Description: A table with a search input. When the search query returns no rows, a structured empty state replaces the body: an icon, explaining message, and a clear-search action. When the table has data but filters produce zero results, the empty state differs from a truly empty first-run state.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/table-empty-search-state.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState } from "react";
import { Search, X, SearchX } from "lucide-react";

const ROWS = [
  { id: 1, name: "Homepage redesign", status: "In Review", owner: "Sarah" },
  { id: 2, name: "API docs update", status: "Open", owner: "James" },
  { id: 3, name: "Mobile QA sprint", status: "Done", owner: "Maya" },
  { id: 4, name: "Billing modal fix", status: "Open", owner: "Leo" },
  { id: 5, name: "Brand photography", status: "In Review", owner: "Jordan" },
];

const STATUS_COLORS: Record<string, string> = {
  "In Review": "bg-amber-100 text-amber-700",
  Open: "bg-blue-100 text-blue-700",
  Done: "bg-emerald-100 text-emerald-700",
};

export default function TableEmptySearchState() {
  const [query, setQuery] = useState("");

  const filtered = ROWS.filter(
    (r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.owner.toLowerCase().includes(query.toLowerCase()) ||
      r.status.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full max-w-lg">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
        Table empty search state
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
        {/* Search bar */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-neutral-100">
          <Search size={13} className="text-neutral-400 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tasks, owners, status…"
            className="flex-1 text-xs text-neutral-800 focus:outline-none placeholder:text-neutral-400 bg-transparent"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-neutral-400 hover:text-neutral-600">
              <X size={13} />
            </button>
          )}
        </div>

        {/* Col headers */}
        <div className="grid grid-cols-[1fr_auto_auto] text-[10px] font-semibold text-neutral-400 uppercase tracking-wide px-3 py-2 border-b border-neutral-100 bg-neutral-50">
          <span>Task</span>
          <span className="w-20 text-center">Status</span>
          <span className="w-14 text-right">Owner</span>
        </div>

        {/* Body */}
        {filtered.length > 0 ? (
          <div>
            {filtered.map((row) => (
              <div key={row.id} className="grid grid-cols-[1fr_auto_auto] items-center px-3 py-2.5 border-b border-neutral-100 last:border-0">
                <span className="text-xs text-neutral-800 truncate">{row.name}</span>
                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full w-20 text-center ${STATUS_COLORS[row.status]}`}>{row.status}</span>
                <span className="text-xs text-neutral-500 w-14 text-right">{row.owner}</span>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <div className="h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center">
              <SearchX size={18} className="text-neutral-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-neutral-700">No results for "{query}"</p>
              <p className="text-xs text-neutral-400 mt-1">Try different keywords or remove filters</p>
            </div>
            <button
              onClick={() => setQuery("")}
              className="text-xs text-neutral-500 underline hover:text-neutral-800"
            >
              Clear search
            </button>
          </div>
        )}

        <div className="px-3 py-1.5 border-t border-neutral-100 bg-neutral-50 text-[10px] text-neutral-400">
          {filtered.length > 0 ? `${filtered.length} of ${ROWS.length} tasks` : `0 results — data exists but filter returns nothing`}
        </div>
      </div>
    </div>
  );
}
