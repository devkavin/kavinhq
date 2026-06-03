import { AdminResource } from "@/components/admin-resource";
import { getNotes } from "@/lib/data";

export default async function AdminNotesPage() {
  const notes = await getNotes();
  return (
    <AdminResource
      description="Write and publish notes from the work."
      items={notes.map((note) => ({ title: note.title, description: note.excerpt, meta: note.readTime, status: note.status }))}
      title="Notes"
    />
  );
}
