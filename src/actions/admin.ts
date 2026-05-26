"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { labSchema, noteSchema, projectSchema, serviceSchema, testimonialSchema } from "@/lib/validations/content";

type Table = "projects" | "notes" | "services" | "testimonials" | "lab_items";

const schemaByTable = {
  projects: projectSchema,
  notes: noteSchema,
  services: serviceSchema,
  testimonials: testimonialSchema,
  lab_items: labSchema
};

async function assertAdmin() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect("/auth/access-denied");
  }
}

export async function upsertContent(table: Table, id: string | null, formData: FormData) {
  await assertAdmin();
  const parsed = schemaByTable[table].safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message || "Invalid content." };
  }

  const supabase = createAdminClient();
  const payload = { ...parsed.data, updated_at: new Date().toISOString() };
  const query = id
    ? supabase.from(table).update(payload as never).eq("id", id)
    : supabase.from(table).insert(payload as never);
  const { error } = await query;
  if (error) return { ok: false, message: error.message };
  revalidatePath("/");
  revalidatePath("/admin");
  return { ok: true, message: "Saved." };
}

export async function deleteContent(table: Table, id: string) {
  await assertAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin");
  return { ok: true, message: "Deleted." };
}

export async function updateInquiry(id: string, formData: FormData) {
  await assertAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("contact_inquiries")
    .update({
      status: String(formData.get("status") || "new"),
      is_read: formData.get("is_read") === "on",
      updated_at: new Date().toISOString()
    })
    .eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/inquiries");
  return { ok: true, message: "Inquiry updated." };
}

export async function deleteInquiry(id: string) {
  await assertAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("contact_inquiries").delete().eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/inquiries");
  return { ok: true, message: "Inquiry deleted." };
}

export async function saveSetting(formData: FormData) {
  await assertAdmin();
  const key = String(formData.get("key") || "");
  const value = String(formData.get("value") || "{}");
  let json: unknown;
  try {
    json = JSON.parse(value);
  } catch {
    return { ok: false, message: "Setting value must be valid JSON." };
  }
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key, value: json, updated_at: new Date().toISOString() }, { onConflict: "key" });
  if (error) return { ok: false, message: error.message };
  revalidatePath("/");
  return { ok: true, message: "Setting saved." };
}
