"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireSuperAdminAction } from "@/lib/auth/action-guards";
import {
  estimateReadingMinutes,
  markdownToPlainText,
} from "@/lib/blog/markdown";
import { getBlogLanguage } from "@/lib/blog/languages";
import { slugifyTitle, type BlogImage } from "@/lib/blog/types";
import { getDataRepository } from "@/lib/data";
import type { ActionResult } from "@/lib/action-result";

/**
 * Blog authoring is a super-admin surface: posts are the public face of the
 * site and go straight into search results, so it sits above the regular
 * `manageContent` tier alongside the other platform-wide switches.
 */

const optionalText = z
  .string()
  .trim()
  .transform((value) => (value.length === 0 ? null : value))
  .nullable();

const optionalUrl = z
  .string()
  .trim()
  .transform((value) => (value.length === 0 ? null : value))
  .nullable()
  .refine(
    (value) => value === null || /^(https?:\/\/|\/)/.test(value),
    "URL must be absolute (http/https) or site-relative."
  );

const postSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(3, "عنوان حداقل ۳ حرف باشد."),
  slug: z.string().trim(),
  excerpt: optionalText,
  summary: optionalText,
  content: z.string().min(1, "متن مطلب خالی است."),
  coverImageUrl: optionalUrl,
  coverImageAlt: optionalText,
  featured: z.boolean(),
  status: z.enum(["draft", "published"]),
  metaTitle: optionalText,
  metaDescription: optionalText,
  canonicalUrl: optionalUrl,
  ogImageUrl: optionalUrl,
  noindex: z.boolean(),
  categorySlugs: z.array(z.string()),
  // Filtered against the known list rather than accepted as typed: an unknown
  // slug would be stored happily and then never render, because every read
  // resolves it through `lib/blog/languages.ts` on the way out.
  languageSlugs: z
    .array(z.string())
    .transform((slugs) => slugs.filter((slug) => Boolean(getBlogLanguage(slug)))),
});

export type BlogFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
  success?: boolean;
  id?: string;
};

export async function saveBlogPostAction(
  _previous: BlogFormState,
  formData: FormData
): Promise<BlogFormState> {
  const guard = await requireSuperAdminAction();
  if (!guard.ok) return { error: "دسترسی ندارید." };

  const rawId = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "");
  const rawSlug = String(formData.get("slug") ?? "").trim();

  const parsed = postSchema.safeParse({
    id: rawId.length > 0 ? rawId : undefined,
    title,
    // An empty slug field derives one from the title, so publishing never
    // blocks on remembering to fill it in.
    slug: rawSlug.length > 0 ? slugifyTitle(rawSlug) : slugifyTitle(title),
    excerpt: String(formData.get("excerpt") ?? ""),
    summary: String(formData.get("summary") ?? ""),
    content: String(formData.get("content") ?? ""),
    coverImageUrl: String(formData.get("coverImageUrl") ?? ""),
    coverImageAlt: String(formData.get("coverImageAlt") ?? ""),
    featured: formData.get("featured") === "on",
    status: formData.get("status") === "published" ? "published" : "draft",
    metaTitle: String(formData.get("metaTitle") ?? ""),
    metaDescription: String(formData.get("metaDescription") ?? ""),
    canonicalUrl: String(formData.get("canonicalUrl") ?? ""),
    ogImageUrl: String(formData.get("ogImageUrl") ?? ""),
    noindex: formData.get("noindex") === "on",
    categorySlugs: formData.getAll("categorySlugs").map(String),
    languageSlugs: formData.getAll("languageSlugs").map(String),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return { error: "فرم را کامل کنید.", fieldErrors };
  }

  const input = parsed.data;

  if (input.slug.length === 0) {
    return {
      error: "فرم را کامل کنید.",
      fieldErrors: { slug: "نشانی مطلب قابل ساخت نیست؛ دستی واردش کنید." },
    };
  }

  const result = await getDataRepository().upsertBlogPost({
    ...input,
    // Derived server-side so they can never disagree with the content.
    excerpt: input.excerpt ?? markdownToPlainText(input.content, 180),
    readingMinutes: estimateReadingMinutes(input.content),
    authorId: guard.profile.id,
  });

  if (result.error) {
    // The unique index on `slug` is the realistic failure here.
    const duplicate = /unique|duplicate/i.test(result.error);
    return {
      error: duplicate
        ? "این نشانی قبلاً برای مطلب دیگری استفاده شده."
        : "ذخیره نشد. دوباره تلاش کنید.",
      fieldErrors: duplicate ? { slug: "نشانی تکراری است." } : undefined,
    };
  }

  revalidateBlog(input.slug, input.categorySlugs, input.languageSlugs);

  return { success: true, id: result.id };
}

