"use client";

import type { ReactNode } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import type { AdminTopicStatus } from "@/lib/blog/agent/store";

/**
 * Small pieces every tab of the agent panel shares.
 *
 * Times are always shown and entered in Tehran time, whatever the browser's
 * own clock is set to: the owner schedules in Tehran, the database stores
 * UTC, and the conversion happens here and in `lib/blog/agent/schedule.ts`,
 * nowhere else.
 */

export type Option = { slug: string; name: string };

type ActionOutcome = { error: string; detail?: string } | { success: true };

const TEHRAN_OFFSET_MS = 3.5 * 60 * 60 * 1000;

/** «سه‌شنبه ۲۵ شهریور، ۱۳:۰۰», Tehran. */
export function formatTehranDateTime(iso: string): string {
  return new Intl.DateTimeFormat("fa-IR", {
    timeZone: "Asia/Tehran",
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso));
}

/** The Jalali reading of a `YYYY-MM-DD` value from a date input. */
export function formatJalaliDay(date: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return "";
  return new Intl.DateTimeFormat("fa-IR", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00Z`));
}

/** What a Tehran wall clock shows at this instant, as input values. */
export function tehranInputValues(iso: string): { date: string; time: string } {
  const shifted = new Date(new Date(iso).getTime() + TEHRAN_OFFSET_MS).toISOString();
  return { date: shifted.slice(0, 10), time: shifted.slice(11, 16) };
}

export function tomorrowInTehran(): string {
  return tehranInputValues(new Date(Date.now() + 86_400_000).toISOString()).date;
}

/** Toasts the outcome of an action. True when it succeeded. */
export function reportResult(result: ActionOutcome, success: string): boolean {
  if ("error" in result) {
    toast.error(result.error, result.detail ? { description: result.detail } : undefined);
    return false;
  }
  toast.success(success);
  return true;
}

export const TOPIC_STATUS: Record<AdminTopicStatus, { label: string; className: string }> = {
  pending: {
    label: "در صف",
    className: "border-sky-400/30 bg-sky-500/10 text-sky-300",
  },
  running: {
    label: "در حال نوشتن",
    className: "border-amber-400/30 bg-amber-500/10 text-amber-300",
  },
  done: {
    label: "انجام شد",
    className: "border-brand-accent/30 bg-brand-accent/10 text-brand-accent",
  },
  failed: {
    label: "ناموفق",
    className: "border-red-400/30 bg-red-500/10 text-red-300",
  },
  skipped: {
    label: "کنار گذاشته",
    className: "border-white/15 bg-white/5 text-muted-foreground",
  },
};

export function StatusBadge({ status }: { status: AdminTopicStatus }) {
  const meta = TOPIC_STATUS[status] ?? TOPIC_STATUS.pending;
  return <Badge className={meta.className}>{meta.label}</Badge>;
}

/** Native select, styled like `Input`. Radix Select is awkward in RTL and a
 * list of six languages does not need it. */
export const selectClassName =
  "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

/** A visible label, the control, and an optional hint tied to it. */
export function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="text-xs leading-relaxed text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/** Error text from the agent: Persian or English, so the browser picks the direction. */
export function ErrorText({ children }: { children: ReactNode }) {
  return (
    <p
      dir="auto"
      className="break-words rounded-md border border-red-400/20 bg-red-500/5 px-3 py-2 text-xs leading-relaxed text-red-300"
    >
      {children}
    </p>
  );
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  destructive = false,
  onConfirm,
  onOpenChange,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  destructive?: boolean;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent dir="rtl">
        <AlertDialogHeader className="text-right sm:text-right">
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="leading-relaxed">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:justify-start sm:space-x-0">
          <AlertDialogAction
            onClick={onConfirm}
            className={
              destructive
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : undefined
            }
          >
            {confirmLabel}
          </AlertDialogAction>
          <AlertDialogCancel className="mt-0">انصراف</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
