/**
 * Data Source Connection Card
 * Category: Admin
 * Tags: data source, integration, schema, connection, fields, sync, api
 * Description: Connection card for a declared data source showing name, type, connection status, field count, last-synced timestamp, and disconnect action. Maps to the dataSources context field used by the design intelligence API.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/data-source-connection-card.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { Database, Plus, RefreshCw, Unlink } from "lucide-react";

const sources = [
  {
    name: "CRM",
    type: "REST API",
    status: "connected",
    fieldCount: 47,
    lastSynced: "04:02 ago",
    objects: ["contact", "deal", "pipeline_stage"],
  },
  {
    name: "Task Queue",
    type: "Webhook",
    status: "connected",
    fieldCount: 18,
    lastSynced: "12:41 ago",
    objects: ["task", "assignee", "status"],
  },
  {
    name: "Scheduling API",
    type: "OAuth",
    status: "degraded",
    fieldCount: 11,
    lastSynced: "2h 08m ago",
    objects: ["slot", "booking", "calendar_id"],
  },
];

const statusDot: Record<string, string> = {
  connected: "bg-emerald-500",
  degraded: "bg-amber-400",
  disconnected: "bg-slate-300",
};

export default function DataSourceConnectionCard() {
  return (
    <div className="w-full max-w-lg space-y-2">
      {sources.map((src) => (
        <div key={src.name} className="rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center gap-3 px-4 py-3">
            <Database className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <div className="flex flex-1 min-w-0 items-center gap-2">
              <span className="text-[13px] font-semibold text-slate-900">{src.name}</span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[10px] text-slate-500">
                {src.type}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${statusDot[src.status]}`} />
              <span className="text-[11px] text-slate-500">{src.status}</span>
            </div>
          </div>

          <div className="border-t border-slate-100 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-800">{src.fieldCount}</span> fields
                </span>
                <div className="flex flex-wrap gap-1">
                  {src.objects.map((o) => (
                    <span key={o} className="rounded font-mono text-[10px] text-slate-500">
                      {o}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-[10px] text-slate-400">{src.lastSynced}</span>
                <button className="text-slate-400 hover:text-slate-600">
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
                <button className="text-slate-400 hover:text-red-500">
                  <Unlink className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button className="flex w-full items-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 py-3 text-[12px] font-medium text-slate-500 hover:border-slate-400 hover:text-slate-700">
        <Plus className="h-3.5 w-3.5" />
        Add data source
      </button>
    </div>
  );
}
