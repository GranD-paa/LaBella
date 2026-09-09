"use client";

import { useEffect, useRef } from "react";

import { foldDigits } from "@/lib/notify/phone";
import { cn } from "@/lib/utils";

const LENGTH = 6;

/**
 * Six boxes that behave like one field.
 *
 * The boxes are a visual convention, not a data model: the value is one
 * six-character string, and every interaction — typing, pasting, arrowing,
 * deleting — is applied to that string and then re-rendered across the boxes.
 * Treating each box as its own piece of state is where these components
 * usually go wrong, because the moment someone pastes a code or the phone
 * autofills one, six independent inputs have to be talked into agreeing.
 *
 * Paste is deliberately unimpeded. WCAG 2.2 puts blocking it under Accessible
 * Authentication: a code the user must retype by hand, from memory, between
 * two apps, is a cognitive test with no alternative offered. It is also just
 * how everybody enters these.
 *
 * `dir="ltr"` on the row, inside an RTL page: a numeric code reads left to
 * right, and the first box a user reaches for has to be the first digit.
 */
export function OtpInput({
  value,
  onChange,
  onComplete,
  disabled,
  invalid,
  label,
  describedBy,
  autoFocus,
}: {
  value: string;
  onChange: (next: string) => void;
  /** Fired once the sixth digit lands, from typing or from a paste. */
  onComplete?: (code: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  /** Names the group for screen readers, e.g. "کد شش‌رقمی". */
  label: string;
  describedBy?: string;
  /**
   * Puts the caret in the first box on mount.
   *
   * This is how the screen change is announced *and* made usable at once: the
   * person just watched a code arrive and their next act is to type it, so
   * anything short of a ready caret is a click they should not have to make.
   */
  autoFocus?: boolean;
}) {
  const boxes = useRef<Array<HTMLInputElement | null>>([]);
  const announced = useRef<string | null>(null);

  /**
   * What the value is right now, ahead of React catching up.
   *
   * Six digits typed quickly — or by a password manager, or by the automation
   * that tests this — arrive faster than the parent can re-render, so every
   * handler after the first would read a stale `value` from its closure and
   * write the new digit over the previous one. Two digits would land and the
   * rest would vanish.
   *
   * The mirror is updated the instant a digit is absorbed, so consecutive
   * keystrokes compose. It is re-synced from the prop whenever the parent
   * changes the value on its own — clearing the boxes after a wrong code.
   */
  const mirror = useRef(value);
  const emitted = useRef(value);
  if (value !== emitted.current) {
    mirror.current = value;
    emitted.current = value;
  }

  useEffect(() => {
    // Fire once per completed code, not once per render that happens to be
    // complete — otherwise a re-render after a failed submit resubmits it.
    if (value.length === LENGTH && announced.current !== value) {
      announced.current = value;
      onComplete?.(value);
    }
    if (value.length < LENGTH) {
      announced.current = null;
    }
  }, [value, onComplete]);

  /**
   * React's own `autoFocus` attribute does not survive the step swap: it
   * happens inside a transition, and the button that had focus unmounts
   * afterwards, taking the caret to <body> with it.
   *
   * `disabled` has to be in the deps, not just checked once. These boxes
   * mount while the transition that revealed them is still pending, so they
   * are disabled on their first render — and `focus()` on a disabled input is
   * silently ignored. Waiting for it to clear is what actually puts the caret
   * in the box, and it re-focuses after a rejected code, which is where the
   * person wants to be anyway.
   */
  useEffect(() => {
    if (autoFocus && !disabled) {
      boxes.current[0]?.focus();
    }
  }, [autoFocus, disabled]);

  function focusBox(index: number) {
    boxes.current[Math.min(Math.max(index, 0), LENGTH - 1)]?.focus();
  }

  /** Replaces the whole value from whatever arrived, wherever it arrived. */
  function absorb(raw: string, at: number) {
    const digits = foldDigits(raw).replace(/\D/g, "");
    if (!digits) {
      return;
    }
    const current = mirror.current;
    const next = (
      current.slice(0, at) +
      digits +
      current.slice(at + digits.length)
    ).slice(0, LENGTH);

    mirror.current = next;
    emitted.current = next;
    onChange(next);
    focusBox(at + digits.length);
  }

  /** Emits the whole value, for the handlers that remove rather than add. */
  function replaceAll(next: string) {
    mirror.current = next;
    emitted.current = next;
    onChange(next);
  }

  return (
    <div
      role="group"
      aria-label={label}
      aria-describedby={describedBy}
      dir="ltr"
      className="flex items-center justify-between gap-2"
    >
      {Array.from({ length: LENGTH }, (_, index) => (
        <input
          key={index}
          ref={(node) => {
            boxes.current[index] = node;
          }}
          // The label above points here, so clicking it lands on the first box.
          id={index === 0 ? "code-0" : undefined}
          // One field's worth of autofill, on the first box only: the phone
          // offers the code above the keyboard, and offering it six times is
          // six chances to fill the wrong box.
          autoComplete={index === 0 ? "one-time-code" : "off"}
          inputMode="numeric"
          // `text` rather than `number`: a number input brings spinners, drops
          // leading zeros, and lets the wheel change a digit under the cursor.
          type="text"
          // Two, so a keystroke in a full box replaces rather than refuses.
          maxLength={2}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-label={`${label} — ${index + 1}/${LENGTH}`}
          value={value[index] ?? ""}
          onChange={(event) => {
            const raw = foldDigits(event.target.value).replace(/\D/g, "");
            // A box that already held a digit reports the old one alongside
            // the new; only the new one is being typed. Autofill lands the
            // whole code in an empty first box, which passes through whole.
            const held = mirror.current[index] ?? "";
            absorb(
              held && raw.length > 1 ? raw.replace(held, "") : raw,
              index
            );
          }}
          onPaste={(event) => {
            // Handled rather than blocked: taking the text ourselves is what
            // lets a six-digit paste land across all six boxes instead of
            // stacking into one.
            event.preventDefault();
            absorb(event.clipboardData.getData("text"), 0);
          }}
          onKeyDown={(event) => {
            if (event.key === "Backspace") {
              event.preventDefault();
              const current = mirror.current;
              if (current[index]) {
                replaceAll(current.slice(0, index) + current.slice(index + 1));
              } else {
                replaceAll(current.slice(0, index - 1) + current.slice(index));
                focusBox(index - 1);
              }
              return;
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              focusBox(index - 1);
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              focusBox(index + 1);
            }
          }}
          onFocus={(event) => event.currentTarget.select()}
          className={cn(
            "h-14 w-full min-w-0 rounded-md border bg-input/60 text-center",
            "font-mono text-xl tabular-nums text-foreground",
            "transition-colors duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "disabled:cursor-not-allowed disabled:opacity-50",
            invalid
              ? "border-destructive"
              : value[index]
                ? "border-primary/70"
                : "border-border"
          )}
        />
      ))}
    </div>
  );
}
