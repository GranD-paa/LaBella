import { matchesImageSignature } from "@/lib/data/image-signature";

/**
 * The one place the rules for an acceptable banner image live, so the three
 * repositories that store them differently cannot drift into accepting
 * different files.
 */
export const ALLOWED_BANNER_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export const MAX_BANNER_IMAGE_BYTES = 5 * 1024 * 1024;

type ValidatedBannerImage =
  | { ok: false; error: string }
  | { ok: true; bytes: Buffer; extension: string };

export async function validateBannerImage(
  file: File
): Promise<ValidatedBannerImage> {
  const extension = ALLOWED_BANNER_IMAGE_TYPES[file.type];
  if (!extension) {
    return { ok: false, error: "Please upload a JPEG, PNG, WebP, or GIF image." };
  }
  if (file.size > MAX_BANNER_IMAGE_BYTES) {
    return { ok: false, error: "Image must be smaller than 5MB." };
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  if (!matchesImageSignature(file.type, bytes)) {
    return { ok: false, error: "This file's contents don't match a valid image." };
  }

  return { ok: true, bytes, extension };
}

/**
 * The bytes are addressed by an immutable id, so this URL can be cached
 * forever. Kept next to the validation rules so the repository that writes it
 * and the route that serves it cannot disagree about the shape.
 */
export const BANNER_IMAGE_ROUTE = "/api/banner-images";

export function bannerImageUrl(id: string): string {
  return `${BANNER_IMAGE_ROUTE}/${id}`;
}
