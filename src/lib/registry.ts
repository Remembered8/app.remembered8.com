'use client';

/**
 * Browser-side client for the Laravel registry.
 *
 * The server components fetch through lib/api.ts; this is the half that runs in
 * the page, for the writes a visitor makes: creating a dossier, editing one they
 * own, lighting a candle, leaving a letter.
 *
 * Everything degrades rather than throwing at the app boundary. If the registry
 * cannot be reached the archive still renders from its seed data, and the UI
 * says so instead of implying a dossier reached anyone.
 */

import type { MemorialProfile } from '@/types/memorial';
import { EDIT_TOKENS_STORAGE_KEY } from '@/lib/storage';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://api.remembered8.test';

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

export type ContributionKind = 'candle' | 'memory' | 'flower' | 'tree' | 'prayer';

export interface ContributionInput {
  kind: ContributionKind;
  authorName?: string;
  relation?: string;
  location?: string;
  body?: string;
}

export interface Contribution {
  id: string;
  memorialId: string;
  kind: ContributionKind;
  authorName: string;
  relation: string;
  location: string;
  body: string;
  isApproved: boolean;
  createdAt: string | null;
}

export class RegistryRequestError extends Error {
  constructor(readonly status: number, message: string) {
    super(message);
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}/api${path}`, {
    ...init,
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      ...(init.headers ?? {}),
    },
  });

  const text = await response.text();
  let payload: unknown = null;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    throw new RegistryRequestError(response.status, 'The registry is not available.');
  }

  if (!response.ok) {
    const message =
      payload && typeof payload === 'object' && 'error' in payload
        ? String((payload as { error: unknown }).error)
        : `Registry request failed with ${response.status}.`;
    throw new RegistryRequestError(response.status, message);
  }
  return payload as T;
}

/** True when the API is answering. */
export async function isRegistryAvailable(): Promise<boolean> {
  try {
    const health = await request<{ registryBound?: boolean }>('/health');
    return Boolean(health.registryBound);
  } catch {
    return false;
  }
}

export async function fetchMemorialSummaries(): Promise<MemorialSummary[]> {
  const payload = await request<{ memorials: MemorialSummary[] }>('/memorials');
  return payload.memorials ?? [];
}

export async function fetchMemorial(idOrSlug: string): Promise<MemorialProfile | null> {
  try {
    const payload = await request<{ memorial: { document: MemorialProfile } }>(
      `/memorials/${encodeURIComponent(idOrSlug)}`
    );
    return payload.memorial?.document ?? null;
  } catch (error) {
    if (error instanceof RegistryRequestError && error.status === 404) return null;
    throw error;
  }
}

// --- Edit tokens -------------------------------------------------------------
//
// Minted server-side at creation and shown once. Kept per device: losing it
// means losing the ability to edit that dossier, the honest consequence of
// having no public accounts yet.

function readTokens(): Record<string, string> {
  try {
    const raw = localStorage.getItem(EDIT_TOKENS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

function writeTokens(tokens: Record<string, string>): void {
  try {
    localStorage.setItem(EDIT_TOKENS_STORAGE_KEY, JSON.stringify(tokens));
  } catch {
    // Private mode: the token holds for this session only.
  }
}

export function getEditToken(memorialId: string): string | null {
  return readTokens()[memorialId] ?? null;
}

export function rememberEditToken(memorialId: string, token: string): void {
  writeTokens({ ...readTokens(), [memorialId]: token });
}

/** True when this device may rewrite the dossier. */
export function canEdit(memorialId: string): boolean {
  return Boolean(getEditToken(memorialId));
}

// --- Writes ------------------------------------------------------------------

export async function createMemorial(document: MemorialProfile): Promise<MemorialProfile> {
  const payload = await request<{ memorial: { document: MemorialProfile }; editToken: string }>(
    '/memorials',
    { method: 'POST', body: JSON.stringify({ document }) }
  );
  if (payload.editToken) rememberEditToken(document.id, payload.editToken);
  return payload.memorial.document;
}

export async function saveMemorial(document: MemorialProfile): Promise<MemorialProfile> {
  const token = getEditToken(document.id);
  const payload = await request<{ memorial: { document: MemorialProfile } }>(
    `/memorials/${encodeURIComponent(document.id)}`,
    {
      method: 'PUT',
      headers: token ? { authorization: `Bearer ${token}` } : {},
      body: JSON.stringify({ document }),
    }
  );
  return payload.memorial.document;
}

export async function addContribution(
  memorialId: string,
  input: ContributionInput
): Promise<Contribution> {
  const payload = await request<{ contribution: Contribution }>(
    `/memorials/${encodeURIComponent(memorialId)}/contributions`,
    { method: 'POST', body: JSON.stringify(input) }
  );
  return payload.contribution;
}

export async function fetchContributions(memorialId: string): Promise<Contribution[]> {
  const payload = await request<{ contributions: Contribution[] }>(
    `/memorials/${encodeURIComponent(memorialId)}/contributions`
  );
  return payload.contributions ?? [];
}
