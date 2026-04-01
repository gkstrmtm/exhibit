/**
 * IDE Three-Panel Shell
 * Category: App Shells
 * Tags: app-shell, ide, dark, editor, three-panel, vscode
 * Description: VS Code-style dark three-panel layout: collapsible file explorer on the left, tabbed code editor in the center, and output/inspector panel on the right.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/ide-three-panel-shell.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";

const files = [
  { name: "src", type: "folder", children: ["App.tsx", "index.tsx", "styles.css"] },
  { name: "public", type: "folder", children: ["favicon.ico", "index.html"] },
  { name: "package.json", type: "file" },
  { name: "tsconfig.json", type: "file" },
];

const sampleCode = `import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col
      items-center justify-center
      min-h-screen">
      <h1 className="text-2xl font-bold">
        Count: {count}
      </h1>
      <button
        onClick={() => setCount(c => c + 1)}
        className="mt-4 px-4 py-2 bg-blue-600
          text-white rounded-md"
      >
        Increment
      </button>
    </div>
  );
}`;

export default function IDEThreePanelShell() {
  const [activeTab, setActiveTab] = useState("App.tsx");
  const [openFolder, setOpenFolder] = useState("src");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const tabs = ["App.tsx", "index.tsx", "styles.css"];

  return (
    <div className="flex min-h-[460px] bg-[#1e1e1e] text-[#d4d4d4] font-mono text-xs overflow-hidden rounded-lg">
      {/* Activity Bar */}
      <div className="w-10 bg-[#333333] flex flex-col items-center py-3 gap-4 border-r border-[#3c3c3c]">
        {["◈", "⊞", "⌕", "◎", "⚙"].map((icon, i) => (
          <button
            key={i}
            onClick={() => i === 0 && setSidebarOpen(o => !o)}
            className={`w-8 h-8 flex items-center justify-center rounded text-[16px] transition-colors ${i === 0 ? "text-white" : "text-[#858585] hover:text-[#cccccc]"}`}
          >
            {icon}
          </button>
        ))}
      </div>

      {/* File Explorer */}
      {sidebarOpen && (
        <div className="w-48 bg-[#252526] border-r border-[#3c3c3c] flex flex-col">
          <div className="px-3 py-2 text-[10px] font-semibold text-[#bbb] uppercase tracking-wider">Explorer</div>
          <div className="flex-1 overflow-auto">
            {files.map(f => (
              <div key={f.name}>
                <button
                  onClick={() => f.type === "folder" && setOpenFolder(openFolder === f.name ? "" : f.name)}
                  className="w-full flex items-center gap-1.5 px-3 py-1 text-[#cccccc] hover:bg-[#2a2d2e] text-left"
                >
                  <span className="text-[10px]">{f.type === "folder" ? (openFolder === f.name ? "▾" : "▸") : ""}</span>
                  <span className="text-[10px]">{f.type === "folder" ? "📁" : "📄"}</span>
                  <span className="text-xs">{f.name}</span>
                </button>
                {f.type === "folder" && openFolder === f.name && f.children?.map(child => (
                  <button
                    key={child}
                    onClick={() => setActiveTab(child)}
                    className={`w-full flex items-center gap-1.5 pl-8 pr-3 py-1 text-left text-xs transition-colors ${activeTab === child ? "bg-[#37373d] text-white" : "text-[#9d9d9d] hover:bg-[#2a2d2e]"}`}
                  >
                    <span className="text-[10px]">📄</span>
                    {child}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Editor */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Tabs */}
        <div className="flex items-center bg-[#1e1e1e] border-b border-[#3c3c3c] overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-4 py-2 text-xs whitespace-nowrap border-r border-[#3c3c3c] transition-colors ${activeTab === tab ? "bg-[#1e1e1e] text-white border-t border-t-[#007acc]" : "bg-[#2d2d2d] text-[#7e7e7e] hover:text-[#cccccc]"}`}
            >
              {tab}
              <span className="text-[#7e7e7e] hover:text-white text-[10px]">×</span>
            </button>
          ))}
        </div>
        {/* Code area */}
        <div className="flex-1 overflow-auto p-4 bg-[#1e1e1e]">
          <div className="flex gap-4">
            <div className="flex flex-col text-right text-[#858585] select-none min-w-[2rem]">
              {sampleCode.split("\n").map((_, i) => (
                <span key={i} className="leading-6 text-[11px]">{i + 1}</span>
              ))}
            </div>
            <pre className="flex-1 text-[#d4d4d4] text-[11px] leading-6 overflow-x-auto">
              <code>{sampleCode}</code>
            </pre>
          </div>
        </div>
        {/* Status Bar */}
        <div className="flex items-center justify-between bg-[#007acc] px-4 py-0.5 text-[11px] text-white">
          <div className="flex items-center gap-4">
            <span>⎇ main</span>
            <span>◎ 0 ⚠ 0</span>
          </div>
          <div className="flex items-center gap-4">
            <span>TypeScript React</span>
            <span>UTF-8</span>
            <span>Ln 1, Col 1</span>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-52 bg-[#252526] border-l border-[#3c3c3c] flex flex-col">
        <div className="px-3 py-2 text-[10px] font-semibold text-[#bbb] uppercase tracking-wider border-b border-[#3c3c3c]">Output</div>
        <div className="flex-1 p-3 text-[11px] leading-5 text-[#4ec9b0]">
          <div>▸ Starting dev server...</div>
          <div className="text-[#9cdcfe]">  vite v5.0.0</div>
          <div className="text-[#4ec9b0]">  ✓ ready in 312ms</div>
          <div className="text-[#858585] mt-2">Local: http://localhost:5173</div>
          <div className="text-[#858585]">Network: http://192.168.1.5</div>
        </div>
      </div>
    </div>
  );
}