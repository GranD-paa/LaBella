"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import {
  Plate,
  PlateFacts,
  PlateHead,
  PlateHorizon,
  PlateZone,
  PlateZoneHead,
} from "@/components/layout/plate";
import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";

type ProfileViewProps = {
  fullName: string | null | undefined;
  email: string;
};

export function ProfileView({ fullName, email }: ProfileViewProps) {
  const { t } = useTranslations();

  return (
    <Plate>
      <PlateHead
        eyebrow={t("profile.badge")}
        title={t("profile.title")}
        lede={t("profile.subtitle")}
        action={
          <Button
            variant="outline"
            className="border-white/10 bg-white/[0.03] text-muted-foreground hover:bg-white/[0.07] hover:text-foreground"
            asChild
          >
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
              {t("profile.backToDashboard")}
            </Link>
          </Button>
        }
      />

      <PlateHorizon />

      <PlateZone className="px-6 pb-9 pt-7 sm:px-10 sm:pb-10 sm:pt-8">
        <PlateZoneHead
          title={t("profile.account")}
          hint={t("profile.accountDescription")}
          className="px-0 pb-0 pt-0 sm:px-0 sm:pt-0"
        />
        <PlateFacts
          facts={[
            {
              label: t("profile.fullName"),
              value: fullName || t("profile.notSet"),
            },
            { label: t("profile.email"), value: email },
          ]}
        />
      </PlateZone>
    </Plate>
  );
}
