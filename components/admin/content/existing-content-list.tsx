"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";

import {
  deleteContentQuiz,
  deleteContentVideo,
  loadLessonContent,
} from "@/app/admin/actions/content";
import { deleteGrammarRule } from "@/app/admin/actions/grammar";
import { deleteVocabulary } from "@/app/admin/actions/vocabulary";
import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog";
import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import type { ContentCategorySlug } from "@/lib/content-management/categories";
import {
  emptyLessonContent,
  type LessonContentItem,
} from "@/lib/content-management/lesson-content";
import type { ActionResult } from "@/lib/action-result";

/** Which action removes a thing, and how its count reads, per content type. */
const REMOVE: Record<
  ContentCategorySlug,
  { remove: (id: string) => Promise<ActionResult>; countKey: string | null }
> = {
  grammar: {
    remove: deleteGrammarRule,
    countKey: "admin.content.existing.pages",
  },
  vocabulary: { remove: deleteVocabulary, countKey: null },
  video: { remove: deleteContentVideo, countKey: null },
  quiz: {
    remove: deleteContentQuiz,
    countKey: "admin.content.existing.questions",
  },
  "level-exam": {
    remove: deleteContentQuiz,
    countKey: "admin.content.existing.questions",
  },
};

/**
 * What this lesson already holds in this section, and the way to remove it.
 *
 * The wizard could only ever add. A document uploaded to the wrong lesson, or
 * a word typed twice, had nowhere to go from here — so the step that creates
 * content now also shows what creating it has produced.
 */
export function ExistingContentList({
  lessonId,
  category,
  /** Bumped by the parent after a create, to pull the list forward. */
  refreshToken,
  onChanged,
}: {
  lessonId: string;
  category: ContentCategorySlug;
  refreshToken: number;
  onChanged?: () => void;
}) {
  const { t } = useTranslations();
  const [items, setItems] = useState<LessonContentItem[] | null>(null);
  const [isPending, startTransition] = useTransition();

  const load = useCallback(() => {
    startTransition(async () => {
      try {
        const content = await loadLessonContent(lessonId);
        setItems(
          "error" in content
            ? emptyLessonContent()[category]
            : content[category]
        );
      } catch {
        // A list that cannot be read is not worth taking the panel down for.
        setItems([]);
      }
    });
  }, [lessonId, category]);

  useEffect(load, [load, refreshToken]);

  const { remove, countKey } = REMOVE[category];

  async function handleRemove(id: string) {
    const result = await remove(id);
    if (!("error" in result)) {
      setItems((current) =>
        (current ?? []).filter((item) => item.id !== id)
      );
      onChanged?.();
    }
    return result;
  }

  if (items === null) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-muted/10 p-4 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        {t("admin.content.existing.loading")}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-muted/10 p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h4 className="text-sm font-semibold">
          {t("admin.content.existing.title")}
        </h4>
        <span className="text-xs text-muted-foreground">
          {isPending
            ? t("admin.content.existing.loading")
            : t("admin.content.existing.count", { count: items.length })}
        </span>
      </div>

      {items.length === 0 ? (
        <p className="py-4 text-center text-sm text-muted-foreground">
          {t("admin.content.existing.empty")}
        </p>
      ) : (
        <ul className="divide-y divide-white/10">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-3 py-2"
            >
              <div className="min-w-0 space-y-0.5">
                <p className="truncate text-sm font-medium">
                  <bdi>{item.label}</bdi>
                </p>
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  {item.note ? (
                    <span className="truncate">
                      <bdi>{item.note}</bdi>
                    </span>
                  ) : null}
                  {countKey && item.count !== null ? (
                    <span>{t(countKey, { count: item.count })}</span>
                  ) : null}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <Badge
                  variant={item.status === "published" ? "default" : "secondary"}
                  className="text-[11px] font-normal"
                >
                  {item.status === "published"
                    ? t("admin.quizzes.statusPublished")
                    : t("admin.quizzes.statusDraft")}
                </Badge>
                <DeleteConfirmDialog
                  title={t("admin.content.existing.deleteTitle")}
                  description={t("admin.content.existing.deleteDescription", {
                    title: item.label,
                  })}
                  successMessage={t("admin.content.existing.deleted")}
                  onConfirm={() => handleRemove(item.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
