import { AdminResource } from "@/components/admin-resource";
import { getProjects } from "@/lib/data";

export default async function AdminProjectsPage() {
  const projects = await getProjects();
  return (
    <AdminResource
      description="Create, update, and publish case studies."
      items={projects.map((project) => ({ title: project.title, description: project.description, meta: project.year, status: project.status }))}
      title="Projects"
    />
  );
}
