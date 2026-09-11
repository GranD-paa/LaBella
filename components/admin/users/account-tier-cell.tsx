"use client";

import { Gift } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import { LANGUAGE_LABEL_KEYS } from "@/lib/i18n/language-labels";
import type { LocalizedText } from "@/types";

/**
 * What one account is paying for, as the admin panel shows it.
 *
 * Assembled by the user-management panel from the learner's live
 * subscriptions, never stored on the profile: a paid tier lasts exactly as
 * long as the subscription behind it, and a second copy on the profile would
 * be a badge that outlives what it claims. The plan's name comes from the
 * subscription panel too, so this says "Pro" or "Max" or whatever the plans
 * are called this month without anything here needing to know.
 */
export type AccountTierCellData = {
  planSlug: string;
  title: LocalizedText | null;
  languages: string[];
  /** Admin-facing only: who gifted it. Never shown to the subscriber. */
  gift: { byName: string | null; note: string | null } | null;
} | null;

export function AccountTierCell({ tier }: { tier: AccountTierCellData }) {
  const { t, locale } = useTranslations();

  if (!tier) {
    return (
      <span className="text-xs text-muted-foreground">
        {t("admin.users.tier.free")}
      </span>
    );
  }

  const planName = tier.title?.[locale] ?? tier.planSlug;

  return (
    <div className="space-y-1">
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge className="border-emerald-400/30 bg-emerald-500/15 text-emerald-300">
          {t("admin.users.tier.paid", { plan: planName })}
        </Badge>
        {tier.gift ? (
          <Badge
            variant="outline"
            className="gap-1 border-amber-400/30 text-[10px] font-normal text-amber-300"
            title={tier.gift.note ?? undefined}
          >
            <Gift className="h-3 w-3" />
            {tier.gift.byName
              ? t("admin.users.tier.giftedBy", { name: tier.gift.byName })
              : t("admin.users.tier.gifted")}
          </Badge>
        ) : null}
      </div>
      <p className="text-[11px] text-muted-foreground">
        {tier.languages
          .map((slug) =>
            LANGUAGE_LABEL_KEYS[slug] ? t(LANGUAGE_LABEL_KEYS[slug]) : slug
          )
          .join("، ")}
      </p>
    </div>
  );
}
