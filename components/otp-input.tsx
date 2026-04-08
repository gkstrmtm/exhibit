/**
 * OTP Input
 * Category: Authentication
 * Tags: otp, code, input, verification, 2fa, sms
 * Description: A 6-digit OTP (one-time password) input with individual digit boxes. Paste a full code to auto-fill all boxes. Backspace on an empty box moves focus to the previous one. Auto-advances focus on each digit typed. A resend timer counts down 30 seconds before allowing resend. Demonstrates the OTP entry pattern for 2FA flows.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/otp-input.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useRef, useState, useEffect } from "react";

const LEN = 6;

export default function OtpInput() {
  const [digits, setDigits] = useState<string[]>(Array(LEN).fill(""));
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setTimer(t => Math.max(0, t - 1)), 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  function focus(i: number) { refs.current[i]?.focus(); }

  function handleChange(i: number, val: string) {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    setError("");
    if (val && i < LEN - 1) focus(i + 1);
    if (next.every(d => d) && next.join("")) checkCode(next.join(""));
  }

  function handleKey(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      const next = [...digits]; next[i - 1] = ""; setDigits(next); focus(i - 1);
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LEN);
    if (pasted.length === LEN) {
      e.preventDefault();
      setDigits(pasted.split(""));
      focus(LEN - 1);
      checkCode(pasted);
    }
  }

  function checkCode(code: string) {
    if (code === "123456") {
      setVerified(true);
      setError("");
    } else {
      setError("Incorrect code. Try 123456.");
      setDigits(Array(LEN).fill(""));
      setTimeout(() => focus(0), 50);
    }
  }

  function resend() {
    setTimer(30);
    setDigits(Array(LEN).fill(""));
    setError("");
    setVerified(false);
    setTimeout(() => focus(0), 50);
  }

  if (verified) return (
    <div className="bg-white border border-emerald-200 rounded-xl p-6 w-full max-w-xs text-center space-y-2">
      <div className="text-2xl">✓</div>
      <div className="text-sm font-semibold text-neutral-900">Verified!</div>
      <button onClick={() => { setVerified(false); setDigits(Array(LEN).fill("")); }} className="text-[10px] text-blue-600 hover:underline">Start over</button>
    </div>
  );

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-6 w-full max-w-xs space-y-4">
      <div className="text-center">
        <div className="text-sm font-semibold text-neutral-900 mb-1">Check your phone</div>
        <div className="text-xs text-neutral-500">Enter the 6-digit code sent to +1 •••• 4821</div>
      </div>

      <div className="flex justify-center gap-2" onPaste={handlePaste}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={el => { refs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKey(i, e)}
            className={`w-9 h-10 text-center text-sm font-semibold border rounded-lg outline-none transition-colors
              ${error ? "border-red-400 bg-red-50" : "border-neutral-300 focus:border-neutral-600"}`}
          />
        ))}
      </div>

      {error && <p className="text-[10px] text-red-500 text-center">{error}</p>}

      <div className="text-center text-xs text-neutral-500">
        {timer > 0
          ? <>Resend code in <span className="font-medium text-neutral-800">{timer}s</span></>
          : <button onClick={resend} className="text-blue-600 font-medium hover:underline">Resend code</button>}
      </div>

      <p className="text-center text-[9px] text-neutral-400">Hint: the code is 123456</p>
    </div>
  );
}
