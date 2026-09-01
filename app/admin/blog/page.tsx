import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { BlogPostList } from "@/components/admin/blog/blog-post-list";
import { getDataRepository } from "@/lib/data";
import { requireAdmin } from "@/lib/supabase/admin-guard";

export const metadata: Metadata = { title: "وبلاگ — مدیریت" };

export default async function AdminBlogPage() {
  const { profile } = await requireAdmin();
  if (profile.role !== "super_admin") redirect("/admin");

  const repo = getDataRepository();
  const [posts, categories] = await Promise.all([
    repo.getBlogPostsForAdmin(),
    repo.getBlogCategories(),
  ]);

  return <BlogPostList posts={posts} categories={categories} />;
}
