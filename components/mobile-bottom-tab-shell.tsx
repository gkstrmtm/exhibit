/**
 * Mobile Bottom Tab Shell
 * Category: App Shells
 * Tags: app-shell, mobile, ios, bottom-tabs, navigation
 * Description: iOS-style mobile app shell with a fixed bottom navigation bar (5 tabs with icons and labels), content area, and status bar — responsive at mobile widths.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/mobile-bottom-tab-shell.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";

const tabs = [
  { id: "home", icon: "⌂", label: "Home" },
  { id: "search", icon: "⌕", label: "Search" },
  { id: "create", icon: "＋", label: "Create", special: true },
  { id: "activity", icon: "♡", label: "Activity" },
  { id: "profile", icon: "◎", label: "Profile" },
];

const content: Record<string, React.ReactNode> = {
  home: (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-neutral-500">Good morning,</p>
          <h2 className="text-lg font-bold text-neutral-900">Alex 👋</h2>
        </div>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white text-sm font-bold">A</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Workouts", value: "4", sub: "this week", color: "from-blue-500 to-cyan-500" },
          { label: "Calories", value: "2,140", sub: "today", color: "from-orange-400 to-red-500" },
          { label: "Sleep", value: "7.5h", sub: "last night", color: "from-violet-500 to-purple-600" },
          { label: "Steps", value: "8,432", sub: "today", color: "from-emerald-400 to-teal-500" },
        ].map(card => (
          <div key={card.label} className={`p-4 rounded-2xl bg-gradient-to-br ${card.color} text-white`}>
            <p className="text-xs opacity-80 mb-1">{card.label}</p>
            <p className="text-xl font-bold">{card.value}</p>
            <p className="text-xs opacity-70">{card.sub}</p>
          </div>
        ))}
      </div>
      <div className="bg-neutral-50 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-neutral-900">Recent Activity</span>
          <span className="text-xs text-blue-500 font-medium">See all</span>
        </div>
        {[
          { icon: "🏃", label: "Morning Run", time: "6:30 AM", val: "5.2 km" },
          { icon: "💪", label: "Strength Training", time: "Yesterday", val: "45 min" },
          { icon: "🧘", label: "Yoga Session", time: "Mon", val: "30 min" },
        ].map(a => (
          <div key={a.label} className="flex items-center gap-3 py-2">
            <span className="text-xl">{a.icon}</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-800">{a.label}</p>
              <p className="text-xs text-neutral-500">{a.time}</p>
            </div>
            <span className="text-sm font-semibold text-neutral-700">{a.val}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  search: <div className="p-4"><div className="bg-neutral-100 rounded-2xl px-4 py-3 text-neutral-400 text-sm flex items-center gap-2"><span>⌕</span> Search workouts, goals...</div></div>,
  create: <div className="p-8 text-center text-neutral-400"><div className="text-4xl mb-3">＋</div><p className="text-sm">Create new workout</p></div>,
  activity: <div className="p-4 text-center text-neutral-400 pt-20"><div className="text-4xl mb-3">♡</div><p className="text-sm">Your activity feed</p></div>,
  profile: <div className="p-4 text-center pt-8"><div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 mx-auto mb-3 flex items-center justify-center text-white text-xl font-bold">A</div><p className="font-semibold text-neutral-900">Alex Johnson</p><p className="text-xs text-neutral-500 mt-1">Member since Jan 2024</p></div>,
};

export default function MobileBottomTabShell() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="flex justify-center">
      <div className="w-80 h-[520px] bg-white rounded-[40px] border-4 border-neutral-200 overflow-hidden relative shadow-2xl flex flex-col">
        {/* Status Bar */}
        <div className="flex items-center justify-between px-5 py-2 bg-white flex-shrink-0">
          <span className="text-[11px] font-semibold text-neutral-900">9:41</span>
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-neutral-500">●●●</span>
            <span className="text-[11px] text-neutral-500">WiFi</span>
            <span className="text-[11px] text-neutral-900 font-semibold">100%</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-white">
          {content[activeTab]}
        </div>

        {/* Bottom Tab Bar */}
        <div className="flex items-end justify-around pb-2 pt-3 bg-white border-t border-neutral-100 flex-shrink-0 px-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center gap-1 flex-1"
            >
              {tab.special ? (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xl shadow-lg -mt-5 mb-1">
                  {tab.icon}
                </div>
              ) : (
                <span className={`text-xl transition-colors ${activeTab === tab.id ? "text-blue-500" : "text-neutral-400"}`}>
                  {tab.icon}
                </span>
              )}
              {!tab.special && (
                <span className={`text-[9px] font-medium transition-colors ${activeTab === tab.id ? "text-blue-500" : "text-neutral-400"}`}>
                  {tab.label}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}