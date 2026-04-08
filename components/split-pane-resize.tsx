/**
 * Split Pane Resize
 * Category: Layout
 * Tags: split, pane, resize, drag, divider, layout
 * Description: A two-column split pane layout with a draggable divider that allows resizing. The user drags the center handle to adjust the width of both panes. Min and max widths prevent either pane from collapsing completely. Demonstrates the core pointer-event drag resize pattern used in code editors and inspection tools.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/split-pane-resize.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useRef, useState, useCallback } from "react";
import { GripVertical } from "lucide-react";

const MIN = 100;
const MAX = 360;
const DEFAULT = 200;

export default function SplitPaneResize() {
  const [leftWidth, setLeftWidth] = useState(DEFAULT);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const onMouseDown = useCallback(() => {
    dragging.current = true;

    const onMove = (e: MouseEvent) => {
      if (!dragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const next = Math.min(MAX, Math.max(MIN, e.clientX - rect.left));
      setLeftWidth(next);
    };

    const onUp = () => {
      dragging.current = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex h-60 rounded-xl border border-neutral-200 overflow-hidden w-full max-w-xl bg-white select-none"
    >
      {/* Left pane */}
      <div
        className="flex flex-col border-r border-neutral-200 overflow-hidden bg-neutral-50"
        style={{ width: leftWidth, minWidth: MIN, flexShrink: 0 }}
      >
        <div className="px-3 py-2 border-b border-neutral-200">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">Files</span>
        </div>
        <div className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {["index.tsx", "App.tsx", "utils.ts", "styles.css", "components/", "hooks/", "api/", "types.ts"].map((f) => (
            <div key={f} className="text-xs text-neutral-600 px-2 py-1 rounded hover:bg-neutral-200 cursor-default truncate">
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div
        className="w-3 flex items-center justify-center cursor-col-resize bg-neutral-100 hover:bg-neutral-200 transition-colors border-r border-neutral-200 shrink-0"
        onMouseDown={onMouseDown}
        title="Drag to resize"
      >
        <GripVertical size={10} className="text-neutral-400" />
      </div>

      {/* Right pane */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-3 py-2 border-b border-neutral-200">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">Preview</span>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <span className="text-xs text-neutral-400">Select a file to preview</span>
        </div>
      </div>
    </div>
  );
}
