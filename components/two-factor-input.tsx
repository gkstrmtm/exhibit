/**
 * Two-Factor Code Input
 * Category: Authentication
 * Tags: 2FA, OTP, code input, authentication, verification
 * Description: Six individual digit boxes for 2FA or OTP entry. Auto-focus next box on input, backspace clears and moves back, paste support across all six.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/two-factor-input.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useRef } from "react";
export default function TwoFactorInput() {
  const refs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));
  const handleInput = (i: number, v: string) => {
    if (v && i < 5) refs[i + 1].current?.focus();
    if (!v && i > 0) refs[i - 1].current?.focus();
  };
  return (
    <div className="flex flex-col items-center gap-6 py-10 px-6">
      <div className="text-sm font-semibold text-neutral-900">Enter the 6-digit code</div>
      <div className="flex gap-2">
        {refs.map((ref, i) => (
          <input
            key={i}
            ref={ref}
            maxLength={1}
            className="w-10 h-12 text-center text-lg font-semibold border border-neutral-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-neutral-900"
            onChange={e => handleInput(i, e.target.value)}
          />
        ))}
      </div>
      <button className="px-8 py-2 bg-neutral-900 text-white text-sm rounded-lg font-medium">Verify</button>
    </div>
  );
}