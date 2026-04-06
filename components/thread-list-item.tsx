/**
 * Thread List Item
 * Category: Communication
 * Tags: email, inbox, thread, list, communication
 * Description: Email inbox thread row with sender avatar, name, preview snippet, timestamp, and unread bold treatment. Clean Gmail-style layout.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/thread-list-item.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function ThreadListItem() {
  const threads = [
    { sender: "Mia Chen", subject: "Re: Design handoff", preview: "Looks great! Can we schedule a review call?", time: "10:42", unread: true },
    { sender: "Leo Park", subject: "Component feedback", preview: "Left a few comments on the ghost button pr...", time: "Yesterday", unread: true },
    { sender: "GitHub", subject: "Your build passed", preview: "[exhibit] All checks passed on main branch", time: "Tue", unread: false },
  ];
  return (
    <div className="bg-white border border-neutral-100 rounded-xl divide-y divide-neutral-50 max-w-sm">
      {threads.map((t, i) => (
        <div key={i} className="flex items-start gap-3 px-4 py-3.5 hover:bg-neutral-50 cursor-pointer">
          <div className={`w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-600 shrink-0 mt-0.5 ${t.unread ? "ring-2 ring-blue-500/30" : ""}`}>{t.sender[0]}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2">
              <span className={`text-sm ${t.unread ? "font-semibold text-neutral-900" : "text-neutral-600"}`}>{t.sender}</span>
              <span className="text-xs text-neutral-400 shrink-0">{t.time}</span>
            </div>
            <div className={`text-xs mt-0.5 truncate ${t.unread ? "text-neutral-700 font-medium" : "text-neutral-400"}`}>{t.subject}</div>
            <div className="text-xs text-neutral-400 truncate mt-0.5">{t.preview}</div>
          </div>
        </div>
      ))}
    </div>
  );
}