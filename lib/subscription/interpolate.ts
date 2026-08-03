/**
 * Replaces `{param}` placeholders in admin-edited subscription copy. This
 * text comes from the database, not the i18n message catalog, so it needs
 * its own tiny interpolation instead of the `t()` translator.
 */
export function interpolateText(
  template: string,
  params: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in params ? String(params[key]) : match
  );
}
