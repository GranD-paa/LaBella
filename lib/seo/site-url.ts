import { headers } from "next/headers";

/**
 * The site's public origin, for canonical URLs, sitemaps, RSS and JSON-LD.
 *
 * Search engines index absolute URLs, so anything relative here would either
 * be dropped or resolved against the wrong host. `NEXT_PUBLIC_SITE_URL` wins
 * when set; otherwise the request's forwarded host is used, which is correct
 * behind the ArvanCloud proxy where the container itself only ever sees
 * `localhost:3000`.
 *
 * `app/actions/checkout.ts` resolves the same origin for gateway callbacks.
 */
export async function getSiteUrl(): Promise<string> {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");

  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  const protocol =
    headerList.get("x-forwarded-proto") ??
    (host?.startsWith("localhost") ? "http" : "https");

  return `${protocol}://${host}`;
}

/**
 * Synchronous origin for `sitemap.ts` / `robots.ts`, which Next may evaluate
 * at build time where no request headers exist.
 */
export function getStaticSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://laparli.com"
  );
}
