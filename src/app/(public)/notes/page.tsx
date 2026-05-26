import type { Metadata } from "next";
import { Input } from "@/components/ui/input";
import { NoteCard } from "@/components/public/note-card";
import { Section, SectionHeading } from "@/components/public/section";
import { getPublishedNotes } from "@/lib/data/public";

export const metadata: Metadata = { title: "Notes", description: "Technical notes and writing from Kavin HQ." };

export default async function NotesPage({ searchParams }: { searchParams: Promise<{ q?: string; tag?: string }> }) {
  const params = await searchParams;
  const notes = await getPublishedNotes();
  const tags = [...new Set(notes.flatMap((note) => note.tags || []))];
  const q = (params.q || "").toLowerCase();
  const tag = params.tag || "";
  const filtered = notes.filter((note) => {
    const matchesTag = !tag || note.tags?.includes(tag);
    const haystack = `${note.title} ${note.excerpt} ${note.category} ${note.tags?.join(" ")}`.toLowerCase();
    return matchesTag && (!q || haystack.includes(q));
  });

  return (
    <Section>
      <SectionHeading eyebrow="Notes" title="Engineering notes for decisions, patterns, and practical systems." />
      <form className="mt-10 grid gap-3 md:grid-cols-[1fr_auto]">
        <Input name="q" defaultValue={params.q} placeholder="Search notes" aria-label="Search notes" />
        <select name="tag" defaultValue={tag} className="focus-ring h-11 rounded-md border border-slate-700 bg-slate-950/70 px-3 text-sm text-slate-100">
          <option value="">All tags</option>
          {tags.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </form>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {filtered.map((note) => <NoteCard key={note.id} note={note} />)}
      </div>
    </Section>
  );
}
