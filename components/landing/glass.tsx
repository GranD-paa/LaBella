"use client";

import { cn } from "@/lib/utils";

import styles from "./glass.module.css";

/**
 * The landing page's glass idiom: one card, and the gold ornaments that go
 * inside it.
 *
 * Everything under the hero used to be a `rounded-2xl border bg-white/[0.02]`
 * box written out per section, which is how six sections ended up with five
 * slightly different cards. They are all this one now, so a change to the
 * material happens in `glass.module.css` and nowhere else.
 */

/**
 * Puts the pointer's position on the card as two custom properties, which is
 * where the specular bloom reads its centre from.
 *
 * Deliberately not state: this fires on every pointer move, and a re-render
 * per frame for a decorative highlight is not a trade worth making.
 */
export function trackPointer(event: React.PointerEvent<HTMLElement>) {
  const node = event.currentTarget;
  const box = node.getBoundingClientRect();
  node.style.setProperty("--gx", `${event.clientX - box.left}px`);
  node.style.setProperty("--gy", `${event.clientY - box.top}px`);
}

export function LiquidCard({
  as: Tag = "div",
  tone,
  still,
  className,
  contentClassName,
  children,
}: {
  /** The element to render. `li` and `article` keep list and pricing markup
      meaningful; everything else is a plain `div`. */
  as?: "div" | "article" | "li";
  /** `gold` is the emphasis card — used once per grid at most. */
  tone?: "gold";
  /** Drops the hover lift, for rows stacked in a list rather than a grid. */
  still?: boolean;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      className={cn(
        styles.card,
        tone === "gold" && styles.gold,
        still && styles.still,
        className
      )}
      onPointerMove={trackPointer}
    >
      <span aria-hidden className={styles.glow} />
      <div className={cn(styles.content, contentClassName)}>{children}</div>
    </Tag>
  );
}

/**
 * The item's place in its list, drawn as a gold arc rather than printed as a
 * number in gold text. Third of three closes the ring, which is a thing the
 * eye reads before it reads the digit.
 */
export function IndexDial({ index, total }: { index: number; total: number }) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const filled = (circumference * (index + 1)) / total;

  return (
    <span className={styles.dial}>
      <svg
        viewBox="0 0 48 48"
        aria-hidden
        className="absolute inset-0 h-full w-full -rotate-90"
      >
        <circle
          className={styles.dialTrack}
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          strokeWidth="2.5"
        />
        <circle
          className={styles.dialArc}
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference}`}
        />
      </svg>
      <span className={styles.dialNum}>{index + 1}</span>
    </span>
  );
}

/** The gold pane a module icon sits on. */
export function GoldTile({ children }: { children: React.ReactNode }) {
  return <span className={styles.tile}>{children}</span>;
}

/** A gold disc around a single glyph — a tick, a plus. */
export function GoldChip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span aria-hidden className={cn(styles.chip, className)}>
      {children}
    </span>
  );
}

/** The gold disc a step number sits in. */
export function StepDisc({ children }: { children: React.ReactNode }) {
  return <span className={styles.disc}>{children}</span>;
}

/** The gold thread leaving a step towards the next one. */
export function StepTrail() {
  return <span aria-hidden className={styles.trail} />;
}

/** Three bars, gold up to the slot this card names. */
export function DayMeter({
  index,
  total,
  className,
}: {
  index: number;
  total: number;
  className?: string;
}) {
  return (
    <span aria-hidden className={cn(styles.meter, className)}>
      {Array.from({ length: total }, (_, slot) => (
        <span
          key={slot}
          className={cn(styles.bar, slot <= index && styles.barOn)}
        />
      ))}
    </span>
  );
}

/** The soft light a grid of glass sits in front of. */
export function SectionBloom() {
  return <span aria-hidden className={styles.bloom} />;
}
