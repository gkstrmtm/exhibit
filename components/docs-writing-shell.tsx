/**
 * Docs & Writing Shell
 * Category: App Shells
 * Tags: app-shell, docs, documentation, writing, reading, notion
 * Description: Documentation layout with a hierarchical TOC sidebar, centered narrow reading column with headings and prose, and a fixed table of contents that tracks scroll position.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/docs-writing-shell.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";

const toc = [
  { id: "intro", label: "Introduction", level: 1 },
  { id: "start", label: "Getting Started", level: 1 },
  { id: "install", label: "Installation", level: 2 },
  { id: "config", label: "Configuration", level: 2 },
  { id: "usage", label: "Basic Usage", level: 2 },
  { id: "api", label: "API Reference", level: 1 },
  { id: "components", label: "Components", level: 2 },
  { id: "hooks", label: "Hooks", level: 2 },
  { id: "theming", label: "Theming", level: 1 },
  { id: "deploy", label: "Deployment", level: 1 },
];

export default function DocsWritingShell() {
  const [active, setActive] = useState("intro");

  return (
    <div className="flex min-h-[460px] bg-white border border-neutral-200 rounded-xl overflow-hidden">
      {/* Top Nav */}
      <div className="absolute top-0 left-0 right-0 h-12" />

      {/* Left TOC */}
      <aside className="w-52 border-r border-neutral-100 flex flex-col py-6 flex-shrink-0 bg-white">
        <div className="px-5 mb-4">
          <span className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">Docs</span>
        </div>
        <nav className="flex-1 overflow-auto space-y-0.5 px-3">
          {toc.map(item => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors ${item.level === 2 ? "pl-5 text-xs" : "font-medium text-sm"} ${active === item.id ? "bg-blue-50 text-blue-700" : "text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50"}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Reading Column */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto px-8 py-10">
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
            <span>Docs</span>
            <span>/</span>
            <span className="text-neutral-600">Introduction</span>
          </div>

          <h1 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">Introduction</h1>
          <p className="text-neutral-600 text-base leading-relaxed mb-6">
            Welcome to the documentation. This guide covers everything you need to build production-ready applications — from initial setup to advanced configuration and deployment.
          </p>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-blue-500 font-bold mt-0.5">ℹ</span>
              <div>
                <div className="text-sm font-semibold text-blue-800 mb-1">Prerequisites</div>
                <div className="text-sm text-blue-700">Node.js v18+, a package manager (npm, pnpm, or yarn), and basic knowledge of React.</div>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold text-neutral-900 mb-3 mt-8">What you'll build</h2>
          <p className="text-neutral-600 text-base leading-relaxed mb-4">
            By the end of this guide, you'll have a fully functional app with authentication, a component library, and a deployment pipeline set up.
          </p>

          <div className="bg-neutral-900 rounded-lg p-4 mb-6 font-mono">
            <div className="text-neutral-400 text-xs mb-2"># Install dependencies</div>
            <div className="text-emerald-400 text-sm">npm install @acme/ui framer-motion</div>
            <div className="text-emerald-400 text-sm mt-1">npm run dev</div>
          </div>

          <ul className="space-y-2 mb-6">
            {["Zero-config setup with sensible defaults", "Full TypeScript support out of the box", "Accessible components built on Radix UI", "Tailwind CSS with a custom design system"].map(item => (
              <li key={item} className="flex items-start gap-2 text-sm text-neutral-600">
                <span className="text-emerald-500 mt-0.5 font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
            <span className="text-sm text-neutral-400">← Previous</span>
            <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
              Getting Started <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Mini TOC */}
      <aside className="w-44 border-l border-neutral-100 py-8 px-4 flex-shrink-0 hidden lg:block">
        <div className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-3">On this page</div>
        <nav className="space-y-1">
          {["Overview", "Prerequisites", "What you'll build", "Features"].map(h => (
            <button key={h} className="block w-full text-left text-xs text-neutral-500 hover:text-neutral-800 py-0.5 transition-colors">
              {h}
            </button>
          ))}
        </nav>
      </aside>
    </div>
  );
}