# Search engine visibility

The site is closed to search engines until launch. One environment variable
controls it:

```
SITE_INDEXABLE=true
```

Unset, or set to anything else, means **hidden**. That default is deliberate:
a forgotten variable should leave an unfinished site private rather than
publish it.

## What "hidden" actually does

Three signals, all read per request, so flipping the variable and restarting
the container is enough — no rebuild.

| Signal | Where | Hidden | Open |
| --- | --- | --- | --- |
| `robots.txt` | `app/robots.ts` | `Disallow: /`, no sitemap advertised | `Allow: /` minus the private paths, sitemap linked |
| `<meta name="robots">` | `app/layout.tsx` | `noindex, nofollow, nocache` on every page | absent |
| `X-Robots-Tag` header | `middleware.ts` | `noindex, nofollow` on every response | absent |

`robots.txt` only asks a crawler not to fetch; a URL someone links to can
still be listed without it. The `noindex` signals are what actually bind, and
the header covers the responses with no HTML to hold a meta tag —
`sitemap.xml`, the RSS feed, and anything else served through the middleware.

The header is set in `middleware.ts` rather than `next.config.mjs` on purpose:
`next.config.mjs` is evaluated at build time, so putting the switch there
would bake whichever value happened to be present when the image was built.

## Opening the site at launch

1. Add `SITE_INDEXABLE=true` to the container's environment on ArvanCloud.
2. Restart the container.
3. Confirm from outside:

   ```
   curl -s https://laparli.com/robots.txt
   curl -sI https://laparli.com/ | grep -i x-robots-tag   # expect nothing
   curl -s https://laparli.com/ | grep '<meta name="robots"'   # expect nothing
   ```

4. Submit `https://laparli.com/sitemap.xml` in Google Search Console.

## What is public, and what is not

Public: `/`, `/blog`, `/about`, `/contact`, `/subscription`, and the feeds.
These are the marketing surface, and `PUBLIC_ROUTES` in
`lib/auth/postgres-middleware.ts` is the list that decides it.

Private: everything else — `/learn`, `/lesson`, `/quiz`, `/dashboard`,
`/menu`, `/profile`, `/admin`. The middleware redirects a visitor without a
session to `/sign-up`, `robots.txt` disallows the same paths once the site is
open, and `app/sitemap.ts` deliberately does not list them. Those three lists
describe the same boundary and are meant to stay in step; a URL in the
sitemap that the middleware redirects is a bug, not a trade-off.

Reading `/subscription` needs no account, but buying still does: the plan
cards send a signed-out visitor to sign-up, and `startCheckoutAction` refuses
them regardless of what the page rendered.
