"use client";

import { Check, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Everything you need to get started.",
    features: [
      "Access to all public lessons",
      "Vocabulary flashcards",
      "Grammar explanations",
      "One quiz attempt per lesson",
    ],
    cta: "Current Plan",
    highlighted: false,
    action: "current" as const,
  },
  {
    id: "monthly",
    name: "Monthly Pro",
    price: "$9",
    period: "per month",
    description: "Unlock advanced learning tools.",
    features: [
      "Everything in Free",
      "Unlimited quiz retakes",
      "Progress analytics",
      "Offline lesson access (PWA)",
      "Priority support",
    ],
    cta: "Subscribe",
    highlighted: true,
    action: "subscribe" as const,
  },
  {
    id: "yearly",
    name: "Yearly Pro",
    price: "$79",
    period: "per year",
    description: "Best value for committed learners.",
    features: [
      "Everything in Monthly Pro",
      "Save 27% vs monthly",
      "Exclusive bonus lessons",
      "Certificate of completion",
      "Early access to new features",
    ],
    cta: "Buy Yearly",
    highlighted: false,
    action: "subscribe" as const,
  },
];

function handleSubscribe(planName: string) {
  toast.info("Payment gateway integration is coming soon!", {
    description: `${planName} checkout will be available in a future update.`,
  });
}

export function SubscriptionCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {PLANS.map((plan) => (
        <Card
          key={plan.id}
          className={cn(
            "brand-surface relative flex flex-col",
            plan.highlighted &&
              "border-brand-accent shadow-brand ring-1 ring-brand-accent/30"
          )}
        >
          {plan.highlighted ? (
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1 bg-primary text-primary-foreground hover:bg-primary/90">
              <Sparkles className="h-3 w-3" />
              Most Popular
            </Badge>
          ) : null}
          <CardHeader className="space-y-3 text-center">
            <CardTitle className="text-xl">{plan.name}</CardTitle>
            <div>
              <span className="text-4xl font-bold tracking-tight">
                {plan.price}
              </span>
              <span className="ml-1 text-sm text-muted-foreground">
                / {plan.period}
              </span>
            </div>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            {plan.action === "current" ? (
              <Button variant="outline" className="w-full" disabled>
                {plan.cta}
              </Button>
            ) : (
              <Button
                className="w-full"
                variant={plan.highlighted ? "default" : "outline"}
                onClick={() => handleSubscribe(plan.name)}
              >
                {plan.cta}
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
