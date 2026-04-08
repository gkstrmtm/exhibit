/**
 * Recent Items Feed
 * Category: Dashboard
 * Tags: recent, history, feed, items, timestamps
 * Description: A recently visited or modified items feed list showing icon, item name, type badge, and relative timestamp. Items are sorted newest first. Demonstrates the universal "recently accessed" widget used in sidebars and dashboard panels to accelerate returning to prior work.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/recent-items-feed.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
import { FileText, FolderOpen, BarChart2, Code2, BookOpen } from "lucide-react";

type ItemType = "doc" | "project" | "report" | "snippet" | "guide";

const TYPE_CONFIG: Record<ItemType, { icon: React.ElementType; color: string; label: string }> = {
  doc: { icon: FileText, color: "text-blue-500 bg-blue-50", label: "Doc" },
  project: { icon: FolderOpen, color: "text-amber-500 bg-amber-50", label: "Project" },
  report: { icon: BarChart2, color: "text-purple-500 bg-purple-50", label: "Report" },
  snippet: { icon: Code2, color: "text-emerald-600 bg-emerald-50", label: "Snippet" },
  guide: { icon: BookOpen, color: "text-pink-500 bg-pink-50", label: "Guide" },
};

const ITEMS = [
  { id: 1, name: "Homepage redesign brief", type: "doc" as ItemType, time: "2m ago" },
  { id: 2, name: "Q4 Marketing Campaign", type: "project" as ItemType, time: "14m ago" },
  { id: 3, name: "User retention analysis", type: "report" as ItemType, time: "1h ago" },
  { id: 4, name: "Auth token refresh helper", type: "snippet" as ItemType, time: "3h ago" },
  { id: 5, name: "API integration guide", type: "guide" as ItemType, time: "Yesterday" },
  { id: 6, name: "Onboarding copy v3", type: "doc" as ItemType, time: "2 days ago" },
];

export default function RecentItemsFeed() {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden w-full max-w-xs">
      <div className="px-4 py-3 border-b border-neutral-100">
        <span className="text-xs font-semibold text-neutral-700">Recently accessed</span>
      </div>

      <div className="divide-y divide-neutral-100">
        {ITEMS.map(({ id, name, type, time }) => {
          const { icon: Icon, color, label } = TYPE_CONFIG[type];
          return (
            <button key={id} className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-neutral-50 transition-colors text-left">
              <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 ${color}`}>
                <Icon size={12} strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-neutral-800 truncate">{name}</div>
                <div className="text-[9px] text-neutral-400 mt-0.5">{time}</div>
              </div>
              <span className="text-[9px] font-medium text-neutral-400 border border-neutral-200 rounded px-1.5 py-0.5 shrink-0">
                {label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="px-4 py-2.5 border-t border-neutral-100">
        <button className="text-[10px] text-blue-600 hover:underline">View all history →</button>
      </div>
    </div>
  );
}
