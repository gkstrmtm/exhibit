/**
 * Stepper Onboarding Flow
 * Category: Onboarding
 * Tags: onboarding, stepper, wizard, progress, flow
 * Description: A 5-step horizontal stepper with visual progress indicators, connecting lines, and an active form section for the current step.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/stepper-onboarding-flow.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function StepperOnboarding() {
  const steps = [
    { num: 1, label: "Account" },
    { num: 2, label: "Profile" },
    { num: 3, label: "Workspace" },
    { num: 4, label: "Integrations" },
    { num: 5, label: "Review" },
  ];

  return (
    <div className="min-h-[400px] bg-gray-50 p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-10">
          {steps.map((step, i) => (
            <div key={step.num} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 ${
                  step.num <= 2
                    ? "bg-emerald-500 border-emerald-500 text-white"
                    : step.num === 3
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white border-gray-300 text-gray-400"
                }`}>
                  {step.num <= 2 ? "✓" : step.num}
                </div>
                <span className={`mt-2 text-xs font-medium ${
                  step.num <= 2 ? "text-emerald-600" : step.num === 3 ? "text-blue-600" : "text-gray-400"
                }`}>{step.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-3 mt-[-1rem] ${
                  step.num < 3 ? "bg-emerald-500" : "bg-gray-300"
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Connect Your Workspace</h2>
          <p className="text-sm text-gray-500 mb-6">Link your workspace to get started with collaboration.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Workspace Name</label>
              <input type="text" placeholder="My Workspace" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Workspace URL</label>
              <input type="text" placeholder="https://workspace.example.com" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}