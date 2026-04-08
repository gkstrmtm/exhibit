/**
 * Post-Confirm Failure Recovery
 * Category: Feedback
 * Tags: error, recovery, delete, destructive, failure, retry, rollback
 * Description: Shows the full arc of a destructive action where the server call fails after the user confirmed. Demonstrates: confirm → async → failure → inline error banner with retry + undo options. The item is restored in the list. Teaches error recovery design after a failed mutation.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/post-confirm-failure-recovery.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState, useRef, useEffect } from "react";
import { Trash2, Loader2, AlertCircle, RotateCcw, X } from "lucide-react";

type Phase = "idle" | "confirming" | "deleting" | "failed";

const ITEMS = [
  { id: 1, name: "Brand assets archive", size: "2.4 GB" },
  { id: 2, name: "Campaign assets Q1", size: "840 MB" },
  { id: 3, name: "Design system exports", size: "310 MB" },
];

function FileRow({ item, onPhaseChange }: {
  item: typeof ITEMS[0];
  onPhaseChange: (id: number, phase: Phase) => void;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => onPhaseChange(item.id, phase), [phase]);

  function requestDelete() { setPhase("confirming"); }

  function confirmDelete() {
    setPhase("deleting");
    clearTimeout(timer.current);
    // Simulate failure after ~1s
    timer.current = setTimeout(() => setPhase("failed"), 1000);
  }

  function cancel() { setPhase("idle"); }

  function retry() {
    setPhase("deleting");
    clearTimeout(timer.current);
    // Also fails (for demo) — in prod this would be a real retry
    timer.current = setTimeout(() => setPhase("failed"), 1000);
  }

  return (
    <div className={`border-b border-neutral-100 last:border-0 transition-colors ${phase === "failed" ? "bg-red-50" : ""}`}>
      {/* Idle row */}
      {phase === "idle" && (
        <div className="flex items-center gap-3 px-3 py-2.5 group hover:bg-neutral-50">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-neutral-800 truncate">{item.name}</p>
            <p className="text-[10px] text-neutral-400">{item.size}</p>
          </div>
          <button
            onClick={requestDelete}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-md"
          >
            <Trash2 size={12} />
          </button>
        </div>
      )}

      {/* Confirming */}
      {phase === "confirming" && (
        <div className="flex items-center justify-between gap-2 px-3 py-2 bg-orange-50 border-l-2 border-orange-400">
          <span className="text-xs text-orange-800">Delete <strong>{item.name}</strong>?</span>
          <div className="flex gap-1.5 shrink-0">
            <button onClick={confirmDelete} className="text-[11px] font-bold px-2.5 py-1 bg-red-600 text-white rounded-md hover:bg-red-700">Yes</button>
            <button onClick={cancel} className="text-[11px] px-2.5 py-1 border border-neutral-300 rounded-md text-neutral-600 bg-white hover:bg-neutral-50">Cancel</button>
          </div>
        </div>
      )}

      {/* Deleting */}
      {phase === "deleting" && (
        <div className="flex items-center gap-2 px-3 py-2.5 bg-neutral-50">
          <Loader2 size={12} className="animate-spin text-neutral-400 shrink-0" />
          <span className="text-xs text-neutral-500">Deleting {item.name}…</span>
        </div>
      )}

      {/* Failed */}
      {phase === "failed" && (
        <div>
          {/* Item still visible — was NOT removed */}
          <div className="flex items-center gap-3 px-3 py-2 opacity-50">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-neutral-800 truncate">{item.name}</p>
              <p className="text-[10px] text-neutral-400">{item.size}</p>
            </div>
          </div>
          {/* Error banner inline */}
          <div className="mx-3 mb-2.5 flex items-center gap-2 px-3 py-2 bg-red-100 rounded-lg border border-red-200 text-xs text-red-700">
            <AlertCircle size={12} className="shrink-0" />
            <span className="flex-1">Delete failed — network error</span>
            <button onClick={retry} className="flex items-center gap-0.5 text-[10px] font-semibold text-red-700 hover:text-red-900 underline">
              <RotateCcw size={9} /> Retry
            </button>
            <button onClick={cancel} className="ml-1 text-red-400 hover:text-red-600">
              <X size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PostConfirmFailureRecovery() {
  const [phaseMap, setPhaseMap] = useState<Record<number, Phase>>({});

  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full max-w-sm">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
        Post-confirm failure recovery
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
        <div className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wide px-3 py-2 border-b border-neutral-100">
          Storage
        </div>
        {ITEMS.map((item) => (
          <FileRow
            key={item.id}
            item={item}
            onPhaseChange={(id, p) => setPhaseMap((m) => ({ ...m, [id]: p }))}
          />
        ))}
      </div>

      <div className="mt-3 text-[11px] text-neutral-400">
        Hover a row → delete icon → confirm → watch it fail deliberately. The item is restored in the list, an inline error banner shows Retry + dismiss. Nothing is lost silently.
      </div>
    </div>
  );
}
