/**
 * Webhook Config Row
 * Category: Admin
 * Tags: webhook, integration, events, endpoint, developer, settings
 * Description: Webhook endpoint configuration row showing URL, subscribed event types, last-triggered timestamp, active toggle, and delete action. For platforms with event-driven integration patterns.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/webhook-config-row.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { Trash2, Zap } from "lucide-react";

const webhooks = [
  {
    url: "https://api.myapp.com/hooks/exhibit-agent",
    events: ["agent.response", "stage.complete"],
    lastTriggered: "2026-04-07T14:29:01Z",
    active: true,
  },
  {
    url: "https://n8n.internal.io/webhook/design-gate",
    events: ["elevation.blocked", "data_integrity.risk"],
    lastTriggered: "2026-04-07T11:04:18Z",
    active: true,
  },
  {
    url: "https://hooks.slack.com/services/T0••••/B0••••/••••",
    events: ["agent.response"],
    lastTriggered: "2026-04-06T09:12:44Z",
    active: false,
  },
];

function formatTs(iso: string) {
  const d = new Date(iso);
  return d.toISOString().replace("T", " ").slice(0, 16) + " UTC";
}

export default function WebhookConfigRow() {
  return (
    <div className="w-full max-w-lg space-y-px overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
        <Zap className="h-3.5 w-3.5 text-slate-400" />
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">Webhook endpoints</span>
        <span className="ml-auto font-mono text-[11px] text-slate-400">{webhooks.filter((w) => w.active).length} active</span>
      </div>

      {webhooks.map((wh, i) => (
        <div key={i} className={`${i < webhooks.length - 1 ? "border-b border-slate-100" : ""} px-4 py-3`}>
          <div className="flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${wh.active ? "bg-emerald-500" : "bg-slate-300"}`}
                />
                <span className="truncate font-mono text-[11px] text-slate-700">{wh.url}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {wh.events.map((ev) => (
                  <span
                    key={ev}
                    className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[10px] text-slate-600"
                  >
                    {ev}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <div
                className={`h-5 w-9 rounded-full ${wh.active ? "bg-slate-900" : "bg-slate-200"} flex items-center px-0.5`}
              >
                <div
                  className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${wh.active ? "translate-x-4" : ""}`}
                />
              </div>
              <button className="text-slate-300 hover:text-red-400">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="mt-2">
            <span className="font-mono text-[10px] text-slate-400">Last triggered: {formatTs(wh.lastTriggered)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
