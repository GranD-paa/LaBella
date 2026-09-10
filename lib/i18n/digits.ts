import { getLocaleDefinition } from "@/lib/i18n/config";
import type { AppLocale } from "@/lib/i18n/types";

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

/**
 * Digits in the script of the sentence around them.
 *
 * A number is not language-neutral. `۰۹۱۲ ۱۲۳ ۴۵۶۷` inside a Persian line is
 * the number as an Iranian writes it; the same shapes dropped into "A
 * six-digit code was sent to …" are an alphabet the reader may not know, and
 * they cannot check it against the phone in their hand. So the digits follow
 * the interface language, the way dates already do through `Intl`.
 *
 * Which script that is belongs to the locale definition rather than to a test
 * for Persian here, so the next right-to-left language is added in one place.
 *
 * Takes text, not a number: what needs converting is almost always a number
 * already shaped for reading — a phone number in groups, a clock counting
 * down — and parsing that back to a number would lose the shape.
 */
export function localizeDigits(text: string, locale: AppLocale): string {
  if (getLocaleDefinition(locale).numerals !== "persian") {
    return text;
  }
  return text.replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)]);
}
