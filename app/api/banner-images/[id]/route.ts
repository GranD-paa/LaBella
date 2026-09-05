import { queryOne } from "@/lib/data/postgres/client";

export const dynamic = "force-dynamic";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Serves the bytes an uploaded banner is stored under.
 *
 * This is the public face of what Supabase Storage used to expose, and it is
 * public in the same way: the id is an unguessable UUID, and knowing it is the
 * only thing needed to fetch the image — the admin banner list has to render
 * drafts too, so gating on `status` here would break the screen that manages
 * them. Nothing but the image bytes is reachable through this route.
 *
 * Because the id never points at different bytes, the response is immutable.
 * After the first request the CDN and the browser answer for it and this
 * handler — and the database — stop being involved.
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
      "select content_type, bytes from banner_images where id = $1",
      [params.id]
    );
  } catch {
    // No database configured (local data mode serves banners from /uploads),
    // or the table is missing because the migration has not been applied yet.
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
      "Content-Security-Policy": "default-src 'none'; sandbox",
    },
  });
}
