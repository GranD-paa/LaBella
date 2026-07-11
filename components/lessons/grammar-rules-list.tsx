import { BookMarked } from "lucide-react";

import type { GrammarRule } from "@/types";

export function GrammarRulesList({ rules }: { rules: GrammarRule[] }) {
  if (rules.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed py-16 text-center text-muted-foreground">
        <BookMarked className="h-8 w-8" />
        <p>No grammar rules added to this lesson yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {rules.map((rule) => (
        <div
          key={rule.id}
          className="rounded-xl border bg-card p-5 shadow-sm"
        >
          <h3 className="font-semibold">{rule.title}</h3>
          {rule.description ? (
            <p className="mt-2 text-muted-foreground">{rule.description}</p>
          ) : null}
          {rule.example ? (
            <p className="mt-3 rounded-md bg-muted px-3 py-2 text-sm font-medium">
              {rule.example}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
