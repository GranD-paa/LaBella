import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, GraduationCap } from "lucide-react";

import { SubscriptionCards } from "@/components/pricing/subscription-cards";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pricing — LaBella",
  description: "Choose the plan that fits your language learning journey.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <GraduationCap className="h-5 w-5" />
            LaBella
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/sign-up">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="mb-10 space-y-4 text-center">
          <Button variant="ghost" size="sm" asChild className="mb-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Start for free and upgrade when you&apos;re ready. All plans include
            access to our core learning experience.
          </p>
        </div>

        <SubscriptionCards />
      </main>
    </div>
  );
}
