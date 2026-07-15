import { cookies } from "next/headers";

import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_KEY,
  isAppLocale,
} from "@/lib/i18n/config";
import { messages } from "@/lib/i18n/messages";
import { createTranslator } from "@/lib/i18n/translate";
import type { AppLocale } from "@/lib/i18n/types";

export async function getServerLocale(): Promise<AppLocale> {
  const cookieStore = await cookies();
  const stored = cookieStore.get(LOCALE_COOKIE_KEY)?.value;

  if (stored && isAppLocale(stored)) {
    return stored;
  }

  return DEFAULT_LOCALE;
}

export async function getServerTranslator() {
  const locale = await getServerLocale();
  return {
    locale,
    t: createTranslator(messages[locale]),
  };
}
