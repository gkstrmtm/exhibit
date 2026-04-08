/**
 * Assistant Triage Queue Shell
 * Category: App Shells
 * Tags: assistant, queue, triage, operations, review, prompt, llm
 * Description: A queue-first assistant operations shell for reviewing incoming asks, preserving context, and routing work without drifting into dashboard-card clutter.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/assistant-triage-queue-shell.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { ArrowRight, Bot, Clock3, Filter, Flag, Search } from "lucide-react";

const views = [
  { label: "Needs routing", count: "18", active: true },
  { label: "Awaiting truth", count: "7", active: false },
  { label: "Ready to build", count: "12", active: false },
];

const rows = [
  {
    title: "Refactor the assistant shell for policy review",
    actor: "Internal design ops",
    route: "assistant_workspace",
    risk: "missing mutation model",
    age: "4m",
    state: "triage",
  },
  {
    title: "Tighten the fulfillment queue handoff view",
    actor: "Support lead",
    route: "operational_workbench",
    risk: "duplicate controls",
    age: "11m",
    state: "review",
  },
  {
    title: "Decide whether the onboarding flow needs a second rail",
    actor: "Product design",
    route: "onboarding_flow",
    risk: "shell too broad",
    age: "23m",
    state: "caution",
  },
  {
    title: "Route a vague complaint about the dashboard feeling weak",
    actor: "Growth ops",
    route: "unknown",
    risk: "surface unclear",
    age: "29m",
    state: "ask first",
  },
];

const detail = [
  { label: "Primary object", value: "assistant request" },
  { label: "Dominant task", value: "queue triage" },
  { label: "Confidence mode", value: "proceed_with_cautions" },
  { label: "Suggested shell", value: "queue_first_shell" },
];

function stateClasses(state: string) {
  switch (state) {
    case "review":
      return "border-amber-200 bg-amber-50 text-amber-700";
    case "caution":
      return "border-orange-200 bg-orange-50 text-orange-700";
    case "ask first":
      return "border-red-200 bg-red-50 text-red-700";
    default:
      return "border-slate-200 bg-slate-100 text-slate-700";
  }
}

export default function AssistantTriageQueueShell() {
  return (
    <div className="h-[520px] overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50 text-slate-900">
      <div className="grid h-full grid-cols-[212px_minmax(0,1fr)_284px]">
        <aside className="border-r border-slate-200 bg-white p-4">
          <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-slate-500">
              <Bot className="h-3.5 w-3.5" />
              Assistant ops
            </div>
            <h2 className="mt-3 text-base font-semibold text-slate-950">Routing inventory</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Treat incoming asks as work items first. Summaries stay subordinate to the queue.</p>
          </div>

          <div className="mt-4 space-y-2">
            {views.map((view) => (
              <button
                key={view.label}
                className={`flex w-full items-center justify-between rounded-[18px] border px-3 py-3 text-left text-sm ${view.active ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-700"}`}
              >
                <span>{view.label}</span>
                <span className={`font-mono text-[12px] ${view.active ? "text-slate-200" : "text-slate-500"}`}>{view.count}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-[20px] border border-slate-200 bg-white p-4">
            <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Failure watch</div>
            <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-700">
              <li>No summary cards above the queue.</li>
              <li>No duplicate route selector beside visible tabs.</li>
              <li>No invented metrics when request truth is thin.</li>
            </ul>
          </div>
        </aside>

        <main className="flex min-w-0 flex-col bg-white">
          <header className="border-b border-slate-200 px-5 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Assistant triage</div>
                <h3 className="mt-1 text-lg font-semibold text-slate-950">Queue-first routing shell</h3>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button className="inline-flex h-9 items-center gap-2 rounded-full border border-slate-300 px-3 text-xs font-medium text-slate-700">
                  <Search className="h-3.5 w-3.5" />
                  Search asks
                </button>
                <button className="inline-flex h-9 items-center gap-2 rounded-full border border-slate-300 px-3 text-xs font-medium text-slate-700">
                  <Filter className="h-3.5 w-3.5" />
                  Filters
                </button>
                <button className="h-9 rounded-full bg-slate-950 px-4 text-xs font-semibold text-white">Route selected</button>
              </div>
            </div>
          </header>

          <div className="border-b border-slate-200 px-5 py-3">
            <div className="grid gap-3 md:grid-cols-4">
              {[
                { label: "Open", value: "37" },
                { label: "With risks", value: "11" },
                { label: "Ask for truth", value: "7" },
                { label: "Avg route time", value: "08:14" },
              ].map((item) => (
                <div key={item.label} className="rounded-[16px] border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">{item.label}</div>
                  <div className="mt-2 font-mono text-sm font-medium text-slate-900">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-auto p-5">
            <div className="overflow-hidden rounded-[20px] border border-slate-200">
              <div className="grid grid-cols-[minmax(0,1.4fr)_160px_170px_90px_120px] border-b border-slate-200 bg-slate-50 px-4 py-3 text-[11px] uppercase tracking-[0.16em] text-slate-500">
                <div>Request</div>
                <div>Actor</div>
                <div>Route signal</div>
                <div>Age</div>
                <div>State</div>
              </div>
              {rows.map((row) => (
                <div key={row.title} className="grid grid-cols-[minmax(0,1.4fr)_160px_170px_90px_120px] items-center border-b border-slate-200 px-4 py-4 text-sm last:border-b-0">
                  <div className="min-w-0 pr-4">
                    <div className="truncate font-medium text-slate-900">{row.title}</div>
                    <div className="mt-1 truncate text-slate-500">Risk: {row.risk}</div>
                  </div>
                  <div className="pr-4 text-slate-600">{row.actor}</div>
                  <div className="pr-4 font-mono text-[12px] text-slate-700">{row.route}</div>
                  <div className="inline-flex items-center gap-2 font-mono text-[12px] text-slate-600">
                    <Clock3 className="h-3.5 w-3.5 text-slate-400" />
                    {row.age}
                  </div>
                  <div>
                    <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] ${stateClasses(row.state)}`}>
                      {row.state}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        <aside className="border-l border-slate-200 bg-slate-50 p-4">
          <div className="rounded-[22px] border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Selected ask</div>
                <h4 className="mt-1 text-base font-semibold text-slate-950">Policy review assistant shell</h4>
              </div>
              <Flag className="h-4 w-4 text-amber-600" />
            </div>

            <div className="mt-4 space-y-3">
              {detail.map((item) => (
                <div key={item.label} className="rounded-[16px] border border-slate-200 bg-slate-50 px-3 py-3">
                  <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">{item.label}</div>
                  <div className="mt-2 text-sm font-medium text-slate-900">{item.value}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-[16px] border border-amber-200 bg-amber-50 px-3 py-3 text-sm leading-6 text-amber-900">
              Avoid inventing approval actions until the downstream mutation model is confirmed.
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button className="h-9 rounded-full border border-slate-300 px-3 text-xs font-medium text-slate-700">Ask for truth</button>
              <button className="inline-flex h-9 items-center gap-2 rounded-full bg-slate-950 px-4 text-xs font-semibold text-white">
                Route now
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}