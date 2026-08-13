"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { BookOpen, Clapperboard, GraduationCap, ImageIcon, Loader2, SlidersHorizontal } from "lucide-react";

import { updateSubscriptionTierAction } from "@/app/admin/actions/subscription";
import { ToggleRow } from "@/components/admin/toggle-row";
import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resolveMessage } from "@/lib/i18n/resolve-message";
import type { SubscriptionPlanRow, SubscriptionTier } from "@/types";

type Draft = {
  unlocksVocabulary: boolean;
  unlocksGrammar: boolean;
  unlocksVideo: boolean;
  unlocksLevelExam: boolean;
  /** null = unlimited */
  quizRetakeLimit: number | null;
};

function draftFrom(tier: SubscriptionTier): Draft {
  return {
    unlocksVocabulary: tier.unlocks_vocabulary,
    unlocksGrammar: tier.unlocks_grammar,
    unlocksVideo: tier.unlocks_video,
    unlocksLevelExam: tier.unlocks_level_exam,
    quizRetakeLimit: tier.quiz_retake_limit,
  };
}

/**
 * Per-tier capability editor.
 *
 * Each tier saves on its own rather than the whole table at once, so a mistake
 * in one row cannot take the others down with it — and an admin adjusting only
 * Pro is not asked to re-confirm Basic and Ultimate.
 */
export function TierCapabilitiesPanel({
  tiers,
  plans,
}: {
  tiers: SubscriptionTier[];
  /** Used only to show each tier under the name the admin gave it. */
  plans: SubscriptionPlanRow[];
}) {
  const { t, locale } = useTranslations();
  const [drafts, setDrafts] = useState<Record<string, Draft>>(() =>
    Object.fromEntries(tiers.map((tier) => [tier.plan_slug, draftFrom(tier)]))
  );
  const [savingSlug, setSavingSlug] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function patch(planSlug: string, changes: Partial<Draft>) {
    setDrafts((current) => ({
      ...current,
      [planSlug]: { ...current[planSlug]!, ...changes },
    }));
  }

  function save(tier: SubscriptionTier) {
    const draft = drafts[tier.plan_slug]!;
    setSavingSlug(tier.plan_slug);
    startTransition(async () => {
      const result = await updateSubscriptionTierAction(tier.plan_slug, {
        ...draft,
        // Rank is not editable here: reordering tiers changes which one counts
        // as an upgrade, and that belongs with pricing, not capabilities.
        tierRank: tier.tier_rank,
      });
      setSavingSlug(null);

      if ("error" in result) {
        toast.error(resolveMessage(t, result.error));
        return;
      }
      toast.success(t("admin.subscription.capabilities.saved"));
    });
  }

  /** Any language's row will do for the display name; they share a tier. */
  function tierName(planSlug: string) {
    const plan = plans.find((entry) => entry.plan_slug === planSlug);
    return plan?.title[locale] ?? planSlug;
  }

  return (
    <Card className="brand-surface">
      <CardHeader className="space-y-1">
        <CardTitle className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-brand-accent" />
          {t("admin.subscription.capabilities.title")}
        </CardTitle>
        <CardDescription>
          {t("admin.subscription.capabilities.description")}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {[...tiers]
          .sort((a, b) => a.tier_rank - b.tier_rank)
          .map((tier) => {
            const draft = drafts[tier.plan_slug];
            if (!draft) return null;

            const busy = isPending && savingSlug === tier.plan_slug;
            const unlimited = draft.quizRetakeLimit === null;

            return (
              <div
                key={tier.plan_slug}
                className="space-y-4 rounded-xl border border-white/10 bg-muted/10 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">{tierName(tier.plan_slug)}</p>
                  <span className="text-xs text-muted-foreground">
                    {t("admin.subscription.capabilities.rank", {
                      rank: tier.tier_rank,
                    })}
                  </span>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <ToggleRow
                    label={t("admin.subscription.capabilities.vocabulary")}
                    hint={t("admin.subscription.capabilities.vocabularyHint")}
                    checked={draft.unlocksVocabulary}
                    onChange={(next) =>
                      patch(tier.plan_slug, { unlocksVocabulary: next })
                    }
                  />
                  <ToggleRow
                    label={t("admin.subscription.capabilities.grammar")}
                    hint={t("admin.subscription.capabilities.grammarHint")}
                    checked={draft.unlocksGrammar}
                    onChange={(next) =>
                      patch(tier.plan_slug, { unlocksGrammar: next })
                    }
                  />
                  <ToggleRow
                    label={t("admin.subscription.capabilities.video")}
                    hint={t("admin.subscription.capabilities.videoHint")}
                    checked={draft.unlocksVideo}
                    onChange={(next) =>
                      patch(tier.plan_slug, { unlocksVideo: next })
                    }
                  />
                  <ToggleRow
                    label={t("admin.subscription.capabilities.levelExam")}
                    hint={t("admin.subscription.capabilities.levelExamHint")}
                    checked={draft.unlocksLevelExam}
                    onChange={(next) =>
                      patch(tier.plan_slug, { unlocksLevelExam: next })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`retakes-${tier.plan_slug}`}>
                    {t("admin.subscription.capabilities.retakes")}
                  </Label>
                  <div className="flex flex-wrap items-center gap-3">
                    <Input
                      id={`retakes-${tier.plan_slug}`}
                      type="number"
                      min={0}
                      max={99}
                      step={1}
                      className="max-w-28"
                      disabled={unlimited}
                      value={unlimited ? "" : String(draft.quizRetakeLimit)}
                      onChange={(event) =>
                        patch(tier.plan_slug, {
                          quizRetakeLimit: event.target.value
                            ? Number(event.target.value)
                            : 0,
                        })
                      }
                    />
                    <label className="flex cursor-pointer items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        className="h-4 w-4 accent-brand-accent"
                        checked={unlimited}
                        onChange={(event) =>
                          patch(tier.plan_slug, {
                            quizRetakeLimit: event.target.checked ? null : 3,
                          })
                        }
                      />
                      {t("admin.subscription.capabilities.unlimitedRetakes")}
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t("admin.subscription.capabilities.retakesHint")}
                  </p>
                </div>

                <Button
                  type="button"
                  size="sm"
                  disabled={busy}
                  onClick={() => save(tier)}
                  className="gap-2"
                >
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {busy ? t("common.saving") : t("common.saveChanges")}
                </Button>
              </div>
            );
          })}

        <div className="flex flex-wrap gap-4 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <ImageIcon className="h-3.5 w-3.5" />
            {t("admin.subscription.capabilities.vocabulary")}
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" />
            {t("admin.subscription.capabilities.grammar")}
          </span>
          <span className="flex items-center gap-1.5">
            <Clapperboard className="h-3.5 w-3.5" />
            {t("admin.subscription.capabilities.video")}
          </span>
          <span className="flex items-center gap-1.5">
            <GraduationCap className="h-3.5 w-3.5" />
            {t("admin.subscription.capabilities.levelExam")}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
