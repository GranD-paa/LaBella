"use client";

import { useMemo } from "react";

import { useTranslations } from "@/components/providers/locale-provider";
import {
  JALALI_MONTHS,
  jalaliMonthLength,
  todayJalali,
} from "@/lib/date/jalali";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { localizeDigits } from "@/lib/i18n/digits";

export type JalaliParts = {
  year: number | null;
  month: number | null;
  day: number | null;
};

/**
 * A birth date, in three parts, in the calendar the user was born in.
 *
 * Three fields and not a calendar popup. A date picker is built for choosing a
 * date near today — next Tuesday, the end of the month — and a birthday is
 * neither. Reaching 1375 through a month grid is thirty years of paging, and
 * every design system that has measured this (GOV.UK, Nielsen Norman) says the
 * same thing: for a date the person already knows, ask for it in parts and get
 * out of the way.
 *
 * Jalali, because that is the date an Iranian knows theirs in. It is stored as
 * a Gregorian `date` — `lib/date/jalali.ts` converts, exactly, on the way in.
 *
 * The day list follows the month and the year: Esfand is thirty days in 1403
 * and twenty-nine in 1404, and offering a thirtieth in the wrong year invites
 * an error message where a shorter list would have done.
 */
export function DateOfBirthField({
  value,
  onChange,
  disabled,
  labels,
  error,
  describedBy,
}: {
  value: JalaliParts;
  onChange: (next: JalaliParts) => void;
  disabled?: boolean;
  labels: {
    legend: string;
    year: string;
    month: string;
    day: string;
  };
  error?: string | null;
  describedBy?: string;
}) {
  const { locale } = useTranslations();
  const thisYear = useMemo(() => todayJalali().jy, []);

  /**
   * Newest first. A course for adults is filled in by people in their twenties
   * and thirties far more often than by anyone else, and a list that opens on
   * 1300 makes all of them scroll.
   */
  const years = useMemo(
    () =>
      Array.from({ length: thisYear - 1300 + 1 }, (_, index) => thisYear - index),
    [thisYear]
  );

  const daysInMonth =
    value.year && value.month ? jalaliMonthLength(value.year, value.month) : 31;

  const days = useMemo(
    () => Array.from({ length: daysInMonth }, (_, index) => index + 1),
    [daysInMonth]
  );

  /** Keeps the 31st from surviving a switch to a 30-day month. */
  function clampDay(next: JalaliParts): JalaliParts {
    if (next.year && next.month && next.day) {
      const limit = jalaliMonthLength(next.year, next.month);
      if (next.day > limit) {
        return { ...next, day: limit };
      }
    }
    return next;
  }

  const errorId = error ? `${describedBy ?? "dob"}-error` : undefined;

  return (
    <fieldset
      className="space-y-2"
      aria-describedby={[describedBy, errorId].filter(Boolean).join(" ") || undefined}
    >
      <legend className="mb-2 text-sm font-medium leading-none text-foreground">
        {labels.legend}
      </legend>

      <div className="grid grid-cols-[1.1fr_1.4fr_1fr] gap-2">
        <Part
          label={labels.year}
          value={value.year}
          disabled={disabled}
          invalid={Boolean(error)}
          onChange={(year) => onChange(clampDay({ ...value, year }))}
          options={years.map((year) => ({
            value: year,
            label: localizeDigits(String(year), locale),
          }))}
        />
        <Part
          label={labels.month}
          value={value.month}
          disabled={disabled}
          invalid={Boolean(error)}
          onChange={(month) => onChange(clampDay({ ...value, month }))}
          options={JALALI_MONTHS.map((name, index) => ({
            value: index + 1,
            label: name,
          }))}
        />
        <Part
          label={labels.day}
          value={value.day}
          disabled={disabled}
          invalid={Boolean(error)}
          onChange={(day) => onChange({ ...value, day })}
          options={days.map((day) => ({
            value: day,
            label: localizeDigits(String(day), locale),
          }))}
        />
      </div>

      {error ? (
        <p id={errorId} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

function Part({
  label,
  value,
  options,
  onChange,
  disabled,
  invalid,
}: {
  label: string;
  value: number | null;
  options: Array<{ value: number; label: string }>;
  onChange: (next: number) => void;
  disabled?: boolean;
  invalid?: boolean;
}) {
  return (
    <Select
      value={value === null ? undefined : String(value)}
      onValueChange={(next) => onChange(Number(next))}
      disabled={disabled}
    >
      {/* The visible label is the legend above; each part still needs its own
          name, or a screen reader reads three unlabelled comboboxes. */}
      <SelectTrigger aria-label={label} aria-invalid={invalid || undefined}>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent className="max-h-72">
        {options.map((option) => (
          <SelectItem key={option.value} value={String(option.value)}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
