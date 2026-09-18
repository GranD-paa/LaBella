import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * The plate: the material every signed-in surface is cut from.
 *
 * One object rather than a stack of cards — lit by a single lamp over the
 * corner the language starts at, with its zones cut in by engraved grooves.
 * The material itself lives in `globals.css` under `.plate-*`; these are the
 * shapes it gets cut into, in one place so a change to the idiom happens once.
 *
 * The public landing page and the blog have their own idiom and none of this
 * reaches them.
 */
export function Plate({
  tone,
  className,
  children,
}: {
  /** `reading` softens the lamp for surfaces someone stays on — a lesson, a
      quiz — where a hard light from one corner fights the text. */
  tone?: "reading";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn("plate", tone === "reading" && "plate--reading", className)}
    >
      {/* The lamp coming on. Once, on arrival. */}
      <span className="plate-sheen" aria-hidden />
      {children}
    </section>
  );
}

/** The masthead: what this surface is, whose it is, and the way back out. */
export function PlateHead({
  eyebrow,
  title,
  lede,
  action,
  className,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lede?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "plate-zone flex flex-wrap items-end justify-between gap-6 px-6 pb-8 pt-7 sm:px-10 sm:pb-10 sm:pt-9",
        className
      )}
    >
      <div className="min-w-0">
        {eyebrow ? (
          <p className="flex items-center gap-2.5 text-[0.8125rem] font-medium text-foreground/80">
            <span className="plate-dot" aria-hidden />
            {eyebrow}
          </p>
        ) : null}
        <h1 className={cn("plate-title", eyebrow && "mt-4")}>{title}</h1>
        {lede ? (
          <p className="mt-3.5 max-w-[46ch] text-[0.9375rem]/[1.9] text-muted-foreground">
            {lede}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

/** The gold inlay that closes a masthead. */
export function PlateHorizon() {
  return <div className="plate-zone plate-horizon" aria-hidden />;
}

/** A region of the plate. `groove` cuts it off from what is above; `well`
    drops it a shade below the face around it. */
export function PlateZone({
  groove,
  well,
  className,
  children,
}: {
  groove?: boolean;
  well?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "plate-zone",
        groove && "plate-groove",
        well && "plate-well",
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * A zone's title.
 *
 * The sentence under it qualifies the title, so it sits beside it rather than
 * pinned to the far end of a 1200px bar, where it reads as an unrelated
 * caption that happened to land in the same row.
 */
export function PlateZoneHead({
  title,
  hint,
  aside,
  className,
}: {
  title: React.ReactNode;
  hint?: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-baseline gap-x-3 gap-y-1 px-6 pb-5 pt-7 sm:px-10 sm:pt-8",
        className
      )}
    >
      <h2 className="text-[0.9375rem] font-semibold text-foreground">
        {title}
      </h2>
      {aside}
      {hint ? (
        <p className="text-[0.8125rem] font-medium text-muted-foreground/70">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/** A table of contents milled into the plate. */
export function PlateIndex({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <nav
      className={cn(
        "grid gap-x-7 px-3 py-4 sm:grid-cols-2 sm:px-7 sm:py-6",
        className
      )}
    >
      {children}
    </nav>
  );
}

/** A line in that contents: where it goes, the leader running out of it, and
    the way on. */
export function IndexRow({
  href,
  icon: Icon,
  label,
  className,
}: {
  href: string;
  icon?: LucideIcon;
  label: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("plate-row", className)}>
      {Icon ? (
        <Icon
          className="plate-row-icon h-[1.05rem] w-[1.05rem] shrink-0 text-foreground/60"
          aria-hidden
        />
      ) : null}
      <span className="min-w-0 truncate text-[0.9375rem] font-medium text-foreground/95">
        {label}
      </span>
      <span className="plate-leader" aria-hidden />
      <ChevronRight
        className="plate-chev h-4 w-4 shrink-0 text-foreground/45 rtl:rotate-180"
        aria-hidden
      />
    </Link>
  );
}
