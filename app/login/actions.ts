"use server";

import { createAdminSession, verifyAdminPassword } from "@/lib/admin-auth";

export async function signInWithPassword(password: string) {
  const isValid = await verifyAdminPassword(password);

  if (!isValid) {
    return {
      ok: false,
      message: process.env.ADMIN_PASSWORD
        ? "The password is incorrect."
        : "ADMIN_PASSWORD is not configured."
    };
  }

  await createAdminSession();

  return {
    ok: true,
    message: "Signed in."
  };
}
