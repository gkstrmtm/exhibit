import { ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";

export default function MinimalStats() {
  return (
    <div className="bg-white p-8 grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200">
      {/* Stat 1 */}
      <div className="bg-white p-6 flex flex-col gap-4 group hover:bg-neutral-50 transition-colors">
        <div className="flex justify-between items-center">
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Revenue</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="flex items-baseline gap-2">
            <span className="text-4xl font-semibold tracking-tight tabular-nums">$24.5k</span>
            <span className="text-xs font-medium text-emerald-600">+12%</span>
        </div>
      </div>

      {/* Stat 2 */}
      <div className="bg-white p-6 flex flex-col gap-4 group hover:bg-neutral-50 transition-colors">
        <div className="flex justify-between items-center">
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Bounce Rate</span>
            <ArrowDownRight className="w-4 h-4 text-rose-600" />
        </div>
        <div className="flex items-baseline gap-2">
            <span className="text-4xl font-semibold tracking-tight tabular-nums">42.8%</span>
            <span className="text-xs font-medium text-rose-600">-2.1%</span>
        </div>
      </div>

      {/* Stat 3 */}
      <div className="bg-white p-6 flex flex-col gap-4 group hover:bg-neutral-50 transition-colors">
        <div className="flex justify-between items-center">
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Active Users</span>
            <Activity className="w-4 h-4 text-blue-600" />
        </div>
        <div className="flex items-baseline gap-2">
            <span className="text-4xl font-semibold tracking-tight tabular-nums">1,204</span>
            <span className="text-xs font-medium text-neutral-400">Live</span>
        </div>
      </div>
    </div>
  );
}
