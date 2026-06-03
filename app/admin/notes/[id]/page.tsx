import { notFound } from "next/navigation";
import { NoteForm } from "@/components/note-form";
import { adminGet } from "@/lib/admin-data";

export default async function EditNotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const note = await adminGet("notes", id);
  if (!note) notFound();

  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight text-white">Edit Note</h1>
      <div className="mt-8">
        <NoteForm note={note} />
      </div>
    </section>
  );
}
