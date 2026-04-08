/**
 * Toast Notification Stack
 * Category: Feedback
 * Tags: toast, notification, stack, success, error, dismiss
 * Description: A toast notification stack that queues multiple toasts at the bottom-right corner. Each toast has a type (success/error/info/warning), message, and auto-dismisses after 4 seconds. A progress bar depletes visually. Multiple toasts stack and each can be manually closed. Demonstrates the toast stack pattern.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/toast-notification-stack.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState, useEffect, useRef } from "react";
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast { id: number; type: ToastType; message: string; }

const TYPE_STYLE: Record<ToastType, { icon: React.ElementType; border: string; bg: string; iconColor: string }> = {
  success: { icon: CheckCircle2, border: "border-emerald-200", bg: "bg-emerald-50", iconColor: "text-emerald-500" },
  error: { icon: XCircle, border: "border-red-200", bg: "bg-red-50", iconColor: "text-red-500" },
  info: { icon: Info, border: "border-blue-200", bg: "bg-blue-50", iconColor: "text-blue-500" },
  warning: { icon: AlertTriangle, border: "border-amber-200", bg: "bg-amber-50", iconColor: "text-amber-500" },
};

const TYPE_BAR: Record<ToastType, string> = {
  success: "bg-emerald-400",
  error: "bg-red-400",
  info: "bg-blue-400",
  warning: "bg-amber-400",
};

const PRESETS: { type: ToastType; message: string }[] = [
  { type: "success", message: "Changes saved successfully." },
  { type: "error", message: "Failed to delete item. Please retry." },
  { type: "info", message: "A new version is available. Refresh to update." },
  { type: "warning", message: "Your session expires in 5 minutes." },
];

let nextId = 1;
const DURATION = 4000;

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: number) => void }) {
  const [progress, setProgress] = useState(100);
  const { icon: Icon, border, bg, iconColor } = TYPE_STYLE[toast.type];
  const startTime = useRef(Date.now());
  const rafRef = useRef<number>(0);

  useEffect(() => {
    function tick() {
      const elapsed = Date.now() - startTime.current;
      const pct = Math.max(0, 100 - (elapsed / DURATION) * 100);
      setProgress(pct);
      if (pct > 0) rafRef.current = requestAnimationFrame(tick);
      else onRemove(toast.id);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [toast.id, onRemove]);

  return (
    <div className={`flex items-start gap-2.5 border ${border} ${bg} rounded-xl px-3 py-2.5 shadow-sm relative overflow-hidden min-w-[220px] max-w-[260px]`}>
      <Icon size={14} className={`${iconColor} shrink-0 mt-0.5`} strokeWidth={1.5} />
      <span className="flex-1 text-xs text-neutral-800 leading-relaxed">{toast.message}</span>
      <button onClick={() => onRemove(toast.id)} className="text-neutral-400 hover:text-neutral-700 shrink-0">
        <X size={11} />
      </button>
      <div className={`absolute bottom-0 left-0 h-0.5 ${TYPE_BAR[toast.type]} transition-none`} style={{ width: `${progress}%` }} />
    </div>
  );
}

export default function ToastNotificationStack() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function add(type: ToastType, message: string) {
    const id = nextId++;
    setToasts(ts => [...ts, { id, type, message }]);
  }

  function remove(id: number) {
    setToasts(ts => ts.filter(t => t.id !== id));
  }

  return (
    <div className="relative bg-neutral-100 border border-neutral-200 rounded-xl p-4 w-full max-w-xs min-h-40">
      <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-3">Trigger a toast</div>

      {/* Trigger buttons */}
      <div className="grid grid-cols-2 gap-1.5">
        {PRESETS.map(({ type, message }) => {
          const { iconColor } = TYPE_STYLE[type];
          return (
            <button
              key={type}
              onClick={() => add(type, message)}
              className="text-[10px] font-medium capitalize border border-neutral-200 bg-white rounded-lg py-1.5 hover:border-neutral-400 transition-colors"
            >
              <span className={iconColor}>{type}</span>
            </button>
          );
        })}
      </div>

      {/* Toast stack (absolute bottom-right of container) */}
      <div className="absolute bottom-3 right-3 flex flex-col gap-2 items-end z-20">
        {toasts.map(t => <ToastItem key={t.id} toast={t} onRemove={remove} />)}
      </div>
    </div>
  );
}
