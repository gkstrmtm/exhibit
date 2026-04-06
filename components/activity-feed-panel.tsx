/**
 * Activity Feed Panel
 * Category: Dashboard
 * Tags: activity, feed, events, dashboard, timeline
 * Description: Recent activity list with avatar, action description, timestamp, and a subtle left-border accent. Grouped into a card panel with scroll.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/activity-feed-panel.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function ActivityFeedPanel() {
  const events = [
    { user: "MK", name: "Mia K", action: "published a new exhibit", target: "Ghost Button Set", time: "2m ago", color: "#3b82f6" },
    { user: "LP", name: "Leo P", action: "starred", target: "Dark Pricing Card", time: "14m ago", color: "#10b981" },
    { user: "AT", name: "Ava T", action: "remixed", target: "Command Palette", time: "1h ago", color: "#f59e0b" },
    { user: "ST", name: "Sam T", action: "commented on", target: "Bento Grid", time: "3h ago", color: "#8b5cf6" },
  ];
  return (
    <div className="bg-white border border-neutral-100 rounded-xl overflow-hidden max-w-sm">
      <div className="px-4 py-3 border-b border-neutral-100 flex items-center justify-between">
        <span className="text-sm font-semibold text-neutral-900">Recent activity</span>
        <button className="text-xs text-neutral-400 hover:text-neutral-700">View all</button>
      </div>
      <div className="divide-y divide-neutral-50">
        {events.map((e, i) => (
          <div key={i} className="flex items-start gap-3 px-4 py-3">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5" style={{ background: e.color }}>{e.user}</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-neutral-700"><span className="font-medium">{e.name}</span> {e.action} <span className="font-medium">{e.target}</span></div>
              <div className="text-xs text-neutral-400 mt-0.5">{e.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}