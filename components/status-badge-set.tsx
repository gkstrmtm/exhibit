/**
 * Status Badge Set
 * Category: Data Display
 * Tags: badge, status, states, variants, color, semantic
 * Description: A reference panel showing all status badge variants across multiple semantic categories: task status, severity, system state, and presence. Demonstrates badge shape options (pill, rectangle, dot+label) and the color vocabulary for each semantic axis.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/status-badge-set.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
interface BadgeGroup {
  title: string;
  type: "pill" | "rect" | "dot";
  items: { label: string; bg: string; text: string; dot?: string }[];
}

const GROUPS: BadgeGroup[] = [
  {
    title: "Task / workflow status",
    type: "pill",
    items: [
      { label: "Open", bg: "bg-blue-100", text: "text-blue-700" },
      { label: "In Progress", bg: "bg-indigo-100", text: "text-indigo-700" },
      { label: "In Review", bg: "bg-amber-100", text: "text-amber-700" },
      { label: "Done", bg: "bg-emerald-100", text: "text-emerald-700" },
      { label: "Blocked", bg: "bg-red-100", text: "text-red-600" },
      { label: "Cancelled", bg: "bg-neutral-100", text: "text-neutral-500" },
    ],
  },
  {
    title: "Severity",
    type: "rect",
    items: [
      { label: "Critical", bg: "bg-red-600", text: "text-white" },
      { label: "High", bg: "bg-orange-500", text: "text-white" },
      { label: "Medium", bg: "bg-amber-400", text: "text-white" },
      { label: "Low", bg: "bg-neutral-300", text: "text-neutral-700" },
      { label: "Info", bg: "bg-blue-500", text: "text-white" },
    ],
  },
  {
    title: "System / health state",
    type: "dot",
    items: [
      { label: "Operational", dot: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700" },
      { label: "Degraded", dot: "bg-amber-400", bg: "bg-amber-50", text: "text-amber-700" },
      { label: "Outage", dot: "bg-red-500", bg: "bg-red-50", text: "text-red-700" },
      { label: "Maintenance", dot: "bg-blue-400", bg: "bg-blue-50", text: "text-blue-700" },
      { label: "Unknown", dot: "bg-neutral-400", bg: "bg-neutral-100", text: "text-neutral-500" },
    ],
  },
  {
    title: "Presence",
    type: "dot",
    items: [
      { label: "Online", dot: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700" },
      { label: "Away", dot: "bg-amber-400", bg: "bg-amber-50", text: "text-amber-700" },
      { label: "Busy", dot: "bg-red-400", bg: "bg-red-50", text: "text-red-700" },
      { label: "Offline", dot: "bg-neutral-400", bg: "bg-neutral-100", text: "text-neutral-500" },
    ],
  },
];

export default function StatusBadgeSet() {
  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full max-w-lg">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-4">
        Status badge reference
      </div>

      <div className="space-y-5">
        {GROUPS.map((group) => (
          <div key={group.title}>
            <p className="text-[10px] text-neutral-400 uppercase tracking-wide mb-2">{group.title}</p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => {
                if (group.type === "pill") return (
                  <span key={item.label} className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${item.bg} ${item.text}`}>
                    {item.label}
                  </span>
                );
                if (group.type === "rect") return (
                  <span key={item.label} className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${item.bg} ${item.text} uppercase tracking-wide`}>
                    {item.label}
                  </span>
                );
                return (
                  <span key={item.label} className={`flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full ${item.bg} ${item.text}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${item.dot} shrink-0`} />
                    {item.label}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
