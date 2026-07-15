"use client";

import Link from "next/link";

import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";

export function AdminHeaderBadge() {
  const { t } = useTranslations();

  return (
    <>
      <Link
        href="/admin"
        className="hidden text-sm font-medium text-white/80 transition-colors hover:text-white sm:inline"
      >
        {t("nav.adminPanel")}
      </Link>
      <Badge className="border-brand-accent/30 bg-brand-accent/15 text-brand-accent hover:bg-brand-accent/20">
        {t("common.admin")}
      </Badge>
    </>
  );
}
