/**
 * Optimistic Row Update
 * Category: Tables
 * Tags: optimistic, update, mutation, row, async, undo, feedback
 * Description: A compact table where clicking a status badge applies the change immediately (optimistic update), shows a brief "saving…" micro-indicator in-row, then resolves. An undo chip appears for 3s after save. Demonstrates the "apply first, confirm async" pattern.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/optimistic-row-update.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState, useRef, useEffect } from "react";
import { Check, RotateCcw, Loader2 } from "lucide-react";

type Status = "Open" | "In Review" | "Done" | "Archived";

interface Row {
  id: number;
  name: string;
  status: Status;
  owner: string;
}

const STATUS_CYCLE: Record<Status, Status> = {
  Open: "In Review",
  "In Review": "Done",
  Done: "Archived",
  Archived: "Open",
};

const STATUS_COLORS: Record<Status, string> = {
  Open: "bg-blue-100 text-blue-700",
  "In Review": "bg-amber-100 text-amber-700",
  Done: "bg-emerald-100 text-emerald-700",
  Archived: "bg-neutral-100 text-neutral-500",
};

const INITIAL_ROWS: Row[] = [
  { id: 1, name: "Homepage redesign", status: "Open", owner: "Sarah" },
  { id: 2, name: "API rate-limit docs", status: "In Review", owner: "James" },
  { id: 3, name: "Billing modal fix", status: "Done", owner: "Maya" },
  { id: 4, name: "Onboarding flow", status: "Open", owner: "Leo" },
];

interface RowState {
  saving: boolean;
  prevStatus: Status | null;
  undoVisible: boolean;
}

export default function OptimisticRowUpdate() {
  const [rows, setRows] = useState<Row[]>(INITIAL_ROWS);
  const [rowState, setRowState] = useState<Record<number, RowState>>({});
  const timers = useRef<Record<number, ReturnType<typeof setTimeout>[]>>({});

  function clearTimers(id: number) {
    (timers.current[id] ?? []).forEach(clearTimeout);
    timers.current[id] = [];
  }

  function addTimer(id: number, t: ReturnType<typeof setTimeout>) {
    if (!timers.current[id]) timers.current[id] = [];
    timers.current[id].push(t);
  }

  useEffect(() => () => Object.values(timers.current).flat().forEach(clearTimeout), []);

  function advanceStatus(id: number) {
    const row = rows.find((r) => r.id === id);
    if (!row) return;
    const prev = row.status;
    const next = STATUS_CYCLE[prev];

    // Optimistic update
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status: next } : r)));
    setRowState((s) => ({ ...s, [id]: { saving: true, prevStatus: prev, undoVisible: false } }));
    clearTimers(id);

    // Simulate async confirm
    addTimer(id, setTimeout(() => {
      setRowState((s) => ({ ...s, [id]: { saving: false, prevStatus: prev, undoVisible: true } }));

      // Hide undo after 3s
      addTimer(id, setTimeout(() => {
        setRowState((s) => ({ ...s, [id]: { ...s[id], undoVisible: false, prevStatus: null } }));
      }, 3000));
    }, 700));
  }

  function undo(id: number) {
    const prev = rowState[id]?.prevStatus;
    if (!prev) return;
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status: prev } : r)));
    setRowState((s) => ({ ...s, [id]: { saving: false, prevStatus: null, undoVisible: false } }));
    clearTimers(id);
  }

  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full max-w-lg">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
        Optimistic row update
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto_auto] text-[10px] font-semibold text-neutral-400 uppercase tracking-wide px-3 py-2 border-b border-neutral-100">
          <span>Task</span>
          <span className="w-20 text-center">Status</span>
          <span className="w-12 text-center">Owner</span>
          <span className="w-10" />
        </div>

        {rows.map((row) => {
          const rs = rowState[row.id];
          return (
            <div key={row.id} className="grid grid-cols-[1fr_auto_auto_auto] items-center px-3 py-2.5 border-b border-neutral-100 last:border-0">
              <span className="text-xs text-neutral-800">{row.name}</span>

              {/* Status badge — click to advance */}
              <button
                onClick={() => advanceStatus(row.id)}
                disabled={rs?.saving}
                className={`w-20 text-center text-[10px] font-medium px-2 py-1 rounded-full transition-colors ${STATUS_COLORS[row.status]} flex items-center justify-center gap-1`}
              >
                {rs?.saving ? (
                  <><Loader2 size={9} className="animate-spin" /> saving</>
                ) : (
                  row.status
                )}
              </button>

              <span className="w-12 text-center text-xs text-neutral-500">{row.owner}</span>

              {/* Undo */}
              <div className="w-10 flex justify-end">
                {rs?.undoVisible && (
                  <button
                    onClick={() => undo(row.id)}
                    className="flex items-center gap-0.5 text-[10px] text-neutral-500 hover:text-neutral-800 transition-colors"
                    title="Undo"
                  >
                    <RotateCcw size={10} />
                    Undo
                  </button>
                )}
                {!rs?.saving && !rs?.undoVisible && rs?.prevStatus === null && row.status !== INITIAL_ROWS.find(r=>r.id===row.id)!.status && (
                  <Check size={11} className="text-emerald-500" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 text-[11px] text-neutral-400">
        Click any status badge to advance it. Change applies instantly, "saving" indicator confirms async write, undo chip appears for 3s.
      </div>
    </div>
  );
}
