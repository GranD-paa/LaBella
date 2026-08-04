import type { Database } from "@/types/database.types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Lesson = Database["public"]["Tables"]["lessons"]["Row"];
export type Vocabulary = Database["public"]["Tables"]["vocabulary"]["Row"];
export type GrammarRule =
  Database["public"]["Tables"]["grammar_rules"]["Row"];
export type VideoLesson =
  Database["public"]["Tables"]["video_lessons"]["Row"];
export type Quiz = Database["public"]["Tables"]["quizzes"]["Row"];
export type QuizQuestion =
  Database["public"]["Tables"]["quiz_questions"]["Row"];
export type UserQuizAttempt =
  Database["public"]["Tables"]["user_quiz_attempts"]["Row"];
export type UserLearningState =
  Database["public"]["Tables"]["user_learning_state"]["Row"];
export type Banner = Database["public"]["Tables"]["banners"]["Row"];

export type LocalizedText = { fa: string; en: string; it: string };

export type SubscriptionPlanRow = Omit<
  Database["public"]["Tables"]["subscription_plans"]["Row"],
  "title" | "description" | "features"
> & {
  title: LocalizedText;
  description: LocalizedText;
  features: LocalizedText[];
};

export type SubscriptionPageContentRow = Omit<
  Database["public"]["Tables"]["subscription_page_content"]["Row"],
  "hero_title" | "hero_subtitle" | "footer_note"
> & {
  hero_title: LocalizedText;
  hero_subtitle: LocalizedText;
  footer_note: LocalizedText;
};

// -------------------------------------------------------------------------
// Billing & accounting
// -------------------------------------------------------------------------
export type PaymentSettings =
  Database["public"]["Tables"]["payment_settings"]["Row"];
export type FxRate = Database["public"]["Tables"]["fx_rates"]["Row"];
export type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];
export type Payment = Database["public"]["Tables"]["payments"]["Row"];
export type Refund = Database["public"]["Tables"]["refunds"]["Row"];
export type SubscriptionEvent =
  Database["public"]["Tables"]["subscription_events"]["Row"];

export type SubscriptionStatus = Subscription["status"];
export type PaymentStatus = Payment["status"];
export type PaymentProviderSlug = Payment["provider"];
export type BillingCurrency = Payment["paid_currency"];

/** A payment joined with the learner it belongs to, for admin ledger views. */
export type PaymentWithUser = Payment & {
  user_email: string | null;
  user_name: string | null;
};

/** A subscription joined with its owner, for admin subscriber lists. */
export type SubscriptionWithUser = Subscription & {
  user_email: string | null;
  user_name: string | null;
};

/** One bucket of the revenue-over-time chart. */
export type RevenueBucket = {
  /** First day of the month, ISO `YYYY-MM-01`. */
  month: string;
  grossEurCents: number;
  refundedEurCents: number;
  netEurCents: number;
  paymentCount: number;
};

/** Revenue split by a single dimension (language or plan). */
export type RevenueSlice = {
  key: string;
  netEurCents: number;
  paymentCount: number;
};

/**
 * Everything the admin accounting dashboard renders, computed in one pass so
 * the page does not fan out into a dozen round trips.
 */
export type AccountingSnapshot = {
  totals: {
    grossEurCents: number;
    refundedEurCents: number;
    netEurCents: number;
    paymentCount: number;
  };
  thisMonth: {
    netEurCents: number;
    paymentCount: number;
    newSubscribers: number;
  };
  lastMonth: {
    netEurCents: number;
    paymentCount: number;
  };
  /** Recurring revenue implied by everything currently active. */
  mrrEurCents: number;
  /** Average revenue per active subscriber, in cents. */
  arpuEurCents: number;
  counts: {
    activeSubscribers: number;
    activeSubscriptions: number;
    pastDue: number;
    canceledPending: number;
    expired: number;
  };
  churnRatePercent: number;
  revenueByMonth: RevenueBucket[];
  revenueByLanguage: RevenueSlice[];
  revenueByPlan: RevenueSlice[];
  /** Lapsed subscribers — the "who didn't renew" list. */
  lapsed: SubscriptionWithUser[];
  /** Active subscriptions ending within the next week. */
  expiringSoon: SubscriptionWithUser[];
  recentPayments: PaymentWithUser[];
  fxRate: FxRate | null;
  settings: PaymentSettings;
};
