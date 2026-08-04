export const adminAccountingFa = {
  pageBadge: "حسابداری",
  pageHello: "دفتر حساب و درآمد، {name}",
  pageSubtitle:
    "همه پرداخت‌ها، مشترکین و تمدیدنشده‌ها — همراه با نرخ ارزی که هر پرداخت ریالی با آن محاسبه شده.",
  backToDashboard: "بازگشت به داشبورد",

  kpi: {
    netRevenue: "درآمد خالص",
    netRevenueHint: "از ابتدا، پس از کسر بازپرداخت‌ها",
    thisMonth: "این ماه",
    vsLastMonth: "٪{percent} نسبت به ماه قبل",
    noComparison: "ماه قبل درآمدی نبوده",
    mrr: "درآمد ماهانه تکرارشونده",
    mrrHint: "MRR — درآمد ثابت هر ماه",
    arpu: "میانگین درآمد هر کاربر",
    arpuHint: "ARPU — به ازای هر مشترک",
    activeSubscribers: "مشترکین فعال",
    subscriptionsCount: "{count} اشتراک",
    churnRate: "نرخ ریزش",
    churnHint: "{count} نفر این ماه تمدید نکردند",
    refunded: "بازپرداخت‌شده",
    payments: "{count} پرداخت",
  },

  chart: {
    title: "روند درآمد",
    subtitle: "درآمد خالص هر ماه، پس از کسر بازپرداخت‌ها",
    empty: "هنوز درآمدی ثبت نشده.",
    monthLabel: "{month}",
    tooltipGross: "ناخالص",
    tooltipRefunds: "بازپرداخت",
    tooltipNet: "خالص",
    tooltipCount: "{count} پرداخت",
  },

  breakdown: {
    byLanguage: "درآمد به تفکیک زبان",
    byPlan: "درآمد به تفکیک پلن",
    empty: "هنوز داده‌ای برای تفکیک نیست.",
  },

  tabs: {
    ledger: "تراکنش‌ها",
    subscribers: "مشترکین",
    lapsed: "تمدید نکرده‌ها",
    expiring: "در آستانه انقضا",
    settings: "تنظیمات",
  },

  ledger: {
    title: "دفتر تراکنش‌ها",
    description: "همه پرداخت‌ها، جدیدترین اول. این دفتر فقط افزودنی است و پاک نمی‌شود.",
    date: "تاریخ",
    user: "کاربر",
    plan: "پلن",
    amount: "مبلغ",
    method: "روش",
    status: "وضعیت",
    reference: "کد پیگیری",
    empty: "هنوز پرداختی ثبت نشده.",
    exportCsv: "خروجی CSV",
    paidInRial: "{amount} با نرخ {rate}",
  },

  status: {
    pending: "در انتظار",
    succeeded: "پرداخت شده",
    failed: "ناموفق",
    refunded: "بازپرداخت شده",
    canceled: "لغو شده",
  },

  provider: {
    stripe: "استرایپ",
    zarinpal: "زرین‌پال",
    manual: "دستی",
  },

  subscribers: {
    title: "مشترکین فعال",
    description: "همه کسانی که همین حالا اشتراک فعال دارند.",
    language: "زبان",
    plan: "پلن",
    renewsOn: "تمدید",
    startedOn: "شروع",
    empty: "هنوز مشترک فعالی نیست.",
    cancelling: "در پایان دوره لغو می‌شود",
  },

  lapsed: {
    title: "تمدید نکرده‌ها",
    description:
      "اشتراک‌هایی که دوره پرداختی‌شان تمام شده. آن‌هایی که هنوز در مهلت ارفاق هستند معمولاً قابل بازگرداندن‌اند.",
    endedOn: "پایان",
    inGrace: "در مهلت ارفاق",
    gone: "منقضی شده",
    empty: "هیچ‌کس تمدید را از دست نداده.",
  },

  expiring: {
    title: "انقضا تا ۷ روز آینده",
    description: "تمدیدهای نزدیک — همان‌هایی که ارزش یادآوری دارند.",
    daysLeft: "{count} روز مانده",
    tomorrow: "فردا منقضی می‌شود",
    today: "امروز منقضی می‌شود",
    empty: "این هفته چیزی منقضی نمی‌شود.",
  },

  settings: {
    title: "قیمت‌گذاری و درگاه‌ها",
    description: "منبع نرخ ارز، حاشیه سود، و اینکه کدام روش‌های پرداخت فعال باشند.",
    currentRate: "نرخ فعلی",
    rateSource: "منبع",
    rateUpdated: "به‌روزرسانی {time}",
    rateNever: "هنوز نرخی دریافت نشده",
    rialPerEur: "{amount} ریال به ازای هر ۱ یورو",
    tomanPerEur: "{amount} تومان به ازای هر ۱ یورو",
    irrEnabled: "نمایش قیمت ریالی",
    irrEnabledHint: "قیمت ریالی را نشان می‌دهد و درگاه‌های ایرانی را فعال می‌کند.",
    fxSource: "منبع نرخ ارز",
    fxSourceTgju: "TGJU — بازار آزاد (پیشنهادی)",
    fxSourceNavasan: "نوسان — نیازمند کلید API",
    fxSourceManual: "دستی — نرخ را خودم وارد می‌کنم",
    fxSourceHint:
      "سرویس‌های بین‌المللی نرخ رسمی ایران را می‌دهند که فاصله زیادی با نرخ بازار دارد. این منابع نرخ بازار آزاد را دنبال می‌کنند.",
    fxMargin: "حاشیه (٪)",
    fxMarginHint: "روی نرخ بازار اضافه می‌شود تا اختلاف نرخ و کارمزد درگاه پوشش داده شود.",
    irrRounding: "گرد کردن قیمت ریالی به",
    irrRoundingHint: "قیمت‌ها به بالا و به مضربی از این عدد گرد می‌شوند تا به صفر ختم شوند.",
    fxManualRate: "نرخ دستی (ریال به ازای ۱ یورو)",
    fxMaxDeviation: "رد کردن تغییر نرخ بیش از (٪)",
    fxMaxDeviationHint:
      "اگر نرخ جدید بیش از این مقدار جهش کند، به‌جای اعمال، برای بررسی نگه داشته می‌شود — معمولاً یعنی منبع واحدش را عوض کرده.",
    gateways: "روش‌های پرداخت",
    stripeEnabled: "استرایپ (کارت بین‌المللی، یورو)",
    zarinpalEnabled: "زرین‌پال (درگاه‌های ایرانی، ریال)",
    manualEnabled: "ثبت دستی (واریز بانکی)",
    gracePeriod: "مهلت ارفاق (روز)",
    gracePeriodHint: "پس از پایان دوره، چند روز دسترسی ادامه پیدا کند تا قطع شود.",
    save: "ذخیره تنظیمات",
    saved: "تنظیمات ذخیره شد",
    refreshRate: "به‌روزرسانی نرخ",
    rateRefreshed: "نرخ ارز به‌روزرسانی شد",
    rateRejected: "نرخ رد شد: {reason}",
  },

  manual: {
    title: "ثبت پرداخت",
    description:
      "برای پولی که خارج از درگاه دریافت شده — واریز بانکی یا کارت به کارت. اشتراک بلافاصله فعال می‌شود.",
    user: "کاربر",
    userPlaceholder: "یک کاربر انتخاب کنید",
    plan: "پلن",
    language: "زبان",
    currency: "ارز",
    reference: "کد پیگیری / شماره رسید",
    referencePlaceholder: "اختیاری",
    submit: "ثبت پرداخت و فعال‌سازی",
    recorded: "پرداخت ثبت و اشتراک فعال شد",
  },

  refund: {
    action: "بازپرداخت",
    title: "بازپرداخت پرداخت",
    description:
      "یک بازپرداخت روی این تراکنش ثبت می‌کند. رکورد اصلی حفظ می‌شود — بازپرداخت خودش یک سطر جدا در دفتر است.",
    amount: "مبلغ (یورو)",
    reason: "دلیل",
    submit: "ثبت بازپرداخت",
    done: "بازپرداخت ثبت شد",
  },
};
