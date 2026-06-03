import { ProjectForm } from "@/components/project-form";

export default function NewProjectPage() {
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight text-white">New Project</h1>
      <div className="mt-8">
        <ProjectForm />
      </div>
    </section>
  );
}
