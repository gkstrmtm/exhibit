/**
 * Metric Card with Trend
 * Category: Dashboard
 * Tags: metric, sparkline, trend, dashboard, chart
 * Description: Single metric card with a large value, comparison delta, 7-day mini sparkline bars, and a subtle color based on direction.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/metric-trend-card.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function MetricTrendCard() {
  const points = [42, 58, 51, 67, 73, 69, 84];
  const max = Math.max(...points);
  return (
    <div className="bg-white border border-neutral-100 rounded-xl p-5 max-w-xs">
      <div className="text-xs text-neutral-500 mb-1">Weekly active creators</div>
      <div className="flex items-end justify-between mb-4">
        <div>
          <div className="text-2xl font-bold text-neutral-900">1,284</div>
          <div className="text-xs font-medium text-green-600 mt-0.5">↑ 14.2% vs last week</div>
        </div>
      </div>
      <div className="flex items-end gap-1 h-14">
        {points.map((p, i) => (
          <div key={i} className="flex-1 rounded-sm" style={{ height: `${(p / max) * 100}%`, background: i === points.length - 1 ? "#111" : "#e5e5e5" }} />
        ))}
      </div>
      <div className="flex justify-between text-xs text-neutral-300 mt-1.5">
        <span>Mon</span><span>Sun</span>
      </div>
    </div>
  );
}