"use server";

import { redirect } from "next/navigation";
import { clearAdminSession } from "@/lib/admin-auth";

export async function signOutAdmin() {
  await clearAdminSession();
  redirect("/login");
}
