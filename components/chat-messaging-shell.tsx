/**
 * Chat & Messaging Shell
 * Category: App Shells
 * Tags: app-shell, chat, messaging, conversation, layout
 * Description: Full messaging layout with conversation list sidebar, avatar + timestamp header, message thread with sent/received bubbles, and a fixed composer at the bottom.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/chat-messaging-shell.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";

const conversations = [
  { id: 1, name: "Design Team", avatar: "DT", preview: "Let's sync on the new components", time: "2m", unread: 3, color: "from-pink-400 to-rose-500" },
  { id: 2, name: "Marcus Chen", avatar: "MC", preview: "Can you review my PR?", time: "14m", unread: 1, color: "from-blue-400 to-cyan-500" },
  { id: 3, name: "Sarah Kim", avatar: "SK", preview: "Pushed the fix! Check it out", time: "1h", unread: 0, color: "from-violet-400 to-purple-500" },
  { id: 4, name: "Engineering", avatar: "EN", preview: "Deploy went out — all green", time: "2h", unread: 0, color: "from-emerald-400 to-teal-500" },
  { id: 5, name: "Priya Patel", avatar: "PP", preview: "Sounds good, talk tomorrow", time: "3h", unread: 0, color: "from-amber-400 to-orange-500" },
];

const messages = [
  { id: 1, from: "Marcus Chen", avatar: "MC", text: "Hey, can you take a look at the PR I opened for the auth refactor?", time: "2:14 PM", mine: false },
  { id: 2, from: "Me", text: "Sure, sending it over now. What should I focus on?", time: "2:15 PM", mine: true },
  { id: 3, from: "Marcus Chen", avatar: "MC", text: "Mostly the session handling logic and the middleware order — I moved some things around.", time: "2:15 PM", mine: false },
  { id: 4, from: "Me", text: "On it. I'll leave comments inline and we can sync async.", time: "2:16 PM", mine: true },
  { id: 5, from: "Marcus Chen", avatar: "MC", text: "Perfect, appreciate it 🙏", time: "2:17 PM", mine: false },
];

export default function ChatMessagingShell() {
  const [activeConvo, setActiveConvo] = useState(2);
  const [input, setInput] = useState("");
  const convo = conversations.find(c => c.id === activeConvo)!;

  return (
    <div className="flex min-h-[460px] bg-white border border-neutral-200 rounded-xl overflow-hidden">
      {/* Conversation List */}
      <aside className="w-64 border-r border-neutral-200 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-neutral-100">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-neutral-900">Messages</span>
            <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-neutral-100 text-neutral-500">＋</button>
          </div>
          <input placeholder="Search..." className="w-full px-3 py-1.5 text-sm bg-neutral-100 rounded-lg border-none outline-none placeholder:text-neutral-400" />
        </div>
        <div className="flex-1 overflow-auto">
          {conversations.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveConvo(c.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${activeConvo === c.id ? "bg-blue-50" : "hover:bg-neutral-50"}`}
            >
              <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                {c.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium truncate ${activeConvo === c.id ? "text-blue-700" : "text-neutral-900"}`}>{c.name}</span>
                  <span className="text-[10px] text-neutral-400 flex-shrink-0 ml-1">{c.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-500 truncate">{c.preview}</span>
                  {c.unread > 0 && (
                    <span className="ml-1 flex-shrink-0 w-4 h-4 bg-blue-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">{c.unread}</span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Thread */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-3 border-b border-neutral-200">
          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${convo.color} flex items-center justify-center text-white text-xs font-bold`}>
            {convo.avatar}
          </div>
          <div>
            <div className="text-sm font-semibold text-neutral-900">{convo.name}</div>
            <div className="text-xs text-emerald-500 font-medium">● Online</div>
          </div>
          <div className="ml-auto flex items-center gap-2 text-neutral-400">
            <button className="hover:text-neutral-700 transition-colors">📞</button>
            <button className="hover:text-neutral-700 transition-colors">⋯</button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-5 space-y-4 bg-neutral-50/50">
          {messages.map(msg => (
            <div key={msg.id} className={`flex items-end gap-2 ${msg.mine ? "flex-row-reverse" : ""}`}>
              {!msg.mine && (
                <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${convo.color} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>
                  {msg.avatar}
                </div>
              )}
              <div className={`max-w-[65%] ${msg.mine ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.mine ? "bg-blue-500 text-white rounded-br-sm" : "bg-white text-neutral-800 rounded-bl-sm border border-neutral-100 shadow-sm"}`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-neutral-400">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Composer */}
        <div className="border-t border-neutral-200 p-4 bg-white">
          <div className="flex items-center gap-3 bg-neutral-100 rounded-xl px-4 py-2.5">
            <button className="text-neutral-400 hover:text-neutral-600 transition-colors">＋</button>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Message Design Team..."
              className="flex-1 bg-transparent text-sm outline-none text-neutral-800 placeholder:text-neutral-400"
            />
            <button className="text-neutral-400 hover:text-neutral-600 transition-colors">😊</button>
            <button
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${input ? "bg-blue-500 text-white" : "bg-neutral-200 text-neutral-400"}`}
              onClick={() => setInput("")}
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}