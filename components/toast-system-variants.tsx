/**
 * Toast System Variants
 * Category: Feedback
 * Tags: toast, notification, feedback, alert, status
 * Description: A complete toast notification system with four severity levels: success, error, warning, and info. Each toast features a colored left border, icon, message, and dismiss button in a top-right stacked layout.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/toast-system-variants.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function ToastSystemVariants() {
  const toasts = [
    { type: "success", icon: "✓", message: "Changes saved successfully", border: "#22c55e", bg: "#f0fdf4" },
    { type: "error", icon: "×", message: "Failed to save changes", border: "#ef4444", bg: "#fef2f2" },
    { type: "warning", icon: "⚠", message: "API rate limit approaching", border: "#f59e0b", bg: "#fffbeb" },
    { type: "info", icon: "ℹ", message: "New version available", border: "#3b82f6", bg: "#eff6ff" },
  ];

  return (
    <div className="relative min-h-[400px] bg-slate-100 p-8">
      <div className="absolute top-6 right-6 flex flex-col gap-3 w-96">
        {toasts.map((t) => (
          <div
            key={t.type}
            className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg bg-white"
            style={{ borderLeft: `4px solid ${t.border}` }}
          >
            <span style={{ color: t.border, fontWeight: 700, fontSize: "1.1rem" }}>{t.icon}</span>
            <span className="flex-1 text-sm text-gray-800 font-medium">{t.message}</span>
            <button className="text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
          </div>
        ))}
      </div>
    </div>
  );
}