"use client";

import { useState } from "react";
import { BookMarked, ChevronLeft, FileText } from "lucide-react";

import { GrammarReader } from "@/components/lessons/grammar-reader";
import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import type { SignedGrammarPage } from "@/lib/grammar/types";
import type { GrammarRule } from "@/types";

export type GrammarRuleWithPages = GrammarRule & {
  pages: SignedGrammarPage[];
  /** Where this learner stopped, or null if they have not opened it. */
  lastReadPage: number | null;
};

/**
 * The grammar tab: a list of titles, each opening into a document to read.
 *
 * A title with no pages uploaded yet still appears, saying so, because a
 * silently missing entry would look to the admin like the title failed to
 * save rather than like its PDF is still to come.
 */
export function GrammarRulesList({ rules }: { rules: GrammarRuleWithPages[] }) {
  const { t } = useTranslations();
  const [openRuleId, setOpenRuleId] = useState<string | null>(null);

  if (rules.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed py-16 text-center text-muted-foreground">
        <BookMarked className="h-8 w-8" />
        <p>{t("lesson.noGrammar")}</p>
      </div>
    );
  }

  const openRule = rules.find((rule) => rule.id === openRuleId);

  return (
    <>
      <div className="space-y-3">
        {rules.map((rule) => {
          const total = rule.pages.length;
          const readable = total > 0;

          return (
            <div
              key={rule.id}
              className="flex items-center justify-between gap-4 rounded-xl border bg-card p-5 shadow-sm"
            >
              <div className="min-w-0 space-y-1">
                <h3 dir="auto" className="font-semibold">
                  {rule.title}
                </h3>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <FileText className="h-3.5 w-3.5 shrink-0" />
                  {!readable
                    ? t("lesson.grammarNoPages")
                    : rule.lastReadPage
                      ? t("lesson.grammarReadTo", {
                          page: rule.lastReadPage,
                          total,
                        })
                      : t("lesson.grammarPageCount", { total })}
                </p>
              </div>

              <Button
                variant="outline"
                className="shrink-0"
                disabled={!readable}
                onClick={() => setOpenRuleId(rule.id)}
              >
                {t("lesson.grammarOpen")}
                <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </div>
          );
        })}
      </div>

      {openRule ? (
        <GrammarReader
          ruleId={openRule.id}
          title={openRule.title}
          pages={openRule.pages}
          startPage={openRule.lastReadPage ?? 1}
          onClose={() => setOpenRuleId(null)}
        />
      ) : null}
    </>
  );
}
