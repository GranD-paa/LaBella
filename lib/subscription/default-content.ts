import type { LanguageSlug } from "@/lib/curriculum/types";
import type { SubscriptionPageContentRow, SubscriptionPlanRow } from "@/types";

const LANGUAGE_SLUGS: LanguageSlug[] = ["italian", "english", "german", "turkish"];

type PlanTemplate = Omit<SubscriptionPlanRow, "plan_slug" | "language_slug" | "updated_at">;

/**
 * Base plan copy shared across languages as a starting point — mirrors the
 * seed data inserted by the subscription migrations. Every language gets
 * its own row (admins customize price/discount/copy per language from
 * there), so this template is expanded into one row per language below.
 */
const PLAN_TEMPLATES: Record<"basic" | "pro" | "ultimate", PlanTemplate> = {
  basic: {
    price_eur: 2.99,
    discount_percent: 0,
    title: { fa: "بیسیک", en: "Basic", it: "Base" },
    description: {
      fa: "مناسب یادگیرندگانی که روی یک زبان تمرکز دارند.",
      en: "Perfect for focused learners starting one language.",
      it: "Perfetto per studenti concentrati su una lingua.",
    },
    features: [
      {
        fa: "۱ زبان فعال در هر زمان",
        en: "1 active language at a time",
        it: "1 lingua attiva alla volta",
      },
      {
        fa: "درس‌ها، واژگان و گرامر اصلی",
        en: "Core lessons, vocabulary & grammar",
        it: "Lezioni, vocabolario e grammatica di base",
      },
      {
        fa: "تا ۳ بار تلاش مجدد برای هر آزمون",
        en: "Up to 3 quiz retakes per lesson",
        it: "Fino a 3 tentativi per quiz",
      },
      {
        fa: "پیگیری پیشرفت در داشبورد",
        en: "Progress tracking on your dashboard",
        it: "Monitoraggio dei progressi sulla dashboard",
      },
    ],
    order_number: 1,
  },
  pro: {
    price_eur: 4.99,
    discount_percent: 0,
    title: { fa: "پرو", en: "Pro", it: "Pro" },
    description: {
      fa: "محبوب‌ترین طرح برای تمرین روزانه جدی.",
      en: "Our most popular plan for serious daily practice.",
      it: "Il piano più popolare per una pratica quotidiana seria.",
    },
    features: [
      {
        fa: "همه امکانات بیسیک",
        en: "Everything in Basic",
        it: "Tutto quello incluso nel piano Base",
      },
      {
        fa: "همه زبان‌های فعال فعلی",
        en: "All currently active languages",
        it: "Tutte le lingue attualmente attive",
      },
      {
        fa: "تلاش مجدد نامحدود آزمون",
        en: "Unlimited quiz retakes",
        it: "Tentativi illimitati per i quiz",
      },
      {
        fa: "گرامر پیشرفته و عمیق",
        en: "Extended grammar deep-dives",
        it: "Approfondimenti grammaticali avanzati",
      },
      {
        fa: "پشتیبانی ایمیلی اولویت‌دار",
        en: "Priority email support",
        it: "Supporto email prioritario",
      },
    ],
    order_number: 2,
  },
  ultimate: {
    price_eur: 5.99,
    discount_percent: 0,
    title: { fa: "اولتیمیت", en: "Ultimate", it: "Ultimate" },
    description: {
      fa: "حداکثر دسترسی برای یادگیرندگان حرفه‌ای.",
      en: "Maximum access for power learners and early adopters.",
      it: "Accesso massimo per utenti esperti e primi utilizzatori.",
    },
    features: [
      {
        fa: "همه امکانات پرو",
        en: "Everything in Pro",
        it: "Tutto quello incluso nel piano Pro",
      },
      {
        fa: "همه زبان‌های آینده پس از انتشار",
        en: "All future languages as they launch",
        it: "Tutte le lingue future al lancio",
      },
      {
        fa: "دسترسی آفلاین به درس‌ها (PWA)",
        en: "Offline lesson access (PWA)",
        it: "Accesso offline alle lezioni (PWA)",
      },
      {
        fa: "دسترسی زودهنگام به سطوح و ویژگی‌های جدید",
        en: "Early access to new levels & features",
        it: "Accesso anticipato a nuovi livelli e funzionalità",
      },
      {
        fa: "پیشنهاد مسیر یادگیری شخصی‌سازی‌شده",
        en: "Personalized learning path suggestions",
        it: "Suggerimenti di percorso di apprendimento personalizzati",
      },
    ],
    order_number: 3,
  },
};

/**
 * One row per (plan, language) pair — mirrors the seed data inserted by
 * `supabase/migrations/20260801100000_subscription_plans_per_language.sql`.
 * Used to seed local dev mode so both data sources start from the same
 * content.
 */
export const DEFAULT_SUBSCRIPTION_PLANS: SubscriptionPlanRow[] = (
  Object.entries(PLAN_TEMPLATES) as Array<
    [keyof typeof PLAN_TEMPLATES, PlanTemplate]
  >
).flatMap(([planSlug, template]) =>
  LANGUAGE_SLUGS.map((languageSlug) => ({
    ...template,
    plan_slug: planSlug,
    language_slug: languageSlug,
    updated_at: new Date(0).toISOString(),
  }))
);

export const DEFAULT_SUBSCRIPTION_PAGE_CONTENT: SubscriptionPageContentRow = {
  id: "default",
  hero_title: {
    fa: "طرح یادگیری خود را انتخاب کنید",
    en: "Choose your learning plan",
    it: "Scegli il tuo piano di apprendimento",
  },
  hero_subtitle: {
    fa: "{name}، با اشتراک ماهانه‌ای متناسب با اهدافتان، تجربه کامل لاپارلی را باز کنید.",
    en: "{name}, unlock the full Laparli experience with a monthly subscription tailored to your goals.",
    it: "{name}, sblocca l'esperienza completa di Laparli con un abbonamento su misura per i tuoi obiettivi.",
  },
  footer_note: {
    fa: "اشتراک هر ۳۰ روز تمدید می‌شود. پس از فعال شدن پرداخت، هر زمان می‌توانید طرح را تغییر دهید یا لغو کنید. قیمت‌ها به یورو نمایش داده می‌شوند.",
    en: "Subscriptions renew every 30 days. You can change or cancel your plan anytime once payments go live. Prices are shown in EUR.",
    it: "Gli abbonamenti si rinnovano ogni 30 giorni. Puoi cambiare o annullare il piano in qualsiasi momento una volta attivati i pagamenti. I prezzi sono in EUR.",
  },
  updated_at: new Date(0).toISOString(),
};
