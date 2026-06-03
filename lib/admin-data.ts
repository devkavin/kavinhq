import "server-only";

import { createAdminSupabaseClient } from "@/lib/supabase-admin";

export type AdminTable =
  | "projects"
  | "notes"
  | "services"
  | "testimonials"
  | "contact_inquiries"
  | "media_assets"
  | "site_settings";

export async function adminList(table: AdminTable, order = "created_at", ascending = false) {
  const supabase = createAdminSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase.from(table).select("*").order(order, { ascending });
  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}

export async function adminGet(table: AdminTable, id: string) {
  const supabase = createAdminSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase.from(table).select("*").eq("id", id).single();
  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function adminCounts() {
  const supabase = createAdminSupabaseClient();
  if (!supabase) {
    return { projects: 0, notes: 0, services: 0, inquiries: 0 };
  }

  const [projects, notes, services, inquiries] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("notes").select("id", { count: "exact", head: true }),
    supabase.from("services").select("id", { count: "exact", head: true }),
    supabase.from("contact_inquiries").select("id", { count: "exact", head: true })
  ]);

  return {
    projects: projects.count ?? 0,
    notes: notes.count ?? 0,
    services: services.count ?? 0,
    inquiries: inquiries.count ?? 0
  };
}
