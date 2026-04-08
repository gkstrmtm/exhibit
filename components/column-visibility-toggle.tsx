/**
 * Column Visibility Toggle
 * Category: Tables
 * Tags: table, column, visibility, toggle, popover, customize
 * Description: A table with a "Columns" button that opens a popover checklist. The user can show or hide any column. Active columns are ticked. Changes apply immediately, preserving row data. Demonstrates the "customize column visibility" pattern for dense tables.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/column-visibility-toggle.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState, useRef, useEffect } from "react";
import { Columns, Check } from "lucide-react";

interface ColDef { key: string; label: string; }

const ALL_COLS: ColDef[] = [
  { key: "name", label: "Name" },
  { key: "status", label: "Status" },
  { key: "owner", label: "Owner" },
  { key: "due", label: "Due date" },
  { key: "priority", label: "Priority" },
  { key: "amount", label: "Amount" },
];

const ROWS = [
  { name: "Homepage redesign", status: "In Review", owner: "Sarah", due: "Mar 28", priority: "High", amount: "$4,200" },
  { name: "API docs update", status: "Open", owner: "James", due: "Apr 2", priority: "Medium", amount: "$1,100" },
  { name: "Mobile QA", status: "Done", owner: "Maya", due: "Mar 14", priority: "Low", amount: "$800" },
];

const STATUS_COLORS: Record<string, string> = {
  "In Review": "bg-amber-100 text-amber-700",
  "Open": "bg-blue-100 text-blue-700",
  "Done": "bg-emerald-100 text-emerald-700",
};

export default function ColumnVisibilityToggle() {
  const [visible, setVisible] = useState<Set<string>>(new Set(["name", "status", "owner", "due"]));
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  function toggle(key: string) {
    setVisible((s) => {
      const next = new Set(s);
      if (next.has(key)) { if (next.size > 1) next.delete(key); }
      else next.add(key);
      return next;
    });
  }

  const cols = ALL_COLS.filter((c) => visible.has(c.key));

  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full max-w-xl">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Column visibility</div>
        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 border border-neutral-300 rounded-lg bg-white hover:bg-neutral-50 text-neutral-700"
          >
            <Columns size={12} /> Columns ({visible.size})
          </button>
          {open && (
            <div className="absolute right-0 mt-1 bg-white border border-neutral-200 rounded-xl shadow-md z-20 py-1.5 w-40">
              {ALL_COLS.map((c) => (
                <button
                  key={c.key}
                  onClick={() => toggle(c.key)}
                  className="flex items-center justify-between w-full px-3 py-1.5 text-xs text-neutral-700 hover:bg-neutral-50"
                >
                  {c.label}
                  {visible.has(c.key) && <Check size={11} className="text-neutral-500" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
        <div className={`grid text-[10px] font-semibold text-neutral-400 uppercase tracking-wide px-3 py-2 border-b border-neutral-100`}
          style={{ gridTemplateColumns: `repeat(${cols.length}, 1fr)` }}>
          {cols.map((c) => <span key={c.key}>{c.label}</span>)}
        </div>
        {ROWS.map((row) => (
          <div key={row.name} className="px-3 py-2.5 border-b border-neutral-100 last:border-0"
            style={{ display: "grid", gridTemplateColumns: `repeat(${cols.length}, 1fr)`, gap: "4px" }}>
            {cols.map((c) => {
              const val = row[c.key as keyof typeof row];
              if (c.key === "status") return (
                <span key={c.key} className={`inline-flex items-center text-[10px] font-medium px-1.5 py-0.5 rounded-full w-fit ${STATUS_COLORS[val]}`}>{val}</span>
              );
              return <span key={c.key} className="text-xs text-neutral-700 truncate">{val}</span>;
            })}
          </div>
        ))}
      </div>
      <div className="mt-3 text-[11px] text-neutral-400">
        Minimum one column always active — the toggle silently blocks hiding the last visible column.
      </div>
    </div>
  );
}
