/**
 * Tab Panel Skeleton Replacement
 * Category: Loading
 * Tags: tabs, skeleton, loading, async, panel, data-fetching
 * Description: Tab switch that replaces the active panel with a skeleton while new data loads. Preserves panel dimensions so layout height doesn't collapse. The skeleton matches the expected data structure (rows, not generic bars) so the refresh feels anchored.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/tab-panel-skeleton-replacement.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState, useEffect, useRef } from "react";

const TABS = ["Queue", "Assigned", "Resolved", "Flagged"] as const;
type Tab = typeof TABS[number];
type RowData = { id: string; label: string; status: string; time: string };

const FAKE_ROWS: Record<Tab, RowData[]> = {
  Queue: [
    { id: "#1041", label: "Payment dispute — Acme Corp", status: "Open", time: "4m ago" },
    { id: "#1039", label: "Missing invoice — Bright Co", status: "Open", time: "12m ago" },
    { id: "#1038", label: "API key rotation", status: "Open", time: "1h ago" },
  ],
  Assigned: [
    { id: "#1036", label: "Refund request — Global Ltd", status: "In progress", time: "2h ago" },
    { id: "#1034", label: "Access issue — Dev Team", status: "In progress", time: "3h ago" },
    { id: "#1030", label: "Billing question — Studio 9", status: "In progress", time: "5h ago" },
  ],
  Resolved: [
    { id: "#1028", label: "Password reset — user@co.com", status: "Resolved", time: "1d ago" },
    { id: "#1027", label: "Onboarding help", status: "Resolved", time: "1d ago" },
    { id: "#1025", label: "Export failed — Reports", status: "Resolved", time: "2d ago" },
  ],
  Flagged: [
    { id: "#1022", label: "Suspicious login attempt", status: "Flagged", time: "3d ago" },
    { id: "#1019", label: "Duplicate account detected", status: "Flagged", time: "3d ago" },
    { id: "#1015", label: "Chargeback risk", status: "Flagged", time: "4d ago" },
  ],
};

const STATUS_COLORS: Record<string, string> = {
  Open: "bg-blue-50 text-blue-700",
  "In progress": "bg-amber-50 text-amber-700",
  Resolved: "bg-emerald-50 text-emerald-700",
  Flagged: "bg-red-50 text-red-700",
};

function RowSkeleton() {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-neutral-100 last:border-0 animate-pulse">
      <div className="h-3.5 w-10 bg-neutral-200 rounded" />
      <div className="h-3.5 flex-1 bg-neutral-200 rounded" />
      <div className="h-5 w-16 bg-neutral-100 rounded-full" />
      <div className="h-3 w-12 bg-neutral-100 rounded" />
    </div>
  );
}

export default function TabPanelSkeletonReplacement() {
  const [activeTab, setActiveTab] = useState<Tab>("Queue");
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<RowData[]>(FAKE_ROWS["Queue"]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function switchTab(tab: Tab) {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setLoading(true);
    setRows([]);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setRows(FAKE_ROWS[tab]);
      setLoading(false);
    }, 750);
  }

  const COUNTS: Record<Tab, number> = { Queue: 3, Assigned: 3, Resolved: 3, Flagged: 3 };

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden w-full max-w-lg">
      {/* Tab rail with counts */}
      <div className="flex border-b border-neutral-200 bg-neutral-50">
        {TABS.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              onClick={() => switchTab(tab)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors select-none ${
                isActive
                  ? "text-neutral-900 border-b-2 border-neutral-900 bg-white"
                  : "text-neutral-500 hover:text-neutral-700 border-b-2 border-transparent"
              }`}
            >
              {tab}
              <span className={`text-[10px] rounded-full px-1.5 py-0.5 font-semibold ${
                isActive ? "bg-neutral-900 text-white" : "bg-neutral-200 text-neutral-600"
              }`}>
                {COUNTS[tab]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div className="p-4 min-h-[148px]">
        {loading ? (
          <div>
            <RowSkeleton />
            <RowSkeleton />
            <RowSkeleton />
          </div>
        ) : (
          rows.map((row) => (
            <div key={row.id} className="flex items-center gap-3 py-2.5 border-b border-neutral-100 last:border-0">
              <span className="text-xs font-mono text-neutral-400 w-10 shrink-0">{row.id}</span>
              <span className="text-sm text-neutral-800 flex-1 truncate">{row.label}</span>
              <span className={`text-[10px] font-medium rounded-full px-2 py-0.5 shrink-0 ${STATUS_COLORS[row.status]}`}>
                {row.status}
              </span>
              <span className="text-[11px] text-neutral-400 shrink-0">{row.time}</span>
            </div>
          ))
        )}
      </div>

      <div className="px-4 py-2.5 border-t border-neutral-100 bg-neutral-50 text-[11px] text-neutral-400">
        Skeleton matches row structure — height is stable so the layout doesn't collapse during load.
      </div>
    </div>
  );
}
