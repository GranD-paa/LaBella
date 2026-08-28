/**
 * Phone numbers are collected from every account — they are what SpotPlayer
 * burns into each user's video watermark. Only Iranian numbers get an SMS
 * though: an international message costs ~146x a domestic one through
 * Melipayamak, so foreign accounts verify by email link instead.
 */

/** Digits only, in E.164 form (`+989121234567`), or null if unusable. */
export function normalizePhone(raw: string): string | null {
  const cleaned = raw.replace(/[\s()\-.]/g, "");

  // Iranian shorthands that arrive without a country code: 09121234567 and
  // 9121234567 both mean +989121234567.
  if (/^0?9\d{9}$/.test(cleaned)) {
    return `+98${cleaned.replace(/^0/, "")}`;
  }
  if (/^(\+98|0098|98)9\d{9}$/.test(cleaned)) {
    return `+98${cleaned.slice(-10)}`;
  }

  // Everything else must already carry its own country code.
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
