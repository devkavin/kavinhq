import Link from "next/link";
import { AdminTable } from "@/components/admin/admin-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { listTable } from "@/lib/data/admin";
import type { Service } from "@/types/database";

export default async function ServicesAdminPage() {
  const rows = await listTable<Service>("services");
  return <div><div className="flex items-center justify-between"><h1 className="font-[var(--font-space)] text-3xl font-semibold text-white">Services</h1><Button asChild><Link href="/admin/services/new">Create</Link></Button></div><Card className="mt-6 p-3"><AdminTable rows={rows} table="services" basePath="/admin/services" /></Card></div>;
}
