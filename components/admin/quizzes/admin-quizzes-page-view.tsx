"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, LayoutGrid, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

import { CreateContentSection } from "@/components/admin/quizzes/create-content-section";
import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ContentWizardTarget } from "@/lib/content-management/categories";
import type { CurriculumLanguage } from "@/lib/curriculum/types";
import type { Lesson } from "@/types";

export function AdminQuizzesPageView({
  displayName,
  lessons,
  languages,
  requestedSlot,
}: {
  displayName: string;
  lessons: Lesson[];
  languages: CurriculumLanguage[];
  /** A slot the lesson monitor asked to open, taken from the query string. */
  requestedSlot: Omit<ContentWizardTarget, "nonce"> | null;
}) {
  const { t } = useTranslations();
  const router = useRouter();

  // The nonce distinguishes one request from the next, so returning from the
  // monitor to the same square reopens the wizard instead of looking like
  // unchanged state.
  const [jumpTarget] = useState<ContentWizardTarget | null>(() =>
    requestedSlot ? { ...requestedSlot, nonce: Date.now() } : null
  );

  useEffect(() => {
    if (!jumpTarget) return;
    document.getElementById("create-content-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [jumpTarget]);

  return (
    <div className="space-y-8">
      <section className="brand-surface relative overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-0 bg-brand-gradient opacity-25" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <Badge className="border-brand-accent/30 bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/15">
              <ShieldCheck className="me-1 h-3 w-3" />
              {t("admin.quizzes.pageBadge")}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("admin.quizzes.pageHello", { name: displayName })}
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              {t("admin.quizzes.pageSubtitle")}
            </p>
          </div>
          <div className="flex flex-col items-stretch gap-2">
            <Button variant="outline" className="border-white/20" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                {t("admin.quizzes.fullAdminPanel")}
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-brand-accent/40 text-brand-accent hover:bg-brand-accent/10 hover:text-brand-accent"
              asChild
            >
              <Link href="/admin/quizzes/monitor">
                <LayoutGrid className="h-4 w-4" />
                {t("admin.content.monitor.title")}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <CreateContentSection
        lessons={lessons}
        languages={languages}
        jumpTarget={jumpTarget}
        onSuccess={() => router.refresh()}
      />
    </div>
  );
}
