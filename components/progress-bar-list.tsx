/**
 * Progress Bar List
 * Category: Data Display
 * Tags: progress, bars, data display, breakdown, metrics
 * Description: Vertical list of labeled progress bars — category breakdown, language distribution, or survey results. Each bar shows label, fill, and percentage.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/progress-bar-list.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function ProgressBarList() {
  const items = [
    { label: "Buttons", pct: 64, color: "#3b82f6" },
    { label: "App Shells", pct: 48, color: "#8b5cf6" },
    { label: "Feedback", pct: 32, color: "#10b981" },
    { label: "Cards", pct: 18, color: "#f59e0b" },
    { label: "Navigation", pct: 12, color: "#ef4444" },
  ];
  return (
    <div className="bg-white border border-neutral-100 rounded-xl p-5 space-y-4 max-w-xs">
      <div className="text-sm font-semibold text-neutral-900">Top categories</div>
      {items.map(item => (
        <div key={item.label}>
          <div className="flex justify-between text-xs text-neutral-600 mb-1.5">
            <span>{item.label}</span>
            <span className="font-medium">{item.pct}%</span>
          </div>
          <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}