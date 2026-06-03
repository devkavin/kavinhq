'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileText, Plus, Edit3, Trash2, Save, X, Search, Check, AlertTriangle, Eye, Loader2 } from 'lucide-react';
import { noteSchema, type NoteInput } from '@/lib/validations/schemas';
import { createNote, updateNote, deleteNote } from '@/actions/notes';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/toast';
import { cn } from '@/lib/utils/cn';

interface Note {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  tags: string[];
  cover_image_url?: string | null;
  status: string;
  published_at?: string | null;
  read_time?: number | null;
  seo_title?: string | null;
  seo_description?: string | null;
}

export function NoteManager({ initialNotes }: { initialNotes: Note[] }) {
  const { toast } = useToast();
  const [notes, setNotes] = React.useState<Note[]>(initialNotes);
  const [search, setSearch] = React.useState('');
  
  // Navigation states: 'list' | 'create' | 'edit'
  const [view, setView] = React.useState<'list' | 'create' | 'edit'>('list');
  const [editingNote, setEditingNote] = React.useState<Note | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

  // Filter notes
  const filteredNotes = React.useMemo(() => {
    return notes.filter((n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [notes, search]);

  // Hook Form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<NoteInput>({
    resolver: zodResolver(noteSchema),
  });

  const startCreate = () => {
    reset({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'Engineering',
      tags: [],
      cover_image_url: '',
      status: 'draft',
      published_at: '',
      read_time: 5,
      seo_title: '',
      seo_description: '',
    });
    setView('create');
  };

  const startEdit = (n: Note) => {
    setEditingNote(n);
    reset({
      title: n.title,
      slug: n.slug,
      excerpt: n.excerpt || '',
      content: n.content || '',
      category: n.category,
      tags: n.tags || [],
      cover_image_url: n.cover_image_url || '',
      status: n.status as any,
      published_at: n.published_at || '',
      read_time: n.read_time || 5,
      seo_title: n.seo_title || '',
      seo_description: n.seo_description || '',
    });
    setView('edit');
  };

  const onFormSubmit = async (data: NoteInput) => {
    setIsSaving(true);
    try {
      if (view === 'create') {
        const newNote = await createNote(data);
        setNotes((prev) => [newNote as any, ...prev]);
        toast({
          title: 'Article Created',
          message: `"${data.title}" was published/registered.`,
          type: 'success',
        });
      } else if (view === 'edit' && editingNote) {
        const updatedNote = await updateNote(editingNote.id, data);
        setNotes((prev) =>
          prev.map((n) => (n.id === editingNote.id ? (updatedNote as any) : n))
        );
        toast({
          title: 'Article Updated',
          message: `"${data.title}" changes saved successfully.`,
          type: 'success',
        });
      }
      setView('list');
    } catch (err: any) {
      toast({
        title: 'Error',
        message: err.message || 'An error occurred while saving the note.',
        type: 'error',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (n: Note) => {
    if (!confirm(`Are you sure you want to delete "${n.title}"? This cannot be undone.`)) return;

    try {
      await deleteNote(n.id, n.slug);
      setNotes((prev) => prev.filter((note) => note.id !== n.id));
      toast({
        title: 'Note Deleted',
        message: `"${n.title}" has been deleted.`,
        type: 'success',
      });
    } catch (err: any) {
      toast({
        title: 'Delete Failed',
        message: err.message || 'Could not delete the note.',
        type: 'error',
      });
    }
  };

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      
      {/* ----------------- LIST VIEW ----------------- */}
      {view === 'list' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-secondary/20 p-4 border border-border/40 rounded-lg">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="SEARCH WRITTEN LOGS..."
                className="pl-9 bg-background/50 uppercase text-[10px]"
              />
            </div>
            <Button onClick={startCreate} className="w-full sm:w-auto h-9 text-[10px]">
              <Plus className="h-4 w-4 mr-1" />
              CREATE NOTE &gt;
            </Button>
          </div>

          <div className="border border-border/40 bg-card rounded-lg overflow-hidden glass-panel">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Read Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Published Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNotes.length > 0 ? (
                  filteredNotes.map((n) => (
                    <TableRow key={n.id}>
                      <TableCell className="font-bold text-foreground">{n.title}</TableCell>
                      <TableCell className="text-muted-foreground">{n.category}</TableCell>
                      <TableCell>{n.read_time ? `${n.read_time} min` : 'N/A'}</TableCell>
                      <TableCell>
                        <Badge variant={n.status === 'published' ? 'success' : 'outline'}>
                          {n.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{formatDate(n.published_at)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => startEdit(n)} className="h-7 text-[10px]">
                            <Edit3 className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(n)}
                            className="h-7 w-7 text-rose-400 hover:text-rose-300 hover:bg-rose-950/20"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-16 text-muted-foreground">
                      No technical notes found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* ----------------- CREATE/EDIT VIEW ----------------- */}
      {(view === 'create' || view === 'edit') && (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 max-w-4xl font-sans text-xs bg-secondary/15 p-6 sm:p-8 rounded-lg border border-border/40 glass-panel">
          
          <div className="flex justify-between items-center border-b border-border/40 pb-4 mb-4">
            <h3 className="font-mono text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-primary" />
              <span>{view === 'create' ? 'CREATE TECHNICAL NOTE REGISTER' : 'EDIT TECHNICAL NOTE CONFIG'}</span>
            </h3>
            <Button type="button" variant="outline" size="sm" onClick={() => setView('list')} className="h-8 text-[10px] font-mono">
              <X className="h-3.5 w-3.5 mr-1" />
              CANCEL
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-foreground">Note Title *</label>
              <Input
                placeholder="Building Sub-second Telemetry Dashboards"
                {...register('title')}
                className={errors.title ? 'border-destructive' : ''}
              />
              {errors.title && <p className="text-[10px] text-destructive font-mono">{errors.title.message}</p>}
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-foreground">Slug (alphanumeric and hyphens only) *</label>
              <Input
                placeholder="building-sub-second-telemetry-dashboards"
                {...register('slug')}
                className={errors.slug ? 'border-destructive' : ''}
              />
              {errors.slug && <p className="text-[10px] text-destructive font-mono">{errors.slug.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Category */}
            <div className="space-y-1.5 col-span-1">
              <label className="text-xs font-mono font-bold text-foreground">Category *</label>
              <Input
                placeholder="Engineering"
                {...register('category')}
              />
            </div>

            {/* Read Time */}
            <div className="space-y-1.5 col-span-1">
              <label className="text-xs font-mono font-bold text-foreground">Estimated Read Time (Minutes)</label>
              <Input
                type="number"
                placeholder="5"
                {...register('read_time', { valueAsNumber: true })}
              />
            </div>

            {/* Cover Image URL */}
            <div className="space-y-1.5 col-span-1">
              <label className="text-xs font-mono font-bold text-foreground">Cover Image URL</label>
              <Input
                placeholder="/images/placeholders/telemetry.webp"
                {...register('cover_image_url')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border/20 pt-4">
            {/* Status */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-foreground">Publish Status *</label>
              <Select
                options={[
                  { value: 'draft', label: 'Draft' },
                  { value: 'published', label: 'Published' },
                ]}
                {...register('status')}
              />
            </div>

            {/* Published At */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-foreground">Published Date Override (Optional)</label>
              <Input
                type="text"
                placeholder="YYYY-MM-DDTHH:MM:SSZ"
                {...register('published_at')}
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-1.5 border-t border-border/20 pt-4">
            <label className="text-xs font-mono font-bold text-foreground block">Tags (Comma separated)</label>
            <Input
              placeholder="Next.js, Architecture, Dashboards"
              onChange={(e) => {
                const arr = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                setValue('tags', arr);
              }}
              defaultValue={editingNote?.tags?.join(', ') || ''}
            />
          </div>

          {/* Excerpt */}
          <div className="space-y-1.5 border-t border-border/20 pt-4">
            <label className="text-xs font-mono font-bold text-foreground">Excerpt (Short card summary copy)</label>
            <Textarea placeholder="A brief description of this note..." {...register('excerpt')} rows={2} />
          </div>

          {/* Markdown Content */}
          <div className="space-y-1.5 border-t border-border/20 pt-4">
            <label className="text-xs font-mono font-bold text-foreground">Markdown Content *</label>
            <Textarea
              placeholder="# Building Telemetry... Write markdown text here..."
              rows={15}
              {...register('content')}
              className={cn('font-mono text-xs leading-relaxed', errors.content ? 'border-destructive' : '')}
            />
            {errors.content && <p className="text-[10px] text-destructive font-mono">{errors.content.message}</p>}
          </div>

          {/* SEO Header Override Meta */}
          <div className="space-y-4 border-t border-border/20 pt-4">
            <h4 className="font-mono text-xs font-bold text-foreground uppercase tracking-widest">// SEO Meta Tags Overrides</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-foreground">SEO Title Override</label>
                <Input placeholder="Building Telemetry | Kavin HQ" {...register('seo_title')} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-foreground">SEO Description Override</label>
                <Input placeholder="A deep breakdown of low-latency dashboard interfaces." {...register('seo_description')} />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSaving}
            className="w-full font-mono text-xs py-5 justify-center mt-6"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>SAVING ARTICLE DATA...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>SAVE NOTE RECORD</span>
              </>
            )}
          </Button>

        </form>
      )}

    </div>
  );
}
