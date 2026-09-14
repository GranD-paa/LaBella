"use client";

import { useState, useTransition, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarClock,
  ExternalLink,
  ListPlus,
  Loader2,
  PauseCircle,
  Pencil,
  Play,
  Plus,
  RotateCcw,
  Trash2,
  Undo2,
} from "lucide-react";
import { toast } from "sonner";

import {
  addTopicAction,
  bulkAddTopicsAction,
  deleteTopicAction,
  retryTopicAction,
  runTopicNowAction,
  skipTopicAction,
  updateTopicAction,
  type TopicInput,
} from "@/app/admin/actions/blog-agent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { AdminTopic } from "@/lib/blog/agent/store";

import {
  ConfirmDialog,
  ErrorText,
  Field,
  StatusBadge,
  formatJalaliDay,
  formatTehranDateTime,
  reportResult,
  selectClassName,
  tehranInputValues,
  tomorrowInTehran,
  type Option,
} from "./shared";

const DEFAULT_TIME = "13:00";

function emptyDraft(): TopicInput {
  return {
    topic: "",
    notes: "",
    categorySlug: "",
    languageSlug: "",
    date: tomorrowInTehran(),
    time: DEFAULT_TIME,
  };
}

type Confirmation = { kind: "delete" | "run"; topic: AdminTopic };

