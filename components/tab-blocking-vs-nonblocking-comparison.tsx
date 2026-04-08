/**
 * Tab Blocking vs Non-Blocking Comparison
 * Category: Loading
 * Tags: tabs, loading, blocking, skeleton, comparison, anti-pattern, async
 * Description: Side-by-side comparison showing the wrong pattern (blocking spinner that collapses the panel) versus the right pattern (structure-preserving skeleton). Both panels are interactive — switch tabs on either side to see the difference live.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/tab-blocking-vs-nonblocking-comparison.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";

const TABS = ["Summary", "Details", "History"] as const;
type Tab = typeof TABS[number];

const DATA: Record<Tab, string[]> = {
  Summary: ["Total spend: $48,200", "Active contracts: 12", "Pending approvals: 3"],
  Details: ["Contract start: Jan 2025", "Owner: Amara Singh", "Region: US-East"],
  History: ["Renewed — Feb 2025", "Amended — Nov 2024", "Signed — Jan 2024"],
};

function WrongPanel() {
  const [active, setActive] = useState<Tab>("Summary");
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function switchTab(tab: Tab) {
    if (tab === active) return;
    setActive(tab);
    setLoading(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setLoading(false), 800);
  }
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <div className="border border-red-200 rounded-lg overflow-hidden">
      <div className="bg-red-50 px-3 py-1.5 text-[10px] font-semibold text-red-600 uppercase tracking-wide border-b border-red-200">
        ✗ Wrong — blocking spinner
      </div>
      <div className="flex border-b border-neutral-200 bg-neutral-50">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => switchTab(tab)}
            className={`px-3 py-2 text-[11px] font-medium transition-colors select-none ${
              active === tab
                ? "text-neutral-900 border-b-2 border-neutral-900 bg-white"
                : "text-neutral-500 hover:text-neutral-700 border-b-2 border-transparent"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="h-[88px] flex items-center justify-center bg-white">
        {loading ? (
          <Loader2 size={20} className="text-neutral-400 animate-spin" strokeWidth={1.5} />
        ) : (
          <ul className="w-full px-3 py-2 space-y-1.5">
            {DATA[active].map((line, i) => (
              <li key={i} className="text-xs text-neutral-700">{line}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="px-3 py-1.5 border-t border-neutral-100 bg-neutral-50 text-[10px] text-red-500">
        Panel collapses to spinner — height varies, context lost
      </div>
    </div>
  );
}

function RightPanel() {
  const [active, setActive] = useState<Tab>("Summary");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(DATA["Summary"]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function switchTab(tab: Tab) {
    if (tab === active) return;
    setActive(tab);
    setLoading(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setData(DATA[tab]);
      setLoading(false);
    }, 800);
  }
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <div className="border border-emerald-200 rounded-lg overflow-hidden">
      <div className="bg-emerald-50 px-3 py-1.5 text-[10px] font-semibold text-emerald-700 uppercase tracking-wide border-b border-emerald-200">
        ✓ Right — skeleton preserves structure
      </div>
      <div className="flex border-b border-neutral-200 bg-neutral-50">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => switchTab(tab)}
            className={`px-3 py-2 text-[11px] font-medium transition-colors select-none ${
              active === tab
                ? "text-neutral-900 border-b-2 border-neutral-900 bg-white"
                : "text-neutral-500 hover:text-neutral-700 border-b-2 border-transparent"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="h-[88px] bg-white px-3 py-2 space-y-1.5">
        {loading ? (
          <>
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-3 rounded bg-neutral-100 animate-pulse" style={{ width: `${55 + i * 13}%` }} />
            ))}
          </>
        ) : (
          data.map((line, i) => (
            <div key={i} className="text-xs text-neutral-700">{line}</div>
          ))
        )}
      </div>
      <div className="px-3 py-1.5 border-t border-neutral-100 bg-neutral-50 text-[10px] text-emerald-600">
        Height stable — skeleton lines match real data rows
      </div>
    </div>
  );
}

export default function TabBlockingVsNonblockingComparison() {
  return (
    <div className="bg-neutral-50 p-6 rounded-xl w-full">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-4">
        Tab loading pattern comparison — click any tab on either side
      </div>
      <div className="grid grid-cols-2 gap-4">
        <WrongPanel />
        <RightPanel />
      </div>
    </div>
  );
}
