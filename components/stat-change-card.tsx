/**
 * Stat Change Card
 * Category: Cards
 * Tags: stat, sparkline, delta, metric, card, kpi
 * Description: A KPI summary card with a large metric value, a percentage delta badge with TrendingUp/TrendingDown icon, a period label, and an inline SVG sparkline chart. Four cards are shown side-by-side in a 2x2 grid covering revenue, users, conversion, and latency.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/stat-change-card.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

const STATS = [
  { label: "Revenue", value: "$48,210", delta: +12.4, period: "vs last month", points: [22,28,24,30,27,35,42,38,45,48] },
  { label: "Active users", value: "13,842", delta: +8.1, period: "vs last week", points: [80,75,82,88,90,85,88,92,95,100] },
  { label: "Conversion", value: "3.62%", delta: -0.4, period: "vs last month", points: [4,3.8,3.9,3.7,3.6,3.5,3.7,3.6,3.5,3.62] },
  { label: "P95 Latency", value: "142ms", delta: -18, period: "vs last week", points: [200,185,175,168,162,158,152,148,145,142] },
];

function Sparkline({ points, positive }: { points: number[]; positive: boolean }) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const W = 64, H = 24;
  const pts = points.map((p, i) => {
    const x = (i / (points.length - 1)) * W;
    const y = H - ((p - min) / range) * H;
    return `${x},${y}`;
  }).join(" ");
  const color = positive ? "#22c55e" : "#f43f5e";
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
      <polyline points={pts} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function StatChangeCard() {
  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 w-full max-w-xs">
      <div className="grid grid-cols-2 gap-2.5">
        {STATS.map(s => {
          const positive = s.delta >= 0;
          // For latency, lower is better so positive delta is actually bad
          const good = s.label === "P95 Latency" || s.label === "Conversion" ? !positive : positive;
          return (
            <div key={s.label} className="bg-white border border-neutral-200 rounded-xl p-3 space-y-1.5">
              <div className="text-[9px] text-neutral-400">{s.label}</div>
              <div className="text-base font-semibold text-neutral-800 leading-none">{s.value}</div>

              <div className="flex items-center justify-between">
                <div className={`flex items-center gap-0.5 text-[9px] font-semibold ${good ? "text-emerald-600" : "text-red-500"}`}>
                  {positive ? <TrendingUp size={9} strokeWidth={2} /> : <TrendingDown size={9} strokeWidth={2} />}
                  {positive ? "+" : ""}{s.delta}%
                </div>
                <Sparkline points={s.points} positive={good} />
              </div>

              <div className="text-[8px] text-neutral-400">{s.period}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
