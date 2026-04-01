/**
 * Master / Detail Shell
 * Category: App Shells
 * Tags: app-shell, master-detail, email, list, two-panel
 * Description: Two-panel email client-style layout: scrollable item list on the left with avatars, timestamps, and previews; full detail view on the right with header, body, and action buttons.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/master-detail-shell.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";

const items = [
  { id: 1, from: "Sarah Kim", avatar: "SK", color: "from-violet-400 to-purple-500", subject: "Design review feedback", preview: "Hey, I went through the latest mockups and have some thoughts on the navigation pattern you chose...", time: "10:24 AM", unread: true, tag: "Design" },
  { id: 2, from: "Marcus Chen", avatar: "MC", color: "from-blue-400 to-cyan-500", subject: "PR ready for review — auth refactor", preview: "I've finished the session handling changes. The main thing to look at is the middleware order in server/auth.ts...", time: "9:41 AM", unread: true, tag: "Dev" },
  { id: 3, from: "Design Team", avatar: "DT", color: "from-pink-400 to-rose-500", subject: "Component library v2.0 launch", preview: "We're planning to release the new component library next Tuesday. Please review the changelog before...", time: "Yesterday", unread: false, tag: "Team" },
  { id: 4, from: "Priya Patel", avatar: "PP", color: "from-amber-400 to-orange-500", subject: "Q4 budget approval needed", preview: "Hi, I need your sign-off on the Q4 marketing budget before EOD Friday. The breakdown is attached...", time: "Yesterday", unread: false, tag: "Finance" },
  { id: 5, from: "Engineering", avatar: "EN", color: "from-emerald-400 to-teal-500", subject: "Incident post-mortem: API slowdown", preview: "On Nov 12 we experienced elevated response times on the /api/exhibits endpoint. Root cause was...", time: "Mon", unread: false, tag: "Infra" },
  { id: 6, from: "Alex Johnson", avatar: "AJ", color: "from-blue-400 to-violet-500", subject: "New onboarding flow spec", preview: "Attached is the full spec for the new creator onboarding wizard. Steps 1–3 are finalized...", time: "Mon", unread: false, tag: "Product" },
];

export default function MasterDetailShell() {
  const [selected, setSelected] = useState(items[0]);
  const [starred, setStarred] = useState<number[]>([]);

  const toggleStar = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setStarred(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="flex min-h-[480px] bg-white border border-neutral-200 rounded-xl overflow-hidden font-sans">
      {/* List Panel */}
      <div className="w-72 flex flex-col border-r border-neutral-200 flex-shrink-0">
        <div className="px-4 py-3 border-b border-neutral-100 flex items-center justify-between">
          <span className="font-semibold text-sm text-neutral-900">Inbox</span>
          <div className="flex items-center gap-2 text-neutral-400">
            <button className="hover:text-neutral-700 transition-colors text-sm">⊕</button>
            <button className="hover:text-neutral-700 transition-colors text-sm">⋯</button>
          </div>
        </div>
        <div className="px-3 py-2 border-b border-neutral-100">
          <input placeholder="Search..." className="w-full px-3 py-1.5 text-xs bg-neutral-100 rounded-lg outline-none placeholder:text-neutral-400" />
        </div>
        <div className="flex-1 overflow-auto">
          {items.map(item => (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              className={`w-full flex items-start gap-3 px-4 py-3 text-left border-b border-neutral-50 transition-colors ${selected.id === item.id ? "bg-blue-50" : "hover:bg-neutral-50"}`}
            >
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mt-0.5`}>
                {item.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`text-xs font-semibold truncate ${item.unread ? "text-neutral-900" : "text-neutral-600"}`}>{item.from}</span>
                  <span className="text-[10px] text-neutral-400 flex-shrink-0 ml-1">{item.time}</span>
                </div>
                <div className={`text-xs truncate mb-0.5 ${item.unread ? "text-neutral-800 font-medium" : "text-neutral-600"}`}>{item.subject}</div>
                <div className="text-[11px] text-neutral-400 truncate">{item.preview}</div>
              </div>
              {item.unread && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      {/* Detail Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Detail Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-neutral-900 mb-1">{selected.subject}</h2>
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${selected.color} flex items-center justify-center text-white text-[9px] font-bold`}>
                {selected.avatar}
              </div>
              <div className="text-xs text-neutral-600">
                <span className="font-medium text-neutral-800">{selected.from}</span>
                <span className="text-neutral-400 ml-2">to me</span>
              </div>
              <span className="text-[11px] text-neutral-400">{selected.time}</span>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500`}>{selected.tag}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={(e) => toggleStar(selected.id, e)}
              className={`text-lg transition-colors ${starred.includes(selected.id) ? "text-amber-400" : "text-neutral-300 hover:text-amber-300"}`}
            >
              ★
            </button>
            <button className="text-neutral-400 hover:text-neutral-700 transition-colors">↩</button>
            <button className="text-neutral-400 hover:text-neutral-700 transition-colors">⋯</button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto px-6 py-5">
          <p className="text-sm text-neutral-700 leading-relaxed mb-4">
            Hi there,
          </p>
          <p className="text-sm text-neutral-700 leading-relaxed mb-4">
            {selected.preview} the feedback is generally positive but I wanted to flag a few things that need attention before we ship.
          </p>
          <p className="text-sm text-neutral-700 leading-relaxed mb-4">
            The main concerns are around the information hierarchy on mobile — specifically the way the navigation collapses. I've dropped some annotated screenshots in the Figma file under the "Feedback" page.
          </p>
          <p className="text-sm text-neutral-700 leading-relaxed mb-6">
            Can we sync tomorrow to go through them? Happy to do a quick Loom walkthrough if you prefer async.
          </p>
          <p className="text-sm text-neutral-700 leading-relaxed">
            — {selected.from}
          </p>
        </div>

        {/* Reply Bar */}
        <div className="border-t border-neutral-200 p-4">
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3">
            <div className="text-xs text-neutral-400 mb-2">Reply to {selected.from}...</div>
            <div className="h-14" />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-3 text-neutral-400 text-sm">
                <button className="hover:text-neutral-700 transition-colors">📎</button>
                <button className="hover:text-neutral-700 transition-colors">😊</button>
              </div>
              <button className="px-4 py-2 bg-neutral-900 text-white text-xs font-medium rounded-lg hover:bg-neutral-700 transition-colors">
                Send reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}