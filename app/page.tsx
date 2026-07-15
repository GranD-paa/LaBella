import { redirect } from "next/navigation";

import { getDataRepository } from "@/lib/data";

export default async function Home() {
  const repo = getDataRepository();
  const user = await repo.getAuthUser();
  redirect(user ? "/menu" : "/login");
}
