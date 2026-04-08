/**
 * Assistant Workspace Empty
 * Category: Empty States
 * Tags: assistant, empty, workspace, zero state, honest scaffold, chat
 * Description: An honest zero-state assistant workspace that preserves the real shell and offers minimal route-aware starting paths without fake metrics or filler panels.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/assistant-workspace-empty.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { FilePlus2, Search, Sparkles } from "lucide-react";

const starts = [
  { label: "Route a new request", meta: "classify surface and pick shell" },
  { label: "Open an artifact workspace", meta: "draft, revise, or approve durable output" },
  { label: "Compare model responses", meta: "review side by side before building" },
];

const safeStartingMoves = [
  { icon: Search, text: "Ask what the user is trying to finish before adding a second pane." },
  { icon: FilePlus2, text: "Promote artifacts only when the output needs to persist or be reviewed." },
  { icon: Sparkles, text: "Avoid fake summaries, canned KPIs, and decorative trust filler." },
];

export default function AssistantWorkspaceEmpty() {
  return (
    <div className="h-[430px] overflow-hidden rounded-[24px] border border-slate-200 bg-white text-slate-900">
      <div className="grid h-full grid-cols-[196px_minmax(0,1fr)_252px]">
        <aside className="flex flex-col gap-4 border-r border-slate-200 p-4">
          <button className="w-full rounded-full bg-slate-950 px-4 py-2.5 text-left text-sm font-medium text-white">
            New workspace
          </button>
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">No active threads</div>
            <p className="mt-2 text-[12px] leading-[1.5] text-slate-500">
              The shell stays visible even with no history so users can understand the workspace before content arrives.
            </p>
          </div>
        </aside>

        <main className="flex flex-col overflow-hidden border-r border-slate-200">
          <header className="border-b border-slate-200 px-5 py-4">
            <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">Assistant workspace</div>
            <h2 className="mt-1.5 text-[15px] font-semibold text-slate-950">Start from the real job, not from a blank chat toy</h2>
          </header>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            <div className="space-y-2">
              {starts.map((item, index) => (
                <button
                  key={item.label}
                  className={`w-full rounded-xl border px-4 py-3 text-left ${
                    index === 0
                      ? "border-slate-950 bg-slate-950 text-white"
                      : "border-slate-200 bg-white text-slate-900"
                  }`}
                >
                  <div className="text-[13px] font-medium leading-none">{item.label}</div>
                  <div className={`mt-1 text-[11px] ${index === 0 ? "text-slate-400" : "text-slate-500"}`}>
                    {item.meta}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </main>

        <aside className="flex flex-col gap-4 bg-slate-50 p-4">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">Safe starting moves</div>
            <div className="mt-3 space-y-2">
              {safeStartingMoves.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
                  <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                  <span className="text-[12px] leading-[1.5] text-slate-600">{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-3">
            <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">Context rail</div>
            <p className="mt-2 text-[12px] leading-[1.5] text-slate-500">
              Reserved for the prompt, complaint, or routed evidence once the user provides it.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}