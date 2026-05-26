import Link from "next/link";
import { AdminTable } from "@/components/admin/admin-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { listTable } from "@/lib/data/admin";
import type { Note } from "@/types/database";

export default async function NotesAdminPage() {
  const rows = await listTable<Note>("notes");
  return <div><div className="flex items-center justify-between"><h1 className="font-[var(--font-space)] text-3xl font-semibold text-white">Notes</h1><Button asChild><Link href="/admin/notes/new">Create</Link></Button></div><Card className="mt-6 p-3"><AdminTable rows={rows} table="notes" basePath="/admin/notes" /></Card></div>;
}
