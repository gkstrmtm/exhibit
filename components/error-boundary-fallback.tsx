/**
 * Error Boundary Fallback
 * Category: Feedback
 * Tags: error, boundary, fallback, crash, retry, recovery
 * Description: A component-level error boundary fallback UI. Shows an error icon, message, optional error details in a collapsible code block, and a Retry button. A "Report issue" secondary action is also present. Simulates a recoverable crash and recovery via retry. Demonstrates the error boundary fallback pattern.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/error-boundary-fallback.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { AlertTriangle, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

const FAKE_STACK = `TypeError: Cannot read properties of undefined (reading 'map')
  at DataTable (components/DataTable.tsx:42:18)
  at renderWithHooks (react-dom.development.js:14985:18)
  at mountIndeterminateComponent (react-dom.development.js:17811:13)`;

export default function ErrorBoundaryFallback() {
  const [crashed, setCrashed] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [retrying, setRetrying] = useState(false);

  function retry() {
    setRetrying(true);
    setTimeout(() => {
      setRetrying(false);
      setCrashed(false);
    }, 1200);
  }

  if (!crashed) return (
    <div className="bg-white border border-emerald-200 rounded-xl p-5 w-full max-w-xs text-center space-y-2">
      <div className="text-emerald-600 font-semibold text-sm">Component recovered!</div>
      <div className="text-xs text-neutral-500">The data table is now rendering correctly.</div>
      <button onClick={() => setCrashed(true)} className="text-[10px] text-blue-600 hover:underline">Simulate crash again</button>
    </div>
  );

  return (
    <div className="bg-white border border-red-200 rounded-xl overflow-hidden w-full max-w-xs">
      {/* Header band */}
      <div className="h-1 bg-red-500 w-full" />

      <div className="p-4 space-y-3">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <AlertTriangle size={14} className="text-red-500" strokeWidth={2} />
          </div>
          <div>
            <div className="text-xs font-semibold text-neutral-900">Something went wrong</div>
            <div className="text-[11px] text-neutral-500 mt-0.5">The Data Table component encountered an unexpected error.</div>
          </div>
        </div>

        {/* Collapsible stack trace */}
        <button
          onClick={() => setExpanded(v => !v)}
          className="flex items-center gap-1 text-[10px] text-neutral-400 hover:text-neutral-700 transition-colors"
        >
          {expanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
          {expanded ? "Hide" : "Show"} error details
        </button>
        {expanded && (
          <pre className="text-[9px] text-red-700 bg-red-50 border border-red-100 rounded-lg p-2 overflow-x-auto whitespace-pre-wrap font-mono">
            {FAKE_STACK}
          </pre>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={retry}
            disabled={retrying}
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium bg-neutral-900 text-white rounded-lg py-1.5 hover:bg-neutral-700 disabled:opacity-50 transition-colors"
          >
            <RefreshCw size={11} className={retrying ? "animate-spin" : ""} />
            {retrying ? "Retrying…" : "Retry"}
          </button>
          <button className="text-xs text-neutral-500 hover:text-neutral-700 border border-neutral-200 rounded-lg px-3 transition-colors">
            Report
          </button>
        </div>
      </div>
    </div>
  );
}
