/**
 * Multi-Step Form
 * Category: Inputs
 * Tags: multi-step, wizard, form, steps, progress, linear
 * Description: A linear multi-step form wizard with a step indicator at the top. Each step shows different fields. Back/Next navigation validates the current step before advancing. The final step shows a review summary before submission. Demonstrates the stepped form pattern for complex data entry.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/multi-step-form.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const STEPS = ["Account", "Profile", "Plan", "Review"];

export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ email: "", password: "", name: "", role: "", plan: "Pro" });
  const [done, setDone] = useState(false);

  function update(key: string, val: string) { setData(d => ({ ...d, [key]: val })); }

  const inputCls = "w-full text-xs border border-neutral-300 rounded-lg px-3 py-2 outline-none focus:border-neutral-500 transition-colors";
  const selectCls = inputCls + " bg-white";

  const StepContent = () => {
    if (step === 0) return (
      <div className="space-y-3">
        <div><label className="text-xs font-medium text-neutral-700 block mb-1">Email</label><input className={inputCls} type="email" placeholder="you@example.com" value={data.email} onChange={e => update("email", e.target.value)} /></div>
        <div><label className="text-xs font-medium text-neutral-700 block mb-1">Password</label><input className={inputCls} type="password" placeholder="Choose a password" value={data.password} onChange={e => update("password", e.target.value)} /></div>
      </div>
    );
    if (step === 1) return (
      <div className="space-y-3">
        <div><label className="text-xs font-medium text-neutral-700 block mb-1">Full name</label><input className={inputCls} type="text" placeholder="Jane Smith" value={data.name} onChange={e => update("name", e.target.value)} /></div>
        <div><label className="text-xs font-medium text-neutral-700 block mb-1">Role</label>
          <select className={selectCls} value={data.role} onChange={e => update("role", e.target.value)}>
            <option value="">Select your role…</option>
            {["Designer", "Engineer", "Product", "Marketing", "Other"].map(r => <option key={r}>{r}</option>)}
          </select>
        </div>
      </div>
    );
    if (step === 2) return (
      <div className="space-y-2">
        {["Free", "Pro", "Team"].map(plan => (
          <label key={plan} className={`flex items-center justify-between border rounded-lg px-3 py-2.5 cursor-pointer transition-colors ${data.plan === plan ? "border-neutral-900 bg-neutral-50" : "border-neutral-200 hover:border-neutral-300"}`}>
            <div>
              <div className="text-xs font-medium text-neutral-800">{plan}</div>
              <div className="text-[10px] text-neutral-400">{plan === "Free" ? "Up to 3 projects" : plan === "Pro" ? "$12/mo · 20 projects" : "$49/mo · Unlimited"}</div>
            </div>
            <input type="radio" name="plan" value={plan} checked={data.plan === plan} onChange={() => update("plan", plan)} className="accent-neutral-900" />
          </label>
        ))}
      </div>
    );
    return (
      <div className="space-y-2">
        {[["Email", data.email], ["Name", data.name], ["Role", data.role || "—"], ["Plan", data.plan]].map(([k, v]) => (
          <div key={k} className="flex justify-between text-xs">
            <span className="text-neutral-500">{k}</span>
            <span className="font-medium text-neutral-800">{v}</span>
          </div>
        ))}
      </div>
    );
  };

  if (done) return (
    <div className="bg-white border border-neutral-200 rounded-xl p-6 w-full max-w-xs flex flex-col items-center gap-2 text-center">
      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-1">
        <Check size={18} className="text-emerald-600" strokeWidth={2.5} />
      </div>
      <div className="text-sm font-semibold text-neutral-900">Account created</div>
      <div className="text-xs text-neutral-500">Welcome, {data.name || data.email}!</div>
      <button onClick={() => { setDone(false); setStep(0); setData({ email: "", password: "", name: "", role: "", plan: "Pro" }); }} className="text-xs text-blue-600 hover:underline mt-1">Start over</button>
    </div>
  );

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-5 w-full max-w-xs">
      {/* Step indicator */}
      <div className="flex items-center mb-5">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 transition-colors
              ${i < step ? "bg-neutral-900 text-white" : i === step ? "bg-neutral-900 text-white" : "bg-neutral-200 text-neutral-500"}`}>
              {i < step ? <Check size={10} strokeWidth={3} /> : i + 1}
            </div>
            {i < STEPS.length - 1 && <div className={`flex-1 h-px mx-1 ${i < step ? "bg-neutral-900" : "bg-neutral-200"}`} />}
          </div>
        ))}
      </div>

      <div className="text-xs font-semibold text-neutral-800 mb-3">{STEPS[step]}</div>
      <StepContent />

      <div className="flex gap-2 mt-4">
        {step > 0 && <button onClick={() => setStep(s => s - 1)} className="flex-1 text-xs border border-neutral-300 text-neutral-700 rounded-lg py-1.5 hover:bg-neutral-50 transition-colors">Back</button>}
        <button
          onClick={() => step < STEPS.length - 1 ? setStep(s => s + 1) : setDone(true)}
          className="flex-1 text-xs font-medium bg-neutral-900 text-white rounded-lg py-1.5 hover:bg-neutral-700 transition-colors"
        >
          {step === STEPS.length - 1 ? "Submit" : "Continue"}
        </button>
      </div>
    </div>
  );
}
