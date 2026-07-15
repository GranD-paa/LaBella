import type { Metadata } from "next";

import { getServerTranslator } from "@/lib/i18n/server-locale";

export async function createPageMetadata(
  titleKey: string,
  descriptionKey?: string
): Promise<Metadata> {
  const { t } = await getServerTranslator();

  const title = t(titleKey);
  const description = descriptionKey ? t(descriptionKey) : undefined;

  return {
    title,
    ...(description
      ? {
          description,
          openGraph: { title, description },
          twitter: { title, description },
        }
      : {}),
  };
}
