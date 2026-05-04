/**
 * Sales Qualification Application
 * Category: Funnels
 * Tags: funnel, application, qualification, high-ticket, survey, sales-call, lead-quality
 * Description: A structured high-ticket application flow that qualifies for fit before the calendar opens. Uses progress framing, proof beside the form, and short-answer fields that help the sales team enter the call with real context instead of generic form data.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/sales-qualification-application.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { ArrowRight, CircleDollarSign, LineChart, MessageSquareQuote } from "lucide-react";

const proof = [
  { label: "Avg. close rate lift", value: "+21%", icon: LineChart },
  { label: "Sales-qualified show-up", value: "84%", icon: MessageSquareQuote },
  { label: "Best-fit offer size", value: "$3k-$30k", icon: CircleDollarSign },
];

const fields = [
  { label: "What are you selling right now?", value: "Premium offer with VSL + booked call" },
  { label: "Monthly lead volume", value: "300-500 inbound clicks" },
  { label: "Where is conversion leaking most?", value: "Lots of calls booked, weak pre-call intent" },
  { label: "Budget range", value: "$5k-$12k / month" },
];

const fitChecks = ["Offer clarity", "Urgency", "Budget", "Implementation readiness"];

export default function SalesQualificationApplication() {
  return (
    <div className="min-h-135 overflow-hidden rounded-[30px] bg-slate-200 p-px text-slate-900 shadow-lg">
      <div className="min-h-full bg-slate-50">
        <div className="bg-white px-6 py-4 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">Qualification form</div>
              <div className="mt-1 text-sm text-slate-500">Intake flow for screening fit before a sales call is ever offered.</div>
            </div>
            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600 ring-1 ring-slate-200">Selective application</div>
          </div>
        </div>

        <div className="grid gap-px bg-slate-200 2xl:grid-cols-[1.08fr_0.92fr]">
          <section className="bg-white">
            <div className="px-6 py-6 lg:px-8">
              <div className="flex flex-wrap items-center gap-3">
                {[
                  { label: "Context", active: false },
                  { label: "Fit", active: true },
                  { label: "Calendar", active: false },
                  { label: "Prep", active: false },
                ].map((item) => (
                  <div key={item.label} className={item.active ? "rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white" : "rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-200"}>
                    {item.label}
                  </div>
                ))}
              </div>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">Screen for fit before the calendar opens.</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                Ask only the questions that change the sales process: what is being sold, where conversion is leaking, how urgent the problem is, and whether the buyer is prepared to move.
              </p>
            </div>

            <div className="grid gap-px bg-slate-200 md:grid-cols-3">
              {proof.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="bg-white px-6 py-5">
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      <Icon size={14} strokeWidth={2} className="text-emerald-700" />
                      {item.label}
                    </div>
                    <div className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{item.value}</div>
                  </div>
                );
              })}
            </div>

            <div className="px-6 py-6 lg:px-8">
              <div className="rounded-[28px] bg-slate-200 p-px">
                <div className="bg-slate-50">
                  <div className="px-5 py-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Application fields</div>
                        <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Growth audit fit form</div>
                      </div>
                      <div className="rounded-[20px] bg-white px-4 py-3 text-right ring-1 ring-slate-200">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Stage</div>
                        <div className="mt-1 text-lg font-semibold text-slate-950">02 / 04</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-px bg-slate-200 xl:grid-cols-2">
                    {fields.map((field) => (
                      <div key={field.label} className="bg-white px-4 py-4">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{field.label}</div>
                        <div className="mt-3 text-sm leading-7 text-slate-700">{field.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white px-5 py-5">
                    <div className="rounded-[22px] bg-slate-100 px-4 py-4 ring-1 ring-slate-200">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Desired outcome</div>
                      <div className="mt-3 text-sm leading-7 text-slate-600">
                        We want the page to qualify harder before the call so the buyer already understands the mechanism and the sales team can work from context instead of re-educating from scratch.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="bg-slate-50 px-6 py-6 lg:px-8">
            <div className="rounded-[28px] bg-slate-200 p-px shadow-sm">
              <div className="bg-white">
                <div className="px-6 py-5">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Reviewer notes</div>
                  <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                    <div>Reject vague pain statements.</div>
                    <div>Push for real budget and urgency signals.</div>
                    <div>Only open the calendar if the answers change the call quality.</div>
                  </div>
                </div>

                <div className="bg-slate-50 px-6 py-5">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Fit criteria</div>
                  <div className="mt-4 space-y-4">
                    {fitChecks.map((item, index) => (
                      <div key={item}>
                        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                          <span>{item}</span>
                          <span>{index < 2 ? "Strong" : "Review"}</span>
                        </div>
                        <div className="mt-2 grid grid-cols-12 gap-px overflow-hidden rounded-full bg-slate-200">
                          {Array.from({ length: 12 }).map((_, blockIndex) => {
                            const activeBlocks = index === 0 ? 10 : index === 1 ? 9 : index === 2 ? 7 : 6;
                            return <div key={blockIndex} className={blockIndex < activeBlocks ? "h-3 bg-slate-900" : "h-3 bg-white"} />;
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-6 py-6">
                  <div className="rounded-[22px] bg-emerald-50 px-4 py-4 text-sm leading-7 text-emerald-900 ring-1 ring-emerald-200">
                    If the applicant is accepted, open the calendar immediately while intent is still live.
                  </div>
                  <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800">
                    Continue
                    <ArrowRight size={15} strokeWidth={2.2} />
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}