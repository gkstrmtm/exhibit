/**
 * Tab Stale Content Preserve
 * Category: Loading
 * Tags: tabs, loading, stale, refresh, skeleton, async, data-fetching
 * Description: Tab switch that preserves stale data while fetching fresh data. A compact refresh indicator appears in the active tab instead of replacing the panel with a skeleton. Prevents layout jump and preserves user context during background refresh.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/tab-stale-content-preserve.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState, useEffect, useRef } from "react";
import { RefreshCw } from "lucide-react";

const TABS = ["Overview", "Activity", "Members", "Settings"] as const;
type Tab = typeof TABS[number];

const FAKE_DATA: Record<Tab, { rows: string[][] }> = {
  Overview: {
    rows: [
      ["Revenue", "$124,500", "+8.2%"],
      ["Active users", "3,841", "+3.1%"],
      ["Open tickets", "14", "−2"],
      ["Avg response", "1h 22m", "+4m"],
    ],
  },
  Activity: {
    rows: [
      ["Deploy", "production", "2 min ago"],
      ["PR merged", "#1204", "14 min ago"],
      ["Alert fired", "latency spike", "1h ago"],
      ["Rollback", "v2.3.1", "3h ago"],
    ],
  },
  Members: {
    rows: [
      ["Amara Singh", "Admin", "Active"],
      ["Luis Reyes", "Editor", "Active"],
      ["Priya Okafor", "Viewer", "Invited"],
      ["Tom Nakamura", "Editor", "Active"],
    ],
  },
  Settings: {
    rows: [
      ["Plan", "Pro", "Manage"],
      ["Region", "us-east-1", "Change"],
      ["SSO", "Enabled", "Configure"],
      ["Audit log", "90 days", "Export"],
    ],
  },
};

export default function TabStaleContentPreserve() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [refreshingTab, setRefreshingTab] = useState<Tab | null>(null);
  const [displayData, setDisplayData] = useState(FAKE_DATA["Overview"]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function switchTab(tab: Tab) {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setRefreshingTab(tab);
    // Keep stale data visible; swap in fresh data after mock fetch
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDisplayData(FAKE_DATA[tab]);
      setRefreshingTab(null);
    }, 900);
  }

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden w-full max-w-lg">
      {/* Tab rail */}
      <div className="flex border-b border-neutral-200 bg-neutral-50">
        {TABS.map((tab) => {
          const isActive = tab === activeTab;
          const isRefreshing = tab === refreshingTab;
          return (
            <button
              key={tab}
              onClick={() => switchTab(tab)}
              className={`relative flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors select-none ${
                isActive
                  ? "text-neutral-900 border-b-2 border-neutral-900 bg-white"
                  : "text-neutral-500 hover:text-neutral-700 border-b-2 border-transparent"
              }`}
            >
              {tab}
              {isRefreshing && (
                <RefreshCw
                  size={11}
                  className="text-neutral-400 animate-spin"
                  strokeWidth={2}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Panel — stale data stays visible while refreshing */}
      <div className="p-4">
        <div className="text-[11px] font-medium text-neutral-400 uppercase tracking-wide mb-3 flex items-center gap-2">
          {activeTab}
          {refreshingTab === activeTab && (
            <span className="text-[10px] normal-case tracking-normal text-neutral-400 font-normal">
              refreshing…
            </span>
          )}
        </div>
        <table className="w-full text-sm">
          <tbody>
            {displayData.rows.map((row, i) => (
              <tr
                key={i}
                className={`border-b border-neutral-100 last:border-0 transition-opacity ${
                  refreshingTab === activeTab ? "opacity-50" : "opacity-100"
                }`}
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`py-2 text-sm ${
                      j === 0
                        ? "text-neutral-600 font-medium"
                        : j === 1
                        ? "text-neutral-900 font-semibold text-right"
                        : "text-neutral-400 text-right text-xs"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Annotation */}
      <div className="px-4 py-2.5 border-t border-neutral-100 bg-neutral-50 text-[11px] text-neutral-400">
        Stale data dims while refreshing — no skeleton, no layout jump. Refresh icon in the tab confirms in-flight state.
      </div>
    </div>
  );
}
