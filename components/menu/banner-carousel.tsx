"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { cn } from "@/lib/utils";
import type { Banner } from "@/types";

const AUTO_ADVANCE_MS = 6000;

export function BannerCarousel({ banners }: { banners: Banner[] }) {
  const { t } = useTranslations();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

    timerRef.current = setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, AUTO_ADVANCE_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [count, isPaused]);

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
        className="flex h-full w-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(${index * -100}%)` }}
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
