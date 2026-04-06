/**
 * Dense Activity Log
 * Category: Data Density
 * Tags: activity log, audit, dense, compact, data density
 * Description: Compact activity log where each row is a single tight line: timestamp, actor, action, and target. Max info per vertical pixel.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/dense-activity-log.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function DenseActivityLog() {
  const logs = [
    { time: "10:42", actor: "mia", action: "published", target: "Ghost Button Set" },
    { time: "10:38", actor: "system", action: "build completed", target: "v2.4.1" },
    { time: "10:31", actor: "leo", action: "starred", target: "Dark Pricing Card" },
    { time: "10:14", actor: "ava", action: "remixed", target: "Command Palette" },
    { time: "09:58", actor: "sam", action: "commented", target: "Bento Grid" },
    { time: "09:41", actor: "mia", action: "updated", target: "Glassmorphism Card" },
  ];
  return (
    <div className="bg-white border border-neutral-100 rounded-xl overflow-hidden max-w-md font-mono text-xs">
      <div className="px-3 py-2 bg-neutral-50 border-b border-neutral-100 flex gap-4 text-neutral-400 font-medium uppercase tracking-wide text-[10px]">
        <span className="w-10">Time</span><span className="w-16">Actor</span><span className="flex-1">Event</span>
      </div>
      {logs.map((l, i) => (
        <div key={i} className="px-3 py-1.5 border-b border-neutral-50 last:border-0 flex gap-4 items-center hover:bg-neutral-50">
          <span className="text-neutral-300 w-10 shrink-0">{l.time}</span>
          <span className="text-neutral-600 w-16 truncate shrink-0">{l.actor}</span>
          <span className="text-neutral-500 shrink-0">{l.action}</span>
          <span className="text-neutral-400 truncate">{l.target}</span>
        </div>
      ))}
    </div>
  );
}