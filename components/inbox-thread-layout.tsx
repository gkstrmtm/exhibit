/**
 * Inbox Thread Layout
 * Category: Communication
 * Tags: communication, inbox, chat, messages, thread
 * Description: A split-panel inbox with conversation list on the left and a chat-style message thread on the right, featuring alternating message bubbles and a reply input.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/inbox-thread-layout.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function InboxThreadLayout() {
  const convos = [
    { name: "Sarah M.", preview: "Sounds great! Let me know when...", time: "2m", unread: true, initials: "SM" },
    { name: "Design Team", preview: "New mockups are ready for review", time: "15m", unread: true, initials: "DT" },
    { name: "Alex P.", preview: "Thanks for the feedback on the...", time: "1h", unread: false, initials: "AP" },
    { name: "Jordan K.", preview: "Can we schedule a call tomorrow?", time: "3h", unread: false, initials: "JK" },
  ];
  return (
    <div className="bg-white min-h-[300px] rounded-xl border border-neutral-200 overflow-hidden flex">
      <div className="w-[250px] border-r border-neutral-200 flex flex-col">
        <div className="p-3 border-b border-neutral-100 text-sm font-semibold">Inbox</div>
        {convos.map(c => (
          <div key={c.name} className={`p-3 border-b border-neutral-50 cursor-pointer hover:bg-neutral-50 flex gap-2.5 ${c.name === "Sarah M." ? "bg-indigo-50" : ""}`}>
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600 flex-shrink-0">{c.initials}</div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium truncate">{c.name}</span>
                <span className="text-[10px] text-neutral-400">{c.time}</span>
              </div>
              <div className="text-xs text-neutral-500 truncate">{c.preview}</div>
            </div>
            {c.unread && <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />}
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col">
        <div className="p-3 border-b border-neutral-100 text-sm font-semibold">Sarah M.</div>
        <div className="flex-1 p-4 flex flex-col gap-3 overflow-auto">
          <div className="self-start max-w-[70%]">
            <div className="bg-neutral-100 rounded-2xl rounded-tl-sm px-3 py-2 text-sm">Hey! I reviewed the component pack. Looks amazing!</div>
            <div className="text-[10px] text-neutral-400 mt-1">10:42 AM</div>
          </div>
          <div className="self-end max-w-[70%]">
            <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-sm px-3 py-2 text-sm">Thanks! I added a few more variants. Want me to share the updated link?</div>
            <div className="text-[10px] text-neutral-400 mt-1 text-right">10:44 AM</div>
          </div>
          <div className="self-start max-w-[70%]">
            <div className="bg-neutral-100 rounded-2xl rounded-tl-sm px-3 py-2 text-sm">Sounds great! Let me know when it's ready.</div>
            <div className="text-[10px] text-neutral-400 mt-1">10:45 AM</div>
          </div>
        </div>
        <div className="p-3 border-t border-neutral-100 flex gap-2">
          <input type="text" placeholder="Type a reply..." className="flex-1 text-sm px-3 py-2 border border-neutral-200 rounded-lg outline-none focus:border-indigo-300" />
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">Send</button>
        </div>
      </div>
    </div>
  );
}