import { matchesImageSignature } from "@/lib/data/image-signature";

/**
 * The rules for an image a blog post may use, in one place so the repository
 * that stores it and the route that serves it cannot disagree.
 *
 * Deliberately not shared with `banner-image.ts`. A banner is one wide strip
 * at the top of a screen and five megabytes is generous for it; a post can
 * carry a dozen pictures and each one is a row in a table the article page
 * never reads, so the ceiling here is lower and the reasoning behind it is
 * different. Two small modules that can drift apart on purpose beat one that
 * has to be argued with every time either need changes.
 */
export const ALLOWED_BLOG_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export const MAX_BLOG_IMAGE_BYTES = 4 * 1024 * 1024;

export type ImageDimensions = { width: number; height: number };

/**
 * Pixel dimensions, read from the file's own header.
 *
 * The point is `width`/`height` attributes on the rendered `<img>`: without
 * them the browser cannot reserve space for a picture before its bytes land,
 * so every image on the page shoves the text below it downward as it loads.
 * That shove is what Cumulative Layout Shift measures, and it is the easiest
 * of the three Core Web Vitals to fix — you just have to know the numbers.
 *
 * Four formats, four small header parsers. The alternative is an image
 * library in the server bundle to learn two integers, which is not a trade
 * worth making. A header this code cannot parse returns null and the image
 * still works; it just doesn't get to reserve its space.
 */
export function readImageDimensions(
  mimeType: string,
  bytes: Buffer
): ImageDimensions | null {
  try {
    switch (mimeType) {
      case "image/png":
        // IHDR is always the first chunk: 8-byte signature, 4-byte length,
        // 4-byte type, then width and height as big-endian 32-bit integers.
        return bytes.length >= 24
          ? { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) }
          : null;

      case "image/gif":
        // Logical screen width/height, little-endian 16-bit, right after the
        // six-byte "GIF89a" header.
        return bytes.length >= 10
          ? { width: bytes.readUInt16LE(6), height: bytes.readUInt16LE(8) }
          : null;

      case "image/jpeg":
        return readJpegDimensions(bytes);

      case "image/webp":
        return readWebpDimensions(bytes);

      default:
        return null;
    }
  } catch {
    // A truncated or malformed header reads past the end of the buffer. The
    // upload is still a valid image by signature; it just doesn't get to
    // declare its size.
    return null;
  }
}

/**
 * JPEG keeps its dimensions in a Start-Of-Frame marker, which sits after an
 * arbitrary run of metadata segments (EXIF thumbnails, colour profiles), so
 * finding it means walking the segment chain rather than reading an offset.
 */
function readJpegDimensions(bytes: Buffer): ImageDimensions | null {
  let offset = 2; // Past the 0xFFD8 start-of-image marker.

  while (offset + 9 < bytes.length) {
    if (bytes[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = bytes[offset + 1];

    // SOF0 through SOF15, minus the four that are not frame headers at all
    // (0xC4 defines Huffman tables, 0xC8 is reserved, 0xCC defines arithmetic
    // coding conditioning) — those carry no dimensions and must be skipped
    // like any other segment.
    const isStartOfFrame =
      marker >= 0xc0 &&
      marker <= 0xcf &&
      marker !== 0xc4 &&
      marker !== 0xc8 &&
      marker !== 0xcc;

    if (isStartOfFrame) {
      return {
        height: bytes.readUInt16BE(offset + 5),
        width: bytes.readUInt16BE(offset + 7),
      };
    }

    // Every other marker is followed by a two-byte length that includes
    // itself, so this is how to step over a segment of unknown content.
    offset += 2 + bytes.readUInt16BE(offset + 2);
  }

  return null;
}

/** WebP comes in three flavours and each one stores its size differently. */
function readWebpDimensions(bytes: Buffer): ImageDimensions | null {
  if (bytes.length < 30) return null;
  const format = bytes.toString("ascii", 12, 16);

  if (format === "VP8 ") {
    // Lossy: 14-bit width and height after the start code, in the frame header.
    return {
      width: bytes.readUInt16LE(26) & 0x3fff,
      height: bytes.readUInt16LE(28) & 0x3fff,
    };
  }

  if (format === "VP8L") {
    // Lossless packs both into 28 bits, each stored one less than its value.
    const packed = bytes.readUInt32LE(21);
    return {
      width: (packed & 0x3fff) + 1,
      height: ((packed >> 14) & 0x3fff) + 1,
    };
  }

  if (format === "VP8X") {
    // Extended (animation, alpha): 24-bit canvas size, also stored minus one.
    return {
      width: (bytes[24] | (bytes[25] << 8) | (bytes[26] << 16)) + 1,
      height: (bytes[27] | (bytes[28] << 8) | (bytes[29] << 16)) + 1,
    };
  }

  return null;
}

export type ValidatedBlogImage =
  | { ok: false; error: string }
  | {
      ok: true;
      bytes: Buffer;
      extension: string;
      dimensions: ImageDimensions | null;
    };

export async function validateBlogImage(
  file: File
): Promise<ValidatedBlogImage> {
  const extension = ALLOWED_BLOG_IMAGE_TYPES[file.type];
  if (!extension) {
    return { ok: false, error: "admin.blog.images.errors.invalidType" };
  }
  if (file.size > MAX_BLOG_IMAGE_BYTES) {
    return { ok: false, error: "admin.blog.images.errors.tooLarge" };
  }

  const bytes = Buffer.from(await file.arrayBuffer());

  // `file.type` is whatever the browser inferred from the extension, so a
  // renamed file claims to be an image without being one. The magic numbers
  // are what actually decide.
  if (!matchesImageSignature(file.type, bytes)) {
    return { ok: false, error: "admin.blog.images.errors.notAnImage" };
  }

  return {
    ok: true,
    bytes,
    extension,
    dimensions: readImageDimensions(file.type, bytes),
  };
}

/**
 * Addressed by an immutable id, so the response can be cached forever — see
 * the route for why that matters more here than it looks.
 */
export const BLOG_IMAGE_ROUTE = "/api/blog-images";

export function blogImageUrl(id: string): string {
  return `${BLOG_IMAGE_ROUTE}/${id}`;
}

/** Whether a URL points at this app's own image store. */
export function isBlogImageUrl(url: string): boolean {
  return Boolean(blogImageIdFromUrl(url));
}

/**
 * Recovers an image's id from a URL that was stored with a post.
 *
 * Two shapes, because the two data sources store images differently: the
 * container serves them from the database at `/api/blog-images/<id>`, while
 * local development writes files to `/uploads/blog/<id>.<ext>`. Both carry the
 * id, which is what the dimension lookup needs, so this reads either one and
 * returns null for anything else — an image hosted on some other site.
 *
 * A literal rather than a `RegExp` built from `BLOG_IMAGE_ROUTE`: the route is
 * a constant that has never moved, and interpolating it would mean escaping
 * the pattern's own backslashes through a template string, which is how a `\.`
 * quietly becomes a `.` that matches any character at all.
 */
const BLOG_IMAGE_URL_PATTERN =
  /^(?:\/api\/blog-images\/|\/uploads\/blog\/)([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})(?:\.[a-z0-9]+)?$/i;

export function blogImageIdFromUrl(url: string): string | null {
  const match = BLOG_IMAGE_URL_PATTERN.exec(url.trim());
  return match ? match[1] : null;
}
