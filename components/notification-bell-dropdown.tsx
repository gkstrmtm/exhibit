/**
 * Notification Bell Dropdown
 * Category: Communication
 * Tags: notification, bell, dropdown, communication, inbox
 * Description: Bell icon with badge count that opens a stacked notification list. Read/unread distinction with a blue dot. Mark all read action.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/notification-bell-dropdown.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function NotificationBellDropdown() {
  const notifs = [
    { text: "Mia starred your exhibit", time: "2m ago", read: false },
    { text: "New comment on Bento Grid", time: "1h ago", read: false },
    { text: "Leo is now following you", time: "3h ago", read: true },
  ];
  return (
    <div className="relative w-fit">
      <div className="relative inline-block">
        <button className="w-9 h-9 rounded-xl border border-neutral-200 flex items-center justify-center text-lg hover:bg-neutral-50">🔔</button>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[9px] font-bold">2</div>
      </div>
      <div className="absolute top-11 right-0 w-72 bg-white border border-neutral-100 rounded-xl shadow-xl overflow-hidden z-10">
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100">
          <span className="text-xs font-semibold text-neutral-900">Notifications</span>
          <button className="text-xs text-blue-600 hover:underline">Mark all read</button>
        </div>
        {notifs.map((n, i) => (
          <div key={i} className={`flex items-start gap-3 px-4 py-3 border-b border-neutral-50 last:border-0 ${!n.read ? "bg-blue-50/30" : ""}`}>
            {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />}
            {n.read && <div className="w-1.5 shrink-0" />}
            <div className="flex-1 min-w-0">
              <div className="text-xs text-neutral-700">{n.text}</div>
              <div className="text-xs text-neutral-400 mt-0.5">{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}