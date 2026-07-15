import { AppShell } from "@/components/layout/app-shell";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
