import { AppShell } from "@/components/layout/app-shell";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
