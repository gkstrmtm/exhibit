/**
 * Table Expandable Row
 * Category: Tables
 * Tags: table, expandable, row, details, accordion, nested
 * Description: A table where each row has a disclosure arrow. Clicking a row expands an inline detail panel below it, revealing additional fields without navigating away. Only one row expanded at a time. Demonstrates the "master-detail in-row" pattern for low-nav contexts.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/table-expandable-row.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface Row {
  id: number;
  name: string;
  status: string;
  amount: string;
  owner: string;
  due: string;
  priority: string;
  description: string;
  tags: string[];
}

const ROWS: Row[] = [
  { id: 1, name: "Homepage redesign", status: "In Review", amount: "$4,200", owner: "Sarah Chen", due: "Mar 28, 2025", priority: "High", description: "Full layout overhaul including hero, nav, and footer. Awaiting design sign-off before engineering handoff.", tags: ["design", "frontend"] },
  { id: 2, name: "API docs update", status: "Open", amount: "$1,100", owner: "James Wu", due: "Apr 2, 2025", priority: "Medium", description: "Document new rate-limit headers and retry semantics. Should include code samples for Node and Python.", tags: ["docs", "backend"] },
  { id: 3, name: "Mobile QA sprint", status: "Done", amount: "$800", owner: "Maya Patel", due: "Mar 14, 2025", priority: "Low", description: "iOS and Android regression for release 2.4. All P0 and P1 bugs resolved. Report filed.", tags: ["qa", "mobile"] },
  { id: 4, name: "Billing modal fix", status: "Open", amount: "$600", owner: "Leo Torres", due: "Apr 5, 2025", priority: "High", description: "Double-charge bug on plan upgrade when promo code applied. Reproduce in staging first.", tags: ["billing", "critical"] },
];

const STATUS_COLORS: Record<string, string> = {
  "In Review": "bg-amber-100 text-amber-700",
  Open: "bg-blue-100 text-blue-700",
  Done: "bg-emerald-100 text-emerald-700",
};

export default function TableExpandableRow() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  function toggle(id: number) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full max-w-xl">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
        Expandable table rows
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-[28px_1fr_auto_auto_auto] text-[10px] font-semibold text-neutral-400 uppercase tracking-wide px-3 py-2 border-b border-neutral-100 bg-neutral-50">
          <span />
          <span>Task</span>
          <span className="w-20 text-center">Status</span>
          <span className="w-16 text-right">Owner</span>
          <span className="w-16 text-right">Amount</span>
        </div>

        {ROWS.map((row) => {
          const isExpanded = expandedId === row.id;
          return (
            <div key={row.id} className={`border-b border-neutral-100 last:border-0 ${isExpanded ? "bg-neutral-50" : ""}`}>
              {/* Summary row */}
              <button
                onClick={() => toggle(row.id)}
                className="w-full grid grid-cols-[28px_1fr_auto_auto_auto] items-center px-3 py-2.5 hover:bg-neutral-50 text-left transition-colors group"
              >
                <span className="text-neutral-400 group-hover:text-neutral-600 transition-colors">
                  {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                </span>
                <span className="text-xs font-medium text-neutral-800 truncate">{row.name}</span>
                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full w-20 text-center ${STATUS_COLORS[row.status]}`}>{row.status}</span>
                <span className="text-xs text-neutral-500 w-16 text-right">{row.owner.split(" ")[0]}</span>
                <span className="text-xs font-medium text-neutral-700 w-16 text-right">{row.amount}</span>
              </button>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="px-10 py-3 border-t border-neutral-100 bg-neutral-50">
                  <p className="text-xs text-neutral-600 leading-5 mb-3">{row.description}</p>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {[["Owner", row.owner], ["Due", row.due], ["Priority", row.priority]].map(([k, v]) => (
                      <div key={k}>
                        <p className="text-[9px] text-neutral-400 uppercase tracking-wide">{k}</p>
                        <p className="text-xs text-neutral-700 mt-0.5">{v}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {row.tags.map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 bg-neutral-200 text-neutral-600 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-3 text-[11px] text-neutral-400">
        Only one row expands at a time. The detail panel slides in below without reflowing adjacent rows.
      </div>
    </div>
  );
}
