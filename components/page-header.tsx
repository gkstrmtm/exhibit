/**
 * Page Header
 * Category: Layout
 * Tags: page-header, title, subtitle, breadcrumb, actions, header
 * Description: A standard page header layout with a breadcrumb trail, page title, subtitle, and a right-aligned action button group. Three variants are shown: a dashboard page header, a settings page header with tabs, and a list page with a search input + primary action.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/page-header.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { ChevronRight, Plus, Download, Settings, Search } from "lucide-react";

function Breadcrumb({ crumbs }: { crumbs: string[] }) {
  return (
    <div className="flex items-center gap-1">
      {crumbs.map((c, i) => (
        <span key={c} className="flex items-center gap-1">
          {i > 0 && <ChevronRight size={9} strokeWidth={1.5} className="text-neutral-300" />}
          <span className={`text-[9px] ${i === crumbs.length - 1 ? "text-neutral-500 font-medium" : "text-neutral-400 hover:text-neutral-600 cursor-default"}`}>{c}</span>
        </span>
      ))}
    </div>
  );
}

const TABS = ["Overview", "Members", "Billing", "Security"];

export default function PageHeader() {
  const [tab, setTab] = useState("Overview");
  const [search, setSearch] = useState("");

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl w-full max-w-xs overflow-hidden">
      {/* Variant 1 — Dashboard header */}
      <div className="border-b border-neutral-200 px-4 py-3 bg-white">
        <Breadcrumb crumbs={["Workspace", "Projects", "Design System"]} />
        <div className="flex items-start justify-between mt-1.5 gap-2">
          <div>
            <div className="text-sm font-semibold text-neutral-800">Design System v3</div>
            <div className="text-[9px] text-neutral-400 mt-0.5">Last updated 2 hours ago</div>
          </div>
          <div className="flex gap-1.5 flex-shrink-0">
            <button className="flex items-center gap-1 px-2 py-1 text-[9px] font-medium border border-neutral-200 rounded-md text-neutral-600 hover:bg-neutral-50 transition-colors">
              <Download size={9} strokeWidth={1.5} />Export
            </button>
            <button className="flex items-center gap-1 px-2 py-1 text-[9px] font-medium bg-neutral-900 text-white rounded-md hover:bg-neutral-700 transition-colors">
              <Plus size={9} strokeWidth={1.5} />Add
            </button>
          </div>
        </div>
      </div>

      {/* Variant 2 — Settings with tabs */}
      <div className="border-b border-neutral-200 px-4 py-3 bg-white">
        <Breadcrumb crumbs={["Account", "Settings"]} />
        <div className="flex items-center justify-between mt-1.5">
          <div className="text-[12px] font-semibold text-neutral-800">Settings</div>
          <button className="flex items-center gap-1 px-2 py-1 text-[9px] font-medium text-neutral-600 border border-neutral-200 rounded-md hover:bg-neutral-50 transition-colors">
            <Settings size={9} strokeWidth={1.5} />Manage
          </button>
        </div>
        <div className="flex gap-0 mt-2.5 -mb-3">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-1.5 px-2.5 text-[9px] font-medium border-b-2 transition-colors ${t === tab ? "border-neutral-800 text-neutral-800" : "border-transparent text-neutral-400 hover:text-neutral-600"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Variant 3 — List with search */}
      <div className="px-4 py-3 bg-white">
        <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-2">Team members</div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1.5 flex-1 border border-neutral-200 rounded-lg px-2 py-1 bg-white hover:border-neutral-300 transition-colors">
            <Search size={9} strokeWidth={1.5} className="text-neutral-400 flex-shrink-0" />
            <input
              className="flex-1 text-[10px] text-neutral-700 outline-none bg-transparent placeholder-neutral-400"
              placeholder="Search members…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-1 px-2 py-1 text-[9px] font-medium bg-neutral-900 text-white rounded-lg hover:bg-neutral-700 transition-colors flex-shrink-0">
            <Plus size={9} strokeWidth={1.5} />Invite
          </button>
        </div>
      </div>
    </div>
  );
}
