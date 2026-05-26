import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/public/section";
import { NoteCard } from "@/components/public/note-card";
import { getNoteBySlug, getPublishedNotes } from "@/lib/data/public";
import { absoluteUrl, formatDate } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);
  if (!note) return {};
  return { title: note.seo_title || note.title, description: note.seo_description || note.excerpt || undefined, alternates: { canonical: absoluteUrl(`/notes/${slug}`) } };
}

export default async function NoteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [note, allNotes] = await Promise.all([getNoteBySlug(slug), getPublishedNotes({ limit: 4 })]);
  if (!note) notFound();
  const headings = (note.content || "").match(/^## .+/gm)?.map((item) => item.replace(/^## /, "")) || [];
  const related = allNotes.filter((item) => item.slug !== note.slug).slice(0, 2);

  return (
    <Section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BlogPosting", headline: note.title, datePublished: note.published_at, url: absoluteUrl(`/notes/${note.slug}`) }) }} />
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap gap-2">
          {note.category ? <Badge>{note.category}</Badge> : null}
          <Badge variant="secondary">{formatDate(note.published_at)}</Badge>
          <Badge variant="secondary">{note.read_time || 4} min read</Badge>
        </div>
        <h1 className="mt-5 font-[var(--font-space)] text-4xl font-semibold text-white md:text-6xl">{note.title}</h1>
        <p className="mt-5 text-lg leading-8 text-slate-300">{note.excerpt}</p>
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-lg border border-slate-800">
          <Image src={note.cover_image_url || "/images/placeholders/note.svg"} alt="" fill priority className="object-cover" />
        </div>
        {headings.length ? (
          <nav className="mt-8 rounded-lg border border-slate-800 bg-slate-900/60 p-5" aria-label="Table of contents">
            <p className="text-sm font-medium text-slate-100">Table of contents</p>
            <ol className="mt-3 grid gap-2 text-sm text-slate-400">{headings.map((heading) => <li key={heading}>{heading}</li>)}</ol>
          </nav>
        ) : null}
        <article className="prose-hq mt-10 max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>{note.content || ""}</ReactMarkdown>
        </article>
        <div className="mt-12 glass rounded-lg p-8">
          <h2 className="font-[var(--font-space)] text-2xl font-semibold text-white">Need a system with this kind of thinking behind it?</h2>
          <Button asChild className="mt-5"><Link href="/contact">Work with Kavin</Link></Button>
        </div>
      </div>
      {related.length ? <div className="mx-auto mt-16 grid max-w-5xl gap-6 lg:grid-cols-2">{related.map((item) => <NoteCard key={item.id} note={item} />)}</div> : null}
    </Section>
  );
}
