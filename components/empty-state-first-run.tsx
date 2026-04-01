/**
 * Empty State - First Run
 * Category: Empty States
 * Tags: empty, state, onboarding, first-run, placeholder
 * Description: Centered empty state with a CSS-drawn document icon, heading, description, and primary/secondary action buttons. Ideal for onboarding and first-run experiences.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/empty-state-first-run.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function EmptyStateFirstRun() {
  return (
    <div className="min-h-[400px] bg-white border border-neutral-200 rounded-lg flex items-center justify-center p-12">
      <div className="text-center max-w-sm">
        <div className="mx-auto mb-6 w-20 h-20 rounded-2xl bg-neutral-100 border-2 border-dashed border-neutral-300 flex items-center justify-center">
          <div className="relative">
            <div className="w-8 h-10 border-2 border-neutral-400 rounded-sm bg-white" />
            <div className="absolute top-2 left-1.5 w-5 h-0.5 bg-neutral-300 rounded" />
            <div className="absolute top-3.5 left-1.5 w-3 h-0.5 bg-neutral-300 rounded" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">+</span>
            </div>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">No projects yet</h3>
        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
          Get started by creating your first project. You can also import existing projects from your local machine or a Git repository.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
            Create your first project
          </button>
          <button className="px-5 py-2.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
            Import
          </button>
        </div>
      </div>
    </div>
  );
}