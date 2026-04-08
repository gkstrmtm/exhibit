/**
 * Notification Bell Dropdown
 * Category: Communication
 * Tags: notification, bell, dropdown, communication, inbox
 * Description: Bell icon with badge count and stacked notification panel. Read/unread distinction via indicator dot. Mark all read and view-all actions. Shown in context with a minimal app bar.
 */

import { Bell } from "lucide-react";

export default function NotificationBellDropdown() {
  const notifs = [
    { id: 1, text: "Mia starred your exhibit", time: "2m ago", read: false },
    { id: 2, text: "New comment on Bento Grid", time: "1h ago", read: false },
    { id: 3, text: "Leo is now following you", time: "3h ago", read: true },
  ];

  return (
    <div className="flex flex-col items-center justify-start pt-10 min-h-[400px] bg-neutral-50 px-4">
      {/* Minimal app bar — shows bell trigger in realistic header context */}
      <div className="w-full max-w-[320px] flex items-center justify-between px-3.5 h-10 bg-white border border-neutral-200 rounded-xl mb-1.5">
        <span className="text-[11px] font-medium text-neutral-400">exhibit.app</span>
        <div className="relative">
          <button className="w-7 h-7 rounded-lg border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:bg-neutral-50 transition-colors">
            <Bell size={14} strokeWidth={1.75} />
          </button>
          <span className="absolute -top-1 -right-1 w-[15px] h-[15px] bg-red-500 rounded-full flex items-center justify-center text-white text-[8px] font-bold leading-none">
            2
          </span>
        </div>
      </div>

      {/* Notification panel — always open in exhibit view */}
      <div className="w-full max-w-[320px] bg-white border border-neutral-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 h-10 border-b border-neutral-100">
          <span className="text-[12px] font-semibold text-neutral-900">Notifications</span>
          <button className="text-[11px] text-blue-600 hover:text-blue-700 transition-colors">
            Mark all read
          </button>
        </div>

        {notifs.map((n) => (
          <div
            key={n.id}
            className={`flex items-start gap-2.5 px-4 py-3 border-b border-neutral-100 last:border-0 ${
              !n.read ? "bg-blue-50/40" : "bg-white"
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-[5px] ${n.read ? "bg-transparent" : "bg-blue-500"}`} />
            <div className="flex-1 min-w-0">
              <div className="text-[12px] text-neutral-700 leading-snug">{n.text}</div>
              <div className="text-[11px] text-neutral-400 mt-0.5 font-mono">{n.time}</div>
            </div>
          </div>
        ))}

        <div className="px-4 py-2.5 border-t border-neutral-100">
          <button className="text-[11px] text-neutral-500 hover:text-neutral-700 transition-colors">
            View all notifications
          </button>
        </div>
      </div>
    </div>
  );
}