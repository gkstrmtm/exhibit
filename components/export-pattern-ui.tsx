/**
 * Export Pattern
 * Category: Data Density
 * Tags: export, form, data, download, data-density
 * Description: Complete data export UI with format selection, date range picker, column toggles, primary action, and recent exports history.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/export-pattern-ui.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function ExportPatternUI() {
  return (
    <div className="p-8 bg-neutral-100 min-h-[300px] flex items-start justify-center">
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm w-full max-w-lg p-6 flex flex-col gap-5">
        <h3 className="text-lg font-semibold text-neutral-900">Export Data</h3>
        <div>
          <label className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2 block">Format</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm"><input type="radio" name="fmt" defaultChecked className="accent-blue-600" /> CSV</label>
            <label className="flex items-center gap-2 text-sm"><input type="radio" name="fmt" /> JSON</label>
            <label className="flex items-center gap-2 text-sm"><input type="radio" name="fmt" /> PDF</label>
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2 block">Date Range</label>
          <div className="flex items-center gap-2">
            <input type="date" defaultValue="2024-01-01" className="border rounded-md px-3 py-1.5 text-sm" />
            <span className="text-sm text-neutral-400">to</span>
            <input type="date" defaultValue="2024-01-31" className="border rounded-md px-3 py-1.5 text-sm" />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2 block">Columns</label>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked /> Name</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked /> Email</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked /> Status</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked /> Created</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Phone</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Address</label>
          </div>
        </div>
        <button className="bg-blue-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-700">Export</button>
        <div className="border-t pt-4">
          <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-3">Recent Exports</div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-700">users_export_Jan15.csv</span>
              <div className="flex items-center gap-3">
                <span className="text-neutral-400 text-xs">2.4 MB</span>
                <a href="#" className="text-blue-600 text-xs font-medium">Download</a>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-700">users_export_Jan08.csv</span>
              <div className="flex items-center gap-3">
                <span className="text-neutral-400 text-xs">1.8 MB</span>
                <a href="#" className="text-blue-600 text-xs font-medium">Download</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}