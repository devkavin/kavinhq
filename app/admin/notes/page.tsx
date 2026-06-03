import { AdminTable } from "@/components/admin-table";
import { adminList } from "@/lib/admin-data";

export default async function AdminNotesPage() {
  const notes = await adminList("notes", "updated_at");
  return (
    <AdminTable
      description="Write and publish notes from the work."
      editBasePath="/admin/notes"
      newPath="/admin/notes/new"
      rows={notes.map((note: any) => ({ id: note.id, title: note.title, description: note.excerpt, meta: note.read_time, status: note.status }))}
      table="notes"
      title="Notes"
    />
  );
}
