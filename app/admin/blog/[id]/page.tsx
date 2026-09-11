import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { BlogPostEditor } from "@/components/admin/blog/blog-post-editor";
import { ErrorState } from "@/components/errors/error-state";
import { getDataRepository } from "@/lib/data";
import { requireAdmin } from "@/lib/supabase/admin-guard";

export const metadata: Metadata = { title: "ویرایش مطلب — مدیریت" };

/** `/admin/blog/new` creates; any other id edits that post. */
export default async function AdminBlogEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { profile } = await requireAdmin();
  if (profile.role !== "super_admin") redirect("/admin");

  const { id } = await params;
  const repo = getDataRepository();

  // Same guard as the list at `/admin/blog`: a database without
  // db/004_landing_and_blog.sql has no blog tables, and the editor should say
  // so rather than answer a link in the panel with a 500.
  //
  // The image library is read alongside but guarded separately, and less
  // strictly: `blog_images` arrived in db/009_blog_refactor.sql, so a database
  // with the posts but not that migration should still open the editor and
  // simply have nothing in the picker. Failing the whole screen over it would
  // take away the ability to write while the migration is pending.
  const [categories, images] = await Promise.all([
    repo.getBlogCategories().catch((error) => {
      console.error("[admin/blog] failed to load categories", error);
      return null;
    }),
    repo.listBlogImages().catch((error) => {
      console.error("[admin/blog] failed to load images", error);
      return [];
    }),
  ]);

  if (!categories) {
    return (
      <ErrorState
        title="ویرایشگر باز نشد"
        description="جدول‌های وبلاگ روی این دیتابیس در دسترس نیستند. اگر مایگریشن db/004_landing_and_blog.sql هنوز روی این دیتابیس اجرا نشده، اجرایش کن؛ در غیر این صورت متن خطا در لاگ کانتینر هست."
      />
    );
  }

  if (id === "new") {
    return (
      <BlogPostEditor post={null} categories={categories} images={images} />
    );
  }

  // `notFound()` below stays outside the guard: a post that does not exist is
  // a 404, not a broken page, and catching it would turn one into the other.
  const post = await repo.getBlogPostById(id).catch((error) => {
    console.error("[admin/blog] failed to load post", error);
    return null;
  });
  if (!post) notFound();

  return (
    <BlogPostEditor post={post} categories={categories} images={images} />
  );
}
