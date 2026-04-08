const fs = require('fs');
const catalog = JSON.parse(fs.readFileSync('components.json', 'utf8'));
const existing = new Set(catalog.map(c => c.slug));

const toAdd = [
  // Phase 2a — Tables
  { slug: 'column-visibility-toggle', title: 'Column Visibility Toggle', description: 'Popover checklist to show or hide individual table columns. Dynamic grid-template-columns adjusts instantly. At least one column stays visible at all times.', category: 'Tables', tags: ['column', 'visibility', 'toggle', 'popover', 'table'], style: 'functional' },
  { slug: 'table-row-selection', title: 'Table Row Selection', description: 'Per-row checkboxes with an indeterminate header state when partially selected. A bulk-action bar slides up when rows are selected showing Tag, Archive, and Delete.', category: 'Tables', tags: ['selection', 'checkbox', 'bulk-action', 'table', 'multi-select'], style: 'functional' },
  { slug: 'table-grouping-header', title: 'Table Grouping Header', description: 'Rows organized into labeled groups with collapsible chevron headers. Each group shows a row count badge. Groups collapse and expand independently.', category: 'Tables', tags: ['grouping', 'collapsible', 'header', 'table', 'sections'], style: 'functional' },
  { slug: 'table-pagination-controls', title: 'Table Pagination Controls', description: 'Paginated table with prev/next/first/last buttons, a rows-per-page selector, and a jump-to-page input. Derives page count from data length and page size.', category: 'Tables', tags: ['pagination', 'table', 'prev-next', 'rows-per-page', 'jump-to'], style: 'functional' },
  { slug: 'table-empty-search-state', title: 'Table Empty Search State', description: 'Search input filters table rows live. When query returns zero results, a SearchX icon empty state appears with a clear-search link. Footer shows result count.', category: 'Tables', tags: ['empty-state', 'search', 'table', 'no-results', 'filter'], style: 'functional' },
  { slug: 'table-expandable-row', title: 'Table Expandable Row', description: 'Clicking a row toggle expands an inline detail panel beneath it with description, stats grid, and tags. Only one row is expanded at a time.', category: 'Tables', tags: ['expandable', 'row', 'detail', 'table', 'accordion'], style: 'functional' },

  // Phase 2b — Inputs
  { slug: 'combobox-multi-select', title: 'Combobox Multi Select', description: 'Searchable dropdown with multi-value chip selection. Backspace removes the last chip. Enter adds the first match. Escape closes the dropdown.', category: 'Inputs', tags: ['combobox', 'multi-select', 'chips', 'search', 'dropdown'], style: 'functional' },
  { slug: 'tag-input-field', title: 'Tag Input Field', description: 'Free-form tag input field. Enter or comma adds a tag as a colored chip. Backspace removes the last tag. Tags have per-tag colors from a hash function.', category: 'Inputs', tags: ['tag', 'input', 'chips', 'multi-value', 'keyboard'], style: 'functional' },
  { slug: 'number-stepper', title: 'Number Stepper', description: 'Binary +/- stepper for integer input with clamped min/max. Hold to accelerate: 400ms delay then 80ms interval. A range indicator bar reflects position in range.', category: 'Inputs', tags: ['number', 'stepper', 'increment', 'decrement', 'hold-to-repeat'], style: 'functional' },
  { slug: 'character-count-textarea', title: 'Character Count Textarea', description: 'Textarea with live character count. Color shifts amber at 80% capacity and red at 100%. A progress bar visually fills as text is typed. Input is blocked at the limit.', category: 'Inputs', tags: ['textarea', 'character-count', 'limit', 'progress', 'warning'], style: 'functional' },
  { slug: 'toggle-switch-with-label', title: 'Toggle Switch with Label', description: 'Settings list with labeled toggle switches. Each row has a title, description, and optional badge (Optional/Pro). Uses aria-checked. Neutral-800 track when active.', category: 'Inputs', tags: ['toggle', 'switch', 'settings', 'label', 'aria'], style: 'functional' },

  // Phase 2c — Data Display
  { slug: 'metric-card-with-trend', title: 'Metric Card with Trend', description: 'A 2×2 grid of KPI cards each with a mini SVG sparkline polyline, value, label, and TrendingUp/Down delta. Refresh button swaps between two dataset snapshots.', category: 'Data Display', tags: ['metric', 'card', 'sparkline', 'trend', 'kpi'], style: 'functional' },
  { slug: 'progress-bar-labeled', title: 'Progress Bar Labeled', description: 'Horizontal progress bars with labels, formatted values, and gradient color thresholds. A formatValue utility handles KB/MB/GB and currency display.', category: 'Data Display', tags: ['progress', 'bar', 'label', 'threshold', 'gradient'], style: 'functional' },
  { slug: 'timeline-entry-list', title: 'Timeline Entry List', description: 'Vertical timeline with type-colored connectors. Past events use solid lines and filled dots. Pending events use dashed lines and empty rings. GitCommit, CheckCircle, and MessageSquare icons per type.', category: 'Data Display', tags: ['timeline', 'events', 'list', 'dashed', 'pending'], style: 'functional' },
  { slug: 'kv-table', title: 'KV Table', description: 'Key-value metadata table supporting string, badge, link, and copy value types. The copy type has a CopyButton with a 1.5s "Copied" confirmation state.', category: 'Data Display', tags: ['key-value', 'table', 'metadata', 'copy', 'badge'], style: 'functional' },
  { slug: 'status-badge-set', title: 'Status Badge Set', description: 'Reference panel of all status badge variants across four groups: task status, severity, system state, and presence. Three badge shapes: pill, rectangular, and dot.', category: 'Data Display', tags: ['status', 'badge', 'pill', 'rect', 'dot', 'reference'], style: 'functional' },
  { slug: 'comparison-table', title: 'Comparison Table', description: 'Feature comparison table with plans as columns and feature rows. Cells show checkmarks, crosses, or text values. The Pro plan column is highlighted as recommended. Rows are grouped by category.', category: 'Data Display', tags: ['comparison', 'table', 'features', 'pricing', 'checkmark', 'plans'], style: 'functional' },

  // Phase 2d — Layout
  { slug: 'sidebar-nav-collapsible', title: 'Sidebar Nav Collapsible', description: 'Sidebar navigation that collapses to icon-only mode via a chevron toggle. Labels and badges disappear; icons remain. A tooltip attribute provides the label on collapsed buttons.', category: 'Layout', tags: ['sidebar', 'navigation', 'collapse', 'icon-only', 'tooltip'], style: 'functional' },
  { slug: 'sticky-section-header', title: 'Sticky Section Header', description: 'Scrollable list with sticky alphabetical section headers. Each header shows the letter and item count. As the user scrolls, the current section header stays pinned at the container top.', category: 'Layout', tags: ['sticky', 'header', 'scroll', 'list', 'grouping', 'alphabetical'], style: 'functional' },
  { slug: 'drawer-overlay', title: 'Drawer Overlay', description: 'Right-side filter drawer that slides over content without pushing the layout. A semi-transparent backdrop sits beneath the drawer. Clicking the backdrop or close button dismisses it.', category: 'Layout', tags: ['drawer', 'overlay', 'panel', 'slide', 'backdrop', 'filters'], style: 'functional' },
  { slug: 'modal-with-scroll', title: 'Modal with Scroll', description: 'Modal dialog with a fixed header and footer while only the body scrolls. Prevents action buttons from disappearing on long content. Backdrop click or Done button closes the modal.', category: 'Layout', tags: ['modal', 'dialog', 'scroll', 'fixed-header', 'fixed-footer'], style: 'functional' },
  { slug: 'split-pane-resize', title: 'Split Pane Resize', description: 'Two-column split pane with a draggable GripVertical divider. Pointer events track drag distance. Min and max widths prevent either pane from collapsing. No third-party resize library.', category: 'Layout', tags: ['split-pane', 'resize', 'drag', 'divider', 'layout'], style: 'functional' },

  // Phase 2e — Navigation
  { slug: 'breadcrumb-with-overflow', title: 'Breadcrumb with Overflow', description: 'Breadcrumb that collapses middle segments into a MoreHorizontal ellipsis button when the path exceeds four segments. Clicking the ellipsis expands all segments. The last segment is the current page.', category: 'Navigation', tags: ['breadcrumb', 'overflow', 'ellipsis', 'collapse', 'path'], style: 'functional' },
  { slug: 'tab-nav-with-badge', title: 'Tab Nav with Badge', description: 'Horizontal tab navigation where individual tabs carry numeric count badges or dot indicators. Active tab badge inverts to dark background. Selecting a tab updates rendered content.', category: 'Navigation', tags: ['tabs', 'badge', 'notification', 'count', 'navigation'], style: 'functional' },
  { slug: 'back-forward-nav-buttons', title: 'Back Forward Nav Buttons', description: 'Browser-style back and forward navigation controlled by an in-memory history stack. Back is disabled at the beginning and forward at the end. Clicking a page link pushes and truncates forward history.', category: 'Navigation', tags: ['back', 'forward', 'history', 'stack', 'navigation'], style: 'functional' },
  { slug: 'contextual-action-menu', title: 'Contextual Action Menu', description: 'Per-row 3-dot overflow menu showing contextual actions including Edit, Duplicate, Share, Archive, and Delete. mousedown outside closes the menu. Danger actions red-tinted.', category: 'Navigation', tags: ['context-menu', 'popover', '3-dot', 'actions', 'overflow'], style: 'functional' },
  { slug: 'command-palette-trigger', title: 'Command Palette Trigger', description: 'Cmd+K triggered command palette with live fuzzy filtering. A toolbar trigger bar shows the keyboard shortcut hint. Results are grouped by category. Escape closes.', category: 'Navigation', tags: ['command-palette', 'search', 'keyboard', 'CmdK', 'overlay'], style: 'functional' },

  // Phase 2f — Dashboard
  { slug: 'dashboard-stat-grid', title: 'Dashboard Stat Grid', description: '4-up KPI stat card grid. Each card shows a metric icon, current value, label, delta percentage with TrendingUp/Down icon, and period label. Positive deltas green, negative red.', category: 'Dashboard', tags: ['stats', 'kpi', 'metrics', 'grid', 'delta', 'cards'], style: 'functional' },
  { slug: 'notification-center-panel', title: 'Notification Center Panel', description: 'Bell icon trigger with unread count badge. Dropdown panel lists notifications with type icons, messages, and timestamps. Mark-all-read clears the badge. Individual notifications can be dismissed.', category: 'Dashboard', tags: ['notifications', 'bell', 'dropdown', 'unread', 'badge'], style: 'functional' },
  { slug: 'quick-action-bar', title: 'Quick Action Bar', description: 'Horizontal bar of primary action shortcuts with icons, labels, and keyboard shortcut hints. Active state toggled on click. Primary action (Publish) uses dark filled style.', category: 'Dashboard', tags: ['quick-actions', 'shortcuts', 'toolbar', 'buttons'], style: 'functional' },
  { slug: 'recent-items-feed', title: 'Recent Items Feed', description: 'Recently accessed items list with color-coded type icons (doc, project, report, snippet, guide), item name, relative timestamp, and type badge. Hover highlight on each row.', category: 'Dashboard', tags: ['recent', 'history', 'feed', 'items', 'timestamps'], style: 'functional' },
  { slug: 'activity-sparkline-row', title: 'Activity Sparkline Row', description: 'Data list where each row contains an inline 60×24 SVG sparkline at the right edge. Green sparklines for growing metrics, red for metrics where lower is better (error rate, latency).', category: 'Dashboard', tags: ['sparkline', 'activity', 'chart', 'inline', 'row'], style: 'functional' },

  // Phase 2g — Data Density
  { slug: 'dense-list-view', title: 'Dense List View', description: 'Ultra-compact list view with 28px row height. Each row shows a status dot, service name, region, and uptime percentage. Hover reveals a subtle row highlight. Designed for maximum information density.', category: 'Data Density', tags: ['dense', 'list', 'compact', 'rows', 'hover'], style: 'functional' },
  { slug: 'compact-card-grid', title: 'Compact Card Grid', description: '3-column minimal card grid at ~68px card height. Each card shows an icon, label, and status value. Inactive integrations are dashed-border and dimmed. No decorative padding.', category: 'Data Density', tags: ['compact', 'cards', 'grid', 'minimal', 'integrations'], style: 'functional' },
  { slug: 'data-grid-pinned-column', title: 'Data Grid Pinned Column', description: 'Data table with the first column sticky/pinned while all other columns scroll horizontally. A box-shadow on the pinned column edge signals more content to the right.', category: 'Data Density', tags: ['table', 'pinned', 'sticky', 'column', 'scroll', 'freeze'], style: 'functional' },
  { slug: 'condensed-stat-row', title: 'Condensed Stat Row', description: 'Single dark horizontal strip of 6 key metrics. Each metric shows a small uppercase label above and a bold value below. No charts or deltas. Maximum information density in minimum vertical space.', category: 'Data Density', tags: ['stats', 'row', 'compact', 'metrics', 'single-line'], style: 'functional' },
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
