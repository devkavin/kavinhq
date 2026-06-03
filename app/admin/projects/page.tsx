import { AdminTable } from "@/components/admin-table";
import { adminList } from "@/lib/admin-data";

export default async function AdminProjectsPage() {
  const projects = await adminList("projects", "updated_at");
  return (
    <AdminTable
      description="Create, update, and publish case studies."
      editBasePath="/admin/projects"
      newPath="/admin/projects/new"
      rows={projects.map((project: any) => ({ id: project.id, title: project.title, description: project.description, meta: project.year, status: project.status }))}
      table="projects"
      title="Projects"
    />
  );
}
