/**
 * High-Ticket VSL Booking Page Operator Console
 * Category: Funnels
 * Tags: funnel, vsl, booking, calendar, high-ticket, discovery-call, authority, sales, concept-vsl-booking, preview-variant, variant-operator, tone-operator, typography-mono
 * Description: An operator-console VSL booking page for teams that want the page to feel like a live revenue control room. Uses denser signal framing, mono utility accents, and sharper conversion pressure without becoming generic direct-response noise.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/high-ticket-vsl-booking-page-operator-console.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { Activity, ArrowRight, CalendarDays, CheckCircle2, Play, Radar, TimerReset } from "lucide-react";

const operatorStats = [
  { label: "Booked-call quality", value: "+41%" },
  { label: "Show-up compliance", value: "86%" },
  { label: "Sales lag", value: "-9 days" },
];

const operatorModules = [
  "Diagnose where the buyer loses certainty before the calendar step.",
  "Show the exact mechanism and remove any ambiguity about the next action.",
  "Keep the booking rail live while the proof stack is still top-of-mind.",
];

const dispatchNotes = [
  "Traffic source: founder outbound and retargeted warm leads",
  "Use case: premium service with sales call as the commitment gate",
  "Operator rule: the calendar should feel like follow-through, not a jump cut",
];

const bookingSlots = ["Today 1:45 PM", "Today 5:15 PM", "Fri 9:00 AM", "Fri 12:30 PM"];

export default function HighTicketVslBookingPageOperatorConsole() {
  return (
    <div className="min-h-140 overflow-hidden rounded-[30px] bg-slate-800 p-px text-slate-100 shadow-[0_24px_80px_rgba(2,6,23,0.45)]">
      <div className="min-h-full bg-[#0a1018]">
      <div className="bg-[#070b11] px-6 py-4 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">Revenue operator console</div>
            <div className="mt-1 font-mono text-xs text-slate-400">High-ticket VSL path with live booking pressure and operational signal framing.</div>
          </div>
          <div className="rounded-full bg-cyan-400/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-cyan-200 ring-1 ring-cyan-400/20">
            Mode: operator-led
          </div>
        </div>
      </div>

      <div className="grid gap-px bg-slate-800 2xl:grid-cols-[1.14fr_0.86fr]">
        <section className="bg-[#0d1520]">
          <div className="px-6 py-8 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-cyan-200">
              <Radar size={12} strokeWidth={2.2} />
              Control room briefing
            </div>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-tight tracking-[-0.04em] text-white md:text-6xl">
              Keep authority, proof, and the booking rail in the same operating field.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              This version is for teams that want sharper operating energy without sliding into generic launch-page noise. It should feel like a live revenue system, not a lifestyle funnel.
            </p>
          </div>

          <div className="grid gap-px border-y border-slate-800 bg-slate-800 md:grid-cols-3">
            {operatorStats.map((item) => (
              <div key={item.label} className="bg-[#0d1520] px-6 py-5">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400">{item.label}</div>
                <div className="mt-3 text-4xl font-black tracking-tight text-white">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="grid gap-px bg-slate-800 2xl:grid-cols-[1.06fr_0.94fr]">
            <div className="px-6 py-8 lg:px-8">
              <div className="rounded-[30px] border border-slate-700 bg-[#09111a] shadow-[0_20px_60px_rgba(2,6,23,0.28)]">
                <div className="border-b border-slate-800 px-6 py-5">
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-cyan-300">
                    <Activity size={13} strokeWidth={2.2} />
                    Primary media stage
                  </div>
                  <div className="mt-2 text-2xl font-semibold tracking-tight text-white">What the buyer must understand before the calendar trigger goes live.</div>
                </div>
                <div className="p-6">
                  <div className="relative min-h-96 overflow-hidden rounded-[26px] border border-slate-700 bg-[linear-gradient(180deg,#0f1d2b_0%,#09111a_100%)]">
                    <div className="absolute inset-x-5 top-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] text-cyan-100">
                      Sequence: problem, mechanism, proof, booking path
                    </div>
                    <button className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-100 shadow-lg transition-transform hover:scale-[1.02]">
                      <Play className="ml-1 h-8 w-8 fill-current" />
                    </button>
                    <div className="absolute inset-x-5 bottom-5 rounded-[22px] border border-slate-700 bg-[#0b131c] px-5 py-5">
                      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400">Operator readout</div>
                      <div className="mt-3 text-sm leading-7 text-slate-300">The buyer should leave the video knowing exactly what is broken, why the old path underperforms, and why the working session is the next efficient move.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0b131c] px-6 py-8 lg:px-8">
              <div className="space-y-4">
                {operatorModules.map((item, index) => (
                  <div key={item} className="rounded-[28px] border border-slate-700 bg-slate-900/50 px-5 py-5">
                    <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-cyan-300">Module 0{index + 1}</div>
                    <div className="mt-3 text-sm leading-8 text-slate-300">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="bg-[#09111a] px-6 py-8 lg:px-8">
          <div className="rounded-[30px] border border-slate-700 bg-[#0d1520] shadow-[0_20px_60px_rgba(2,6,23,0.28)]">
            <div className="border-b border-slate-800 px-6 py-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400">Booking rail</div>
                  <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-white">Pick a live working session while the proof window is open.</h2>
                </div>
                <div className="rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-4 text-right">
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400">Open slots</div>
                  <div className="mt-2 text-3xl font-semibold text-white">16</div>
                </div>
              </div>
            </div>

            <div className="border-b border-slate-800 px-6 py-5">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-cyan-300">
                <TimerReset size={13} strokeWidth={2.2} />
                Dispatch notes
              </div>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                {dispatchNotes.map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-700 bg-[#0a1018] px-4 py-4">{item}</div>
                ))}
              </div>
            </div>

            <div className="px-6 py-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <CalendarDays size={15} strokeWidth={2.1} />
                Available times
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {bookingSlots.map((slot, index) => (
                  <button
                    key={slot}
                    className={index === 0 ? "rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-4 text-left font-mono text-sm uppercase tracking-[0.12em] text-cyan-100" : "rounded-xl border border-slate-700 bg-[#0a1018] px-4 py-4 text-left font-mono text-sm uppercase tracking-[0.12em] text-slate-300 transition-colors hover:border-slate-500"}
                  >
                    {slot}
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-3xl border border-slate-700 bg-[#0a1018] px-5 py-5">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400">Working session outcome</div>
                <div className="mt-4 space-y-4">
                  {[
                    "Identify the exact stage where buying intent collapses before booking.",
                    "Decide whether the next iteration belongs in proof, mechanism framing, or qualification.",
                    "Leave with a build-ready operating brief instead of a vague follow-up note.",
                  ].map((item) => (
                    <div key={item} className="flex gap-3 text-sm leading-7 text-slate-300">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-300" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 py-4 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-200">
                Open the booking rail
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