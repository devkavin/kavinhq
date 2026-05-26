import { ContentForm } from "@/components/admin/content-form";

export default function NewNotePage() {
  return <div><h1 className="mb-6 font-[var(--font-space)] text-3xl font-semibold text-white">Create Note</h1><ContentForm table="notes" /></div>;
}
