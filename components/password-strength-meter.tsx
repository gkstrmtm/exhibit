/**
 * Password Strength Meter
 * Category: Inputs
 * Tags: password, strength, meter, validation, security, entropy
 * Description: A password input field with a live strength meter. Strength is evaluated across four criteria: length ≥8, uppercase, number, and special character. A segmented bar fills progressively in red → amber → yellow → green. Individual criteria checklist below the bar. Demonstrates the password strength feedback pattern.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/password-strength-meter.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";

const CRITERIA = [
  { key: "length", label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { key: "upper", label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { key: "number", label: "One number", test: (p: string) => /\d/.test(p) },
  { key: "special", label: "One special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

const LEVELS = [
  { label: "Too weak", color: "bg-red-400", max: 1 },
  { label: "Weak", color: "bg-orange-400", max: 2 },
  { label: "Fair", color: "bg-amber-400", max: 3 },
  { label: "Strong", color: "bg-emerald-500", max: 4 },
];

export default function PasswordStrengthMeter() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const score = CRITERIA.filter(c => c.test(password)).length;
  const level = password ? LEVELS[Math.max(0, score - 1)] : null;

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-5 w-full max-w-xs space-y-4">
      <div>
        <label className="text-xs font-medium text-neutral-700 block mb-1">New password</label>
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter password…"
            className="w-full text-xs border border-neutral-300 rounded-lg px-3 py-2 pr-8 outline-none focus:border-neutral-500 transition-colors"
          />
          <button
            type="button"
            onClick={() => setShow(v => !v)}
            className="absolute right-2.5 top-2.5 text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            {show ? <EyeOff size={13} /> : <Eye size={13} />}
          </button>
        </div>
      </div>

      {/* Strength bar */}
      <div>
        <div className="flex gap-1 mb-1">
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              className={`flex-1 h-1 rounded-full transition-all duration-300 ${password && i <= score ? level!.color : "bg-neutral-200"}`}
            />
          ))}
        </div>
        {level && (
          <div className="flex justify-end">
            <span className={`text-[10px] font-semibold ${
              score <= 1 ? "text-red-500" : score === 2 ? "text-orange-500" : score === 3 ? "text-amber-500" : "text-emerald-600"
            }`}>{level.label}</span>
          </div>
        )}
      </div>

      {/* Criteria */}
      <div className="space-y-1.5">
        {CRITERIA.map(({ key, label, test }) => {
          const met = password ? test(password) : false;
          return (
            <div key={key} className="flex items-center gap-2">
              {met
                ? <Check size={11} className="text-emerald-500 shrink-0" strokeWidth={2.5} />
                : <X size={11} className="text-neutral-300 shrink-0" strokeWidth={2} />}
              <span className={`text-[11px] ${met ? "text-emerald-700" : "text-neutral-400"}`}>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
