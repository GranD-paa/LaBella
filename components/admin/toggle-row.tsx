"use client";

import { cn } from "@/lib/utils";

/**
 * A labelled checkbox row for admin settings forms.
 *
 * A plain checkbox rather than a switch because the project has no Switch
 * primitive, and adding a Radix dependency for one control was not worth it.
 * Lives here rather than inside one form because several admin panels need the
 * same row and they must look identical.
 */
export function ToggleRow({
  label,
  hint,
  checked,
  disabled,
  onChange,
  /** Draws attention to a setting with consequences beyond its own form. */
  emphasis = false,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (next: boolean) => void;
  emphasis?: boolean;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-xl border p-3",
        emphasis && checked
          ? "border-amber-500/40 bg-amber-500/10"
          : "border-white/10 bg-muted/10"
      )}
    >
      <input
        type="checkbox"
        className="mt-0.5 h-4 w-4 shrink-0 accent-brand-accent"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="space-y-0.5">
        <span className="block text-sm font-medium">{label}</span>
        {hint ? (
          <span className="block text-xs text-muted-foreground">{hint}</span>
        ) : null}
      </span>
    </label>
  );
}
