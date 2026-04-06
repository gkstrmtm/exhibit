/**
 * Tab Navigation
 * Category: Navigation
 * Tags: tabs, navigation, underline, horizontal, switcher
 * Description: Horizontal underline-style tab bar — solid bottom border on active, neutral hover. Ideal for switching between views within a page section.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/tab-navigation.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";
export default function TabNavigation() {
  const [active, setActive] = useState("Overview");
  const tabs = ["Overview","Analytics","Deployments","Settings"];
  return (
    <div>
      <div className="border-b border-neutral-200">
        <div className="flex gap-0">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                active === tab
                  ? "border-neutral-900 text-neutral-900"
                  : "border-transparent text-neutral-500 hover:text-neutral-800 hover:border-neutral-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="pt-4 text-sm text-neutral-500">{active} content</div>
    </div>
  );
}