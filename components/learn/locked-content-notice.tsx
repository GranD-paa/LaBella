"use client";

import Link from "next/link";
import { Lock, Sparkles } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/**
 * What a learner sees in place of content their plan does not cover.
 *
 * It names the cheapest plan that would unlock this specific section rather
 * than sending everyone to the top tier: the point is to tell someone what
 * they are missing and what the least it costs to get it is, not to hide the
 * fact that the section exists at all.
 */
export function LockedContentNotice({
  /** Localized name of the cheapest plan that unlocks this content. */
  planName,
  /** Localized label for the content being gated, e.g. "Grammar". */
  contentLabel,
  languageSlug,
}: {
  planName: string | null;
  contentLabel: string;
  languageSlug?: string;
}) {
  const { t } = useTranslations();

  return (
    <Card className="brand-surface relative overflow-hidden border-brand-accent/30">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-brand-accent/15 to-transparent"
        aria-hidden="true"
      />
      <CardContent className="relative flex flex-col items-center gap-5 py-14 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-accent/30 bg-brand-accent/10">
          <Lock className="h-7 w-7 text-brand-accent" aria-hidden="true" />
        </div>

        <div className="max-w-md space-y-2">
          <h2 className="text-xl font-semibold">
            {t("learn.locked.title", { content: contentLabel })}
          </h2>
          <p className="text-sm text-muted-foreground">
            {planName
              ? t("learn.locked.description", { plan: planName })
              : t("learn.locked.descriptionGeneric")}
          </p>
        </div>

        <Button asChild className="gap-2">
          <Link
            href={
              languageSlug
                ? `/subscription?language=${languageSlug}`
                : "/subscription"
            }
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {t("learn.locked.cta")}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
