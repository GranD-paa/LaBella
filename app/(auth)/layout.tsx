import { BrandLogo } from "@/components/layout/brand-logo";
import { Plate } from "@/components/layout/plate";
import {
  AuthAsidePanel,
  AuthMobileHeader,
} from "@/components/layout/auth-layout-panel";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background lg:grid lg:grid-cols-2">
      <div className="brand-header lg:hidden">
        <div
          dir="ltr"
          className="mx-auto grid h-16 max-w-6xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center px-4 pt-1"
        >
          <AuthMobileHeader />
          <BrandLogo href="/login" />
          <div />
        </div>
      </div>

      <div className="relative hidden flex-col justify-between overflow-hidden bg-brand-gradient p-10 text-white lg:flex">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.12),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(255,255,255,0.08),transparent_40%)]" />
        <div dir="ltr" className="flex items-start justify-between gap-4">
          <BrandLogo href="/login" className="relative z-10" />
          <div className="relative z-10 hidden xl:block">
            <AuthMobileHeader />
          </div>
        </div>
        <AuthAsidePanel />
      </div>

      {/* One plate, the size of the form. Signing in is the first thing anyone
          sees of the app, so it is the first thing cut from the same metal. */}
      <div className="flex flex-1 items-center justify-center p-6 sm:p-10">
        <Plate className="w-full max-w-sm">
          <div className="plate-zone px-6 py-8 sm:px-8">{children}</div>
        </Plate>
      </div>
    </div>
  );
}
