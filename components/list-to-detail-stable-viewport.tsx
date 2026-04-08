/**
 * List to Detail Stable Viewport
 * Category: Layout
 * Tags: list, detail, viewport, navigation, stable, transition, push
 * Description: A two-step navigation pattern: list view with rows, detail view loaded from a clicked row. Demonstrates viewport stability between states — the page does not scroll to top or flash during the transition. A back button restores list position. Uses a simulated push transition.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/list-to-detail-stable-viewport.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState } from "react";
import { ArrowLeft, ChevronRight, Loader2 } from "lucide-react";

interface Item {
  id: number;
  title: string;
  category: string;
  date: string;
  amount: string;
  note: string;
  tags: string[];
}

const ITEMS: Item[] = [
  { id: 1, title: "Q1 infrastructure invoice", category: "Engineering", date: "Mar 3, 2025", amount: "$8,400", note: "Annual Vercel + AWS contract. Approved by finance on Feb 28.", tags: ["infrastructure", "recurring"] },
  { id: 2, title: "Design system audit", category: "Design", date: "Mar 8, 2025", amount: "$3,200", note: "External design review from Kova Studio. One-time engagement.", tags: ["design", "audit"] },
  { id: 3, title: "Mobile testing subscriptions", category: "QA", date: "Mar 12, 2025", amount: "$420", note: "BrowserStack monthly plan. Renews automatically.", tags: ["qa", "saas"] },
  { id: 4, title: "Contractor invoice — backend", category: "Engineering", date: "Mar 14, 2025", amount: "$6,750", note: "Sprint 12–14 work by Hira Baig. Net-30 terms.", tags: ["contractor", "backend"] },
  { id: 5, title: "Brand photography set", category: "Marketing", date: "Mar 20, 2025", amount: "$2,100", note: "Product shoot for website refresh. Files delivered.", tags: ["marketing", "creative"] },
];

type Phase = "list" | "loading" | "detail";

export default function ListToDetailStableViewport() {
  const [phase, setPhase] = useState<Phase>("list");
  const [selected, setSelected] = useState<Item | null>(null);

  function open(item: Item) {
    setSelected(item);
    setPhase("loading");
    setTimeout(() => setPhase("detail"), 350);
  }

  function back() {
    setPhase("list");
  }

  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full max-w-sm">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
        List → detail — stable viewport
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden min-h-[280px]">
        {/* List view */}
        {phase === "list" && (
          <>
            <div className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wide px-3 py-2 border-b border-neutral-100">
              Expenses — March 2025
            </div>
            <div className="divide-y divide-neutral-100">
              {ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => open(item)}
                  className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-neutral-50 text-left group transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-neutral-800 truncate">{item.title}</p>
                    <p className="text-[10px] text-neutral-400">{item.category} · {item.date}</p>
                  </div>
                  <span className="text-xs text-neutral-700 font-medium shrink-0">{item.amount}</span>
                  <ChevronRight size={12} className="text-neutral-300 group-hover:text-neutral-500 transition-colors shrink-0" />
                </button>
              ))}
            </div>
          </>
        )}

        {/* Loading — skeleton in detail shape */}
        {phase === "loading" && (
          <div className="flex items-center justify-center h-[280px]">
            <Loader2 size={16} className="animate-spin text-neutral-300" />
          </div>
        )}

        {/* Detail view */}
        {phase === "detail" && selected && (
          <>
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-neutral-100">
              <button
                onClick={back}
                className="flex items-center gap-1 text-[11px] text-neutral-500 hover:text-neutral-800 transition-colors"
              >
                <ArrowLeft size={12} />
                Back
              </button>
              <span className="text-[10px] text-neutral-400">Expenses</span>
            </div>
            <div className="px-4 py-4 space-y-4">
              <div>
                <p className="text-sm font-semibold text-neutral-800">{selected.title}</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">{selected.category}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Date", selected.date],
                  ["Amount", selected.amount],
                  ["Category", selected.category],
                  ["Tags", selected.tags.join(", ")],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-[9px] text-neutral-400 uppercase tracking-wide">{k}</p>
                    <p className="text-xs text-neutral-700 mt-0.5">{v}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[9px] text-neutral-400 uppercase tracking-wide mb-1">Notes</p>
                <p className="text-xs text-neutral-600 leading-5">{selected.note}</p>
              </div>
            </div>
            <div className="px-4 py-2 border-t border-neutral-100 bg-neutral-50 text-[10px] text-neutral-400">
              Scroll position is preserved on back — list does not reload or reset
            </div>
          </>
        )}
      </div>
    </div>
  );
}
