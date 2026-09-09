/**
 * Browser storage this site uses, and what the cookie policy says about it.
 *
 * Key and disclosure are declared together on purpose. The policy table has
 * drifted from reality three times now: it named a memorial key the app had
 * renamed, and later missed the language and edit-token keys entirely. Adding a
 * key here without describing it is a type error, so the table below is the
 * table the visitor sees.
 */

/** Where the memorial dossiers entered on this device are kept. */
export const MEMORIALS_STORAGE_KEY = 'remembered_memorials_v8_pure_english';

/**
 * Edit tokens for dossiers created on this device, keyed by memorial id.
 *
 * Minted by the registry and shown once. Without accounts this is the only
 * proof of authorship, so losing it means losing the ability to edit.
 */
export const EDIT_TOKENS_STORAGE_KEY = 'remembered_edit_tokens';

/** The visitor's chosen interface language. */
export const LANGUAGE_STORAGE_KEY = 'remembered_language';

/** Tributes this device left on the live wall, so they survive a reload. */
export const LIVE_PULSE_STORAGE_KEY = 'remembered_live_pulse_items';

/** The visitor's cookie decision. Owned by lib/consent.ts, named here too. */
export const CONSENT_STORAGE_KEY = 'remembered_consent';

/**
 * Earlier keys, cleared on boot. They held prototype data with mixed-language
 * strings and dead image URLs, so carrying them forward is worse than losing
 * them.
 */
export const LEGACY_MEMORIALS_STORAGE_KEYS = [
  'remembered_memorials_v4',
  'remembered_memorials_v5',
  'app_memorials_v4',
] as const;

/** One row of the strictly necessary section of the cookie policy. */
export interface StorageDisclosure {
  key: string;
  purpose: { en: string; tr: string };
  retention: { en: string; tr: string };
}

/**
 * Every strictly necessary item this site stores, as the policy presents it.
 *
 * Anything written to localStorage that is not consent-gated belongs here.
 */
export const NECESSARY_STORAGE: StorageDisclosure[] = [
  {
    key: CONSENT_STORAGE_KEY,
    purpose: {
      en: 'Stores your cookie decision so we do not ask again',
      tr: 'Çerez kararınızı saklar, tekrar sormamızı önler',
    },
    retention: { en: '12 months', tr: '12 ay' },
  },
  {
    key: LANGUAGE_STORAGE_KEY,
    purpose: {
      en: 'Remembers whether you read the site in English or Turkish',
      tr: 'Siteyi Türkçe mi İngilizce mi okuduğunuzu hatırlar',
    },
    retention: { en: 'Until cleared', tr: 'Silinene kadar' },
  },
  {
    key: MEMORIALS_STORAGE_KEY,
    purpose: {
      en: 'Keeps the memorial data you enter on this device',
      tr: 'Bu cihazda girdiğiniz kütük verilerini tutar',
    },
    retention: { en: 'Until cleared', tr: 'Silinene kadar' },
  },
  {
    key: EDIT_TOKENS_STORAGE_KEY,
    purpose: {
      en: 'Proves you created a dossier, so only you can edit it',
      tr: 'Bir kütüğü sizin açtığınızı kanıtlar, düzenlemeyi size bırakır',
    },
    retention: { en: 'Until cleared', tr: 'Silinene kadar' },
  },
  {
    key: LIVE_PULSE_STORAGE_KEY,
    purpose: {
      en: 'Keeps the tributes you left on the live wall visible after a reload',
      tr: 'Canlı duvarda bıraktığınız saygı duruşlarını yenilemeden sonra da gösterir',
    },
    retention: { en: 'Until cleared', tr: 'Silinene kadar' },
  },
];
