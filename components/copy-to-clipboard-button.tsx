/**
 * Copy To Clipboard Button
 * Category: Buttons
 * Tags: copy, clipboard, button, confirmation, check, feedback
 * Description: A standalone copy-to-clipboard button that shows a 1.5-second success tick after copying. Multiple variants are demonstrated: an icon-only button, an icon+label button, and an inline code snippet row with its own copy trigger. Each variant independently tracks its copied state.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/copy-to-clipboard-button.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";

function useCopy(resetMs = 1500) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), resetMs);
    }).catch(() => {
      // Fallback: just toggle the state for preview environments
      setCopied(true);
      setTimeout(() => setCopied(false), resetMs);
    });
  }, [resetMs]);
  return { copied, copy };
}

const SNIPPET = "npx create-next-app@latest --typescript";
const API_KEY = "sk-exhibit-a1b2c3d4e5f6g7h8i9j0";

export default function CopyToClipboardButton() {
  const icon = useCopy();
  const label = useCopy();
  const snippet = useCopy();
  const key = useCopy();

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 w-full max-w-xs space-y-4">
      <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Copy variants</div>

      {/* Icon only */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] text-neutral-500 w-20">Icon only</span>
        <button
          onClick={() => icon.copy("icon-only")}
          className="w-7 h-7 flex items-center justify-center rounded-md border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors"
        >
          {icon.copied ? <Check size={11} strokeWidth={2} className="text-emerald-500" /> : <Copy size={11} strokeWidth={1.5} className="text-neutral-500" />}
        </button>
      </div>

      {/* Icon + label */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] text-neutral-500 w-20">With label</span>
        <button
          onClick={() => label.copy("with-label")}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-medium border transition-colors ${label.copied ? "border-emerald-200 bg-emerald-50 text-emerald-600" : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"}`}
        >
          {label.copied ? <><Check size={10} strokeWidth={2} />Copied!</> : <><Copy size={10} strokeWidth={1.5} />Copy</>}
        </button>
      </div>

      {/* Command snippet */}
      <div>
        <div className="text-[9px] text-neutral-400 mb-1.5">Terminal command</div>
        <div className="flex items-center gap-1 bg-neutral-900 rounded-lg px-2.5 py-2">
          <code className="flex-1 text-[9px] font-mono text-emerald-400 truncate">{SNIPPET}</code>
          <button onClick={() => snippet.copy(SNIPPET)} className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded hover:bg-neutral-700 transition-colors">
            {snippet.copied ? <Check size={9} strokeWidth={2} className="text-emerald-400" /> : <Copy size={9} strokeWidth={1.5} className="text-neutral-400" />}
          </button>
        </div>
      </div>

      {/* API key */}
      <div>
        <div className="text-[9px] text-neutral-400 mb-1.5">API key</div>
        <div className="flex items-center gap-1 bg-white border border-neutral-200 rounded-lg px-2.5 py-1.5">
          <code className="flex-1 text-[9px] font-mono text-neutral-500 truncate">{API_KEY.slice(0, 14)}••••••••••</code>
          <button onClick={() => key.copy(API_KEY)} className={`flex-shrink-0 flex items-center gap-1 text-[9px] transition-colors ${key.copied ? "text-emerald-500" : "text-neutral-400 hover:text-neutral-600"}`}>
            {key.copied ? <><Check size={9} strokeWidth={2} />Copied</> : <><Copy size={9} strokeWidth={1.5} />Copy</>}
          </button>
        </div>
      </div>
    </div>
  );
}
