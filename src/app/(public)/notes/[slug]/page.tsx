import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, Bookmark, MessageSquare, Terminal } from 'lucide-react';
import { getNoteBySlug, getPublishedNotes } from '@/actions/notes';
import { Markdown } from '@/components/shared/markdown';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = await getNoteBySlug(slug).catch(() => null);

  if (!note) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: note.title,
    description: note.excerpt || `Read the full article ${note.title} on Kavin HQ.`,
    openGraph: {
      title: `${note.title} | Kavin HQ`,
      description: note.excerpt || `Read the full article ${note.title} on Kavin HQ.`,
      type: 'article',
      publishedTime: note.published_at || undefined,
      images: note.cover_image_url ? [note.cover_image_url] : [],
    },
  };
}

function extractHeadings(content: string) {
  const lines = content.split('\n');
  const headings: { text: string; id: string; level: number }[] = [];
  
  lines.forEach((line) => {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length; // 2 or 3
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      headings.push({ text, id, level });
    }
  });

  return headings;
}

export default async function NoteDetailPage({ params }: Props) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug).catch(() => null);

  if (!note) {
    notFound();
  }

  const allNotes = await getPublishedNotes().catch(() => []);
  const relatedNotes = allNotes
    .filter((n) => n.id !== note.id)
    .slice(0, 2);

  const headings = extractHeadings(note.content || '');

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="py-12 relative font-sans">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-20" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back Link */}
        <Link
          href="/notes"
          className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>&lt; BACK TO TECHNICAL LOGS</span>
        </Link>

        {/* Article Header */}
        <div className="border-b border-border/40 pb-8 mb-12">
          
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground mb-4">
            <span className="text-primary font-bold">[ {note.category.toUpperCase()} ]</span>
            <span className="hidden sm:inline">//</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formatDate(note.published_at)}</span>
            </span>
            <span>//</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{note.read_time ? `${note.read_time} MIN READ` : '3 MIN READ'}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-[1.1] mb-6">
            {note.title}
          </h1>

          <p className="text-lg text-muted-foreground max-w-4xl leading-relaxed">
            {note.excerpt}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-6">
            {note.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-mono text-muted-foreground bg-secondary/80 border border-border/40 px-2.5 py-0.5 rounded">
                #{tag.toLowerCase()}
              </span>
            ))}
          </div>

        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Sidebar: Table of Contents & Promo (Cols 1-3) */}
          <div className="hidden lg:block lg:col-span-3 space-y-8 sticky top-24 font-mono text-xs text-muted-foreground">
            
            {headings.length > 0 && (
              <div className="space-y-3 bg-secondary/20 p-4 border border-border/40 rounded-lg glass-panel">
                <div className="flex items-center gap-1.5 font-bold text-foreground border-b border-border/20 pb-2 mb-2">
                  <Bookmark className="h-4 w-4 text-primary" />
                  <span>TABLE OF CONTENTS</span>
                </div>
                <ul className="space-y-2">
                  {headings.map((h, i) => (
                    <li key={i} className={h.level === 3 ? 'pl-3' : ''}>
                      <a
                        href={`#${h.id}`}
                        className="hover:text-primary transition-colors hover:underline block leading-snug"
                      >
                        &gt; {h.text.toUpperCase()}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Newsletter/Quote Promo */}
            <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg space-y-4">
              <div className="flex items-center gap-1.5 font-bold text-foreground">
                <Terminal className="h-4 w-4 text-primary" />
                <span>HQ WORKWAYS</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Need customized system architectures, load optimizations, or code reviews for your engineering platform?
              </p>
              <Link href="/contact" className="block">
                <Button className="w-full text-[10px] font-mono h-8">
                  CONTACT KAVIN &gt;
                </Button>
              </Link>
            </div>

          </div>

          {/* Main Markdown Article Body (Cols 4-12) */}
          <div className="lg:col-span-9 space-y-8 font-sans max-w-3xl">
            {note.cover_image_url && (
              <div
                className="w-full h-56 sm:h-80 rounded-lg border border-border/40 bg-cover bg-center overflow-hidden mb-6"
                style={{ backgroundImage: `url(${note.cover_image_url})` }}
              />
            )}

            <Markdown content={note.content || ''} />

            {/* Support CTA Footer */}
            <div className="border-t border-border/20 pt-8 mt-12 bg-secondary/10 border border-border/40 p-6 rounded-lg">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-base font-bold text-foreground mb-1">
                    Have feedback or questions?
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    If you are interested in applying these architecture designs to your workflow, schedule an alignment talk.
                  </p>
                </div>
                <Link href="/contact" className="shrink-0">
                  <Button variant="outline" className="font-mono text-xs h-9 justify-center gap-1.5">
                    <MessageSquare className="h-4 w-4" />
                    <span>START CONVERSATION</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Related Notes */}
        {relatedNotes.length > 0 && (
          <div className="mt-20 border-t border-border/20 pt-12">
            <h3 className="text-xl font-bold text-foreground mb-8 font-mono text-sm uppercase tracking-widest">
              // Related articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedNotes.map((n) => (
                <Link key={n.id} href={`/notes/${n.slug}`} className="group block">
                  <Card className="border-border/30 bg-card/40">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-mono text-primary uppercase">{n.category}</span>
                        <span className="text-xs font-mono text-muted-foreground">{formatDate(n.published_at)}</span>
                      </div>
                      <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {n.title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-2 leading-relaxed">
                        {n.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
