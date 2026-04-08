/**
 * Table Grouping Header
 * Category: Tables
 * Tags: table, grouping, collapsible, header, category, rows
 * Description: A table where rows are grouped under sticky category headers. Each group header shows a count and a collapse/expand chevron. Collapsing a group hides all its rows. All groups start expanded. Demonstrates grouped table structure often seen in project or CRM views.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/table-grouping-header.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface Row { id: number; name: string; owner: string; due: string; }
interface Group { label: string; color: string; rows: Row[]; }

const GROUPS: Group[] = [
  {
    label: "In Progress",
    color: "text-blue-700 bg-blue-50",
    rows: [
      { id: 1, name: "Homepage redesign", owner: "Sarah", due: "Mar 28" },
      { id: 2, name: "API docs update", owner: "James", due: "Apr 2" },
    ],
  },
  {
    label: "In Review",
    color: "text-amber-700 bg-amber-50",
    rows: [
      { id: 3, name: "Brand refresh deck", owner: "Jordan", due: "Apr 5" },
      { id: 4, name: "Mobile QA sprint", owner: "Maya", due: "Apr 8" },
      { id: 5, name: "Billing modal fix", owner: "Leo", due: "Apr 10" },
    ],
  },
  {
    label: "Done",
    color: "text-emerald-700 bg-emerald-50",
    rows: [
      { id: 6, name: "Onboarding flow audit", owner: "Riley", due: "Mar 14" },
    ],
  },
];

export default function TableGroupingHeader() {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  function toggle(label: string) {
    setCollapsed((s) => {
      const next = new Set(s);
      if (next.has(label)) next.delete(label); else next.add(label);
      return next;
    });
  }

  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full max-w-lg">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
        Grouped table rows
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
        {/* Column headers */}
        <div className="grid grid-cols-[1fr_auto_auto] text-[10px] font-semibold text-neutral-400 uppercase tracking-wide px-3 py-2 border-b border-neutral-100 bg-neutral-50">
          <span>Task</span>
          <span className="w-16">Owner</span>
          <span className="w-16 text-right">Due</span>
        </div>

        {GROUPS.map((group) => {
          const isCollapsed = collapsed.has(group.label);
          return (
            <div key={group.label}>
              {/* Group header */}
              <button
                onClick={() => toggle(group.label)}
                className="w-full flex items-center gap-2 px-3 py-1.5 border-b border-neutral-100 hover:bg-neutral-50 transition-colors text-left sticky top-0 bg-white z-10"
              >
                {isCollapsed ? <ChevronRight size={12} className="text-neutral-400" /> : <ChevronDown size={12} className="text-neutral-400" />}
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${group.color}`}>
                  {group.label}
                </span>
                <span className="text-[10px] text-neutral-400">{group.rows.length}</span>
              </button>

              {/* Group rows */}
              {!isCollapsed && group.rows.map((row) => (
                <div key={row.id} className="grid grid-cols-[1fr_auto_auto] items-center px-3 py-2.5 border-b border-neutral-100 last:border-0 hover:bg-neutral-50 pl-8">
                  <span className="text-xs text-neutral-800 truncate">{row.name}</span>
                  <span className="text-xs text-neutral-500 w-16">{row.owner}</span>
                  <span className="text-xs text-neutral-400 w-16 text-right">{row.due}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <div className="mt-3 text-[11px] text-neutral-400">
        Group headers show count badges and collapse/expand. Collapsing hides all rows in that group without reflowing other groups.
      </div>
    </div>
  );
}
