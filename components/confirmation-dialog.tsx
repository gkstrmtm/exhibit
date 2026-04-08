/**
 * Confirmation Dialog
 * Category: Feedback
 * Tags: dialog, confirm, cancel, destructive, modal, alert
 * Description: A confirmation dialog pattern for destructive actions. A trigger button opens the dialog. The dialog shows the action name, a warning icon, description of consequences, and two buttons: a red destructive confirm and a cancel. Dialog closes on cancel, backdrop click, or Escape. Confirming shows a success state.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/confirmation-dialog.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, Trash2, Loader2, Check } from "lucide-react";

type State = "closed" | "open" | "loading" | "done";

export default function ConfirmationDialog() {
  const [state, setState] = useState<State>("closed");

  useEffect(() => {
    if (state !== "open") return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setState("closed"); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [state]);

  const confirm = () => {
    setState("loading");
    setTimeout(() => { setState("done"); setTimeout(() => setState("closed"), 1500); }, 1400);
  };

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 w-full max-w-xs flex flex-col items-center gap-4">
      <div className="text-[10px] text-neutral-500 text-center">Trigger a destructive confirmation dialog</div>

      <button
        onClick={() => setState("open")}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-[11px] font-medium hover:bg-red-100 transition-colors"
      >
        <Trash2 size={11} strokeWidth={1.5} />Delete project
      </button>

      {/* Backdrop */}
      {(state === "open" || state === "loading" || state === "done") && (
        <div
          className="fixed inset-0 bg-black/30 z-30 flex items-center justify-center p-4"
          onMouseDown={e => { if (e.target === e.currentTarget && state === "open") setState("closed"); }}
        >
          <div className="bg-white border border-neutral-200 rounded-xl shadow-xl p-5 w-72 space-y-4">
            {state === "done" ? (
              <div className="flex flex-col items-center gap-2 py-2">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                  <Check size={18} strokeWidth={2} className="text-emerald-500" />
                </div>
                <div className="text-sm font-semibold text-neutral-800">Project deleted</div>
                <div className="text-[10px] text-neutral-500">All data has been removed.</div>
              </div>
            ) : (
              <>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle size={14} strokeWidth={1.5} className="text-red-500" />
                  </div>
                  <div>
                    <div className="text-[12px] font-semibold text-neutral-800 mb-0.5">Delete project?</div>
                    <p className="text-[10px] text-neutral-500 leading-relaxed">
                      This will permanently delete the project and all associated data. This action cannot be undone.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setState("closed")}
                    disabled={state === "loading"}
                    className="flex-1 py-1.5 text-[11px] font-medium border border-neutral-200 rounded-lg text-neutral-700 hover:bg-neutral-50 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirm}
                    disabled={state === "loading"}
                    className="flex-1 py-1.5 text-[11px] font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-1.5"
                  >
                    {state === "loading" ? <><Loader2 size={10} strokeWidth={2} className="animate-spin" />Deleting…</> : <><Trash2 size={10} strokeWidth={1.5} />Delete</>}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
