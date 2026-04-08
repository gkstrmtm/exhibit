/**
 * Permission Denied State
 * Category: Empty States
 * Tags: access, permission, denied, forbidden, empty-state, role
 * Description: An access-denied / permission-required empty state. Shows a lock icon, explanation of which role is required to view the content, and contact/upgrade options. Demonstrates the forbidden resource state pattern — more informative than a blank screen or generic 403.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/permission-denied-state.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { Lock, Shield } from "lucide-react";

export default function PermissionDeniedState() {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl flex flex-col items-center py-8 px-6 w-full max-w-xs text-center space-y-4">
      {/* Icon badge */}
      <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center">
        <Lock size={20} className="text-amber-600" strokeWidth={1.5} />
      </div>

      <div className="space-y-1">
        <div className="text-sm font-semibold text-neutral-900">Access restricted</div>
        <p className="text-xs text-neutral-500 leading-relaxed">
          You need <span className="font-semibold text-neutral-700">Admin</span> permissions to view Audit Logs. Contact your workspace owner to request access.
        </p>
      </div>

      {/* Role badge callout */}
      <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 w-full">
        <Shield size={12} className="text-neutral-400 shrink-0" strokeWidth={1.5} />
        <div className="text-left">
          <div className="text-[10px] font-semibold text-neutral-700">Your role: Member</div>
          <div className="text-[9px] text-neutral-400">Required: Admin or Owner</div>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <button className="text-xs font-medium bg-neutral-900 text-white rounded-lg py-1.5 hover:bg-neutral-700 transition-colors">
          Request access
        </button>
        <button className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors">
          Learn about roles →
        </button>
      </div>
    </div>
  );
}
