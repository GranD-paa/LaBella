"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, RotateCcw, Save } from "lucide-react";

import { resetPromptAction, savePromptAction } from "@/app/admin/actions/blog-agent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { PromptOverrides, PromptSectionKey } from "@/lib/blog/agent/prompts";

import { ConfirmDialog, reportResult } from "./shared";

const SECTIONS: {
  key: PromptSectionKey;
  title: string;
  description: string;
  dir: "rtl" | "ltr";
}[] = [
  {
    key: "brandVoice",
    title: "لحن و قواعد نگارش",
    description:
      "شخصیت نویسنده، قواعد فارسی درست، و چیزهایی که هرگز نباید نوشته شوند.",
    dir: "rtl",
  },
  {
    key: "seoRules",
    title: "سئو و لینک داخلی",
    description: "ساختار مقاله، شکل مثال‌ها، و قاعدهٔ لینک‌دادن به مطلب‌های دیگر.",
    dir: "rtl",
  },
  {
    key: "coverGuidance",
    title: "راهنمای تصویر شاخص",
    description:
      "به نویسنده می‌گوید برای هر مقاله چه نوع تصویری پیشنهاد بدهد: کلمه‌محور یا صحنه‌محور.",
    dir: "rtl",
  },
  {
    key: "imageStyle",
    title: "سبک بصری تصویر",
    description:
      "دستورهای انگلیسی برای مدل تصویر، هر خط یک دستور. رنگ و حال‌وهوای همهٔ تصویرها از همین‌جا می‌آید.",
    dir: "ltr",
  },
];

export function PromptEditor({
  overrides,
  defaults,
}: {
  overrides: PromptOverrides;
  defaults: Record<PromptSectionKey, string>;
}) {
  return (
    <div className="space-y-6">
      <Card className="brand-surface">
        <CardContent className="flex items-start gap-3 pt-6 text-sm leading-relaxed text-muted-foreground">
          <Lock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <p>
            تغییرها از اجرای بعدی اعمال می‌شوند. بخش‌های فنی، یعنی قالب خروجی،
            فهرست دسته‌ها و زبان‌ها و فهرست مطلب‌ها برای لینک داخلی، قفل‌اند تا
            ویرایش متن، ایجنت را خراب نکند.
          </p>
        </CardContent>
      </Card>

      {SECTIONS.map((section) => (
        <PromptSection
          key={section.key}
          section={section}
          saved={overrides[section.key] ?? null}
          fallback={defaults[section.key]}
        />
      ))}
    </div>
  );
}

function PromptSection({
  section,
  saved,
  fallback,
}: {
  section: (typeof SECTIONS)[number];
  saved: string | null;
  fallback: string;
}) {
  const router = useRouter();
  const current = saved ?? fallback;
  const [text, setText] = useState(current);
  const [pending, startTransition] = useTransition();
  const [confirmReset, setConfirmReset] = useState(false);

  // After a save or reset the server's value changes; pick it up. Saving a
  // different section does not change `current` here, so typing in this box
  // is never overwritten by someone else's save.
  useEffect(() => {
    setText(current);
  }, [current]);

  const dirty = text !== current;
  const customised = saved !== null;
  const textareaId = `prompt-${section.key}`;

  function save() {
    startTransition(async () => {
      const result = await savePromptAction({ section: section.key, text });
      if (reportResult(result, "ذخیره شد؛ از اجرای بعدی اعمال می‌شود.")) {
        // The server stores the text trimmed. Matching that here keeps a
        // trailing newline from leaving the box marked "not saved" when the
        // text turns out to be the default and `current` never moves.
        setText(text.trim());
        router.refresh();
      }
    });
  }

  function reset() {
    startTransition(async () => {
      const result = await resetPromptAction(section.key);
      if (reportResult(result, "به متن پیش‌فرض برگشت.")) {
        setText(fallback);
        router.refresh();
      }
    });
  }

  return (
    <Card className="brand-surface">
      <CardHeader className="space-y-1">
        <CardTitle className="flex flex-wrap items-center gap-2">
          <label htmlFor={textareaId}>{section.title}</label>
          {customised ? (
            <Badge className="border-amber-400/30 bg-amber-500/10 text-amber-300">
              ویرایش‌شده
            </Badge>
          ) : (
            <Badge variant="secondary">پیش‌فرض</Badge>
          )}
          {dirty ? (
            <Badge className="border-sky-400/30 bg-sky-500/10 text-sky-300">
              ذخیره نشده
            </Badge>
          ) : null}
        </CardTitle>
        <CardDescription>{section.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Textarea
          id={textareaId}
          dir={section.dir}
          rows={14}
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="font-normal leading-7"
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">
            {text.length.toLocaleString("fa-IR")} حرف
          </span>
          <div className="flex flex-wrap gap-2">
            <Button onClick={save} disabled={!dirty || pending}>
              {pending ? (
                <Loader2 className="me-1 h-4 w-4 animate-spin" />
              ) : (
                <Save className="me-1 h-4 w-4" />
              )}
              ذخیره
            </Button>
            {dirty ? (
              <Button variant="outline" onClick={() => setText(current)} disabled={pending}>
                لغو تغییرها
              </Button>
            ) : null}
            {customised ? (
              <Button
                variant="ghost"
                onClick={() => setConfirmReset(true)}
                disabled={pending}
              >
                <RotateCcw className="me-1 h-4 w-4" />
                برگشت به پیش‌فرض
              </Button>
            ) : null}
          </div>
        </div>
      </CardContent>

      <ConfirmDialog
        open={confirmReset}
        onOpenChange={setConfirmReset}
        title="به متن پیش‌فرض برگردد؟"
        description={`متن ویرایش‌شدهٔ «${section.title}» پاک می‌شود و ایجنت دوباره از متن اصلی استفاده می‌کند.`}
        confirmLabel="برگرداندن"
        destructive
        onConfirm={reset}
      />
    </Card>
  );
}
