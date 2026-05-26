import { ContentForm } from "@/components/admin/content-form";

export default function NewLabPage() {
  return <div><h1 className="mb-6 font-[var(--font-space)] text-3xl font-semibold text-white">Create Lab Item</h1><ContentForm table="lab_items" /></div>;
}
