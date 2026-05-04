/**
 * Webinar Registration Call Funnel
 * Category: Funnels
 * Tags: funnel, webinar, registration, call, event, training, authority, booking, webinar-to-call
 * Description: A webinar registration page built to convert cold or warm traffic into event signups and then route the most engaged attendees into booked strategy calls. Useful for founders and service offers that sell through teaching before the call.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/webinar-registration-call-funnel.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { ArrowRight, CalendarClock, PlayCircle, Users2 } from "lucide-react";

const takeaways = [
  "Which VSL and booking flows hold intent instead of burning it.",
  "Where high-ticket funnels lose buyers between proof, form, and calendar.",
  "How to decide between webinar-to-call, VSL-to-call, and application-first.",
];

const schedule = [
  { label: "Live training", value: "Thursday 1:00 PM ET" },
  { label: "Duration", value: "42 minutes" },
  { label: "Seats left", value: "27" },
];

const eventNotes = ["Founder-led walkthrough", "Live Q&A and objection teardown"];

export default function WebinarRegistrationCallFunnel() {
  return (
    <div className="min-h-130 overflow-hidden rounded-[30px] bg-slate-200 p-px text-slate-900 shadow-lg">
      <div className="min-h-full bg-white">
        <div className="bg-slate-950 px-6 py-4 text-slate-100 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-200">Live workshop funnel</div>
              <div className="mt-1 text-sm text-slate-300">Registration page for teaching-led offers where buyers need context before they book.</div>
            </div>
            <div className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-200 ring-1 ring-white/10">Teach first, book second</div>
          </div>
        </div>

        <div className="grid gap-px bg-slate-200 2xl:grid-cols-[1.18fr_0.82fr]">
          <section className="bg-white">
            <div className="px-6 py-8 lg:px-8">
              <div className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-100">Live event registration</div>
              <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-slate-950 md:text-6xl">
                Turn a live training into qualified follow-up calls.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Use this when the audience needs the problem explained, the mechanism taught, and the right next step earned through the event itself.
              </p>
            </div>

            <div className="grid gap-px bg-slate-200 md:grid-cols-3">
              {schedule.map((item) => (
                <div key={item.label} className="bg-white px-6 py-5">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{item.label}</div>
                  <div className="mt-3 text-2xl font-semibold leading-tight text-slate-950">{item.value}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-px bg-slate-200 2xl:grid-cols-[1.02fr_0.98fr]">
              <div className="bg-white px-6 py-8 lg:px-8">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Workshop agenda</div>
                <div className="mt-5 overflow-hidden rounded-[26px] bg-slate-200 p-px">
                  <div className="divide-y divide-slate-200 bg-white">
                    {takeaways.map((item, index) => (
                      <div key={item} className="grid gap-3 bg-slate-50 px-5 py-5 xl:grid-cols-[120px_minmax(0,1fr)] xl:items-start">
                        <div className="text-sm font-semibold text-slate-900">Session {index + 1}</div>
                        <div className="text-sm leading-7 text-slate-600">{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 px-6 py-8 lg:px-8">
                <div className="rounded-[28px] bg-slate-200 p-px shadow-sm">
                  <div className="bg-white">
                    <div className="px-5 py-4">
                      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        <PlayCircle size={13} strokeWidth={2.2} />
                        Event format
                      </div>
                      <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Founder-led workshop with live Q&A</div>
                    </div>
                    <div className="p-5 pt-0">
                      <div className="space-y-4">
                        {eventNotes.map((note) => (
                          <div key={note} className="rounded-[20px] bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600 ring-1 ring-slate-200">
                            {note}
                          </div>
                        ))}
                      </div>
                      <div className="mt-5 rounded-[20px] bg-white px-4 py-4 text-sm leading-7 text-slate-600 ring-1 ring-slate-200">
                        The booking invitation should show up after engagement, not before. The event should do the educational work the call cannot do from zero.
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
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Reserve your seat</div>
                      <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-slate-950">Register for the live workshop.</h2>
                    </div>
                    <div className="rounded-[20px] bg-slate-100 px-4 py-4 text-right ring-1 ring-slate-200">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Seats left</div>
                      <div className="mt-2 text-3xl font-semibold text-slate-950">27</div>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-6 pt-0">
                  <div className="rounded-[22px] bg-slate-50 px-4 py-4 ring-1 ring-slate-200">
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      <CalendarClock size={13} strokeWidth={2.2} />
                      Registration fields
                    </div>
                    <div className="mt-4 grid gap-3 text-sm text-slate-600">
                      {[
                        "First name",
                        "Best email",
                        "What are you selling right now?",
                      ].map((label) => (
                        <div key={label} className="rounded-xl bg-white px-4 py-3 ring-1 ring-slate-200">{label}</div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 rounded-[22px] bg-white px-4 py-4 text-sm leading-7 text-slate-600 ring-1 ring-slate-200">
                    Best for colder audiences that need the problem and the solution framework explained before a sales call feels justified.
                  </div>

                  <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800">
                    Register now
                    <ArrowRight size={15} strokeWidth={2.2} />
                  </button>

                  <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                    <Users2 size={15} strokeWidth={2.2} />
                    Calls come later for the attendees who engage and qualify.
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