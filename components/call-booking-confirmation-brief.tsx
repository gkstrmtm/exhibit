/**
 * Call Booking Confirmation Brief
 * Category: Funnels
 * Tags: funnel, booking, confirmation, call, reminder, next-steps, high-ticket, show-up
 * Description: A post-booking confirmation surface that reinforces the next step, summarizes the appointment, and makes pre-call actions explicit. Useful directly after the calendar step in high-ticket funnels where the confirmation page has to protect show-up rate and buyer readiness.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/call-booking-confirmation-brief.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { ArrowRight, CalendarDays, CheckCircle2, Clock3, MailCheck, MessageSquareText, PhoneCall } from "lucide-react";

const nextSteps = [
  "Check your inbox for the calendar invite and reminder links.",
  "Reply with the current funnel URL if you want pre-call review.",
  "Complete the short context form so the team walks in prepared.",
];

const readinessSignals = [
  { label: "Invite sent", value: "Delivered" },
  { label: "Prep status", value: "Waiting on buyer" },
];

const supportNotes = [
  "Your calendar invite, meeting link, and reminder sequence are already scheduled.",
  "If you want pre-call review, reply to the confirmation email with your current funnel URL.",
  "Use the prep page before the call so the team walks in with the right context.",
];

export default function CallBookingConfirmationBrief() {
  return (
    <div className="min-h-105 overflow-hidden rounded-[30px] bg-slate-200 p-px text-slate-900 shadow-lg">
      <div className="min-h-full bg-slate-50">
      <div className="bg-white px-6 py-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">Appointment confirmed</div>
            <div className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">Your strategy call is booked.</div>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 ring-1 ring-emerald-200">
            <CheckCircle2 size={15} strokeWidth={2.1} />
            Confirmed in calendar
          </div>
        </div>
      </div>

      <div className="grid gap-px bg-slate-200 2xl:grid-cols-[1.06fr_0.94fr]">
        <section className="bg-white">
          <div className="border-b border-slate-200 px-6 py-6 lg:px-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Confirmation receipt</div>
                <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">Everything needed for the appointment is already in motion.</h1>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-right">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Response window</div>
                <div className="mt-1 text-lg font-semibold text-slate-950">24h before call</div>
              </div>
            </div>
          </div>

          <div className="grid gap-px bg-slate-200 xl:grid-cols-2">
            {readinessSignals.map((item) => (
              <div key={item.label} className="bg-white px-6 py-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{item.label}</div>
                <div className="mt-2 text-lg font-semibold text-slate-950">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="grid gap-0 xl:grid-cols-[1fr_300px]">
            <div className="px-6 py-6 lg:px-8">
              <div className="rounded-3xl border border-slate-200 bg-slate-50">
                <div className="border-b border-slate-200 px-5 py-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Appointment details</div>
                  <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">30-minute strategy breakdown</div>
                </div>
                <div className="p-5">
                  <div className="space-y-4 text-sm leading-7 text-slate-600">
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4">
                      <CalendarDays size={16} strokeWidth={2.1} className="text-emerald-700" />
                      <span>Tue, Apr 30 at 10:00 AM PT</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4">
                      <PhoneCall size={16} strokeWidth={2.1} className="text-emerald-700" />
                      <span>Google Meet link included in the invite</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4">
                      <MessageSquareText size={16} strokeWidth={2.1} className="text-emerald-700" />
                      <span>SMS and email reminders are enabled automatically</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-3xl border border-slate-200 bg-white px-5 py-5 shadow-sm">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Next actions</div>
                <div className="mt-4 space-y-4">
                  {nextSteps.map((item, index) => (
                    <div key={item} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">{index + 1}</div>
                      <div className="text-sm leading-7 text-slate-600">{item}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="bg-slate-50 px-6 py-6 lg:px-8">
              <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-5 py-5">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    <Clock3 size={13} strokeWidth={2.2} />
                    Buyer support notes
                  </div>
                  <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
                    {supportNotes.map((item) => (
                      <div key={item} className="rounded-2xl bg-slate-50 px-4 py-4">{item}</div>
                    ))}
                  </div>
                </div>

                <div className="border-b border-slate-200 px-5 py-5">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    <MailCheck size={13} strokeWidth={2.2} />
                    What this page must prevent
                  </div>
                  <div className="mt-3 text-sm leading-7 text-slate-600">
                    No ambiguity, no dead-end thank-you copy, and no cooling-off gap between booking and prep.
                  </div>
                </div>

                <div className="px-5 py-5">
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm leading-7 text-emerald-900">
                    Best practice: send the buyer straight from this screen to the prep page so the show-up sequence starts immediately.
                  </div>
                  <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800">
                    Open prep page
                    <ArrowRight size={15} strokeWidth={2.2} />
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
      </div>
    </div>
  );
}