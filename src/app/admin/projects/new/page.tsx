import { ContentForm } from "@/components/admin/content-form";

export default function NewProjectPage() {
  return <div><h1 className="mb-6 font-[var(--font-space)] text-3xl font-semibold text-white">Create Project</h1><ContentForm table="projects" /></div>;
}
