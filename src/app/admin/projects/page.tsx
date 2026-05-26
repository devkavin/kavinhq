import Link from "next/link";
import { AdminTable } from "@/components/admin/admin-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { listTable } from "@/lib/data/admin";
import type { Project } from "@/types/database";

export default async function ProjectsAdminPage() {
  const rows = await listTable<Project>("projects");
  return <AdminList title="Projects" href="/admin/projects/new"><AdminTable rows={rows} table="projects" basePath="/admin/projects" /></AdminList>;
}

function AdminList({ title, href, children }: { title: string; href: string; children: React.ReactNode }) {
  return <div><div className="flex items-center justify-between gap-4"><h1 className="font-[var(--font-space)] text-3xl font-semibold text-white">{title}</h1><Button asChild><Link href={href}>Create</Link></Button></div><Card className="mt-6 p-3">{children}</Card></div>;
}
