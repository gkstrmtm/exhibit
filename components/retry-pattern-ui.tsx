/**
 * Retry Pattern UI
 * Category: Feedback
 * Tags: retry, error, connection, failure, loading
 * Description: A connection failure card with retry functionality. Features a red error icon, descriptive message, primary retry button with refresh icon, auto-retry countdown timer, and attempt counter.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/retry-pattern-ui.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function RetryPatternUI() {
  return (
    <div className="min-h-[400px] bg-gray-50 flex items-center justify-center p-8">
      <div className="w-96 bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-5">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Connection Failed</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">Unable to reach the server. Please check your connection and try again.</p>
        <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium text-sm rounded-xl hover:bg-gray-800 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 4v6h6"/><path d="M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
          Retry
        </button>
        <p className="text-xs text-gray-400 mt-4">Retry in 12s</p>
        <p className="text-xs text-gray-300 mt-1">3 of 5 attempts</p>
      </div>
    </div>
  );
}