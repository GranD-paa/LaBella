import { isLocalDataMode } from "@/lib/config/data-source";
import { stripeProvider } from "@/lib/billing/providers/stripe";
import { zarinpalProvider } from "@/lib/billing/providers/zarinpal";
import type { PaymentProvider } from "@/lib/billing/providers/types";
import type { BillingCurrency, PaymentSettings } from "@/types";

/**
 * The "manual" provider covers money that arrives outside any gateway — a
 * bank transfer or card-to-card payment an admin then records by hand.
 *
 * It has no checkout of its own in production. In local development it
 * short-circuits straight to the callback so the full activation path can be
 * exercised without a real gateway; that shortcut is hard-gated on local data
 * mode, because in production it would be a button that hands out free
 * subscriptions.
 */
export const manualProvider: PaymentProvider = {
  slug: "manual",
  currencies: ["EUR", "IRR"],

  async createCheckout(request) {
    if (!isLocalDataMode()) {
      return {
        ok: false,
        error: "manual payments are recorded by an admin, not self-served",
      };
    }
    // `callbackUrl` already carries `?payment_id=…`.
    return {
      ok: true,
      redirectUrl: `${request.callbackUrl}&status=success`,
      providerPaymentId: `manual-${request.paymentId}`,
    };
  },

  async verify(request) {
    if (!isLocalDataMode()) {
      return { ok: false, error: "manual payments cannot be self-verified" };
    }
    if (request.params.status !== "success") {
      return { ok: false, error: "simulated payment cancelled", canceledByUser: true };
    }
    return {
      ok: true,
      providerPaymentId: `manual-${request.paymentId}`,
      providerRef: "simulated",
    };
  },
};

const PROVIDERS: Record<string, PaymentProvider> = {
  stripe: stripeProvider,
  zarinpal: zarinpalProvider,
  manual: manualProvider,
};

export function getPaymentProvider(slug: string): PaymentProvider | null {
  return PROVIDERS[slug] ?? null;
}

/**
 * Which gateways a learner may actually choose for a given currency.
 *
 * Both the admin toggle and the gateway's own currency support have to agree:
 * offering ZarinPal for a euro payment or Stripe for a Rial one would fail at
 * the gateway after the customer has already committed.
 */
export function getAvailableProviders(
  settings: PaymentSettings,
  currency: BillingCurrency
): PaymentProvider[] {
  const enabled: Record<string, boolean> = {
    stripe: settings.stripe_enabled,
    zarinpal: settings.zarinpal_enabled,
    // The manual shortcut is only ever a local-development affordance.
    manual: settings.manual_enabled && isLocalDataMode(),
  };

  return Object.values(PROVIDERS).filter(
    (provider) =>
      enabled[provider.slug] && provider.currencies.includes(currency)
  );
}