export function TopicQueue({
  topics,
  categories,
  languages,
  autoPublish,
  maxAttempts,
}: {
  topics: AdminTopic[];
  categories: Option[];
  languages: Option[];
  autoPublish: boolean;
  maxAttempts: number;
}) {
  const router = useRouter();
  const [busy, startTransition] = useTransition();
  const [runningId, setRunningId] = useState<string | null>(null);
  const [editing, setEditing] = useState<AdminTopic | null>(null);
  const [confirm, setConfirm] = useState<Confirmation | null>(null);

  const upcoming = topics.filter(
    (topic) => topic.status === "pending" || topic.status === "running"
  );
  const finished = topics.filter(
    (topic) => topic.status !== "pending" && topic.status !== "running"
  );
  const locked = busy || runningId !== null;

  function perform(
    work: () => Promise<{ error: string; detail?: string } | { success: true }>,
    success: string
  ) {
    startTransition(async () => {
      if (reportResult(await work(), success)) router.refresh();
    });
  }

  // Not inside a transition: the article takes minutes, and the rest of the
  // queue should not look frozen while it is being written.
  async function runNow(topic: AdminTopic) {
    setRunningId(topic.id);
    const toastId = toast.loading(
      "ایجنت در حال نوشتن است؛ معمولاً ۱ تا ۳ دقیقه طول می‌کشد."
    );
    try {
      const result = await runTopicNowAction(topic.id);
      toast.dismiss(toastId);
      if ("error" in result) {
        toast.error(result.error, { description: result.detail, duration: 20_000 });
      } else {
        toast.success(result.message);
      }
    } catch {
      toast.dismiss(toastId);
      toast.error(
        "جواب اجرا به مرورگر نرسید. چند دقیقه بعد صفحه را تازه کنید؛ نتیجه در گزارش اجراها ثبت می‌شود."
      );
    } finally {
      setRunningId(null);
      router.refresh();
    }
  }

  function onConfirm() {
    if (!confirm) return;
    const { kind, topic } = confirm;
    setConfirm(null);
    if (kind === "run") {
      void runNow(topic);
    } else {
      perform(() => deleteTopicAction(topic.id), "موضوع حذف شد.");
    }
  }

  function renderRow(topic: AdminTopic) {
    const status = runningId === topic.id ? "running" : topic.status;
    const labels = [
      languages.find((language) => language.slug === topic.languageSlug)?.name,
      categories.find((category) => category.slug === topic.categorySlug)?.name,
    ].filter(Boolean);
    const published = topic.postStatus === "published";

    return (
      <li key={topic.id} className="px-4 py-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium">{topic.topic}</span>
              <StatusBadge status={status} />
              {topic.attempts > 0 && topic.status !== "done" ? (
                <span className="text-xs text-muted-foreground">
                  تلاش {topic.attempts.toLocaleString("fa-IR")} از{" "}
                  {maxAttempts.toLocaleString("fa-IR")}
                </span>
              ) : null}
            </div>

            <p className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              <CalendarClock className="h-3.5 w-3.5" aria-hidden />
              {formatTehranDateTime(topic.scheduledFor)}
              {labels.length > 0 ? <span>· {labels.join("، ")}</span> : null}
            </p>

            {topic.notes ? (
              <p className="line-clamp-2 text-sm text-muted-foreground">{topic.notes}</p>
            ) : null}

            {topic.lastError && topic.status !== "done" ? (
              <ErrorText>{topic.lastError}</ErrorText>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-1">
            {status === "running" ? (
              <span className="flex items-center gap-1.5 px-2 text-sm text-amber-300">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                در حال نوشتن
              </span>
            ) : null}

            {topic.status === "pending" && status !== "running" ? (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={locked}
                  onClick={() => setConfirm({ kind: "run", topic })}
                >
                  <Play className="me-1 h-4 w-4" />
                  اجرای فوری
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={locked}
                  onClick={() =>
                    perform(() => skipTopicAction(topic.id, true), "موضوع کنار گذاشته شد.")
                  }
                >
                  <PauseCircle className="me-1 h-4 w-4" />
                  کنار گذاشتن
                </Button>
              </>
            ) : null}

            {topic.status === "failed" ? (
              <Button
                size="sm"
                variant="ghost"
                disabled={locked}
                onClick={() =>
                  perform(() => retryTopicAction(topic.id), "موضوع دوباره به صف برگشت.")
                }
              >
                <RotateCcw className="me-1 h-4 w-4" />
                تلاش دوباره
              </Button>
            ) : null}

            {topic.status === "skipped" ? (
              <Button
                size="sm"
                variant="ghost"
                disabled={locked}
                onClick={() =>
                  perform(() => skipTopicAction(topic.id, false), "موضوع به صف برگشت.")
                }
              >
                <Undo2 className="me-1 h-4 w-4" />
                برگرداندن به صف
              </Button>
            ) : null}

            {topic.postSlug && topic.postId ? (
              <Button size="sm" variant="ghost" asChild>
                <Link
                  href={published ? `/blog/${topic.postSlug}` : `/admin/blog/${topic.postId}`}
                  target={published ? "_blank" : undefined}
                >
                  <ExternalLink className="me-1 h-4 w-4" />
                  {published ? "دیدن مطلب" : "باز کردن پیش‌نویس"}
                </Link>
              </Button>
            ) : null}

            {["pending", "failed", "skipped"].includes(topic.status) && status !== "running" ? (
              <Button
                size="sm"
                variant="ghost"
                disabled={locked}
                onClick={() => setEditing(topic)}
              >
                <Pencil className="me-1 h-4 w-4" />
                ویرایش
              </Button>
            ) : null}

            {status !== "running" ? (
              <Button
                size="sm"
                variant="ghost"
                className="text-red-300 hover:text-red-200"
                disabled={locked}
                onClick={() => setConfirm({ kind: "delete", topic })}
              >
                <Trash2 className="me-1 h-4 w-4" />
                حذف
              </Button>
            ) : null}
          </div>
        </div>
      </li>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <AddTopicCard categories={categories} languages={languages} />
        <BulkAddCard />
      </div>

      <Card className="brand-surface">
        <CardHeader className="space-y-1">
          <CardTitle>موضوع‌های پیش رو</CardTitle>
          <CardDescription>
            هر اجرای خودکار فقط یک موضوع را که وقتش رسیده برمی‌دارد، پس یک
            فهرست اشتباه هیچ‌وقت همه‌اش یک‌جا منتشر نمی‌شود.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {upcoming.length === 0 ? (
            <p className="rounded-lg border border-white/10 p-8 text-center text-muted-foreground">
              صف خالی است. از فرم بالا یک موضوع اضافه کنید یا یک فهرست را یک‌جا بچسبانید.
            </p>
          ) : (
            <ul className="divide-y divide-white/10 overflow-hidden rounded-lg border border-white/10">
              {upcoming.map(renderRow)}
            </ul>
          )}
        </CardContent>
      </Card>

      {finished.length > 0 ? (
        <Card className="brand-surface">
          <CardHeader className="space-y-1">
            <CardTitle>انجام‌شده، ناموفق و کنارگذاشته</CardTitle>
            <CardDescription>
              حذف یک موضوع انجام‌شده، مطلبی را که از آن منتشر شده حذف نمی‌کند.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-white/10 overflow-hidden rounded-lg border border-white/10">
              {finished.map(renderRow)}
            </ul>
          </CardContent>
        </Card>
      ) : null}

      <EditTopicDialog
        topic={editing}
        categories={categories}
        languages={languages}
        onClose={() => setEditing(null)}
      />

      <ConfirmDialog
        open={confirm !== null}
        onOpenChange={(open) => {
          if (!open) setConfirm(null);
        }}
        title={confirm?.kind === "run" ? "همین حالا نوشته شود؟" : "موضوع حذف شود؟"}
        description={
          confirm?.kind === "run"
            ? `ایجنت «${confirm.topic.topic}» را الان می‌نویسد و ${
                autoPublish ? "روی سایت منتشر می‌کند" : "به‌صورت پیش‌نویس ذخیره می‌کند"
              }. این کار ۱ تا ۳ دقیقه طول می‌کشد و هزینهٔ یک مقاله را دارد.`
            : confirm
              ? `«${confirm.topic.topic}» از صف حذف می‌شود.${
                  confirm.topic.postSlug ? " مطلبی که از آن منتشر شده سر جایش می‌ماند." : ""
                }`
              : ""
        }
        confirmLabel={confirm?.kind === "run" ? "بنویس" : "حذف"}
        destructive={confirm?.kind === "delete"}
        onConfirm={onConfirm}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------

function TopicFields({
  idPrefix,
  draft,
  onChange,
  categories,
  languages,
}: {
  idPrefix: string;
  draft: TopicInput;
  onChange: (draft: TopicInput) => void;
  categories: Option[];
  languages: Option[];
}) {
  const id = (name: string) => `${idPrefix}-${name}`;

  return (
    <div className="space-y-4">
      <Field
        id={id("topic")}
        label="موضوع"
        hint="همان چیزی که ایجنت درباره‌اش می‌نویسد، مثل یک سفارش کوتاه."
      >
        <Textarea
          id={id("topic")}
          rows={2}
          required
          value={draft.topic}
          aria-describedby={`${id("topic")}-hint`}
          onChange={(event) => onChange({ ...draft, topic: event.target.value })}
        />
      </Field>

      <Field
        id={id("notes")}
        label="راهنمایی برای نویسنده (اختیاری)"
        hint="زاویهٔ مطلب، مخاطب، یا نکته‌ای که حتماً باید بیاید."
      >
        <Textarea
          id={id("notes")}
          rows={2}
          value={draft.notes}
          aria-describedby={`${id("notes")}-hint`}
          onChange={(event) => onChange({ ...draft, notes: event.target.value })}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={id("language")} label="زبان">
          <select
            id={id("language")}
            className={selectClassName}
            value={draft.languageSlug}
            onChange={(event) => onChange({ ...draft, languageSlug: event.target.value })}
          >
            <option value="">ایجنت خودش انتخاب کند</option>
            {languages.map((language) => (
              <option key={language.slug} value={language.slug}>
                {language.name}
              </option>
            ))}
          </select>
        </Field>

        <Field id={id("category")} label="دسته">
          <select
            id={id("category")}
            className={selectClassName}
            value={draft.categorySlug}
            onChange={(event) => onChange({ ...draft, categorySlug: event.target.value })}
          >
            <option value="">ایجنت خودش انتخاب کند</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={id("date")} label="تاریخ انتشار" hint={formatJalaliDay(draft.date)}>
          <Input
            id={id("date")}
            type="date"
            dir="ltr"
            required
            value={draft.date}
            aria-describedby={`${id("date")}-hint`}
            onChange={(event) => onChange({ ...draft, date: event.target.value })}
          />
        </Field>

        <Field id={id("time")} label="ساعت (به وقت تهران)">
          <Input
            id={id("time")}
            type="time"
            dir="ltr"
            required
            value={draft.time}
            onChange={(event) => onChange({ ...draft, time: event.target.value })}
          />
        </Field>
      </div>
    </div>
  );
}

function AddTopicCard({
  categories,
  languages,
}: {
  categories: Option[];
  languages: Option[];
}) {
  const router = useRouter();
  const [draft, setDraft] = useState<TopicInput>(emptyDraft);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function submit(event: FormEvent) {
    event.preventDefault();
    startTransition(async () => {
      const result = await addTopicAction(draft);
      if ("error" in result) {
        setError(result.error);
        return;
      }
      setError(null);
      toast.success("به صف اضافه شد.");
      // The date and hour stay, since the next subject is usually for a
      // nearby day; the text is cleared so it is not added twice.
      setDraft({ ...emptyDraft(), date: draft.date, time: draft.time });
      router.refresh();
    });
  }

  return (
    <Card className="brand-surface">
      <CardHeader className="space-y-1">
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" aria-hidden />
          افزودن یک موضوع
        </CardTitle>
        <CardDescription>برای موضوعی که تاریخ یا توضیح خاصی دارد.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-4">
          <TopicFields
            idPrefix="add"
            draft={draft}
            onChange={setDraft}
            categories={categories}
            languages={languages}
          />
          {error ? (
            <p role="alert" className="text-sm text-red-300">
              {error}
            </p>
          ) : null}
          <Button type="submit" disabled={pending}>
            {pending ? (
              <Loader2 className="me-1 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="me-1 h-4 w-4" />
            )}
            افزودن به صف
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function BulkAddCard() {
  const router = useRouter();
  const [lines, setLines] = useState("");
  const [startDate, setStartDate] = useState("");
  const [time, setTime] = useState(DEFAULT_TIME);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const count = lines
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#")).length;

  function submit(event: FormEvent) {
    event.preventDefault();
    startTransition(async () => {
      const result = await bulkAddTopicsAction({ lines, startDate, time });
      if ("error" in result) {
        setError(result.error);
        return;
      }
      setError(null);
      toast.success(
        `${result.count.toLocaleString("fa-IR")} موضوع اضافه شد؛ اولین: ${formatTehranDateTime(result.firstSlot)}`
      );
      setLines("");
      router.refresh();
    });
  }

  return (
    <Card className="brand-surface">
      <CardHeader className="space-y-1">
        <CardTitle className="flex items-center gap-2">
          <ListPlus className="h-5 w-5" aria-hidden />
          افزودن فهرست
        </CardTitle>
        <CardDescription>
          هر خط یک موضوع؛ روزی یکی، به ترتیب همان خط‌ها زمان‌بندی می‌شوند.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-4">
          <Field
            id="bulk-lines"
            label="موضوع‌ها"
            hint={
              count > 0
                ? `${count.toLocaleString("fa-IR")} موضوع، یعنی ${count.toLocaleString("fa-IR")} روز.`
                : "خطی که با # شروع شود نادیده گرفته می‌شود."
            }
          >
            <Textarea
              id="bulk-lines"
              rows={9}
              value={lines}
              aria-describedby="bulk-lines-hint"
              onChange={(event) => setLines(event.target.value)}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              id="bulk-start"
              label="از تاریخ (اختیاری)"
              hint={
                startDate
                  ? formatJalaliDay(startDate)
                  : "خالی بماند، از روز بعد از آخرین موضوع صف شروع می‌شود."
              }
            >
              <Input
                id="bulk-start"
                type="date"
                dir="ltr"
                value={startDate}
                aria-describedby="bulk-start-hint"
                onChange={(event) => setStartDate(event.target.value)}
              />
            </Field>

            <Field id="bulk-time" label="ساعت انتشار (به وقت تهران)">
              <Input
                id="bulk-time"
                type="time"
                dir="ltr"
                required
                value={time}
                onChange={(event) => setTime(event.target.value)}
              />
            </Field>
          </div>

          {error ? (
            <p role="alert" className="text-sm text-red-300">
              {error}
            </p>
          ) : null}
          <Button type="submit" disabled={pending || count === 0}>
            {pending ? (
              <Loader2 className="me-1 h-4 w-4 animate-spin" />
            ) : (
              <ListPlus className="me-1 h-4 w-4" />
            )}
            افزودن همه به صف
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function EditTopicDialog({
  topic,
  categories,
  languages,
  onClose,
}: {
  topic: AdminTopic | null;
  categories: Option[];
  languages: Option[];
  onClose: () => void;
}) {
  return (
    <Dialog
      open={topic !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent dir="rtl" className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader className="text-right sm:text-right">
          <DialogTitle>ویرایش موضوع</DialogTitle>
          <DialogDescription>
            اگر تاریخ گذشته باشد، موضوع در اجرای خودکار بعدی نوشته می‌شود.
          </DialogDescription>
        </DialogHeader>
        {topic ? (
          <EditTopicForm
            key={topic.id}
            topic={topic}
            categories={categories}
            languages={languages}
            onDone={onClose}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function EditTopicForm({
  topic,
  categories,
  languages,
  onDone,
}: {
  topic: AdminTopic;
  categories: Option[];
  languages: Option[];
  onDone: () => void;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState<TopicInput>(() => {
    const slot = tehranInputValues(topic.scheduledFor);
    return {
      topic: topic.topic,
      notes: topic.notes ?? "",
      categorySlug: topic.categorySlug ?? "",
      languageSlug: topic.languageSlug ?? "",
      date: slot.date,
      time: slot.time,
    };
  });
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function submit(event: FormEvent) {
    event.preventDefault();
    startTransition(async () => {
      const result = await updateTopicAction({ ...draft, id: topic.id });
      if ("error" in result) {
        setError(result.error);
        return;
      }
      toast.success("تغییرها ذخیره شد.");
      onDone();
      router.refresh();
    });
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <TopicFields
        idPrefix="edit"
        draft={draft}
        onChange={setDraft}
        categories={categories}
        languages={languages}
      />
      {error ? (
        <p role="alert" className="text-sm text-red-300">
          {error}
        </p>
      ) : null}
      <DialogFooter className="gap-2 sm:justify-start sm:space-x-0">
        <Button type="submit" disabled={pending}>
          {pending ? <Loader2 className="me-1 h-4 w-4 animate-spin" /> : null}
          ذخیره
        </Button>
        <Button type="button" variant="outline" onClick={onDone}>
          انصراف
        </Button>
      </DialogFooter>
    </form>
  );
}
