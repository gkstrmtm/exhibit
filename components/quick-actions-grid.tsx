/**
 * Quick Actions Grid
 * Category: Dashboard
 * Tags: quick actions, shortcuts, grid, dashboard, actions
 * Description: 2×3 grid of shortcut action buttons — icon, label, and subtle background. Used in dashboards and home screens for top-of-mind tasks.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/quick-actions-grid.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function QuickActionsGrid() {
  const actions = [
    { icon: "✦", label: "New exhibit", color: "#f0f9ff", accent: "#0284c7" },
    { icon: "⬡", label: "Collection", color: "#fdf4ff", accent: "#a21caf" },
    { icon: "⎘", label: "Duplicate", color: "#f0fdf4", accent: "#15803d" },
    { icon: "↑", label: "Publish", color: "#fff7ed", accent: "#c2410c" },
    { icon: "★", label: "Saved", color: "#fefce8", accent: "#a16207" },
    { icon: "⚙", label: "Settings", color: "#fafafa", accent: "#525252" },
  ];
  return (
    <div className="grid grid-cols-3 gap-3 p-4 bg-white border border-neutral-100 rounded-xl max-w-xs">
      {actions.map(a => (
        <button key={a.label} className="flex flex-col items-center gap-2 p-3.5 rounded-xl hover:scale-[1.02] transition-transform" style={{ background: a.color }}>
          <span className="text-xl" style={{ color: a.accent }}>{a.icon}</span>
          <span className="text-xs font-medium" style={{ color: a.accent }}>{a.label}</span>
        </button>
      ))}
    </div>
  );
}