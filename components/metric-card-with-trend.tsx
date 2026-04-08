/**
 * Metric Card with Trend
 * Category: Data Display
 * Tags: metric, card, trend, delta, kpi, sparkline
 * Description: A grid of four metric cards, each showing a primary number, label, period-over-period delta (up/down with color), and a 7-point sparkline. Values cycle between two datasets on Refresh. Demonstrates the standard KPI card with trend display.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/metric-card-with-trend.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState } from "react";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";

interface Metric {
  label: string;
  value: string;
  delta: string;
  up: boolean;
  points: number[];
}

const METRICS_A: Metric[] = [
  { label: "Monthly revenue", value: "$48,200", delta: "+12.4%", up: true, points: [30, 38, 35, 44, 40, 48, 52] },
  { label: "Active users", value: "12,441", delta: "+4.2%", up: true, points: [60, 62, 58, 66, 64, 68, 74] },
  { label: "Churn rate", value: "2.1%", delta: "−0.4%", up: false, points: [28, 30, 26, 24, 22, 20, 18] },
  { label: "Avg. session", value: "4m 38s", delta: "+0:22", up: true, points: [40, 44, 43, 48, 46, 50, 54] },
];
const METRICS_B: Metric[] = [
  { label: "Monthly revenue", value: "$51,800", delta: "+7.5%", up: true, points: [48, 52, 50, 55, 53, 58, 62] },
  { label: "Active users", value: "12,907", delta: "+3.8%", up: true, points: [68, 70, 69, 72, 73, 76, 78] },
  { label: "Churn rate", value: "1.9%", delta: "−0.2%", up: false, points: [22, 21, 20, 19, 18, 18, 17] },
  { label: "Avg. session", value: "4m 55s", delta: "+0:17", up: true, points: [52, 54, 55, 57, 56, 59, 62] },
];

function Sparkline({ points }: { points: number[] }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const w = 48; const h = 24; const step = w / (points.length - 1);
  const coords = points.map((p, i) => `${i * step},${h - ((p - min) / range) * (h - 4) - 2}`).join(" ");
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline points={coords} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export default function MetricCardWithTrend() {
  const [data, setData] = useState(METRICS_A);
  const [refreshing, setRefreshing] = useState(false);

  function refresh() {
    setRefreshing(true);
    setTimeout(() => {
      setData((d) => d === METRICS_A ? METRICS_B : METRICS_A);
      setRefreshing(false);
    }, 600);
  }

  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Key metrics</div>
        <button onClick={refresh} disabled={refreshing} className="flex items-center gap-1 text-[10px] px-2 py-1 bg-white border border-neutral-200 rounded-md text-neutral-600 hover:bg-neutral-50 disabled:opacity-40">
          <RefreshCw size={10} className={refreshing ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <div className={`grid grid-cols-2 gap-3 transition-opacity ${refreshing ? "opacity-50" : ""}`}>
        {data.map((m) => (
          <div key={m.label} className="bg-white border border-neutral-200 rounded-lg px-4 py-3">
            <p className="text-[10px] text-neutral-400 uppercase tracking-wide mb-1">{m.label}</p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xl font-semibold text-neutral-900 leading-tight">{m.value}</p>
                <div className={`flex items-center gap-1 mt-1 text-[11px] font-medium ${m.up ? "text-emerald-600" : "text-red-500"}`}>
                  {m.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {m.delta} vs last month
                </div>
              </div>
              <div className={`${m.up ? "text-emerald-500" : "text-red-400"}`}>
                <Sparkline points={m.points} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
