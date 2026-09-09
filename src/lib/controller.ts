/**
 * The data controller behind remembered8.com.
 *
 * GDPR Art. 13(1)(a) and KVKK Art. 10 both require the controller to be
 * identifiable and reachable, which in practice means a registered name and a
 * postal address, not just an email. Until those are real, `isControllerComplete`
 * returns false and the privacy notice says so out loud rather than presenting
 * placeholder text as if it were a disclosure.
 */

export interface ControllerDetails {
  /** Registered legal name, including the company form. */
  legalName: string;
  /** Postal address, one line per rendered row, ending with the country. */
  address: string[];
  /** Contact address for privacy questions and rights requests. */
  email: string;
  /** Public site this notice covers. */
  site: string;
  /** Optional: phone number for privacy enquiries. */
  phone?: string;
  /** Optional: trade registry / Mersis number, where one exists. */
  registrationNumber?: string;
  /** Optional: named data protection officer, where one is appointed. */
  dataProtectionOfficer?: string;
}

/**
 * Marks a value as not yet supplied.
 *
 * Deliberately language-neutral: these strings are interpolated into both the
 * English and the Turkish notice, so an English "TODO" would read as broken
 * copy inside a Turkish sentence. A visible blank plus the warning banner above
 * it says the same thing in either language.
 */
const BLANK = '[__________]';

/**
 * Replace every BLANK below with the real values, then delete nothing else:
 * `isControllerComplete` flips on its own and the draft warning disappears.
 *
 *   legalName  the registered trade name including the company form
 *   address    street, then postcode and city, then country
 *   email      a monitored inbox; KVKK Art. 13 allows 30 days to answer
 */
export const CONTROLLER: ControllerDetails = {
  legalName: BLANK,
  address: [BLANK, BLANK, BLANK],
  email: 'privacy@remembered8.com',
  site: 'remembered8.com',
};

/** True once every mandatory field carries a real value. */
export function isControllerComplete(controller: ControllerDetails = CONTROLLER): boolean {
  const required = [controller.legalName, controller.email, controller.site, ...controller.address];
  return required.every((value) => value.trim().length > 0 && value !== BLANK);
}
