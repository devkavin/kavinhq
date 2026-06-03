import Link from "next/link";
import { adminCounts, adminList } from "@/lib/admin-data";

export const metadata = { title: "Admin" };

export default async function AdminPage() {
  const [counts, projects, inquiries] = await Promise.all([
    adminCounts(),
    adminList("projects", "updated_at"),
    adminList("contact_inquiries", "created_at")
  ]);
  const stats = [
    ["Projects", counts.projects],
    ["Notes", counts.notes],
    ["Services", counts.services],
    ["Inquiries", counts.inquiries]
  ];

  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight text-white">Admin Dashboard</h1>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        Manage the content that powers Kavin HQ. Your password-protected admin session is active.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {stats.map(([label, value]) => (
          <div className="rounded-lg border border-slate-800 bg-slate-950/35 p-5" key={label}>
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Panel title="Recent Projects" href="/admin/projects">
          {projects.slice(0, 5).map((project: any) => (
            <Row key={project.id} meta={project.status} title={project.title} />
          ))}
        </Panel>
        <Panel title="Recent Inquiries" href="/admin/inquiries">
          {inquiries.slice(0, 5).map((inquiry: any) => (
            <Row key={inquiry.id} meta={inquiry.status} title={`${inquiry.name} · ${inquiry.project_type}`} />
          ))}
        </Panel>
      </div>
    </section>
  );
}

function Panel({ children, href, title }: { children: React.ReactNode; href: string; title: string }) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/30 p-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-semibold text-white">{title}</h2>
        <Link className="text-sm text-sky-300" href={href}>View all</Link>
      </div>
      <div className="mt-5 grid gap-3">{children}</div>
    </section>
  );
}

function Row({ meta, title }: { meta: string; title: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-slate-800 pt-3 text-sm">
      <span className="text-slate-300">{title}</span>
      <span className="capitalize text-slate-500">{meta}</span>
    </div>
  );
}
