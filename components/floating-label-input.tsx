/**
 * Floating Label Input
 * Category: Inputs
 * Tags: floating-label, input, animated, label, focus
 * Description: Input fields with animated floating labels. The label starts at placeholder position inside the input and transitions to a small label above the input on focus or when a value is present. Four fields are shown: Name, Email, Password, and Company. No placeholder text — the floating label serves both roles.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/floating-label-input.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type FieldProps = { label: string; type?: string; autoComplete?: string };

function FloatField({ label, type = "text", autoComplete }: FieldProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const raised = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        type={isPassword ? (show ? "text" : "password") : type}
        autoComplete={autoComplete}
        value={value}
        onChange={e => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full px-3 pt-5 pb-1.5 border rounded-lg text-[11px] text-neutral-800 bg-white outline-none transition-colors peer ${focused ? "border-neutral-500" : "border-neutral-200 hover:border-neutral-300"}`}
      />
      <label
        className={`absolute left-3 pointer-events-none font-medium transition-all duration-150 ${raised ? "top-1.5 text-[8px] text-neutral-400" : "top-1/2 -translate-y-1/2 text-[11px] text-neutral-400"}`}
      >
        {label}
      </label>
      {isPassword && (
        <button
          type="button"
          onClick={() => setShow(v => !v)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          {show ? <EyeOff size={12} strokeWidth={1.5} /> : <Eye size={12} strokeWidth={1.5} />}
        </button>
      )}
    </div>
  );
}

export default function FloatingLabelInput() {
  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 w-full max-w-xs space-y-3">
      <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Floating label fields</div>
      <FloatField label="Full name" autoComplete="name" />
      <FloatField label="Email address" type="email" autoComplete="email" />
      <FloatField label="Password" type="password" autoComplete="current-password" />
      <FloatField label="Company" autoComplete="organization" />
      <button className="w-full py-2 bg-neutral-900 text-white text-[11px] font-medium rounded-lg hover:bg-neutral-700 transition-colors">
        Continue
      </button>
    </div>
  );
}
