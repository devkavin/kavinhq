'use client';

import * as React from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, BookOpen, Calendar, Clock, Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Note {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string;
  tags: string[];
  cover_image_url?: string | null;
  published_at?: string | null;
  read_time?: number | null;
}

export function NotesGrid({ initialNotes }: { initialNotes: Note[] }) {
  const [search, setSearch] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('ALL');

  // Extract unique categories
  const categories = React.useMemo(() => {
    const cats = new Set(initialNotes.map((n) => n.category).filter(Boolean));
    return ['ALL', ...Array.from(cats)];
  }, [initialNotes]);

  // Filter notes
  const filteredNotes = React.useMemo(() => {
    return initialNotes.filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        (note.excerpt || '').toLowerCase().includes(search.toLowerCase()) ||
        note.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
      
      const matchesCategory =
        selectedCategory === 'ALL' || note.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [initialNotes, search, selectedCategory]);

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Search & Filter Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-secondary/20 p-4 border border-border/40 rounded-lg font-mono text-sm">
        
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="SEARCH BY TITLE, CONTENT, TAG..."
            className="pl-9 bg-background/50 uppercase text-xs font-mono"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
          <div className="flex items-center gap-2 mr-2 text-muted-foreground">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="text-xs uppercase">FILTER:</span>
          </div>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="text-xs font-mono uppercase h-8 py-1 px-3"
            >
              {cat}
            </Button>
          ))}
        </div>

      </div>

      {/* Grid List */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <Link key={note.id} href={`/notes/${note.slug}`} className="group block">
              <Card className="h-full border-border/40 bg-card/60 flex flex-col justify-between glass-card">
                
                <div>
                  {/* Cover image if available */}
                  {note.cover_image_url ? (
                    <div
                      className="w-full h-40 bg-cover bg-center border-b border-border/25 relative overflow-hidden"
                      style={{ backgroundImage: `url(${note.cover_image_url})` }}
                    >
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors" />
                    </div>
                  ) : (
                    <div className="w-full h-3 bg-primary/20 shrink-0" />
                  )}

                  <CardContent className="p-6">
                    {/* Category & Time */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground mb-3">
                      <span className="text-primary font-bold">{note.category.toUpperCase()}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{note.read_time ? `${note.read_time} MIN READ` : '3 MIN READ'}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                      {note.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                      {note.excerpt}
                    </p>
                  </CardContent>
                </div>

                {/* Footer metadata */}
                <div className="px-6 pb-6 pt-0 mt-auto">
                  <div className="flex flex-wrap gap-1 mb-4">
                    {note.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono text-muted-foreground bg-secondary/80 border border-border/40 px-1 py-0.5 rounded"
                      >
                        #{tag.toLowerCase()}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-border/20 pt-3 text-[10px] font-mono text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(note.published_at)}</span>
                    </span>
                    <span className="text-primary group-hover:underline flex items-center gap-0.5">
                      <span>READ</span>
                      <span>&gt;</span>
                    </span>
                  </div>
                </div>

              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-border/40 rounded-lg font-mono text-sm text-muted-foreground">
          No articles found matching the query.
        </div>
      )}
    </div>
  );
}
