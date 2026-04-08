/**
 * Coupon Code Input
 * Category: Commerce
 * Tags: coupon, discount, promo, code, checkout, validation
 * Description: A coupon / promo code input field used in checkout. Entering a valid code shows a success state with the discount applied and an updated total. Invalid codes show an inline error. Removing the code resets the total. Demonstrates the coupon code UX pattern for checkout flows.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/coupon-code-input.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { Tag, X, Loader2, CheckCircle2 } from "lucide-react";

const VALID_CODES: Record<string, { label: string; pct: number }> = {
  "SAVE20": { label: "20% off", pct: 20 },
  "LAUNCH10": { label: "10% off launch offer", pct: 10 },
  "FRIEND50": { label: "50% friend discount", pct: 50 },
};

const BASE = 99.00;
function fmt(n: number) { return "$" + n.toFixed(2); }

export default function CouponCodeInput() {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<{ code: string; pct: number; label: string } | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function apply() {
    if (!code.trim()) return;
    setLoading(true);
    setError("");
    setTimeout(() => {
      const match = VALID_CODES[code.trim().toUpperCase()];
      if (match) {
        setApplied({ code: code.trim().toUpperCase(), ...match });
        setCode("");
        setError("");
      } else {
        setError("Invalid promo code. Try SAVE20.");
      }
      setLoading(false);
    }, 800);
  }

  function remove() { setApplied(null); setCode(""); setError(""); }

  const discount = applied ? BASE * (applied.pct / 100) : 0;
  const total = BASE - discount;

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-4 w-full max-w-xs space-y-3">
      {/* Order total */}
      <div className="flex justify-between items-baseline">
        <span className="text-xs text-neutral-500">Order total</span>
        <span className="text-sm font-semibold text-neutral-900">{fmt(BASE)}</span>
      </div>

      {/* Applied badge */}
      {applied && (
        <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={12} className="text-emerald-500" strokeWidth={2} />
            <span className="text-[11px] font-medium text-emerald-700">{applied.code}</span>
            <span className="text-[10px] text-emerald-600">· {applied.label}</span>
          </div>
          <button onClick={remove} className="text-emerald-400 hover:text-emerald-700">
            <X size={12} />
          </button>
        </div>
      )}

      {/* Input */}
      {!applied && (
        <div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag size={11} className="absolute left-2.5 top-2.5 text-neutral-400" strokeWidth={1.5} />
              <input
                className={`w-full text-xs pl-7 pr-3 py-2 border rounded-lg outline-none focus:border-neutral-500 transition-colors uppercase tracking-wide
                  ${error ? "border-red-400 bg-red-50" : "border-neutral-300"}`}
                placeholder="Promo code"
                value={code}
                onChange={e => { setCode(e.target.value); setError(""); }}
                onKeyDown={e => e.key === "Enter" && apply()}
              />
            </div>
            <button
              onClick={apply}
              disabled={loading || !code.trim()}
              className="text-xs font-medium bg-neutral-900 text-white rounded-lg px-3 disabled:opacity-40 transition-colors hover:bg-neutral-700 min-w-[56px] flex items-center justify-center"
            >
              {loading ? <Loader2 size={12} className="animate-spin" /> : "Apply"}
            </button>
          </div>
          {error && <p className="text-[10px] text-red-500 mt-1">{error}</p>}
        </div>
      )}

      {/* Summary */}
      {applied && (
        <div className="space-y-1 pt-1 border-t border-neutral-100">
          <div className="flex justify-between text-xs text-neutral-500">
            <span>Subtotal</span><span>{fmt(BASE)}</span>
          </div>
          <div className="flex justify-between text-xs text-emerald-600">
            <span>Discount ({applied.pct}%)</span><span>−{fmt(discount)}</span>
          </div>
          <div className="flex justify-between text-sm font-semibold text-neutral-900">
            <span>Total</span><span>{fmt(total)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
