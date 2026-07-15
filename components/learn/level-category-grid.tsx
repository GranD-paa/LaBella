import Link from "next/link";
import {
  BookMarked,
  Eye,
  Languages,
  ListChecks,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CATEGORY_DEFINITIONS } from "@/lib/curriculum/languages";
import type { LanguageSlug, LevelSlug } from "@/lib/curriculum/types";
import { cn } from "@/lib/utils";

const CATEGORY_ICONS = {
  grammar: BookMarked,
  vocabulary: Languages,
  visual: Eye,
  quiz: ListChecks,
} as const;

const CATEGORY_ACCENTS = {
  grammar: "from-violet-500/15 to-purple-500/5",
  vocabulary: "from-sky-500/15 to-blue-500/5",
  visual: "from-amber-500/15 to-yellow-500/5",
  quiz: "from-emerald-500/15 to-green-500/5",
} as const;

export function LevelCategoryGrid({
  language,
  level,
  levelCode,
  levelTitle,
}: {
  language: LanguageSlug;
  level: LevelSlug;
  levelCode: string;
  levelTitle: string;
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Badge className="border-brand-accent/30 bg-brand-accent/10 text-brand-accent">
          {levelCode}
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight">{levelTitle}</h1>
        <p className="text-muted-foreground">
          Choose a learning category to continue your Italian journey.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {CATEGORY_DEFINITIONS.map((category) => {
          const Icon = CATEGORY_ICONS[category.slug];
          return (
            <Link
              key={category.slug}
              href={category.href(language, level)}
              className="group block"
            >
              <Card className="brand-surface h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/30 hover:shadow-brand">
                <div
                  className={cn(
                    "h-1.5 bg-gradient-to-r",
                    CATEGORY_ACCENTS[category.slug]
                  )}
                />
                <CardHeader>
                  <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/40 text-brand-accent transition-transform group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-sm font-medium text-brand-accent">
                    Open module →
                  </span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
