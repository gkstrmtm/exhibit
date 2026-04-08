const fs = require('fs');
const catalog = JSON.parse(fs.readFileSync('components.json', 'utf8'));
const existing = new Set(catalog.map(c => c.slug));

const toAdd = [
  { slug: 'tab-stale-content-preserve', title: 'Tab Stale Content Preserve', description: 'Interactive tab rail where existing data dims to opacity-50 during refresh instead of being blanked. The active tab shows a RefreshCw spin icon.', category: 'Tabs', tags: ['tabs', 'loading', 'stale', 'skeleton'], style: 'functional' },
  { slug: 'tab-panel-skeleton-replacement', title: 'Tab Panel Skeleton Replacement', description: 'On tab switch, the panel shows structural skeleton bars matching real row anatomy for 750ms before settling. min-h prevents panel collapse.', category: 'Tabs', tags: ['tabs', 'skeleton', 'loading', 'transition'], style: 'functional' },
  { slug: 'tab-blocking-vs-nonblocking-comparison', title: 'Tab Blocking vs Non-Blocking Comparison', description: 'Side-by-side: wrong panel replaces content with a spinner (height collapses), right panel uses structure-preserving skeletons. Both interactive.', category: 'Tabs', tags: ['tabs', 'skeleton', 'spinner', 'comparison', 'anti-pattern'], style: 'functional' },
  { slug: 'segmented-mode-switcher', title: 'Segmented Mode Switcher', description: 'Generic SegmentedControl component with optional Lucide icons. Three examples: view mode, ownership group, and status filter.', category: 'Inputs', tags: ['segmented', 'toggle', 'mode', 'switch', 'control'], style: 'functional' },
  { slug: 'filter-ownership-visible', title: 'Filter Ownership Visible', description: 'Filter chips always visible in the toolbar. Removable chips with X button. Add-filter from available pool. Clear-all at more than one active filter.', category: 'Inputs', tags: ['filter', 'chips', 'toolbar', 'visible', 'remove'], style: 'functional' },
  { slug: 'dropdown-vs-segmented-anti-pattern', title: 'Dropdown vs Segmented Anti-Pattern', description: 'Wrong: dropdown for 3-option mode switch hides current mode. Right: segmented control shows active mode always. Both interactive side-by-side.', category: 'Inputs', tags: ['dropdown', 'segmented', 'anti-pattern', 'mode-switch', 'comparison'], style: 'functional' },
  { slug: 'loading-timing-ladder', title: 'Loading Timing Ladder', description: 'Four independently triggerable loading scenarios: instant swap, light-delay skeleton, sustained skeleton, and failed load with retry.', category: 'Feedback', tags: ['loading', 'skeleton', 'timing', 'latency', 'error'], style: 'functional' },
  { slug: 'stale-content-refresh-indicator', title: 'Stale Content Refresh Indicator', description: 'Data panel with a live age counter. After 20s, a stale amber chip appears. Data stays visible and only dims during active refresh.', category: 'Feedback', tags: ['stale', 'refresh', 'indicator', 'timestamp', 'data'], style: 'functional' },
  { slug: 'skeleton-threshold-surface', title: 'Skeleton Threshold Surface', description: 'Correct skeleton depth for three surface types: table rows, inspector fields, and message thread. Reset button reloads all simultaneously.', category: 'Feedback', tags: ['skeleton', 'loading', 'table', 'inspector', 'thread'], style: 'functional' },
  { slug: 'optimistic-row-update', title: 'Optimistic Row Update', description: 'Table where clicking a status badge advances it instantly (optimistic). A saving spinner confirms async write. An undo chip appears for 3s after save.', category: 'Tables', tags: ['optimistic', 'update', 'row', 'undo', 'async'], style: 'functional' },
  { slug: 'optimistic-save-button', title: 'Optimistic Save Button', description: 'Form save button: idle, saving (spinner), saved (green check 2s), failed (red retry). Toggle to simulate failure path. Button width never shifts.', category: 'Inputs', tags: ['save', 'button', 'async', 'states', 'optimistic'], style: 'functional' },
  { slug: 'mutation-timeline-branch', title: 'Mutation Timeline Branch', description: 'Success and failure branches of an async mutation as a horizontal node-chain. Success: optimistic to confirmed. Failure: rollback to error state.', category: 'Feedback', tags: ['mutation', 'timeline', 'optimistic', 'rollback', 'branch'], style: 'functional' },
  { slug: 'right-rail-stable-refresh', title: 'Right Rail Stable Refresh', description: 'Split-view with selectable list rows and a detail rail. List refresh dims both panels briefly but selection is preserved by ID -- right rail never collapses.', category: 'Layout', tags: ['split-view', 'right-rail', 'refresh', 'stable', 'list'], style: 'functional' },
  { slug: 'list-to-detail-stable-viewport', title: 'List to Detail Stable Viewport', description: 'Two-step navigation: list to detail via row click. 350ms loading phase. Back button restores list without scroll-to-top or data reload.', category: 'Layout', tags: ['navigation', 'list', 'detail', 'viewport', 'stable'], style: 'functional' },
  { slug: 'duplicate-scope-controls', title: 'Duplicate Scope Controls', description: 'Anti-pattern: scope selector in both page header and filter bar conflict silently. Right: a single authoritative segmented scope control in the toolbar.', category: 'Inputs', tags: ['anti-pattern', 'scope', 'duplicate', 'filter', 'controls'], style: 'functional' },
  { slug: 'redundant-filter-language', title: 'Redundant Filter Language', description: 'Anti-pattern: chip labels repeat the dimension verbosely. Right: dimension appears once as a prefix, values grouped inside it for faster scanning.', category: 'Inputs', tags: ['anti-pattern', 'filter', 'chips', 'language', 'scanning'], style: 'functional' },
  { slug: 'conflicting-sort-controls', title: 'Conflicting Sort Controls', description: 'Anti-pattern: column header arrows and a sort dropdown both active with no clear winner. Right: single sort from column headers with visible direction indicator.', category: 'Inputs', tags: ['anti-pattern', 'sort', 'conflict', 'table', 'controls'], style: 'functional' },
  { slug: 'editable-data-row', title: 'Editable Data Row', description: 'Table with hover-to-reveal pencil icon. Clicking enters row-edit mode: inputs replace text in-place. Enter saves, Escape cancels.', category: 'Tables', tags: ['inline-edit', 'row', 'table', 'input', 'keyboard'], style: 'functional' },
  { slug: 'editable-detail-section', title: 'Editable Detail Section', description: 'Inspector panel with per-section Edit buttons. Clicking replaces field values with inputs. Save and Cancel per section. One section editable at a time.', category: 'Layout', tags: ['inline-edit', 'inspector', 'section', 'detail', 'form'], style: 'functional' },
  { slug: 'inline-title-edit', title: 'Inline Title Edit', description: 'Click-to-edit heading: clicking a title switches it to a borderless underline input in-place. Enter or blur saves, Escape cancels. Pencil icon on hover.', category: 'Layout', tags: ['inline-edit', 'title', 'rename', 'heading', 'click-to-edit'], style: 'functional' },
  { slug: 'destructive-confirm-with-async', title: 'Destructive Confirm with Async', description: 'Two-step delete with inline confirmation bar (no modal). Async spinner on confirm. Escape cancels. Row disappears only after server confirms.', category: 'Feedback', tags: ['destructive', 'confirm', 'delete', 'async', 'inline'], style: 'functional' },
  { slug: 'typed-confirmation', title: 'Typed Confirmation', description: 'Delete gate: user must type the resource name exactly to enable the confirm button. Characters turn green as they match. Enter confirms when unlocked.', category: 'Feedback', tags: ['confirmation', 'typed', 'delete', 'safeguard', 'keyboard'], style: 'functional' },
  { slug: 'post-confirm-failure-recovery', title: 'Post-Confirm Failure Recovery', description: 'Full arc of failed destructive action: confirm, async, server failure, item restored, and inline error banner with Retry and dismiss. Nothing lost silently.', category: 'Feedback', tags: ['error', 'recovery', 'delete', 'failure', 'retry'], style: 'functional' },
];

let added = 0;
for (const item of toAdd) {
  if (existing.has(item.slug)) { console.log('skip:', item.slug); continue; }
  const codePath = 'components/' + item.slug + '.tsx';
  let code = '';
  try { code = fs.readFileSync(codePath, 'utf8'); } catch(e) { console.warn('no file for', item.slug); continue; }
  catalog.push({
    ...item,
    sourceUrl: 'https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/' + item.slug + '.tsx',
    code,
  });
  added++;
}

fs.writeFileSync('components.json', JSON.stringify(catalog, null, 2));
console.log('Added', added, 'components. Total:', catalog.length);
