export type SubscriptionPlanId = "basic" | "pro" | "ultimate";

export type SubscriptionPlan = {
  id: SubscriptionPlanId;
  priceEur: number;
  priceLabel: string;
  highlighted: boolean;
  accentClass: string;
  icon: "seedling" | "zap" | "crown";
  featureKeys: string[];
};

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "basic",
    priceEur: 2.99,
    priceLabel: "€2.99",
    highlighted: false,
    accentClass: "from-emerald-500/20 to-teal-500/10",
    icon: "seedling",
    featureKeys: [
      "subscription.plans.basic.features.oneLanguage",
      "subscription.plans.basic.features.coreLessons",
      "subscription.plans.basic.features.quizRetakes",
      "subscription.plans.basic.features.progress",
    ],
  },
  {
    id: "pro",
    priceEur: 4.99,
    priceLabel: "€4.99",
    highlighted: true,
    accentClass: "from-violet-500/25 to-fuchsia-500/10",
    icon: "zap",
    featureKeys: [
      "subscription.plans.pro.features.allBasic",
      "subscription.plans.pro.features.allLanguages",
      "subscription.plans.pro.features.unlimitedQuizzes",
      "subscription.plans.pro.features.grammarDeepDives",
      "subscription.plans.pro.features.prioritySupport",
    ],
  },
  {
    id: "ultimate",
    priceEur: 5.99,
    priceLabel: "€5.99",
    highlighted: false,
    accentClass: "from-amber-500/25 to-orange-500/10",
    icon: "crown",
    featureKeys: [
      "subscription.plans.ultimate.features.allPro",
      "subscription.plans.ultimate.features.futureLanguages",
      "subscription.plans.ultimate.features.offlinePwa",
      "subscription.plans.ultimate.features.earlyAccess",
      "subscription.plans.ultimate.features.personalizedPath",
    ],
  },
];
