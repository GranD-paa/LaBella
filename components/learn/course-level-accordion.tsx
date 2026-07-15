"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  Layers,
  Lock,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { CurriculumLanguage } from "@/lib/curriculum/types";
import { cn } from "@/lib/utils";

export function CourseLevelAccordion({
  language,
}: {
  language: CurriculumLanguage;
}) {
  const [openLevel, setOpenLevel] = useState<string | null>(language.levels[0]?.slug ?? null);

  return (
    <div className="space-y-3">
      {language.levels.map((level) => {
        const isOpen = openLevel === level.slug;

        return (
          <div
            key={level.slug}
            className="brand-surface overflow-hidden transition-all"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
              onClick={() =>
                setOpenLevel((current) =>
                  current === level.slug ? null : level.slug
                )
              }
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-accent/15 text-sm font-bold text-brand-accent">
                  {level.code}
                </div>
                <div>
                  <p className="font-semibold">{level.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {level.description}
                  </p>
                </div>
              </div>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
              />
            </button>

            <div
              className={cn(
                "grid transition-all duration-300",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <div className="border-t border-white/10 px-5 pb-5 pt-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Badge variant="secondary" className="gap-1">
                      <Layers className="h-3 w-3" />
                      4 learning categories
                    </Badge>
                    <Link
                      href={`/learn/${language.slug}/${level.slug}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-brand transition hover:bg-primary/90"
                    >
                      <BookOpen className="h-4 w-4" />
                      Open {level.code}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ComingSoonLanguage({
  language,
}: {
  language: CurriculumLanguage;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed py-20 text-center">
      <span className="text-5xl">{language.flagEmoji}</span>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{language.headline}</h1>
        <p className="max-w-md text-muted-foreground">{language.description}</p>
      </div>
      <Badge variant="secondary" className="gap-1">
        <Lock className="h-3 w-3" />
        Coming soon
      </Badge>
    </div>
  );
}
