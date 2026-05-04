/**
 * Case Study Proof Stack
 * Category: Funnels
 * Tags: funnel, proof, case-study, authority, testimonials, offer, high-ticket, sales
 * Description: A proof-first authority section for premium funnels. Stacks named outcomes, operator context, and credibility anchors in the order a skeptical buyer needs before accepting a strategy call or application CTA.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/case-study-proof-stack.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { ArrowUpRight, Quote } from "lucide-react";

const stories = [
  {
    company: "Offer Ops",
    result: "Booked-call close rate from 18% to 31% in 45 days",
    detail: "Shifted from generic demo CTA to VSL -> qualifier -> calendar and added pre-call conditioning after booking.",
  },
  {
    company: "Atlas Growth",
    result: "Show-up rate from 54% to 83%",
    detail: "Replaced a weak thank-you page with a short indoctrination VSL, reminder stack, and context form.",
  },
  {
    company: "ScaleCraft",
    result: "Applications became 2.3x more sales-ready",
    detail: "Changed the form from lead capture theater into a qualification device that screened for budget and urgency.",
  },
];

const dossierNotes = ["Named buyer context", "Measured outcome", "Sequence change tied to result"];

export default function CaseStudyProofStack() {
  return (
    <div className="min-h-105 overflow-hidden rounded-[28px] bg-slate-300 p-px text-slate-950 shadow-lg">
      <div className="min-h-full bg-[#f1ede4]">
      <div className="grid gap-px bg-slate-300 2xl:grid-cols-[0.78fr_1.22fr]">
        <section className="bg-[#f8f4ec] p-6">
          <div className="border-b border-slate-300 pb-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Proof dossier</div>
            <div className="mt-1 text-[12px] text-slate-600">Operator evidence arranged in buyer order</div>
          </div>
          <h1 className="mt-5 font-display text-5xl font-bold leading-none tracking-[-0.04em] text-slate-950">
            Authority should read like evidence.
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-700">
            This should feel closer to an operator report than a testimonial carousel. One sharp case study beats a wall of vague praise.
          </p>

          <div className="mt-6 space-y-3 rounded-xl border border-slate-300 bg-white p-5 shadow-sm">
            <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500">Evidence order</div>
            <div className="space-y-3 text-sm leading-7 text-slate-700">
              <div>1. Name the buyer type and business context.</div>
              <div>2. State the measurable outcome.</div>
              <div>3. Explain which sequence change created the lift.</div>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">
            {dossierNotes.map((note) => (
              <div key={note} className="border-b border-slate-200 px-4 py-3 text-[11px] uppercase tracking-[0.14em] text-slate-600 last:border-b-0">
                {note}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#111318] p-6 text-white">
          <div className="space-y-4">
            {stories.map((story, index) => (
              <div key={story.company} className="rounded-xl border border-white/10 bg-white/4 p-5 shadow-md">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-slate-400">Case {index + 1} · {story.company}</div>
                    <div className="mt-2 font-display text-[1.45rem] font-semibold tracking-[-0.025em] text-white">{story.result}</div>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/8 text-white">
                    <Quote size={18} strokeWidth={2.2} />
                  </div>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className={`h-full rounded-full ${index === 0 ? "w-[82%] bg-emerald-400" : index === 1 ? "w-[68%] bg-sky-400" : "w-[74%] bg-amber-400"}`} />
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-200">{story.detail}</p>
                <div className="mt-4 grid gap-px overflow-hidden border border-white/10 bg-white/10 xl:grid-cols-3">
                  {[
                    { label: "Offer fit", value: "Logged" },
                    { label: "Sequence", value: "Documented" },
                    { label: "Buyer", value: "Named" },
                  ].map((item) => (
                    <div key={item.label} className="bg-black/10 px-3 py-3">
                      <div className="text-[10px] uppercase tracking-[0.14em] text-slate-400">{item.label}</div>
                      <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-200">{item.value}</div>
                    </div>
                  ))}
                </div>
                <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-slate-300">
                  Read full breakdown
                  <ArrowUpRight size={15} strokeWidth={2.2} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
      </div>
    </div>
  );
}