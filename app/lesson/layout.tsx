import { AppShell } from "@/components/layout/app-shell";

export default function LessonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
