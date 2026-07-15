"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";

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
      className={cn(
        "brand-header-link group inline-flex items-center gap-2 whitespace-nowrap",
        className
      )}
      aria-label={t("brand.goToMenu")}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 transition-colors group-hover:bg-white/15">
        <GraduationCap className="h-5 w-5 text-brand-accent" />
      </span>
      <span className="text-base font-semibold tracking-tight sm:text-lg">
        LaBella
      </span>
    </Link>
  );
}
