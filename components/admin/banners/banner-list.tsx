"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, ExternalLink, Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  deleteBannerAction,
  reorderBannerAction,
  updateBannerStatusAction,
} from "@/app/admin/actions/banners";
import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog";
import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ActionResult } from "@/lib/action-result";
import { resolveMessage } from "@/lib/i18n/resolve-message";
import type { Banner } from "@/types";

export function BannerList({ banners }: { banners: Banner[] }) {
  const { t } = useTranslations();
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function runAction(id: string, action: () => Promise<ActionResult>) {
    setPendingId(id);
    startTransition(async () => {
      const result = await action();
      if ("error" in result) {
        toast.error(resolveMessage(t, result.error));
      } else {
        router.refresh();
      }
      setPendingId(null);
    });
  }

  if (banners.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-white/15 bg-muted/10 px-4 py-8 text-center text-sm text-muted-foreground">
        {t("admin.banners.empty")}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {banners.map((banner, index) => {
        const busy = isPending && pendingId === banner.id;
        return (
          <div
            key={banner.id}
            className="flex flex-col gap-3 rounded-xl border border-white/10 bg-muted/10 p-3 sm:flex-row sm:items-center"
          >
            <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-lg sm:w-36">
              <Image
                src={banner.image_url}
                alt={banner.title ?? ""}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="truncate text-sm font-medium">
                  {banner.title || t("admin.banners.untitled")}
                </p>
                <Badge
                  variant={banner.status === "published" ? "default" : "secondary"}
                >
                  {banner.status === "published"
                    ? t("admin.quizzes.statusPublished")
                    : t("admin.quizzes.statusDraft")}
                </Badge>
              </div>
              {banner.link_href ? (
                <a
                  href={banner.link_href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 truncate text-xs text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="h-3 w-3 shrink-0" />
                  {banner.link_href}
                </a>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={index === 0 || busy}
                onClick={() => runAction(banner.id, () => reorderBannerAction(banner.id, "up"))}
                aria-label={t("admin.banners.moveUp")}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={index === banners.length - 1 || busy}
                onClick={() => runAction(banner.id, () => reorderBannerAction(banner.id, "down"))}
                aria-label={t("admin.banners.moveDown")}
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-white/20"
                disabled={busy}
                onClick={() =>
                  runAction(banner.id, () =>
                    updateBannerStatusAction(
                      banner.id,
                      banner.status === "published" ? "draft" : "published"
                    )
                  )
                }
              >
                {busy ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : banner.status === "published" ? (
                  t("admin.quizzes.unpublish")
                ) : (
                  t("admin.quizzes.publish")
                )}
              </Button>
              <DeleteConfirmDialog
                title={t("admin.banners.deleteTitle")}
                description={t("admin.banners.deleteDescription")}
                successMessage={t("admin.banners.deleteSuccess")}
                onConfirm={async () => {
                  const result = await deleteBannerAction(banner.id);
                  if (!("error" in result)) {
                    router.refresh();
                  }
                  return result;
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
