import Link from "next/link";

import { Arrow, SectionHead } from "@/components/landing/landing-bits";
import { LatticeField } from "@/components/landing/lattice";
import type { LandingCopy } from "@/lib/landing/content";
import { cn } from "@/lib/utils";

export function LandingDay({ copy }: { copy: LandingCopy }) {
  return (
    <section className="relative py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <SectionHead title={copy.day.title} sub={copy.day.sub} />

        <ol data-reveal-group className="mt-14 grid gap-4 lg:grid-cols-3">
          {copy.day.items.map((item) => (
            <li
              key={item.title}
              data-reveal-item
              className="glass glass-hover rounded-3xl p-7"
            >
              <span className="inline-flex rounded-full border border-white/12 px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em] text-white/45">
                {item.when}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-[1.85] text-white/55">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * FAQ.
 *
 * Native `<details>` rather than a scripted accordion: it opens with no
 * JavaScript, it is keyboard-operable and announced correctly for free, and
 * search engines read the answers whether or not the panel is open.
 */
export function LandingFaq({ copy }: { copy: LandingCopy }) {
  return (
    <section id="faq" className="relative scroll-mt-24 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <SectionHead title={copy.faq.title} sub={copy.faq.sub} />

        <div
          data-reveal-group
          className="mt-14 overflow-hidden rounded-3xl border border-white/[0.08] lg:mt-20"
        >
          {copy.faq.items.map((item) => (
            <details
              key={item.q}
              data-reveal-item
              className="group border-b border-white/[0.07] last:border-b-0 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-6 text-start text-base font-semibold text-white/90 transition-colors hover:text-white sm:p-7 sm:text-lg">
                {item.q}
                <span
                  aria-hidden
                  className="relative h-4 w-4 shrink-0 text-primary"
                >
                  <span className="absolute inset-x-0 top-1/2 h-[1.6px] -translate-y-1/2 rounded bg-current" />
                  <span className="absolute inset-y-0 left-1/2 w-[1.6px] -translate-x-1/2 rounded bg-current transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                </span>
              </summary>

              <p className="px-6 pb-7 text-[0.95rem] leading-[1.95] text-white/55 sm:px-7">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LandingFinal({
  copy,
  isSignedIn,
}: {
  copy: LandingCopy;
  isSignedIn: boolean;
}) {
  return (
    <section className="relative isolate overflow-hidden py-28 lg:py-36">
      <div aria-hidden className="aurora -z-10 opacity-60" />

{/* One field, not a mirrored pair. The reference is a single asymmetric
          composition, and doubling it filled the frame — which is the one thing
          the drawing is not. */}
      <LatticeField
        className="-z-10 start-0 top-0 hidden h-full w-[36rem] -translate-x-1/3 lg:block rtl:translate-x-1/3"
        opacity={0.2}
      />

      <div className="mx-auto max-w-[80rem] px-5 text-center sm:px-8">
        <h2
          data-reveal
          className="mx-auto max-w-3xl text-[clamp(2.2rem,6vw,4.6rem)] font-bold leading-[1.05] tracking-tight text-white"
        >
          {copy.final.title}
        </h2>

        <p
          data-reveal
          className="mx-auto mt-6 max-w-lg text-base leading-[1.9] text-white/60 sm:text-lg"
        >
          {copy.final.sub}
        </p>

        <div data-reveal className="mt-10">
          <Link
            href={isSignedIn ? "/menu" : "/sign-up"}
            className="group inline-flex min-h-14 items-center gap-2.5 rounded-full bg-primary px-10 py-4 text-base font-semibold text-primary-foreground shadow-[0_20px_60px_-16px_rgba(251,191,36,0.55)] transition-transform duration-200 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {copy.final.cta}
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function LandingFooter({ copy }: { copy: LandingCopy }) {
  return (
    <footer className="border-t border-white/[0.08] py-14">
      <div className="mx-auto flex max-w-[80rem] flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <LogoSlot />
          <p className="mt-4 text-sm text-white/45">{copy.footer.tagline}</p>
        </div>

        <nav className="flex flex-wrap items-center gap-x-7 gap-y-3">
          {[
            { href: "/about", label: copy.footer.about },
            { href: "/blog", label: copy.footer.blog },
            { href: "/contact", label: copy.footer.contact },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/55 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} Laparli. {copy.footer.rights}
        </p>
      </div>
    </footer>
  );
}

/**
 * Reserved space for the brand mark, at the size the real logo will occupy —
 * so dropping the file in later shifts nothing on the page.
 */
export function LogoSlot({ className }: { className?: string }) {
  return (
    <span
      dir="ltr"
      className={cn(
        "flex h-9 w-[8.5rem] items-center justify-center rounded-lg border border-dashed border-white/20 text-[0.6rem] uppercase tracking-[0.2em] text-white/35",
        className
      )}
    >
      logo
    </span>
  );
}
