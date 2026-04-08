/**
 * Agent Run Log Row
 * Category: Admin
 * Tags: agent, pipeline, log, execution, audit, latency, status, developer
 * Description: Agent execution log row showing intelligence stage called, input summary, output shape, latency, status badge, and timestamp. For platforms tracking agentic API calls and design intelligence pipeline runs.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/agent-run-log-row.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { Activity } from "lucide-react";

const runs = [
  {
    stage: "elevation-audit",
    inputHash: "a3f9b2c1",
    outputSummary: "ready_to_elevate — 3 generic traps, 4 differentiating moves",
    latency: "112ms",
    status: "ok",
    ts: "14:32:04",
  },
  {
    stage: "funnel-strategy",
    inputHash: "d7e1a08f",
    outputSummary: "frictionless — email-capture, 3 timing moments, 6 components",
    latency: "88ms",
    status: "ok",
    ts: "14:31:47",
  },
  {
    stage: "workflow-audit-and-iteration",
    inputHash: "b5c2f491",
    outputSummary: "fix_structure_first — data sources absent, primary object unclear",
    latency: "94ms",
    status: "gated",
    ts: "14:30:12",
  },
  {
    stage: "elevation-audit",
    inputHash: "7e3d9f20",
    outputSummary: "fix_structure_first — clarification threshold exceeded",
    latency: "79ms",
    status: "gated",
    ts: "14:28:55",
  },
];

const statusStyle: Record<string, string> = {
  ok: "border-emerald-200 bg-emerald-50 text-emerald-700",
  gated: "border-amber-200 bg-amber-50 text-amber-700",
  error: "border-red-200 bg-red-50 text-red-700",
};

export default function AgentRunLogRow() {
  return (
    <div className="w-full max-w-xl overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
        <Activity className="h-3.5 w-3.5 text-slate-400" />
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
          Agent run log
        </span>
        <span className="ml-auto font-mono text-[10px] text-slate-400">Today · {runs.length} calls</span>
      </div>

      <div className="divide-y divide-slate-100">
        {runs.map((run, i) => (
          <div key={i} className="px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-semibold text-slate-800">{run.stage}</span>
              <span
                className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] ${statusStyle[run.status]}`}
              >
                {run.status}
              </span>
              <span className="ml-auto font-mono text-[11px] text-slate-400">{run.latency}</span>
              <span className="font-mono text-[11px] text-slate-400">{run.ts}</span>
            </div>
            <div className="mt-1.5 flex items-start gap-2">
              <span className="mt-0.5 font-mono text-[10px] text-slate-400">#{run.inputHash}</span>
              <span className="text-[11px] leading-[1.5] text-slate-600">{run.outputSummary}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
