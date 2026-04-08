/**
 * Dashboard Stat Grid
 * Category: Dashboard
 * Tags: stats, kpi, metrics, grid, delta, cards
 * Description: A 4-up grid of KPI stat cards. Each card shows a metric label, current value, and a delta indicator (up or down, with percentage) compared to the previous period. The delta sign determines the color: green for positive, red for negative. Demonstrates the standard dashboard top-row stats pattern.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/dashboard-stat-grid.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
import { TrendingUp, TrendingDown, Users, DollarSign, MousePointerClick, Activity } from "lucide-react";

interface Stat { label: string; value: string; delta: number; icon: React.ElementType; period: string; }

const STATS: Stat[] = [
  { label: "Monthly Revenue", value: "$48,230", delta: 12.4, icon: DollarSign, period: "vs last month" },
  { label: "Active Users", value: "3,841", delta: -2.1, icon: Users, period: "vs last month" },
  { label: "Conversion Rate", value: "4.7%", delta: 0.6, icon: MousePointerClick, period: "vs last week" },
  { label: "Uptime", value: "99.98%", delta: 0.01, icon: Activity, period: "vs last month" },
];

export default function DashboardStatGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
      {STATS.map(({ label, value, delta, icon: Icon, period }) => {
        const positive = delta >= 0;
        return (
          <div key={label} className="bg-white border border-neutral-200 rounded-xl p-4">
            <div className="flex items-start justify-between mb-2">
              <Icon size={14} className="text-neutral-400 mt-0.5 shrink-0" strokeWidth={1.5} />
              <span className={`flex items-center gap-0.5 text-[10px] font-semibold ${positive ? "text-emerald-600" : "text-red-500"}`}>
                {positive
                  ? <TrendingUp size={10} strokeWidth={2} />
                  : <TrendingDown size={10} strokeWidth={2} />}
                {positive ? "+" : ""}{delta}%
              </span>
            </div>
            <div className="text-lg font-bold text-neutral-900 leading-none mb-1">{value}</div>
            <div className="text-[10px] text-neutral-500">{label}</div>
            <div className="text-[9px] text-neutral-400 mt-0.5">{period}</div>
          </div>
        );
      })}
    </div>
  );
}
