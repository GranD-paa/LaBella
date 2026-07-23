"use client";

import Link from "next/link";
import { useTransition } from "react";
import {
  CreditCard,
  Home,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  User as UserIcon,
  UserCircle,
} from "lucide-react";

import { signOutAction } from "@/app/actions/auth";
import { useTranslations } from "@/components/providers/locale-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function getInitials(name: string | null, email: string | null) {
  if (name && name.trim().length > 0) {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
  }
  return email?.[0]?.toUpperCase() ?? "?";
}

export function UserNav({
  fullName,
  email,
  avatarUrl,
  isAdmin = false,
}: {
  fullName: string | null;
  email: string | null;
  avatarUrl: string | null;
  isAdmin?: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const { t } = useTranslations();
  const roleLabel = isAdmin ? t("common.admin") : t("common.learner");
  const RoleIcon = isAdmin ? ShieldCheck : UserIcon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-9 w-9 rounded-full"
          aria-label={t("nav.openUserMenu")}
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={avatarUrl ?? undefined} alt={fullName ?? roleLabel} />
            <AvatarFallback>{getInitials(fullName, email)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col gap-0.5">
          <span className="flex items-center gap-1.5 text-sm font-medium">
            <RoleIcon className="h-3.5 w-3.5" />
            {roleLabel}
          </span>
          {fullName ? (
            <span className="truncate text-xs text-muted-foreground">
              {fullName}
            </span>
          ) : null}
          <span className="truncate text-xs font-normal text-muted-foreground">
            {email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/menu">
            <Home className="me-2 h-4 w-4" />
            {t("nav.mainMenu")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <UserCircle className="me-2 h-4 w-4" />
            {t("nav.profile")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <LayoutDashboard className="me-2 h-4 w-4" />
            {t("nav.dashboard")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/subscription">
            <CreditCard className="me-2 h-4 w-4" />
            {t("nav.subscription")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={isPending}
          onSelect={(event) => {
            event.preventDefault();
            startTransition(() => {
              signOutAction();
            });
          }}
        >
          <LogOut className="me-2 h-4 w-4" />
          {t("nav.signOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
