import { BrandLogo } from "@/components/layout/brand-logo";

export function AppHeader({
  left,
  right,
  homeHref = "/menu",
}: {
  left?: React.ReactNode;
  right?: React.ReactNode;
  homeHref?: string;
}) {
  return (
    <header className="brand-header">
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 px-4 pt-1 sm:h-[4.75rem] sm:gap-4 sm:px-6">
        <div className="flex min-w-0 items-center justify-start">{left}</div>

        <div className="flex justify-center">
          <BrandLogo href={homeHref} />
        </div>

        <div className="flex min-w-0 items-center justify-end gap-2">
          {right}
        </div>
      </div>
    </header>
  );
}
