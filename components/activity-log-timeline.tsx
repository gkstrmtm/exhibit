/**
 * Activity Log / Audit Trail
 * Category: Data Density
 * Tags: timeline, audit, log, activity, data-density
 * Description: Vertical timeline audit trail with timestamps, actor names, event types, and alternating row backgrounds for scanability.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/activity-log-timeline.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function ActivityLogTimeline() {
  const events = [
    { time: "2024-01-15 14:32", actor: "Sarah Chen", action: "created user account", type: "user" },
    { time: "2024-01-15 14:28", actor: "Admin Bot", action: "changed permissions for Editor role", type: "permission" },
    { time: "2024-01-15 13:55", actor: "James Miller", action: 'edited document "Q4 Report"', type: "document" },
    { time: "2024-01-15 12:10", actor: "DevOps Service", action: "generated new API key (prod-****-7f3a)", type: "api" },
    { time: "2024-01-15 11:45", actor: "Maria Garcia", action: "updated notification settings", type: "settings" },
  ];

  return (
    <div className="p-8 bg-white min-h-[300px]">
      <div className="max-w-2xl mx-auto">
        {events.map((e, i) => (
          <div key={i} className={`flex gap-4 py-4 px-4 ${i % 2 === 0 ? "bg-neutral-50" : "bg-white"} rounded`}>
            <span className="text-xs text-neutral-400 font-mono w-36 shrink-0 pt-0.5">{e.time}</span>
            <div className="flex flex-col items-center pt-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-blue-200" />
              {i < events.length - 1 && <div className="w-px flex-1 bg-neutral-200 mt-1" />}
            </div>
            <div className="text-sm text-neutral-700 pb-2">
              <strong className="text-neutral-900">{e.actor}</strong> {e.action}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}