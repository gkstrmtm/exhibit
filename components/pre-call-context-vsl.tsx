/**
 * Pre-Call Context VSL
 * Category: Funnels
 * Tags: funnel, pre-call, vsl, indoctrination, show-up, booked-call, context, confirmation
 * Description: A post-booking conditioning page that plays a short pre-call VSL, resets expectations, and gives the buyer the context they need before the appointment. Designed to lift show-up quality and reduce the need to re-sell the problem during the call.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/pre-call-context-vsl.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { BellRing, CalendarDays, CheckCircle2, Clock3, FileText, Play } from "lucide-react";

const checklist = [
  "Watch the 6-minute context video before the call.",
  "Bring the current offer link and the funnel you are actively running.",
  "Come with the real objection list your team hears on calls.",
  "Be ready to decide whether the problem is copy, sequencing, qualification, or sales process.",
];

const agenda = [
  "Diagnose where intent drops between click, application, calendar, and show-up.",
  "Decide which sequence to test next: direct-to-call, VSL-to-call, or VSL-to-application-to-call.",
  "Leave with a build order the dev team can execute without guessing.",
];

const prepSignals = [
  { label: "Video watched", value: "72%" },
  { label: "Context submitted", value: "54%" },
  { label: "Show-up uplift", value: "+29%" },
];

const focusAreas = [
  "Get the buyer aligned on the real conversion break before the call starts.",
  "Move the meeting straight into diagnosis instead of re-explaining the context.",
  "Leave with one clear build order instead of a vague list of ideas.",
];

const prepInputs = [
  "Current funnel URL and traffic source mix",
  "Objection notes from recent sales calls",
  "The one sequence decision the team needs to make next",
];

export default function PreCallContextVsl() {
  return (
    <div className="min-h-135 overflow-hidden rounded-[30px] bg-slate-200 p-px text-slate-900 shadow-[0_20px_70px_rgba(15,23,42,0.12)]">
      <div className="min-h-full bg-[#f3f0ea]">
      <div className="bg-[#101828] px-5 py-4 text-slate-100 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-200">Pre-call briefing room</div>
            <div className="mt-1 text-sm text-slate-300">Context, inputs, and meeting posture should be settled before anyone joins live.</div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.14em] text-slate-200 ring-1 ring-white/10">
            <Clock3 size={14} strokeWidth={2.1} />
            Runtime 06:04
          </div>
        </div>
      </div>

      <div className="grid gap-px bg-slate-200 2xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="bg-[#f3f0ea]">
          <div className="px-5 py-6 lg:px-8 lg:py-8">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px] xl:items-start">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Pre-call briefing</div>
                <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-slate-950 md:text-6xl">Watch this before we speak.</h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
                  This page should eliminate the usual wasted first ten minutes. The buyer comes in with context, the team comes in with the right inputs, and the call moves straight into the real diagnosis.
                </p>
              </div>

              <div className="rounded-3xl bg-white px-5 py-5 shadow-sm ring-1 ring-slate-200">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Why this page matters</div>
                <div className="mt-4 space-y-4">
                  {focusAreas.map((item, index) => (
                    <div key={item} className="flex gap-3 border-t border-slate-100 pt-4 first:border-t-0 first:pt-0">
                      <div className="text-sm font-semibold text-slate-400">0{index + 1}</div>
                      <div className="text-sm leading-7 text-slate-600">{item}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-px bg-slate-200 2xl:grid-cols-[minmax(0,1fr)_300px]">
            <div className="bg-[#dfe8f7] px-5 py-5 lg:px-8 lg:py-8">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Prep video</div>
                  <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">What needs to be aligned before the room opens</div>
                </div>
                <div className="hidden rounded-full bg-white/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600 ring-1 ring-slate-900/10 md:block">
                  6-minute context install
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-[28px] bg-slate-300 p-px text-white shadow-[0_20px_50px_rgba(15,23,42,0.18)]">
                <div className="bg-[#0f1728]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.16em] text-sky-200">Video sequence</div>
                    <div className="mt-1 text-lg font-semibold">What we need aligned before the call starts</div>
                  </div>
                  <div className="font-mono text-xs uppercase tracking-[0.14em] text-slate-300">Problem / sequence / next decision</div>
                </div>

                <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_240px]">
                  <div className="relative min-h-80 overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.35),transparent_32%),linear-gradient(180deg,#152238_0%,#0f1728_100%)] px-5 py-5 sm:px-6 sm:py-6">
                    <div className="max-w-sm rounded-full bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-200 ring-1 ring-white/10">
                      Pre-call prep video
                    </div>
                    <button className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white shadow-lg ring-1 ring-white/10 transition-transform hover:scale-[1.02]">
                      <Play className="ml-1 h-8 w-8 fill-current" />
                    </button>
                    <div className="absolute inset-x-5 bottom-5 rounded-3xl bg-black/20 px-4 py-4 backdrop-blur ring-1 ring-white/10 sm:inset-x-6 sm:bottom-6 sm:px-5 sm:py-5">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-200">Video takeaway</div>
                      <div className="mt-3 max-w-md text-sm leading-7 text-slate-200">
                        The buyer should finish this video knowing what the meeting is for, what inputs need to be ready, and what decision the team expects to leave with.
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 bg-[#111b2c] px-5 py-5 lg:border-l lg:border-l-white/10 lg:border-t-0">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Call agenda</div>
                    <div className="mt-4 space-y-4">
                      {agenda.map((item, index) => (
                        <div key={item} className="rounded-2xl bg-white/5 px-4 py-4 ring-1 ring-white/10">
                          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Step 0{index + 1}</div>
                          <div className="mt-2 text-sm leading-7 text-slate-200">{item}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>

            <div className="bg-white px-5 py-5 lg:px-6 lg:py-8">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Bring these into the room</div>
              <div className="mt-4 space-y-3">
                {prepInputs.map((item, index) => (
                  <div key={item} className="flex gap-3 rounded-2xl bg-slate-50 px-4 py-4 ring-1 ring-slate-200">
                    <div className="text-sm font-semibold text-slate-400">0{index + 1}</div>
                    <div className="text-sm leading-7 text-slate-600">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-px bg-slate-200 xl:grid-cols-[minmax(0,1fr)_280px]">
            <div className="bg-white px-5 py-5 lg:px-8 lg:py-8">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Show-up checklist</div>
              <div className="mt-5 grid gap-3 2xl:grid-cols-2">
                {checklist.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl bg-[#faf8f4] px-4 py-4 text-sm leading-7 text-slate-600 ring-1 ring-slate-200">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-sky-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#faf8f4] px-5 py-5 lg:px-6 lg:py-8">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Prep signals</div>
              <div className="mt-5 space-y-5">
                {prepSignals.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      <span>{item.label}</span>
                      <span>{item.value}</span>
                    </div>
                    <div className="mt-2 h-3 bg-slate-200">
                      <div
                        className="h-full bg-slate-900"
                        style={{ width: item.label === "Video watched" ? "72%" : item.label === "Context submitted" ? "54%" : "68%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="bg-[#efe9de] px-5 py-5 lg:px-6 lg:py-8">
          <div className="overflow-hidden rounded-[28px] bg-slate-300 p-px shadow-sm">
            <div className="bg-white">
            <div className="border-b border-slate-200 bg-[#f7f3ec] px-5 py-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Upcoming call</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Strategy breakdown with the growth team</h2>
            </div>

            <div className="space-y-5 px-5 py-5">
              <div className="space-y-3 text-sm leading-7 text-slate-600">
                <div className="flex items-start gap-3">
                  <CalendarDays size={16} strokeWidth={2.2} className="mt-1 shrink-0 text-slate-900" />
                  <span>Thu, Apr 25 at 1:15 PM ET</span>
                </div>
                <div className="flex items-start gap-3">
                  <BellRing size={16} strokeWidth={2.2} className="mt-1 shrink-0 text-slate-900" />
                  <span>SMS + email reminder 24h and 1h before the meeting</span>
                </div>
                <div className="flex items-start gap-3">
                  <FileText size={16} strokeWidth={2.2} className="mt-1 shrink-0 text-slate-900" />
                  <span>The outcome of the call should be a single next-sequence decision the team can build immediately.</span>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-5">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Meeting posture</div>
                <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                  <div className="rounded-2xl bg-[#faf8f4] px-4 py-4 ring-1 ring-slate-200">This is a working session, not a generic discovery call.</div>
                  <div className="rounded-2xl bg-[#faf8f4] px-4 py-4 ring-1 ring-slate-200">The team should already know the funnel context before the live conversation begins.</div>
                </div>
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