"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { CreditCard, Landmark, Loader2, Wallet } from "lucide-react";

import { startCheckoutAction } from "@/app/actions/checkout";
import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatEurCents, formatRialAsToman } from "@/lib/billing/format";
import { resolveMessage } from "@/lib/i18n/resolve-message";
import type {
  BillingCurrency,
  BillingPeriodMonths,
  PaymentProviderSlug,
} from "@/types";

const PROVIDER_ICONS: Record<PaymentProviderSlug, typeof CreditCard> = {
  stripe: CreditCard,
  zarinpal: Landmark,
  manual: Wallet,
};

const PROVIDER_LABELS: Record<PaymentProviderSlug, string> = {
  stripe: "Stripe",
  zarinpal: "زرین‌پال",
  manual: "Manual",
};

export function CheckoutDialog({
  open,
  onOpenChange,
  planSlug,
  planName,
  languageSlug,
  currency,
  periodMonths = 1,
  amountEurCents,
  amountRial,
  providers,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planSlug: string;
  planName: string;
  languageSlug: string;
  currency: BillingCurrency;
  periodMonths?: BillingPeriodMonths;
  amountEurCents: number;
  amountRial: number | null;
  providers: PaymentProviderSlug[];
}) {
  const { t, locale } = useTranslations();
  const [isPending, startTransition] = useTransition();
  const [pendingProvider, setPendingProvider] =
    useState<PaymentProviderSlug | null>(null);

  function handlePay(provider: PaymentProviderSlug) {
    setPendingProvider(provider);
    startTransition(async () => {
      const result = await startCheckoutAction({
        planSlug,
        languageSlug,
        currency,
        provider,
        periodMonths,
      });

      if ("error" in result) {
        setPendingProvider(null);
        toast.error(resolveMessage(t, result.error));
        return;
      }

      toast.info(t("subscription.checkoutStarting"));
      // A full navigation, not a router push: the destination is the
      // gateway's own domain.
      window.location.href = result.redirectUrl;
    });
  }

  const displayAmount =
    currency === "IRR" && amountRial !== null
      ? formatRialAsToman(amountRial, locale)
      : formatEurCents(amountEurCents, locale);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("subscription.choosePayment")}</DialogTitle>
          <DialogDescription>
            {planName} — <span className="font-semibold">{displayAmount}</span>
          </DialogDescription>
        </DialogHeader>

        {providers.length === 0 ? (
          <p className="rounded-xl border border-white/10 bg-muted/10 p-4 text-center text-sm text-muted-foreground">
            {t("subscription.noPaymentMethods")}
          </p>
        ) : (
          <div className="space-y-2">
            {providers.map((provider) => {
              const Icon = PROVIDER_ICONS[provider];
              return (
                <Button
                  key={provider}
                  variant="outline"
                  className="w-full justify-start border-white/20"
                  disabled={isPending}
                  onClick={() => handlePay(provider)}
                >
                  {isPending && pendingProvider === provider ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                  {t("subscription.payWith", {
                    method: PROVIDER_LABELS[provider],
                  })}
                </Button>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
