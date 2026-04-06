/**
 * Email Composer
 * Category: Communication
 * Tags: email, compose, form, communication, message
 * Description: Compact email compose form with To, Subject, and body fields plus Send and Discard actions. Flat, no-modal inline compose pattern.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/email-composer.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function EmailComposer() {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden max-w-sm shadow-lg">
      <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900 text-white">
        <span className="text-xs font-semibold">New message</span>
        <div className="flex gap-2">
          <button className="text-neutral-400 hover:text-white text-xs">–</button>
          <button className="text-neutral-400 hover:text-white text-xs">✕</button>
        </div>
      </div>
      <div className="divide-y divide-neutral-100">
        <div className="flex items-center px-4 py-2">
          <span className="text-xs text-neutral-400 w-12 shrink-0">To</span>
          <input defaultValue="mia@acme.com" className="flex-1 text-sm text-neutral-700 outline-none" />
        </div>
        <div className="flex items-center px-4 py-2">
          <span className="text-xs text-neutral-400 w-12 shrink-0">Subject</span>
          <input defaultValue="Re: Design handoff" className="flex-1 text-sm text-neutral-700 outline-none" />
        </div>
      </div>
      <textarea rows={4} defaultValue="Hi Mia," className="w-full px-4 pt-2 pb-1 text-sm text-neutral-700 outline-none resize-none border-none" />
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-neutral-100">
        <button className="px-4 py-1.5 bg-blue-600 text-white text-xs rounded-lg font-medium">Send</button>
        <button className="text-neutral-400 hover:text-neutral-700 text-xs">🗑</button>
      </div>
    </div>
  );
}