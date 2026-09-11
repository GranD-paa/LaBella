"use client";

import {
  useCallback,
  useRef,
  useState,
  useTransition,
  type DragEvent,
} from "react";
import { Check, ImagePlus, Loader2, Trash2, UploadCloud, X } from "lucide-react";
import { toast } from "sonner";

import {
  deleteBlogImageAction,
  updateBlogImageAltAction,
  uploadBlogImageAction,
} from "@/app/admin/actions/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ALLOWED_BLOG_IMAGE_TYPES,
  MAX_BLOG_IMAGE_BYTES,
} from "@/lib/data/blog-image";
import type { BlogImage } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

const ACCEPTED = Object.keys(ALLOWED_BLOG_IMAGE_TYPES);

/**
 * The blog's picture drawer: upload, browse, insert, set as cover.
 *
 * ## Why the alt text is asked for at upload time
 *
 * Because that is the only moment the person has the picture in front of them
 * and knows what it shows. Asked for later, in a separate accessibility pass,
 * it gets filled with the filename or skipped — which is how a blog ends up
 * with forty images described as "image1.png" and a screen-reader user gets a
 * list of filenames instead of an article. It stays editable afterwards, but
 * the default moment to write it is here.
 *
 * The field is optional on purpose. A decorative picture — a texture, a
 * divider — is correctly described by nothing at all, and forcing a sentence
 * out of an author for one of those produces noise a screen reader then has to
 * read aloud.
 */
