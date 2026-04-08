/**
 * Assistant Handoff Review Shell
 * Category: App Shells
 * Tags: assistant, handoff, review, two-panel, approval, artifact, workspace
 * Description: A two-panel review shell for approving assistant-generated output, preserving source context on the left and actionable handoff detail on the right.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/assistant-handoff-review-shell.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { AlertCircle, CheckCircle2, FileText, MessageSquareText, ShieldAlert } from "lucide-react";

const contextBlocks = [
  {
    label: "Original brief",
    copy: "Design a serious assistant workspace that preserves route context, exposes dominant task surface, and avoids soft empty-card grammar.",
  },
  {
    label: "Judgment layer",
    copy: "Surface: assistant_workspace. Dominant surface: two_panel_review. Confidence mode: proceed_with_cautions.",
  },
  {
    label: "Missing truth",
    copy: "Final approval action names are still product-specific and should stay generic until confirmed.",
  },
];

const checks = [
  { label: "Shell respects dominant task surface", state: "pass" },
  { label: "No duplicate mode switching", state: "pass" },
  { label: "Approval copy still generic", state: "review" },
  { label: "State behavior defined", state: "pass" },
];

const sections = [
  { title: "Preserve", copy: "Two-panel review grammar, context-first left panel, compact action footer, restrained badges." },
  { title: "Safe to adapt", copy: "Label wording, local tokens, small spacing adjustments, cue icons." },
  { title: "Avoid", copy: "Top-of-page metric cards, decorative hero framing, dropdown duplication, fake workflow lanes." },
];

function statusMark(state: string) {
  if (state === "pass") {
    return <CheckCircle2 className="h-4 w-4 text-emerald-600" />;
  }

  return <ShieldAlert className="h-4 w-4 text-amber-600" />;
}

export default function AssistantHandoffReviewShell() {
  return (
    <div className="h-[500px] overflow-hidden rounded-[24px] border border-slate-200 bg-white text-slate-900">
      <div className="grid h-full grid-cols-[minmax(0,1.05fr)_340px]">
        <section className="flex min-w-0 flex-col border-r border-slate-200 bg-slate-50">
          <header className="border-b border-slate-200 px-6 py-5">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-slate-500">
              <MessageSquareText className="h-3.5 w-3.5" />
              Assistant handoff
            </div>
            <h2 className="mt-2 text-lg font-semibold text-slate-950">Review context before shipping structure</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">The left panel preserves the reasoning chain so the reviewer can approve the shell without losing why it was chosen.</p>
          </header>

          <div className="flex-1 overflow-auto px-6 py-5">
            <div className="space-y-4">
              {contextBlocks.map((block) => (
                <div key={block.label} className="rounded-[20px] border border-slate-200 bg-white px-4 py-4">
                  <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">{block.label}</div>
                  <p className="mt-3 text-sm leading-7 text-slate-800">{block.copy}</p>
                </div>
              ))}

              <div className="rounded-[20px] border border-red-200 bg-red-50 px-4 py-4 text-sm leading-6 text-red-900">
                Do not convert this into a summary-led dashboard. The review object is the handoff itself.
              </div>
            </div>
          </div>
        </section>

        <aside className="flex flex-col bg-white">
          <div className="border-b border-slate-200 px-5 py-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Review panel</div>
                <h3 className="mt-2 text-base font-semibold text-slate-950">Approve assistant build guidance</h3>
              </div>
              <FileText className="h-4 w-4 text-slate-500" />
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-auto px-5 py-5">
            <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
              <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Checks</div>
              <div className="mt-3 space-y-3">
                {checks.map((item) => (
                  <div key={item.label} className="flex items-start gap-3 text-sm text-slate-700">
                    {statusMark(item.state)}
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {sections.map((section) => (
              <div key={section.title} className="rounded-[20px] border border-slate-200 p-4">
                <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">{section.title}</div>
                <p className="mt-3 text-sm leading-6 text-slate-700">{section.copy}</p>
              </div>
            ))}

            <div className="rounded-[20px] border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              <div className="flex items-center gap-2 font-medium">
                <AlertCircle className="h-4 w-4" />
                Caution
              </div>
              <p className="mt-2">Keep the approval footer generic until the real mutation path is confirmed in product truth.</p>
            </div>
          </div>

          <div className="border-t border-slate-200 px-5 py-4">
            <div className="flex items-center gap-2">
              <button className="h-9 rounded-full border border-slate-300 px-3 text-xs font-medium text-slate-700">Request revision</button>
              <button className="h-9 rounded-full border border-slate-300 px-3 text-xs font-medium text-slate-700">Hold</button>
              <button className="ml-auto h-9 rounded-full bg-slate-950 px-4 text-xs font-semibold text-white">Approve shell</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}