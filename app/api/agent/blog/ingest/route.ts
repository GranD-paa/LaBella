import { NextResponse } from "next/server";
import { z } from "zod";

import {
  deriveSlug,
  publishArticle,
  resolveTaxonomies,
  stripLeadingHeading,
  uniqueSlug,
} from "@/lib/blog/agent/publish";
import { getAgentConfig } from "@/lib/blog/agent/config";
import { revalidateBlog } from "@/lib/blog/revalidate";
import { isLocalDataMode } from "@/lib/config/data-source";
import { getDataRepository } from "@/lib/data";

/**
 * Takes a finished article from outside and files it as a draft.
 *
 * The in-container agent writes and publishes in one breath, which is only
 * possible because the models it can reach are the ones ArvanCloud proxies.
 * This door exists for the other arrangement: a workflow running somewhere
 * outside Iran — n8n, a script, anything that speaks HTTP — picks its own
 * model, writes the article and the picture, and posts the result here.
 *
 * The division of labour is deliberate. Everything upstream of this route is
 * replaceable; everything downstream — slug uniqueness, the derived excerpt
 * and reading time, the taxonomy filter, the cache invalidation — is the
 * site's own and stays the site's own, so an external writer cannot put the
 * blog into a state the admin panel could not.
 *
 * Posts arrive as drafts. Not a policy the caller can override: the point of
 * moving the writing outside is that nobody here saw it happen, and the only
 * honest response to that is to put it in front of someone before it is
 * public.
 */

export const dynamic = "force-dynamic";
export const maxDuration = 120;

/** Roughly four megabytes of image, once base64 inflates it by a third. The
 * store refuses more than that anyway; refusing it here names the reason. */
const MAX_COVER_BASE64 = 6 * 1024 * 1024;

const optional = z
  .string()
  .trim()
  .transform((value) => (value.length === 0 ? null : value))
  .nullable()
  .optional();

const ingestSchema = z.object({
  title: z.string().trim().min(3, "عنوان حداقل ۳ حرف باشد."),
  content: z.string().trim().min(200, "متن مطلب کوتاه‌تر از حد قابل انتشار است."),

  // Everything below is optional so the caller can send as little as a title
  // and a body. A workflow author building this by hand in a visual editor
  // will forget a field; forgetting one should cost a derived value, not a
  // rejected request.
  slug: optional,
  summary: optional,
  metaTitle: optional,
  metaDescription: optional,
  coverImageAlt: optional,

  categorySlugs: z.array(z.string()).default([]),
  languageSlugs: z.array(z.string()).default([]),

  /** Either the raw bytes, base64, with or without a `data:` prefix… */
  coverImageBase64: optional,
  /** …or a URL the server fetches. Both may be omitted; a post without a
   * cover is publishable, one that waits on a broken image is not. */
  coverImageUrl: optional,

  /** Free-form label for the run log: which workflow sent this. */
  source: optional,
});

