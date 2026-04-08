/**
 * Agent Thread Nav
 * Category: Communication
 * Tags: agent, chat, thread, tabs, ai, assistant, navigation, intro, greeting
 * Description: Horizontal thread-picker rail at the top with a greeting intro card for new
 * threads. Each chip shows the thread name, agent assignment, and unread count. Selecting a
 * new thread surfaces the agent intro — name, role, and three starter prompts that fill the
 * composer on click. Existing threads show the live conversation below. Handles new, active,
 * unread, and sending states. Mobile-responsive: rail scrolls horizontally, composer stacks.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/agent-thread-nav.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useCallback, useState } from "react";
import { ChevronRight, Plus, Send } from "lucide-react";

// ─── types ────────────────────────────────────────────────────────────────────

type ThreadStatus = "new" | "active" | "unread";

type Thread = {
  id: number;
  label: string;
  agentName: string;
  agentRole: string;
  status: ThreadStatus;
  unread?: number;
};

type Message = {
  role: "user" | "assistant";
  text: string;
  time: string;
};

// ─── data ─────────────────────────────────────────────────────────────────────

const threads: Thread[] = [
  { id: 1, label: "Auth refactor plan", agentName: "Ora", agentRole: "Planning",  status: "active"           },
  { id: 2, label: "Prompt audit",       agentName: "Vex", agentRole: "Analysis",  status: "unread", unread: 2 },
  { id: 3, label: "Design brief",       agentName: "Ora", agentRole: "Planning",  status: "active"           },
  { id: 4, label: "New thread",         agentName: "Ora", agentRole: "Planning",  status: "new"              },
];

const starters = [
  "Help me plan a feature from scratch",
  "Review my current approach and find gaps",
  "Draft a brief I can hand off to an engineer",
];

const seedMessages = new Map<number, Message[]>([
  [1, [
    { role: "assistant", text: "Route-level auth guards should own the access decision — not the component. If a component is asking 'can I render?', the guard already missed it.", time: "3:14 PM" },
    { role: "user",      text: "Makes sense. Where does token refresh fit?", time: "3:15 PM" },
    { role: "assistant", text: "Token refresh lives in the HTTP interceptor, not the guard. The guard locks the door; the interceptor keeps the key fresh. They should not know about each other.", time: "3:15 PM" },
  ]],
  [2, [
    { role: "assistant", text: "Found 4 coherence issues in your funnel prompts. The confirm state in steps 3 and 5 use different language for the same action — that's the highest-priority fix.", time: "2:41 PM" },
    { role: "user",      text: "Can you list all four?", time: "2:42 PM" },
  ]],
  [3, [
    { role: "assistant", text: "Draft brief is ready. I kept it to one page — goal, constraints, success criteria. Let me know if you want a technical dependencies section added.", time: "1:06 PM" },
  ]],
]);

// ─── component ────────────────────────────────────────────────────────────────

export default function AgentThreadNav() {
  const [activeId, setActiveId] = useState<number>(4); // start on "New thread"
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);

  const activeThread = threads.find((t) => t.id === activeId)!;
  const messages = seedMessages.get(activeId) ?? [];
  const isNew = activeThread.status === "new";

  const handleSend = useCallback(async () => {
    if (!draft.trim() || sending) return;
    setSending(true);
    await new Promise<void>((r) => setTimeout(r, 600));
    setSending(false);
    setDraft("");
  }, [draft, sending]);

  return (
    <div className="flex min-h-[520px] w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">

      {/* ── thread rail ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-slate-100 bg-slate-50 px-3 py-2 [scrollbar-width:none]">
        {threads.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveId(t.id)}
            className={`relative inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors ${
              t.id === activeId
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            {t.status === "new" ? (
              <>
                <Plus className="h-3 w-3" />
                New thread
              </>
            ) : (
              <>
                {t.label}
                {t.status === "unread" && t.unread ? (
                  <span className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[9px] font-bold text-white">
                    {t.unread}
                  </span>
                ) : null}
              </>
            )}
          </button>
        ))}
      </div>

      {/* ── content ─────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* new thread: agent intro card */}
        {isNew ? (
          <div className="flex flex-1 flex-col items-center justify-center px-5 py-10">
            <div className="w-full max-w-md">

              {/* agent identity */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[13px] font-bold text-white">
                  {activeThread.agentName[0]}
                </div>
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
                    {activeThread.agentRole} agent
                  </div>
                  <div className="text-[15px] font-semibold text-slate-900">
                    Hi, I'm {activeThread.agentName}
                  </div>
                </div>
              </div>

              <p className="mt-4 text-[13px] leading-relaxed text-slate-500">
                I can help you plan, break down a brief, review your approach, or prepare a spec for handoff. What are we working on?
              </p>

              {/* starter prompts */}
              <div className="mt-5 space-y-2">
                {starters.map((s) => (
                  <button
                    key={s}
                    onClick={() => setDraft(s)}
                    className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-left text-[13px] text-slate-700 transition-colors hover:border-slate-300 hover:bg-white active:bg-slate-100"
                  >
                    {s}
                    <ChevronRight className="ml-2 h-3.5 w-3.5 shrink-0 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* existing thread: messages */
          <div className="flex-1 space-y-5 overflow-auto px-5 py-5">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="mr-2.5 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                    {activeThread.agentName[0]}
                  </div>
                )}
                <div className={`${msg.role === "user" ? "max-w-[72%]" : "min-w-0 flex-1"}`}>
                  {msg.role === "assistant" && (
                    <div className="mb-1 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-400">
                      {activeThread.agentName} · {activeThread.agentRole}
                    </div>
                  )}
                  <div className={`rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                    msg.role === "user"
                      ? "bg-slate-900 text-white"
                      : "border border-slate-100 bg-white text-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                  }`}>
                    {msg.text}
                  </div>
                  <div className={`mt-1 font-mono text-[10px] text-slate-400 ${msg.role === "user" ? "text-right" : ""}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── composer ──────────────────────────────────────────────── */}
        <div className="border-t border-slate-100 p-3 sm:p-4">
          <div className="flex items-end gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 transition-colors focus-within:border-slate-400 focus-within:bg-white">
            <textarea
              rows={1}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={`Message ${activeThread.agentName}…`}
              className="flex-1 resize-none bg-transparent text-[13px] text-slate-900 outline-none placeholder:text-slate-400"
            />
            <button
              onClick={handleSend}
              disabled={!draft.trim() || sending}
              aria-label="Send message"
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors sm:h-8 sm:w-8 ${
                draft.trim() && !sending
                  ? "bg-slate-900 text-white active:scale-95"
                  : "bg-slate-200 text-slate-400"
              }`}
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
