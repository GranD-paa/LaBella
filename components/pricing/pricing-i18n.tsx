"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";

export function PricingHero() {
  const { t } = useTranslations();

  return (
    <div className="mb-10 space-y-4 text-center">
      <Button variant="ghost" size="sm" asChild className="mb-2">
        <Link href="/">
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          {t("pricing.backHome")}
        </Link>
      </Button>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {t("pricing.title")}
      </h1>
      <p className="mx-auto max-w-2xl text-muted-foreground">
        {t("pricing.subtitle")}
      </p>
    </div>
  );
}

export function PricingHeaderActions() {
  const { t } = useTranslations();

  return (
    <>
      <Button variant="ghost" size="sm" className="brand-header-btn" asChild>
        <Link href="/login">{t("pricing.signIn")}</Link>
      </Button>
      <Button
        size="sm"
        className="bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
        asChild
      >
        <Link href="/sign-up">{t("pricing.getStarted")}</Link>
      </Button>
    </>
  );
}
