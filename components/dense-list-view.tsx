/**
 * Dense List View
 * Category: Data Density
 * Tags: dense, list, compact, rows, icon, hover
 * Description: An ultra-compact list view with 28px row height. Each row shows a small status dot, label, metadata, and a right-aligned secondary value — all within tight vertical spacing. Hover shows a subtle row highlight. Demonstrates maximum information density over minimum vertical space, common in log viewers and admin panels.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/dense-list-view.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

type Status = "active" | "idle" | "error" | "offline";

const STATUS_DOT: Record<Status, string> = {
  active: "bg-emerald-500",
  idle: "bg-amber-400",
  error: "bg-red-500",
  offline: "bg-neutral-300",
};

const ROWS = [
  { id: "srv-01", name: "api-gateway-prod", region: "us-east-1", status: "active" as Status, value: "99.9%" },
  { id: "srv-02", name: "auth-service", region: "us-east-1", status: "active" as Status, value: "99.7%" },
  { id: "srv-03", name: "image-resizer", region: "eu-west-1", status: "idle" as Status, value: "98.2%" },
  { id: "srv-04", name: "search-indexer", region: "us-west-2", status: "active" as Status, value: "99.1%" },
  { id: "srv-05", name: "mail-worker", region: "ap-south-1", status: "error" as Status, value: "82.4%" },
  { id: "srv-06", name: "billing-cron", region: "us-east-1", status: "idle" as Status, value: "97.6%" },
  { id: "srv-07", name: "webhook-relay", region: "eu-west-1", status: "active" as Status, value: "99.8%" },
  { id: "srv-08", name: "db-replica-01", region: "us-east-1", status: "offline" as Status, value: "—" },
  { id: "srv-09", name: "cdn-revalidator", region: "us-west-2", status: "active" as Status, value: "100%" },
  { id: "srv-10", name: "analytics-ingest", region: "eu-west-1", status: "active" as Status, value: "99.3%" },
];

export default function DenseListView() {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden w-full max-w-sm">
      {/* Header */}
      <div className="flex items-center px-3 py-1.5 border-b border-neutral-200 bg-neutral-50">
        <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest flex-1">Service</span>
        <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest w-20">Region</span>
        <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest w-12 text-right">Uptime</span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-neutral-100">
        {ROWS.map(({ id, name, region, status, value }) => (
          <div
            key={id}
            className="flex items-center px-3 hover:bg-neutral-50 transition-colors cursor-default"
            style={{ height: 28 }}
          >
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_DOT[status]}`} />
              <span className="text-[11px] text-neutral-800 truncate">{name}</span>
            </div>
            <span className="text-[10px] text-neutral-400 w-20 truncate">{region}</span>
            <span className={`text-[11px] font-medium w-12 text-right ${status === "error" ? "text-red-500" : status === "offline" ? "text-neutral-400" : "text-neutral-700"}`}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
