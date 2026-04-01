/**
 * Stat Cards with Trends
 * Category: Dashboard
 * Tags: stats, cards, dashboard, metrics, sparkline, trends
 * Description: Four stat cards displaying key metrics with percentage change indicators and inline CSS sparkline charts. Perfect for dashboard overview sections.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/stat-cards-with-trends.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function StatCardsWithTrends() {
  const stats = [
    { label: "Revenue", value: "$48.2k", change: "+12.5%", up: true, bars: [40, 55, 35, 60, 45, 70, 65, 80] },
    { label: "Users", value: "2,847", change: "+8.1%", up: true, bars: [30, 45, 50, 40, 60, 55, 70, 75] },
    { label: "Bounce Rate", value: "24.3%", change: "-3.2%", up: false, bars: [70, 60, 65, 50, 55, 40, 45, 35] },
    { label: "Avg Session", value: "4m 32s", change: "+1.2%", up: true, bars: [35, 40, 50, 45, 55, 60, 58, 65] },
  ];

  return (
    <div className="p-6 bg-neutral-50 min-h-[300px] flex items-center">
      <div className="grid grid-cols-4 gap-4 w-full">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-neutral-200 p-5">
            <div className="text-xs text-neutral-500 font-medium mb-1">{stat.label}</div>
            <div className="text-2xl font-bold text-neutral-900 mb-1">{stat.value}</div>
            <div className={`text-xs font-medium mb-3 ${stat.up ? "text-emerald-600" : "text-rose-500"}`}>
              {stat.change}
            </div>
            <div className="flex items-end gap-1 h-8">
              {stat.bars.map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-sm ${stat.up ? "bg-emerald-200" : "bg-rose-200"}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}