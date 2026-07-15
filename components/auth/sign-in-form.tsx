"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";
import { Loader2, LogIn, Mail, ShieldCheck } from "lucide-react";

import { signInAction } from "@/app/actions/auth";
import { useTranslations } from "@/components/providers/locale-provider";
import type { SignInValues } from "@/lib/validations/auth";
import { resolveMessage } from "@/lib/i18n/resolve-message";
import { createSignInSchema } from "@/lib/validations/i18n/auth-schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const REMEMBER_EMAIL_KEY = "labella_remember_email";

export function SignInForm({
  redirectTo,
}: {
  redirectTo?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const { t } = useTranslations();
  const signInSchema = useMemo(() => createSignInSchema(t), [t]);

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "", rememberMe: true },
  });

  useEffect(() => {
    const savedEmail = window.localStorage.getItem(REMEMBER_EMAIL_KEY);
    if (savedEmail) {
      form.setValue("email", savedEmail);
      form.setValue("rememberMe", true);
    }
  }, [form]);

  function onSubmit(values: SignInValues) {
    setFormError(null);

    if (values.rememberMe) {
      window.localStorage.setItem(REMEMBER_EMAIL_KEY, values.email);
    } else {
      window.localStorage.removeItem(REMEMBER_EMAIL_KEY);
    }

    startTransition(async () => {
      const result = await signInAction(values, redirectTo);
      if (result && "error" in result) {
        const errorMessage = resolveMessage(t, result.error);
        setFormError(errorMessage);
        toast.error(errorMessage);
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-accent/15 text-brand-accent">
          <LogIn className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {t("auth.welcomeBack")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("auth.signInSubtitle")}
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.email")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder={t("auth.emailPlaceholder")}
                      autoComplete="email"
                      disabled={isPending}
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.password")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("auth.passwordPlaceholder")}
                    autoComplete="current-password"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-muted/20 p-3">
                  <input
                    id="rememberMe"
                    type="checkbox"
                    checked={field.value}
                    onChange={(event) => field.onChange(event.target.checked)}
                    disabled={isPending}
                    className="mt-0.5 h-4 w-4 rounded border-input accent-primary"
                  />
                  <div className="space-y-1">
                    <Label htmlFor="rememberMe" className="cursor-pointer">
                      {t("auth.rememberMe")}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {t("auth.rememberMeHint")}
                    </p>
                  </div>
                </div>
              </FormItem>
            )}
          />

          {formError ? (
            <p className="text-sm font-medium text-destructive">{formError}</p>
          ) : null}

          <Button
            type="submit"
            className="w-full bg-primary font-semibold text-primary-foreground shadow-brand hover:bg-primary/90"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("auth.signingIn")}
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" />
                {t("auth.signIn")}
              </>
            )}
          </Button>
        </form>
      </Form>

      <p className="text-center text-sm text-muted-foreground">
        {t("auth.noAccount")}{" "}
        <Link
          href="/sign-up"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          {t("auth.signUp")}
        </Link>
      </p>
    </div>
  );
}
