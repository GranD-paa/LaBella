"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { updateSubscriptionPlanAction } from "@/app/admin/actions/subscription";
import { useTranslations } from "@/components/providers/locale-provider";
import { resolveMessage } from "@/lib/i18n/resolve-message";
import { cn } from "@/lib/utils";
import type { SubscriptionPlanRow } from "@/types";

/**
 * One-click on/off for a plan, right on its row in the plan list.
 *
 * The same setting also lives inside the edit dialog, but taking a plan off
 * sale is the one change an admin makes *without* wanting to review pricing and
 * copy first — leaving it only behind "Edit" made the most consequential switch
 * on the page the hardest one to reach.
 */
export function PlanActiveToggle({ plan }: { plan: SubscriptionPlanRow }) {
  const { t, locale } = useTranslations();
  const [isPending, startTransition] = useTransition();
  const planName = plan.title[locale];

  function toggle() {
    const next = !plan.is_active;

    startTransition(async () => {
      // The action validates a whole plan, so the fields this control does not
      // touch are sent back unchanged rather than adding a second, toggle-only
      // endpoint with its own permission check to keep in step.
      const result = await updateSubscriptionPlanAction(
        plan.plan_slug,
        plan.language_slug,
        {
          priceEur: plan.price_eur,
          discountPercent: plan.discount_percent,
          title: plan.title,
          description: plan.description,
          features: plan.features,
          isActive: next,
          quarterlyEnabled: plan.quarterly_enabled,
          quarterlyDiscountPercent: plan.quarterly_discount_percent,
        }
      );

      if ("error" in result) {
        toast.error(resolveMessage(t, result.error));
        return;
      }

      // Says what happened to the storefront, not just "saved" — the whole
      // point of the switch is what learners stop or start seeing.
      toast.success(
        next
          ? t("admin.subscription.planActivated", { plan: planName })
          : t("admin.subscription.planDeactivated", { plan: planName })
      );
    });
  }

  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "text-xs font-medium",
          plan.is_active ? "text-emerald-300" : "text-muted-foreground"
        )}
      >
        {plan.is_active
          ? t("admin.subscription.activeStatusOn")
          : t("admin.subscription.activeStatusOff")}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={plan.is_active}
        aria-label={t("admin.subscription.toggleActiveAria", { plan: planName })}
        disabled={isPending}
        onClick={toggle}
        className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60"
      >
        {/*
          Start/end rather than a translated thumb so the switch reads the right
          way round in Persian without a direction-aware transform.
        */}
        <span
          className={cn(
            "flex h-5 w-9 items-center rounded-full p-0.5 transition-colors",
            plan.is_active ? "justify-end bg-emerald-500/80" : "justify-start bg-white/15"
          )}
        >
          <span className="h-4 w-4 rounded-full bg-white shadow" />
        </span>
      </button>
    </div>
  );
}
