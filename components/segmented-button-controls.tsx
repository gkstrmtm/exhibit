/**
 * Segmented Button Controls
 * Category: Buttons
 * Tags: segmented, toggle, group, tabs, filter, select
 * Description: Inline toggle groups for mutually exclusive options. The pill-track version, the border-segmented version, and the tab-underline version. Correct replacement for dropdowns when options are 2–5.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/segmented-button-controls.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";
import { Monitor, Tablet, Smartphone, List, Grid3X3, LayoutGrid } from "lucide-react";

export default function SegmentedButtonControls() {
  const [view, setView] = useState("all");
  const [device, setDevice] = useState("desktop");
  const [layout, setLayout] = useState("grid");
  const [period, setPeriod] = useState("7d");

  return (
    <div className="p-8 bg-white flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Pill track</div>
        <div className="inline-flex items-center bg-neutral-100 p-1 rounded-xl gap-0.5">
          {["All", "Active", "Archived", "Draft"].map(v => (
            <button key={v} onClick={() => setView(v.toLowerCase())} className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${view === v.toLowerCase() ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-800"}`}>{v}</button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Border segmented</div>
        <div className="inline-flex rounded-lg border border-neutral-200 overflow-hidden">
          {[{ label: "7D", val: "7d" }, { label: "30D", val: "30d" }, { label: "90D", val: "90d" }, { label: "1Y", val: "1y" }].map((o, i) => (
            <button key={o.val} onClick={() => setPeriod(o.val)} className={`px-4 py-2 text-sm font-medium transition-all ${i > 0 ? "border-l border-neutral-200" : ""} ${period === o.val ? "bg-blue-600 text-white border-blue-600" : "text-neutral-600 hover:bg-neutral-50"}`}>{o.label}</button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Icon only</div>
        <div className="flex gap-3">
          <div className="inline-flex items-center bg-neutral-100 p-1 rounded-lg gap-0.5">
            {[{ icon: Monitor, val: "desktop" }, { icon: Tablet, val: "tablet" }, { icon: Smartphone, val: "mobile" }].map(({ icon: Icon, val }) => (
              <button key={val} onClick={() => setDevice(val)} className={`p-2 rounded-md transition-all ${device === val ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-400 hover:text-neutral-700"}`}><Icon className="w-4 h-4" /></button>
            ))}
          </div>
          <div className="inline-flex items-center bg-neutral-100 p-1 rounded-lg gap-0.5">
            {[{ icon: Grid3X3, val: "grid" }, { icon: List, val: "list" }, { icon: LayoutGrid, val: "masonry" }].map(({ icon: Icon, val }) => (
              <button key={val} onClick={() => setLayout(val)} className={`p-2 rounded-md transition-all ${layout === val ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-400 hover:text-neutral-700"}`}><Icon className="w-4 h-4" /></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}