/**
 * Artifact Collaboration Shell
 * Category: App Shells
 * Tags: assistant, artifact, llm, workspace, writing, review, draft
 * Description: A disciplined assistant workspace with a slim conversation lane, preserved working assumptions, and a durable artifact pane for structured drafting.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/artifact-collaboration-shell.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";

const threads = [
  { label: "Policy rewrite", meta: "drafting", active: true },
  { label: "Prompt triage", meta: "queued", active: false },
  { label: "Design guardrails", meta: "review", active: false },
];

const checkpoints = [
  "Hold the user's complaint and the current route in one place.",
  "Keep the chat lane narrow so the artifact remains primary.",
  "Use approval language only when the next move changes the artifact.",
];

const outline = [
  { label: "Working brief", state: "locked" },
  { label: "Foundation pass", state: "active" },
  { label: "Revision notes", state: "next" },
  { label: "Approval scope", state: "queued" },
];

const revisions = [
  { label: "Type scale tightened", meta: "2 min ago" },
  { label: "Artifact rail promoted", meta: "6 min ago" },
  { label: "Warm filler panels removed", meta: "12 min ago" },
];

export default function ArtifactCollaborationShell() {
  const [draft, setDraft] = useState(
    "Primary shell: keep conversation in a narrow lane, let the artifact hold the real work, and use restrained utility language throughout.",
  );

  return (
    <div className="min-h-[560px] overflow-hidden rounded-[32px] border border-slate-200 bg-[linear-gradient(180deg,#fbfcfe_0%,#f2f5f9_100%)] text-slate-900 shadow-[0_32px_90px_rgba(15,23,42,0.08)]">
      <div className="grid min-h-[560px] grid-cols-[220px_minmax(0,1fr)_360px]">
        <aside className="border-r border-slate-200 bg-[#eef2f7] p-4">
          <div className="rounded-[22px] border border-slate-300 bg-white px-3 py-3">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Active thread</div>
            <div className="mt-1 text-sm font-semibold text-slate-900">Employee access rewrite</div>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
              <span className="rounded-full bg-slate-900 px-2 py-1 text-white">route locked</span>
              <span>artifact-first</span>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {threads.map((thread) => (
              <button
                key={thread.label}
                className={`w-full rounded-[20px] border px-3 py-3 text-left transition-colors ${thread.active ? "border-slate-900 bg-white" : "border-transparent bg-white/55 hover:border-slate-200 hover:bg-white"}`}
              >
                <div className="text-sm font-medium text-slate-900">{thread.label}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-slate-500">{thread.meta}</div>
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-[22px] border border-slate-200 bg-white/80 p-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Working assumptions</div>
            <div className="mt-3 space-y-3 text-sm text-slate-700">
              {checkpoints.map((item) => (
                <div key={item} className="rounded-2xl bg-slate-50 px-3 py-3 leading-6">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </aside>

        <section className="flex min-w-0 flex-col border-r border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(248,250,252,0.96))]">
          <header className="border-b border-slate-200 px-6 py-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Artifact collaboration</div>
            <div className="mt-2 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">Conversation supports the draft</h2>
                <p className="mt-1 text-sm text-slate-600">The lane stays compact so the durable output can carry the work.</p>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.14em] text-slate-500">
                <span className="rounded-full border border-slate-300 bg-white px-3 py-1.5">review ready</span>
                <span className="rounded-full border border-slate-300 bg-white px-3 py-1.5">context retained</span>
              </div>
            </div>
          </header>

          <div className="border-b border-slate-200 px-6 py-4">
            <div className="grid gap-3 md:grid-cols-3">
              {[
                { label: "Route", value: "assistant-workspace" },
                { label: "Tone", value: "serious internal" },
                { label: "Artifact", value: "foundation brief" },
              ].map((item) => (
                <div key={item.label} className="rounded-[20px] border border-slate-200 bg-white px-4 py-3">
                  <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">{item.label}</div>
                  <div className="mt-2 text-sm font-medium text-slate-900">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-auto px-6 py-6">
            <div className="mx-auto flex max-w-2xl flex-col gap-4">
              <div className="rounded-[24px] border border-slate-200 bg-white px-5 py-4 shadow-[0_16px_30px_rgba(15,23,42,0.04)]">
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">User brief</div>
                <p className="mt-3 text-sm leading-7 text-slate-800">
                  This assistant surface should route complaints and preserve context, but it cannot feel like a soft landing page or a wall of helper copy.
                </p>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-[#f4f7fb] px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Assistant move</div>
                  <span className="rounded-full bg-slate-900 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-white">foundation pass</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-800">
                  Reduce the shell to three durable ideas: preserved brief, active draft, and one clear revision lane. Everything else should prove its value.
                </p>
              </div>

              <div className="rounded-[24px] border border-dashed border-slate-300 bg-white px-5 py-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Reply or revision ask</div>
                <textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  className="mt-3 min-h-[132px] w-full resize-none bg-transparent text-sm leading-7 text-slate-800 outline-none placeholder:text-slate-400"
                  placeholder="Describe the next revision, approval, or artifact change."
                />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 px-6 py-4">
            <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 rounded-[22px] border border-slate-300 bg-white px-4 py-3">
              <div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Next action</div>
                <div className="mt-1 text-sm text-slate-700">Approve foundation, request revision, or send the artifact onward.</div>
              </div>
              <button className="rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold text-white">Send</button>
            </div>
          </div>
        </section>

        <aside className="bg-[#f7f9fc] p-4">
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_38px_rgba(15,23,42,0.05)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Artifact</div>
                <h3 className="mt-1 text-base font-semibold text-slate-950">Internal access foundation</h3>
              </div>
              <span className="rounded-full border border-slate-300 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-600">draft v3</span>
            </div>

            <div className="mt-5 space-y-2">
              {outline.map((section) => (
                <div
                  key={section.label}
                  className={`flex items-center justify-between rounded-[18px] px-3 py-3 text-sm ${section.state === "active" ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-700"}`}
                >
                  <span>{section.label}</span>
                  <span className={`text-[10px] uppercase tracking-[0.14em] ${section.state === "active" ? "text-slate-300" : "text-slate-500"}`}>{section.state}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-[22px] border border-slate-200 bg-[#f8fafc] p-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Active section</div>
              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                className="mt-3 min-h-[168px] w-full resize-none bg-transparent text-sm leading-7 text-slate-800 outline-none"
              />
            </div>

            <div className="mt-5 rounded-[22px] border border-slate-200 p-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Recent changes</div>
              <div className="mt-3 space-y-3">
                {revisions.map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-700">{item.label}</span>
                    <span className="text-[11px] uppercase tracking-[0.14em] text-slate-500">{item.meta}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}