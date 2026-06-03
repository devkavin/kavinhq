import * as React from 'react';
import type { Metadata } from 'next';
import { getAdminNotes } from '@/actions/notes';
import { NoteManager } from '@/components/admin/note-manager';
import { FileText, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Technical Notes Manager | Admin Console',
};

export default async function AdminNotesPage() {
  const notes = await getAdminNotes().catch(() => []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-border/40 pb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[10px] font-mono text-primary mb-2 uppercase">
            <span>TECHNICAL LOGS // EDITORIAL COMMAND</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span>Manage Notes</span>
          </h1>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground bg-secondary/35 border border-border/40 p-2 rounded">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>NOTES TABLE: ACTIVE</span>
        </div>
      </div>

      {/* Note CRUD Manager */}
      <NoteManager initialNotes={notes as any} />

    </div>
  );
}
