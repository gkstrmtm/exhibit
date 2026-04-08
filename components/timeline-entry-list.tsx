/**
 * Timeline Entry List
 * Category: Data Display
 * Tags: timeline, events, history, activity, vertical, list
 * Description: A vertical timeline of event entries with timestamps. Each entry has an icon, actor, event description, and relative/absolute time. The line connecting nodes is dashed for pending events and solid for past. Demonstrates the activity-history timeline pattern.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/timeline-entry-list.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
import { GitCommit, MessageSquare, CheckCircle, Circle, AlertCircle, Clock } from "lucide-react";

interface Event {
  id: number;
  actor: string;
  action: string;
  time: string;
  icon: React.ReactNode;
  iconBg: string;
  pending?: boolean;
}

const EVENTS: Event[] = [
  { id: 1, actor: "Sarah Chen", action: "approved the design changes and left a comment", time: "2h ago", icon: <CheckCircle size={13} />, iconBg: "bg-emerald-100 text-emerald-600" },
  { id: 2, actor: "James Wu", action: "pushed 3 commits to main — API rate-limit refactor", time: "3h ago", icon: <GitCommit size={13} />, iconBg: "bg-blue-100 text-blue-600" },
  { id: 3, actor: "Maya Patel", action: "opened a review on the billing modal PR", time: "5h ago", icon: <MessageSquare size={13} />, iconBg: "bg-purple-100 text-purple-600" },
  { id: 4, actor: "CI pipeline", action: "failed on staging — tests in auth module are red", time: "6h ago", icon: <AlertCircle size={13} />, iconBg: "bg-red-100 text-red-500" },
  { id: 5, actor: "Leo Torres", action: "created the milestone Q2 product launch", time: "Yesterday", icon: <Circle size={13} />, iconBg: "bg-neutral-100 text-neutral-500" },
  { id: 6, actor: "System", action: "scheduled weekly digest for Monday 8am", time: "Upcoming", icon: <Clock size={13} />, iconBg: "bg-amber-100 text-amber-600", pending: true },
];

export default function TimelineEntryList() {
  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full max-w-sm">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-4">
        Activity timeline
      </div>

      <div className="relative">
        {EVENTS.map((ev, i) => {
          const isLast = i === EVENTS.length - 1;
          return (
            <div key={ev.id} className="relative flex gap-3 pb-4">
              {/* Vertical connector line */}
              {!isLast && (
                <div
                  className={`absolute left-[14px] top-6 bottom-0 w-px ${ev.pending ? "border-l border-dashed border-neutral-300" : "bg-neutral-200"}`}
                />
              )}

              {/* Icon node */}
              <div className={`relative z-10 h-7 w-7 rounded-full ${ev.iconBg} shrink-0 flex items-center justify-center`}>
                {ev.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-xs text-neutral-700 leading-5">
                  <span className="font-semibold text-neutral-800">{ev.actor}</span>{" "}
                  {ev.action}
                </p>
                <p className={`text-[10px] mt-0.5 ${ev.pending ? "text-amber-600 font-medium" : "text-neutral-400"}`}>
                  {ev.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
