"use client";

import { useEffect, useMemo, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, PenLine } from "lucide-react";
import { toast } from "sonner";

import { saveBlogPostAction } from "@/app/admin/actions/blog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { renderMarkdown } from "@/lib/blog/markdown";
import { slugifyTitle, type BlogCategory, type BlogPost } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "در حال ذخیره…" : "ذخیره"}
    </Button>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-sm text-destructive">{message}</p>;
}

export function BlogPostEditor({
  post,
  categories,
}: {
  post: BlogPost | null;
  categories: BlogCategory[];
}) {
  const router = useRouter();
  const [state, formAction] = useFormState(saveBlogPostAction, {});

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [content, setContent] = useState(post?.content ?? "");
  const [showPreview, setShowPreview] = useState(false);

  // The slug follows the title until the author edits it by hand, at which
  // point it stops moving — changing a published URL silently would drop its
  // search ranking and break every existing link to it.
  useEffect(() => {
    if (!slugTouched) setSlug(slugifyTitle(title));
  }, [title, slugTouched]);

  useEffect(() => {
    if (state.success) {
      toast.success("ذخیره شد.");
      router.push("/admin/blog");
      router.refresh();
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  const previewHtml = useMemo(
    () => (showPreview ? renderMarkdown(content) : ""),
    [showPreview, content]
  );

  return (
    <form action={formAction} className="space-y-8" dir="rtl">
      {post ? <input type="hidden" name="id" value={post.id} /> : null}

      <section className="brand-surface relative overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-0 bg-brand-gradient opacity-25" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <Badge className="border-brand-accent/30 bg-brand-accent/10 text-brand-accent">
              <PenLine className="me-1 h-3 w-3" />
              {post ? "ویرایش مطلب" : "مطلب جدید"}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight">
              {post ? post.title : "نوشتن مطلب تازه"}
            </h1>
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/blog">
                <ArrowRight className="me-1 h-4 w-4" />
                بازگشت به فهرست
              </Link>
            </Button>
          </div>
          <SubmitButton />
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-8">
          <Card className="brand-surface">
            <CardHeader>
              <CardTitle>متن مطلب</CardTitle>
              <CardDescription>
                با مارک‌داون بنویسید. تگ‌های HTML خام هنگام انتشار حذف می‌شوند.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <div>
                <Label htmlFor="title">عنوان</Label>
                <Input
                  id="title"
                  name="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                  className="mt-1.5"
                />
                <FieldError message={state.fieldErrors?.title} />
              </div>

              <div>
                <Label htmlFor="slug">نشانی مطلب</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={slug}
                  onChange={(event) => {
                    setSlugTouched(true);
                    setSlug(event.target.value);
                  }}
                  dir="ltr"
                  className="mt-1.5 text-start"
                />
                <p className="mt-1 text-xs text-muted-foreground" dir="ltr">
                  /blog/{slug || "…"}
                </p>
                <FieldError message={state.fieldErrors?.slug} />
              </div>

              <div>
                <Label htmlFor="excerpt">خلاصه</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  defaultValue={post?.excerpt ?? ""}
                  rows={3}
                  className="mt-1.5"
                  placeholder="اگر خالی بگذارید، از ابتدای متن ساخته می‌شود."
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="content">متن (مارک‌داون)</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPreview((value) => !value)}
                  >
                    <Eye className="me-1 h-4 w-4" />
                    {showPreview ? "ویرایش" : "پیش‌نمایش"}
                  </Button>
                </div>

                {showPreview ? (
                  <div
                    className="blog-prose mt-1.5 min-h-[24rem] rounded-lg border border-white/10 bg-background/40 p-5"
                    dangerouslySetInnerHTML={{ __html: previewHtml }}
                  />
                ) : (
                  <Textarea
                    id="content"
                    name="content"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    rows={22}
                    required
                    className="mt-1.5 font-mono text-sm leading-relaxed"
                  />
                )}

                {/* The textarea is unmounted in preview mode, so the value
                    still has to reach the form on submit. */}
                {showPreview ? (
                  <input type="hidden" name="content" value={content} />
                ) : null}
                <FieldError message={state.fieldErrors?.content} />
              </div>
            </CardContent>
          </Card>

          <Card className="brand-surface">
            <CardHeader>
              <CardTitle>سئو</CardTitle>
              <CardDescription>
                هر کدام را خالی بگذارید، از عنوان و خلاصهٔ خود مطلب ساخته
                می‌شود. فقط جایی پرشان کنید که می‌خواهید نتیجهٔ گوگل با تیتر
                صفحه فرق کند.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <div>
                <Label htmlFor="metaTitle">عنوان سئو</Label>
                <Input
                  id="metaTitle"
                  name="metaTitle"
                  defaultValue={post?.metaTitle ?? ""}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="metaDescription">توضیح متا</Label>
                <Textarea
                  id="metaDescription"
                  name="metaDescription"
                  defaultValue={post?.metaDescription ?? ""}
                  rows={2}
                  className="mt-1.5"
                  placeholder="حدود ۱۵۰ تا ۱۶۰ نویسه بهترین نتیجه را می‌دهد."
                />
              </div>

              <div>
                <Label htmlFor="canonicalUrl">نشانی کنونیکال</Label>
                <Input
                  id="canonicalUrl"
                  name="canonicalUrl"
                  defaultValue={post?.canonicalUrl ?? ""}
                  dir="ltr"
                  className="mt-1.5 text-start"
                  placeholder="فقط اگر همین مطلب جای دیگری هم منتشر شده"
                />
                <FieldError message={state.fieldErrors?.canonicalUrl} />
              </div>

              <div>
                <Label htmlFor="ogImageUrl">تصویر اشتراک‌گذاری</Label>
                <Input
                  id="ogImageUrl"
                  name="ogImageUrl"
                  defaultValue={post?.ogImageUrl ?? ""}
                  dir="ltr"
                  className="mt-1.5 text-start"
                  placeholder="خالی = همان تصویر شاخص"
                />
                <FieldError message={state.fieldErrors?.ogImageUrl} />
              </div>

              <label className="flex items-start gap-3 rounded-lg border border-white/10 p-4">
                <input
                  type="checkbox"
                  name="noindex"
                  defaultChecked={post?.noindex ?? false}
                  className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]"
                />
                <span className="text-sm">
                  <span className="font-medium">از ایندکس گوگل خارج شود</span>
                  <span className="mt-1 block text-muted-foreground">
                    مطلب روی سایت می‌ماند ولی در نتایج جست‌وجو و نقشهٔ سایت
                    نمی‌آید.
                  </span>
                </span>
              </label>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-8">
          <Card className="brand-surface">
            <CardHeader>
              <CardTitle>انتشار</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">وضعیت</Label>
                <select
                  id="status"
                  name="status"
                  defaultValue={post?.status ?? "draft"}
                  className="mt-1.5 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="draft">پیش‌نویس</option>
                  <option value="published">منتشرشده</option>
                </select>
                <p className="mt-2 text-xs text-muted-foreground">
                  تاریخ انتشار همان بار اول ثبت می‌شود و با ویرایش‌های بعدی
                  عوض نمی‌شود.
                </p>
              </div>

              <div>
                <Label htmlFor="coverImageUrl">تصویر شاخص</Label>
                <Input
                  id="coverImageUrl"
                  name="coverImageUrl"
                  defaultValue={post?.coverImageUrl ?? ""}
                  dir="ltr"
                  className="mt-1.5 text-start"
                  placeholder="https://…"
                />
                <FieldError message={state.fieldErrors?.coverImageUrl} />
              </div>
            </CardContent>
          </Card>

          <Card className="brand-surface">
            <CardHeader>
              <CardTitle>دسته‌بندی</CardTitle>
              <CardDescription>
                دستهٔ اول روی کارت مطلب نشان داده می‌شود.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <label
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-lg border border-white/10 p-3 text-sm transition-colors",
                        "hover:border-primary/40"
                      )}
                    >
                      <input
                        type="checkbox"
                        name="categorySlugs"
                        value={category.slug}
                        defaultChecked={post?.categorySlugs.includes(
                          category.slug
                        )}
                        className="h-4 w-4 accent-[hsl(var(--primary))]"
                      />
                      {category.name}
                    </label>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
    </form>
  );
}
