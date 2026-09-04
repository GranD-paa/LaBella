"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { deleteBlogPostAction } from "@/app/admin/actions/blog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatBlogDate } from "@/lib/blog/format";
import type { BlogCategory, BlogPost } from "@/lib/blog/types";

export function BlogPostList({
  posts,
  categories,
}: {
  posts: BlogPost[];
  categories: BlogCategory[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const published = posts.filter((post) => post.status === "published").length;

  function remove(post: BlogPost) {
    startTransition(async () => {
      const result = await deleteBlogPostAction(post.id);
      setConfirmingId(null);

      if ("error" in result) {
        toast.error("حذف نشد.");
        return;
      }
      toast.success("مطلب حذف شد.");
      router.refresh();
    });
  }

  return (
    <div className="space-y-8" dir="rtl">
      <section className="brand-surface relative overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-0 bg-brand-gradient opacity-25" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <Badge className="border-brand-accent/30 bg-brand-accent/10 text-brand-accent">
              <FileText className="me-1 h-3 w-3" />
              وبلاگ
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              مطالب وبلاگ
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              {posts.length.toLocaleString("fa-IR")} مطلب، که{" "}
              {published.toLocaleString("fa-IR")} تای آن منتشر شده است.
            </p>
            <div>
              <Button asChild>
                <Link href="/admin/blog/new">
                  <Plus className="me-1 h-4 w-4" />
                  مطلب جدید
                </Link>
              </Button>
            </div>
          </div>

          <Button variant="outline" className="border-white/20" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
              بازگشت به داشبورد
            </Link>
          </Button>
        </div>
      </section>

      <Card className="brand-surface">
        <CardHeader className="space-y-1">
          <CardTitle>همهٔ مطالب</CardTitle>
          <CardDescription>
            پیش‌نویس‌ها فقط برای شما دیده می‌شوند و در نقشهٔ سایت نمی‌آیند.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {posts.length === 0 ? (
            <p className="rounded-lg border border-white/10 p-8 text-center text-muted-foreground">
              هنوز مطلبی ننوشته‌اید.
            </p>
          ) : (
            <ul className="divide-y divide-white/10 overflow-hidden rounded-lg border border-white/10">
              {posts.map((post) => {
                const postCategories = categories
                  .filter((category) =>
                    post.categorySlugs.includes(category.slug)
                  )
                  .map((category) => category.name);

                return (
                  <li key={post.id} className="px-4 py-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="flex flex-wrap items-center gap-2 font-medium">
                          {post.title}
                          {post.status === "published" ? (
                            <Badge className="border-brand-accent/30 bg-brand-accent/10 text-brand-accent">
                              منتشرشده
                            </Badge>
                          ) : (
                            <Badge variant="secondary">پیش‌نویس</Badge>
                          )}
                          {post.noindex ? (
                            <Badge variant="secondary" className="text-xs">
                              بدون ایندکس
                            </Badge>
                          ) : null}
                        </p>

                        <p className="mt-1 truncate text-sm text-muted-foreground">
                          /blog/{post.slug}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {post.publishedAt
                            ? formatBlogDate(post.publishedAt)
                            : `آخرین ویرایش ${formatBlogDate(post.updatedAt)}`}
                          {postCategories.length > 0
                            ? ` · ${postCategories.join("، ")}`
                            : ""}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        {post.status === "published" ? (
                          <Button asChild variant="ghost" size="sm">
                            <a
                              href={`/blog/${post.slug}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span className="sr-only">دیدن روی سایت</span>
                            </a>
                          </Button>
                        ) : null}

                        <Button asChild variant="outline" size="sm">
                          <Link href={`/admin/blog/${post.id}`}>
                            <Pencil className="me-1 h-4 w-4" />
                            ویرایش
                          </Link>
                        </Button>

                        {confirmingId === post.id ? (
                          <>
                            <Button
                              variant="destructive"
                              size="sm"
                              disabled={isPending}
                              onClick={() => remove(post)}
                            >
                              مطمئنم، حذف کن
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setConfirmingId(null)}
                            >
                              لغو
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setConfirmingId(post.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                            <span className="sr-only">حذف</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
