import type { Metadata } from "next";

import { AppHeader } from "@/components/layout/app-header";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import {
  PricingHeaderActions,
  PricingHero,
} from "@/components/pricing/pricing-i18n";
import { SubscriptionCards } from "@/components/pricing/subscription-cards";
import { createPageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("meta.pricing", "meta.pricingDescription");
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-brand-gradient-subtle">
      <AppHeader
        homeHref="/login"
        left={<LanguageSwitcher />}
        right={<PricingHeaderActions />}
      />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <PricingHero />
        <SubscriptionCards />
      </main>
    </div>
  );
}
