"use client";

import Link from "next/link";
import { ArrowLeft, ImageIcon } from "lucide-react";

import { BannerManagementPanel } from "@/components/admin/banners/banner-management-panel";
import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Banner } from "@/types";

export function AdminBannersPageView({
  displayName,
  banners,
}: {
  displayName: string;
  banners: Banner[];
}) {
  const { t } = useTranslations();

  return (
    <div className="space-y-8">
      <section className="brand-surface relative overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-0 bg-brand-gradient opacity-25" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <Badge className="border-brand-accent/30 bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/15">
              <ImageIcon className="me-1 h-3 w-3" />
              {t("admin.banners.pageBadge")}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("admin.banners.pageHello", { name: displayName })}
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              {t("admin.banners.pageSubtitle")}
            </p>
          </div>
          <Button variant="outline" className="border-white/20" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
              {t("admin.banners.backToDashboard")}
            </Link>
          </Button>
        </div>
      </section>

      <BannerManagementPanel banners={banners} />
    </div>
  );
}
