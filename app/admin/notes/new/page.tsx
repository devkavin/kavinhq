import { NoteForm } from "@/components/note-form";

export default function NewNotePage() {
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight text-white">New Note</h1>
      <div className="mt-8">
        <NoteForm />
      </div>
    </section>
  );
}
