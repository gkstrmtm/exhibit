/**
 * Compact Settings List
 * Category: Data Density
 * Tags: settings, dense, compact, list, data density
 * Description: Dense settings list with label, current value, and arrow — no wasted vertical space. Every row is a single line. Inspired by iOS Settings.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/compact-settings-list.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function CompactSettingsList() {
  const settings = [
    { label: "Theme", value: "System" },
    { label: "Language", value: "English" },
    { label: "Timezone", value: "UTC-8" },
    { label: "Date format", value: "MM/DD/YYYY" },
    { label: "Currency", value: "USD ($)" },
    { label: "Notifications", value: "Email only" },
  ];
  return (
    <div className="bg-white border border-neutral-100 rounded-xl divide-y divide-neutral-50 max-w-xs text-sm">
      {settings.map(s => (
        <button key={s.label} className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-neutral-50 transition-colors text-left">
          <span className="text-neutral-700">{s.label}</span>
          <div className="flex items-center gap-1.5">
            <span className="text-neutral-400 text-xs">{s.value}</span>
            <span className="text-neutral-300 text-xs">›</span>
          </div>
        </button>
      ))}
    </div>
  );
}