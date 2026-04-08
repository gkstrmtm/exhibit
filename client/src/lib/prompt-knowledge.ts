export const FOUNDATION_PROMPT_LINES = [
  "- Typography system: body copy uses Inter, headings use Space Grotesk, and monospace is reserved for code, IDs, timestamps, and dense tabular data.",
  "- Spacing system: use a 4px grid, card padding should usually land at 16px, 24px, or 32px, and page padding should never collapse against viewport edges.",
  "- Color system: neutral surfaces first, accent color only for interaction or semantic states, and never let color be the only differentiator.",
  "- Layout system: preserve clear max-widths, disciplined sidebar widths, consistent border radius per component, and restrained elevation by default.",
  "- Component rules: buttons need explicit hierarchy, labels must stay visible on inputs, destructive actions need true danger treatment, and major data views need clear density control.",
  "- Quality bar: avoid decorative card spam, gratuitous gradients, raw browser-default form styling, oversized icon-first actions, and generic dashboard filler.",
];

export const TARGETING_PROMPT_LINES = [
  "- Hunt for hierarchy failures first: unclear page intent, weak heading structure, CTA priority drift, and labels/values with the same visual weight.",
  "- Hunt for component logic failures: repeated cards with no structural purpose, stacked containers doing the same job, and actions that are visually loud but semantically weak.",
  "- Hunt for state failures: hover, focus, loading, empty, disabled, error, success, destructive, and mobile states should all be considered even when not visible.",
  "- Hunt for density failures: spacing that is either cramped or wasteful, tables and forms with the wrong row height, and interaction density that does not match the task.",
  "- Hunt for accessibility and semantic failures: missing labels, weak landmarks, placeholder-as-label, poor contrast, keyboard gaps, and unreadable status treatment.",
  "- Hunt for fragility: heavy inline styling, too many explicit colors, brittle layout assumptions, and interfaces that likely break when real content or responsive states appear.",
];

export const FOUNDATION_PILLARS = [
  {
    title: "Hierarchy",
    detail: "Prioritize the real task, not decorative chrome or recycled dashboard framing.",
  },
  {
    title: "Spacing",
    detail: "Work on a 4px rhythm with disciplined padding, grouping, and readable density.",
  },
  {
    title: "Color",
    detail: "Use neutral structure first and spend accent color only on semantic or interactive moments.",
  },
  {
    title: "Components",
    detail: "Buttons, inputs, cards, tables, and shells should have clear jobs and clear states.",
  },
  {
    title: "States",
    detail: "Hidden states matter: loading, empty, error, focus, disabled, mobile, and destructive flows.",
  },
  {
    title: "Restraint",
    detail: "Default toward calm product UI, not icon noise, card spam, or novelty for its own sake.",
  },
];

export const HOUSE_CRITIQUE_STORAGE_KEY = "exhibit.house-critique-profile";

export const DEFAULT_HOUSE_CRITIQUE_LINES = [
  "Treat redesign work as a structural reset, not a surface-level refinement pass.",
  "Do not preserve recycled dashboard/card grammar unless it clearly improves the product logic.",
  "Stay alert to font direction, typography tone, and whether the chosen type actually matches the product's seriousness.",
  "Translate icon references into restrained 14px neutral line cues instead of oversized icon-first buttons or decorative icon clusters.",
  "Preserve only the parts of the existing shell that still earn their keep; weak shell patterns should be replaced, not protected.",
];

export const DEFAULT_HOUSE_CRITIQUE = DEFAULT_HOUSE_CRITIQUE_LINES.map((line) => `- ${line}`).join("\n");

function normalizeLines(lines: string[]) {
  return lines
    .map((line) => line.trim())
    .filter(Boolean);
}

export function buildHouseCritiqueLines(profile: string) {
  const normalized = normalizeLines(
    (profile.trim() || DEFAULT_HOUSE_CRITIQUE)
      .split(/\r?\n/)
      .map((line) => line.replace(/^[-*\d.\s]+/, "").trim())
  );

  return normalized.map((line) => `- ${line}`);
}

export function parseNamedRegionLines(section: string) {
  return normalizeLines(
    section
      .split(/\r?\n/)
      .map((line) => line.replace(/^[-*\d.\s]+/, "").trim())
  );
}

export function buildLibraryPrompt(title: string, basePrompt: string, houseCritique: string) {
  return [
    `Use this prompt as a high-signal repair brief for the pattern: ${title}.`,
    "",
    "FOUNDATIONAL KNOWLEDGE",
    ...FOUNDATION_PROMPT_LINES,
    "",
    "TARGETING LENSES",
    ...TARGETING_PROMPT_LINES,
    "",
    "HOUSE CRITIQUE PROFILE",
    ...buildHouseCritiqueLines(houseCritique),
    "",
    "SPECIAL INSTRUCTION",
    "- Name the exact regions, components, or interaction zones that need to change instead of staying abstract.",
    "- Explain what should be removed, simplified, rebuilt, or demoted.",
    "- Keep the final output concrete enough for direct implementation.",
    "",
    "BASE PROMPT",
    basePrompt,
  ].join("\n");
}