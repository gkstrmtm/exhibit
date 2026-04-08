/**
 * Conflicting Sort Controls Anti-Pattern
 * Category: Inputs
 * Tags: anti-pattern, sort, conflict, controls, table, comparison
 * Description: Wrong: a column header sort arrow and a separate sort dropdown are both active simultaneously — they conflict silently. Right: a single sort source (column header click) with a visible direction indicator. Shows the anti-pattern and the clean resolution side by side.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/conflicting-sort-controls.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState } from "react";
import { ArrowUp, ArrowDown, ChevronDown } from "lucide-react";

type SortField = "Name" | "Date" | "Amount";
type Dir = "asc" | "desc";

const ROWS = [
  { name: "Acme Corp", date: "Mar 3", amount: 4200 },
  { name: "Brightline", date: "Mar 8", amount: 1100 },
  { name: "Zeta Systems", date: "Mar 12", amount: 800 },
  { name: "Kova Studio", date: "Mar 14", amount: 3200 },
];

function sortRows(rows: typeof ROWS, field: SortField, dir: Dir) {
  return [...rows].sort((a, b) => {
    let av: string | number, bv: string | number;
    if (field === "Name") { av = a.name; bv = b.name; }
    else if (field === "Date") { av = a.date; bv = b.date; }
    else { av = a.amount; bv = b.amount; }
    if (av < bv) return dir === "asc" ? -1 : 1;
    if (av > bv) return dir === "asc" ? 1 : -1;
    return 0;
  });
}

function WrongPanel() {
  const [colSort, setColSort] = useState<{ field: SortField; dir: Dir }>({ field: "Name", dir: "asc" });
  const [dropSort, setDropSort] = useState<SortField>("Amount");
  const [open, setOpen] = useState(false);

  const sorted = sortRows(ROWS, colSort.field, colSort.dir);

  function toggleCol(field: SortField) {
    setColSort((s) => s.field === field ? { field, dir: s.dir === "asc" ? "desc" : "asc" } : { field, dir: "asc" });
  }

  return (
    <div className="border border-red-200 rounded-lg overflow-hidden bg-white">
      <div className="bg-red-50 px-3 py-1.5 text-[10px] font-semibold text-red-600 uppercase tracking-wide border-b border-red-200">
        ✗ Wrong — two competing sort sources
      </div>

      {/* Sort dropdown — conflicts with col headers */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-neutral-100 bg-neutral-50">
        <span className="text-[10px] text-neutral-500">Sort by:</span>
        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-1 text-[10px] border border-neutral-300 rounded px-2 py-1 bg-white text-neutral-700 hover:bg-neutral-50"
          >
            {dropSort} <ChevronDown size={10} />
          </button>
          {open && (
            <div className="absolute left-0 top-full mt-0.5 bg-white border border-neutral-200 rounded shadow-sm z-10 py-0.5">
              {(["Name", "Date", "Amount"] as SortField[]).map((f) => (
                <button key={f} onClick={() => { setDropSort(f); setOpen(false); }} className="block w-full px-3 py-1 text-[10px] text-left hover:bg-neutral-50">
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>
        <span className="text-[9px] text-red-400 ml-1">← also controls sort, conflicts with headers</span>
      </div>

      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-neutral-100">
            {(["Name", "Date", "Amount"] as SortField[]).map((f) => (
              <th key={f} className="text-left px-3 py-2 text-[10px] font-semibold text-neutral-500">
                <button onClick={() => toggleCol(f)} className="flex items-center gap-0.5 hover:text-neutral-800">
                  {f}
                  {colSort.field === f ? (
                    colSort.dir === "asc" ? <ArrowUp size={9} /> : <ArrowDown size={9} />
                  ) : <span className="w-2" />}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((r) => (
            <tr key={r.name} className="border-b border-neutral-100 last:border-0">
              <td className="px-3 py-2 text-neutral-800">{r.name}</td>
              <td className="px-3 py-2 text-neutral-500">{r.date}</td>
              <td className="px-3 py-2 text-neutral-700 font-medium">${r.amount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-3 py-1 bg-neutral-50 text-[9px] text-red-500">
        Dropdown sorts by {dropSort}, column header sorts by {colSort.field} — which one wins is opaque
      </div>
    </div>
  );
}

function RightPanel() {
  const [sort, setSort] = useState<{ field: SortField; dir: Dir }>({ field: "Name", dir: "asc" });

  const sorted = sortRows(ROWS, sort.field, sort.dir);

  function toggle(field: SortField) {
    setSort((s) => s.field === field ? { field, dir: s.dir === "asc" ? "desc" : "asc" } : { field, dir: "asc" });
  }

  return (
    <div className="border border-emerald-200 rounded-lg overflow-hidden bg-white">
      <div className="bg-emerald-50 px-3 py-1.5 text-[10px] font-semibold text-emerald-700 uppercase tracking-wide border-b border-emerald-200">
        ✓ Right — single sort source
      </div>

      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-neutral-100">
            {(["Name", "Date", "Amount"] as SortField[]).map((f) => (
              <th key={f} className="text-left px-3 py-2 text-[10px] font-semibold text-neutral-500">
                <button onClick={() => toggle(f)} className={`flex items-center gap-0.5 hover:text-neutral-800 ${sort.field === f ? "text-neutral-800" : ""}`}>
                  {f}
                  {sort.field === f
                    ? sort.dir === "asc" ? <ArrowUp size={9} /> : <ArrowDown size={9} />
                    : <span className="w-2" />}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((r) => (
            <tr key={r.name} className="border-b border-neutral-100 last:border-0">
              <td className="px-3 py-2 text-neutral-800">{r.name}</td>
              <td className="px-3 py-2 text-neutral-500">{r.date}</td>
              <td className="px-3 py-2 text-neutral-700 font-medium">${r.amount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-3 py-1.5 border-t border-neutral-100 bg-neutral-50 text-[9px] text-emerald-600">
        Click any column header — one sort, visible direction arrow, no external control to conflict
      </div>
    </div>
  );
}

export default function ConflictingSortControls() {
  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-4">
        Conflicting sort controls — anti-pattern
      </div>
      <div className="grid grid-cols-2 gap-3">
        <WrongPanel />
        <RightPanel />
      </div>
      <div className="mt-4 text-[11px] text-neutral-400">
        Rule: Never provide two UI controls that can independently set the same sort state. If column headers are sortable, remove the sort dropdown. If a dropdown is needed (too many columns), remove arrow indicators from headers.
      </div>
    </div>
  );
}
