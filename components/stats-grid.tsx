/**
 * Stats Grid
 * Category: Data Display
 * Tags: stats, grid, metrics, data display, cards
 * Description: 2×2 grid of stat cards — each with icon, value, and label. Clean neutral palette, icon accent color per metric. Good for overview dashboards.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/stats-grid.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function StatsGrid() {
  const stats = [
    { icon: "⬡", label: "Exhibits", value: "284", color: "#6366f1" },
    { icon: "★", label: "Total saves", value: "12.4k", color: "#f59e0b" },
    { icon: "↺", label: "Remixes", value: "831", color: "#10b981" },
    { icon: "👥", label: "Creators", value: "1,209", color: "#3b82f6" },
  ];
  return (
    <div className="grid grid-cols-2 gap-4 max-w-xs">
      {stats.map(s => (
        <div key={s.label} className="bg-white border border-neutral-100 rounded-xl p-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base mb-3" style={{ background: s.color + "15", color: s.color }}>{s.icon}</div>
          <div className="text-lg font-bold text-neutral-900">{s.value}</div>
          <div className="text-xs text-neutral-400 mt-0.5">{s.label}</div>
        </div>
      ))}
    </div>
  );
}