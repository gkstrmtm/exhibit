/**
 * Kanban Board Shell
 * Category: App Shells
 * Tags: app-shell, kanban, board, project-management, columns
 * Description: Horizontal scrolling Kanban layout with labeled columns, card stacks with assignees and priority badges, drag-ready structure, and an add-column button.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/kanban-board-shell.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";

const initialColumns = [
  {
    id: "backlog", label: "Backlog", color: "bg-neutral-400",
    cards: [
      { id: 1, title: "Update API docs", priority: "low", assignee: "AJ", tag: "Docs" },
      { id: 2, title: "Design new onboarding flow", priority: "medium", assignee: "SK", tag: "Design" },
      { id: 3, title: "Refactor auth module", priority: "high", assignee: "MC", tag: "Dev" },
    ],
  },
  {
    id: "inprogress", label: "In Progress", color: "bg-blue-500",
    cards: [
      { id: 4, title: "Implement search filters", priority: "high", assignee: "PP", tag: "Dev" },
      { id: 5, title: "Write unit tests for billing", priority: "medium", assignee: "AJ", tag: "Dev" },
    ],
  },
  {
    id: "review", label: "In Review", color: "bg-amber-500",
    cards: [
      { id: 6, title: "Fix modal accessibility issues", priority: "high", assignee: "SK", tag: "A11y" },
    ],
  },
  {
    id: "done", label: "Done", color: "bg-emerald-500",
    cards: [
      { id: 7, title: "Set up CI/CD pipeline", priority: "medium", assignee: "MC", tag: "Infra" },
      { id: 8, title: "Launch beta invite page", priority: "high", assignee: "PP", tag: "Marketing" },
      { id: 9, title: "Migrate to Drizzle ORM", priority: "low", assignee: "AJ", tag: "Dev" },
    ],
  },
];

const priorityStyles: Record<string, string> = {
  low: "bg-neutral-100 text-neutral-500",
  medium: "bg-amber-50 text-amber-600",
  high: "bg-red-50 text-red-500",
};

const avatarColors: Record<string, string> = {
  AJ: "from-blue-400 to-cyan-500",
  SK: "from-violet-400 to-purple-500",
  MC: "from-pink-400 to-rose-500",
  PP: "from-amber-400 to-orange-500",
};

export default function KanbanBoardShell() {
  const [columns, setColumns] = useState(initialColumns);

  const addCard = (colId: string) => {
    setColumns(cols => cols.map(c =>
      c.id === colId
        ? { ...c, cards: [{ id: Date.now(), title: "New task", priority: "medium", assignee: "AJ", tag: "Dev" }, ...c.cards] }
        : c
    ));
  };

  return (
    <div className="flex flex-col min-h-[460px] bg-neutral-50 rounded-xl border border-neutral-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-neutral-200">
        <div>
          <h2 className="font-semibold text-neutral-900">Q2 Roadmap</h2>
          <p className="text-xs text-neutral-500 mt-0.5">{columns.reduce((sum, c) => sum + c.cards.length, 0)} tasks across {columns.length} columns</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1">
            {["AJ", "SK", "MC", "PP"].map(a => (
              <div key={a} className={`w-7 h-7 rounded-full bg-gradient-to-br ${avatarColors[a]} border-2 border-white flex items-center justify-center text-white text-[9px] font-bold`}>{a}</div>
            ))}
          </div>
          <button className="ml-2 px-3 py-1.5 text-xs font-medium bg-neutral-900 text-white rounded-lg hover:bg-neutral-700 transition-colors">＋ Add task</button>
        </div>
      </div>

      {/* Board */}
      <div className="flex gap-4 p-5 overflow-x-auto flex-1">
        {columns.map(col => (
          <div key={col.id} className="flex flex-col w-64 flex-shrink-0">
            {/* Column header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${col.color}`} />
                <span className="text-sm font-semibold text-neutral-700">{col.label}</span>
                <span className="text-xs text-neutral-400 font-mono">{col.cards.length}</span>
              </div>
              <button onClick={() => addCard(col.id)} className="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200 rounded transition-colors text-sm">＋</button>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-2 flex-1">
              {col.cards.map(card => (
                <div key={card.id} className="bg-white rounded-lg border border-neutral-200 p-3 shadow-sm hover:shadow-md hover:border-neutral-300 transition-all cursor-pointer">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-sm text-neutral-800 font-medium leading-snug">{card.title}</p>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded flex-shrink-0 ${priorityStyles[card.priority]}`}>
                      {card.priority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-neutral-400 bg-neutral-50 border border-neutral-100 px-1.5 py-0.5 rounded">{card.tag}</span>
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${avatarColors[card.assignee]} flex items-center justify-center text-white text-[8px] font-bold`}>
                      {card.assignee}
                    </div>
                  </div>
                </div>
              ))}
              {col.cards.length === 0 && (
                <div className="border-2 border-dashed border-neutral-200 rounded-lg h-20 flex items-center justify-center">
                  <span className="text-xs text-neutral-300">Drop here</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Add column */}
        <button className="flex-shrink-0 w-52 h-12 border-2 border-dashed border-neutral-300 rounded-lg text-sm text-neutral-400 hover:border-neutral-400 hover:text-neutral-500 transition-colors flex items-center justify-center gap-2 self-start">
          ＋ Add column
        </button>
      </div>
    </div>
  );
}