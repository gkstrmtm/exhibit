type ExhibitReturnContext = {
  exhibitSlug: string;
  sourceHref: string;
  sourceLabel: string;
  timestamp: number;
};

type ExhibitScrollRestore = {
  sourceHref: string;
  scrollY: number;
  timestamp: number;
};

type BrowseState = {
  searchQuery: string;
  lens: string;
  pattern: string;
  stage: string;
};

const EXHIBIT_RETURN_CONTEXT_KEY = "exhibit:return-context";
const EXHIBIT_SCROLL_RESTORE_KEY = "exhibit:scroll-restore";
const BROWSE_STATE_PREFIX = "exhibit:browse-state:";

function isBrowser() {
  return typeof window !== "undefined";
}

function safeParseJson<T>(value: string | null): T | null {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function buildBackLabel(sourceHref: string) {
  if (sourceHref === "/" || sourceHref === "/browse") {
    return "Back to library";
  }

  if (sourceHref.startsWith("/category/")) {
    const categoryName = sourceHref.replace("/category/", "").split("?")[0].replace(/-/g, " ");
    return `Back to ${categoryName}`;
  }

  if (sourceHref.startsWith("/profile/")) {
    return "Back to profile";
  }

  return "Back to library";
}

export function rememberExhibitSource(exhibitSlug: string, sourceHref: string, scrollY: number) {
  if (!isBrowser()) {
    return;
  }

  const returnContext: ExhibitReturnContext = {
    exhibitSlug,
    sourceHref,
    sourceLabel: buildBackLabel(sourceHref),
    timestamp: Date.now(),
  };

  const scrollRestore: ExhibitScrollRestore = {
    sourceHref,
    scrollY,
    timestamp: Date.now(),
  };

  window.sessionStorage.setItem(EXHIBIT_RETURN_CONTEXT_KEY, JSON.stringify(returnContext));
  window.sessionStorage.setItem(EXHIBIT_SCROLL_RESTORE_KEY, JSON.stringify(scrollRestore));
}

export function getExhibitBackTarget(exhibitSlug: string) {
  if (!isBrowser()) {
    return { href: "/browse", label: "Back to library", useHistoryBack: false };
  }

  const context = safeParseJson<ExhibitReturnContext>(window.sessionStorage.getItem(EXHIBIT_RETURN_CONTEXT_KEY));
  if (!context || context.exhibitSlug !== exhibitSlug) {
    return { href: "/browse", label: "Back to library", useHistoryBack: false };
  }

  return {
    href: context.sourceHref,
    label: context.sourceLabel,
    useHistoryBack: true,
  };
}

export function readBrowseState(pathname: string): BrowseState | null {
  if (!isBrowser()) {
    return null;
  }

  return safeParseJson<BrowseState>(window.sessionStorage.getItem(`${BROWSE_STATE_PREFIX}${pathname}`));
}

export function writeBrowseState(pathname: string, state: BrowseState) {
  if (!isBrowser()) {
    return;
  }

  window.sessionStorage.setItem(`${BROWSE_STATE_PREFIX}${pathname}`, JSON.stringify(state));
}

export function restoreBrowseScroll(pathname: string) {
  if (!isBrowser()) {
    return false;
  }

  const restore = safeParseJson<ExhibitScrollRestore>(window.sessionStorage.getItem(EXHIBIT_SCROLL_RESTORE_KEY));
  if (!restore || restore.sourceHref !== pathname) {
    return false;
  }

  window.scrollTo({ top: restore.scrollY, behavior: "auto" });
  window.sessionStorage.removeItem(EXHIBIT_SCROLL_RESTORE_KEY);
  return true;
}