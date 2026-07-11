"use client";

import Link from "next/link";
import { useTransition } from "react";
import { LogOut, User as UserIcon } from "lucide-react";

import { signOutAction } from "@/app/actions/auth";
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
}: {
  fullName: string | null;
  email: string | null;
  avatarUrl: string | null;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-9 w-9 rounded-full"
          aria-label="Open user menu"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={avatarUrl ?? undefined} alt={fullName ?? ""} />
            <AvatarFallback>{getInitials(fullName, email)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col gap-0.5">
          <span className="flex items-center gap-1 text-sm font-medium">
            <UserIcon className="h-3.5 w-3.5" />
            {fullName || "Learner"}
          </span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            {email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <UserIcon className="h-4 w-4" />
            Profile
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
          <LogOut className="h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
