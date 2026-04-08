/**
 * Tooltip Variants
 * Category: Feedback
 * Tags: tooltip, hover, placement, variants, label, pointer
 * Description: A reference panel of tooltip placements and variants. Hovering each target element reveals its attached tooltip positioned at top, right, bottom, or left. Shows plain text tooltips and rich tooltips with a small description. Demonstrates the core tooltip positioning and content variants.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/tooltip-variants.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { Info, Copy, Trash2, Settings } from "lucide-react";

type Placement = "top" | "bottom" | "left" | "right";

const PLACEMENT_STYLE: Record<Placement, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

function Tip({ text, placement = "top", rich = false }: { text: string; placement?: Placement; rich?: boolean }) {
  const [show, setShow] = useState(false);
  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {rich
        ? <div className="flex items-center gap-1.5 text-xs border border-neutral-200 rounded-lg px-2.5 py-1.5 bg-white cursor-default hover:bg-neutral-50 transition-colors">
            <Info size={11} className="text-neutral-400" strokeWidth={1.5} />
            <span className="text-neutral-700">{text}</span>
          </div>
        : <div className="w-8 h-8 rounded-lg border border-neutral-200 bg-white flex items-center justify-center cursor-default hover:bg-neutral-50 transition-colors">
            {text === "Copy" && <Copy size={13} className="text-neutral-500" strokeWidth={1.5} />}
            {text === "Delete" && <Trash2 size={13} className="text-neutral-500" strokeWidth={1.5} />}
            {text === "Settings" && <Settings size={13} className="text-neutral-500" strokeWidth={1.5} />}
          </div>}

      {show && (
        <div className={`absolute z-20 pointer-events-none whitespace-nowrap ${PLACEMENT_STYLE[placement]}`}>
          <div className={`bg-neutral-900 text-white rounded-lg shadow-lg ${rich ? "px-3 py-2 max-w-[160px] whitespace-normal" : "px-2.5 py-1.5"}`}>
            {rich
              ? <>
                  <div className="text-[10px] font-semibold mb-0.5">{text}</div>
                  <div className="text-[9px] text-neutral-400 leading-relaxed">Hover any labeled field for contextual help.</div>
                </>
              : <div className="text-[10px] font-medium">{text}</div>}
          </div>
        </div>
      )}
    </div>
  );
}

export default function TooltipVariants() {
  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 w-full max-w-xs space-y-5">
      <div>
        <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-3">Placements (hover each)</div>
        <div className="grid grid-cols-3 gap-2 place-items-center">
          <div />
          <Tip text="Top tooltip" placement="top" />
          <div />
          <Tip text="Left" placement="left" />
          <div className="w-8 h-8 border border-neutral-200 rounded-lg bg-white" />
          <Tip text="Right" placement="right" />
          <div />
          <Tip text="Bottom" placement="bottom" />
          <div />
        </div>
      </div>

      <div>
        <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-3">Icon-only tooltips</div>
        <div className="flex gap-2">
          <Tip text="Copy" placement="top" />
          <Tip text="Delete" placement="top" />
          <Tip text="Settings" placement="top" />
        </div>
      </div>

      <div>
        <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-2">Rich tooltip</div>
        <Tip text="Contextual help" placement="bottom" rich />
      </div>
    </div>
  );
}
