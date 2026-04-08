/**
 * Table Row Selection
 * Category: Tables
 * Tags: table, checkbox, selection, bulk-actions, select-all
 * Description: A table with per-row checkboxes and a select-all header checkbox. When one or more rows are selected, a bulk-action bar slides up from the bottom with action buttons. Indeterminate state on the header when partially selected. Deselect all dismisses the bar.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/table-row-selection.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState, useRef, useEffect } from "react";
import { Trash2, Archive, Tag, X } from "lucide-react";

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

export default function TableRowSelection() {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const headerRef = useRef<HTMLInputElement>(null);

  const allSelected = selected.size === ROWS.length;
  const partiallySelected = selected.size > 0 && !allSelected;

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.indeterminate = partiallySelected;
    }
  }, [partiallySelected]);

  function toggleRow(id: number) {
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(ROWS.map((r) => r.id)));
  }

  function clearAll() { setSelected(new Set()); }

  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full max-w-lg">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
        Row selection with bulk actions
      </div>

      <div className="relative">
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-3 py-2 border-b border-neutral-100 bg-neutral-50">
            <input
              ref={headerRef}
              type="checkbox"
              checked={allSelected}
              onChange={toggleAll}
              className="w-3.5 h-3.5 rounded accent-neutral-700 cursor-pointer"
            />
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wide flex-1">Task</span>
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wide w-20">Status</span>
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wide w-16">Owner</span>
          </div>

          {ROWS.map((row) => (
            <div
              key={row.id}
              onClick={() => toggleRow(row.id)}
              className={`flex items-center gap-3 px-3 py-2.5 border-b border-neutral-100 last:border-0 cursor-pointer transition-colors ${selected.has(row.id) ? "bg-blue-50" : "hover:bg-neutral-50"}`}
            >
              <input
                type="checkbox"
                checked={selected.has(row.id)}
                onChange={() => toggleRow(row.id)}
                onClick={(e) => e.stopPropagation()}
                className="w-3.5 h-3.5 rounded accent-neutral-700 cursor-pointer"
              />
              <span className="flex-1 text-xs text-neutral-800 truncate">{row.name}</span>
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full w-20 text-center ${STATUS_COLORS[row.status]}`}>{row.status}</span>
              <span className="text-xs text-neutral-500 w-16">{row.owner}</span>
            </div>
          ))}
        </div>

        {/* Bulk action bar */}
        {selected.size > 0 && (
          <div className="mt-2 flex items-center gap-2 px-3 py-2.5 bg-neutral-900 text-white rounded-lg shadow-md">
            <span className="text-xs font-medium flex-1">{selected.size} selected</span>
            <button className="flex items-center gap-1 text-[11px] px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-md">
              <Tag size={11} /> Label
            </button>
            <button className="flex items-center gap-1 text-[11px] px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-md">
              <Archive size={11} /> Archive
            </button>
            <button className="flex items-center gap-1 text-[11px] px-2.5 py-1 bg-red-500 hover:bg-red-600 rounded-md font-medium">
              <Trash2 size={11} /> Delete
            </button>
            <button onClick={clearAll} className="p-1 text-white/50 hover:text-white ml-1">
              <X size={13} />
            </button>
          </div>
        )}
      </div>

      <div className="mt-3 text-[11px] text-neutral-400">
        Checkbox header shows indeterminate state when partially selected. Bulk action bar slides up from below the table when any rows are selected.
      </div>
    </div>
  );
}
