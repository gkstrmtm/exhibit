/**
 * Form Field Validation
 * Category: Inputs
 * Tags: form, validation, error, inline, required, feedback
 * Description: A multi-field form demonstrating inline field-level validation. Each field validates on blur. Error messages appear below the field in red. Valid fields show a green check. The submit button remains disabled until all required fields are valid. Demonstrates the standard inline validation UX pattern.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/form-field-validation.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface FieldState { value: string; touched: boolean; error: string; }

function validate(name: string, value: string): string {
  if (!value.trim()) return "Required";
  if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email address";
  if (name === "password" && value.length < 8) return "Must be at least 8 characters";
  if (name === "url" && !/^https?:\/\/.+/.test(value)) return "Must start with https://";
  return "";
}

const FIELDS: { name: string; label: string; type: string; placeholder: string }[] = [
  { name: "name", label: "Full name", type: "text", placeholder: "Jane Smith" },
  { name: "email", label: "Work email", type: "email", placeholder: "jane@company.com" },
  { name: "password", label: "Password", type: "password", placeholder: "Min. 8 characters" },
  { name: "url", label: "Website", type: "url", placeholder: "https://yoursite.com" },
];

export default function FormFieldValidation() {
  const [fields, setFields] = useState<Record<string, FieldState>>(
    Object.fromEntries(FIELDS.map(f => [f.name, { value: "", touched: false, error: "" }]))
  );
  const [submitted, setSubmitted] = useState(false);

  function handleBlur(name: string) {
    setFields(prev => ({
      ...prev,
      [name]: { ...prev[name], touched: true, error: validate(name, prev[name].value) },
    }));
  }

  function handleChange(name: string, value: string) {
    setFields(prev => ({
      ...prev,
      [name]: { ...prev[name], value, error: prev[name].touched ? validate(name, value) : "" },
    }));
  }

  const allValid = FIELDS.every(f => !validate(f.name, fields[f.name].value));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!allValid) {
      setFields(prev =>
        Object.fromEntries(
          FIELDS.map(f => [f.name, { ...prev[f.name], touched: true, error: validate(f.name, prev[f.name].value) }])
        )
      );
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-white border border-emerald-200 rounded-xl p-6 w-full max-w-xs flex flex-col items-center gap-2">
        <CheckCircle2 size={28} className="text-emerald-500" strokeWidth={1.5} />
        <div className="text-sm font-semibold text-neutral-900">Form submitted!</div>
        <button onClick={() => { setSubmitted(false); setFields(Object.fromEntries(FIELDS.map(f => [f.name, { value: "", touched: false, error: "" }]))); }} className="text-xs text-blue-600 hover:underline mt-1">Reset</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-neutral-200 rounded-xl p-5 w-full max-w-xs space-y-4" noValidate>
      {FIELDS.map(({ name, label, type, placeholder }) => {
        const { value, touched, error } = fields[name];
        const isValid = touched && !error && value.trim();
        return (
          <div key={name}>
            <label className="block text-xs font-medium text-neutral-700 mb-1">
              {label} <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={e => handleChange(name, e.target.value)}
                onBlur={() => handleBlur(name)}
                className={`w-full text-xs px-3 py-2 pr-8 border rounded-lg outline-none transition-colors
                  ${error && touched ? "border-red-400 bg-red-50 focus:border-red-500" :
                    isValid ? "border-emerald-400 focus:border-emerald-500" :
                    "border-neutral-300 focus:border-neutral-500"}`}
              />
              {isValid && <CheckCircle2 size={13} className="absolute right-2.5 top-2.5 text-emerald-500" />}
              {error && touched && <AlertCircle size={13} className="absolute right-2.5 top-2.5 text-red-400" />}
            </div>
            {error && touched && <p className="text-[10px] text-red-500 mt-1">{error}</p>}
          </div>
        );
      })}

      <button
        type="submit"
        disabled={false}
        className="w-full text-xs font-medium bg-neutral-900 text-white rounded-lg py-2 hover:bg-neutral-700 transition-colors disabled:opacity-40"
      >
        Create account
      </button>
    </form>
  );
}
