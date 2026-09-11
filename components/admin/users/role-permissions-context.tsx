"use client";

import { createContext, useContext, useMemo } from "react";

import {
  resolveRolePermissions,
  type RolePermissions,
  type RolePermissionOverrides,
  type RoleSlug,
} from "@/lib/permissions/roles";

/**
 * What every role may currently do, shared across the user-management panel.
 *
 * A head admin can change the admin tier's permissions, so "what does this
 * role allow" is no longer answerable from the code alone — the stored
 * overrides have to come along. Kept in context rather than threaded through
 * the table, the row menu and three dialogs, which is the same value five
 * times over and one prop to forget.
 */
const RolePermissionsContext = createContext<RolePermissionOverrides>({});

export function RolePermissionsProvider({
  overrides,
  children,
}: {
  overrides: RolePermissionOverrides;
  children: React.ReactNode;
}) {
  // Frozen per render of the server page: the only thing that changes it is a
  // save, which refreshes the route anyway.
  const value = useMemo(() => overrides, [overrides]);

  return (
    <RolePermissionsContext.Provider value={value}>
      {children}
    </RolePermissionsContext.Provider>
  );
}

export function useRolePermissions(role: RoleSlug): RolePermissions {
  const overrides = useContext(RolePermissionsContext);
  return useMemo(
    () => resolveRolePermissions(role, overrides),
    [role, overrides]
  );
}

export function useRolePermissionOverrides(): RolePermissionOverrides {
  return useContext(RolePermissionsContext);
}
