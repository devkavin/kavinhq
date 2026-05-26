import Link from "next/link";
import { AdminTable } from "@/components/admin/admin-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { listTable } from "@/lib/data/admin";
import type { Testimonial } from "@/types/database";

export default async function TestimonialsAdminPage() {
  const rows = await listTable<Testimonial>("testimonials");
  return <div><div className="flex items-center justify-between"><h1 className="font-[var(--font-space)] text-3xl font-semibold text-white">Testimonials</h1><Button asChild><Link href="/admin/testimonials/new">Create</Link></Button></div><Card className="mt-6 p-3"><AdminTable rows={rows} table="testimonials" basePath="/admin/testimonials" /></Card></div>;
}
