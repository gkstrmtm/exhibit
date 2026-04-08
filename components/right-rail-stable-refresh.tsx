/**
 * Right Rail Stable Refresh
 * Category: Layout
 * Tags: right-rail, detail, panel, refresh, layout-stability, split-view
 * Description: A split-view pattern: left list with clickable rows, right detail rail. When the list refreshes, the selected item stays highlighted and the right rail doesn't collapse or jump — it dims briefly, then resolves with updated data. Demonstrates layout stability during ambient refresh.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/right-rail-stable-refresh.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState, useRef, useEffect } from "react";
import { RefreshCw } from "lucide-react";

interface Item {
  id: number;
  name: string;
  status: string;
  statusColor: string;
  owner: string;
  updated: string;
  priority: string;
  description: string;
}

const ITEMS_A: Item[] = [
  { id: 1, name: "Homepage redesign", status: "In Review", statusColor: "bg-amber-100 text-amber-700", owner: "Sarah Chen", updated: "2h ago", priority: "High", description: "Full page layout audit and hero section redesign. Awaiting design approval." },
  { id: 2, name: "API rate-limit docs", status: "Open", statusColor: "bg-blue-100 text-blue-700", owner: "James Wu", updated: "4h ago", priority: "Medium", description: "Document the new per-endpoint rate limit headers. Needs technical review." },
  { id: 3, name: "Billing modal fix", status: "Done", statusColor: "bg-emerald-100 text-emerald-700", owner: "Maya Patel", updated: "1d ago", priority: "High", description: "Fixed double-charge bug on upgrade flow. Deployed to production." },
];

const ITEMS_B: Item[] = [
  { id: 1, name: "Homepage redesign", status: "Done", statusColor: "bg-emerald-100 text-emerald-700", owner: "Sarah Chen", updated: "5m ago", priority: "High", description: "Design approved. Hand-off to engineering complete." },
  { id: 2, name: "API rate-limit docs", status: "In Review", statusColor: "bg-amber-100 text-amber-700", owner: "James Wu", updated: "30m ago", priority: "Medium", description: "Technical review in progress. Comments added by reviewer." },
  { id: 3, name: "Billing modal fix", status: "Done", statusColor: "bg-emerald-100 text-emerald-700", owner: "Maya Patel", updated: "1d ago", priority: "High", description: "Closed and archived. No further action needed." },
];

export default function RightRailStableRefresh() {
  const [items, setItems] = useState(ITEMS_A);
  const [selected, setSelected] = useState<Item>(ITEMS_A[0]);
  const [refreshing, setRefreshing] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  function refresh() {
    if (refreshing) return;
    setRefreshing(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const next = items === ITEMS_A ? ITEMS_B : ITEMS_A;
      setItems(next);
      setSelected((prev) => next.find((i) => i.id === prev.id) ?? next[0]);
      setRefreshing(false);
    }, 900);
  }

  const detail = items.find((i) => i.id === selected.id) ?? items[0];

  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
          Right rail — stable on refresh
        </div>
        <button
          onClick={refresh}
          disabled={refreshing}
          className="flex items-center gap-1 text-[10px] px-2 py-1 bg-white border border-neutral-200 rounded-md text-neutral-600 hover:bg-neutral-50 disabled:opacity-40"
        >
          <RefreshCw size={10} className={refreshing ? "animate-spin" : ""} />
          {refreshing ? "Refreshing…" : "Refresh list"}
        </button>
      </div>

      <div className="flex gap-2 h-[220px]">
        {/* Left list */}
        <div className={`w-[200px] bg-white border border-neutral-200 rounded-lg overflow-hidden flex flex-col shrink-0 transition-opacity ${refreshing ? "opacity-50" : "opacity-100"}`}>
          <div className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wide px-3 py-2 border-b border-neutral-100">
            Tasks
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-neutral-100">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                className={`w-full text-left px-3 py-2.5 hover:bg-neutral-50 transition-colors ${selected.id === item.id ? "bg-neutral-100" : ""}`}
              >
                <p className="text-xs font-medium text-neutral-800 truncate">{item.name}</p>
                <p className="text-[10px] text-neutral-400 mt-0.5">{item.updated}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right rail — stays stable */}
        <div className={`flex-1 bg-white border border-neutral-200 rounded-lg overflow-hidden transition-opacity ${refreshing ? "opacity-50" : "opacity-100"}`}>
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-100">
            <span className="text-sm font-semibold text-neutral-800">{detail.name}</span>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${detail.statusColor}`}>{detail.status}</span>
          </div>
          <div className="px-4 py-3 space-y-3">
            <p className="text-xs text-neutral-600 leading-5">{detail.description}</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {[
                ["Owner", detail.owner],
                ["Priority", detail.priority],
                ["Updated", detail.updated],
                ["Status", detail.status],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-[9px] text-neutral-400 uppercase tracking-wide">{k}</p>
                  <p className="text-xs text-neutral-700">{v}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="px-4 py-2 border-t border-neutral-100 bg-neutral-50 text-[10px] text-neutral-400">
            Right rail does not collapse or jump during list refresh — selection is preserved by ID
          </div>
        </div>
      </div>
    </div>
  );
}
