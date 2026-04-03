/**
 * Destructive / Danger Buttons
 * Category: Buttons
 * Tags: danger, destructive, delete, confirm, ux, safety
 * Description: Buttons for irreversible actions — delete, remove, deactivate. Follows the two-step confirm pattern: ghost red first, solid red on confirm. Protects users from accidents without adding friction to normal flow.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/destructive-danger-buttons.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { Trash2, AlertTriangle, X } from "lucide-react";
import { useState } from "react";

export default function DestructiveDangerButtons() {
  const [step, setStep] = useState<"idle" | "confirm">("idle");
  return (
    <div className="p-8 bg-white flex flex-col gap-8 items-start">
      <div className="flex flex-col gap-3">
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Danger hierarchy</div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            <Trash2 className="w-4 h-4" />Delete account
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
            <Trash2 className="w-4 h-4" />Delete
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
            <Trash2 className="w-4 h-4" />Remove
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Two-step confirm pattern</div>
        {step === "idle" ? (
          <button
            onClick={() => setStep("confirm")}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-neutral-200 text-neutral-600 rounded-lg hover:border-red-200 hover:text-red-600 hover:bg-red-50 transition-all w-full justify-center"
          >
            <Trash2 className="w-4 h-4" />Delete project
          </button>
        ) : (
          <div className="flex flex-col gap-2 p-4 rounded-xl border border-red-200 bg-red-50">
            <div className="flex items-center gap-2 text-sm font-medium text-red-700">
              <AlertTriangle className="w-4 h-4" />This cannot be undone
            </div>
            <p className="text-xs text-red-600">All data, members, and settings will be permanently deleted.</p>
            <div className="flex gap-2 mt-1">
              <button onClick={() => setStep("idle")} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-600 border border-neutral-200 rounded-md hover:bg-white transition-colors">
                <X className="w-3 h-3" />Cancel
              </button>
              <button onClick={() => setStep("idle")} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                <Trash2 className="w-3 h-3" />Yes, delete it
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}