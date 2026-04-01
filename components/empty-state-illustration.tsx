/**
 * Empty State
 * Category: Feedback
 * Tags: empty, state, placeholder, onboarding, ux
 * Description: Friendly empty state with illustration placeholder and call to action. Essential for new users.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/empty-state-illustration.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function EmptyState() {
  return (
    <div className="p-12 bg-white flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mb-6">
        <div className="text-4xl">📂</div>
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">No projects yet</h3>
      <p className="text-sm text-neutral-500 max-w-sm mb-8 leading-relaxed">
        Get started by creating your first project. It only takes a minute and you can always change it later.
      </p>
      <div className="flex gap-3">
        <button className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          Create Project
        </button>
        <button className="px-6 py-2.5 bg-white text-neutral-700 text-sm font-medium rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors">
          Import
        </button>
      </div>
    </div>
  );
}