import { AdminResource } from "@/components/admin-resource";
import { getNotes, getProjects, getServices } from "@/lib/data";

export const metadata = { title: "Admin" };

export default async function AdminPage() {
  const [projects, notes, services] = await Promise.all([getProjects(), getNotes(), getServices()]);
  const stats = [
    ["Projects", projects.length],
    ["Notes", notes.length],
    ["Services", services.length],
    ["Inquiries", 0]
  ];

  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight text-white">Admin Dashboard</h1>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        Manage the content that powers Kavin HQ. Connect Supabase Auth to make this dashboard private to the configured admin email.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {stats.map(([label, value]) => (
          <div className="rounded-lg border border-slate-800 bg-slate-950/35 p-5" key={label}>
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <AdminResource
          description="Recent content at a glance."
          items={projects.slice(0, 3).map((project) => ({
            title: project.title,
            description: project.description,
            meta: project.year,
            status: project.status
          }))}
          title="Recent Projects"
        />
      </div>
    </section>
  );
}
