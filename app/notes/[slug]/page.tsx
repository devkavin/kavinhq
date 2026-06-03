import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getNoteBySlug, getNotes } from "@/lib/data";

export async function generateStaticParams() {
  const notes = await getNotes();
  return notes.map((note) => ({ slug: note.slug }));
}

export default async function NoteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);
  if (!note) notFound();

  return (
    <article className="section">
      <div className="shell">
        <Link className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white" href="/notes">
          <ArrowLeft size={15} /> Back to notes
        </Link>
        <div className="mt-9 max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">{note.title}</h1>
          <p className="mt-5 text-sm uppercase tracking-[0.12em] text-slate-500">
            {new Date(note.date).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })} · {note.readTime} · {note.category}
          </p>
        </div>
        <div className="relative mt-10 aspect-[1.95] overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
          <Image alt="" className="object-cover" fill priority src={note.image} />
        </div>
        <div className="mt-12 max-w-3xl text-lg leading-9 text-slate-300">
          <p>{note.content}</p>
        </div>
      </div>
    </article>
  );
}
