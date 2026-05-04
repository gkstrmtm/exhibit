/**
 * Custom Select Single
 * Category: Inputs
 * Tags: select, dropdown, custom, status, field, form, pick, single-value, unstyled-replacement
 * Description: A fully styled single-value select that replaces the native <select> element. Trigger button with label and chevron, floating option list with checkmark on active item, outside-click close. Never renders a raw browser dropdown.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/custom-select-single.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending", dot: "bg-amber-400" },
  { value: "review_needed", label: "Review needed", dot: "bg-rose-500" },
  { value: "clear", label: "Clear", dot: "bg-emerald-500" },
  { value: "held", label: "Held", dot: "bg-neutral-400" },
];

function CustomSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string; dot?: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = options.find((o) => o.value === value);

  useEffect(() => {
    function outside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, []);

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Escape") setOpen(false);
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen((o) => !o); }
  }

  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-neutral-500">
        {label}
      </label>
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          onKeyDown={handleKey}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={`flex w-full items-center justify-between gap-2 rounded-lg border bg-white px-3 py-2 text-left text-sm text-neutral-900 transition-colors ${
            open
              ? "border-neutral-400 ring-2 ring-neutral-100"
              : "border-neutral-300 hover:border-neutral-400"
          }`}
        >
          <span className="flex items-center gap-2">
            {active?.dot && (
              <span className={`h-2 w-2 rounded-full shrink-0 ${active.dot}`} />
            )}
            <span>{active?.label ?? "Select…"}</span>
          </span>
          <ChevronDown
            size={14}
            strokeWidth={2}
            className={`shrink-0 text-neutral-400 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <ul
            role="listbox"
            className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-neutral-200 bg-white py-1 shadow-lg shadow-neutral-200/60"
          >
            {options.map((opt) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={opt.value === value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`flex cursor-pointer items-center justify-between px-3 py-2 text-sm transition-colors ${
                  opt.value === value
                    ? "bg-neutral-50 text-neutral-900"
                    : "text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                <span className="flex items-center gap-2">
                  {opt.dot && <span className={`h-2 w-2 rounded-full shrink-0 ${opt.dot}`} />}
                  {opt.label}
                </span>
                {opt.value === value && (
                  <Check size={12} strokeWidth={2.5} className="text-neutral-700" />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function CustomSelectSingle() {
  const [status, setStatus] = useState("review_needed");
  const [priority, setPriority] = useState("high");

  const PRIORITY_OPTIONS = [
    { value: "critical", label: "Critical", dot: "bg-red-500" },
    { value: "high", label: "High", dot: "bg-orange-400" },
    { value: "medium", label: "Medium", dot: "bg-yellow-400" },
    { value: "low", label: "Low", dot: "bg-neutral-300" },
  ];

  return (
    <div className="flex min-h-[260px] items-start justify-center bg-neutral-50 p-8">
      <div className="w-full max-w-xs space-y-5 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div>
          <div className="text-sm font-semibold text-neutral-900">Record settings</div>
          <div className="mt-0.5 text-[11px] text-neutral-400">Styled dropdowns — no raw native select.</div>
        </div>
        <CustomSelect
          label="Compliance status"
          options={STATUS_OPTIONS}
          value={status}
          onChange={setStatus}
        />
        <CustomSelect
          label="Priority"
          options={PRIORITY_OPTIONS}
          value={priority}
          onChange={setPriority}
        />
        <button className="w-full rounded-lg bg-neutral-900 py-2 text-xs font-semibold text-white hover:bg-neutral-700 transition-colors">
          Save
        </button>
      </div>
    </div>
  );
}
