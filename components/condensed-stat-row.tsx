/**
 * Condensed Stat Row
 * Category: Data Density
 * Tags: stats, metrics, row, compact, overview, single-line
 * Description: A single horizontal row of 6 key metrics — each showing a small label above and a value below — all packed into one line. No charts, no deltas, no decoration. Pure information density. Demonstrates the condensed metrics strip used in page headers and monitor bars.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/condensed-stat-row.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

const STATS = [
  { label: "Uptime", value: "99.98%" },
  { label: "Req/sec", value: "4,210" },
  { label: "P95 Latency", value: "42ms" },
  { label: "Error Rate", value: "0.04%" },
  { label: "DB Connections", value: "38 / 100" },
  { label: "Memory", value: "62%" },
];

export default function CondensedStatRow() {
  return (
    <div className="bg-neutral-900 rounded-xl px-4 py-2 w-full max-w-xl overflow-x-auto">
      <div className="flex items-stretch gap-0 min-w-max">
        {STATS.map(({ label, value }, i) => (
          <div key={label} className="flex flex-col justify-center px-4 py-1.5">
            <span className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest whitespace-nowrap">
              {label}
            </span>
            <span className="text-sm font-semibold text-white whitespace-nowrap mt-0.5">
              {value}
            </span>
            {i < STATS.length - 1 && (
              <div className="absolute right-0 top-2 bottom-2 w-px bg-neutral-700" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
