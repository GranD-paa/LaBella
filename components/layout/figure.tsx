"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const COUNT_MS = 2000;
/* The readings rise on a CSS wave that opens at 120ms. The count starts with
   them, so the arriving figure and the climbing number are one movement rather
   than two. */
const COUNT_DELAY_MS = 120;

/**
 * Counts a reading up to its real value once, on arrival.
 *
 * The text goes straight to the node instead of through state: four figures at
 * 60fps is some 480 React renders a second for something decorative, and the
 * value React rendered is the value the count lands on, so nothing drifts out
 * of sync. Server-rendered output is the real number from the first byte — the
 * count only ever replaces a number that is already correct.
 *
 * Ease-out, because a counter that decelerates onto its value reads as
 * arriving, while a linear one reads as a machine being read out.
 */
function useCountUp(
  ref: React.RefObject<HTMLElement>,
  target: number,
  suffix: string
) {
  useEffect(() => {
    const node = ref.current;
    // Nothing to count towards, and nothing to count for a reader who has
    // asked the system for less movement.
    if (
      !node ||
      target === 0 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // The server sends the real number, and hydration arrives a few hundred
    // milliseconds after first paint — so the figure is held invisible by CSS
    // until this effect can claim it. If it is already on screen, hydration
    // was slow and the reading has been read: pulling it back to zero now
    // would be a number changing under someone, not an entrance. Leave it.
    if (Number(getComputedStyle(node).opacity) > 0.02) {
      return;
    }

    let frame = 0;
    let startedAt = 0;
    // Reveal and count are the same event, so the figure never appears at a
    // value it is about to abandon.
    node.dataset.counting = "";
    node.textContent = `0${suffix}`;

    const tick = (now: number) => {
      if (!startedAt) {
        startedAt = now;
      }
      const elapsed = now - startedAt - COUNT_DELAY_MS;
      if (elapsed >= 0) {
        const progress = Math.min(elapsed / COUNT_MS, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        node.textContent = `${Math.round(target * eased)}${suffix}`;
        if (progress >= 1) {
          return;
        }
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      // Whatever interrupted the count, the reading it leaves behind is true.
      node.textContent = `${target}${suffix}`;
      delete node.dataset.counting;
    };
  }, [ref, target, suffix]);
}

/** The strip of readings across a plate: one surface, divided by hairlines. */
export function FigureRail({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("plate-zone plate-figs plate-wave", className)}>
      {children}
    </div>
  );
}

/** One reading, engraved into the plate rather than boxed on top of it. */
export function Figure({
  label,
  value,
  note,
  suffix = "",
}: {
  label: React.ReactNode;
  value: number;
  note?: React.ReactNode;
  /** Printed after the figure and carried through the count — "%", so far. */
  suffix?: string;
}) {
  const figure = useRef<HTMLParagraphElement>(null);
  useCountUp(figure, value, suffix);

  return (
    <div className="plate-fig px-6 py-7 sm:px-8 sm:py-9">
      <p className="text-[0.8125rem] text-muted-foreground">{label}</p>
      {/* Spacing lives with the type in globals.css: the figure carries padding
          the gradient needs, and margins that cancel it out. */}
      <p ref={figure} className="plate-fig-value">{`${value}${suffix}`}</p>
      {note ? (
        <p className="mt-3 text-[0.8125rem] font-medium text-muted-foreground/70">
          {note}
        </p>
      ) : null}
    </div>
  );
}
