/**
 * Number Stepper
 * Category: Inputs
 * Tags: number, stepper, increment, decrement, input, min-max
 * Description: A number input with +/- stepper buttons on either side. Min/max clamped. Long-pressing a button accelerates the step rate. Three variants shown: quantity (1–99), percentage (0–100 step 5), and duration in minutes (5–240 step 5). Demonstrates the precise-input stepper pattern.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/number-stepper.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState, useRef, useEffect } from "react";
import { Minus, Plus } from "lucide-react";

interface StepperConfig {
  label: string;
  unit?: string;
  min: number;
  max: number;
  step: number;
  initial: number;
}

function Stepper({ config }: { config: StepperConfig }) {
  const [value, setValue] = useState(config.initial);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => { clearInterval(intervalRef.current); clearTimeout(timeoutRef.current); }, []);

  function clamp(v: number) { return Math.max(config.min, Math.min(config.max, v)); }

  function startHold(delta: number) {
    // First fire immediately
    setValue((v) => clamp(v + delta));
    // After 400ms, start repeating
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setValue((v) => clamp(v + delta));
      }, 80);
    }, 400);
  }

  function stopHold() {
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);
  }

  const atMin = value <= config.min;
  const atMax = value >= config.max;

  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-3">
      <div className="text-[10px] text-neutral-400 uppercase tracking-wide mb-2">{config.label}</div>
      <div className="flex items-center gap-2">
        <button
          onMouseDown={() => startHold(-config.step)}
          onMouseUp={stopHold}
          onMouseLeave={stopHold}
          onTouchStart={() => startHold(-config.step)}
          onTouchEnd={stopHold}
          disabled={atMin}
          className="h-8 w-8 rounded-md border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 active:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors select-none"
        >
          <Minus size={13} strokeWidth={2.5} />
        </button>

        <div className="flex-1 text-center">
          <span className="text-lg font-semibold text-neutral-900 tabular-nums">{value}</span>
          {config.unit && <span className="text-xs text-neutral-400 ml-1">{config.unit}</span>}
        </div>

        <button
          onMouseDown={() => startHold(config.step)}
          onMouseUp={stopHold}
          onMouseLeave={stopHold}
          onTouchStart={() => startHold(config.step)}
          onTouchEnd={stopHold}
          disabled={atMax}
          className="h-8 w-8 rounded-md border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 active:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors select-none"
        >
          <Plus size={13} strokeWidth={2.5} />
        </button>
      </div>

      {/* Range indicator */}
      <div className="mt-2 h-1 rounded-full bg-neutral-100 overflow-hidden">
        <div
          className="h-full bg-neutral-400 rounded-full transition-all"
          style={{ width: `${((value - config.min) / (config.max - config.min)) * 100}%` }}
        />
      </div>
      <div className="flex justify-between mt-0.5">
        <span className="text-[9px] text-neutral-400">{config.min}</span>
        <span className="text-[9px] text-neutral-400">{config.max}</span>
      </div>
    </div>
  );
}

const CONFIGS: StepperConfig[] = [
  { label: "Quantity", min: 1, max: 99, step: 1, initial: 3 },
  { label: "Discount", unit: "%", min: 0, max: 100, step: 5, initial: 20 },
  { label: "Duration", unit: "min", min: 5, max: 240, step: 5, initial: 30 },
];

export default function NumberStepper() {
  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full max-w-xs">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
        Number stepper
      </div>
      <div className="space-y-3">
        {CONFIGS.map((c) => <Stepper key={c.label} config={c} />)}
      </div>
      <div className="mt-3 text-[11px] text-neutral-400">
        Hold the +/- button for 400ms to trigger a rapid increment loop at 80ms interval. Range bar reflects position between min and max.
      </div>
    </div>
  );
}
