import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ServiceWorkerRegister } from "@/components/pwa/service-worker-register";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "LaBella — Learn a language, one lesson at a time",
  description:
    "LaBella helps you master vocabulary, grammar, and listening skills through bite-sized lessons and quizzes.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LaBella",
  },
  icons: {
    icon: "/icons/icon-192.svg",
    apple: "/icons/icon-192.svg",
  },
  openGraph: {
    title: "LaBella — Learn a language, one lesson at a time",
    description:
      "LaBella helps you master vocabulary, grammar, and listening skills through bite-sized lessons and quizzes.",
    siteName: "LaBella",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LaBella — Learn a language, one lesson at a time",
    description:
      "LaBella helps you master vocabulary, grammar, and listening skills through bite-sized lessons and quizzes.",
  },
};

export const viewport: Viewport = {
  themeColor: "#18181b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)} suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">
        {children}
        <Toaster richColors position="top-center" />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
