import { NoteCard } from "@/components/cards";
import { Input } from "@/components/ui/input";
import { getNotes } from "@/lib/data";

export const metadata = { title: "Notes" };

export default async function NotesPage() {
  const notes = await getNotes();
  const categories = ["All", ...Array.from(new Set(notes.map((note) => note.category)))];

  return (
    <section className="section">
      <div className="shell">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-semibold tracking-tight text-white">Notes</h1>
          <p className="mt-5 text-lg leading-8 text-slate-400">
            Short writing about building websites, dashboards, and useful web systems.
          </p>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-y border-slate-800/70 py-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <span className="rounded-md border border-slate-800 px-3 py-1.5 text-sm text-slate-300" key={category}>
                {category}
              </span>
            ))}
          </div>
          <div className="w-full md:w-72">
            <Input aria-label="Search notes" placeholder="Search notes..." />
          </div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </div>
    </section>
  );
}
