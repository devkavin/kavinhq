import { notes, projects, services } from "@/lib/seed-data";
import { isSupabaseConfigured } from "@/lib/supabase";
import { createPublicSupabaseClient } from "@/lib/supabase-public";
import type { Note, Project, Service } from "@/lib/types";

type DbProject = Omit<Project, "techStack" | "keyFeatures" | "whatBuilt"> & {
  tech_stack: string[];
  key_features: string[];
  what_built: string;
};

function normalizeProject(project: DbProject): Project {
  return {
    ...project,
    techStack: project.tech_stack,
    keyFeatures: project.key_features,
    whatBuilt: project.what_built
  };
}

export async function getProjects() {
  if (!isSupabaseConfigured) return projects.filter((project) => project.status === "published");
  const supabase = createPublicSupabaseClient();
  if (!supabase) return projects.filter((project) => project.status === "published");
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("year", { ascending: false });

  if (error || !data) return projects.filter((project) => project.status === "published");
  return (data as DbProject[]).map(normalizeProject);
}

export async function getProjectBySlug(slug: string) {
  const allProjects = await getProjects();
  return allProjects.find((project) => project.slug === slug);
}

export async function getNotes() {
  if (!isSupabaseConfigured) return notes.filter((note) => note.status === "published");
  const supabase = createPublicSupabaseClient();
  if (!supabase) return notes.filter((note) => note.status === "published");
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("status", "published")
    .order("date", { ascending: false });

  if (error || !data) return notes.filter((note) => note.status === "published");
  return data as Note[];
}

export async function getNoteBySlug(slug: string) {
  const allNotes = await getNotes();
  return allNotes.find((note) => note.slug === slug);
}

export async function getServices() {
  if (!isSupabaseConfigured) return services.filter((service) => service.status === "published");
  const supabase = createPublicSupabaseClient();
  if (!supabase) return services.filter((service) => service.status === "published");
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (error || !data) return services.filter((service) => service.status === "published");
  return (data as (Service & { sort_order: number })[]).map((service) => ({
    ...service,
    sortOrder: service.sort_order
  }));
}
