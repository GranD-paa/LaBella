"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { LogoSlot } from "@/components/landing/landing-closing";
import type { LandingCopy } from "@/lib/landing/content";
import { cn } from "@/lib/utils";

/**
 * The landing page's top bar.
 *
 * The only client component in the page's chrome, and only because of two
 * things that genuinely need the browser: the mobile drawer and the background
 * that appears once you have scrolled past the hero. The links themselves are
 * plain anchors, so they work and are crawlable before this ever hydrates.
 *
 * The logo is deliberately a slot — `LOGO PLACEHOLDER` renders until a real
 * mark is dropped in, rather than shipping a stand-in that might survive to
 * production unnoticed.
 */
export function LandingHeader({
  copy,
  isSignedIn,
  dir,
}: {
  copy: LandingCopy;
  isSignedIn: boolean;
  dir: "rtl" | "ltr";
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // An open drawer that scrolls the page behind it is the single most common
  // way a mobile menu feels broken.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const links = [
    { href: "#method", label: copy.nav.method },
    { href: "#languages", label: copy.nav.languages },
    { href: "#pricing", label: copy.nav.pricing },
    { href: "#faq", label: copy.nav.faq },
    { href: "/blog", label: copy.nav.blog },
  ];

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        style={{ [dir === "rtl" ? "right" : "left"]: "1rem" }}
      >
        {copy.nav.skipToContent}
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled
            ? "border-b border-white/[0.08] bg-[#090014]/85 backdrop-blur-xl"
            : "border-b border-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[86rem] items-center gap-6 px-5 sm:px-8 lg:h-20">
          <Link
            href="/"
            className="flex shrink-0 items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            aria-label="Laparli"
          >
            <LogoSlot />
          </Link>

          <nav
            className="ms-auto hidden items-center gap-1 lg:flex"
            aria-label={copy.nav.languages}
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="ms-auto flex items-center gap-2 lg:ms-0">
            <Link
              href={isSignedIn ? "/menu" : "/login"}
              className="hidden min-h-11 items-center rounded-full px-4 text-sm font-medium text-white/70 transition-colors hover:text-white sm:inline-flex"
            >
              {isSignedIn ? copy.nav.dashboard : copy.nav.signIn}
            </Link>

            <Link
              href={isSignedIn ? "/menu" : "/register"}
              className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {isSignedIn ? copy.nav.dashboard : copy.nav.signUp}
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="landing-menu"
              aria-label={menuOpen ? copy.nav.menuClose : copy.nav.menuOpen}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:hidden"
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer. Rendered unconditionally and hidden with `translate`
          so the links stay in the DOM for crawlers and for the keyboard. */}
      <div
        id="landing-menu"
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-[#090014] px-6 pb-10 pt-24 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden",
          menuOpen ? "translate-y-0" : "pointer-events-none -translate-y-full"
        )}
        aria-hidden={!menuOpen}
        {...(!menuOpen && { inert: "" as never })}
      >
        <nav className="flex flex-col">
          {links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-white/[0.08] py-5 text-2xl font-semibold text-white/85 transition-colors hover:text-primary"
              style={{ transitionDelay: menuOpen ? `${index * 40}ms` : "0ms" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Link
          href={isSignedIn ? "/menu" : "/login"}
          onClick={() => setMenuOpen(false)}
          className="mt-auto inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 text-sm font-medium text-white/75"
        >
          {isSignedIn ? copy.nav.dashboard : copy.nav.signIn}
        </Link>
      </div>
    </>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      className="h-5 w-5"
      aria-hidden
    >
      <line
        x1="3"
        y1="7"
        x2="21"
        y2="7"
        className={cn(
          "origin-center transition-transform duration-300",
          open && "translate-y-[5px] rotate-45"
        )}
      />
      <line
        x1="3"
        y1="17"
        x2="21"
        y2="17"
        className={cn(
          "origin-center transition-transform duration-300",
          open && "-translate-y-[5px] -rotate-45"
        )}
      />
    </svg>
  );
}