export async function deleteBlogPostAction(id: string): Promise<ActionResult> {
  const guard = await requireSuperAdminAction();
  if (!guard.ok) return { error: guard.error };

  const result = await getDataRepository().deleteBlogPost(id);
  if (result.error) return { error: "actions.errors.generic" };

  revalidateBlog();
  return { success: true };
}

/**
 * Clears the cached copy of every page a post appears on.
 *
 * A post is not one page. It is the post itself, the index, the category page
 * for each of its categories, the hub for each of its languages, the feed, and
 * the sitemap — and the blog refactor turned the categories and hubs into real
 * routes, so revalidating `/blog` alone now leaves six stale pages behind
 * instead of none. Editing a post used to be the only way to notice.
 *
 * Called with no arguments when a post is deleted: the slug is gone, and
 * everything a deletion could affect is in the list below anyway.
 */
function revalidateBlog(
  slug?: string,
  categorySlugs: string[] = [],
  languageSlugs: string[] = []
) {
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/sitemap.xml");
  revalidatePath("/blog/rss.xml");
  revalidatePath("/llms.txt");

  if (slug) revalidatePath(`/blog/${slug}`);

  for (const categorySlug of categorySlugs) {
    revalidatePath(`/blog/category/${categorySlug}`);
  }
  for (const languageSlug of languageSlugs) {
    revalidatePath(`/blog/language/${languageSlug}`);
  }
}

export type BlogImageUploadState = {
  error?: string;
  image?: BlogImage;
};

/**
 * Takes one uploaded picture into the blog's own image store.
 *
 * Super-admin only, like the rest of the blog: an upload endpoint is the most
 * attractive thing on any admin panel, and the bytes it writes are served back
 * from this site's own origin. What actually protects that is layered — this
 * guard, a type allowlist checked against the file's magic numbers rather than
 * its name, a size ceiling, and a serving route that sandboxes the response so
 * a crafted file is inert even if one of the above is wrong one day.
 */
export async function uploadBlogImageAction(
  formData: FormData
): Promise<BlogImageUploadState> {
  const guard = await requireSuperAdminAction();
  if (!guard.ok) return { error: "دسترسی ندارید." };

  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "فایلی انتخاب نشده." };
  }

  const altRaw = String(formData.get("altText") ?? "").trim();

  const result = await getDataRepository().uploadBlogImage(
    file,
    altRaw.length > 0 ? altRaw : null,
    guard.profile.id
  );

  if (result.error || !result.image) {
    return { error: resolveUploadError(result.error) };
  }

  return { image: result.image };
}

export async function updateBlogImageAltAction(
  id: string,
  altText: string
): Promise<ActionResult> {
  const guard = await requireSuperAdminAction();
  if (!guard.ok) return { error: guard.error };

  const trimmed = altText.trim();
  const result = await getDataRepository().updateBlogImageAlt(
    id,
    trimmed.length > 0 ? trimmed : null
  );
  if (result.error) return { error: "actions.errors.generic" };

  return { success: true };
}

/**
 * Removes an image from the store.
 *
 * Nothing checks whether a post still points at it. That check would have to
 * scan the markdown of every post for the URL, and it would still be wrong the
 * moment a draft elsewhere referenced it — so the editor warns before deleting
 * and a mistake costs a broken image, not a broken page.
 */
export async function deleteBlogImageAction(id: string): Promise<ActionResult> {
  const guard = await requireSuperAdminAction();
  if (!guard.ok) return { error: guard.error };

  const result = await getDataRepository().deleteBlogImage(id);
  if (result.error) return { error: "actions.errors.generic" };

  return { success: true };
}

/** The validator speaks in message keys; the editor shows Persian. */
function resolveUploadError(error?: string): string {
  switch (error) {
    case "admin.blog.images.errors.invalidType":
      return "فقط JPEG، PNG، WebP و GIF.";
    case "admin.blog.images.errors.tooLarge":
      return "عکس باید کمتر از ۴ مگابایت باشد.";
    case "admin.blog.images.errors.notAnImage":
      return "محتوای فایل با یک عکس سالم نمی‌خواند.";
    default:
      return "آپلود نشد. دوباره تلاش کنید.";
  }
}
