/**
 * High-Ticket VSL Booking Page
 * Category: Funnels
 * Tags: funnel, vsl, booking, calendar, high-ticket, discovery-call, authority, sales, concept-vsl-booking, concept-primary, variant-balanced, tone-balanced, typography-sans
 * Description: A high-ticket sales page that pairs a founder-led VSL with immediate calendar booking. Built for agencies, coaches, consultants, and offer-led service businesses where authority, proof, and a concrete next-step need to work together on the same screen.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/high-ticket-vsl-booking-page.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { ArrowRight, CalendarDays, CheckCircle2, Clock3, Play } from "lucide-react";

const outcomes = [
  "Explain the offer in plain terms so a qualified buyer understands what is changing and why it matters.",
  "Show enough proof to build confidence before the calendar appears.",
  "Move the right people into a sales conversation without making the page feel pushy or inflated.",
];

const proof = [
  { label: "Booked calls", value: "+38%" },
  { label: "Show-up rate", value: "82%" },
  { label: "CAC payback", value: "19 days" },
];

const credibilityNotes = [
  "Best for agencies, consultants, and service firms with a real sales process behind the page.",
  "Works when the buyer needs context, proof, and a clear next step before they are willing to book.",
];

const slots = ["Today 2:30 PM", "Today 4:00 PM", "Thu 10:00 AM", "Thu 1:15 PM", "Fri 11:30 AM"];

export default function HighTicketVslBookingPage() {
  return (
    <div className="min-h-140 overflow-hidden rounded-[30px] bg-slate-200 p-px text-slate-900 shadow-lg">
      <div className="min-h-full bg-white">
        <div className="bg-slate-950 px-6 py-4 text-slate-100 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-200">Founder-led VSL</div>
              <div className="mt-1 text-sm text-slate-300">Video sales page paired with an immediate booking path for high-consideration service offers.</div>
            </div>
            <div className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-200 ring-1 ring-white/10">Typical runtime: 12:48</div>
          </div>
        </div>

        <div className="grid gap-px bg-slate-200 2xl:grid-cols-[1.16fr_0.84fr]">
          <section className="bg-white">
            <div className="px-6 py-8 lg:px-8">
              <div className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">Built for agencies, consultancies, and premium services</div>
              <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-slate-950 md:text-6xl">
                Show qualified buyers exactly why the call is worth taking.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                This page works when the buyer needs a clear explanation of the offer, proof that the approach is credible, and a direct path to book once the value is established.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800">
                  <Play className="h-4 w-4 fill-current" />
                  Watch the overview
                </button>
                <div className="text-sm text-slate-500">Best when the sales conversation is the next logical step, not the first explanation.</div>
              </div>
            </div>

            <div className="grid gap-px bg-slate-200 md:grid-cols-3">
              {proof.map((item) => (
                <div key={item.label} className="bg-white px-6 py-5">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{item.label}</div>
                  <div className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{item.value}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-px bg-slate-200 2xl:grid-cols-[1.02fr_0.98fr]">
              <div className="bg-white px-6 py-8 lg:px-8">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">What this page needs to accomplish</div>
                <div className="mt-5 overflow-hidden rounded-[26px] bg-slate-200 p-px">
                  <div className="divide-y divide-slate-200 bg-white">
                    {outcomes.map((item, index) => (
                      <div key={item} className="grid gap-3 bg-slate-50 px-5 py-5 md:grid-cols-[44px_minmax(0,1fr)] md:items-start">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200">0{index + 1}</div>
                        <div className="text-sm leading-7 text-slate-600">{item}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 rounded-[26px] bg-slate-100 px-5 py-5 ring-1 ring-slate-200">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Why teams use this format</div>
                  <div className="mt-4 space-y-4">
                    {credibilityNotes.map((note) => (
                      <div key={note} className="flex gap-3 text-sm leading-7 text-slate-600">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-sky-600" />
                        <span>{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 px-6 py-8 lg:px-8">
                <div className="rounded-[28px] bg-slate-200 p-px shadow-sm">
                  <div className="bg-white">
                    <div className="px-5 py-4">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Video Overview</div>
                      <div className="mt-2 text-2xl font-semibold leading-tight text-slate-950">What prospects should understand before they book</div>
                    </div>

                    <div className="p-5 pt-0">
                      <div className="relative min-h-96 overflow-hidden rounded-3xl bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] ring-1 ring-slate-200">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_38%)]" />
                        <div className="absolute inset-x-6 top-6 rounded-xl bg-white/90 px-4 py-3 text-sm text-slate-600 shadow-sm ring-1 ring-slate-200 backdrop-blur">
                          Explain the problem, walk through the method, show proof, and make the next step obvious.
                        </div>
                        <button className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition-transform hover:scale-[1.02]">
                          <Play className="ml-1 h-8 w-8 fill-current" />
                        </button>
                        <div className="absolute inset-x-6 bottom-6 rounded-[20px] bg-white px-5 py-5 shadow-sm ring-1 ring-slate-200">
                          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Recommended talking points</div>
                          <div className="mt-3 space-y-3 text-sm leading-7 text-slate-600">
                            <div>Lead with the business problem and the cost of leaving it unresolved.</div>
                            <div>Show the mechanism in simple language instead of relying on hype or abstract framing.</div>
                            <div>Use the call as a working session for fit, priorities, and implementation scope.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="bg-slate-50 px-6 py-8 lg:px-8">
            <div className="rounded-[28px] bg-slate-200 p-px shadow-sm">
              <div className="bg-white">
                <div className="px-6 py-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Book a strategy call</div>
                      <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-slate-950">
                        Choose a time to review the offer, funnel, and sales process.
                      </h2>
                    </div>
                    <div className="rounded-[22px] bg-slate-100 px-4 py-4 text-right ring-1 ring-slate-200">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Availability</div>
                      <div className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">18</div>
                      <div className="text-[11px] text-slate-500">slots this week</div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-px bg-slate-200 sm:grid-cols-2">
                  <div className="bg-slate-50 px-6 py-5 text-sm text-slate-600">30-minute working session</div>
                  <div className="bg-slate-50 px-6 py-5 text-sm text-slate-600">Response within 1 business day</div>
                </div>

                <div className="px-6 py-6">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <CalendarDays size={15} strokeWidth={2.1} />
                    Choose a time
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {slots.map((slot, index) => (
                      <button
                        key={slot}
                        className={index === 1 ? "rounded-xl bg-slate-900 px-4 py-4 text-left text-sm font-semibold text-white" : "rounded-xl bg-slate-50 px-4 py-4 text-left text-sm text-slate-600 ring-1 ring-slate-200 transition-colors hover:bg-white"}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 rounded-3xl bg-slate-100 px-5 py-5 ring-1 ring-slate-200">
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      <Clock3 size={13} strokeWidth={2.2} />
                      What happens on the call
                    </div>
                    <div className="mt-4 space-y-4">
                      {[
                        "Review the offer, pricing, positioning, and current conversion path.",
                        "Pinpoint where intent is dropping between page, form, and calendar.",
                        "Leave with a clear recommendation for the next funnel change to test.",
                      ].map((item) => (
                        <div key={item} className="flex gap-3 text-sm leading-7 text-slate-600">
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-sky-600" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 rounded-3xl bg-white px-5 py-5 ring-1 ring-slate-200">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Best fit</div>
                    <div className="mt-2 text-sm leading-7 text-slate-600">Teams already selling a meaningful service who need a clearer path from explanation to booked conversation.</div>
                  </div>

                  <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800">
                    Reserve my slot
                    <ArrowRight size={15} strokeWidth={2.2} />
                  </button>

                  <div className="mt-3 text-sm leading-6 text-slate-500">
                    Appropriate for high-consideration offers where the buyer expects context, proof, and a direct next step before committing time.
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