/**
 * Model Comparison Workspace
 * Category: App Shells
 * Tags: assistant, chat, model, comparison, workspace, review, evaluation
 * Description: A model-comparison assistant workspace where the dominant surface is side-by-side response review rather than a generic chat thread.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/model-comparison-workspace.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { ArrowLeftRight, Bot, Check, Columns2, Gauge } from "lucide-react";

const tabs = ["Compare", "Annotations", "Route context"];

const criteria = [
  { label: "Task fit", alpha: "strong", beta: "partial" },
  { label: "Coherence", alpha: "strong", beta: "weak" },
  { label: "State safety", alpha: "good", beta: "missing" },
  { label: "Noise control", alpha: "good", beta: "bloated" },
];

const columns = [
  {
    name: "Model A",
    tag: "recommended",
    copy: "Preserve the two-panel review shell and keep all evaluation criteria inside the comparison plane instead of moving them into summary cards.",
  },
  {
    name: "Model B",
    tag: "needs revision",
    copy: "Adds decorative summaries above the work surface and introduces a duplicate mode dropdown next to visible tabs.",
  },
];

export default function ModelComparisonWorkspace() {
  return (
    <div className="min-h-[620px] overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 text-slate-900">
      <div className="flex min-h-[620px] flex-col">
        <header className="border-b border-slate-200 bg-white px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-slate-500">
                <ArrowLeftRight className="h-3.5 w-3.5" />
                Model comparison
              </div>
              <h2 className="mt-2 text-lg font-semibold text-slate-950">Response review workspace</h2>
            </div>
            <div className="flex items-center gap-2">
              {tabs.map((tab, index) => (
                <button
                  key={tab}
                  className={`h-9 rounded-full px-3 text-xs font-medium ${index === 0 ? "bg-slate-950 text-white" : "border border-slate-300 bg-white text-slate-700"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="grid flex-1 grid-cols-[260px_minmax(0,1fr)]">
          <aside className="border-r border-slate-200 bg-white p-4">
            <div className="rounded-[18px] border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-slate-500">
                <Gauge className="h-3.5 w-3.5" />
                Evaluation frame
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-700">The center of gravity is comparison, not conversation. Side-by-side review gets the most space.</p>
            </div>

            <div className="mt-4 rounded-[18px] border border-slate-200 bg-white p-4">
              <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Review criteria</div>
              <div className="mt-3 space-y-3">
                {criteria.map((item) => (
                  <div key={item.label} className="rounded-[16px] border border-slate-200 bg-slate-50 px-3 py-3 text-sm">
                    <div className="font-medium text-slate-900">{item.label}</div>
                    <div className="mt-2 flex items-center justify-between gap-3 font-mono text-[12px] text-slate-600">
                      <span>A: {item.alpha}</span>
                      <span>B: {item.beta}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <main className="flex min-w-0 flex-col p-5">
            <div className="mb-4 flex items-center justify-between gap-3 rounded-[18px] border border-slate-200 bg-white px-4 py-3">
              <div className="inline-flex items-center gap-2 text-sm text-slate-700">
                <Columns2 className="h-4 w-4 text-slate-500" />
                Compare outputs inside one stable workspace
              </div>
              <button className="h-9 rounded-full border border-slate-300 px-3 text-xs font-medium text-slate-700">Hide notes</button>
            </div>

            <div className="grid flex-1 gap-4 xl:grid-cols-2">
              {columns.map((column, index) => (
                <section key={column.name} className="flex min-h-0 flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-white">
                  <div className="border-b border-slate-200 px-4 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-900">
                        <Bot className="h-4 w-4 text-slate-500" />
                        {column.name}
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] ${index === 0 ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                        {column.tag}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 overflow-auto px-4 py-4">
                    <p className="text-sm leading-7 text-slate-800">{column.copy}</p>
                    <div className="mt-5 rounded-[16px] border border-slate-200 bg-slate-50 px-3 py-3">
                      <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Judgment</div>
                      <div className="mt-2 text-sm text-slate-700">
                        {index === 0 ? "Preserves dominant review surface and avoids redundant controls." : "Needs structural reduction before it is safe to build from."}
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-slate-200 px-4 py-3">
                    <button className={`inline-flex h-9 items-center gap-2 rounded-full px-3 text-xs font-medium ${index === 0 ? "bg-slate-950 text-white" : "border border-slate-300 text-slate-700"}`}>
                      {index === 0 ? <Check className="h-3.5 w-3.5" /> : null}
                      {index === 0 ? "Use as anchor" : "Request revision"}
                    </button>
                  </div>
                </section>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}