"use client";

import { useState, useTransition } from "react";
import {
  Clock3,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { toast } from "sonner";

import { useTranslations } from "@/components/providers/locale-provider";
import { Plate } from "@/components/layout/plate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ContactViewProps = {
  defaultName: string;
  defaultEmail: string;
};

export function ContactView({ defaultName, defaultEmail }: ContactViewProps) {
  const { t } = useTranslations();
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      toast.error(t("contact.form.validationRequired"));
      return;
    }

    startTransition(() => {
      toast.success(t("contact.form.successTitle"), {
        description: t("contact.form.successDescription"),
      });
      setSubject("");
      setMessage("");
    });
  }

  return (
    <div className="space-y-10 pb-4">
      <Plate>
        <div className="plate-zone mx-auto max-w-3xl px-6 py-11 text-center sm:px-10 sm:py-14">
          <p className="inline-flex items-center gap-2.5 text-[0.8125rem] font-medium text-foreground/80">
            <span className="plate-dot" aria-hidden />
            {t("contact.badge")}
          </p>
          <h1 className="plate-title mt-4">{t("contact.title")}</h1>
          <p className="mx-auto mt-4 max-w-[52ch] text-[0.9375rem]/[1.9] text-muted-foreground">
            {t("contact.subtitle")}
          </p>
        </div>
      </Plate>

      <section className="grid gap-4 sm:grid-cols-3">
        {(
          [
            {
              icon: Mail,
              titleKey: "contact.channels.email.title",
              valueKey: "contact.channels.email.value",
              hintKey: "contact.channels.email.hint",
            },
            {
              icon: Clock3,
              titleKey: "contact.channels.response.title",
              valueKey: "contact.channels.response.value",
              hintKey: "contact.channels.response.hint",
            },
            {
              icon: MapPin,
              titleKey: "contact.channels.region.title",
              valueKey: "contact.channels.region.value",
              hintKey: "contact.channels.region.hint",
            },
          ] as const
        ).map(({ icon: Icon, titleKey, valueKey, hintKey }) => (
          <div
            key={titleKey}
            className="brand-surface p-5"
          >
            <Icon className="mb-3 h-5 w-5 text-brand-accent" />
            <p className="text-sm font-medium text-muted-foreground">{t(titleKey)}</p>
            <p className="mt-1 font-semibold">{t(valueKey)}</p>
            <p className="mt-2 text-sm text-muted-foreground">{t(hintKey)}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form
          onSubmit={handleSubmit}
          className="brand-surface space-y-5 rounded-2xl border border-white/10 p-6 sm:p-8"
        >
          <div className="space-y-1">
            <h2 className="plate-zone-title text-xl font-semibold">
              {t("contact.form.title")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("contact.form.subtitle")}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact-name">{t("contact.form.name")}</Label>
              <Input
                id="contact-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={t("contact.form.namePlaceholder")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">{t("contact.form.email")}</Label>
              <Input
                id="contact-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t("contact.form.emailPlaceholder")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-subject">{t("contact.form.subject")}</Label>
            <Input
              id="contact-subject"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              placeholder={t("contact.form.subjectPlaceholder")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message">{t("contact.form.message")}</Label>
            <Textarea
              id="contact-message"
              rows={6}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={t("contact.form.messagePlaceholder")}
            />
          </div>

          <Button type="submit" className="w-full sm:w-auto" disabled={isPending}>
            <Send className="h-4 w-4" />
            {isPending ? t("contact.form.sending") : t("contact.form.submit")}
          </Button>
        </form>

        <aside className="space-y-4">
          <div className="brand-surface p-6">
            <h3 className="font-semibold">{t("contact.helpTitle")}</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {(
                [
                  "contact.helpItems.account",
                  "contact.helpItems.subscription",
                  "contact.helpItems.learning",
                  "contact.helpItems.feedback",
                ] as const
              ).map((key) => (
                <li key={key} className="leading-relaxed">
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-brand-accent/30 bg-brand-accent/5 p-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t("contact.privacyNote")}
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
