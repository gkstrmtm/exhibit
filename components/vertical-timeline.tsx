/**
 * Vertical Timeline
 * Category: Data Display
 * Tags: timeline, events, changelog, history, data display
 * Description: Chronological event timeline with icon nodes, titles, descriptions, and timestamps. Left-aligned with a connecting line. Suitable for changelogs and histories.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/vertical-timeline.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function VerticalTimeline() {
  const events = [
    { icon: "🚀", title: "v2.0 launched", desc: "Major redesign with dark mode", time: "Apr 2, 2026" },
    { icon: "⭐", title: "1k creators", desc: "Community milestone reached", time: "Mar 14, 2026" },
    { icon: "⚡", title: "API released", desc: "Public component API went live", time: "Feb 28, 2026" },
    { icon: "🌱", title: "Beta launched", desc: "First 50 creators invited", time: "Jan 10, 2026" },
  ];
  return (
    <div className="max-w-xs py-4 pl-2">
      {events.map((e, i) => (
        <div key={i} className="flex gap-4 relative">
          {i < events.length - 1 && <div className="absolute left-4 top-8 w-px h-full bg-neutral-100" />}
          <div className="w-8 h-8 rounded-full bg-neutral-50 border border-neutral-100 flex items-center justify-center text-base shrink-0 relative z-10">{e.icon}</div>
          <div className="pb-6">
            <div className="text-sm font-medium text-neutral-900">{e.title}</div>
            <div className="text-xs text-neutral-500 mt-0.5">{e.desc}</div>
            <div className="text-xs text-neutral-300 mt-1">{e.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}