/**
 * Assistant Workspace Loading
 * Category: Loading
 * Tags: assistant, loading, workspace, skeleton, state, chat
 * Description: A contained loading state for assistant workspaces that preserves shell, mode controls, and artifact layout instead of blanking the interface.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/assistant-workspace-loading.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

const historyRows = Array.from({ length: 4 }, (_, index) => index);
const threadRows = Array.from({ length: 3 }, (_, index) => index);

export default function AssistantWorkspaceLoading() {
  return (
    <div className="h-[430px] overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50">
      <div className="grid h-full grid-cols-[196px_minmax(0,1fr)_252px] animate-pulse">
        <aside className="border-r border-slate-200 bg-white p-4">
          <div className="h-11 rounded-full bg-slate-200" />
          <div className="mt-4 h-20 rounded-[18px] bg-slate-100" />
          <div className="mt-4 space-y-2">
            {historyRows.map((row) => (
              <div key={row} className="h-16 rounded-[18px] bg-slate-100" />
            ))}
          </div>
        </aside>

        <main className="flex min-w-0 flex-col bg-white">
          <div className="border-b border-slate-200 px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="h-3 w-24 rounded-full bg-slate-200" />
                <div className="mt-3 h-6 w-48 rounded-full bg-slate-200" />
              </div>
              <div className="flex gap-2">
                <div className="h-9 w-20 rounded-full bg-slate-200" />
                <div className="h-9 w-20 rounded-full bg-slate-200" />
                <div className="h-9 w-20 rounded-full bg-slate-200" />
              </div>
            </div>
          </div>

          <div className="border-b border-slate-200 px-6 py-4">
            <div className="grid gap-3 md:grid-cols-3">
              {Array.from({ length: 3 }, (_, index) => (
                <div key={index} className="h-20 rounded-[18px] bg-slate-100" />
              ))}
            </div>
          </div>

          <div className="flex-1 px-6 py-6">
            <div className="mx-auto flex max-w-3xl flex-col gap-4">
              {threadRows.map((row) => (
                <div key={row} className="rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-5">
                  <div className="h-3 w-24 rounded-full bg-slate-200" />
                  <div className="mt-4 h-3 w-full rounded-full bg-slate-200" />
                  <div className="mt-2 h-3 w-[92%] rounded-full bg-slate-200" />
                  <div className="mt-2 h-3 w-[78%] rounded-full bg-slate-200" />
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 px-6 py-5">
            <div className="mx-auto max-w-3xl rounded-[26px] border border-slate-200 bg-slate-50 p-4">
              <div className="h-24 rounded-[18px] bg-slate-200" />
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex gap-2">
                  <div className="h-9 w-24 rounded-full bg-slate-200" />
                  <div className="h-9 w-24 rounded-full bg-slate-200" />
                </div>
                <div className="h-9 w-28 rounded-full bg-slate-200" />
              </div>
            </div>
          </div>
        </main>

        <aside className="border-l border-slate-200 bg-slate-50 p-4">
          <div className="h-full rounded-[22px] border border-slate-200 bg-white p-4">
            <div className="h-4 w-28 rounded-full bg-slate-200" />
            <div className="mt-4 h-28 rounded-[18px] bg-slate-100" />
            <div className="mt-4 h-36 rounded-[18px] bg-slate-100" />
            <div className="mt-4 h-24 rounded-[18px] bg-slate-100" />
          </div>
        </aside>
      </div>
    </div>
  );
}