/**
 * Inline Validation Patterns
 * Category: Feedback
 * Tags: form, validation, input, feedback, error
 * Description: A form demonstrating four validation states: valid (green check), error (red border with message), warning (amber strength meter), and neutral (no validation yet). Essential UX patterns for form design.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/inline-validation-patterns.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function InlineValidationPatterns() {
  return (
    <div className="min-h-[400px] bg-white p-10 flex items-center justify-center">
      <div className="w-full max-w-md flex flex-col gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <div className="relative">
            <input value="designpro" readOnly className="w-full border-2 border-green-400 rounded-lg px-3 py-2.5 text-sm bg-green-50/50 pr-10" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 font-bold">✓</span>
          </div>
          <p className="text-xs text-green-600 mt-1">Available</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input value="user@invalid" readOnly className="w-full border-2 border-red-400 rounded-lg px-3 py-2.5 text-sm bg-red-50/50" />
          <p className="text-xs text-red-600 mt-1">Invalid email format</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input type="password" value="abc" readOnly className="w-full border-2 border-amber-400 rounded-lg px-3 py-2.5 text-sm" />
          <div className="flex items-center gap-2 mt-2">
            <div className="flex gap-1 flex-1">
              {[1,2,3,4,5].map(i => (
                <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= 2 ? "bg-amber-400" : "bg-gray-200"}`} />
              ))}
            </div>
            <span className="text-xs text-amber-600 font-medium">Weak</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input type="password" placeholder="Re-enter password" className="w-full border-2 border-gray-200 rounded-lg px-3 py-2.5 text-sm" />
        </div>
      </div>
    </div>
  );
}