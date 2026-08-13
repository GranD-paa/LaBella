export type SubscriptionPlanId = "basic" | "pro" | "ultimate" | "elite";

/**
 * Static visual/structural metadata per plan — icon, highlight state, and
 * accent gradient. Price, discount, and all copy are admin-editable and
 * live in the `subscription_plans` table instead.
 */
export type SubscriptionPlanMeta = {
  id: SubscriptionPlanId;
  highlighted: boolean;
  accentClass: string;
  icon: "seedling" | "zap" | "crown" | "gem";
};

export const SUBSCRIPTION_PLAN_META: Record<SubscriptionPlanId, SubscriptionPlanMeta> = {
  basic: {
    id: "basic",
    highlighted: false,
    accentClass: "from-emerald-500/20 to-teal-500/10",
    icon: "seedling",
  },
  pro: {
    id: "pro",
    highlighted: true,
    accentClass: "from-violet-500/25 to-fuchsia-500/10",
    icon: "zap",
  },
  ultimate: {
    id: "ultimate",
    highlighted: false,
    accentClass: "from-amber-500/25 to-orange-500/10",
    icon: "crown",
  },
  // Reserved fourth slot. It is off in every language until an admin switches
  // `subscription_plans.is_active` on, so it renders nowhere by default.
  elite: {
    id: "elite",
    highlighted: false,
    accentClass: "from-sky-500/25 to-indigo-500/10",
    icon: "gem",
  },
};

export function getSubscriptionPlanMeta(id: string): SubscriptionPlanMeta {
  return (
    SUBSCRIPTION_PLAN_META[id as SubscriptionPlanId] ?? {
      id: id as SubscriptionPlanId,
      highlighted: false,
      accentClass: "from-slate-500/20 to-slate-500/10",
      icon: "seedling",
    }
  );
}
