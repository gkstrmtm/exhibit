/**
 * Progress Bar Labeled
 * Category: Data Display
 * Tags: progress, bar, label, percentage, budget, capacity, visual
 * Description: A set of labeled horizontal progress bars used to show budget usage, storage capacity, or task completion. Each bar has a title, a percentage value, a fill with conditional color (green/amber/red based on threshold), and an optional sub-label showing absolute values.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/progress-bar-labeled.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

interface ProgressItem {
  label: string;
  value: number;
  max: number;
  unit?: string;
}

const ITEMS: ProgressItem[] = [
  { label: "Engineering budget", value: 68400, max: 80000, unit: "$" },
  { label: "Storage used", value: 47.2, max: 50, unit: "GB" },
  { label: "API calls this month", value: 312000, max: 500000 },
  { label: "Team seats", value: 8, max: 10 },
  { label: "Active integrations", value: 3, max: 12 },
];

function formatValue(v: number, unit?: string) {
  if (!unit) {
    if (v >= 1000000) return (v / 1000000).toFixed(1) + "M";
    if (v >= 1000) return (v / 1000).toFixed(0) + "k";
    return String(v);
  }
  if (unit === "$") {
    if (v >= 1000) return "$" + (v / 1000).toFixed(0) + "k";
    return "$" + v;
  }
  return v.toFixed(v % 1 !== 0 ? 1 : 0) + " " + unit;
}

function barColor(pct: number) {
  if (pct >= 0.9) return "bg-red-500";
  if (pct >= 0.75) return "bg-amber-400";
  return "bg-neutral-700";
}

function textColor(pct: number) {
  if (pct >= 0.9) return "text-red-600";
  if (pct >= 0.75) return "text-amber-600";
  return "text-neutral-700";
}

export default function ProgressBarLabeled() {
  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full max-w-sm">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-4">
        Usage &amp; budget
      </div>

      <div className="space-y-4">
        {ITEMS.map((item) => {
          const pct = item.value / item.max;
          return (
            <div key={item.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-neutral-700">{item.label}</span>
                <span className={`text-xs font-semibold tabular-nums ${textColor(pct)}`}>
                  {Math.round(pct * 100)}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-neutral-200 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${barColor(pct)}`}
                  style={{ width: `${Math.min(pct * 100, 100)}%` }}
                />
              </div>
              <div className="flex justify-between mt-0.5">
                <span className="text-[9px] text-neutral-400">
                  {formatValue(item.value, item.unit)}
                </span>
                <span className="text-[9px] text-neutral-400">
                  {formatValue(item.max, item.unit)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-[11px] text-neutral-400">
        Color thresholds: neutral-700 below 75%, amber at 75–90%, red above 90%.
      </div>
    </div>
  );
}
