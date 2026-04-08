/**
 * API Key Panel
 * Category: Admin
 * Tags: api key, credentials, developer, integration, settings, security
 * Description: Fully interactive API credentials panel. Every state handled: copy with
 * clipboard feedback + haptic burst, reveal/auto-mask with 15s idle timer, inline rotate
 * confirmation that avoids a modal, rotate in-progress spinner, and post-rotate done
 * acknowledgment. Haptic patterns vary by action severity so the tactile vocabulary
 * matches the visual one.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/api-key-panel.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  Check,
  Copy,
  Eye,
  EyeOff,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

// ─── constants ────────────────────────────────────────────────────────────────

const MASKED_SUFFIX = "4a9f";
const MASKED_KEY = `ek_live_${"•".repeat(28)}${MASKED_SUFFIX}`;
const LIVE_KEY = "ek_live_a7f3b9d2e1c4f8a6b3d9e2c5f7a1b4d6c8f4a9f";
const AUTO_MASK_MS = 15_000; // auto-mask 15s after reveal

const scopes = [
  { label: "agent:read",      desc: "Call intelligence stages" },
  { label: "exhibits:read",   desc: "Fetch component catalog" },
  { label: "categories:read", desc: "List component categories" },
];

// ─── haptic helper ─────────────────────────────────────────────────────────────
// Silently ignored in environments without Vibration API (desktop, iOS).

function haptic(pattern: number | number[]) {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

// ─── types ────────────────────────────────────────────────────────────────────

type CopyPhase   = "idle" | "copied" | "error";
type RotatePhase = "idle" | "confirm" | "rotating" | "done";

// ─── component ────────────────────────────────────────────────────────────────

export default function ApiKeyPanel() {
  const [revealed,     setRevealed]     = useState(false);
  const [copyPhase,    setCopyPhase]    = useState<CopyPhase>("idle");
  const [rotatePhase,  setRotatePhase]  = useState<RotatePhase>("idle");
  // After rotation, the masked suffix changes to reflect the new key identity.
  const [maskedKey,    setMaskedKey]    = useState(MASKED_KEY);

  const maskTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copyTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-mask after reveal
  useEffect(() => {
    if (!revealed) return;
    maskTimer.current = setTimeout(() => setRevealed(false), AUTO_MASK_MS);
    return () => { if (maskTimer.current) clearTimeout(maskTimer.current); };
  }, [revealed]);

  // Cleanup copy reset timer on unmount
  useEffect(() => () => { if (copyTimer.current) clearTimeout(copyTimer.current); }, []);

  // ── copy ──────────────────────────────────────────────────────────────────

  const handleCopy = useCallback(async () => {
    if (copyPhase !== "idle") return;
    try {
      await navigator.clipboard.writeText(LIVE_KEY);
      setCopyPhase("copied");
      haptic(40); // short success tap
      copyTimer.current = setTimeout(() => setCopyPhase("idle"), 2000);
    } catch {
      setCopyPhase("error");
      haptic([80, 60, 80]); // double pulse = error
      copyTimer.current = setTimeout(() => setCopyPhase("idle"), 2000);
    }
  }, [copyPhase]);

  // ── reveal toggle ─────────────────────────────────────────────────────────

  const handleReveal = useCallback(() => {
    setRevealed((prev) => {
      if (!prev) haptic(20); // subtle tap on open
      return !prev;
    });
  }, []);

  // ── rotate ────────────────────────────────────────────────────────────────

  const handleRotateRequest = useCallback(() => {
    setRotatePhase("confirm");
    haptic(30);
  }, []);

  const handleRotateCancel = useCallback(() => setRotatePhase("idle"), []);

  const handleRotateConfirm = useCallback(async () => {
    setRotatePhase("rotating");
    haptic([40, 80, 40]); // alert: action in flight
    // Simulate network round-trip for key rotation
    await new Promise<void>((r) => setTimeout(r, 1400));
    setMaskedKey(`ek_live_${"•".repeat(28)}b2e1`); // new key, new suffix
    setRevealed(false);
    setRotatePhase("done");
    haptic([30, 50, 100]); // escalating = complete
    setTimeout(() => setRotatePhase("idle"), 3000);
  }, []);

  // ── derived ───────────────────────────────────────────────────────────────

  const keyDisplay   = revealed ? LIVE_KEY : maskedKey;
  const keyRowBorder = rotatePhase === "done" ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-slate-50";

  return (
    <div className="w-full max-w-lg space-y-3">
      <div className="rounded-xl border border-slate-200 bg-white">

        {/* ── header ───────────────────────────────────────────────────── */}
        <div className="border-b border-slate-100 px-4 py-3">
          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
            API credentials
          </div>
          <div className="mt-1 text-[13px] font-semibold text-slate-900">Production key</div>
        </div>

        {/* ── key row ──────────────────────────────────────────────────── */}
        <div className="px-4 py-4">
          {/*
           * Mobile: key text on top, actions below (col).
           * sm+: single row (row).
           * Key text truncates so it never blows layout on narrow screens.
           */}
          <div className={`flex flex-col gap-2 rounded-lg border px-3 py-3 transition-colors duration-300 sm:flex-row sm:items-center sm:py-2.5 ${keyRowBorder}`}>
            <span
              className={`min-w-0 flex-1 truncate font-mono text-[12px] tracking-wider transition-colors duration-200 sm:whitespace-nowrap ${
                revealed ? "select-all text-slate-900" : "text-slate-500"
              }`}
            >
              {keyDisplay}
            </span>

            {/* actions row — always horizontal, sits below key on mobile */}
            <div className="flex items-center gap-2">
              {/* reveal / mask — 44px tap target on mobile, compact on desktop */}
              <button
                onClick={handleReveal}
                aria-label={revealed ? "Mask key" : "Reveal key"}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-400 active:scale-95 active:bg-slate-100 sm:h-7 sm:w-7"
              >
                {revealed
                  ? <EyeOff className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                  : <Eye    className="h-4 w-4 sm:h-3.5 sm:w-3.5" />}
              </button>

              {/* copy — full-width pill on mobile, compact on desktop */}
              <button
                onClick={handleCopy}
                disabled={copyPhase !== "idle"}
                aria-label="Copy API key"
                className={`inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-md border text-[12px] font-medium active:scale-95 sm:h-7 sm:flex-none sm:px-2.5 sm:text-[11px] transition-all duration-150 ${
                  copyPhase === "copied"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : copyPhase === "error"
                    ? "border-red-200 bg-red-50 text-red-600"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 active:bg-slate-100"
                }`}
              >
                {copyPhase === "copied" ? (
                  <><Check className="h-4 w-4 sm:h-3.5 sm:w-3.5" />Copied</>
                ) : copyPhase === "error" ? (
                  <>Failed</>
                ) : (
                  <><Copy className="h-4 w-4 sm:h-3.5 sm:w-3.5" />Copy</>
                )}
              </button>
            </div>
          </div>

          {/*
           * Meta + rotate row.
           * Mobile: stacks (col). sm+: single row (row).
           * Confirm state also stacks on mobile so the warning
           * + cancel/rotate buttons each get a full line.
           */}
          <div className="mt-2 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-mono text-[11px] text-slate-400">
              Last used: 2026-04-07 at 14:32 UTC
            </span>

            {/* rotate: idle */}
            {rotatePhase === "idle" && (
              <button
                onClick={handleRotateRequest}
                className="inline-flex items-center gap-1.5 self-start text-[11px] font-medium text-slate-400 transition-colors hover:text-red-600 sm:self-auto"
              >
                <RotateCcw className="h-3 w-3" />
                Rotate key
              </button>
            )}

            {/* rotate: confirm — inline, no modal; stacks on mobile */}
            {rotatePhase === "confirm" && (
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
                <span className="flex items-center gap-1 text-[11px] font-medium text-amber-700">
                  <AlertTriangle className="h-3 w-3 shrink-0" />
                  Invalidates current key
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRotateCancel}
                    className="h-9 flex-1 rounded-md border border-slate-200 text-[11px] text-slate-500 active:bg-slate-50 sm:h-auto sm:flex-none sm:border-0 sm:px-0"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRotateConfirm}
                    className="inline-flex h-9 flex-1 items-center justify-center gap-1 rounded-md bg-red-600 px-3 text-[11px] font-medium text-white active:bg-red-700 sm:h-auto sm:flex-none sm:py-0.5 hover:bg-red-700"
                  >
                    Rotate
                  </button>
                </div>
              </div>
            )}

            {/* rotate: in flight */}
            {rotatePhase === "rotating" && (
              <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-400">
                <RefreshCw className="h-3 w-3 animate-spin" />
                Rotating…
              </span>
            )}

            {/* rotate: done */}
            {rotatePhase === "done" && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700">
                <Check className="h-3 w-3" />
                New key active
              </span>
            )}
          </div>
        </div>

        {/* ── scopes ───────────────────────────────────────────────────── */}
        <div className="border-t border-slate-100 px-4 py-4">
          <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
            Scopes
          </div>
          <div className="space-y-2">
            {scopes.map((scope) => (
              <div key={scope.label} className="flex items-center gap-3">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                <span className="font-mono text-[12px] text-slate-800">{scope.label}</span>
                <span className="text-[11px] text-slate-400">{scope.desc}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
