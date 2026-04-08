/**
 * Segmented Mode Switcher
 * Category: Inputs
 * Tags: segmented, toggle, filter, tabs, mode-switch, controls, high-frequency
 * Description: Segmented control for high-frequency mode switching between 2–4 options. The active state is immediately visible at a glance — no dropdown required. State persists and the content area responds instantly. Use segmented when switching happens more than once per session and all options should stay visible.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/segmented-mode-switcher.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState } from "react";
import { LayoutList, LayoutGrid, TableIcon } from "lucide-react";

type ViewMode = "list" | "grid" | "table";
type GroupMode = "all" | "mine" | "team";
type StatusFilter = "open" | "in-review" | "done";

function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  icons,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  icons?: Record<T, React.ReactNode>;
}) {
  return (
    <div className="inline-flex gap-0.5 bg-neutral-100 p-0.5 rounded-lg">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all select-none ${
            value === opt.value
              ? "bg-white text-neutral-900 shadow-sm"
              : "text-neutral-500 hover:text-neutral-700"
          }`}
        >
          {icons?.[opt.value] && <span className="shrink-0">{icons[opt.value]}</span>}
          {opt.label}
        </button>
      ))}
    </div>
  );
}

const VIEW_ICONS: Record<ViewMode, React.ReactNode> = {
  list: <LayoutList size={13} strokeWidth={2} />,
  grid: <LayoutGrid size={13} strokeWidth={2} />,
  table: <TableIcon size={13} strokeWidth={2} />,
};

const MOCK_ITEMS = ["Invoice #1041", "Invoice #1039", "Invoice #1038", "Invoice #1036", "Invoice #1034"];

export default function SegmentedModeSwitcher() {
  const [view, setView] = useState<ViewMode>("list");
  const [group, setGroup] = useState<GroupMode>("all");
  const [status, setStatus] = useState<StatusFilter>("open");

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-6 w-full max-w-lg flex flex-col gap-6">

      {/* Example 1: View mode with icons */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wide">View mode</span>
        <SegmentedControl<ViewMode>
          options={[
            { value: "list", label: "List" },
            { value: "grid", label: "Grid" },
            { value: "table", label: "Table" },
          ]}
          value={view}
          onChange={setView}
          icons={VIEW_ICONS}
        />
        <div className="mt-1 text-xs text-neutral-500">
          {view === "list" && "Showing rows with full metadata"}
          {view === "grid" && "Showing card grid, 3 columns"}
          {view === "table" && "Showing dense table with sort and filter"}
        </div>
      </div>

      {/* Example 2: Ownership group */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wide">Assignment scope</span>
        <SegmentedControl<GroupMode>
          options={[
            { value: "all", label: "All" },
            { value: "mine", label: "Mine" },
            { value: "team", label: "Team" },
          ]}
          value={group}
          onChange={setGroup}
        />
        <div className="mt-1">
          {MOCK_ITEMS.slice(0, group === "all" ? 5 : group === "mine" ? 2 : 3).map((item) => (
            <div key={item} className="text-xs text-neutral-700 py-1 border-b border-neutral-100 last:border-0">
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Example 3: Status filter — 4 options max */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wide">Status filter</span>
        <SegmentedControl<StatusFilter>
          options={[
            { value: "open", label: "Open" },
            { value: "in-review", label: "In review" },
            { value: "done", label: "Done" },
          ]}
          value={status}
          onChange={setStatus}
        />
        <div className="text-xs text-neutral-500 mt-1">
          Showing {status === "open" ? "14" : status === "in-review" ? "6" : "38"} items
        </div>
      </div>

      <div className="text-[11px] text-neutral-400 border-t border-neutral-100 pt-3">
        Use segmented when: ≤4 options, all options should stay visible, mode is switched frequently. Prefer over dropdown for mode, scope, and view-type controls.
      </div>
    </div>
  );
}
