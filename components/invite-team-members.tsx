/**
 * Invite Team Members
 * Category: Onboarding
 * Tags: invite, team, email, onboarding, role, send
 * Description: A team invitation form for onboarding. Users can enter multiple email addresses and assign a role before sending invitations. Chips appear for each added email. Invalid emails are flagged. The send button shows a loading state and success count. Demonstrates the team invite step common in SaaS onboarding.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/invite-team-members.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState, useRef } from "react";
import { X, Send, Loader2, CheckCircle2 } from "lucide-react";

const ROLES = ["Member", "Admin", "Viewer"];

export default function InviteTeamMembers() {
  const [emails, setEmails] = useState<{ val: string; valid: boolean }[]>([]);
  const [input, setInput] = useState("");
  const [role, setRole] = useState("Member");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function addEmail(raw: string) {
    const val = raw.trim().replace(/,+$/, "");
    if (!val) return;
    setEmails(e => [...e, { val, valid: emailRe.test(val) }]);
    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addEmail(input); }
    if (e.key === "Backspace" && !input && emails.length) setEmails(e => e.slice(0, -1));
  }

  function remove(i: number) { setEmails(e => e.filter((_, j) => j !== i)); }

  function send() {
    if (input.trim()) addEmail(input.trim());
    const validCount = emails.filter(e => e.valid).length + (input.trim() && emailRe.test(input.trim()) ? 1 : 0);
    if (validCount === 0) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1400);
  }

  if (sent) return (
    <div className="bg-white border border-emerald-200 rounded-xl p-5 w-full max-w-xs text-center space-y-2">
      <CheckCircle2 size={20} className="text-emerald-500 mx-auto" strokeWidth={1.5} />
      <div className="text-sm font-semibold text-neutral-900">Invites sent!</div>
      <div className="text-xs text-neutral-500">{emails.filter(e => e.valid).length} invite{emails.length !== 1 ? "s" : ""} sent as {role}.</div>
      <button onClick={() => { setSent(false); setEmails([]); }} className="text-[10px] text-blue-600 hover:underline">Send more</button>
    </div>
  );

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-5 w-full max-w-xs space-y-4">
      <div>
        <div className="text-sm font-semibold text-neutral-900 mb-0.5">Invite teammates</div>
        <div className="text-xs text-neutral-500">Add emails separated by Enter or comma.</div>
      </div>

      {/* Email input with chips */}
      <div
        className="min-h-[56px] flex flex-wrap gap-1.5 p-2 border border-neutral-300 rounded-lg focus-within:border-neutral-500 cursor-text transition-colors"
        onClick={() => inputRef.current?.focus()}
      >
        {emails.map(({ val, valid }, i) => (
          <span
            key={i}
            className={`flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded ${valid ? "bg-neutral-100 text-neutral-700" : "bg-red-50 text-red-600 border border-red-200"}`}
          >
            {val}
            <button onClick={() => remove(i)} className="text-current opacity-50 hover:opacity-100"><X size={9} /></button>
          </span>
        ))}
        <input
          ref={inputRef}
          className="flex-1 min-w-[120px] text-xs outline-none bg-transparent placeholder-neutral-400"
          placeholder={emails.length === 0 ? "colleague@company.com" : ""}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => { if (input.trim()) addEmail(input); }}
        />
      </div>

      {/* Role */}
      <div>
        <label className="text-[10px] font-medium text-neutral-500 uppercase tracking-wide block mb-1">Role</label>
        <div className="flex gap-1.5">
          {ROLES.map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`text-xs px-2.5 py-1 rounded border transition-colors ${role === r ? "bg-neutral-900 text-white border-neutral-900" : "border-neutral-200 text-neutral-600 hover:border-neutral-400"}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={send}
        disabled={loading || (emails.length === 0 && !input.trim())}
        className="w-full flex items-center justify-center gap-2 text-xs font-medium bg-neutral-900 text-white rounded-lg py-2 hover:bg-neutral-700 disabled:opacity-40 transition-colors"
      >
        {loading ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
        Send invites
      </button>
    </div>
  );
}
