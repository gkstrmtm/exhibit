/**
 * Destructive Confirm with Async
 * Category: Feedback
 * Tags: destructive, confirm, dialog, async, delete, danger
 * Description: A delete action with a two-step confirmation pattern: first click shows an inline confirmation bar with a red "Yes, delete" button and cancel. Confirming triggers an async spinner, then a success state. The undo window dismisses after 3s. Escape also cancels the confirmation step.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/destructive-confirm-with-async.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState, useRef, useEffect } from "react";
import { Trash2, Loader2, Check, X } from "lucide-react";

type ItemState = "idle" | "confirming" | "deleting" | "deleted";

interface Item { id: number; name: string; owner: string; }

const ITEMS: Item[] = [
  { id: 1, name: "Homepage redesign brief", owner: "Sarah Chen" },
  { id: 2, name: "Q1 campaign assets", owner: "Jordan Lee" },
  { id: 3, name: "API reference v2 draft", owner: "James Wu" },
];

function ItemRow({ item, onDelete }: { item: Item; onDelete: (id: number) => void }) {
  const [state, setState] = useState<ItemState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  function requestDelete() { setState("confirming"); }

  function confirmDelete() {
    setState("deleting");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setState("deleted");
      timer.current = setTimeout(() => onDelete(item.id), 1800);
    }, 900);
  }

  function cancelDelete() { setState("idle"); }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape" && state === "confirming") cancelDelete();
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  if (state === "deleted") {
    return (
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-neutral-100 last:border-0 bg-emerald-50 text-emerald-700 text-xs">
        <Check size={13} className="text-emerald-500" />
        <span className="italic text-neutral-500">"{item.name}" deleted</span>
      </div>
    );
  }

  return (
    <div className="border-b border-neutral-100 last:border-0">
      {/* Normal row */}
      {state === "idle" && (
        <div className="flex items-center gap-2 px-3 py-2.5 group hover:bg-neutral-50 transition-colors">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-neutral-800 truncate">{item.name}</p>
            <p className="text-[10px] text-neutral-400">{item.owner}</p>
          </div>
          <button
            onClick={requestDelete}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-md"
            title="Delete"
          >
            <Trash2 size={13} />
          </button>
        </div>
      )}

      {/* Confirming inline ask */}
      {state === "confirming" && (
        <div className="flex items-center justify-between gap-2 px-3 py-2 bg-red-50 border-l-2 border-red-400">
          <div className="flex items-center gap-1.5 text-xs text-red-700">
            <Trash2 size={12} />
            <span>Delete <strong>{item.name}</strong>?</span>
          </div>
          <div className="flex gap-1.5 shrink-0">
            <button
              onClick={confirmDelete}
              className="text-[11px] font-semibold px-2.5 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 active:scale-95"
            >
              Yes, delete
            </button>
            <button
              onClick={cancelDelete}
              className="text-[11px] px-2.5 py-1 bg-white border border-neutral-300 text-neutral-600 rounded-md hover:bg-neutral-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Deleting spinner */}
      {state === "deleting" && (
        <div className="flex items-center gap-2 px-3 py-2.5 bg-neutral-50">
          <Loader2 size={12} className="animate-spin text-neutral-400" />
          <span className="text-xs text-neutral-500">Deleting…</span>
        </div>
      )}
    </div>
  );
}

export default function DestructiveConfirmWithAsync() {
  const [items, setItems] = useState(ITEMS);

  function deleteItem(id: number) {
    setItems((is) => is.filter((i) => i.id !== id));
  }

  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full max-w-sm">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
        Destructive confirm — async pattern
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
        <div className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wide px-3 py-2 border-b border-neutral-100">
          Documents
        </div>
        {items.length === 0 ? (
          <div className="px-3 py-6 text-center text-xs text-neutral-400">All documents deleted</div>
        ) : (
          items.map((item) => (
            <ItemRow key={item.id} item={item} onDelete={deleteItem} />
          ))
        )}
      </div>

      <div className="mt-3 text-[11px] text-neutral-400">
        Hover a row to reveal the delete icon. Confirmation replaces the row inline — no modal. Escape cancels. Async spinner shows during the network call.
      </div>
    </div>
  );
}
