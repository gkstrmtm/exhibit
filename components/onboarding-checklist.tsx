/**
 * Onboarding Checklist
 * Category: Onboarding
 * Tags: checklist, onboarding, steps, progress, first-run, tasks
 * Description: An onboarding checklist widget showing setup tasks with completion state. Completed tasks show a filled check and are visually dimmed. An overall progress bar reflects completion percentage. Clicking a task marks it complete. A dismiss button and completion celebration appear at 100%. Demonstrates the first-run onboarding checklist pattern.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/onboarding-checklist.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { CheckCircle2, Circle, ChevronRight } from "lucide-react";

const INITIAL_TASKS = [
  { id: 1, title: "Create your account", desc: "You're already here — nice!", done: true },
  { id: 2, title: "Complete your profile", desc: "Add a name, photo, and bio.", done: false },
  { id: 3, title: "Invite a teammate", desc: "Collaboration is better together.", done: false },
  { id: 4, title: "Create your first project", desc: "Start building something great.", done: false },
  { id: 5, title: "Connect an integration", desc: "Link Slack, GitHub, or your CRM.", done: false },
];

export default function OnboardingChecklist() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [dismissed, setDismissed] = useState(false);

  const done = tasks.filter(t => t.done).length;
  const pct = Math.round((done / tasks.length) * 100);
  const allDone = done === tasks.length;

  function toggle(id: number) {
    setTasks(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  if (dismissed) return (
    <div className="bg-white border border-neutral-200 rounded-xl p-4 w-full max-w-xs text-center">
      <p className="text-xs text-neutral-500">Checklist hidden. You can reopen it from Settings.</p>
      <button onClick={() => setDismissed(false)} className="text-[10px] text-blue-600 hover:underline mt-1">Reopen</button>
    </div>
  );

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden w-full max-w-xs">
      {/* Header */}
      <div className="px-4 py-3 border-b border-neutral-100">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-xs font-semibold text-neutral-900">Get started</div>
            <div className="text-[10px] text-neutral-400">{done} of {tasks.length} complete</div>
          </div>
          <button onClick={() => setDismissed(true)} className="text-[9px] text-neutral-400 hover:text-neutral-600">Dismiss</button>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-neutral-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Tasks */}
      <div className="divide-y divide-neutral-100">
        {tasks.map(({ id, title, desc, done: isDone }) => (
          <button
            key={id}
            onClick={() => toggle(id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-neutral-50 ${isDone ? "opacity-60" : ""}`}
          >
            {isDone
              ? <CheckCircle2 size={14} className="text-emerald-500 shrink-0" strokeWidth={2} />
              : <Circle size={14} className="text-neutral-300 shrink-0" strokeWidth={1.5} />}
            <div className="flex-1 min-w-0">
              <div className={`text-xs font-medium ${isDone ? "line-through text-neutral-400" : "text-neutral-800"}`}>{title}</div>
              {!isDone && <div className="text-[10px] text-neutral-400 truncate">{desc}</div>}
            </div>
            {!isDone && <ChevronRight size={12} className="text-neutral-300 shrink-0" />}
          </button>
        ))}
      </div>

      {/* Celebration */}
      {allDone && (
        <div className="px-4 py-3 bg-emerald-50 border-t border-emerald-200 text-center">
          <div className="text-xs font-semibold text-emerald-700">🎉 All done! You're all set up.</div>
        </div>
      )}
    </div>
  );
}
