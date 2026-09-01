"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * All of the landing page's scroll motion, applied to markup that is already
 * on the page.
 *
 * The whole page is server-rendered and readable with JavaScript switched off;
 * this component only *enhances* it. That ordering is deliberate — the previous
 * landing page built its content on the client behind a preloader, which cost
 * it both indexability and its largest-contentful-paint. Nothing here creates,
 * removes or reorders a node, so the DOM React rendered is the DOM that stays.
 *
 * The effects are opt-in per element via data attributes:
 *
 *   data-reveal            fade and rise once, on entry
 *   data-reveal-group      stagger the element's `[data-reveal-item]` children
 *   data-parallax="0.15"   drift at a fraction of scroll speed while in view
 *   data-line-mask         wipe a heading up from behind its own baseline
 *   data-progress          scale a rail from 0→1 across its section
 *
 * Under `prefers-reduced-motion` every element is left exactly as rendered.
 */
export function ScrollEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    // `gsap.context` scopes every tween and trigger created inside it, so the
    // cleanup below reverts all of them — including the inline styles GSAP
    // wrote — without tracking each one by hand.
    const ctx = gsap.context(() => {
      // ------------------------------------------------------------- reveals
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 28,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            // Firing a little before the element is fully in view means the
            // motion reads as the page arriving, not as a delayed reaction to
            // the scroll that already happened.
            start: "top 88%",
            once: true,
          },
        });
      });

      gsap.utils
        .toArray<HTMLElement>("[data-reveal-group]")
        .forEach((group) => {
          const items = group.querySelectorAll("[data-reveal-item]");
          if (items.length === 0) return;

          gsap.from(items, {
            opacity: 0,
            y: 32,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: { trigger: group, start: "top 82%", once: true },
          });
        });

      // ---------------------------------------------------------- line masks
      // Headings wipe up from behind a clipped wrapper. The clip lives on the
      // parent so the text itself is never transformed — which keeps it
      // selectable and keeps the glyphs off a composited layer at rest.
      gsap.utils.toArray<HTMLElement>("[data-line-mask]").forEach((mask) => {
        const lines = mask.querySelectorAll("[data-line]");
        if (lines.length === 0) return;

        gsap.from(lines, {
          yPercent: 110,
          duration: 1,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: { trigger: mask, start: "top 85%", once: true },
        });
      });

      // ----------------------------------------------------------- parallax
      // Images drift slower than the page. `yPercent` rather than `y` keeps
      // the distance proportional to the element, so a tall hero and a small
      // card move by amounts that look equally intentional.
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        const strength = Number(element.dataset.parallax) || 0.12;

        gsap.fromTo(
          element,
          { yPercent: -strength * 100 },
          {
            yPercent: strength * 100,
            ease: "none",
            scrollTrigger: {
              trigger: element.parentElement ?? element,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // ----------------------------------------------------------- progress
      gsap.utils.toArray<HTMLElement>("[data-progress]").forEach((rail) => {
        const section = rail.closest("section") ?? rail.parentElement;
        if (!section) return;

        gsap.fromTo(
          rail,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              end: "bottom 80%",
              scrub: 0.4,
            },
          }
        );
      });
    });

    // Late-loading webfonts and images change element heights, which leaves
    // every trigger measuring against a layout that no longer exists.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return null;
}
