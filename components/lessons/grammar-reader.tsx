"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { saveGrammarReadingProgress } from "@/app/actions/grammar-reading";
import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import type { SignedGrammarPage } from "@/lib/grammar/types";

/**
 * Reads one grammar title, a page at a time.
 *
 * Pages arrive as images with links that were signed for this learner and
 * expire shortly, so there is no document here to save and no URL worth
 * passing on. The obvious ways to pull an image out are turned off — dragging
 * it, the context menu, selecting it — which stops the accidental save without
 * pretending to stop a determined one.
 *
 * The interface is right-to-left: the button on the right goes forward, the
 * one on the left goes back, matching how a Persian reader turns a page.
 */
export function GrammarReader({
  ruleId,
  title,
  pages,
  startPage,
  onClose,
}: {
  ruleId: string;
  title: string;
  pages: SignedGrammarPage[];
  startPage: number;
  onClose: () => void;
}) {
  const { t } = useTranslations();
  const [index, setIndex] = useState(() =>
    Math.min(Math.max(startPage, 1), pages.length) - 1
  );

  // Turning pages quickly should not mean a write per page. The last position
  // after a pause is the only one worth recording, and the ref keeps the timer
  // from being reset by re-renders that did not change the page.
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      void saveGrammarReadingProgress(ruleId, index + 1);
    }, 1200);

    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [ruleId, index]);

  const go = useCallback(
    (delta: number) =>
      setIndex((current) =>
        Math.min(Math.max(current + delta, 0), pages.length - 1)
      ),
    [pages.length]
  );

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      // In a right-to-left reading order the left arrow advances.
      if (event.key === "ArrowLeft") go(1);
      if (event.key === "ArrowRight") go(-1);
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const page = pages[index];
  if (!page) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      <header className="flex items-center justify-between gap-3 border-b px-4 py-3">
        <h2 dir="auto" className="min-w-0 truncate font-semibold">
          {title}
        </h2>
        <div className="flex shrink-0 items-center gap-3">
          <span className="tabular-nums text-sm text-muted-foreground">
            {t("lesson.grammarPageOf", {
              page: String(index + 1),
              total: String(pages.length),
            })}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label={t("common.close")}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="relative flex-1 overflow-auto bg-muted/30 p-3 sm:p-6">
        <div
          className="relative mx-auto"
          style={{
            maxWidth: page.width ? `${page.width / 2}px` : "48rem",
            aspectRatio:
              page.width && page.height
                ? `${page.width} / ${page.height}`
                : undefined,
          }}
        >
          <Image
            src={page.url}
            alt={t("lesson.grammarPageOf", {
              page: String(index + 1),
              total: String(pages.length),
            })}
            fill
            unoptimized
            priority
            draggable={false}
            onContextMenu={(event) => event.preventDefault()}
            onDragStart={(event) => event.preventDefault()}
            className="select-none rounded-lg bg-white object-contain shadow-sm"
          />
        </div>
      </div>

      <footer className="flex items-center justify-between gap-3 border-t px-4 py-3">
        <Button
          variant="outline"
          onClick={() => go(1)}
          disabled={index >= pages.length - 1}
        >
          <ChevronLeft className="h-4 w-4" />
          {t("lesson.grammarNextPage")}
        </Button>
        <Button
          variant="outline"
          onClick={() => go(-1)}
          disabled={index === 0}
        >
          {t("lesson.grammarPreviousPage")}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </footer>
    </div>
  );
}
