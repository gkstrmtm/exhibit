/**
 * Time Picker
 * Category: Inputs
 * Tags: time, picker, hour, minute, am-pm, input, clock
 * Description: A time picker with separate hour and minute selectors and an AM/PM toggle. Up/down arrow keys increment/decrement the respective field. The hour field wraps from 12 to 1. The minute field snaps to 5-minute intervals. A secondary 24-hour format display is shown below.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/time-picker.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { Clock, ChevronUp, ChevronDown } from "lucide-react";

export default function TimePicker() {
  const [hour, setHour] = useState(2);
  const [minute, setMinute] = useState(30);
  const [ampm, setAmpm] = useState<"AM" | "PM">("PM");

  const changeHour = (d: number) => setHour(h => { const n = h + d; if (n < 1) return 12; if (n > 12) return 1; return n; });
  const changeMin = (d: number) => setMinute(m => { const n = m + d * 5; if (n < 0) return 55; if (n >= 60) return 0; return n; });

  const h24 = ampm === "PM" ? (hour === 12 ? 12 : hour + 12) : (hour === 12 ? 0 : hour);
  const formatted24 = `${String(h24).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

  const Spinner = ({ label, onUp, onDown, value, format }: { label: string; onUp: () => void; onDown: () => void; value: number; format: (v: number) => string }) => (
    <div className="flex flex-col items-center gap-0.5">
      <div className="text-[8px] text-neutral-400 mb-0.5">{label}</div>
      <button onClick={onUp} className="w-8 h-5 flex items-center justify-center rounded hover:bg-neutral-100 transition-colors text-neutral-500">
        <ChevronUp size={12} strokeWidth={1.5} />
      </button>
      <div className="w-10 h-8 flex items-center justify-center bg-white border border-neutral-200 rounded-lg text-sm font-semibold text-neutral-800 tabular-nums">
        {format(value)}
      </div>
      <button onClick={onDown} className="w-8 h-5 flex items-center justify-center rounded hover:bg-neutral-100 transition-colors text-neutral-500">
        <ChevronDown size={12} strokeWidth={1.5} />
      </button>
    </div>
  );

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 w-full max-w-xs flex flex-col items-center gap-4">
      <div className="flex items-center gap-1.5 text-[9px] font-bold text-neutral-400 uppercase tracking-widest">
        <Clock size={10} strokeWidth={2} />Time picker
      </div>

      <div className="flex items-center gap-2">
        <Spinner label="Hour" onUp={() => changeHour(1)} onDown={() => changeHour(-1)} value={hour} format={v => String(v).padStart(2, "0")} />

        <div className="text-lg font-bold text-neutral-400 mb-1">:</div>

        <Spinner label="Min" onUp={() => changeMin(1)} onDown={() => changeMin(-1)} value={minute} format={v => String(v).padStart(2, "0")} />

        <div className="flex flex-col gap-0.5 ml-1">
          <div className="text-[8px] text-neutral-400 mb-0.5 text-center">AM/PM</div>
          {(["AM", "PM"] as const).map(p => (
            <button
              key={p}
              onClick={() => setAmpm(p)}
              className={`w-9 h-[18px] text-[9px] font-semibold rounded-md transition-colors ${ampm === p ? "bg-neutral-900 text-white" : "text-neutral-500 hover:bg-neutral-100"}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="text-xs font-mono text-neutral-500 bg-white border border-neutral-100 rounded-lg px-3 py-1.5">
        24h: <span className="font-semibold text-neutral-800">{formatted24}</span>
      </div>
    </div>
  );
}
