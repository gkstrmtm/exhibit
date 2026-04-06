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

export default function SegmentedButtonControls() {
  const [view, setView] = useState("all");
  const [period, setPeriod] = useState("7d");
  return (
    <div className="p-8 bg-white flex flex-col gap-8">
      <div className="inline-flex items-center bg-neutral-100 p-1 rounded-xl gap-0.5">
        {["All", "Active", "Archived", "Draft"].map(v => (
          <button key={v} onClick={() => setView(v.toLowerCase())} className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${view === v.toLowerCase() ? "bg-white shadow-sm" : "text-neutral-500"}`}>{v}</button>
        ))}
      </div>
    </div>
  );
}