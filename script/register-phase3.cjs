const fs = require('fs');
const catalog = JSON.parse(fs.readFileSync('components.json', 'utf8'));
const existing = new Set(catalog.map(c => c.slug));

const toAdd = [
  // Phase 3a — Inputs
  { slug: 'form-field-validation', title: 'Form Field Validation', description: 'Four input fields (name, email, password, URL) that validate on blur. Each field shows a CheckCircle2 icon on valid and an AlertCircle icon with an error message on invalid. Submit forces full validation display.', category: 'Inputs', tags: ['form', 'validation', 'blur', 'error-message', 'inline-feedback'], style: 'functional' },
  { slug: 'multi-step-form', title: 'Multi-Step Form', description: '4-step wizard form: Account (email + password), Profile (name + role select), Plan (radio cards: Free/Pro/Team), Review (summary key-value + Submit). Step indicator bar fills as user advances.', category: 'Inputs', tags: ['wizard', 'stepper', 'multi-step', 'form', 'steps'], style: 'functional' },
  { slug: 'address-form', title: 'Address Form', description: 'Address form that adapts field labels to the selected country. US shows State/ZIP, UK shows County/Postcode, CA shows Province/Postal Code, and DE shows Bundesland/PLZ. Driven by a COUNTRIES config array.', category: 'Inputs', tags: ['address', 'form', 'adaptive', 'country', 'locale'], style: 'functional' },
  { slug: 'password-strength-meter', title: 'Password Strength Meter', description: 'Password input with a 4-segment strength bar and a per-criterion checklist: length ≥ 8, uppercase letter, digit, special character. Strength label changes from Too weak to Strong. Show/hide toggle via Eye/EyeOff.', category: 'Inputs', tags: ['password', 'strength', 'meter', 'criteria', 'checklist'], style: 'functional' },
  { slug: 'search-with-suggestions', title: 'Search with Suggestions', description: 'Search input with a categorized suggestion dropdown showing pages, people, and recent items. Arrow keys navigate the list, Enter selects, Escape closes. Results filter as user types.', category: 'Inputs', tags: ['search', 'suggestions', 'typeahead', 'dropdown', 'keyboard-nav'], style: 'functional' },
  { slug: 'date-range-picker', title: 'Date Range Picker', description: 'Date range picker with preset shortcuts (Last 7 days, Last 30 days, This month, Last month, Quarter, Year) and manual from/to date inputs. Reversed date pairs auto-correct on blur.', category: 'Inputs', tags: ['date', 'range', 'picker', 'presets', 'calendar'], style: 'functional' },

  // Phase 3b — Auth/Onboarding
  { slug: 'otp-input', title: 'OTP Input', description: 'Six single-digit inputs wired as one entity. Paste fills all boxes at once. Digit entry auto-advances focus. Backspace retreats focus. A 30-second resend countdown resets on request. Correct code 123456 shows a success state.', category: 'Authentication', tags: ['otp', '2fa', 'code', 'input', 'paste', 'timer'], style: 'functional' },
  { slug: 'onboarding-checklist', title: 'Onboarding Checklist', description: '5-task onboarding checklist with Circle/CheckCircle2 toggles and an emerald progress bar. Completing the first task is pre-done. Reaching 100% shows a celebration banner with a confetti-style message.', category: 'Onboarding', tags: ['checklist', 'tasks', 'onboarding', 'progress', 'celebrate'], style: 'functional' },
  { slug: 'social-login-buttons', title: 'Social Login Buttons', description: 'OAuth login buttons for Google, GitHub, and Microsoft with hand-crafted inline SVG logos. Clicking any provider shows a Loader2 spinner for 2 seconds, then a success state. An email/magic-link section sits below.', category: 'Authentication', tags: ['oauth', 'social-login', 'google', 'github', 'microsoft', 'magic-link'], style: 'functional' },
  { slug: 'role-select-onboarding', title: 'Role Select Onboarding', description: 'Persona card selection screen for new users. Five role cards (Designer, Engineer, Marketing, Analyst, Executive) with icons and descriptions. Selecting a role shows a role-specific welcome message and a "Continue" button.', category: 'Onboarding', tags: ['role', 'persona', 'onboarding', 'card-select', 'welcome'], style: 'functional' },
  { slug: 'product-tour-tooltip', title: 'Product Tour Tooltip', description: 'Step-by-step product tour with coachmark tooltips. Each step highlights a target element with a ring and shows a dark tooltip with step description, Back/Next/Done, and dot progress indicators.', category: 'Onboarding', tags: ['tour', 'tooltip', 'coachmark', 'onboarding', 'steps'], style: 'functional' },
  { slug: 'invite-team-members', title: 'Invite Team Members', description: 'Email chip input (Enter or comma adds a chip, Backspace removes the last) with role selection tabs (Member/Admin/Viewer). Sending shows a Loader2 spinner then a success confirmation. Invalid emails get a red-bordered chip.', category: 'Onboarding', tags: ['invite', 'email', 'chips', 'team', 'role', 'send'], style: 'functional' },

  // Phase 3c — Billing/Commerce
  { slug: 'plan-upgrade-prompt', title: 'Plan Upgrade Prompt', description: 'Violet gradient upgrade gate card with a Lock icon header, feature benefits list with Check icons, a primary upgrade CTA, and a "Later" dismiss link. On upgrade, transitions to a Sparkles success state.', category: 'Billing', tags: ['upgrade', 'gate', 'pricing', 'billing', 'upsell'], style: 'functional' },
  { slug: 'invoice-line-items', title: 'Invoice Line Items', description: 'Invoice breakdown with quantity, unit price, and calculated amounts per line item. Subtotal, tax (8%), and total are derived live. A "Pay now" CTA shows a 0.8s processing spinner then a paid confirmation.', category: 'Billing', tags: ['invoice', 'line-items', 'billing', 'total', 'tax', 'payment'], style: 'functional' },
  { slug: 'coupon-code-input', title: 'Coupon Code Input', description: 'Promo code entry with 800ms async validation. Valid codes SAVE20, LAUNCH10, and FRIEND50 show a green applied badge with the discount. Invalid codes show an error. The order total updates to reflect the discount.', category: 'Commerce', tags: ['coupon', 'promo', 'code', 'discount', 'validation', 'commerce'], style: 'functional' },
  { slug: 'usage-meter-bar', title: 'Usage Meter Bar', description: 'Quota usage meters for API calls, storage, seats, and exports. Each bar transitions from emerald to amber at 75% and to red at 90%. Current/limit labels sit on either end of the bar.', category: 'Billing', tags: ['usage', 'quota', 'meter', 'progress', 'limits', 'billing'], style: 'functional' },
  { slug: 'quantity-selector', title: 'Quantity Selector', description: 'Product quantity selector clamped between 1 and available stock. Shows live total price. "Add to Cart" button shows a 2-second success state with a check icon before resetting.', category: 'Commerce', tags: ['quantity', 'cart', 'product', 'commerce', 'stepper'], style: 'functional' },

  // Phase 3d — Empty / Error / Feedback
  { slug: 'empty-state-search-no-results', title: 'Empty State: Search No Results', description: 'Empty state panel shown when a search query returns no matches. References the query in the message, provides a list of search suggestions, and a clear-search button. A live search bar lets users interact.', category: 'Empty States', tags: ['empty-state', 'search', 'no-results', 'suggestions', 'query'], style: 'functional' },
  { slug: 'error-boundary-fallback', title: 'Error Boundary Fallback', description: 'Crash fallback UI with an AlertTriangle icon, error title, and collapsible stack trace toggled by a chevron. A "Try again" button simulates 1.2s recovery then restores the normal view.', category: 'Feedback', tags: ['error', 'fallback', 'crash', 'stack-trace', 'retry'], style: 'functional' },
  { slug: 'not-found-state', title: 'Not Found State', description: '404 empty state with an outlined "404" number rendered via WebkitTextStroke, a friendly message, and two action buttons: Go Home and Go Back. Designed as a page-level empty state.', category: 'Empty States', tags: ['404', 'not-found', 'empty-state', 'outlined-text', 'page'], style: 'functional' },
  { slug: 'offline-banner', title: 'Offline Banner', description: 'Connection status banner with three states: online (hidden), offline (red WifiOff banner), and reconnecting (amber Loader2 spinner). A "Reconnect" button simulates recovery and transitions to a green "Back online" confirmation that auto-dismisses.', category: 'Feedback', tags: ['offline', 'connection', 'banner', 'reconnect', 'status'], style: 'functional' },
  { slug: 'permission-denied-state', title: 'Permission Denied State', description: 'Access-denied empty state showing a Shield icon and a role comparison table (Your role: Member vs. Required: Admin). Includes a "Request access" CTA and a "Go back" link.', category: 'Empty States', tags: ['permission', 'denied', 'access', 'role', 'empty-state'], style: 'functional' },
  { slug: 'toast-notification-stack', title: 'Toast Notification Stack', description: 'Toast notification stack supporting success, error, info, and warning types. Each toast has a RAF-based progress bar that depletes over 4 seconds. Toasts stack in the bottom-right and can be manually dismissed.', category: 'Feedback', tags: ['toast', 'notification', 'stack', 'progress', 'dismiss', 'types'], style: 'functional' },
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
