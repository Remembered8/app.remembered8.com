'use client';

/**
 * Deep links to a single memorial.
 *
 * In the single-app version this was a `?id=` query parameter that nothing read,
 * so an engraved QR plaque resolved to the homepage. Here a dossier is a real
 * route, `/anma/<slug>`, which is also what lets the server render its metadata.
 *
 * The old query form is still honoured on arrival: plaques and cards already in
 * the world carry it, and they must keep working.
 */

export const MEMORIAL_QUERY_PARAM = 'id';

/** Path for one memorial. */
export function memorialPath(idOrSlug: string): string {
  return `/anma/${encodeURIComponent(idOrSlug)}`;
}

/** Absolute URL for one memorial: the value engraved into QR plaques. */
export function memorialUrl(idOrSlug: string, origin?: string): string {
  const base =
    origin ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    (typeof window !== 'undefined' ? window.location.origin : 'https://remembered8.com');
  return `${base}${memorialPath(idOrSlug)}`;
}

/**
 * The memorial named by the current URL, from either form.
 *
 * Reads the route first, then falls back to the legacy `?id=` so links printed
 * on plaques before the split still land on the right person.
 */
export function readMemorialIdFromUrl(
  search: string = typeof window !== 'undefined' ? window.location.search : '',
  pathname: string = typeof window !== 'undefined' ? window.location.pathname : ''
): string | null {
  const fromPath = /^\/anma\/([^/?#]+)/.exec(pathname);
  if (fromPath) return decodeURIComponent(fromPath[1]);

  try {
    const id = new URLSearchParams(search).get(MEMORIAL_QUERY_PARAM);
    return id && id.trim() ? id.trim() : null;
  } catch {
    return null;
  }
}

/**
 * Reflects the current view in the address bar without a navigation.
 *
 * The archive switches dossiers inside one client tree, so this keeps the URL
 * shareable and the back button meaningful without refetching the page.
 */
export function syncUrlToMemorial(
  idOrSlug: string | null,
  options: { replace?: boolean } = {}
): void {
  if (typeof window === 'undefined') return;

  const next = idOrSlug ? memorialPath(idOrSlug) : '/';
  if (window.location.pathname === next && !window.location.search) return;

  if (options.replace) {
    window.history.replaceState({}, '', next);
  } else {
    window.history.pushState({}, '', next);
  }
}
