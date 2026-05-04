/**
 * DM To Call Conversation Brief
 * Category: Funnels
 * Tags: funnel, dm, chat, conversation, call, appointment, social, dm-to-call
 * Description: A DM-to-call conversation surface that captures warm intent from social, inbox, or community traffic and transitions it into a booked strategy call. Designed for closers, setters, and founder-led inbound that converts through direct conversation first.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/dm-to-call-conversation-brief.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { ArrowRight, CalendarDays, CheckCircle2, Clock3, MessageCircleMore, Phone } from "lucide-react";

const messages = [
  { role: "lead", text: "I watched the clips on fixing booked-call quality. We have calls, but half of them show up cold." },
  { role: "setter", text: "That usually means the sequence after booking is too weak. Are you sending buyers straight from calendar to a dead thank-you page?" },
  { role: "lead", text: "Exactly. No prep, no context, just a confirmation screen." },
  { role: "setter", text: "Then the next step is simple: strategy call plus a pre-call context page. Book here and we’ll map the exact sequence." },
];

const conversationSignals = [
  { label: "Reply time", value: "4 min" },
  { label: "Source", value: "Instagram inbound" },
];

const handoffChecklist = [
  "Summarize the problem in one sentence before sharing the calendar.",
  "Confirm the buyer knows what the call is for and what they should bring.",
  "Keep the original context visible so the booking step does not feel like a hard pivot.",
];

export default function DmToCallConversationBrief() {
  return (
    <div className="min-h-125 overflow-hidden rounded-[30px] bg-slate-200 p-px text-slate-900 shadow-lg">
      <div className="min-h-full bg-slate-50">
        <div className="bg-white px-6 py-4 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-700">
                <MessageCircleMore size={13} strokeWidth={2.2} />
                Conversation to booked call
              </div>
              <div className="mt-1 text-sm text-slate-500">CRM-style handoff for warm inbound leads who convert inside the thread, not outside it.</div>
            </div>
            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600 ring-1 ring-slate-200">Warm inbound workflow</div>
          </div>
        </div>

        <div className="grid gap-px bg-slate-200 min-[1800px]:grid-cols-[1.15fr_0.85fr]">
          <section className="bg-white">
            <div className="px-6 py-6 lg:px-8">
              <div className="flex flex-wrap items-center gap-3">
                {conversationSignals.map((item) => (
                  <div key={item.label} className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
                    {item.label}: {item.value}
                  </div>
                ))}
              </div>
              <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                Keep the buyer in the same conversation until the calendar is the obvious next step.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                This format works when the lead already replied, asked a real question, or described a live problem. The page should feel like a continuation of sales context, not a reset.
              </p>
            </div>

            <div className="grid gap-px bg-slate-200 min-[1700px]:grid-cols-[minmax(0,1fr)_280px]">
              <div className="bg-white px-6 py-6 lg:px-8">
                <div className="rounded-[28px] bg-slate-200 p-px">
                  <div className="bg-slate-50">
                    <div className="px-5 py-4">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Conversation summary</div>
                      <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Lead asks about low-intent booked calls after watching short-form content.</div>
                    </div>

                    <div className="px-5 py-5">
                      <div className="flex flex-col gap-4">
                        {messages.map((message, index) => (
                          <div key={index} className={message.role === "setter" ? "flex justify-end" : "flex justify-start"}>
                            <div className={message.role === "setter" ? "w-full max-w-136 rounded-[22px] bg-slate-900 px-4 py-4 text-white" : "w-full max-w-136 rounded-[22px] bg-white px-4 py-4 text-slate-900 ring-1 ring-slate-200"}>
                              <div className={message.role === "setter" ? "text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-200" : "text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500"}>
                                {message.role === "setter" ? "Setter" : "Lead"}
                              </div>
                              <div className={message.role === "setter" ? "mt-2 text-sm leading-7 text-slate-100" : "mt-2 text-sm leading-7 text-slate-700"}>{message.text}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="bg-slate-50 px-6 py-6">
                <div className="rounded-3xl bg-white px-5 py-5 shadow-sm ring-1 ring-slate-200">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Next recommended action</div>
                  <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Move from diagnosis to scheduling without changing tone.</div>
                  <div className="mt-4 text-sm leading-7 text-slate-600">
                    Once the issue is named and the buyer agrees it is real, the booking step should feel like follow-through, not a new pitch.
                  </div>
                </div>

                <div className="mt-4 rounded-3xl bg-white px-5 py-5 shadow-sm ring-1 ring-slate-200">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    <Clock3 size={13} strokeWidth={2.2} />
                    Handoff checklist
                  </div>
                  <div className="mt-4 space-y-4">
                    {handoffChecklist.map((item) => (
                      <div key={item} className="flex gap-3 text-sm leading-7 text-slate-600">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-sky-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </section>

          <aside className="bg-slate-50 px-6 py-6 lg:px-8">
            <div className="rounded-[28px] bg-slate-200 p-px shadow-sm">
              <div className="bg-white">
                <div className="px-6 py-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Schedule the call</div>
                      <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-slate-950">Book a working session while the thread is still warm.</h2>
                    </div>
                    <div className="rounded-[20px] bg-slate-100 px-4 py-4 text-right ring-1 ring-slate-200">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Lead quality</div>
                      <div className="mt-2 text-sm font-semibold text-slate-950">Warm inbound</div>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-5 pt-0">
                  <div className="rounded-[20px] bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600 ring-1 ring-slate-200">
                    Use this when the lead source is already conversational: DMs, community replies, founder inbox, or inbound setter conversations.
                  </div>
                </div>

                <div className="px-6 py-6 pt-1">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <CalendarDays size={15} strokeWidth={2.2} />
                    Booking trigger
                  </div>
                  <div className="mt-3 text-sm leading-7 text-slate-600">
                    Offer the call only after the buyer agrees on the problem, understands the likely fix, and knows what the meeting is meant to solve.
                  </div>

                  <div className="mt-5 rounded-[22px] bg-slate-50 px-4 py-4 ring-1 ring-slate-200">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">What the call covers</div>
                    <div className="mt-3 space-y-3 text-sm leading-7 text-slate-600">
                      <div>Audit the current lead source, booking step, and pre-call sequence.</div>
                      <div>Decide whether the next improvement is qualification, context-building, or calendar flow.</div>
                      <div>Leave with a clear sequence recommendation instead of a vague “we should talk” next step.</div>
                    </div>
                  </div>

                  <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800">
                    Book the call
                    <ArrowRight size={15} strokeWidth={2.2} />
                  </button>

                  <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                    <Phone size={15} strokeWidth={2.2} />
                    Best when the buyer already trusts the messenger and only needs the next action clarified.
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}