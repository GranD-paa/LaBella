"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";
import { Loader2, LogIn, Mail, ShieldCheck } from "lucide-react";

import { signInAction } from "@/app/actions/auth";
import { signInSchema, type SignInValues } from "@/lib/validations/auth";
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
        setFormError(result.error);
        toast.error(result.error);
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
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to continue your language journey
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="you@example.com"
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
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
                      Remember me
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Keep your secure session active so you can return without
                      signing in again. Your password is never stored locally.
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
                Signing in...
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" />
                Sign in
              </>
            )}
          </Button>
        </form>
      </Form>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
