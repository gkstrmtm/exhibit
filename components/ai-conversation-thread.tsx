/**
 * AI Conversation Thread
 * Category: Communication
 * Tags: agent, chat, ai, thread, llm, conversation, streaming, typing, response
 * Description: Asymmetric AI conversation layout. AI responses render as full-width prose
 * blocks — left-anchored with agent identity above, generous line-height, no bubble. User
 * messages are compact right-aligned pills. Handles all states: idle, user sending, AI
 * typing (animated dots), AI streamed response, and per-message error with retry. The
 * visual weight difference between AI and user messages makes scan direction unambiguous.
 * Mobile-responsive with 44px touch targets and stacking composer.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/ai-conversation-thread.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { AlertCircle, CornerDownLeft, RefreshCw, Send } from "lucide-react";

// ─── types ────────────────────────────────────────────────────────────────────

type MessageRole = "user" | "assistant";
type MessageStatus = "ok" | "error";

type Message = {
  id: number;
  role: MessageRole;
  text: string;
  time: string;
  status: MessageStatus;
};

// ─── seed data ────────────────────────────────────────────────────────────────

const AGENT_NAME   = "Ora";
const AGENT_ROLE   = "Planning agent";
const AGENT_INITIALS = "O";

let nextId = 5;

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    text: "I've reviewed the brief. The biggest gap is that you're describing the interface before locking the workflow. Until you know the exact sequence of decisions a user makes, any layout you commit to is guesswork.",
    time: "2:08 PM",
    status: "ok",
  },
  {
    id: 2,
    role: "user",
    text: "Fair. So start with the decision map first?",
    time: "2:09 PM",
    status: "ok",
  },
  {
    id: 3,
    role: "assistant",
    text: "Exactly. Map the five or six real decisions the user has to make, in order. Then ask what information each decision requires. The layout follows from that — not from what looks good in Figma.",
    time: "2:09 PM",
    status: "ok",
  },
  {
    id: 4,
    role: "user",
    text: "Can you walk me through how to run that exercise?",
    time: "2:10 PM",
    status: "ok",
  },
];

// Simulated AI reply for demo purposes
const simulatedReply =
  "Start by writing the user's goal at the top of a page. Below that, write the first thing they must decide to move forward — not what they want to see, what they must decide. Repeat that for each step until you reach the completion state. If you can't write a clear decision for a step, you're missing information, not design.";

function now() {
  return new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

// ─── typing indicator ─────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-slate-400"
          style={{ animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }}
        />
      ))}
      <style>{`@keyframes pulse { 0%,80%,100%{opacity:.3;transform:scale(.8)} 40%{opacity:1;transform:scale(1)} }`}</style>
    </div>
  );
}

// ─── component ────────────────────────────────────────────────────────────────

export default function AiConversationThread() {
  const [messages, setMessages]   = useState<Message[]>(initialMessages);
  const [draft, setDraft]         = useState("");
  const [isTyping, setIsTyping]   = useState(false);
  const bottomRef                 = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom on new messages or typing
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = {
      id: nextId++,
      role: "user",
      text: text.trim(),
      time: now(),
      status: "ok",
    };

    setMessages((prev) => [...prev, userMsg]);
    setDraft("");
    setIsTyping(true);

    // Simulate AI response latency
    await new Promise<void>((r) => setTimeout(r, 1600));

    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      {
        id: nextId++,
        role: "assistant",
        text: simulatedReply,
        time: now(),
        status: "ok",
      },
    ]);
  }, [isTyping]);

  const handleRetry = useCallback((id: number) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: "ok" } : m))
    );
  }, []);

  return (
    <div className="flex min-h-[540px] w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">

      {/* ── header ───────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white">
          {AGENT_INITIALS}
        </div>
        <div>
          <div className="text-[13px] font-semibold text-slate-900">{AGENT_NAME}</div>
          <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-400">
            {AGENT_ROLE}
          </div>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="text-[11px] text-slate-400">Active</span>
        </div>
      </div>

      {/* ── thread ───────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-auto px-4 py-5 sm:px-5">
        <div className="mx-auto flex max-w-2xl flex-col gap-6">
          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.role === "assistant" ? (
                /*
                 * AI message: full-width prose block.
                 * Agent label sits above. Text gets generous line-height.
                 * Error state shows inline retry — no toast, no redirect.
                 */
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
                    {AGENT_INITIALS}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-400">
                      {AGENT_NAME}
                    </div>
                    {msg.status === "error" ? (
                      <div className="flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 px-3.5 py-3">
                        <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                        <div className="flex-1">
                          <div className="text-[12px] text-red-700">
                            Response failed. The message was not delivered.
                          </div>
                          <button
                            onClick={() => handleRetry(msg.id)}
                            className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-red-600 hover:text-red-800"
                          >
                            <RefreshCw className="h-3 w-3" />
                            Retry
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3.5 text-[13px] leading-[1.7] text-slate-800">
                        {msg.text}
                      </div>
                    )}
                    <div className="mt-1 font-mono text-[10px] text-slate-400">
                      {msg.time}
                    </div>
                  </div>
                </div>
              ) : (
                /*
                 * User message: compact right-aligned pill.
                 * Contrasts with AI prose via background + alignment.
                 */
                <div className="flex justify-end">
                  <div className="max-w-[70%] sm:max-w-[60%]">
                    <div className="rounded-2xl bg-slate-900 px-4 py-2.5 text-[13px] leading-relaxed text-white">
                      {msg.text}
                    </div>
                    <div className="mt-1 text-right font-mono text-[10px] text-slate-400">
                      {msg.time}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* typing indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
                {AGENT_INITIALS}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-400">
                  {AGENT_NAME}
                </div>
                <div className="inline-block rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3.5">
                  <TypingDots />
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* ── composer ─────────────────────────────────────────────────── */}
      <div className="border-t border-slate-100 p-3 sm:p-4">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-end gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 transition-colors focus-within:border-slate-400 focus-within:bg-white">
            <textarea
              rows={1}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(draft);
                }
              }}
              placeholder={`Ask ${AGENT_NAME}…`}
              className="flex-1 resize-none bg-transparent text-[13px] text-slate-900 outline-none placeholder:text-slate-400"
            />
            <div className="flex shrink-0 items-center gap-1.5">
              <span className="hidden text-[10px] text-slate-300 sm:inline">
                <CornerDownLeft className="inline h-3 w-3" /> send
              </span>
              <button
                onClick={() => sendMessage(draft)}
                disabled={!draft.trim() || isTyping}
                aria-label="Send message"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors sm:h-8 sm:w-8 ${
                  draft.trim() && !isTyping
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
    </div>
  );
}
