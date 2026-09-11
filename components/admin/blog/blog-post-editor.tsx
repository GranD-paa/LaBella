"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, PenLine, Star } from "lucide-react";
import { toast } from "sonner";

import { saveBlogPostAction } from "@/app/admin/actions/blog";
import { BlogImageLibrary } from "@/components/admin/blog/blog-image-library";
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
import { BLOG_LANGUAGES } from "@/lib/blog/languages";
import { renderMarkdown } from "@/lib/blog/markdown";
import {
  slugifyTitle,
  type BlogCategory,
  type BlogImage,
  type BlogPost,
} from "@/lib/blog/types";
import { cn } from "@/lib/utils";

/** What Google shows before it truncates. Advisory, never enforced. */
const META_TITLE_LIMIT = 60;
const META_DESCRIPTION_LIMIT = 160;

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
  images,
}: {
  post: BlogPost | null;
  categories: BlogCategory[];
  images: BlogImage[];
}) {
  const router = useRouter();
  const [state, formAction] = useFormState(saveBlogPostAction, {});

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [content, setContent] = useState(post?.content ?? "");
  const [showPreview, setShowPreview] = useState(false);
  const [coverUrl, setCoverUrl] = useState(post?.coverImageUrl ?? "");
  const [coverAlt, setCoverAlt] = useState(post?.coverImageAlt ?? "");
  const [metaTitle, setMetaTitle] = useState(post?.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(
    post?.metaDescription ?? ""
  );
  const [summary, setSummary] = useState(post?.summary ?? "");

  const contentRef = useRef<HTMLTextAreaElement>(null);

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

  /**
   * Drops an image's markdown where the cursor is.
   *
   * Appending to the end would be simpler and wrong: an author inserts a
   * picture at the paragraph they just finished, and having every one land
   * after the closing line means moving each of them by hand afterwards.
   */
  function insertImage(image: BlogImage) {
    const snippet = `\n\n![${image.altText ?? ""}](${image.url})\n\n`;
    const field = contentRef.current;

    if (!field) {
      setContent((current) => current + snippet);
      return;
    }

    const start = field.selectionStart;
    const end = field.selectionEnd;
    const next = content.slice(0, start) + snippet + content.slice(end);
    setContent(next);

    // After React re-renders with the new value the caret would otherwise jump
    // to the end, which puts the next thing typed a long way from the picture.
    requestAnimationFrame(() => {
      field.focus();
      const caret = start + snippet.length;
      field.setSelectionRange(caret, caret);
    });
  }

  function useAsCover(image: BlogImage) {
    setCoverUrl(image.url);
    if (image.altText) setCoverAlt(image.altText);
    toast.success("به‌عنوان تصویر شاخص انتخاب شد.");
  }

  // What the search result will read like. Shown rather than described because
  // "about 60 characters" is abstract and a truncated headline is not.
  const previewTitle = (metaTitle || title || "عنوان مطلب").trim();
  const previewDescription = (
    metaDescription ||
    summary ||
    "توضیحی برای این مطلب نوشته نشده؛ گوگل خودش از متن برمی‌دارد."
  ).trim();

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

      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
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
                <Label htmlFor="summary">خلاصهٔ کوتاه</Label>
                <Textarea
                  id="summary"
                  name="summary"
                  value={summary}
                  onChange={(event) => setSummary(event.target.value)}
                  rows={3}
                  className="mt-1.5"
                  placeholder="جواب سؤال مطلب، در دو سه جمله."
                />
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  بالای مطلب توی یک کادر نشان داده می‌شود و همین متن است که
                  موتورهای جست‌وجو و دستیارهای هوش مصنوعی مستقیم نقل می‌کنند.
                  جوری بنویسیدش که بیرون از مطلب هم معنی بدهد.
                </p>
              </div>

              <div>
                <Label htmlFor="excerpt">لید</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  defaultValue={post?.excerpt ?? ""}
                  rows={2}
                  className="mt-1.5"
                  placeholder="اگر خالی بگذارید، از ابتدای متن ساخته می‌شود."
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  زیر تیتر و روی کارت مطلب می‌آید.
                </p>
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
                    ref={contentRef}
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    rows={24}
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

                <p className="mt-2 text-xs text-muted-foreground">
                  تیترهای «## » و «### » خودشان فهرست مطالب بالای صفحه را
                  می‌سازند — از سه تیتر به بالا.
                </p>
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
              {/* A mock search result. The counters next to each field say how
                  many characters are left before Google cuts the line off —
                  advisory, because the limit is measured in pixels and varies,
                  so enforcing it would block legitimate titles. */}
              <div className="rounded-lg border border-white/10 bg-background/40 p-4">
                <p className="text-xs text-muted-foreground">
                  پیش‌نمایش نتیجهٔ جست‌وجو
                </p>
                <p className="mt-2 text-xs text-muted-foreground" dir="ltr">
                  laparli.com › blog › {slug || "…"}
                </p>
                <p className="mt-1 line-clamp-1 text-base text-[#8ab4f8]">
                  {previewTitle}
                </p>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {previewDescription}
                </p>
              </div>

              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <Label htmlFor="metaTitle">عنوان سئو</Label>
                  <Counter value={metaTitle} limit={META_TITLE_LIMIT} />
                </div>
                <Input
                  id="metaTitle"
                  name="metaTitle"
                  value={metaTitle}
                  onChange={(event) => setMetaTitle(event.target.value)}
                  className="mt-1.5"
                />
              </div>

              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <Label htmlFor="metaDescription">توضیح متا</Label>
                  <Counter
                    value={metaDescription}
                    limit={META_DESCRIPTION_LIMIT}
                  />
                </div>
                <Textarea
                  id="metaDescription"
                  name="metaDescription"
                  value={metaDescription}
                  onChange={(event) => setMetaDescription(event.target.value)}
                  rows={2}
                  className="mt-1.5"
                  placeholder="خالی = از خلاصهٔ کوتاه یا لید ساخته می‌شود."
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
                    مطلب روی سایت می‌ماند ولی در نتایج جست‌وجو، نقشهٔ سایت و
                    خوراک RSS نمی‌آید.
                  </span>
                </span>
              </label>
            </CardContent>
          </Card>

          <Card className="brand-surface">
            <CardHeader>
              <CardTitle>عکس‌ها</CardTitle>
              <CardDescription>
                عکس‌ها روی سرور خودمان ذخیره می‌شوند. «درج در متن» مارک‌داونش را
                همان‌جا که نشانگر است می‌گذارد.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BlogImageLibrary
                initialImages={images}
                onInsert={insertImage}
                onUseAsCover={useAsCover}
              />
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

              <label className="flex items-start gap-3 rounded-lg border border-white/10 p-3">
                <input
                  type="checkbox"
                  name="featured"
                  defaultChecked={post?.featured ?? false}
                  className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]"
                />
                <span className="text-sm">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Star className="h-3.5 w-3.5 text-brand-accent" />
                    مطلب شاخص
                  </span>
                  <span className="mt-1 block text-muted-foreground">
                    بالای فهرست وبلاگ می‌نشیند، بدون اینکه تاریخش عوض شود.
                  </span>
                </span>
              </label>
            </CardContent>
          </Card>

          <Card className="brand-surface">
            <CardHeader>
              <CardTitle>تصویر شاخص</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {coverUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={coverUrl}
                  alt=""
                  className="aspect-[16/9] w-full rounded-lg border border-white/10 object-cover"
                />
              ) : null}

              <div>
                <Label htmlFor="coverImageUrl">نشانی تصویر</Label>
                <Input
                  id="coverImageUrl"
                  name="coverImageUrl"
                  value={coverUrl}
                  onChange={(event) => setCoverUrl(event.target.value)}
                  dir="ltr"
                  className="mt-1.5 text-start"
                  placeholder="از بخش عکس‌ها انتخاب کنید یا نشانی بگذارید"
                />
                <FieldError message={state.fieldErrors?.coverImageUrl} />
              </div>

              <div>
                <Label htmlFor="coverImageAlt">متن جایگزین</Label>
                <Input
                  id="coverImageAlt"
                  name="coverImageAlt"
                  value={coverAlt}
                  onChange={(event) => setCoverAlt(event.target.value)}
                  className="mt-1.5"
                  placeholder="برای تصویر تزئینی خالی بگذارید"
                  maxLength={300}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="brand-surface">
            <CardHeader>
              <CardTitle>دسته‌بندی</CardTitle>
              <CardDescription>
                دستهٔ اول روی کارت مطلب و در مسیر بالای صفحه نشان داده می‌شود.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <CheckRow
                      name="categorySlugs"
                      value={category.slug}
                      defaultChecked={post?.categorySlugs.includes(
                        category.slug
                      )}
                    >
                      {category.name}
                    </CheckRow>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="brand-surface">
            <CardHeader>
              <CardTitle>زبان مطلب</CardTitle>
              <CardDescription>
                مطلب در صفحهٔ همان زبان هم نشان داده می‌شود. اگر دربارهٔ زبان
                خاصی نیست، خالی بگذارید.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {BLOG_LANGUAGES.map((language) => (
                  <li key={language.slug}>
                    <CheckRow
                      name="languageSlugs"
                      value={language.slug}
                      defaultChecked={post?.languageSlugs.includes(
                        language.slug
                      )}
                    >
                      <span className="flex w-full items-center justify-between gap-2">
                        {language.name}
                        <span
                          dir="ltr"
                          className="text-xs text-muted-foreground"
                        >
                          {language.nativeName}
                        </span>
                      </span>
                    </CheckRow>
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

function CheckRow({
  name,
  value,
  defaultChecked,
  children,
}: {
  name: string;
  value: string;
  defaultChecked?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-lg border border-white/10 p-3 text-sm transition-colors",
        "hover:border-primary/40"
      )}
    >
      <input
        type="checkbox"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="h-4 w-4 shrink-0 accent-[hsl(var(--primary))]"
      />
      {children}
    </label>
  );
}

function Counter({ value, limit }: { value: string; limit: number }) {
  const length = value.trim().length;
  if (length === 0) return null;

  return (
    <span
      className={cn(
        "text-xs tabular-nums",
        length > limit ? "text-destructive" : "text-muted-foreground"
      )}
    >
      {length.toLocaleString("fa-IR")}/{limit.toLocaleString("fa-IR")}
    </span>
  );
}
