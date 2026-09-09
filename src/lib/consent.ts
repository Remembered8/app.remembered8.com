import { CONSENT_STORAGE_KEY } from './storage';
/**
 * Consent store for GDPR / KVKK.
 *
 * Single source of truth for what the visitor allowed. Nothing in the app may
 * load a third-party tag without asking this module first.
 *
 * Categories:
 *  - necessary : always on, no tags, no cookies beyond app state
 *  - analytics : Google Analytics 4, Microsoft Clarity
 *  - marketing : Meta (Facebook) Pixel, GA4 ad signals
 */

export { CONSENT_STORAGE_KEY } from './storage';

/** Bump when the categories or the tags behind them change: forces a re-ask. */
export const CONSENT_VERSION = 1;

export interface ConsentState {
  analytics: boolean;
  marketing: boolean;
  /** Version of the consent notice the visitor actually agreed to. */
  version: number;
  /** ISO timestamp of the decision, kept as the proof-of-consent record. */
  updatedAt: string;
}

export const DENY_ALL: ConsentState = {
  analytics: false,
  marketing: false,
  version: CONSENT_VERSION,
  updatedAt: '',
};

type Listener = (state: ConsentState) => void;

const listeners = new Set<Listener>();
let current: ConsentState = DENY_ALL;
let decided = false;

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

/**
 * Reads the stored decision. A decision from an older consent version is
 * treated as absent, so the banner comes back when the tag list changes.
 */
export function loadStoredConsent(): ConsentState | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (parsed.version !== CONSENT_VERSION) return null;
    return {
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      version: CONSENT_VERSION,
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : '',
    };
  } catch {
    return null;
  }
}

/** Current consent. Defaults to deny-all until a stored decision is loaded. */
export function getConsent(): ConsentState {
  return current;
}

/** True once the visitor has answered the banner (this version of it). */
export function hasDecided(): boolean {
  return decided;
}

/** Restores a previous decision at boot. Returns it, or null if none. */
export function hydrateConsent(): ConsentState | null {
  const stored = loadStoredConsent();
  if (!stored) return null;
  current = stored;
  decided = true;
  listeners.forEach((fn) => fn(current));
  return stored;
}

/** Records a decision, persists it, and notifies every listener. */
export function setConsent(next: Pick<ConsentState, 'analytics' | 'marketing'>): ConsentState {
  current = {
    analytics: next.analytics,
    marketing: next.marketing,
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
  };
  decided = true;

  if (isBrowser()) {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(current));
    } catch {
      // Private mode or a full quota: the decision still holds for this session.
    }
  }

  listeners.forEach((fn) => fn(current));
  return current;
}

/** Clears the decision so the banner is shown again (used by "change choices"). */
export function resetConsent(): void {
  current = DENY_ALL;
  decided = false;
  if (isBrowser()) {
    try {
      localStorage.removeItem(CONSENT_STORAGE_KEY);
    } catch {
      // ignore
    }
  }
  listeners.forEach((fn) => fn(current));
}

/** Subscribes to consent changes. Returns an unsubscribe function. */
export function onConsentChange(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
