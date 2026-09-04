import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, Vazirmatn } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { LocaleProvider } from "@/components/providers/locale-provider";
import { ServiceWorkerRegister } from "@/components/pwa/service-worker-register";
import { DevModeBanner } from "@/components/dev/dev-mode-banner";
import { Toaster } from "@/components/ui/sonner";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_KEY,
  LOCALE_STORAGE_KEY,
} from "@/lib/i18n/config";
import { createPageMetadata } from "@/lib/i18n/metadata";
import { isSiteIndexable } from "@/lib/seo/indexing";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-fa",
});

// Display face for oversized latin headings and the language endonyms on the
// landing page. Latin-only by nature, so Persian display text stays on
// Vazirmatn at heavy weights rather than falling back to something mismatched.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
});

export async function generateMetadata(): Promise<Metadata> {
  const localized = await createPageMetadata(
    "meta.siteTitle",
    "meta.siteDescription"
  );

  return {
    ...localized,
    // Until launch every page carries `noindex`. robots.txt asks crawlers to
    // stay out; this is what binds the ones that come in anyway, and it
    // inherits to every route because it is declared on the root layout.
    robots: isSiteIndexable()
      ? undefined
      : { index: false, follow: false, nocache: true },
    manifest: "/manifest.json",
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: "Laparli",
    },
    icons: {
      icon: "/icons/icon-192.svg",
      apple: "/apple-icon.png",
    },
    openGraph: {
      ...localized.openGraph,
      siteName: "Laparli",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      ...localized.twitter,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#090014",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const localeBootstrapScript = `(function(){try{var k=${JSON.stringify(LOCALE_STORAGE_KEY)};var c=${JSON.stringify(LOCALE_COOKIE_KEY)};var d=${JSON.stringify(DEFAULT_LOCALE)};var m=document.cookie.match(new RegExp('(?:^|; )'+c+'=([^;]*)'));var l=(m&&m[1])||localStorage.getItem(k)||d;document.documentElement.lang=l;document.documentElement.dir=l==='fa'?'rtl':'ltr';document.body&&(document.body.dataset.locale=l);}catch(e){document.documentElement.lang=${JSON.stringify(DEFAULT_LOCALE)};document.documentElement.dir='rtl';}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={DEFAULT_LOCALE}
      dir="rtl"
      className={cn(
        "font-sans",
        inter.variable,
        vazirmatn.variable,
        instrumentSerif.variable
      )}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: localeBootstrapScript }} />
      </head>
      <body
        className="min-h-screen bg-background antialiased"
        data-locale={DEFAULT_LOCALE}
        suppressHydrationWarning
      >
        <LocaleProvider>
          <DevModeBanner />
          {children}
          <Toaster richColors position="top-center" />
          <ServiceWorkerRegister />
        </LocaleProvider>
      </body>
    </html>
  );
}
