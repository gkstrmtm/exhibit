/**
 * System Health Panel
 * Category: Admin
 * Tags: admin, status, health, monitoring, services
 * Description: Service status panel showing operational/degraded/outage state for each subsystem. Green dot for healthy, amber for degraded, red for outage.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/system-health-panel.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function SystemHealthPanel() {
  const services = [
    { name: "API", status: "operational", latency: "42ms" },
    { name: "Database", status: "operational", latency: "8ms" },
    { name: "CDN", status: "degraded", latency: "310ms" },
    { name: "Email", status: "operational", latency: "—" },
    { name: "Search", status: "outage", latency: "—" },
  ];
  const dot = (s: string) => ({ operational: "#10b981", degraded: "#f59e0b", outage: "#ef4444" }[s] || "#a3a3a3");
  return (
    <div className="bg-white border border-neutral-100 rounded-xl overflow-hidden max-w-xs">
      <div className="px-4 py-3 border-b border-neutral-100 flex items-center justify-between">
        <span className="text-sm font-semibold text-neutral-900">System status</span>
        <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full">Mostly operational</span>
      </div>
      {services.map(s => (
        <div key={s.name} className="flex items-center gap-3 px-4 py-3 border-b border-neutral-50 last:border-0">
          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: dot(s.status) }} />
          <div className="flex-1 text-sm text-neutral-700">{s.name}</div>
          <div className="text-xs text-neutral-400 font-mono">{s.latency}</div>
          <div className="text-xs text-right" style={{ color: dot(s.status) }}>{s.status}</div>
        </div>
      ))}
    </div>
  );
}