export function BlogImageLibrary({
  initialImages,
  onInsert,
  onUseAsCover,
}: {
  initialImages: BlogImage[];
  /** Drops markdown for this image at the cursor in the content field. */
  onInsert: (image: BlogImage) => void;
  onUseAsCover: (image: BlogImage) => void;
}) {
  const [images, setImages] = useState(initialImages);
  const [isUploading, startUpload] = useTransition();
  const [isDragging, setIsDragging] = useState(false);
  const [altDraft, setAltDraft] = useState("");
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [justInserted, setJustInserted] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(
    (file: File | undefined | null) => {
      if (!file) return;

      // Checked here as well as on the server, purely so the person finds out
      // now instead of after pushing four megabytes up a home connection.
      if (!ACCEPTED.includes(file.type)) {
        toast.error("فقط JPEG، PNG، WebP و GIF.");
        return;
      }
      if (file.size > MAX_BLOG_IMAGE_BYTES) {
        toast.error("عکس باید کمتر از ۴ مگابایت باشد.");
        return;
      }

      const formData = new FormData();
      formData.set("image", file);
      formData.set("altText", altDraft);

      startUpload(async () => {
        const result = await uploadBlogImageAction(formData);
        if (result.error || !result.image) {
          toast.error(result.error ?? "آپلود نشد.");
          return;
        }

        setImages((current) => [result.image!, ...current]);
        setAltDraft("");
        if (inputRef.current) inputRef.current.value = "";
        toast.success("عکس آپلود شد.");
      });
    },
    [altDraft]
  );

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    upload(event.dataTransfer.files[0]);
  }

  function insert(image: BlogImage) {
    onInsert(image);
    setJustInserted(image.id);
    window.setTimeout(() => setJustInserted(null), 1600);
  }

  function remove(image: BlogImage) {
    setConfirmingId(null);
    void deleteBlogImageAction(image.id).then((result) => {
      if ("error" in result) {
        toast.error("حذف نشد.");
        return;
      }
      setImages((current) => current.filter((entry) => entry.id !== image.id));
      toast.success("عکس حذف شد.");
    });
  }

  function saveAlt(image: BlogImage, value: string) {
    if (value === (image.altText ?? "")) return;

    // Optimistic: the field already shows what the person typed, and putting a
    // spinner on a blur event would make writing alt text feel like filing a
    // form. A failure says so and the next save retries it.
    setImages((current) =>
      current.map((entry) =>
        entry.id === image.id ? { ...entry, altText: value || null } : entry
      )
    );

    void updateBlogImageAltAction(image.id, value).then((result) => {
      if ("error" in result) toast.error("متن جایگزین ذخیره نشد.");
    });
  }

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="blog-image-alt">متن جایگزین عکس بعدی</Label>
        <Input
          id="blog-image-alt"
          value={altDraft}
          onChange={(event) => setAltDraft(event.target.value)}
          placeholder="چه چیزی در عکس است؟ برای عکس تزئینی خالی بگذارید."
          maxLength={300}
        />
      </div>

      <div
        role="button"
        tabIndex={0}
        aria-label="انتخاب عکس برای آپلود"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "flex min-h-[8rem] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-colors",
          isDragging
            ? "border-brand-accent bg-brand-accent/10"
            : "border-white/15 bg-muted/10 hover:border-white/25"
        )}
      >
        {isUploading ? (
          <>
            <Loader2 className="h-7 w-7 animate-spin text-muted-foreground" />
            <p className="text-sm">در حال آپلود…</p>
          </>
        ) : (
          <>
            <UploadCloud className="h-7 w-7 text-muted-foreground" />
            <p className="text-sm font-medium">
              عکس را بکشید اینجا، یا کلیک کنید
            </p>
            <p className="text-xs text-muted-foreground">
              JPEG، PNG، WebP یا GIF — حداکثر ۴ مگابایت
            </p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED.join(",")}
          className="hidden"
          onChange={(event) => upload(event.target.files?.[0])}
        />
      </div>

      {images.length === 0 ? (
        <p className="rounded-lg border border-white/10 p-6 text-center text-sm text-muted-foreground">
          هنوز عکسی آپلود نشده.
        </p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {images.map((image) => (
            <li
              key={image.id}
              className="overflow-hidden rounded-xl border border-white/10 bg-muted/10"
            >
              {/* Uploaded bytes from this app's own store, at whatever size the
                  admin uploaded. next/image would want the host allowlisted and
                  would resize a picture nobody is looking at closely. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.url}
                alt={image.altText ?? ""}
                className="aspect-[16/10] w-full bg-black/20 object-contain"
                loading="lazy"
                decoding="async"
              />

              <div className="space-y-2.5 p-3">
                <Input
                  defaultValue={image.altText ?? ""}
                  onBlur={(event) => saveAlt(image, event.target.value.trim())}
                  placeholder="متن جایگزین"
                  aria-label={`متن جایگزین برای ${
                    image.originalName ?? "این عکس"
                  }`}
                  className="h-9 text-xs"
                  maxLength={300}
                />

                <p className="text-[0.7rem] text-muted-foreground" dir="ltr">
                  {image.width && image.height
                    ? `${image.width}×${image.height} · `
                    : ""}
                  {formatBytes(image.byteSize)}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-8 text-xs"
                    onClick={() => insert(image)}
                  >
                    {justInserted === image.id ? (
                      <>
                        <Check className="me-1 h-3.5 w-3.5" />
                        درج شد
                      </>
                    ) : (
                      <>
                        <ImagePlus className="me-1 h-3.5 w-3.5" />
                        درج در متن
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-8 text-xs"
                    onClick={() => onUseAsCover(image)}
                  >
                    تصویر شاخص
                  </Button>

                  {confirmingId === image.id ? (
                    <>
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        className="h-8 text-xs"
                        onClick={() => remove(image)}
                      >
                        حذف کن
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="h-8 text-xs"
                        onClick={() => setConfirmingId(null)}
                        aria-label="لغو حذف"
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </>
                  ) : (
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="h-8 text-xs"
                      onClick={() => setConfirmingId(image.id)}
                      aria-label="حذف عکس"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </Button>
                  )}
                </div>

                {confirmingId === image.id ? (
                  <p className="text-[0.7rem] text-destructive">
                    اگر مطلبی از این عکس استفاده کند، آنجا خراب می‌شود.
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
