/**
 * Notification Card
 * Category: Cards
 * Tags: card, notification, alert, feedback, banner
 * Description: Alert-style card with left border accent, icon, title, description, and a dismiss action. Four semantic variants: info, success, warning, error.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/notification-card.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function NotificationCard() {
  const alerts = [
    { type: "info", icon: "ℹ", title: "New feature available", desc: "Component export is now live.", color: "#3b82f6", bg: "#eff6ff" },
    { type: "success", icon: "✓", title: "Deploy successful", desc: "Version 2.4.1 is now live.", color: "#16a34a", bg: "#f0fdf4" },
    { type: "warning", icon: "⚠", title: "Approaching limit", desc: "84% of your API quota used.", color: "#d97706", bg: "#fffbeb" },
    { type: "error", icon: "✕", title: "Build failed", desc: "TypeScript error on line 42.", color: "#dc2626", bg: "#fef2f2" },
  ];
  return (
    <div className="space-y-2.5 max-w-sm p-4">
      {alerts.map(a => (
        <div key={a.type} className="flex items-start gap-3 px-4 py-3 rounded-xl" style={{ background: a.bg, borderLeft: `3px solid ${a.color}` }}>
          <span className="text-sm font-bold mt-0.5 shrink-0" style={{ color: a.color }}>{a.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-neutral-900">{a.title}</div>
            <div className="text-xs text-neutral-500 mt-0.5">{a.desc}</div>
          </div>
          <button className="text-neutral-300 hover:text-neutral-500 text-xs shrink-0">✕</button>
        </div>
      ))}
    </div>
  );
}