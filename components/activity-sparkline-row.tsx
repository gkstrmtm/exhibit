/**
 * Activity Sparkline Row
 * Category: Dashboard
 * Tags: sparkline, activities, chart, inline, table row
 * Description: A data list where each row contains an inline mini sparkline SVG at the right edge, showing micro-trend data. The sparkline is self-contained with no axes or labels — just the shape of the data. Demonstrates the inline sparkline row pattern used in leaderboards, usage tables, and analytics dashboards.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/activity-sparkline-row.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

const ROWS = [
  { name: "API Requests", value: "1.2M", data: [40, 55, 48, 62, 70, 65, 80, 74, 90, 85, 92, 88] },
  { name: "Active Sessions", value: "8,432", data: [30, 28, 32, 35, 30, 38, 36, 40, 38, 42, 45, 44] },
  { name: "Error Rate", value: "0.12%", data: [8, 9, 6, 7, 10, 8, 6, 5, 4, 5, 3, 4], low: true },
  { name: "Avg Latency", value: "142ms", data: [180, 175, 160, 155, 148, 152, 145, 142, 140, 139, 142, 141], low: true },
  { name: "New Signups", value: "248", data: [20, 24, 18, 30, 28, 35, 29, 40, 38, 44, 42, 48] },
];

function Sparkline({ data, low = false }: { data: number[]; low?: boolean }) {
  const W = 60, H = 24;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / range) * H;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
      <polyline
        points={pts}
        stroke={low ? "#f87171" : "#22c55e"}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ActivitySparklineRow() {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden w-full max-w-sm">
      <div className="px-4 py-2.5 border-b border-neutral-100 flex items-center justify-between">
        <span className="text-xs font-semibold text-neutral-700">System metrics</span>
        <span className="text-[9px] text-neutral-400">Last 12 hrs</span>
      </div>

      <div className="divide-y divide-neutral-100">
        {ROWS.map(({ name, value, data, low }) => (
          <div key={name} className="flex items-center px-4 py-2.5 gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-xs text-neutral-700 truncate">{name}</div>
              <div className="text-xs font-semibold text-neutral-900 mt-0.5">{value}</div>
            </div>
            <Sparkline data={data} low={low} />
          </div>
        ))}
      </div>
    </div>
  );
}
