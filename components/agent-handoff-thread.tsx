/**
 * Agent Handoff Thread
 * Category: Communication
 * Tags: agent, handoff, multi-agent, thread, ai, pipeline, coordination, workflow
 * Description: A multi-agent conversation thread where distinct agents take turns and
 * handoff moments are explicit events in the timeline. Each agent has a unique identity
 * chip and color key. Handoff events appear as labeled dividers — not just a different
 * avatar — so the baton-pass reads immediately. Shows three-agent pipeline: Triage →
 * Research → Synthesis. Agents can be in active, waiting, or done states. Thread is
 * scrollable; active agent indicator shows who holds the floor. Mobile-responsive.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/agent-handoff-thread.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";

// ─── agent registry ───────────────────────────────────────────────────────────

type AgentStatus = "active" | "waiting" | "done";

type Agent = {
  id: string;
  name: string;
  role: string;
  initial: string;
  bg: string;       // Tailwind bg class
  text: string;     // Tailwind text class
  border: string;   // Tailwind border class
  dot: string;      // Tailwind bg dot class
};

const AGENTS: Record<string, Agent> = {
  triage: {
    id: "triage",
    name: "Vex",
    role: "Triage",
    initial: "V",
    bg: "bg-violet-100",
    text: "text-violet-700",
    border: "border-violet-200",
    dot: "bg-violet-500",
  },
  research: {
    id: "research",
    name: "Arc",
    role: "Research",
    initial: "A",
    bg: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-200",
    dot: "bg-blue-500",
  },
  synthesis: {
    id: "synthesis",
    name: "Ora",
    role: "Synthesis",
    initial: "O",
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },
};

// ─── timeline items ───────────────────────────────────────────────────────────

type MessageItem = {
  kind: "message";
  agentId: string;
  text: string;
  time: string;
};

type HandoffItem = {
  kind: "handoff";
  fromId: string;
  toId: string;
  reason: string;
  time: string;
};

type ThreadItem = MessageItem | HandoffItem;

const thread: ThreadItem[] = [
  {
    kind: "message",
    agentId: "triage",
    text: "Reviewing the incoming request. The ask is ambiguous — it conflates a UI problem with a data modeling problem. I'm going to classify this as a workflow gap before it surfaces as both.",
    time: "10:41 AM",
  },
  {
    kind: "message",
    agentId: "triage",
    text: "Classification confirmed: the user is describing symptoms of a missing intermediate state, not a layout failure. Handing off to Research with the constraint set.",
    time: "10:42 AM",
  },
  {
    kind: "handoff",
    fromId: "triage",
    toId: "research",
    reason: "Workflow gap identified. Constraint set attached. Research to find precedents and data shape.",
    time: "10:42 AM",
  },
  {
    kind: "message",
    agentId: "research",
    text: "Received. Looking at three known patterns for intermediate workflow states: draft/pending/committed, staged/confirmed/dispatched, and queued/in-progress/resolved.",
    time: "10:44 AM",
  },
  {
    kind: "message",
    agentId: "research",
    text: "The draft/pending/committed model fits best — it maps directly to the approval chain described in the brief. The data shape needs three status fields minimum: intent, review_state, and dispatch_state. Handing off to Synthesis with the model.",
    time: "10:46 AM",
  },
  {
    kind: "handoff",
    fromId: "research",
    toId: "synthesis",
    reason: "State model selected. Three-field schema defined. Synthesis to produce the final recommendation.",
    time: "10:46 AM",
  },
  {
    kind: "message",
    agentId: "synthesis",
    text: "Combining triage classification and research model. Final recommendation: implement a three-state approval chain (Draft → Pending Review → Dispatched). Surface each state as a distinct lane in the queue view — not as filter pills. The visual separation carries the workflow logic without additional chrome.",
    time: "10:48 AM",
  },
];

// ─── agent status bar ─────────────────────────────────────────────────────────

const agentStatuses: { id: string; status: AgentStatus }[] = [
  { id: "triage",    status: "done"    },
  { id: "research",  status: "done"    },
  { id: "synthesis", status: "active"  },
];

function AgentStatusPip({ agent, status }: { agent: Agent; status: AgentStatus }) {
  return (
    <div className={`flex items-center gap-2 rounded-full border px-3 py-1.5 ${agent.border} ${agent.bg}`}>
      <span className={`text-[11px] font-semibold ${agent.text}`}>
        {agent.name}
      </span>
      <span className={`text-[10px] font-medium uppercase tracking-[0.12em] ${agent.text} opacity-70`}>
        {agent.role}
      </span>
      {status === "active"  && <span className={`h-1.5 w-1.5 rounded-full ${agent.dot} animate-pulse`} />}
      {status === "done"    && <CheckCircle2 className={`h-3 w-3 ${agent.text}`} />}
      {status === "waiting" && <Clock className={`h-3 w-3 ${agent.text} opacity-60`} />}
    </div>
  );
}

// ─── component ────────────────────────────────────────────────────────────────

export default function AgentHandoffThread() {
  const [expanded, setExpanded] = useState<Set<number>>(new Set([2, 5])); // handoffs start expanded

  const toggleHandoff = (index: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  };

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-slate-200 bg-white">

      {/* ── header ───────────────────────────────────────────────────── */}
      <div className="border-b border-slate-100 px-4 py-3 sm:px-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
              Active pipeline
            </div>
            <div className="mt-0.5 text-[14px] font-semibold text-slate-900">
              Workflow gap resolution
            </div>
          </div>

          {/* agent status bar */}
          <div className="flex flex-wrap items-center gap-2">
            {agentStatuses.map(({ id, status }) => (
              <AgentStatusPip key={id} agent={AGENTS[id]} status={status} />
            ))}
          </div>
        </div>
      </div>

      {/* ── thread ───────────────────────────────────────────────────── */}
      <div className="space-y-0 overflow-auto px-4 py-5 sm:px-5">
        {thread.map((item, i) => {
          if (item.kind === "message") {
            const agent = AGENTS[item.agentId];
            return (
              <div key={i} className="flex gap-3 pb-5">
                {/* agent avatar */}
                <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${agent.bg} ${agent.text}`}>
                  {agent.initial}
                </div>

                <div className="min-w-0 flex-1">
                  {/* agent label */}
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className={`text-[11px] font-semibold ${agent.text}`}>{agent.name}</span>
                    <span className="text-[10px] text-slate-400">{agent.role}</span>
                  </div>

                  {/* message body */}
                  <div className={`rounded-xl border px-4 py-3 text-[13px] leading-[1.7] text-slate-800 ${agent.border} bg-slate-50/40`}>
                    {item.text}
                  </div>

                  <div className="mt-1 font-mono text-[10px] text-slate-400">{item.time}</div>
                </div>
              </div>
            );
          }

          // handoff event
          const from  = AGENTS[item.fromId];
          const to    = AGENTS[item.toId];
          const open  = expanded.has(i);

          return (
            <div key={i} className="py-2">
              <button
                onClick={() => toggleHandoff(i)}
                className="flex w-full items-center gap-3 text-left"
              >
                {/* from dot */}
                <span className={`h-2 w-2 shrink-0 rounded-full ${from.dot}`} />

                {/* label */}
                <span className="text-[11px] font-semibold text-slate-500">
                  {from.name} handed off to {to.name}
                </span>

                {/* arrow */}
                <ArrowRight className="h-3 w-3 shrink-0 text-slate-300" />

                {/* to dot */}
                <span className={`h-2 w-2 shrink-0 rounded-full ${to.dot}`} />

                {/* time */}
                <span className="ml-auto font-mono text-[10px] text-slate-300">{item.time}</span>

                {/* expand cue */}
                <span className="text-[10px] text-slate-300">{open ? "▲" : "▼"}</span>
              </button>

              {/* expanded reason */}
              {open && (
                <div className="ml-5 mt-2 rounded-lg border border-slate-100 bg-slate-50 px-3.5 py-2.5">
                  <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-400">
                    Handoff context
                  </div>
                  <div className="mt-1 text-[12px] leading-relaxed text-slate-600">
                    {item.reason}
                  </div>
                </div>
              )}

              {/* visual connector to next message */}
              <div className="ml-1 mt-2 h-4 w-px bg-slate-100" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
