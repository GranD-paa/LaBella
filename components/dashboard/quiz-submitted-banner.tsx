"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { useTranslations } from "@/components/providers/locale-provider";

export function QuizSubmittedBanner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useTranslations();

  const submitted = searchParams.get("quizSubmitted") === "1";
  const scoreParam = searchParams.get("score");
  const score = scoreParam ? Number.parseInt(scoreParam, 10) : null;

  useEffect(() => {
    if (!submitted) {
      return;
    }

    toast.success(
      Number.isFinite(score)
        ? t("dashboard.user.quizSubmittedToastWithScore", { score: score ?? 0 })
        : t("dashboard.user.quizSubmittedToast")
    );

    router.replace("/dashboard", { scroll: false });
  }, [router, score, submitted, t]);

  if (!submitted) {
    return null;
  }

  return (
    <div className="flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
      <div className="space-y-1">
        <p className="font-semibold text-emerald-700 dark:text-emerald-300">
          {t("dashboard.user.quizSubmittedTitle")}
        </p>
        <p className="text-sm text-muted-foreground">
          {Number.isFinite(score)
            ? t("dashboard.user.quizSubmittedDescriptionWithScore", {
                score: score ?? 0,
              })
            : t("dashboard.user.quizSubmittedDescription")}
        </p>
      </div>
    </div>
  );
}
