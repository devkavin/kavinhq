import { notFound } from "next/navigation";
import { ContentForm } from "@/components/admin/content-form";
import { createAdminClient } from "@/lib/supabase/admin";
import type { LabItem } from "@/types/database";

export default async function EditLabPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await createAdminClient().from("lab_items").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  return <div><h1 className="mb-6 font-[var(--font-space)] text-3xl font-semibold text-white">Edit Lab Item</h1><ContentForm table="lab_items" item={data as LabItem} /></div>;
}
