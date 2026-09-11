import type { Metadata } from "next";

import { BlogPostList } from "@/components/admin/blog/blog-post-list";
import { ErrorState } from "@/components/errors/error-state";
import { getDataRepository } from "@/lib/data";
import { requireAdminPage } from "@/lib/supabase/admin-guard";

export const metadata: Metadata = { title: "وبلاگ — مدیریت" };

export default async function AdminBlogPage() {
  await requireAdminPage("manageBlog");

  const repo = getDataRepository();

  // The public `/blog` already degrades to an empty list when the blog tables
  // are missing — `db/004_landing_and_blog.sql` not yet run against this
  // database — and this panel used to be the one place that still threw,
  // which is how that missing migration showed up: as a 500 on a link in the
  // admin dashboard rather than as anything naming a migration.
  //
  // The guards sit on the reads only. `requireAdminPage()` above redirects by
  // throwing, and catching that would turn a bounce into a blank page.
  const [posts, categories] = await Promise.all([
    repo.getBlogPostsForAdmin().catch((error) => {
      console.error("[admin/blog] failed to load posts", error);
      return null;
    }),
    repo.getBlogCategories().catch((error) => {
      console.error("[admin/blog] failed to load categories", error);
      return null;
    }),
  ]);

  // An empty list and an unreadable one look identical on screen, so a failed
  // read says so rather than quietly claiming there are no posts.
  if (!posts || !categories) {
    return (
      <ErrorState
        title="مطالب وبلاگ خوانده نشد"
        description="جدول‌های وبلاگ روی این دیتابیس در دسترس نیستند. اگر مایگریشن db/004_landing_and_blog.sql هنوز روی این دیتابیس اجرا نشده، اجرایش کن؛ در غیر این صورت متن خطا در لاگ کانتینر هست."
      />
    );
  }

  return <BlogPostList posts={posts} categories={categories} />;
}
