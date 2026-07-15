import type { AppLocale, Messages } from "@/lib/i18n/types";
import en from "@/locales/en/translation.json";
import fa from "@/locales/fa/translation.json";
import it from "@/locales/it/translation.json";

export const messages: Record<AppLocale, Messages> = {
  en: en as Messages,
  fa: fa as Messages,
  it: it as Messages,
};
