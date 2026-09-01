/**
 * Persian (Jalali) date for blog timestamps.
 *
 * `fa-IR` in Intl resolves to the Persian calendar, so this returns a real
 * Jalali date — "۱۲ شهریور ۱۴۰۵" — rather than a Gregorian date written in
 * Persian digits. The machine-readable ISO value stays in the `datetime`
 * attribute for crawlers.
 */
export function formatBlogDate(iso: string): string {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}
