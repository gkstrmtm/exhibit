/**
 * Notification Toast Stack
 * Category: Feedback
 * Tags: toast, notification, feedback, alert, vercel
 * Description: Stacked notification toasts with different severity levels. Inspired by Sonner and Vercel's toast system.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/notification-toast-stack.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function ToastStack() {
  const toasts = [
    { type: "success", icon: "✓", title: "Deployment complete", desc: "Your changes are now live.", bg: "#F0FDF4", border: "#BBF7D0", text: "#166534" },
    { type: "error", icon: "✕", title: "Build failed", desc: "Check console for errors.", bg: "#FEF2F2", border: "#FECACA", text: "#991B1B" },
    { type: "info", icon: "i", title: "New version available", desc: "v2.4.1 is ready to install.", bg: "#EFF6FF", border: "#BFDBFE", text: "#1E40AF" },
  ];

  return (
    <div className="p-12 bg-neutral-100 flex flex-col items-center justify-center gap-3 min-h-[300px]">
      {toasts.map((t, i) => (
        <div
          key={i}
          className="w-full max-w-sm rounded-lg border px-4 py-3 flex items-start gap-3 shadow-sm"
          style={{ background: t.bg, borderColor: t.border }}
        >
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 shrink-0"
            style={{ background: t.border, color: t.text }}
          >
            {t.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold" style={{ color: t.text }}>{t.title}</div>
            <div className="text-xs mt-0.5 opacity-80" style={{ color: t.text }}>{t.desc}</div>
          </div>
          <button className="text-xs opacity-40 hover:opacity-100 mt-0.5 shrink-0 cursor-pointer" style={{ color: t.text }}>✕</button>
        </div>
      ))}
    </div>
  );
}