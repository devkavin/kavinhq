import { notFound } from "next/navigation";
import { ContentForm } from "@/components/admin/content-form";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Project } from "@/types/database";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await createAdminClient().from("projects").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  return <div><h1 className="mb-6 font-[var(--font-space)] text-3xl font-semibold text-white">Edit Project</h1><ContentForm table="projects" item={data as Project} /></div>;
}
