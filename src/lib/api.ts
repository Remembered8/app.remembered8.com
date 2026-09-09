/**
 * Server-side client for the Laravel registry.
 *
 * These run on the Next.js server, not in the browser, which is the whole point
 * of the split: a memorial page is rendered with the person's name and portrait
 * already in the HTML, so a link shared on WhatsApp previews correctly and a
 * crawler can read it. The old SPA could not do either.
 */

import type { MemorialProfile } from '@/types/memorial';

export interface MemorialSummary {
  id: string;
  slug: string;
  fullName: string;
  profession: string;
  birthPlace: string;
  category: string;
  privacy: string;
  isVerifiedHistoric: boolean;
  candleCount: number;
  updatedAt: string | null;
}

// Read at request time, not inlined at build time.
//
// NEXT_PUBLIC_* is baked into the bundle by the compiler, so a build made
// against one registry keeps calling it wherever it is later deployed. These
// functions only ever run on the server, so a plain server variable is both
// correct and portable; the public one stays as a fallback for local setups
// that only define that.
const API_URL =
  process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://api.remembered8.test';

/** How long a dossier may be served from cache before being refetched. */
const REVALIDATE_SECONDS = 60;

async function get<T>(path: string, revalidate = REVALIDATE_SECONDS): Promise<T | null> {
  try {
    const response = await fetch(`${API_URL}/api${path}`, {
      headers: { accept: 'application/json' },
      next: { revalidate },
    });

    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    // The registry being down must not take the whole site with it; callers
    // decide what to render instead.
    return null;
  }
}

/** Every public dossier. Empty when the registry cannot be reached. */
export async function fetchMemorials(): Promise<MemorialSummary[]> {
  const payload = await get<{ memorials: MemorialSummary[] }>('/memorials');
  return payload?.memorials ?? [];
}

/** One dossier in full, or null when it does not exist. */
export async function fetchMemorial(idOrSlug: string): Promise<MemorialProfile | null> {
  const payload = await get<{ document: MemorialProfile } | { memorial: { document: MemorialProfile } }>(
    `/memorials/${encodeURIComponent(idOrSlug)}`
  );
  if (!payload) return null;
  return 'memorial' in payload ? payload.memorial.document : payload.document;
}

export interface Contribution {
  id: string;
  memorialId: string;
  kind: 'candle' | 'memory' | 'flower' | 'tree' | 'prayer';
  authorName: string;
  relation: string;
  location: string;
  body: string;
  isApproved: boolean;
  createdAt: string | null;
}

/** Published tributes for a dossier. Not cached: these change as people leave them. */
export async function fetchContributions(idOrSlug: string): Promise<Contribution[]> {
  const payload = await get<{ contributions: Contribution[] }>(
    `/memorials/${encodeURIComponent(idOrSlug)}/contributions`,
    0
  );
  return payload?.contributions ?? [];
}

/** The public URL for a dossier, the value engraved into QR plaques. */
export function memorialUrl(idOrSlug: string): string {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://remembered8.com';
  return `${site}/anma/${encodeURIComponent(idOrSlug)}`;
}
