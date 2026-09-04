/**
 * Whether search engines are allowed to index this site.
 *
 * The site is closed to crawlers until `SITE_INDEXABLE=true` is set on the
 * container. The default is deliberately the closed one: a forgotten variable
 * should leave an unfinished site private, not publish it. The cost is that
 * launch day has an extra step — see `docs/` and the note in `app/robots.ts`.
 *
 * Read per request rather than baked into the build, so opening the site to
 * crawlers is an environment change and a restart, not a rebuild.
 */
export function isSiteIndexable(): boolean {
  return process.env.SITE_INDEXABLE === "true";
}
