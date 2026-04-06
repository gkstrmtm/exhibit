/**
 * Split Action Button
 * Category: Buttons
 * Tags: split, dropdown, action, menu, advanced, github
 * Description: Primary action on the left, dropdown chevron on the right — split by a thin divider. Used when there's one default action plus alternatives. Common in GitHub (commit vs commit options), deploy buttons, and bulk action toolbars.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/split-action-button.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";
import { ChevronDown, GitMerge } from "lucide-react";

export default function SplitActionButton() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Merge pull request");
  return (
    <div className="relative">
      <div className="flex">
        <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-l-lg border-r border-emerald-700">
          <GitMerge className="w-4 h-4" />{selected}
        </button>
        <button onClick={() => setOpen(!open)} className="px-3 py-2.5 text-white bg-emerald-600 rounded-r-lg">
          <ChevronDown className={`w-4 h-4 ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
    </div>
  );
}