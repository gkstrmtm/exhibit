/**
 * Dark VS Code Shell
 * Category: App Shells
 * Tags: app-shell, dark, editor, vscode, code, monospace
 * Description: Minimal dark editor shell inspired by VS Code: collapsible sidebar with file icons, tabbed editor with active file indicator, line-numbered code area, and a blue status bar.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/dark-vscode-shell.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";

const fileTree = [
  { name: "components", type: "folder", depth: 0 },
  { name: "Button.tsx", type: "file", depth: 1, ext: "tsx" },
  { name: "Card.tsx", type: "file", depth: 1, ext: "tsx" },
  { name: "Modal.tsx", type: "file", depth: 1, ext: "tsx" },
  { name: "hooks", type: "folder", depth: 0 },
  { name: "useAuth.ts", type: "file", depth: 1, ext: "ts" },
  { name: "useTheme.ts", type: "file", depth: 1, ext: "ts" },
  { name: "index.tsx", type: "file", depth: 0, ext: "tsx" },
  { name: "tailwind.config.ts", type: "file", depth: 0, ext: "ts" },
];

const extColors: Record<string, string> = {
  tsx: "#61afef",
  ts: "#c678dd",
  js: "#e5c07b",
  css: "#56b6c2",
};

const code = `import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center",
        "rounded-md font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2",
        {
          default: "bg-primary text-primary-fg",
          ghost: "hover:bg-accent hover:text-accent-fg",
          outline: "border border-input hover:bg-accent",
        }[variant],
        { sm: "h-8 px-3 text-xs", md: "h-9 px-4 text-sm",
          lg: "h-11 px-6 text-base" }[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}`;

export default function DarkVscodeShell() {
  const [activeFile, setActiveFile] = useState("Button.tsx");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openFolders, setOpenFolders] = useState(["components"]);
  const tabs = ["Button.tsx", "Card.tsx", "useAuth.ts"];

  const toggleFolder = (name: string) =>
    setOpenFolders(prev => prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]);

  const isVisible = (item: typeof fileTree[0]) => {
    if (item.depth === 0) return true;
    const parentFolder = fileTree.slice(0, fileTree.indexOf(item)).reverse().find(f => f.type === "folder" && f.depth === 0);
    return parentFolder ? openFolders.includes(parentFolder.name) : true;
  };

  const lines = code.split("\n");

  return (
    <div className="flex min-h-[460px] bg-[#282c34] text-[#abb2bf] font-mono text-xs rounded-xl overflow-hidden border border-[#3e4451]">
      {/* Sidebar toggle strip */}
      <div className="w-10 bg-[#21252b] flex flex-col items-center py-3 gap-4 border-r border-[#3e4451]">
        <button onClick={() => setSidebarOpen(o => !o)} title="Toggle Explorer" className="w-7 h-7 flex items-center justify-center text-base text-[#abb2bf] hover:text-white transition-colors rounded">
          ◈
        </button>
        {["⌕", "⎇", "◎", "⚙"].map((icon, i) => (
          <span key={i} className="text-base text-[#4b5263] hover:text-[#abb2bf] cursor-pointer transition-colors">{icon}</span>
        ))}
      </div>

      {/* File tree */}
      {sidebarOpen && (
        <div className="w-44 bg-[#21252b] border-r border-[#3e4451] flex flex-col">
          <div className="px-3 py-2 text-[9px] uppercase tracking-widest text-[#5c6370] font-sans font-semibold border-b border-[#3e4451]">Explorer</div>
          <div className="flex-1 overflow-auto py-1">
            {fileTree.filter(isVisible).map((item, i) => (
              <div
                key={i}
                onClick={() => item.type === "folder" ? toggleFolder(item.name) : setActiveFile(item.name)}
                style={{ paddingLeft: `${item.depth * 12 + 10}px` }}
                className={`flex items-center gap-1.5 py-1 pr-3 cursor-pointer transition-colors ${item.name === activeFile ? "bg-[#2c313c] text-white" : "text-[#9da5b4] hover:bg-[#2c313a] hover:text-[#d7dae0]"}`}
              >
                {item.type === "folder" ? (
                  <>
                    <span className="text-[10px] text-[#5c6370]">{openFolders.includes(item.name) ? "▾" : "▸"}</span>
                    <span className="text-amber-400/80 text-[12px]">📁</span>
                    <span className="text-xs">{item.name}</span>
                  </>
                ) : (
                  <>
                    <span className="text-[10px] text-transparent">▸</span>
                    <span className="text-[12px]">📄</span>
                    <span className="text-xs" style={{ color: item.ext ? extColors[item.ext] || "#abb2bf" : "#abb2bf" }}>{item.name}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Editor pane */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Tabs */}
        <div className="flex items-center bg-[#21252b] border-b border-[#3e4451] overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveFile(tab)}
              className={`flex items-center gap-2 px-4 py-2 text-[11px] whitespace-nowrap border-r border-[#3e4451] transition-colors ${activeFile === tab ? "bg-[#282c34] text-white border-t-2 border-t-[#61afef]" : "text-[#5c6370] hover:text-[#9da5b4] bg-[#21252b]"}`}
            >
              <span style={{ color: extColors[tab.split(".").pop() || ""] || "#abb2bf" }}>●</span>
              {tab}
            </button>
          ))}
        </div>

        {/* Code area */}
        <div className="flex-1 overflow-auto p-4">
          <div className="flex gap-4">
            <div className="text-right text-[#4b5263] select-none min-w-[2rem]">
              {lines.map((_, i) => (
                <div key={i} className="leading-[1.6] text-[11px]">{i + 1}</div>
              ))}
            </div>
            <pre className="flex-1 leading-[1.6] text-[11px] overflow-x-auto">
              {lines.map((line, i) => {
                const colored = line
                  .replace(/(import|export|from|interface|extends|return|function|const|let|type)/g, '<kw>$1</kw>')
                  .replace(/("[^"]*")/g, '<str>$1</str>');
                return (
                  <div key={i} className="hover:bg-[#2c313c] px-1 rounded">
                    {line.includes("import") || line.includes("export") || line.includes("return") || line.includes("const") || line.includes("interface") ? (
                      <span className="text-[#c678dd]">{line.split(" ")[0]} </span>
                    ) : null}
                    <span className="text-[#abb2bf]">{line.includes(" ") ? line.slice(line.indexOf(" ") + (["import","export","return","const","interface"].some(k => line.startsWith(k)) ? 1 : 0)) : (["import","export","return","const","interface"].some(k => line.startsWith(k)) ? "" : line)}</span>
                  </div>
                );
              })}
            </pre>
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between bg-[#61afef] px-4 py-0.5 text-[10px] text-white font-sans flex-shrink-0">
          <div className="flex items-center gap-3">
            <span>⎇ main</span>
            <span>◎ 0 errors</span>
            <span>⚠ 0 warnings</span>
          </div>
          <div className="flex items-center gap-3">
            <span>TypeScript JSX</span>
            <span>UTF-8</span>
            <span>Spaces: 2</span>
            <span>Ln 1, Col 1</span>
          </div>
        </div>
      </div>
    </div>
  );
}