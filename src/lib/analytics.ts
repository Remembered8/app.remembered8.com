/**
 * Third-party measurement tags, gated behind the consent store.
 *
 * Design rules:
 *  - No tag script is fetched before the visitor grants its category. Google
 *    Consent Mode v2 would allow loading gtag.js with denied defaults, but the
 *    stricter reading of GDPR/KVKK is "no third-party request at all", and that
 *    is what we ship.
 *  - Every tag is optional. A missing id means the tag is simply skipped, so a
 *    fresh clone with an empty .env runs clean with no console noise.
 *  - Withdrawing consent flips Consent Mode back to denied and stops further
 *    events. Already-loaded scripts cannot be unloaded from the page, so a full
 *    reload is offered by the UI after a withdrawal.
 */

import { getConsent, onConsentChange, type ConsentState } from './consent';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
    /** Set by the inline snippet in index.html once it publishes the defaults. */
    __rememberedConsentDefaults?: boolean;
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; callMethod?: (...args: unknown[]) => void; loaded?: boolean; version?: string; push?: unknown };
    _fbq?: unknown;
  }
}

// Next inlines NEXT_PUBLIC_* at build time, the same contract the Vite build
// had: an empty id means the tag is never loaded at all.
const GA4_ID = (process.env.NEXT_PUBLIC_GA4_ID ?? '').trim();
const CLARITY_ID = (process.env.NEXT_PUBLIC_CLARITY_ID ?? '').trim();
const META_PIXEL_ID = (process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '').trim();

const loaded = {
  ga4: false,
  clarity: false,
  metaPixel: false,
};

function injectScript(src: string, attrs: Record<string, string> = {}): void {
  const el = document.createElement('script');
  el.async = true;
  el.src = src;
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
  document.head.appendChild(el);
}

function gtag(...args: unknown[]): void {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

let consentModeReady = false;

/**
 * Publishes deny-all Consent Mode defaults.
 *
 * index.html normally does this before the bundle parses, which is where it
 * belongs; this is the fallback for any host page without that snippet. Runs at
 * most once either way, since a second `default` push would be ignored.
 */
export function initConsentMode(): void {
  if (consentModeReady) return;
  consentModeReady = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || gtag;

  if (window.__rememberedConsentDefaults) return;
  window.__rememberedConsentDefaults = true;

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500,
  });
  gtag('set', 'ads_data_redaction', true);
  gtag('set', 'url_passthrough', true);
}

function pushConsentUpdate(state: ConsentState): void {
  gtag('consent', 'update', {
    ad_storage: state.marketing ? 'granted' : 'denied',
    ad_user_data: state.marketing ? 'granted' : 'denied',
    ad_personalization: state.marketing ? 'granted' : 'denied',
    analytics_storage: state.analytics ? 'granted' : 'denied',
  });
}

function loadGa4(): void {
  if (loaded.ga4 || !GA4_ID) return;
  loaded.ga4 = true;

  injectScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`);
  gtag('js', new Date());
  gtag('config', GA4_ID, {
    anonymize_ip: true,
    send_page_view: true,
  });
}

function loadClarity(): void {
  if (loaded.clarity || !CLARITY_ID) return;
  loaded.clarity = true;

  // Microsoft Clarity bootstrap: queue calls until the real script takes over.
  const queue: unknown[] = [];
  const shim = ((...args: unknown[]) => {
    queue.push(args);
  }) as NonNullable<Window['clarity']>;
  shim.q = queue;
  window.clarity = window.clarity || shim;

  injectScript(`https://www.clarity.ms/tag/${encodeURIComponent(CLARITY_ID)}`);
  window.clarity?.('consent');
}

function loadMetaPixel(): void {
  if (loaded.metaPixel || !META_PIXEL_ID) return;
  loaded.metaPixel = true;

  // Meta Pixel bootstrap, transcribed from Meta's snippet.
  const queue: unknown[] = [];
  const shim = function (...args: unknown[]) {
    if (shim.callMethod) {
      shim.callMethod.apply(shim, args);
    } else {
      queue.push(args);
    }
  } as NonNullable<Window['fbq']>;
  shim.queue = queue;
  shim.push = shim;
  shim.loaded = true;
  shim.version = '2.0';
  window.fbq = window.fbq || shim;
  window._fbq = window._fbq || window.fbq;

  injectScript('https://connect.facebook.net/en_US/fbevents.js');
  window.fbq?.('consent', 'grant');
  window.fbq?.('init', META_PIXEL_ID);
  window.fbq?.('track', 'PageView');
}

function applyConsent(state: ConsentState): void {
  pushConsentUpdate(state);

  if (state.analytics) {
    loadGa4();
    loadClarity();
  }
  if (state.marketing) {
    loadMetaPixel();
  } else {
    window.fbq?.('consent', 'revoke');
  }
}

let started = false;

/**
 * Wires the tag layer to the consent store. Idempotent, and deliberately
 * without an unsubscribe: the tag layer lives as long as the page, so a
 * component unmount (React StrictMode remounts every effect in development)
 * must not be able to tear it down.
 */
export function startAnalytics(): void {
  if (started) return;
  started = true;

  initConsentMode();
  onConsentChange(applyConsent);
  applyConsent(getConsent());
}

/** True when at least one tag id is configured, i.e. measurement is possible. */
export function hasConfiguredTags(): boolean {
  return Boolean(GA4_ID || CLARITY_ID || META_PIXEL_ID);
}

/** Reports a custom event to whichever consented tags are live. */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  const state = getConsent();
  if (state.analytics && loaded.ga4) {
    window.gtag?.('event', name, params);
  }
  if (state.marketing && loaded.metaPixel) {
    window.fbq?.('trackCustom', name, params);
  }
}
