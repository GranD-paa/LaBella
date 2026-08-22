"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type TransitionEvent as ReactTransitionEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { cn } from "@/lib/utils";
import type { Banner } from "@/types";

const AUTO_ADVANCE_MS = 6000;
// How long the strip takes to settle after a swipe is released or an arrow is
// pressed. Deliberately short: on a phone anything slower reads as the
// carousel lagging behind the finger rather than following it.
const SETTLE_MS = 420;
// Below this drag distance a pointer interaction is treated as a tap/click
// rather than a swipe, so links inside a banner still open normally.
const DRAG_CLICK_THRESHOLD_PX = 8;
// Fraction of the container's width a slow drag must cross before it commits
// to changing slides instead of snapping back to the current one.
const SWIPE_COMMIT_RATIO = 0.15;
// A quick flick counts even when it barely travels. People swipe fast and
// short on a phone, and a distance-only rule silently swallows exactly those
// gestures — which is what made the banner feel unresponsive to the thumb.
const FLICK_VELOCITY_PX_PER_MS = 0.3;
const FLICK_MIN_DISTANCE_PX = 10;
/**
 * The settle animation, as one shared string.
 *
 * The re-park below writes this back onto the element by hand, so it has to be
 * byte-identical to what the style prop renders: React diffs the style object
 * it last rendered against the next one, and a value it believes unchanged is
 * never written to the DOM again. Restoring anything else — including the
 * empty string — leaves the carousel permanently un-animated after its first
 * trip around the loop.
 */
const SETTLE_TRANSITION = `transform ${SETTLE_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1)`;

