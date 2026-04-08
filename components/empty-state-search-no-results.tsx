/**
 * Empty State Search No Results
 * Category: Empty States
 * Tags: empty-state, search, no results, clear, query
 * Description: An empty state displayed when a search returns zero results. Shows the search icon, a message referencing the query, suggestions for adjusting the search, and a clear-search action. Demonstrates the no-results empty state pattern with helpful guidance rather than a bare "no results" message.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/empty-state-search-no-results.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { Search, SearchX } from "lucide-react";

const SUGGESTIONS = [
  "Check for typos in your search",
  "Try shorter or more general keywords",
  "Remove filters before searching",
];

export default function EmptyStateSearchNoResults() {
  const [query, setQuery] = useState("transpnt billing invoces");
  const [input, setInput] = useState("transpnt billing invoces");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setQuery(input);
  }

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 w-full max-w-xs space-y-4">
      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search size={12} className="absolute left-2.5 top-2.5 text-neutral-400" strokeWidth={1.5} />
          <input
            className="w-full text-xs pl-7 pr-3 py-2 border border-neutral-300 rounded-lg outline-none focus:border-neutral-500 bg-white"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Search…"
          />
        </div>
        <button type="submit" className="text-xs font-medium bg-neutral-900 text-white rounded-lg px-3 hover:bg-neutral-700 transition-colors">Go</button>
      </form>

      {/* Empty state */}
      <div className="flex flex-col items-center text-center py-4 space-y-2">
        <SearchX size={32} className="text-neutral-300" strokeWidth={1} />
        <div className="text-sm font-semibold text-neutral-700">No results for "{query}"</div>
        <div className="text-xs text-neutral-500 leading-relaxed">
          We couldn't find anything matching your search.
        </div>

        <ul className="text-left space-y-1 w-full mt-1">
          {SUGGESTIONS.map(s => (
            <li key={s} className="flex items-start gap-1.5 text-[11px] text-neutral-500">
              <span className="text-neutral-300 mt-0.5">·</span>{s}
            </li>
          ))}
        </ul>

        <button
          onClick={() => { setQuery(""); setInput(""); }}
          className="text-xs text-blue-600 hover:underline mt-1"
        >
          Clear search
        </button>
      </div>
    </div>
  );
}
