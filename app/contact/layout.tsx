import { AppShell } from "@/components/layout/app-shell";

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
