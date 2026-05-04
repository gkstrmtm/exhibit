/**
 * Select Field Group
 * Category: Inputs
 * Tags: select, dropdown, custom, filter, form, multi-field, group, status, region, priority
 * Description: A filter or form bar with multiple styled custom selects working together. Demonstrates consistent select treatment across a full row of fields — region, status, assignee, and sort order — without a single native browser dropdown.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/select-field-group.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, SlidersHorizontal } from "lucide-react";

type Option = { value: string; label: string };

function FieldSelect({
  label,
  options,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
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

  return (
    <div ref={ref} className="relative flex-1 min-w-0">
      <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
        {label}
      </div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-1.5 rounded-lg border bg-white px-2.5 py-2 text-left text-sm transition-colors ${
          open
            ? "border-neutral-400 ring-2 ring-neutral-100"
            : "border-neutral-200 hover:border-neutral-400"
        }`}
      >
        <span className={active ? "text-neutral-900" : "text-neutral-400"}>
          {active?.label ?? placeholder ?? "All"}
        </span>
        <ChevronDown
          size={12}
          strokeWidth={2}
          className={`shrink-0 text-neutral-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 z-50 mt-1 min-w-[160px] overflow-hidden rounded-lg border border-neutral-200 bg-white py-1 shadow-lg shadow-neutral-200/60"
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
              {opt.label}
              {opt.value === value && (
                <Check size={11} strokeWidth={2.5} className="ml-3 text-neutral-600 shrink-0" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const REGION_OPTIONS: Option[] = [
  { value: "all", label: "All regions" },
  { value: "northeast", label: "Northeast" },
  { value: "southeast", label: "Southeast" },
  { value: "midwest", label: "Midwest" },
  { value: "west", label: "West" },
];

const STATUS_OPTIONS: Option[] = [
  { value: "all", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "review", label: "Review needed" },
  { value: "held", label: "Held" },
];

const ASSIGNEE_OPTIONS: Option[] = [
  { value: "all", label: "Anyone" },
  { value: "me", label: "Assigned to me" },
  { value: "unassigned", label: "Unassigned" },
  { value: "team", label: "My team" },
];

const SORT_OPTIONS: Option[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "alpha", label: "A → Z" },
  { value: "priority", label: "Priority" },
];

export default function SelectFieldGroup() {
  const [region, setRegion] = useState("all");
  const [status, setStatus] = useState("review");
  const [assignee, setAssignee] = useState("me");
  const [sort, setSort] = useState("newest");

  const activeCount = [region !== "all", status !== "all", assignee !== "all"].filter(Boolean).length;

  return (
    <div className="flex min-h-[180px] flex-col justify-center bg-neutral-50 p-6">
      <div className="w-full max-w-2xl space-y-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-neutral-500">
            <SlidersHorizontal size={12} strokeWidth={2} />
            Filters
          </div>
          {activeCount > 0 && (
            <button
              onClick={() => { setRegion("all"); setStatus("all"); setAssignee("all"); }}
              className="text-[11px] text-neutral-400 hover:text-neutral-700 transition-colors"
            >
              Clear {activeCount} filter{activeCount > 1 ? "s" : ""}
            </button>
          )}
        </div>

        <div className="flex gap-3 flex-wrap">
          <FieldSelect label="Region" options={REGION_OPTIONS} value={region} onChange={setRegion} />
          <FieldSelect label="Status" options={STATUS_OPTIONS} value={status} onChange={setStatus} />
          <FieldSelect label="Assignee" options={ASSIGNEE_OPTIONS} value={assignee} onChange={setAssignee} />
          <FieldSelect label="Sort" options={SORT_OPTIONS} value={sort} onChange={setSort} />
        </div>
      </div>
    </div>
  );
}
