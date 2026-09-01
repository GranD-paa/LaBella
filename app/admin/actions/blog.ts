"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireSuperAdminAction } from "@/lib/auth/action-guards";
import {
  estimateReadingMinutes,
  markdownToPlainText,
} from "@/lib/blog/markdown";
import { slugifyTitle } from "@/lib/blog/types";
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
  content: z.string().min(1, "متن مطلب خالی است."),
  coverImageUrl: optionalUrl,
  status: z.enum(["draft", "published"]),
  metaTitle: optionalText,
  metaDescription: optionalText,
  canonicalUrl: optionalUrl,
  ogImageUrl: optionalUrl,
  noindex: z.boolean(),
  categorySlugs: z.array(z.string()),
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
    content: String(formData.get("content") ?? ""),
    coverImageUrl: String(formData.get("coverImageUrl") ?? ""),
    status: formData.get("status") === "published" ? "published" : "draft",
    metaTitle: String(formData.get("metaTitle") ?? ""),
    metaDescription: String(formData.get("metaDescription") ?? ""),
    canonicalUrl: String(formData.get("canonicalUrl") ?? ""),
    ogImageUrl: String(formData.get("ogImageUrl") ?? ""),
    noindex: formData.get("noindex") === "on",
    categorySlugs: formData.getAll("categorySlugs").map(String),
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

  revalidatePath("/blog");
  revalidatePath(`/blog/${input.slug}`);
  revalidatePath("/admin/blog");
  revalidatePath("/sitemap.xml");

  return { success: true, id: result.id };
}

export async function deleteBlogPostAction(id: string): Promise<ActionResult> {
  const guard = await requireSuperAdminAction();
  if (!guard.ok) return { error: guard.error };

  const result = await getDataRepository().deleteBlogPost(id);
  if (result.error) return { error: "actions.errors.generic" };

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/sitemap.xml");
  return { success: true };
}
