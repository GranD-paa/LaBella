export function getSafeRedirectPath(path: string | undefined | null): string {
  if (!path || !path.startsWith("/") || path.startsWith("//")) {
    return "/menu";
  }

  if (path.includes("\\") || path.includes("%5c") || path.includes("%5C")) {
    return "/menu";
  }

  if (path === "/login" || path === "/sign-up") {
    return "/menu";
  }

  return path;
}
