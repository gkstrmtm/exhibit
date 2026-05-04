/**
 * High-Ticket VSL Booking Page Executive Serif
 * Category: Funnels
 * Tags: funnel, vsl, booking, calendar, high-ticket, discovery-call, authority, sales, concept-vsl-booking, preview-variant, variant-executive, tone-executive, typography-serif
 * Description: A boardroom-style VSL booking page for premium services. Uses editorial typography, calmer pacing, and tighter executive framing for buyers who need confidence and clarity more than launch-page energy.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/high-ticket-vsl-booking-page-executive-serif.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { ArrowRight, CalendarDays, CheckCircle2, Clock3, Play, ShieldCheck } from "lucide-react";

const executiveSignals = [
  { label: "Qualified calls", value: "+34%" },
  { label: "Average show-up", value: "81%" },
  { label: "Decision cycle", value: "11 days" },
];

const executiveNarrative = [
  "Explain the offer as a commercial decision, not a charismatic performance.",
  "Use fewer claims, but make each one easier to verify.",
  "Keep the calendar visible without letting the page feel like it is rushing the reader.",
];

const reviewPoints = [
  "Commercial problem and why the current funnel leaks buying intent.",
  "Mechanism and why the team believes this path is more efficient.",
  "What the working session resolves and which teams should attend.",
];

const slots = ["Today 3:00 PM", "Thu 9:30 AM", "Thu 2:00 PM", "Fri 11:00 AM"];

export default function HighTicketVslBookingPageExecutiveSerif() {
  return (
    <div className="min-h-140 overflow-hidden rounded-[30px] bg-stone-300 p-px text-stone-950 shadow-lg">
      <div className="min-h-full bg-[#f7f2ea]">
      <div className="bg-[#1f1713] px-6 py-5 text-stone-100 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-200">Executive briefing page</div>
            <div className="mt-1 text-sm text-stone-300">Calm VSL and booking flow for premium services that sell through confidence, proof, and commercial clarity.</div>
          </div>
          <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-stone-100 ring-1 ring-white/10">Tone: boardroom, not launch mode</div>
        </div>
      </div>

      <div className="grid gap-px bg-stone-300 2xl:grid-cols-[1.12fr_0.88fr]">
        <section className="bg-[#fbf8f3]">
          <div className="px-6 py-8 lg:px-8">
            <div className="inline-flex items-center rounded-full border border-stone-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-stone-700">
              Premium services briefing
            </div>
            <h1 className="mt-6 max-w-4xl font-serif text-5xl font-semibold leading-tight tracking-[-0.03em] text-stone-950 md:text-6xl">
              Give serious buyers the commercial case before you ask for the meeting.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-700">
              This version is built for buyers who do not respond well to direct-response theater. The page should feel like an executive review: measured, specific, and ready for a working conversation.
            </p>
          </div>

          <div className="grid gap-px border-y border-stone-300 bg-stone-300 md:grid-cols-3">
            {executiveSignals.map((item) => (
              <div key={item.label} className="bg-[#fbf8f3] px-6 py-5">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">{item.label}</div>
                <div className="mt-3 font-serif text-4xl font-semibold tracking-tight text-stone-950">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="grid gap-px bg-stone-300 2xl:grid-cols-[1.04fr_0.96fr]">
            <div className="px-6 py-8 lg:px-8">
              <div className="rounded-[32px] border border-stone-300 bg-white shadow-sm">
                <div className="border-b border-stone-200 px-6 py-5">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">Briefing video</div>
                  <div className="mt-2 font-serif text-3xl font-semibold tracking-tight text-stone-950">What leadership should understand before the call is booked.</div>
                </div>
                <div className="p-6">
                  <div className="relative min-h-96 overflow-hidden rounded-[28px] border border-stone-200 bg-[linear-gradient(180deg,#efe5d7_0%,#fbf8f3_100%)]">
                    <div className="absolute inset-x-6 top-6 rounded-2xl border border-stone-200 bg-white/90 px-4 py-3 text-sm leading-7 text-stone-600 shadow-sm">
                      Review the commercial problem, the mechanism, the proof, and the scope of the working session.
                    </div>
                    <button className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-stone-950 text-white shadow-lg transition-transform hover:scale-[1.02]">
                      <Play className="ml-1 h-8 w-8 fill-current" />
                    </button>
                    <div className="absolute inset-x-6 bottom-6 rounded-[24px] border border-stone-200 bg-white px-5 py-5 shadow-sm">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">Why this works</div>
                      <div className="mt-3 text-sm leading-7 text-stone-700">The page should reduce ambiguity, not manufacture urgency. The booking step gets stronger when the reasoning feels complete.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#f3ede4] px-6 py-8 lg:px-8">
              <div className="space-y-4">
                {executiveNarrative.map((item, index) => (
                  <div key={item} className="rounded-[28px] border border-stone-300 bg-white px-5 py-5 shadow-sm">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">Principle 0{index + 1}</div>
                    <div className="mt-3 text-sm leading-8 text-stone-700">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="bg-[#f1eadf] px-6 py-8 lg:px-8">
          <div className="rounded-[32px] border border-stone-300 bg-white shadow-sm">
            <div className="border-b border-stone-200 px-6 py-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">Reserve the review</div>
                  <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-950">Choose a time for the commercial working session.</h2>
                </div>
                <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 text-right">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">Availability</div>
                  <div className="mt-2 text-3xl font-semibold text-stone-950">14</div>
                </div>
              </div>
            </div>

            <div className="border-b border-stone-200 px-6 py-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-stone-900">
                <ShieldCheck size={15} strokeWidth={2.1} />
                Review focus
              </div>
              <div className="mt-4 space-y-3 text-sm leading-7 text-stone-700">
                {reviewPoints.map((item) => (
                  <div key={item} className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">{item}</div>
                ))}
              </div>
            </div>

            <div className="px-6 py-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-stone-900">
                <CalendarDays size={15} strokeWidth={2.1} />
                Available sessions
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {slots.map((slot, index) => (
                  <button
                    key={slot}
                    className={index === 1 ? "rounded-xl bg-stone-950 px-4 py-4 text-left text-sm font-semibold text-white" : "rounded-xl border border-stone-200 bg-white px-4 py-4 text-left text-sm text-stone-700 transition-colors hover:bg-stone-50"}
                  >
                    {slot}
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 px-5 py-5">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">
                  <Clock3 size={13} strokeWidth={2.2} />
                  What happens in the room
                </div>
                <div className="mt-4 space-y-4">
                  {[
                    "Review offer positioning and whether the page is selling the wrong level of certainty.",
                    "Identify where the sequence loses executive confidence between proof and booking.",
                    "Leave with a build order the team can execute without additional interpretation.",
                  ].map((item) => (
                    <div key={item} className="flex gap-3 text-sm leading-7 text-stone-700">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-stone-900" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-stone-950 px-4 py-4 text-sm font-semibold text-white transition-colors hover:bg-stone-800">
                Reserve the review
                <ArrowRight size={15} strokeWidth={2.2} />
              </button>
            </div>
          </div>
        </aside>
      </div>
      </div>
    </div>
  );
}