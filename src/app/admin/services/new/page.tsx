import { ContentForm } from "@/components/admin/content-form";

export default function NewServicePage() {
  return <div><h1 className="mb-6 font-[var(--font-space)] text-3xl font-semibold text-white">Create Service</h1><ContentForm table="services" /></div>;
}
