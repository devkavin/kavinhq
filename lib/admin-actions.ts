import "server-only";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminSupabaseClient } from "@/lib/supabase-admin";
import type { AdminTable } from "@/lib/admin-data";

function text(formData: FormData, key: string, fallback = "") {
  return String(formData.get(key) ?? fallback).trim();
}

function optionalText(formData: FormData, key: string) {
  const value = text(formData, key);
  return value ? value : null;
}

function lines(formData: FormData, key: string) {
  return text(formData, key)
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function bool(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function revalidateAdmin() {
  [
    "/",
    "/work",
    "/services",
    "/notes",
    "/admin",
    "/admin/projects",
    "/admin/notes",
    "/admin/services",
    "/admin/testimonials",
    "/admin/inquiries",
    "/admin/media",
    "/admin/settings"
  ].forEach((path) => revalidatePath(path));
}

async function mutate(table: AdminTable, values: Record<string, unknown>, id?: string) {
  const supabase = createAdminSupabaseClient();
  if (!supabase) throw new Error("Supabase admin client is not configured.");

  const payload = { ...values, updated_at: new Date().toISOString() };
  const result = id
    ? await supabase.from(table).update(payload).eq("id", id)
    : await supabase.from(table).insert(payload);

  if (result.error) throw new Error(result.error.message);
  revalidateAdmin();
}

export async function saveProject(id: string | undefined, formData: FormData) {
  await mutate(
    "projects",
    {
      slug: text(formData, "slug"),
      title: text(formData, "title"),
      description: text(formData, "description"),
      overview: text(formData, "overview"),
      problem: text(formData, "problem"),
      goal: text(formData, "goal"),
      what_built: text(formData, "what_built"),
      tech_stack: lines(formData, "tech_stack"),
      key_features: lines(formData, "key_features"),
      result: text(formData, "result"),
      lessons: text(formData, "lessons"),
      image: text(formData, "image", "/images/project-dashboard.svg"),
      gallery: lines(formData, "gallery"),
      year: text(formData, "year", String(new Date().getFullYear())),
      category: text(formData, "category", "Websites"),
      status: text(formData, "status", "draft"),
      featured: bool(formData, "featured")
    },
    id
  );
  redirect("/admin/projects");
}

export async function saveNote(id: string | undefined, formData: FormData) {
  await mutate(
    "notes",
    {
      slug: text(formData, "slug"),
      title: text(formData, "title"),
      excerpt: text(formData, "excerpt"),
      content: text(formData, "content"),
      date: text(formData, "date", new Date().toISOString().slice(0, 10)),
      read_time: text(formData, "read_time", "4 min read"),
      category: text(formData, "category", "Engineering"),
      image: text(formData, "image", "/images/note-workspace.svg"),
      status: text(formData, "status", "draft")
    },
    id
  );
  redirect("/admin/notes");
}

export async function saveService(id: string | undefined, formData: FormData) {
  await mutate(
    "services",
    {
      slug: text(formData, "slug"),
      title: text(formData, "title"),
      description: text(formData, "description"),
      details: text(formData, "details"),
      icon: text(formData, "icon", "PanelTop"),
      status: text(formData, "status", "draft"),
      sort_order: Number(text(formData, "sort_order", "0"))
    },
    id
  );
  redirect("/admin/services");
}

export async function saveTestimonial(id: string | undefined, formData: FormData) {
  await mutate(
    "testimonials",
    {
      name: text(formData, "name"),
      role: optionalText(formData, "role"),
      company: optionalText(formData, "company"),
      quote: text(formData, "quote"),
      status: text(formData, "status", "draft"),
      sort_order: Number(text(formData, "sort_order", "0"))
    },
    id
  );
  redirect("/admin/testimonials");
}

export async function updateInquiryStatus(id: string, formData: FormData) {
  await mutate("contact_inquiries", { status: text(formData, "status", "open") }, id);
  redirect("/admin/inquiries");
}

export async function saveSetting(formData: FormData) {
  const supabase = createAdminSupabaseClient();
  if (!supabase) throw new Error("Supabase admin client is not configured.");

  const key = text(formData, "key");
  const rawValue = text(formData, "value", "{}");
  const value = JSON.parse(rawValue);
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });

  if (error) throw new Error(error.message);
  revalidateAdmin();
  redirect("/admin/settings");
}

export async function uploadMedia(formData: FormData) {
  const supabase = createAdminSupabaseClient();
  if (!supabase) throw new Error("Supabase admin client is not configured.");

  const file = formData.get("file");
  const alt = optionalText(formData, "alt");

  if (!(file instanceof File) || !file.size) {
    throw new Error("Choose an image to upload.");
  }

  const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-");
  const path = `${Date.now()}-${safeName}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  const { error } = await supabase.storage.from("media").upload(path, bytes, {
    contentType: file.type || "application/octet-stream",
    upsert: false
  });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  const { error: insertError } = await supabase.from("media_assets").insert({
    bucket: "media",
    path,
    public_url: data.publicUrl,
    alt,
    status: "published"
  });

  if (insertError) throw new Error(insertError.message);

  revalidateAdmin();
  redirect("/admin/media");
}

export async function deleteMedia(id: string, path: string) {
  const supabase = createAdminSupabaseClient();
  if (!supabase) throw new Error("Supabase admin client is not configured.");

  await supabase.storage.from("media").remove([path]);
  const { error } = await supabase.from("media_assets").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidateAdmin();
  redirect("/admin/media");
}

export async function deleteRecord(table: AdminTable, id: string, redirectTo: string) {
  const supabase = createAdminSupabaseClient();
  if (!supabase) throw new Error("Supabase admin client is not configured.");

  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAdmin();
  redirect(redirectTo);
}
