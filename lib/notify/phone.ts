/**
 * One shape for a phone number, and one answer to whether a code can go to it.
 *
 * Everything that touches a number — the sign-in form, the rate limiter, the
 * SMS gateway — reads it through here, so a number cannot be counted against
 * one spelling and sent to another. `+989121234567` is that one spelling;
 * the gateway wants `09121234567` and gets it from `toLocalIranFormat`.
 */

const PERSIAN_ZERO = 0x06f0;
const ARABIC_ZERO = 0x0660;

/**
 * Persian and Arabic-Indic digits rewritten as ASCII.
 *
 * The placeholder under the phone field is `۰۹۱۲۱۲۳۴۵۶۷`, so a Persian
 * keyboard producing `۰۹۱۲…` is the expected input, not an edge case.
 */
export function foldDigits(raw: string): string {
  let out = "";
  for (let i = 0; i < raw.length; i += 1) {
    const ch = raw.charAt(i);
    const code = raw.charCodeAt(i);
    if (code >= PERSIAN_ZERO && code <= PERSIAN_ZERO + 9) {
      out += String(code - PERSIAN_ZERO);
    } else if (code >= ARABIC_ZERO && code <= ARABIC_ZERO + 9) {
      out += String(code - ARABIC_ZERO);
    } else {
      out += ch;
    }
  }
  return out;
}

/** The number in E.164, or null if it is not a phone number at all. */
export function normalizePhone(raw: string): string | null {
  const cleaned = foldDigits(raw).replace(/[\s()\-.\u200c\u200f\u200e\u2066-\u2069]/g, "");

  if (/^0?9\d{9}$/.test(cleaned)) {
    return `+98${cleaned.replace(/^0/, "")}`;
  }
  if (/^(\+98|0098|98)9\d{9}$/.test(cleaned)) {
    return `+98${cleaned.slice(-10)}`;
  }
  if (/^\+[1-9]\d{6,14}$/.test(cleaned)) {
    return cleaned;
  }
  if (/^00[1-9]\d{6,14}$/.test(cleaned)) {
    return `+${cleaned.slice(2)}`;
  }
  return null;
}

export function isIranianPhone(e164: string): boolean {
  return e164.startsWith("+98");
}

/**
 * The operator digits Iran has actually allocated: MCI (091x, 099x),
 * Irancell (090x, 093x, 0941), RighTel (092x), and the MVNOs sharing 099x.
 * `095`, `096` and `097` are not mobile ranges, so a number claiming one is
 * either a typo or a generated string — and either way an SMS to it is money
 * spent on nobody.
 *
 * Widening this is a one-character edit, and it should be widened rather than
 * argued with: turning away one real customer costs more than a wasted code.
 */
const ALLOCATED_OPERATOR_DIGITS = "012349";

/** Digits that repeat or run straight up or down — `+989111111111`, `+989123456789`. */
function looksGenerated(national: string): boolean {
  if (/^(\d)\1+$/.test(national)) {
    return true;
  }
  for (let i = 2; i < national.length; i += 1) {
    const step = Number(national[i]) - Number(national[i - 1]);
    if (step !== Number(national[i - 1]) - Number(national[i - 2])) {
      return false;
    }
    if (step !== 1 && step !== -1) {
      return false;
    }
  }
  return true;
}

/**
 * Whether this is a number an Iranian handset could really answer.
 *
 * Stricter than `isIranianPhone` on purpose. That one asks which country;
 * this one is the gate in front of a gateway that charges per message, so it
 * also refuses unallocated operator ranges and numbers that were obviously
 * counted up to rather than dialled.
 */
export function isIranianMobile(e164: string): boolean {
  if (!/^\+989\d{9}$/.test(e164)) {
    return false;
  }
  const national = e164.slice(3); // the 10 digits starting with 9
  if (!ALLOCATED_OPERATOR_DIGITS.includes(national[1])) {
    return false;
  }
  return !looksGenerated(national);
}

/**
 * `+989121234567` as `09121234567`.
 *
 * Melipayamak's REST API wants the national form; handing it E.164 is
 * accepted and then silently delivered to nobody.
 */
export function toLocalIranFormat(e164: string): string {
  return `0${e164.slice(3)}`;
}
