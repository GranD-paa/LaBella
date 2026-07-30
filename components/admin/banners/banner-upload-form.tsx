"use client";

import { useRef, useState, useTransition, type DragEvent, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ImagePlus, Loader2, UploadCloud, X } from "lucide-react";
import { toast } from "sonner";

import { uploadBannerAction } from "@/app/admin/actions/banners";
import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resolveMessage } from "@/lib/i18n/resolve-message";
import { cn } from "@/lib/utils";

const MAX_SIZE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export function BannerUploadForm() {
  const { t } = useTranslations();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [title, setTitle] = useState("");
  const [linkHref, setLinkHref] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function pickFile(candidate: File | undefined | null) {
    if (!candidate) return;
    if (!ACCEPTED_TYPES.includes(candidate.type)) {
      toast.error(t("admin.banners.errors.invalidType"));
      return;
    }
    if (candidate.size > MAX_SIZE_BYTES) {
      toast.error(t("admin.banners.errors.tooLarge"));
      return;
    }
    setFile(candidate);
    setPreviewUrl(URL.createObjectURL(candidate));
  }

  function reset() {
    setFile(null);
    setPreviewUrl(null);
    setTitle("");
    setLinkHref("");
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!file) {
      toast.error(t("admin.banners.errors.imageRequired"));
      return;
    }

    const formData = new FormData();
    formData.set("image", file);
    formData.set("title", title);
    formData.set("linkHref", linkHref);

    startTransition(async () => {
      const result = await uploadBannerAction(formData);
      if ("error" in result) {
        toast.error(resolveMessage(t, result.error));
        return;
      }
      toast.success(t("admin.banners.uploadSuccess"));
      reset();
      router.refresh();
    });
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    pickFile(event.dataTransfer.files[0]);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div
        role="button"
        tabIndex={0}
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
          "relative flex aspect-[21/9] w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed text-center transition-colors",
          isDragging
            ? "border-brand-accent bg-brand-accent/10"
            : "border-white/15 bg-muted/10 hover:border-white/25"
        )}
      >
        {previewUrl ? (
          <>
            <Image src={previewUrl} alt="" fill unoptimized className="object-cover" />
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute end-2 top-2 h-8 w-8"
              onClick={(event) => {
                event.stopPropagation();
                reset();
              }}
              aria-label={t("common.delete")}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <UploadCloud className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm font-medium">{t("admin.banners.dropHint")}</p>
            <p className="text-xs text-muted-foreground">{t("admin.banners.dropSubHint")}</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          className="hidden"
          onChange={(event) => pickFile(event.target.files?.[0])}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="banner-title">{t("admin.banners.titleLabel")}</Label>
          <Input
            id="banner-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder={t("admin.banners.titlePlaceholder")}
            maxLength={150}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="banner-link">{t("admin.banners.linkLabel")}</Label>
          <Input
            id="banner-link"
            type="url"
            value={linkHref}
            onChange={(event) => setLinkHref(event.target.value)}
            placeholder="https://..."
          />
        </div>
      </div>

      <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t("admin.banners.uploading")}
          </>
        ) : (
          <>
            <ImagePlus className="h-4 w-4" />
            {t("admin.banners.uploadButton")}
          </>
        )}
      </Button>
    </form>
  );
}
