"use client";

import Link from "next/link";

import { BrandMark } from "@/components/layout/brand-mark";
import { useTranslations } from "@/components/providers/locale-provider";
import { cn } from "@/lib/utils";

export function BrandLogo({
  href = "/menu",
  className,
}: {
  href?: string;
  className?: string;
}) {
  const { t } = useTranslations();

  return (
    <Link
      href={href}
      dir="ltr"
      className={cn(
        "brand-header-link group inline-flex items-center gap-2 whitespace-nowrap",
        className
      )}
      aria-label={t("brand.goToMenu")}
    >
      <BrandMark className="h-9 w-9 shrink-0 text-white sm:h-10 sm:w-10" />
      <span className="text-lg font-semibold tracking-tight sm:text-xl">
        LaParla
      </span>
    </Link>
  );
}
