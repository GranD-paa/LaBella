/**
 * LaParla's mark: a speech bubble with three conversation dots — "parla"
 * means "speak" in Italian, so the logo leads with dialogue rather than a
 * generic education glyph. Shares its path geometry with the PWA icons in
 * public/icons/ so the brand reads the same at every size.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="6 6.5 12 12"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8.3,7.5 L15.8,7.5 L17.3,9 L17.3,14.1 L15.8,15.6 L13.4,15.6 L12,17.5 L10.6,15.6 L8.3,15.6 L6.8,14.1 L6.8,9 Z"
        fill="currentColor"
      />
      <circle cx="10.4" cy="11.5" r="0.9" className="fill-brand-accent" />
      <circle cx="12" cy="11.5" r="0.9" className="fill-brand-accent" />
      <circle cx="13.6" cy="11.5" r="0.9" className="fill-brand-accent" />
    </svg>
  );
}
