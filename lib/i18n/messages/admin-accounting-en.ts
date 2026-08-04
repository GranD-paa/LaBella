export const adminAccountingEn = {
  pageBadge: "Accounting",
  pageHello: "Books & revenue, {name}",
  pageSubtitle:
    "Every payment, subscriber and lapse — with the exchange rate each Rial payment was priced at.",
  backToDashboard: "Back to Dashboard",

  kpi: {
    netRevenue: "Net revenue",
    netRevenueHint: "All time, after refunds",
    thisMonth: "This month",
    vsLastMonth: "{percent}% vs last month",
    noComparison: "No revenue last month",
    mrr: "MRR",
    mrrHint: "Recurring monthly revenue",
    arpu: "ARPU",
    arpuHint: "Average per subscriber",
    activeSubscribers: "Active subscribers",
    subscriptionsCount: "{count} subscriptions",
    churnRate: "Churn rate",
    churnHint: "{count} lapsed this month",
    refunded: "Refunded",
    payments: "{count} payments",
  },

  chart: {
    title: "Revenue over time",
    subtitle: "Net revenue per month, after refunds",
    empty: "No revenue recorded yet.",
    monthLabel: "{month}",
    tooltipGross: "Gross",
    tooltipRefunds: "Refunds",
    tooltipNet: "Net",
    tooltipCount: "{count} payments",
  },

  breakdown: {
    byLanguage: "Revenue by language",
    byPlan: "Revenue by plan",
    empty: "Nothing to break down yet.",
  },

  tabs: {
    ledger: "Transactions",
    subscribers: "Subscribers",
    lapsed: "Did not renew",
    expiring: "Expiring soon",
    settings: "Settings",
  },

  ledger: {
    title: "Transaction ledger",
    description: "Every payment attempt, newest first. This record is append-only.",
    date: "Date",
    user: "Learner",
    plan: "Plan",
    amount: "Amount",
    method: "Method",
    status: "Status",
    reference: "Reference",
    empty: "No payments yet.",
    exportCsv: "Export CSV",
    paidInRial: "Paid {amount} at {rate}",
  },

  status: {
    pending: "Pending",
    succeeded: "Paid",
    failed: "Failed",
    refunded: "Refunded",
    canceled: "Cancelled",
  },

  provider: {
    stripe: "Stripe",
    zarinpal: "ZarinPal",
    manual: "Manual",
  },

  subscribers: {
    title: "Active subscribers",
    description: "Everyone with a live subscription right now.",
    language: "Language",
    plan: "Plan",
    renewsOn: "Renews",
    startedOn: "Started",
    empty: "No active subscribers yet.",
    cancelling: "Cancelling at period end",
  },

  lapsed: {
    title: "Did not renew",
    description:
      "Subscriptions past their paid period. Those still in the grace window can usually be won back.",
    endedOn: "Ended",
    inGrace: "In grace period",
    gone: "Expired",
    empty: "Nobody has lapsed. ",
  },

  expiring: {
    title: "Expiring within 7 days",
    description: "Renewals due shortly — the ones worth a reminder.",
    daysLeft: "{count} days left",
    tomorrow: "Expires tomorrow",
    today: "Expires today",
    empty: "Nothing expiring this week.",
  },

  settings: {
    title: "Pricing & gateways",
    description: "Exchange-rate source, margin, and which payment methods are live.",
    currentRate: "Current rate",
    rateSource: "Source",
    rateUpdated: "Updated {time}",
    rateNever: "No rate fetched yet",
    rialPerEur: "{amount} Rial / €1",
    tomanPerEur: "{amount} Toman / €1",
    irrEnabled: "Offer Rial pricing",
    irrEnabledHint: "Shows a Rial price and enables Iranian gateways.",
    fxSource: "Exchange-rate source",
    fxSourceTgju: "TGJU — free market (recommended)",
    fxSourceNavasan: "Navasan — needs an API key",
    fxSourceManual: "Manual — I set the rate myself",
    fxSourceHint:
      "International rate services quote Iran's official rate, which is far from the market rate. These sources track the free market.",
    fxMargin: "Margin (%)",
    fxMarginHint: "Added on top of the market rate to cover spread and gateway fees.",
    irrRounding: "Round Rial prices to",
    irrRoundingHint: "Prices are rounded up to a multiple of this, so they end in zeros.",
    fxManualRate: "Manual rate (Rial per €1)",
    fxMaxDeviation: "Reject rate moves over (%)",
    fxMaxDeviationHint:
      "A refresh that jumps more than this is held for review instead of applied — it usually means the source changed units.",
    gateways: "Payment methods",
    stripeEnabled: "Stripe (international cards, EUR)",
    zarinpalEnabled: "ZarinPal (Iranian gateways, Rial)",
    manualEnabled: "Manual entry (bank transfer)",
    gracePeriod: "Grace period (days)",
    gracePeriodHint: "How long access continues after a period ends before it is cut.",
    save: "Save settings",
    saved: "Settings saved",
    refreshRate: "Refresh rate now",
    rateRefreshed: "Exchange rate updated",
    rateRejected: "Rate rejected: {reason}",
  },

  manual: {
    title: "Record a payment",
    description:
      "For money received outside a gateway — bank transfer or card to card. Activates the subscription immediately.",
    user: "Learner",
    userPlaceholder: "Select a learner",
    plan: "Plan",
    language: "Language",
    currency: "Currency",
    reference: "Reference / receipt no.",
    referencePlaceholder: "Optional",
    submit: "Record payment & activate",
    recorded: "Payment recorded and subscription activated",
  },

  refund: {
    action: "Refund",
    title: "Refund payment",
    description:
      "Records a refund against this payment. The original entry is kept — refunds are their own ledger line.",
    amount: "Amount (EUR)",
    reason: "Reason",
    submit: "Record refund",
    done: "Refund recorded",
  },
};
