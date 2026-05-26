import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import type { Note } from "@/types/database";

export function NoteCard({ note }: { note: Note }) {
  return (
    <Link href={`/notes/${note.slug}`} className="group block">
      <Card className="grid h-full overflow-hidden md:grid-cols-[0.8fr_1.2fr]">
        <div className="relative min-h-56 bg-slate-900">
          <Image src={note.cover_image_url || "/images/placeholders/note.svg"} alt="" fill sizes="(min-width: 768px) 35vw, 100vw" className="object-cover" />
        </div>
        <div className="p-5">
          <div className="flex flex-wrap gap-2">
            {note.category ? <Badge>{note.category}</Badge> : null}
            <Badge variant="secondary">{note.read_time || 4} min read</Badge>
          </div>
          <h3 className="mt-4 font-[var(--font-space)] text-xl font-semibold text-white group-hover:text-sky-200">{note.title}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">{note.excerpt}</p>
          <p className="mt-5 text-xs uppercase tracking-[0.18em] text-slate-500">{formatDate(note.published_at)}</p>
        </div>
      </Card>
    </Link>
  );
}
