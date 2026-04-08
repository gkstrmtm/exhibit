/**
 * Context-Aware Assistant Console
 * Category: App Shells
 * Tags: assistant, prompt, complaint, intake, context, llm, operations
 * Description: A compact routing console that compresses intake context into a clear route, working assumptions, and a focused resource package.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/context-aware-assistant-console.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

const signalStack = [
  { label: "Original ask", value: "real assistant shells" },
  { label: "Complaint", value: "result felt generic" },
  { label: "Desired route", value: "assistant-workspace" },
  { label: "Tone bias", value: "serious internal" },
];

const preservedContext = [
  "Keep the original complaint beside the routed answer.",
  "Infer tone before suggesting chrome-heavy patterns.",
  "Ask one clarifying question only when the surface stays ambiguous.",
];

const resourcePull = [
  { label: "Primary shell", value: "general-assistant-chat-workspace" },
  { label: "Artifact option", value: "artifact-collaboration-shell" },
  { label: "View switching", value: "segmented-button-controls" },
  { label: "Feedback", value: "notification-toast-stack" },
];

const defaults = [
  "Restrained 14-16px neutral line cues.",
  "Task-first copy instead of helper prose.",
  "One dominant work surface per screen.",
];

const questions = [
  "Should employee access feel more security-led or more AI-workspace led?",
  "Does this need a durable artifact lane, or should the thread remain primary?",
];

export default function ContextAwareAssistantConsole() {
  return (
    <div className="min-h-[520px] overflow-hidden rounded-[30px] border border-slate-200 bg-[linear-gradient(180deg,#fcfdff_0%,#f4f6fa_100%)] text-slate-900 shadow-[0_24px_72px_rgba(15,23,42,0.08)]">
      <div className="grid min-h-[520px] grid-cols-[280px_minmax(0,1fr)]">
        <aside className="border-r border-slate-200 bg-[#eef3f8] p-5">
          <div className="rounded-[24px] bg-slate-950 p-4 text-white">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-300">Intake payload</div>
            <p className="mt-3 text-sm leading-7 text-slate-100">
              Preserve the complaint, infer the right tone, and return a route that feels like a working system instead of a generic assistant demo.
            </p>
          </div>

          <div className="mt-4 rounded-[24px] border border-slate-200 bg-white p-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Captured signals</div>
            <div className="mt-3 space-y-2">
              {signalStack.map((item) => (
                <div key={item.label} className="rounded-2xl bg-slate-50 px-3 py-3">
                  <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500">{item.label}</div>
                  <div className="mt-1 text-sm font-medium text-slate-900">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-[24px] border border-slate-200 bg-white p-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Preserve in handoff</div>
            <div className="mt-3 space-y-3 text-sm text-slate-700">
              {preservedContext.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 px-3 py-3 leading-6">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex min-w-0 flex-col">
          <header className="border-b border-slate-200 px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Context-aware route</div>
                <h2 className="mt-1 text-lg font-semibold text-slate-950">Focused recommendation console</h2>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.14em] text-slate-500">
                <span className="rounded-full border border-slate-300 bg-white px-3 py-1.5">assistant-workspace</span>
                <span className="rounded-full border border-slate-300 bg-white px-3 py-1.5">confidence 0.92</span>
              </div>
            </div>
          </header>

          <div className="flex-1 px-6 py-6">
            <div className="mx-auto grid max-w-5xl gap-4 xl:grid-cols-[minmax(0,1.25fr)_320px]">
              <div className="space-y-4">
                <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_16px_30px_rgba(15,23,42,0.04)]">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Compressed route brief</div>
                      <div className="mt-2 text-sm font-medium text-slate-950">Treat this as a serious internal assistant surface with preserved complaint context.</div>
                    </div>
                    <span className="rounded-full bg-slate-950 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-white">ready to hand off</span>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-3">
                    {[
                      { label: "Preserve", value: "original complaint + route hint" },
                      { label: "Infer", value: "serious workday tone" },
                      { label: "Return", value: "shell + controls + feedback" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-[20px] bg-slate-50 px-4 py-4">
                        <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">{item.label}</div>
                        <div className="mt-2 text-sm font-medium text-slate-900">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[26px] border border-slate-200 bg-white p-5">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Recommended package</div>
                  <div className="mt-4 space-y-2">
                    {resourcePull.map((item) => (
                      <div key={item.label} className="flex items-center justify-between gap-4 rounded-[18px] border border-slate-200 px-4 py-3">
                        <span className="text-sm text-slate-500">{item.label}</span>
                        <span className="text-sm font-medium text-slate-950">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[26px] border border-slate-200 bg-[#f8fafc] p-5">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Safe defaults if no one answers back</div>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {defaults.map((item) => (
                      <div key={item} className="rounded-[18px] border border-slate-200 bg-white px-4 py-4 text-sm leading-6 text-slate-700">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[26px] border border-slate-200 bg-white p-5">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Ask only if still unclear</div>
                  <div className="mt-4 space-y-3 text-sm text-slate-700">
                    {questions.map((item) => (
                      <div key={item} className="rounded-[18px] bg-slate-50 px-4 py-4 leading-6">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[26px] border border-slate-200 bg-slate-950 p-5 text-white">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-slate-300">Delivery rule</div>
                  <p className="mt-3 text-sm leading-7 text-slate-100">
                    The answer should feel like a routed operational handoff, not a brainstorm. Keep the payload compact, opinionated, and ready for the next implementation pass.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}