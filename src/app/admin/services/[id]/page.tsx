import { notFound } from "next/navigation";
import { ContentForm } from "@/components/admin/content-form";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Service } from "@/types/database";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await createAdminClient().from("services").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  return <div><h1 className="mb-6 font-[var(--font-space)] text-3xl font-semibold text-white">Edit Service</h1><ContentForm table="services" item={data as Service} /></div>;
}
