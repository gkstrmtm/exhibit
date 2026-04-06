/**
 * File Upload Drop Zone
 * Category: Inputs
 * Tags: file upload, drag and drop, input, dropzone, file
 * Description: Drag-and-drop file upload area with border dash, icon, instruction copy, and a 'Browse files' fallback button. Accepts images and PDFs.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/file-upload-zone.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function FileUploadZone() {
  return (
    <div className="max-w-sm p-6">
      <div className="border-2 border-dashed border-neutral-200 rounded-xl p-8 flex flex-col items-center text-center hover:border-neutral-300 hover:bg-neutral-50 transition-colors cursor-pointer">
        <div className="text-3xl mb-3">⬆</div>
        <div className="text-sm font-medium text-neutral-700 mb-1">Drop files here</div>
        <div className="text-xs text-neutral-400 mb-4">PNG, JPG, PDF up to 10MB</div>
        <button className="px-4 py-1.5 text-xs font-medium border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-100">Browse files</button>
      </div>
    </div>
  );
}