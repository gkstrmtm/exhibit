/**
 * Settings & Preferences Shell
 * Category: App Shells
 * Tags: app-shell, settings, preferences, form, navigation
 * Description: Clean settings page layout with grouped left-rail navigation, main content area with sectioned forms, and a sticky save bar at the bottom.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/settings-preferences-shell.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";

const sections = [
  { group: "Account", items: ["Profile", "Password", "Sessions"] },
  { group: "Workspace", items: ["General", "Members", "Billing", "Integrations"] },
  { group: "Notifications", items: ["Email", "Push", "Slack"] },
];

export default function SettingsPreferencesShell() {
  const [active, setActive] = useState("Profile");
  const [dirty, setDirty] = useState(false);
  const [name, setName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex@acme.io");
  const [handle, setHandle] = useState("alexj");

  return (
    <div className="flex min-h-[460px] bg-white border border-neutral-200 rounded-xl overflow-hidden">
      {/* Left Rail */}
      <aside className="w-52 bg-neutral-50 border-r border-neutral-200 flex flex-col py-4 flex-shrink-0">
        <div className="px-4 mb-3">
          <span className="text-sm font-semibold text-neutral-900">Settings</span>
        </div>
        {sections.map(({ group, items }) => (
          <div key={group} className="mb-4">
            <div className="px-4 py-1 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">{group}</div>
            {items.map(item => (
              <button
                key={item}
                onClick={() => setActive(item)}
                className={`w-full text-left px-4 py-1.5 text-sm transition-colors ${active === item ? "text-neutral-900 bg-white border-r-2 border-neutral-900 font-medium" : "text-neutral-500 hover:text-neutral-800"}`}
              >
                {item}
              </button>
            ))}
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 overflow-auto p-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-1">{active}</h2>
          <p className="text-sm text-neutral-500 mb-8">Manage your {active.toLowerCase()} settings and preferences.</p>

          {active === "Profile" && (
            <div className="space-y-6 max-w-lg">
              <div className="flex items-center gap-5 pb-6 border-b border-neutral-100">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  AJ
                </div>
                <div>
                  <button className="px-3 py-1.5 text-sm border border-neutral-200 rounded-md hover:bg-neutral-50 transition-colors font-medium">
                    Change photo
                  </button>
                  <p className="text-xs text-neutral-400 mt-1">JPG, PNG or GIF · max 2MB</p>
                </div>
              </div>
              {[
                { label: "Full name", value: name, setter: setName },
                { label: "Email address", value: email, setter: setEmail },
                { label: "Username", value: handle, setter: setHandle },
              ].map(({ label, value, setter }) => (
                <div key={label}>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">{label}</label>
                  <input
                    value={value}
                    onChange={e => { setter(e.target.value); setDirty(true); }}
                    className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Bio</label>
                <textarea
                  rows={3}
                  onChange={() => setDirty(true)}
                  placeholder="Tell your team about yourself..."
                  className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                />
              </div>
            </div>
          )}

          {active !== "Profile" && (
            <div className="max-w-lg space-y-4">
              <div className="h-10 bg-neutral-100 rounded-lg w-full animate-pulse" />
              <div className="h-10 bg-neutral-100 rounded-lg w-3/4 animate-pulse" />
              <div className="h-24 bg-neutral-100 rounded-lg w-full animate-pulse" />
            </div>
          )}
        </div>

        {/* Save Bar */}
        {dirty && (
          <div className="border-t border-neutral-200 bg-white px-8 py-4 flex items-center justify-between">
            <span className="text-sm text-neutral-500">You have unsaved changes</span>
            <div className="flex gap-3">
              <button onClick={() => setDirty(false)} className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
                Discard
              </button>
              <button onClick={() => setDirty(false)} className="px-4 py-2 text-sm font-medium bg-neutral-900 text-white rounded-lg hover:bg-neutral-700 transition-colors">
                Save changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}