/**
 * KPI Stats Row
 * Category: Dashboard
 * Tags: KPI, stats, metrics, dashboard, cards
 * Description: Four key metric cards in a horizontal row — value, label, and a percentage delta with directional color coding. Clean neutral background.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/kpi-stats-row.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function KPIStatsRow() {
  const stats = [
    { label: "Total revenue", value: "$48,291", delta: "+12.4%", up: true },
    { label: "Active users", value: "3,842", delta: "+8.1%", up: true },
    { label: "Conversion", value: "3.24%", delta: "-0.3%", up: false },
    { label: "Avg session", value: "4m 12s", delta: "+22s", up: true },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map(s => (
        <div key={s.label} className="bg-white border border-neutral-100 rounded-xl p-4">
          <div className="text-xs text-neutral-500 mb-1.5">{s.label}</div>
          <div className="text-xl font-bold text-neutral-900 mb-1">{s.value}</div>
          <div className={`text-xs font-medium ${s.up ? "text-green-600" : "text-red-500"}`}>{s.delta} vs last month</div>
        </div>
      ))}
    </div>
  );
}