"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { BannerManagementPanel } from "@/components/admin/banners/banner-management-panel";
import { Plate, PlateHead } from "@/components/layout/plate";
import { useTranslations } from "@/components/providers/locale-provider";
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
      <Plate>
        <PlateHead
          eyebrow={t("admin.banners.pageBadge")}
          title={t("admin.banners.pageHello", { name: displayName })}
          lede={t("admin.banners.pageSubtitle")}
          action={
                <Button variant="outline" className="border-white/20" asChild>
                  <Link href="/dashboard">
                    <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                    {t("admin.banners.backToDashboard")}
                  </Link>
                </Button>
          }
        />
      </Plate>

      <BannerManagementPanel banners={banners} />
    </div>
  );
}
