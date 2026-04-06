/**
 * Tab Content Switcher
 * Category: Layout
 * Tags: tabs, layout, switcher, pills, content
 * Description: Pill-style tab bar that switches between different content panels. Solid filled active pill, ghost inactive. Common in settings and profiles.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/tab-content-switcher.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";
export default function TabContentSwitcher() {
  const [active, setActive] = useState("Code");
  const tabs = ["Preview","Code","Props"];
  return (
    <div className="bg-white border border-neutral-100 rounded-xl overflow-hidden max-w-sm">
      <div className="flex gap-1 p-2 bg-neutral-50 border-b border-neutral-100">
        {tabs.map(t => (
          <button key={t} onClick={() => setActive(t)} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${active === t ? "bg-white shadow-sm text-neutral-900" : "text-neutral-500 hover:text-neutral-700"}`}>{t}</button>
        ))}
      </div>
      <div className="p-5 font-mono text-xs text-neutral-500">
        {active === "Preview" && <div className="text-center py-4 text-2xl">🎨</div>}
        {active === "Code" && <pre className="text-xs">{'<Button size="sm">\n  Click me\n</Button>'}</pre>}
        {active === "Props" && <div className="space-y-1"><div><span className="text-blue-600">size</span>: "sm" | "md" | "lg"</div><div><span className="text-blue-600">variant</span>: "solid" | "ghost"</div></div>}
      </div>
    </div>
  );
}