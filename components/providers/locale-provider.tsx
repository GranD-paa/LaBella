"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  DEFAULT_LOCALE,
  getLocaleDefinition,
  isAppLocale,
  LOCALE_COOKIE_KEY,
  LOCALE_STORAGE_KEY,
} from "@/lib/i18n/config";
import { messages } from "@/lib/i18n/messages";
import { createTranslator } from "@/lib/i18n/translate";
import type { AppLocale, TranslateParams } from "@/lib/i18n/types";

type LocaleContextValue = {
  locale: AppLocale;
  dir: "rtl" | "ltr";
  setLocale: (locale: AppLocale) => void;
  t: (key: string, params?: TranslateParams) => string;
  formatDate: (date: string | Date, options?: Intl.DateTimeFormatOptions) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): AppLocale {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored && isAppLocale(stored)) {
      return stored;
    }
  } catch {
    // ignore storage errors
  }

  return DEFAULT_LOCALE;
}

function persistLocaleCookie(locale: AppLocale) {
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${LOCALE_COOKIE_KEY}=${locale};path=/;max-age=${maxAge};samesite=lax`;
}

function applyDocumentLocale(locale: AppLocale) {
  const definition = getLocaleDefinition(locale);
  document.documentElement.lang = locale;
  document.documentElement.dir = definition.dir;
  document.body.dataset.locale = locale;
  document.body.classList.toggle("locale-fa", locale === "fa");
  persistLocaleCookie(locale);
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<AppLocale>(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = readStoredLocale();
    setLocaleState(stored);
    applyDocumentLocale(stored);
  }, []);

  const setLocale = useCallback((next: AppLocale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // ignore storage errors
    }
    applyDocumentLocale(next);
  }, []);

  const definition = getLocaleDefinition(locale);
  const translator = useMemo(() => createTranslator(messages[locale]), [locale]);

  const formatDate = useCallback(
    (date: string | Date, options?: Intl.DateTimeFormatOptions) => {
      const value = typeof date === "string" ? new Date(date) : date;
      return new Intl.DateTimeFormat(definition.dateLocale, options).format(value);
    },
    [definition.dateLocale]
  );

  const value = useMemo(
    () => ({
      locale,
      dir: definition.dir,
      setLocale,
      t: translator,
      formatDate,
    }),
    [definition.dir, formatDate, locale, setLocale, translator]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}

export function useTranslations() {
  const { t, locale, dir, setLocale, formatDate } = useLocale();
  return { t, locale, dir, setLocale, formatDate };
}
