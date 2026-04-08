/**
 * Usage Meter Bar
 * Category: Billing
 * Tags: usage, quota, meter, limit, billing, consumed
 * Description: A usage metering widget showing consumed vs total quota for multiple resource types (API calls, storage, seats). Each meter shows a labeled bar that colors amber when over 75% and red when over 90%. Demonstrates the quota/usage display pattern found in SaaS billing pages and admin dashboards.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/usage-meter-bar.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

interface Meter { label: string; used: number; total: number; unit: string; }

const METERS: Meter[] = [
  { label: "API calls", used: 84200, total: 100000, unit: "calls" },
  { label: "Storage", used: 17.4, total: 20, unit: "GB" },
  { label: "Team seats", used: 7, total: 10, unit: "seats" },
  { label: "Exports", used: 45, total: 50, unit: "exports" },
];

function fmt(n: number) { return n >= 1000 ? (n / 1000).toFixed(0) + "k" : String(n); }

export default function UsageMeterBar() {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-4 w-full max-w-xs space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-neutral-700">Plan usage</span>
        <span className="text-[9px] text-neutral-400">Resets May 1</span>
      </div>

      {METERS.map(({ label, used, total, unit }) => {
        const pct = Math.min(100, (used / total) * 100);
        const isHigh = pct >= 90;
        const isMid = pct >= 75 && pct < 90;
        const barColor = isHigh ? "bg-red-500" : isMid ? "bg-amber-400" : "bg-emerald-500";
        const textColor = isHigh ? "text-red-600" : isMid ? "text-amber-600" : "text-neutral-500";

        return (
          <div key={label}>
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-xs text-neutral-700">{label}</span>
              <span className={`text-[10px] font-medium ${textColor}`}>
                {fmt(used)} / {fmt(total)} {unit}
              </span>
            </div>
            <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}

      <div className="pt-1 border-t border-neutral-100">
        <button className="text-[10px] text-blue-600 hover:underline">Upgrade for more →</button>
      </div>
    </div>
  );
}
