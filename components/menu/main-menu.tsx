import Link from "next/link";
import { Compass, LayoutGrid } from "lucide-react";

import { LanguageCard } from "@/components/menu/language-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LANGUAGES } from "@/lib/curriculum/languages";

export function MainMenu({
  displayName,
}: {
  displayName: string;
}) {
  return (
    <div className="space-y-8">
      <section className="brand-surface relative overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-0 bg-brand-gradient opacity-25" />
        <div className="relative space-y-4">
          <Badge className="border-brand-accent/30 bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/15">
            <LayoutGrid className="mr-1 h-3 w-3" />
            Main Menu
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Choose your learning path, {displayName}
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Select a language to begin. Your dashboard tracks progress separately
            from this learning hub.
          </p>
          <Button
            variant="outline"
            className="border-white/20 bg-white/5"
            asChild
          >
            <Link href="/dashboard">
              <Compass className="h-4 w-4" />
              Open dashboard
            </Link>
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Language courses</h2>
          <p className="text-sm text-muted-foreground">
            Italian is live now. More languages are on the way.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {LANGUAGES.map((language) => (
            <LanguageCard key={language.slug} language={language} />
          ))}
        </div>
      </section>
    </div>
  );
}
