import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/project-form";
import { adminGet } from "@/lib/admin-data";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await adminGet("projects", id);
  if (!project) notFound();

  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight text-white">Edit Project</h1>
      <div className="mt-8">
        <ProjectForm project={project} />
      </div>
    </section>
  );
}
