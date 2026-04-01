/**
 * Split Navigation Shell
 * Category: App Shells
 * Tags: split, navigation, sidebar, app-shell, dark, panel
 * Description: Narrow icon-only sidebar with an expanded secondary panel for section details. Dark sidebar theme with a spacious main content area. Great for complex applications.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/split-nav-shell.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";

export default function SplitNavShell() {
  const [active, setActive] = useState(0);
  const icons = ["◆", "◎", "▤", "◈", "▣"];
  const sections = [
    { title: "Dashboard", items: ["Overview", "Analytics", "Reports", "Live View"] },
    { title: "Projects", items: ["All Projects", "Starred", "Archived", "Templates"] },
    { title: "Files", items: ["Documents", "Images", "Videos", "Shared"] },
    { title: "Settings", items: ["General", "Security", "Billing", "API Keys"] },
    { title: "Storage", items: ["Buckets", "CDN", "Backups", "Logs"] },
  ];

  return (
    <div className="flex min-h-[400px] border border-neutral-200 rounded-lg overflow-hidden">
      <div className="w-12 bg-neutral-900 flex flex-col items-center py-4 gap-3">
        {icons.map((icon, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm transition-colors ${
              active === i ? "bg-white/15 text-white" : "text-neutral-500 hover:text-neutral-300 hover:bg-white/5"
            }`}
          >
            {icon}
          </button>
        ))}
      </div>
      <div className="w-[200px] bg-neutral-800 border-r border-neutral-700 p-4">
        <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">{sections[active].title}</h3>
        <div className="flex flex-col gap-1">
          {sections[active].items.map((item, i) => (
            <button
              key={item}
              className={`text-left px-3 py-2 rounded-md text-sm transition-colors ${
                i === 0 ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <main className="flex-1 bg-white p-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-2">Overview</h2>
        <p className="text-sm text-neutral-500">Main content area with full-width workspace.</p>
      </main>
    </div>
  );
}