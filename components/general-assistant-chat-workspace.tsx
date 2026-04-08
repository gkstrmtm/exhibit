/**
 * General Assistant Chat Workspace
 * Category: App Shells
 * Tags: assistant, chat, llm, workspace, conversation, model-switcher, prompt
 * Description: A restrained assistant workspace with a focused thread, a disciplined history rail, and a strong bottom composer for routing, drafting, and review.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/general-assistant-chat-workspace.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";

const sessions = [
  { title: "Refactor the approvals shell", meta: "active", active: true },
  { title: "Plan a prompt audit flow", meta: "queued", active: false },
  { title: "Design the intake handoff", meta: "review", active: false },
  { title: "Tighten the login posture", meta: "saved", active: false },
];

const modes = ["Route", "Draft", "Inspect"];

const thread = [
  {
    role: "user",
    title: "Current ask",
    body: "I need assistant examples that feel like working software, not a chat toy. The shell should keep the prompt, complaint, and next move coherent.",
  },
  {
    role: "assistant",
    title: "Working read",
    body: "Use a restrained thread, keep the composer powerful, and move durable output into a dedicated artifact surface only when the task truly needs it.",
    chips: ["context retained", "tone inferred", "route narrowed"],
  },
  {
    role: "assistant",
    title: "Recommended default",
    body: "Start with one serious chat workspace for broad problem-solving. Add artifact collaboration only when the user is drafting, reviewing, or approving something durable.",
    chips: ["composer first", "no extra chrome"],
  },
];

const utilities = ["Attach brief", "Search refs", "Open canvas"];

export default function GeneralAssistantChatWorkspace() {
  const [draft, setDraft] = useState("Give me a serious assistant shell with a stronger hierarchy, quieter chrome, and clearer context handling.");
  const [activeMode, setActiveMode] = useState("Route");

  return (
    <div className="min-h-[540px] overflow-hidden rounded-[30px] border border-slate-200 bg-[linear-gradient(180deg,#fbfcff_0%,#f3f6fb_100%)] text-slate-900 shadow-[0_28px_90px_rgba(15,23,42,0.08)]">
      <div className="grid min-h-[540px] grid-cols-[236px_minmax(0,1fr)]">
        <aside className="border-r border-slate-200 bg-[#eef3f8] p-4">
          <button className="w-full rounded-[22px] bg-slate-950 px-4 py-3 text-left text-sm font-medium text-white">
            New thread
          </button>

          <div className="mt-4 rounded-[20px] border border-slate-200 bg-white px-3 py-3">
            <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">History</div>
            <div className="mt-2 text-sm text-slate-600">Search, pin, and resume without flooding the workspace.</div>
          </div>

          <div className="mt-4 space-y-2">
            {sessions.map((session) => (
              <button
                key={session.title}
                className={`w-full rounded-[20px] border px-3 py-3 text-left transition-colors ${session.active ? "border-slate-900 bg-white" : "border-transparent bg-white/55 hover:border-slate-200 hover:bg-white"}`}
              >
                <div className="text-sm font-medium text-slate-900">{session.title}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-slate-500">{session.meta}</div>
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-[22px] border border-slate-200 bg-white/85 p-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Session memory</div>
            <div className="mt-3 space-y-3 text-sm text-slate-700">
              <div className="rounded-2xl bg-slate-50 px-3 py-3">Treat internal employee surfaces as serious systems first.</div>
              <div className="rounded-2xl bg-slate-50 px-3 py-3">Use icons as secondary cues, not primary personality.</div>
            </div>
          </div>
        </aside>

        <main className="flex min-w-0 flex-col">
          <header className="border-b border-slate-200 px-6 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">General assistant</div>
                <h2 className="mt-1 text-lg font-semibold text-slate-950">Problem-solving workspace</h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700">GPT-5.4</span>
                {modes.map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setActiveMode(mode)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${activeMode === mode ? "bg-slate-950 text-white" : "border border-slate-300 bg-white text-slate-700"}`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </header>

          <div className="border-b border-slate-200 px-6 py-4">
            <div className="grid gap-3 md:grid-cols-3">
              {[
                { label: "Context", value: "attached" },
                { label: "Route", value: "assistant-workspace" },
                { label: "Current mode", value: activeMode.toLowerCase() },
              ].map((item) => (
                <div key={item.label} className="rounded-[18px] border border-slate-200 bg-white px-4 py-3">
                  <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">{item.label}</div>
                  <div className="mt-2 text-sm font-medium text-slate-900">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-auto px-6 py-6">
            <div className="mx-auto flex max-w-3xl flex-col gap-4">
              {thread.map((message) => (
                <div
                  key={message.title}
                  className={`rounded-[24px] border px-5 py-4 ${message.role === "assistant" ? "border-slate-200 bg-white" : "border-slate-300 bg-[#edf3f9]"}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{message.title}</div>
                    <span className="rounded-full border border-slate-200 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-500">{message.role}</span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-800">{message.body}</p>
                  {message.chips ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {message.chips.map((chip) => (
                        <span key={chip} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-slate-600">
                          {chip}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 px-6 py-5">
            <div className="mx-auto max-w-3xl rounded-[28px] border border-slate-300 bg-white p-3 shadow-[0_14px_32px_rgba(15,23,42,0.05)]">
              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                className="min-h-[110px] w-full resize-none bg-transparent px-2 py-2 text-sm leading-7 text-slate-800 outline-none placeholder:text-slate-400"
                placeholder="Describe the screen, the complaint, and the exact output you need."
              />
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-2 pt-3">
                <div className="flex flex-wrap gap-2">
                  {utilities.map((item) => (
                    <button key={item} className="h-9 rounded-full border border-slate-300 px-3 text-xs font-medium text-slate-700">
                      {item}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button className="h-9 rounded-full border border-slate-300 px-3 text-xs font-medium text-slate-700">Tune</button>
                  <button className="h-9 rounded-full bg-slate-950 px-4 text-xs font-semibold text-white">Send prompt</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}