/**
 * Stale Content Refresh Indicator
 * Category: Feedback
 * Tags: stale, refresh, indicator, data, timestamp, polling
 * Description: A data panel that shows stale-content state: the previous data remains visible and readable, while a compact refresh chip appears indicating freshness. User can trigger manual refresh. Timestamp updates after refresh. Demonstrates "stale-while-revalidate" UI pattern.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/stale-content-refresh-indicator.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState, useRef, useEffect } from "react";
import { RefreshCw, Clock } from "lucide-react";

type FreshState = "fresh" | "stale" | "refreshing";

const DATASET_A = [
  { name: "Dashboard sessions", value: "12,441", delta: "+4.2%" },
  { name: "API calls", value: "384,002", delta: "+1.1%" },
  { name: "Error rate", value: "0.08%", delta: "−0.02%" },
];
const DATASET_B = [
  { name: "Dashboard sessions", value: "12,907", delta: "+3.8%" },
  { name: "API calls", value: "391,210", delta: "+1.9%" },
  { name: "Error rate", value: "0.06%", delta: "−0.03%" },
];

function formatAgo(secs: number) {
  if (secs < 60) return `${secs}s ago`;
  return `${Math.floor(secs / 60)}m ago`;
}

export default function StaleContentRefreshIndicator() {
  const [dataset, setDataset] = useState(DATASET_A);
  const [freshState, setFreshState] = useState<FreshState>("fresh");
  const [ageSeconds, setAgeSeconds] = useState(0);
  const refreshTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const ageTick = useRef<ReturnType<typeof setInterval>>(undefined);

  // Tick age counter every second
  useEffect(() => {
    ageTick.current = setInterval(() => {
      setAgeSeconds((v) => {
        const next = v + 1;
        if (next >= 20 && freshState === "fresh") setFreshState("stale");
        return next;
      });
    }, 1000);
    return () => clearInterval(ageTick.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [freshState]);

  function triggerRefresh() {
    if (freshState === "refreshing") return;
    setFreshState("refreshing");
    clearTimeout(refreshTimer.current);
    refreshTimer.current = setTimeout(() => {
      setDataset((d) => (d === DATASET_A ? DATASET_B : DATASET_A));
      setAgeSeconds(0);
      setFreshState("fresh");
    }, 900);
  }

  useEffect(() => () => { clearTimeout(refreshTimer.current); clearInterval(ageTick.current); }, []);

  const staleSince = formatAgo(ageSeconds);

  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full max-w-sm">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
        Usage metrics
      </div>

      {/* Panel header with refresh chip */}
      <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-100">
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
            <Clock size={11} />
            <span>Updated {staleSince}</span>
          </div>

          {/* Stale chip */}
          {freshState === "stale" && (
            <button
              onClick={triggerRefresh}
              className="flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
            >
              <RefreshCw size={9} />
              Stale — refresh
            </button>
          )}
          {freshState === "refreshing" && (
            <span className="flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-full bg-blue-50 text-blue-500">
              <RefreshCw size={9} className="animate-spin" />
              Refreshing…
            </span>
          )}
          {freshState === "fresh" && (
            <button
              onClick={triggerRefresh}
              className="flex items-center gap-1 text-[10px] text-neutral-400 hover:text-neutral-600"
            >
              <RefreshCw size={10} />
            </button>
          )}
        </div>

        {/* Data rows — always visible, never blanked */}
        <div className={`divide-y divide-neutral-100 transition-opacity ${freshState === "refreshing" ? "opacity-40" : "opacity-100"}`}>
          {dataset.map((row) => (
            <div key={row.name} className="flex items-center justify-between px-3 py-2.5">
              <span className="text-xs text-neutral-700">{row.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-neutral-900">{row.value}</span>
                <span className={`text-[10px] font-medium ${row.delta.startsWith("−") ? "text-red-500" : "text-emerald-600"}`}>
                  {row.delta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 text-[11px] text-neutral-400">
        Wait ~20s for the stale chip to appear. Data stays visible while stale — only dims during active refresh. The chip is the only indicator that new data is available.
      </div>
    </div>
  );
}
