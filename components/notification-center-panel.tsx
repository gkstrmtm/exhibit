/**
 * Notification Center Panel
 * Category: Dashboard
 * Tags: notifications, bell, dropdown, unread, badge
 * Description: A bell icon button with an unread count badge that opens a dropdown notification panel. The panel shows a list of notifications with type icons, messages, and timestamps. A mark-all-read button clears the badge. Individual notifications can be dismissed. Demonstrates the common notification center pattern.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/notification-center-panel.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { Bell, MessageSquare, AlertTriangle, CheckCircle2, UserPlus, X } from "lucide-react";

type NType = "message" | "warning" | "success" | "invite";

interface Notification {
  id: number;
  type: NType;
  text: string;
  time: string;
  read: boolean;
}

const TYPE_ICON: Record<NType, React.ElementType> = {
  message: MessageSquare,
  warning: AlertTriangle,
  success: CheckCircle2,
  invite: UserPlus,
};

const TYPE_COLOR: Record<NType, string> = {
  message: "text-blue-500",
  warning: "text-amber-500",
  success: "text-emerald-500",
  invite: "text-purple-500",
};

const INITIAL: Notification[] = [
  { id: 1, type: "message", text: "Alice replied to your comment on Homepage redesign.", time: "2m ago", read: false },
  { id: 2, type: "warning", text: "API quota at 85% — consider upgrading your plan.", time: "18m ago", read: false },
  { id: 3, type: "success", text: "Deploy to production completed successfully.", time: "1h ago", read: false },
  { id: 4, type: "invite", text: "Bob invited you to the Q4 Marketing project.", time: "3h ago", read: false },
  { id: 5, type: "message", text: "New comment on Email Templates from Carol.", time: "5h ago", read: true },
];

export default function NotificationCenterPanel() {
  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState(INITIAL);

  const unread = notifs.filter((n) => !n.read).length;

  function markAll() {
    setNotifs((ns) => ns.map((n) => ({ ...n, read: true })));
  }

  function dismiss(id: number) {
    setNotifs((ns) => ns.filter((n) => n.id !== id));
  }

  return (
    <div className="flex items-start justify-end bg-neutral-100 rounded-xl p-4 w-full max-w-xs min-h-16 relative">
      {/* Bell trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`relative p-1.5 rounded-lg transition-colors ${open ? "bg-neutral-200 text-neutral-900" : "text-neutral-500 hover:bg-neutral-200 hover:text-neutral-800"}`}
      >
        <Bell size={16} strokeWidth={1.5} />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[8px] font-bold flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <>
          <div className="fixed inset-0" onClick={() => setOpen(false)} />
          <div className="absolute right-3 top-11 z-20 bg-white border border-neutral-200 rounded-xl shadow-xl w-72 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2.5 border-b border-neutral-100">
              <div className="text-xs font-semibold text-neutral-900">
                Notifications {unread > 0 && <span className="text-neutral-400 font-normal">({unread} new)</span>}
              </div>
              {unread > 0 && (
                <button onClick={markAll} className="text-[10px] text-blue-600 hover:underline">
                  Mark all read
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-64 overflow-y-auto">
              {notifs.length === 0 ? (
                <div className="py-8 text-center text-xs text-neutral-400">No notifications</div>
              ) : (
                notifs.map(({ id, type, text, time, read }) => {
                  const Icon = TYPE_ICON[type];
                  return (
                    <div key={id} className={`flex gap-2.5 px-3 py-2.5 border-b border-neutral-100 last:border-b-0 ${!read ? "bg-blue-50/50" : ""}`}>
                      <Icon size={13} className={`shrink-0 mt-0.5 ${TYPE_COLOR[type]}`} strokeWidth={1.5} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs leading-relaxed ${read ? "text-neutral-500" : "text-neutral-800"}`}>{text}</p>
                        <span className="text-[9px] text-neutral-400">{time}</span>
                      </div>
                      <button onClick={() => dismiss(id)} className="shrink-0 p-0.5 text-neutral-300 hover:text-neutral-600 transition-colors">
                        <X size={11} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
