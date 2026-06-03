import * as React from 'react';
import type { Metadata } from 'next';
import { getPublishedNotes } from '@/actions/notes';
import { NotesGrid } from '@/components/public/notes-grid';

export const metadata: Metadata = {
  title: 'Notes & Guides',
  description: 'Technical notes, architectural guides, systems updates, and engineering thoughts from Kavin HQ.',
};

export default async function NotesPage() {
  const notes = await getPublishedNotes().catch(() => []);

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-mono text-primary mb-4 uppercase">
            <span>HQ ARCHIVES // WRITTEN LOGS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Technical Notes & Guides
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
            I write deep-dives on dashboard telemetry, database structures, web app architecture, and cloud deployment pipelines.
          </p>
        </div>

        {/* Notes Grid search & filter */}
        <NotesGrid initialNotes={notes} />

      </div>
    </div>
  );
}
