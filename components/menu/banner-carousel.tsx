"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { cn } from "@/lib/utils";
import type { Banner } from "@/types";

const AUTO_ADVANCE_MS = 6000;
// Below this drag distance a pointer interaction is treated as a tap/click
// rather than a swipe, so links inside a banner still open normally.
const DRAG_CLICK_THRESHOLD_PX = 8;
// Fraction of the container's width a swipe must cross before it commits to
// changing slides instead of snapping back to the current one.
const SWIPE_COMMIT_RATIO = 0.15;

export function BannerCarousel({ banners }: { banners: Banner[] }) {
  const { t } = useTranslations();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragOffsetPx, setDragOffsetPx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef(0);
  const didDragRef = useRef(false);

  const count = banners.length;

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex(((next % count) + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (count <= 1 || isPaused) return;

    // Defensively clear any previous interval before creating a new one —
    // React 18 Strict Mode's dev-only double-invoke of this effect can
    // otherwise leak a stray interval that keeps ticking in the background.
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, AUTO_ADVANCE_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [count, isPaused]);

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (count <= 1 || event.pointerType === "mouse") return;
    dragStartXRef.current = event.clientX;
    didDragRef.current = false;
    setIsDragging(true);
    setIsPaused(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    const delta = event.clientX - dragStartXRef.current;
    if (Math.abs(delta) > DRAG_CLICK_THRESHOLD_PX) {
      didDragRef.current = true;
    }
    setDragOffsetPx(delta);
  }

  function endDrag() {
    if (!isDragging) return;
    const width = trackRef.current?.offsetWidth || 1;
    if (Math.abs(dragOffsetPx) > width * SWIPE_COMMIT_RATIO) {
      goTo(dragOffsetPx < 0 ? index + 1 : index - 1);
    }
    setIsDragging(false);
    setDragOffsetPx(0);
    setIsPaused(false);
  }

  if (count === 0) {
    return null;
  }

  return (
    <section
      dir="ltr"
      className="brand-surface group relative aspect-[21/9] w-full overflow-hidden sm:aspect-[3/1]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={trackRef}
        className={cn(
          "flex h-full w-full touch-pan-y select-none ease-out",
          isDragging ? "transition-none" : "transition-transform duration-700"
        )}
        style={{ transform: `translateX(calc(${index * -100}% + ${dragOffsetPx}px))` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {banners.map((banner) => {
          const media = (
            <div className="relative h-full w-full shrink-0 basis-full">
              <Image
                src={banner.image_url}
                alt={banner.title ?? ""}
                fill
                unoptimized
                priority={banner.id === banners[0].id}
                className="object-cover"
              />
              {banner.title ? (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-4 sm:p-6">
                  <p dir="auto" className="text-base font-semibold text-white sm:text-xl">
                    {banner.title}
                  </p>
                </div>
              ) : null}
            </div>
          );

          return (
            <div key={banner.id} className="h-full w-full shrink-0 basis-full">
              {banner.link_href ? (
                <Link
                  href={banner.link_href}
                  target="_blank"
                  rel="noreferrer"
                  className="block h-full w-full"
                  onClick={(event) => {
                    if (didDragRef.current) {
                      event.preventDefault();
                    }
                  }}
                  draggable={false}
                >
                  {media}
                </Link>
              ) : (
                media
              )}
            </div>
          );
        })}
      </div>

      {count > 1 ? (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label={t("menu.previousSlide")}
            className="absolute start-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur transition-opacity hover:bg-black/60 focus-visible:opacity-100 group-hover:opacity-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label={t("menu.nextSlide")}
            className="absolute end-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur transition-opacity hover:bg-black/60 focus-visible:opacity-100 group-hover:opacity-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute inset-x-0 bottom-2 flex items-center justify-center gap-1.5">
            {banners.map((banner, dotIndex) => (
              <button
                key={banner.id}
                type="button"
                onClick={() => goTo(dotIndex)}
                aria-label={t("menu.goToSlide", { number: dotIndex + 1 })}
                aria-current={dotIndex === index}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  dotIndex === index ? "w-5 bg-white" : "w-1.5 bg-white/50"
                )}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
