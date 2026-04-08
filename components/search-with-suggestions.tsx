/**
 * Search with Suggestions
 * Category: Inputs
 * Tags: search, suggestions, autocomplete, live, results
 * Description: A search input that shows live suggestions as the user types. Suggestions are categorized (Pages, People, Recent) and filtered from a dataset. Arrow keys navigate the list, Enter selects, and Escape closes. Selected item is shown in a result banner. Demonstrates the live suggestions / typeahead search pattern.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/search-with-suggestions.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState, useRef } from "react";
import { Search, FileText, User, Clock } from "lucide-react";

type SugType = "page" | "person" | "recent";

interface Suggestion { id: number; type: SugType; label: string; sublabel?: string; }

const ALL: Suggestion[] = [
  { id: 1, type: "page", label: "Dashboard", sublabel: "/dashboard" },
  { id: 2, type: "page", label: "Analytics Overview", sublabel: "/analytics" },
  { id: 3, type: "page", label: "Billing Settings", sublabel: "/settings/billing" },
  { id: 4, type: "person", label: "Alice Martin", sublabel: "alice@company.com" },
  { id: 5, type: "person", label: "Bob Chen", sublabel: "bob@company.com" },
  { id: 6, type: "person", label: "Carol Smith", sublabel: "carol@company.com" },
  { id: 7, type: "recent", label: "Q4 Report", sublabel: "Viewed 2 hours ago" },
  { id: 8, type: "recent", label: "Homepage redesign", sublabel: "Viewed yesterday" },
  { id: 9, type: "recent", label: "API integration guide", sublabel: "Viewed 3 days ago" },
];

const TYPE_ICON: Record<SugType, React.ElementType> = { page: FileText, person: User, recent: Clock };
const TYPE_GROUP: Record<SugType, string> = { page: "Pages", person: "People", recent: "Recent" };

export default function SearchWithSuggestions() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(-1);
  const [selected, setSelected] = useState<Suggestion | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.length > 0
    ? ALL.filter(s => s.label.toLowerCase().includes(query.toLowerCase()))
    : ALL.slice(0, 6);

  const groups = Array.from(new Set(filtered.map(s => s.type)));

  function select(s: Suggestion) {
    setSelected(s);
    setQuery(s.label);
    setOpen(false);
    setCursor(-1);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (!open) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setCursor(c => Math.min(c + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setCursor(c => Math.max(c - 1, -1)); }
    if (e.key === "Enter" && cursor >= 0) select(filtered[cursor]);
    if (e.key === "Escape") setOpen(false);
  }

  let flatIdx = 0;

  return (
    <div className="relative bg-neutral-50 border border-neutral-200 rounded-xl p-4 w-full max-w-xs">
      {/* Input */}
      <div className="relative">
        <Search size={12} className="absolute left-2.5 top-2.5 text-neutral-400" strokeWidth={1.5} />
        <input
          ref={inputRef}
          className="w-full text-xs pl-7 pr-3 py-2 border border-neutral-300 rounded-lg outline-none focus:border-neutral-500 bg-white transition-colors"
          placeholder="Search…"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); setCursor(-1); setSelected(null); }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKey}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <>
          <div className="fixed inset-0" onClick={() => setOpen(false)} />
          <div className="absolute left-4 right-4 top-14 z-20 bg-white border border-neutral-200 rounded-xl shadow-lg overflow-hidden">
            {filtered.length === 0 ? (
              <div className="px-3 py-4 text-xs text-neutral-400 text-center">No results for "{query}"</div>
            ) : (
              groups.map(group => (
                <div key={group}>
                  <div className="px-3 py-1 text-[9px] font-bold text-neutral-400 uppercase tracking-widest bg-neutral-50 border-b border-neutral-100">
                    {TYPE_GROUP[group]}
                  </div>
                  {filtered.filter(s => s.type === group).map(s => {
                    const Icon = TYPE_ICON[s.type];
                    const idx = flatIdx++;
                    return (
                      <button
                        key={s.id}
                        onClick={() => select(s)}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-left transition-colors ${cursor === idx ? "bg-neutral-100" : "hover:bg-neutral-50"}`}
                      >
                        <Icon size={12} className="text-neutral-400 shrink-0" strokeWidth={1.5} />
                        <div className="min-w-0">
                          <div className="text-xs text-neutral-800">{s.label}</div>
                          {s.sublabel && <div className="text-[9px] text-neutral-400 truncate">{s.sublabel}</div>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* Result */}
      {selected && !open && (
        <div className="mt-2 text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-2 py-1">
          Selected: <span className="font-medium">{selected.label}</span>
        </div>
      )}
    </div>
  );
}
