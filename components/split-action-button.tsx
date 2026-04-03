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
import { ChevronDown, GitBranch, GitPullRequest, GitMerge, Check } from "lucide-react";

export default function SplitActionButton() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Merge pull request");

  const options = [
    { label: "Merge pull request", icon: GitMerge, desc: "All commits added to base branch" },
    { label: "Squash and merge", icon: GitPullRequest, desc: "One commit added to base branch" },
    { label: "Rebase and merge", icon: GitBranch, desc: "Commits added to base individually" },
  ];

  return (
    <div className="p-8 bg-white flex flex-col gap-8 items-start">
      <div className="relative">
        <div className="flex">
          <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-l-lg hover:bg-emerald-700 transition-colors border-r border-emerald-700">
            <GitMerge className="w-4 h-4" />{selected}
          </button>
          <button onClick={() => setOpen(!open)} className="px-3 py-2.5 text-sm text-white bg-emerald-600 rounded-r-lg hover:bg-emerald-700 transition-colors">
            <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
        </div>
        {open && (
          <div className="absolute left-0 top-full mt-1.5 w-72 bg-white border border-neutral-200 rounded-xl shadow-lg overflow-hidden z-10">
            {options.map(opt => (
              <button key={opt.label} onClick={() => { setSelected(opt.label); setOpen(false); }} className="w-full flex items-start gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors text-left">
                <opt.icon className="w-4 h-4 text-neutral-500 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-neutral-800 flex items-center gap-2">
                    {opt.label}{selected === opt.label && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                  <div className="text-xs text-neutral-500 mt-0.5">{opt.desc}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex gap-0 rounded-lg border border-neutral-200 overflow-hidden">
        <button className="px-5 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors border-r border-neutral-200">Publish draft</button>
        <button className="px-3 py-2 text-neutral-500 hover:bg-neutral-50 transition-colors">
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}