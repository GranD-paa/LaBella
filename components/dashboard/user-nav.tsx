"use client";

import Link from "next/link";
import { useTransition } from "react";
import {
  Crown,
  Home,
  Info,
  LayoutDashboard,
  LogIn,
  LogOut,
  Mail,
  ShieldCheck,
  User as UserIcon,
  UserCircle,
} from "lucide-react";

import { signOutAction } from "@/app/actions/auth";
import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserNav({
  fullName,
  email,
  isAdmin = false,
  isSignedIn = true,
}: {
  fullName: string | null;
  email: string | null;
  isAdmin?: boolean;
  /**
   * Now that `/about`, `/contact` and `/subscription` are public, this menu is
   * rendered for visitors too. Offering them the account pages would only send
   * them to sign-up on the next click, so a signed-out menu shows the pages
   * they can actually reach and one way in.
   */
  isSignedIn?: boolean;
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
          size="icon"
          className="group h-11 w-11 rounded-full"
          aria-label={t("nav.openUserMenu")}
        >
          <span className="flex h-6 w-6 flex-col items-center justify-center gap-1.5 transition-transform duration-300 ease-out group-data-[state=open]:rotate-90">
            <span className="h-0.5 w-6 rounded-full bg-current" />
            <span className="h-0.5 w-6 rounded-full bg-current" />
            <span className="h-0.5 w-6 rounded-full bg-current" />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {isSignedIn ? (
          <>
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
          </>
        ) : null}
        <DropdownMenuItem asChild>
          <Link href="/subscription">
            <Crown className="me-2 h-4 w-4" />
            {t("nav.subscription")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/about">
            <Info className="me-2 h-4 w-4" />
            {t("nav.aboutUs")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/contact">
            <Mail className="me-2 h-4 w-4" />
            {t("nav.contactUs")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {isSignedIn ? (
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
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href="/sign-up">
                <LogIn className="me-2 h-4 w-4" />
                {t("auth.signUp")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/login">
                <UserCircle className="me-2 h-4 w-4" />
                {t("auth.signIn")}
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
