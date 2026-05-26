import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

export async function getAdminCounts() {
  const supabase = createAdminClient();
  const [projects, publishedProjects, draftNotes, inquiries, unread] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("projects").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("notes").select("id", { count: "exact", head: true }).eq("status", "draft"),
    supabase.from("contact_inquiries").select("id", { count: "exact", head: true }),
    supabase.from("contact_inquiries").select("id", { count: "exact", head: true }).eq("is_read", false)
  ]);
  return {
    projects: projects.count || 0,
    publishedProjects: publishedProjects.count || 0,
    draftNotes: draftNotes.count || 0,
    inquiries: inquiries.count || 0,
    unread: unread.count || 0
  };
}

export async function listTable<T>(table: string) {
  const supabase = createAdminClient();
  const { data } = await supabase.from(table).select("*").order("created_at", { ascending: false });
  return (data || []) as T[];
}
