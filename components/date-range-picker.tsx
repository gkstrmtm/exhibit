/**
 * Date Range Picker
 * Category: Inputs
 * Tags: date, range, picker, calendar, from, to
 * Description: A date range picker with two linked date inputs (from / to). Selecting the from date before the to date auto-fixes the flip. A set of quick presets (Last 7 days, Last 30 days, This month, This quarter) instantly populates the range. Demonstrates the date range selection pattern common in analytics and reporting UIs.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/date-range-picker.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";

function toISO(d: Date) { return d.toISOString().slice(0, 10); }

function addDays(d: Date, n: number) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }

const today = new Date();

const PRESETS = [
  { label: "Last 7 days", from: toISO(addDays(today, -6)), to: toISO(today) },
  { label: "Last 30 days", from: toISO(addDays(today, -29)), to: toISO(today) },
  { label: "This month", from: toISO(new Date(today.getFullYear(), today.getMonth(), 1)), to: toISO(today) },
  { label: "Last month", from: toISO(new Date(today.getFullYear(), today.getMonth() - 1, 1)), to: toISO(new Date(today.getFullYear(), today.getMonth(), 0)) },
  { label: "This quarter", from: toISO(new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3, 1)), to: toISO(today) },
  { label: "This year", from: `${today.getFullYear()}-01-01`, to: toISO(today) },
];

function fmtDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function DateRangePicker() {
  const [from, setFrom] = useState(PRESETS[1].from);
  const [to, setTo] = useState(PRESETS[1].to);
  const [active, setActive] = useState("Last 30 days");

  function applyPreset(preset: typeof PRESETS[number]) {
    setFrom(preset.from);
    setTo(preset.to);
    setActive(preset.label);
  }

  function handleFrom(val: string) {
    setFrom(val);
    setActive("");
    if (to && val > to) setTo(val);
  }

  function handleTo(val: string) {
    setTo(val);
    setActive("");
    if (from && val < from) setFrom(val);
  }

  const inputCls = "text-xs border border-neutral-300 rounded-lg px-2.5 py-1.5 outline-none focus:border-neutral-500 transition-colors bg-white";

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-4 w-full max-w-xs space-y-3">
      {/* Presets */}
      <div>
        <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Quick presets</div>
        <div className="flex flex-wrap gap-1">
          {PRESETS.map(p => (
            <button
              key={p.label}
              onClick={() => applyPreset(p)}
              className={`text-[10px] px-2 py-1 rounded-md border transition-colors ${active === p.label ? "bg-neutral-900 text-white border-neutral-900" : "border-neutral-200 text-neutral-600 hover:border-neutral-400"}`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Manual inputs */}
      <div>
        <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Custom range</div>
        <div className="flex items-center gap-2">
          <input type="date" className={inputCls} value={from} onChange={e => handleFrom(e.target.value)} max={to || undefined} />
          <span className="text-neutral-400 text-xs">→</span>
          <input type="date" className={inputCls} value={to} onChange={e => handleTo(e.target.value)} min={from || undefined} />
        </div>
      </div>

      {/* Summary */}
      {from && to && (
        <div className="flex items-center gap-1.5 text-[10px] text-neutral-600 bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2">
          <CalendarDays size={11} className="text-neutral-400 shrink-0" strokeWidth={1.5} />
          <span>{fmtDate(from)} – {fmtDate(to)}</span>
        </div>
      )}
    </div>
  );
}
