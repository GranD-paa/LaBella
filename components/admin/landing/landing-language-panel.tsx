"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Landmark, TriangleAlert } from "lucide-react";
import { toast } from "sonner";

import { setLandingLanguageVisibilityAction } from "@/app/admin/actions/landing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { LandingLanguageToggle } from "@/lib/landing/visibility";

/** Persian names for the landmark behind each language. */
const LANDMARK_LABELS: Record<string, string> = {
  colosseum: "کولوسئوم، رم",
  liberty: "مجسمهٔ آزادی، نیویورک",
  brandenburg: "دروازهٔ براندنبورگ، برلین",
  "hagia-sophia": "ایاصوفیه، استانبول",
  eiffel: "برج ایفل، پاریس",
  sagrada: "ساگرادا فامیلیا، بارسلون",
};

const LANGUAGE_LABELS: Record<string, string> = {
  italian: "ایتالیایی",
  english: "انگلیسی",
  german: "آلمانی",
  turkish: "ترکی",
  french: "فرانسه",
  spanish: "اسپانیایی",
};

/**
 * This panel is Persian-only, matching the blog. The rest of the admin runs
 * through the locale provider, but these two surfaces are used by the site
 * owner to manage Persian-facing content, so translating them into three
 * languages would be upkeep with no reader.
 */
export function LandingLanguagePanel({
  languages,
}: {
  languages: LandingLanguageToggle[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pendingSlug, setPendingSlug] = useState<string | null>(null);

  const visibleCount = languages.filter((entry) => entry.visible).length;

  function toggle(slug: string, next: boolean) {
    setPendingSlug(slug);
    startTransition(async () => {
      const result = await setLandingLanguageVisibilityAction(slug, next);
      setPendingSlug(null);

      if ("error" in result) {
        toast.error("تغییر ذخیره نشد.");
        return;
      }

      toast.success(
        next
          ? `${LANGUAGE_LABELS[slug] ?? slug} روی صفحهٔ اصلی نمایش داده می‌شود.`
          : `${LANGUAGE_LABELS[slug] ?? slug} از صفحهٔ اصلی برداشته شد.`
      );
      router.refresh();
    });
  }

  return (
    <div className="space-y-8" dir="rtl">
      <section className="brand-surface relative overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-0 bg-brand-gradient opacity-25" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <Badge className="border-brand-accent/30 bg-brand-accent/10 text-brand-accent">
              <Landmark className="me-1 h-3 w-3" />
              صفحهٔ اصلی
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              نمایش زبان‌ها روی صفحهٔ اصلی
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              هر شش بنای سه‌بعدی ساخته شده‌اند. اینجا فقط تصمیم می‌گیرید
              کدام‌شان را بازدیدکننده ببیند. این تنظیم از باز و بستهٔ بودنِ{" "}
              <em>دوره</em> جداست — آن را در بخش «مدیریت زبان‌ها» تغییر می‌دهید.
            </p>
          </div>
          <Button variant="outline" className="border-white/20" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
              بازگشت به داشبورد
            </Link>
          </Button>
        </div>
      </section>

      <Card className="brand-surface">
        <CardHeader className="space-y-1">
          <CardTitle>زبان‌های نمایش‌داده‌شده</CardTitle>
          <CardDescription>
            الان {visibleCount.toLocaleString("fa-IR")} زبان روی صفحهٔ اصلی
            نمایش داده می‌شود.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          {visibleCount === 0 ? (
            <p className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
              <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
              هیچ زبانی انتخاب نشده. صفحهٔ اصلی در این حالت به‌جای خالی ماندن،
              به زبان‌های پیش‌فرض برمی‌گردد.
            </p>
          ) : null}

          <ul className="divide-y divide-white/10 overflow-hidden rounded-lg border border-white/10">
            {languages.map((language) => (
              <li
                key={language.slug}
                className="flex flex-wrap items-center gap-4 px-4 py-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-2 font-medium">
                    {LANGUAGE_LABELS[language.slug] ?? language.slug}
                    {language.teaserOnly ? (
                      <Badge variant="secondary" className="text-xs">
                        بدون محتوا
                      </Badge>
                    ) : null}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {LANDMARK_LABELS[language.landmark] ?? language.landmark}
                  </p>
                  {language.teaserOnly ? (
                    <p className="mt-1 text-xs text-amber-200/80">
                      دورهٔ این زبان هنوز درسی ندارد؛ با نمایش آن، دکمه‌اش
                      «به‌زودی» می‌شود و کاربر به بن‌بست نمی‌خورد.
                    </p>
                  ) : null}
                </div>

                <Badge
                  className={
                    language.visible
                      ? "border-brand-accent/30 bg-brand-accent/10 text-brand-accent"
                      : ""
                  }
                  variant={language.visible ? "default" : "secondary"}
                >
                  {language.visible ? "نمایش" : "پنهان"}
                </Badge>

                <Button
                  variant={language.visible ? "outline" : "default"}
                  size="sm"
                  disabled={isPending && pendingSlug === language.slug}
                  onClick={() => toggle(language.slug, !language.visible)}
                >
                  {language.visible ? (
                    <>
                      <EyeOff className="me-1 h-4 w-4" />
                      پنهان کن
                    </>
                  ) : (
                    <>
                      <Eye className="me-1 h-4 w-4" />
                      نمایش بده
                    </>
                  )}
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
