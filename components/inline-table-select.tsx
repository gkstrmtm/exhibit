/**
 * Inline Table Select
 * Category: Inputs
 * Tags: select, dropdown, custom, table, inline, status, row, cell, unstyled-replacement
 * Description: A compact inline custom select rendered directly inside a table cell. Replaces the native <select> that would otherwise appear mid-row. Option list opens below the trigger, stays inside the table boundary, and closes on outside click or selection. Demonstrates the correct treatment for per-row field editing in data tables.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/inline-table-select.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

type Option = { value: string; label: string; color: string };

const STATUS_OPTIONS: Option[] = [
  { value: "active", label: "Active", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { value: "review", label: "Review needed", color: "text-rose-700 bg-rose-50 border-rose-200" },
  { value: "pending", label: "Pending", color: "text-amber-700 bg-amber-50 border-amber-200" },
  { value: "held", label: "Held", color: "text-neutral-600 bg-neutral-100 border-neutral-200" },
];

function InlineSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = STATUS_OPTIONS.find((o) => o.value === value)!;

  useEffect(() => {
    function outside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors ${active.color} hover:opacity-80`}
      >
        {active.label}
        <ChevronDown
          size={10}
          strokeWidth={2.5}
          className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 z-50 mt-1 min-w-[152px] overflow-hidden rounded-lg border border-neutral-200 bg-white py-1 shadow-lg shadow-neutral-200/60"
        >
          {STATUS_OPTIONS.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`flex cursor-pointer items-center justify-between px-3 py-1.5 text-xs transition-colors ${
                opt.value === value ? "bg-neutral-50" : "hover:bg-neutral-50"
              }`}
            >
              <span className={`rounded-full px-2 py-0.5 border font-medium ${opt.color}`}>
                {opt.label}
              </span>
              {opt.value === value && (
                <Check size={10} strokeWidth={2.5} className="ml-2 text-neutral-500 shrink-0" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const INITIAL_ROWS = [
  { id: 1, name: "Southeast territory review", owner: "D. Okafor", status: "review" },
  { id: 2, name: "Q2 compliance batch", owner: "M. Solis", status: "pending" },
  { id: 3, name: "Northeast onboarding run", owner: "R. Tran", status: "active" },
  { id: 4, name: "West coast audit — May", owner: "A. Patel", status: "held" },
];

export default function InlineTableSelect() {
  const [rows, setRows] = useState(INITIAL_ROWS);

  function setStatus(id: number, status: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  return (
    <div className="min-h-[240px] bg-neutral-50 p-6">
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100 bg-neutral-50">
              {["Record", "Owner", "Status"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-neutral-400"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.id}
                className={`transition-colors hover:bg-neutral-50 ${i < rows.length - 1 ? "border-b border-neutral-100" : ""}`}
              >
                <td className="px-4 py-3 font-medium text-neutral-900">{row.name}</td>
                <td className="px-4 py-3 text-neutral-500">{row.owner}</td>
                <td className="px-4 py-3">
                  <InlineSelect value={row.status} onChange={(v) => setStatus(row.id, v)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
