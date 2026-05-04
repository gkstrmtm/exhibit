/**
 * Advertorial Application Bridge
 * Category: Funnels
 * Tags: funnel, advertorial, long-form, application, bridge, authority, story, advertorial-to-application
 * Description: A long-form advertorial bridge page that turns story-led attention into application intent. Uses narrative proof, mechanism breakdown, and a mid-page application trigger for premium offers that do not convert well with short-form landing page structure.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/advertorial-application-bridge.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { ArrowRight, Bookmark, FileText, Newspaper } from "lucide-react";

const sections = [
  {
    label: "The gap",
    body: "Most funnels ask for the call before the buyer understands why the current path is broken. This page uses story and proof to build that realization first.",
  },
  {
    label: "The mechanism",
    body: "Explain the buying system, not just the features. If they understand the mechanism, the application becomes a natural next step instead of a leap.",
  },
  {
    label: "The bridge",
    body: "Once the buyer sees themselves in the story and the proof, move them into a short qualification application while intent is still narrative-driven.",
  },
];

const editorialStats = [
  { label: "Read time", value: "6 min" },
  { label: "Buyer stage", value: "Skeptical but curious" },
];

export default function AdvertorialApplicationBridge() {
  return (
    <div className="min-h-140 overflow-hidden rounded-[30px] bg-stone-200 p-px text-slate-900 shadow-lg">
      <div className="min-h-full bg-[#fcfaf7]">
        <div className="bg-white px-6 py-4 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-700">
                <Newspaper size={13} strokeWidth={2.2} />
                Thought-leadership bridge
              </div>
              <div className="mt-1 text-sm text-slate-500">Long-form article structure for buyers who need context before they will apply.</div>
            </div>
            <div className="rounded-full bg-stone-50 px-4 py-2 text-sm text-slate-600 ring-1 ring-stone-200">Story-led application path</div>
          </div>
        </div>

        <div className="grid gap-px bg-stone-200 2xl:grid-cols-[1.3fr_0.7fr]">
          <section className="bg-white p-6 lg:p-8">
            <div className="max-w-4xl">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Insight article</div>
              <h1 className="mt-4 max-w-3xl font-serif text-5xl font-semibold leading-tight tracking-tight text-slate-950 md:text-6xl">
                The long-form bridge for buyers who need the full case before they apply.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Use this when a short landing page cannot answer the buyer’s skepticism on its own. The article should build understanding first, then route the right reader into the application.
              </p>
            </div>

            <div className="mt-8 grid gap-px rounded-[28px] bg-stone-200 p-px 2xl:grid-cols-[1.05fr_0.95fr]">
              <div className="bg-[#fcfaf7] p-5">
                <div className="rounded-[24px] bg-stone-50 px-5 py-5 ring-1 ring-stone-200">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Executive summary</div>
                  <p className="mt-4 text-[15px] leading-8 text-slate-700">
                    Most funnels ask for the call before the buyer understands why the current path is broken. This structure makes the case in public first, so the application feels like the obvious continuation of the argument.
                  </p>
                </div>

                <div className="mt-5 overflow-hidden rounded-[24px] bg-stone-200 p-px">
                  <div className="divide-y divide-stone-200 bg-white">
                    {sections.map((section) => (
                      <div key={section.label} className="bg-white px-5 py-5">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{section.label}</div>
                        <div className="mt-3 text-sm leading-8 text-slate-700">{section.body}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-stone-50 p-5">
                <div className="rounded-[24px] bg-[#f7f2ea] px-5 py-5 ring-1 ring-stone-200">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    <Bookmark size={13} strokeWidth={2.2} />
                    Article notes
                  </div>
                  <div className="mt-4 overflow-hidden rounded-[18px] bg-stone-200 p-px">
                    <div className="divide-y divide-stone-200 bg-white">
                      {editorialStats.map((item) => (
                        <div key={item.label} className="px-4 py-4">
                          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{item.label}</div>
                          <div className="mt-1 text-lg font-semibold text-slate-950">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
                    <p>Lead with the buyer’s failed prior path.</p>
                    <p>Use proof to explain the mechanism, not to merely boast.</p>
                    <p>Only ask for the application once the next step feels earned.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="bg-stone-50 p-6 lg:p-8">
            <div className="rounded-[28px] bg-stone-200 p-px shadow-sm">
              <div className="bg-white">
                <div className="px-6 py-6">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Apply for the breakdown</div>
                  <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-slate-950">Submit the application while the case is still fresh.</h2>
                </div>

                <div className="px-6 py-6 pt-0">
                  <div className="rounded-[22px] bg-stone-50 px-4 py-4 ring-1 ring-stone-200">
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      <FileText size={13} strokeWidth={2.2} />
                      Qualifier fields
                    </div>
                    <div className="mt-4 grid gap-3 text-sm text-slate-600">
                      {[
                        "What offer are you scaling right now?",
                        "Where does buyer intent break down?",
                        "What monthly budget are you prepared to deploy?",
                      ].map((field) => (
                        <div key={field} className="rounded-xl bg-white px-4 py-3 ring-1 ring-stone-200">{field}</div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 rounded-[22px] bg-white px-4 py-4 text-sm leading-7 text-slate-600 ring-1 ring-stone-200">
                    The application stays in the same narrative lane as the article. The reader should not feel like they were pushed into a separate funnel universe halfway through.
                  </div>

                  <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800">
                    Start application
                    <ArrowRight size={15} strokeWidth={2.2} />
                  </button>

                  <div className="mt-4 text-sm leading-7 text-slate-500">
                    Best when the offer needs a fuller explanation than a standard short-form hero can carry.
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