/**
 * Permission-Gated UI States
 * Category: Feedback
 * Tags: permission, access, gated, upgrade, lock, pro
 * Description: Side-by-side comparison of unlocked and locked UI states. The left card shows a fully functional settings panel with toggles, while the right card is blurred with a lock overlay and upgrade prompt.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/permission-gated-states.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function PermissionGatedStates() {
  return (
    <div className="min-h-[400px] bg-gray-100 p-8 flex items-center justify-center gap-8">
      <div className="w-80 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Settings</h3>
          <p className="text-xs text-gray-500 mt-0.5">Manage your preferences</p>
        </div>
        <div className="p-5 flex flex-col gap-4">
          {["Email notifications", "Dark mode", "Auto-save"].map((item) => (
            <div key={item} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{item}</span>
              <div className="w-10 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative w-80">
        <div className="w-80 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden filter blur-[2px] opacity-60">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Settings</h3>
            <p className="text-xs text-gray-500 mt-0.5">Manage your preferences</p>
          </div>
          <div className="p-5 flex flex-col gap-4">
            {["Email notifications", "Dark mode", "Auto-save"].map((item) => (
              <div key={item} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{item}</span>
                <div className="w-10 h-6 bg-gray-300 rounded-full relative">
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm rounded-xl">
          <div className="text-3xl mb-2">🔒</div>
          <p className="text-sm font-semibold text-gray-800 mb-1">Upgrade to Pro to unlock</p>
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg">Upgrade Now</button>
        </div>
      </div>
    </div>
  );
}