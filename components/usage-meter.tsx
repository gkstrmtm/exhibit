/**
 * Usage Meter
 * Category: Billing
 * Tags: usage, meter, quota, billing, limits
 * Description: Current-cycle resource usage bars for API calls, storage, and seats. Each row shows used/limit, colored fill, and an upgrade nudge at threshold.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/usage-meter.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function UsageMeter() {
  const metrics = [
    { label: "API calls", used: 84200, limit: 100000, unit: "", color: "#f59e0b" },
    { label: "Storage", used: 3.8, limit: 10, unit: "GB", color: "#3b82f6" },
    { label: "Team seats", used: 4, limit: 5, unit: "", color: "#10b981" },
  ];
  return (
    <div className="bg-white border border-neutral-100 rounded-xl p-5 space-y-5 max-w-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-neutral-900">Usage this cycle</span>
        <span className="text-xs text-neutral-400">Resets Apr 14</span>
      </div>
      {metrics.map(m => {
        const pct = Math.round((m.used / m.limit) * 100);
        return (
          <div key={m.label}>
            <div className="flex justify-between text-xs text-neutral-600 mb-1.5">
              <span>{m.label}</span>
              <span>{m.used.toLocaleString()}{m.unit} / {m.limit.toLocaleString()}{m.unit}</span>
            </div>
            <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: m.color }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}