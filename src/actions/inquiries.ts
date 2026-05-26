"use server";

import { headers } from "next/headers";
import { inquirySchema } from "@/lib/validations/inquiry";
import { createAdminClient } from "@/lib/supabase/admin";

const recent = new Map<string, number>();

export async function createInquiry(_: unknown, formData: FormData) {
  const parsed = inquirySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message || "Check the form and try again." };
  }

  const headerStore = await headers();
  const ip = headerStore.get("x-forwarded-for")?.split(",")[0] || "local";
  const last = recent.get(ip) || 0;
  if (Date.now() - last < 30_000) {
    return { ok: false, message: "Please wait a moment before sending another inquiry." };
  }
  recent.set(ip, Date.now());

  const { website, ...payload } = parsed.data;
  if (website) {
    return { ok: true, message: "Thanks. Your inquiry has been received." };
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("contact_inquiries").insert(payload);
  if (error) {
    return { ok: false, message: "The inquiry could not be sent right now. Please try again." };
  }

  return { ok: true, message: "Thanks. Your inquiry has been received." };
}
