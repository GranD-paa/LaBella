"use client";

import Image from "next/image";
import { Eye, Volume2 } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import type { Vocabulary } from "@/types";

export function VisualLearningGrid({
  vocabulary,
}: {
  vocabulary: Vocabulary[];
}) {
  const { t } = useTranslations();
  const visualItems = vocabulary.filter((item) => item.image_url);

  if (visualItems.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed py-16 text-center text-muted-foreground">
        <Eye className="h-8 w-8" />
        <p>{t("learn.visualEmpty")}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {visualItems.map((item) => (
        <article
          key={item.id}
          className="brand-surface overflow-hidden transition-transform hover:-translate-y-0.5"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/30">
            <Image
              src={item.image_url!}
              alt={item.word}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="space-y-2 p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-2xl font-bold tracking-tight">{item.word}</h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-accent/10 px-2.5 py-1 text-xs font-medium text-brand-accent">
                <Volume2 className="h-3.5 w-3.5" />
                {t("lesson.pronunciation")}
              </span>
            </div>
            <p className="text-lg text-muted-foreground">{item.translation}</p>
            {item.example_sentence ? (
              <p className="text-sm italic text-muted-foreground">
                &ldquo;{item.example_sentence}&rdquo;
              </p>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