export function BannerCarousel({ banners }: { banners: Banner[] }) {
  const { t } = useTranslations();
  const count = banners.length;
  // A single banner has nothing to loop around, so it skips the clones and
  // the whole virtual-index scheme below.
  const loops = count > 1;

  /**
   * Position on the rendered strip, which is not the same as the banner being
   * shown. With looping the strip is [last, ...banners, first], so real banner
   * `i` sits at `i + 1` and the strip starts parked at 1.
   *
   * The index is allowed to run off either end onto a clone. That is the whole
   * trick: the strip keeps travelling the same way past the last banner, and
   * once the movement finishes it is silently re-parked on the identical real
   * slide, so the loop never rewinds in front of the viewer.
   */
  const [index, setIndex] = useState(loops ? 1 : 0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragOffsetPx, setDragOffsetPx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef(0);
  const didDragRef = useRef(false);
  // Sampled between pointer moves so a flick can be judged on speed, not only
  // on how far the finger got.
  const lastXRef = useRef(0);
  const lastMoveAtRef = useRef(0);
  const velocityRef = useRef(0);

  const realIndex = loops ? (((index - 1) % count) + count) % count : index;

  const step = useCallback((delta: number) => {
    setIndex((current) => current + delta);
  }, []);

  const goToBanner = useCallback(
    (bannerIndex: number) => {
      setIndex(loops ? bannerIndex + 1 : bannerIndex);
    },
    [loops]
  );

  useEffect(() => {
    if (count <= 1 || isPaused) return;

    // Defensively clear any previous interval before creating a new one —
    // React 18 Strict Mode's dev-only double-invoke of this effect can
    // otherwise leak a stray interval that keeps ticking in the background.
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      // Never walk past the trailing clone. Normally the re-park below has
      // already happened by now; this only matters if a transitionend was
      // ever missed, and keeps that from stranding the strip on blank space.
      setIndex((current) => (current >= count + 1 ? 1 : current + 1));
    }, AUTO_ADVANCE_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [count, isPaused]);

  /**
   * Re-park the strip on the real twin of whichever clone it just landed on.
   *
   * Done with the transition switched off and the change forced out to the
   * browser before it paints again, so the jump is never visible — the viewer
   * only ever sees continuous motion in the direction they asked for.
   */
  function handleTransitionEnd(event: ReactTransitionEvent<HTMLDivElement>) {
    if (!loops || event.target !== event.currentTarget) return;

    const target = index === count + 1 ? 1 : index === 0 ? count : null;
    if (target === null) return;

    const element = trackRef.current;
    if (element) {
      element.style.transition = "none";
      // Written in the same shape as the style prop below, so React's next
      // render computes an identical value and starts no new animation.
      element.style.transform = `translate3d(calc(${target * -100}% + 0px), 0, 0)`;
      // Reading layout commits the untransitioned position immediately.
      void element.offsetHeight;
      element.style.transition = SETTLE_TRANSITION;
    }

    setIndex(target);
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (count <= 1) return;
    dragStartXRef.current = event.clientX;
    lastXRef.current = event.clientX;
    lastMoveAtRef.current = performance.now();
    velocityRef.current = 0;
    didDragRef.current = false;
    setIsDragging(true);
    setIsPaused(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!isDragging) return;

    const now = performance.now();
    const elapsed = now - lastMoveAtRef.current;
    if (elapsed > 0) {
      velocityRef.current = (event.clientX - lastXRef.current) / elapsed;
      lastXRef.current = event.clientX;
      lastMoveAtRef.current = now;
    }

    const delta = event.clientX - dragStartXRef.current;
    if (Math.abs(delta) > DRAG_CLICK_THRESHOLD_PX) {
      didDragRef.current = true;
    }
    setDragOffsetPx(delta);
  }

  function endDrag() {
    if (!isDragging) return;

    const width = trackRef.current?.offsetWidth || 1;
    const draggedFarEnough = Math.abs(dragOffsetPx) > width * SWIPE_COMMIT_RATIO;
    const flicked =
      Math.abs(velocityRef.current) > FLICK_VELOCITY_PX_PER_MS &&
      Math.abs(dragOffsetPx) > FLICK_MIN_DISTANCE_PX;

    if (draggedFarEnough || flicked) {
      // Exactly one banner per gesture, however hard it was thrown — the
      // strip advances to its neighbour rather than flinging through the set.
      // A flick is judged by its direction of travel, since a fast one can
      // end almost where it started.
      const forward = (flicked ? velocityRef.current : dragOffsetPx) < 0;
      step(forward ? 1 : -1);
    }

    setIsDragging(false);
    setDragOffsetPx(0);
    setIsPaused(false);
  }

  if (count === 0) {
    return null;
  }

  const slides = loops
    ? [
        { banner: banners[count - 1], key: "clone-of-last" },
        ...banners.map((banner) => ({ banner, key: banner.id })),
        { banner: banners[0], key: "clone-of-first" },
      ]
    : banners.map((banner) => ({ banner, key: banner.id }));

  const firstVisiblePosition = loops ? 1 : 0;

  return (
    <section
      dir="ltr"
      className="brand-surface group relative aspect-[21/9] w-full overflow-hidden sm:aspect-[3/1]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex h-full w-full cursor-grab touch-pan-y select-none active:cursor-grabbing"
        style={{
          transform: `translate3d(calc(${index * -100}% + ${dragOffsetPx}px), 0, 0)`,
          transition: isDragging ? "none" : SETTLE_TRANSITION,
          willChange: isDragging ? "transform" : undefined,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onTransitionEnd={handleTransitionEnd}
        // Keeps a mouse drag from turning into the browser's native
        // image/link drag halfway through the gesture.
        onDragStart={(event) => event.preventDefault()}
      >
        {slides.map(({ banner, key }, position) => {
          const media = (
            <div className="relative h-full w-full shrink-0 basis-full">
              <Image
                src={banner.image_url}
                alt={banner.title ?? ""}
                fill
                unoptimized
                priority={position === firstVisiblePosition}
                draggable={false}
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
            <div key={key} className="h-full w-full shrink-0 basis-full">
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
            onClick={() => step(-1)}
            aria-label={t("menu.previousSlide")}
            className="absolute start-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur transition-opacity hover:bg-black/60 focus-visible:opacity-100 group-hover:opacity-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
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
                onClick={() => goToBanner(dotIndex)}
                aria-label={t("menu.goToSlide", { number: dotIndex + 1 })}
                aria-current={dotIndex === realIndex}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  dotIndex === realIndex ? "w-5 bg-white" : "w-1.5 bg-white/50"
                )}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