export async function POST(request: Request) {
  const secret = process.env.AGENT_INGEST_SECRET;
  // Fail closed. An unset secret means the door does not exist, not that it
  // is unlocked — this endpoint writes to the public blog.
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (isLocalDataMode()) {
    return NextResponse.json(
      {
        error: "local-data-mode",
        detail: "Set NEXT_PUBLIC_DATA_SOURCE=postgres; the file repository is not the blog.",
      },
      { status: 409 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "body must be JSON" }, { status: 400 });
  }

  const parsed = ingestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "invalid-payload",
        issues: parsed.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 422 }
    );
  }

  const input = parsed.data;
  const config = getAgentConfig();
  const notes: string[] = [];

  try {
    const categories = await getDataRepository().getBlogCategories();
    const taxonomies = resolveTaxonomies(
      input.categorySlugs,
      input.languageSlugs,
      { categories },
      notes
    );

    const slug = await uniqueSlug(
      deriveSlug(input.slug ?? null, input.title),
      notes
    );

    const coverUrl = await storeCover(input, notes);

    const postId = await publishArticle({
      article: {
        title: input.title,
        slug,
        summary: input.summary ?? null,
        content: stripLeadingHeading(input.content),
        metaTitle: input.metaTitle ?? null,
        metaDescription: input.metaDescription ?? null,
        coverImageAlt: input.coverImageAlt ?? null,
        categorySlugs: taxonomies.categorySlugs,
        languageSlugs: taxonomies.languageSlugs,
      },
      slug,
      coverUrl,
      // Always a draft. See the note at the top of this file.
      status: "draft",
      noindex: config.noindex,
      authorId: config.authorProfileId,
    });

    // A draft is not on any public page, but it is on `/admin/blog`, and that
    // list is cached like everything else.
    revalidateBlog();

    return NextResponse.json({
      status: "draft",
      postId,
      slug,
      reviewUrl: `/admin/blog/${postId}`,
      hasCover: Boolean(coverUrl),
      notes,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[blog-ingest] failed", { source: input.source, message });
    return NextResponse.json({ error: message, notes }, { status: 500 });
  }
}

/**
 * Gets the cover into the blog's own image store, whichever way it arrived.
 *
 * Never throws. A cover that will not decode, will not download or will not
 * fit is a note on the response and a draft without a picture — the editor
 * can drop one in by hand in ten seconds, which is a far better outcome than
 * throwing away an article somebody already paid a model to write.
 */
async function storeCover(
  input: {
    coverImageBase64?: string | null;
    coverImageUrl?: string | null;
    coverImageAlt?: string | null;
  },
  notes: string[]
): Promise<string | null> {
  try {
    let bytes: Buffer | null = null;
    let contentType = "image/png";

    if (input.coverImageBase64) {
      const raw = input.coverImageBase64;
      if (raw.length > MAX_COVER_BASE64) {
        notes.push("تصویر بزرگ‌تر از سقف مجاز بود و نادیده گرفته شد.");
        return null;
      }
      // Accepts both a bare base64 payload and a full `data:` URL, because
      // half the tools that produce one produce the other.
      // `[\s\S]` rather than the `s` flag: the project targets a pre-2018
      // lib, where dotall is a compile error.
      const dataUrl = /^data:([^;,]+);base64,([\s\S]*)$/.exec(raw);
      if (dataUrl) {
        contentType = dataUrl[1];
        bytes = Buffer.from(dataUrl[2], "base64");
      } else {
        bytes = Buffer.from(raw, "base64");
      }
    } else if (input.coverImageUrl) {
      const response = await fetch(input.coverImageUrl, {
        signal: AbortSignal.timeout(30_000),
      });
      if (!response.ok) {
        notes.push(`دانلود تصویر ناموفق بود (${response.status}).`);
        return null;
      }
      contentType = response.headers.get("content-type") ?? contentType;
      bytes = Buffer.from(await response.arrayBuffer());
    }

    if (!bytes || bytes.byteLength === 0) return null;

    // What the caller said the type is matters less than what the bytes say.
    // The store checks the declared type against the file's magic numbers and
    // rejects a mismatch, so a workflow that posts raw base64 with no type —
    // the normal case, since base64 carries none — would have every JPEG
    // refused as "not an image" against the png default.
    contentType = sniffImageType(bytes) ?? contentType;

    const extension = contentType.split("/")[1]?.split(";")[0] ?? "png";
    const file = new File([new Uint8Array(bytes)], `cover-${Date.now()}.${extension}`, {
      type: contentType.split(";")[0],
    });

    const uploaded = await getDataRepository().uploadBlogImage(
      file,
      input.coverImageAlt ?? null,
      getAgentConfig().authorProfileId
    );

    if (uploaded.error || !uploaded.image) {
      notes.push(`ذخیره‌ی تصویر ناموفق بود: ${uploaded.error ?? "unknown"}`);
      return null;
    }

    return uploaded.image.url;
  } catch (error) {
    notes.push(
      `تصویر پردازش نشد: ${error instanceof Error ? error.message : String(error)}`
    );
    return null;
  }
}

/**
 * Reads the image format out of the first few bytes.
 *
 * Only the four formats the blog's store accepts. Anything else returns null
 * and the caller's declared type stands, which then fails validation with a
 * message about the type rather than silently storing something unservable.
 */
function sniffImageType(bytes: Buffer): string | null {
  if (bytes.length >= 8 && bytes.readUInt32BE(0) === 0x89504e47) {
    return "image/png";
  }
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    bytes.length >= 12 &&
    bytes.toString("ascii", 0, 4) === "RIFF" &&
    bytes.toString("ascii", 8, 12) === "WEBP"
  ) {
    return "image/webp";
  }
  if (bytes.length >= 6 && bytes.toString("ascii", 0, 3) === "GIF") {
    return "image/gif";
  }
  return null;
}
