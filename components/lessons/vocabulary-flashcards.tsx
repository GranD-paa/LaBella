"use client";

import Image from "next/image";
import { Languages } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import type { Vocabulary } from "@/types";

export function VocabularyFlashcards({
  vocabulary,
}: {
  vocabulary: Vocabulary[];
}) {
  const { t } = useTranslations();

  if (vocabulary.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed py-16 text-center text-muted-foreground">
        <Languages className="h-8 w-8" />
        <p>{t("lesson.noVocabulary")}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {vocabulary.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-center rounded-xl border bg-card p-6 text-center shadow-sm"
        >
          {item.image_url ? (
            <div className="mb-4 overflow-hidden rounded-lg">
              <Image
                src={item.image_url}
                alt={item.word}
                width={160}
                height={160}
                className="h-40 w-40 object-cover"
                unoptimized
              />
            </div>
          ) : null}
          <p className="text-3xl font-bold tracking-tight">{item.word}</p>
          <p className="mt-2 text-lg text-muted-foreground">{item.translation}</p>
          {item.example_sentence ? (
            <p className="mt-4 text-sm italic text-muted-foreground">
              &ldquo;{item.example_sentence}&rdquo;
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
