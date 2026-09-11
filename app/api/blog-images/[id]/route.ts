import { queryOne } from "@/lib/data/postgres/client";

export const dynamic = "force-dynamic";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Serves the bytes of an image used in a blog post.
 *
 * Public without a check, and deliberately so: these pictures are embedded in
 * pages written to be found by strangers, and an image a crawler cannot fetch
 * is an image that never appears in a search result or a social card. There is
 * nothing here to protect — the id is an unguessable UUID and the only thing
 * behind it is a picture someone chose to publish.
 *
 * A draft's images are reachable too. That is the same trade `/api/banner-images`
 * makes: the editor has to render them while the post is still unpublished, and
 * gating on the parent post's status would mean a join on every image request
 * to hide bytes whose id nobody can guess anyway.
 *
 * ## Why the cache headers carry the weight here
 *
 * An article with eight pictures is eight requests, and without caching every
 * one of them is a database round-trip pulling a megabyte of bytea through the
 * connection pool — on a page whose whole point is to load fast for a first-time
 * visitor from a search result. Because an id never points at different bytes,
 * the response is immutable: the CDN and the browser answer for it after the
 * first request and neither this handler nor the database is involved again.
 */
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  if (!UUID_PATTERN.test(params.id)) {
    return new Response("Not found", { status: 404 });
  }

  let image: { content_type: string; bytes: Buffer } | null = null;
  try {
    image = await queryOne<{ content_type: string; bytes: Buffer }>(
      "select content_type, bytes from blog_images where id = $1",
      [params.id]
    );
  } catch {
    // No database configured, or db/009_blog_refactor.sql has not been run
    // against this one yet. Either way there is no image to serve.
    return new Response("Not found", { status: 404 });
  }

  if (!image) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(new Uint8Array(image.bytes), {
    headers: {
      "Content-Type": image.content_type,
      "Content-Length": String(image.bytes.length),
      "Cache-Control": "public, max-age=31536000, immutable",
      // An uploaded file is served from this app's own origin, so a crafted
      // one would otherwise run with the site's privileges. `sandbox` plus a
      // default-src of 'none' makes the response inert whatever is inside it.
      "Content-Security-Policy": "default-src 'none'; sandbox",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
