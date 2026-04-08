/**
 * Typed Confirmation
 * Category: Feedback
 * Tags: confirmation, typed, delete, destructive, safeguard, keyboard
 * Description: A destructive action gate where the user must type a specific string (the resource name) to enable the confirm button. The input compares character-by-character; the button is disabled and grey until the exact string matches. Demonstrates the "type to confirm" pattern for high-risk deletions.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/typed-confirmation.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState, useRef, useEffect } from "react";
import { Trash2, Loader2, Check } from "lucide-react";

type Phase = "idle" | "dialog" | "deleting" | "done";

const WORKSPACE_NAME = "acme-production";

export default function TypedConfirmation() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [typed, setTyped] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const matches = typed === WORKSPACE_NAME;

  useEffect(() => {
    if (phase === "dialog") {
      setTyped("");
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [phase]);

  useEffect(() => () => clearTimeout(timer.current), []);

  function confirmDelete() {
    if (!matches) return;
    setPhase("deleting");
    timer.current = setTimeout(() => setPhase("done"), 1200);
  }

  function cancel() { setPhase("idle"); setTyped(""); }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") cancel();
    if (e.key === "Enter" && matches) confirmDelete();
  }

  // Highlight typed chars
  function MatchDisplay() {
    const target = WORKSPACE_NAME;
    return (
      <div className="flex flex-wrap text-xs font-mono tracking-wide">
        {target.split("").map((ch, i) => {
          const typedCh = typed[i];
          const color = typedCh === undefined
            ? "text-neutral-300"
            : typedCh === ch
              ? "text-emerald-600"
              : "text-red-500";
          return (
            <span key={i} className={`${color} transition-colors`}>{ch}</span>
          );
        })}
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full max-w-sm">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-4">
        Typed confirmation
      </div>

      {phase === "idle" && (
        <div className="bg-white border border-neutral-200 rounded-lg p-4 space-y-3">
          <div>
            <p className="text-xs font-semibold text-neutral-800">Workspace: acme-production</p>
            <p className="text-[11px] text-neutral-400 mt-0.5">12 members · Pro plan · Created Jan 2024</p>
          </div>
          <div className="pt-1 border-t border-neutral-100">
            <button
              onClick={() => setPhase("dialog")}
              className="flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-800 transition-colors"
            >
              <Trash2 size={13} />
              Delete workspace…
            </button>
          </div>
        </div>
      )}

      {phase === "dialog" && (
        <div className="bg-white border border-red-300 rounded-lg overflow-hidden shadow-sm">
          <div className="px-4 pt-4 pb-3 space-y-3">
            <div className="flex items-start gap-2">
              <Trash2 size={15} className="text-red-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-neutral-800">Delete workspace</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">This will permanently delete <strong>acme-production</strong> and all its data. This cannot be undone.</p>
              </div>
            </div>

            <div>
              <p className="text-[11px] text-neutral-500 mb-1.5">Type the workspace name to confirm:</p>
              <div className="bg-neutral-50 border border-neutral-200 rounded-md px-3 py-1.5 mb-1.5">
                <MatchDisplay />
              </div>
              <input
                ref={inputRef}
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={WORKSPACE_NAME}
                className="w-full border border-neutral-300 rounded-md px-3 py-2 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-red-400 placeholder:text-neutral-300"
              />
            </div>
          </div>

          <div className="flex gap-2 px-4 py-3 border-t border-neutral-100 bg-neutral-50">
            <button
              onClick={confirmDelete}
              disabled={!matches}
              className={`flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-lg transition-all active:scale-95 ${matches ? "bg-red-600 text-white hover:bg-red-700" : "bg-neutral-200 text-neutral-400 cursor-not-allowed"}`}
            >
              <Trash2 size={12} />
              Delete workspace
            </button>
            <button onClick={cancel} className="text-xs text-neutral-500 hover:text-neutral-700 px-3 py-2">
              Cancel
            </button>
          </div>
        </div>
      )}

      {phase === "deleting" && (
        <div className="bg-white border border-neutral-200 rounded-lg px-4 py-6 flex flex-col items-center gap-2">
          <Loader2 size={18} className="animate-spin text-neutral-400" />
          <p className="text-xs text-neutral-500">Deleting workspace…</p>
        </div>
      )}

      {phase === "done" && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-6 flex flex-col items-center gap-2">
          <Check size={18} className="text-emerald-500" />
          <p className="text-xs text-emerald-700 font-semibold">Workspace deleted</p>
          <button onClick={() => setPhase("idle")} className="text-[11px] text-neutral-400 underline hover:text-neutral-600 mt-1">
            Reset demo
          </button>
        </div>
      )}

      <div className="mt-3 text-[11px] text-neutral-400">
        Characters light green as they match, red if wrong. The delete button stays disabled until the full name matches exactly. Enter confirms when unlocked.
      </div>
    </div>
  );
}
