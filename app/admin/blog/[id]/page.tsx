import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { BlogPostEditor } from "@/components/admin/blog/blog-post-editor";
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
  const categories = await repo.getBlogCategories();

  if (id === "new") {
    return <BlogPostEditor post={null} categories={categories} />;
  }

  const post = await repo.getBlogPostById(id);
  if (!post) notFound();

  return <BlogPostEditor post={post} categories={categories} />;
}
