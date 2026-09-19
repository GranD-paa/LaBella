import { BrandLogo } from "@/components/layout/brand-logo";
import { Plate } from "@/components/layout/plate";
import { AuthHeaderControls } from "@/components/layout/auth-layout-panel";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="brand-header">
        <div
          dir="ltr"
          className="mx-auto grid h-16 max-w-6xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center px-4 pt-1"
        >
          <AuthHeaderControls />
          <BrandLogo href="/login" />
          <div />
        </div>
      </div>

      {/* One plate, the size of the form, centred on the page. Signing in is
          the first thing anyone sees of the app, so it is the first thing cut
          from the same metal — and the only thing on the screen. */}
      <div className="flex flex-1 items-center justify-center p-6 sm:p-10">
        <Plate className="w-full max-w-sm">
          <div className="plate-zone px-6 py-8 sm:px-8">{children}</div>
        </Plate>
      </div>
    </div>
  );
}
