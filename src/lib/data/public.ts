import { createClient } from "@/lib/supabase/server";
import { fallbackNotes, fallbackProjects, fallbackServices } from "@/lib/data/fallback";
import type { LabItem, Note, Project, Service, SiteSetting, Testimonial } from "@/types/database";

function fallbackCover(kind: string) {
  return `/images/placeholders/${kind}.svg`;
}

function hasSupabaseEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function getPublishedProjects(options?: { featured?: boolean; limit?: number }) {
  if (!hasSupabaseEnv()) {
    let projects = fallbackProjects;
    if (options?.featured !== undefined) projects = projects.filter((project) => project.featured === options.featured);
    return options?.limit ? projects.slice(0, options.limit) : projects;
  }
  const supabase = await createClient();
  let query = supabase.from("projects").select("*").eq("status", "published").order("sort_order").order("created_at", { ascending: false });
  if (options?.featured !== undefined) query = query.eq("featured", options.featured);
  if (options?.limit) query = query.limit(options.limit);
  const { data } = await query;
  return ((data || []) as Project[]).map((project) => ({ ...project, cover_image_url: project.cover_image_url || fallbackCover("project") }));
}

export async function getProjectBySlug(slug: string) {
  if (!hasSupabaseEnv()) return fallbackProjects.find((project) => project.slug === slug) || null;
  const supabase = await createClient();
  const { data } = await supabase.from("projects").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
  return data as Project | null;
}

export async function getPublishedNotes(options?: { limit?: number }) {
  if (!hasSupabaseEnv()) return options?.limit ? fallbackNotes.slice(0, options.limit) : fallbackNotes;
  const supabase = await createClient();
  let query = supabase.from("notes").select("*").eq("status", "published").order("published_at", { ascending: false });
  if (options?.limit) query = query.limit(options.limit);
  const { data } = await query;
  return ((data || []) as Note[]).map((note) => ({ ...note, cover_image_url: note.cover_image_url || fallbackCover("note") }));
}

export async function getNoteBySlug(slug: string) {
  if (!hasSupabaseEnv()) return fallbackNotes.find((note) => note.slug === slug) || null;
  const supabase = await createClient();
  const { data } = await supabase.from("notes").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
  return data as Note | null;
}

export async function getPublishedServices() {
  if (!hasSupabaseEnv()) return fallbackServices;
  const supabase = await createClient();
  const { data } = await supabase.from("services").select("*").eq("status", "published").order("sort_order");
  return (data || []) as Service[];
}

export async function getPublishedTestimonials() {
  if (!hasSupabaseEnv()) return [];
  const supabase = await createClient();
  const { data } = await supabase.from("testimonials").select("*").eq("status", "published").order("sort_order");
  return (data || []) as Testimonial[];
}

export async function getPublishedLabItems() {
  if (!hasSupabaseEnv()) return [];
  const supabase = await createClient();
  const { data } = await supabase.from("lab_items").select("*").eq("status", "published").order("sort_order");
  return (data || []) as LabItem[];
}

export async function getSiteSettings() {
  if (!hasSupabaseEnv()) return [];
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*");
  return (data || []) as SiteSetting[];
}
