/**
 * Multi-Step Wizard
 * Category: Onboarding
 * Tags: wizard, modal, multi-step, form, onboarding
 * Description: Modal-style wizard with a left sidebar showing step progress, a main content area for the current step, and navigation controls.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/multi-step-wizard.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function MultiStepWizard() {
  const steps = [
    { label: "Personal Info", done: true },
    { label: "Company Details", done: false },
    { label: "Preferences", done: false },
    { label: "Confirmation", done: false },
  ];

  return (
    <div className="min-h-[500px] bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-3xl overflow-hidden flex min-h-[420px]">
        <div className="w-64 bg-gray-50 border-r border-gray-200 p-6 flex flex-col">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">Setup Steps</h3>
          <div className="space-y-4 flex-1">
            {steps.map((step, i) => (
              <div key={i} className={`flex items-center gap-3 text-sm ${i === 1 ? "font-semibold text-blue-600" : step.done ? "text-emerald-600" : "text-gray-400"}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  step.done ? "bg-emerald-100 text-emerald-600" : i === 1 ? "bg-blue-100 text-blue-600 font-bold" : "bg-gray-100 text-gray-400"
                }`}>
                  {step.done ? "✓" : i + 1}
                </div>
                {step.label}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Company Details</h2>
            <p className="text-sm text-gray-500 mb-6">Tell us about your organization.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input type="text" placeholder="Acme Inc." className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm">
                  <option>Technology</option>
                  <option>Finance</option>
                  <option>Healthcare</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
                <input type="text" placeholder="1-10" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm" />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 px-8 py-4 flex items-center justify-between bg-gray-50">
            <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">← Back</button>
            <span className="text-sm text-gray-400">Step 2 of 4</span>
            <button className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
}