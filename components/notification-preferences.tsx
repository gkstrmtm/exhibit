/**
 * Notification Preferences
 * Category: Account
 * Tags: notifications, preferences, toggles, account, settings
 * Description: Toggle rows for email and push notification categories — activity, marketing, security. Clean label/description/toggle layout.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/notification-preferences.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function NotificationPreferences() {
  const prefs = [
    { label: "Account activity", desc: "Sign-ins, password changes, API key usage", on: true },
    { label: "Component saves", desc: "When someone saves one of your exhibits", on: true },
    { label: "New followers", desc: "When a creator follows your profile", on: false },
    { label: "Product updates", desc: "New features, changelog, and announcements", on: false },
  ];
  return (
    <div className="bg-white border border-neutral-100 rounded-xl divide-y divide-neutral-50 max-w-md">
      {prefs.map(p => (
        <div key={p.label} className="flex items-center justify-between px-5 py-4">
          <div>
            <div className="text-sm font-medium text-neutral-800">{p.label}</div>
            <div className="text-xs text-neutral-400 mt-0.5">{p.desc}</div>
          </div>
          <div className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-colors ${p.on ? "bg-neutral-900" : "bg-neutral-200"}`}>
            <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${p.on ? "translate-x-4" : ""}`} />
          </div>
        </div>
      ))}
    </div>
  );
}