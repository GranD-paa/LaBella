import type { AppLocale } from "@/lib/i18n/types";

export const LOCALE_STORAGE_KEY = "labella_ui_locale";
export const LOCALE_COOKIE_KEY = "labella_ui_locale";
export const DEFAULT_LOCALE: AppLocale = "fa";

export type LocaleDefinition = {
  code: AppLocale;
  label: string;
  nativeLabel: string;
  dir: "rtl" | "ltr";
  dateLocale: string;
};

export const LOCALES: LocaleDefinition[] = [
  {
    code: "fa",
    label: "Persian",
    nativeLabel: "فارسی",
    dir: "rtl",
    dateLocale: "fa-IR",
  },
  {
    code: "it",
    label: "Italian",
    nativeLabel: "Italiano",
    dir: "ltr",
    dateLocale: "it-IT",
  },
  {
    code: "en",
    label: "English",
    nativeLabel: "English",
    dir: "ltr",
    dateLocale: "en-US",
  },
];

export function isAppLocale(value: string): value is AppLocale {
  return LOCALES.some((locale) => locale.code === value);
}

export function getLocaleDefinition(locale: AppLocale) {
  return LOCALES.find((entry) => entry.code === locale) ?? LOCALES[0];
}
