"use client";

import { ImagePlus, LayoutList } from "lucide-react";

import { BannerList } from "@/components/admin/banners/banner-list";
import { BannerUploadForm } from "@/components/admin/banners/banner-upload-form";
import { useTranslations } from "@/components/providers/locale-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Banner } from "@/types";

export function BannerManagementPanel({ banners }: { banners: Banner[] }) {
  const { t } = useTranslations();

  return (
    <div className="space-y-6">
      <Card className="brand-surface">
        <CardHeader className="space-y-1">
          <CardTitle className="flex items-center gap-2">
            <ImagePlus className="h-5 w-5 text-brand-accent" />
            {t("admin.banners.uploadTitle")}
          </CardTitle>
          <CardDescription>{t("admin.banners.uploadDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <BannerUploadForm />
        </CardContent>
      </Card>

      <Card className="brand-surface">
        <CardHeader className="space-y-1">
          <CardTitle className="flex items-center gap-2">
            <LayoutList className="h-5 w-5 text-brand-accent" />
            {t("admin.banners.listTitle")}
          </CardTitle>
          <CardDescription>{t("admin.banners.listDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <BannerList banners={banners} />
        </CardContent>
      </Card>
    </div>
  );
}
