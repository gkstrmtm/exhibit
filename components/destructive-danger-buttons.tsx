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
      {step === "idle" ? (
        <button onClick={() => setStep("confirm")} className="border border-neutral-200 text-neutral-600 px-4 py-2 rounded-lg text-sm">Delete project</button>
      ) : (
        <div className="p-4 rounded-xl border border-red-200 bg-red-50">
          <div className="text-sm font-medium text-red-700">⚠ This cannot be undone</div>
          <div className="flex gap-2 mt-2">
            <button onClick={() => setStep("idle")} className="px-3 py-1.5 text-xs border rounded-md">Cancel</button>
            <button onClick={() => setStep("idle")} className="px-3 py-1.5 text-xs bg-red-600 text-white rounded-md">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}