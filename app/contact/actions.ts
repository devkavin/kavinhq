"use server";

import { z } from "zod";
import { isSupabaseConfigured } from "@/lib/supabase";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { inquirySchema } from "@/lib/validation";

export async function submitInquiry(input: z.infer<typeof inquirySchema>) {
  const parsed = inquirySchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Please check the form and try again." };
  }

  if (!isSupabaseConfigured) {
    return { ok: true, message: "Inquiry captured locally. Configure Supabase to store submissions." };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("contact_inquiries").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    company: parsed.data.company || null,
    phone: parsed.data.phone || null,
    project_type: parsed.data.projectType,
    timeline: parsed.data.timeline,
    link: parsed.data.link || null,
    message: parsed.data.message
  });

  if (error) {
    return { ok: false, message: "Something went wrong. Please try again or email hello@kavinhq.com." };
  }

  return { ok: true, message: "Thanks. I’ll review this and get back to you." };
}
