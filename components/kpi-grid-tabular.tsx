/**
 * KPI Grid with Tabular Numbers
 * Category: Data Density
 * Tags: kpi, metrics, dashboard, tabular-nums, data-density
 * Description: Dense 2×3 KPI grid with tabular-nums alignment, trend indicators, and inline bar chart sparklines for at-a-glance metric comparison.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/kpi-grid-tabular.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function KpiGridTabular() {
  const metrics = [
    { label: "MRR", value: "$142.8k", trend: "+8.3%", up: true, bar: 83 },
    { label: "Churn", value: "2.1%", trend: "-0.4%", up: false, bar: 21 },
    { label: "NPS", value: "72", trend: "+5", up: true, bar: 72 },
    { label: "ARPU", value: "$48", trend: "+12%", up: true, bar: 60 },
    { label: "LTV", value: "$1,240", trend: "+3.2%", up: true, bar: 74 },
    { label: "CAC", value: "$89", trend: "-8.1%", up: false, bar: 35 },
  ];

  return (
    <div className="p-8 bg-neutral-50 min-h-[300px]">
      <div className="grid grid-cols-3 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white rounded-lg border border-neutral-200 p-5 flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">{m.label}</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight" style={{ fontVariantNumeric: "tabular-nums" }}>{m.value}</span>
              <span className={`text-xs font-semibold ${m.up ? "text-emerald-600" : "text-rose-500"}`}>
                {m.up ? "↑" : "↓"} {m.trend}
              </span>
            </div>
            <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${m.up ? "bg-emerald-500" : "bg-rose-400"}`} style={{ width: `${m.bar}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}