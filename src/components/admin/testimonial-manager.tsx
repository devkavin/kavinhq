'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Quote, Plus, Edit3, Trash2, Save, X, Search, Check, AlertTriangle, Loader2 } from 'lucide-react';
import { testimonialSchema, type TestimonialInput } from '@/lib/validations/schemas';
import { createTestimonial, updateTestimonial, deleteTestimonial } from '@/actions/testimonials';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/toast';

interface Testimonial {
  id: string;
  name: string;
  role_or_company?: string;
  quote: string;
  image_url?: string;
  status: string;
  sort_order: number;
}

export function TestimonialManager({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>(initialTestimonials);
  const [search, setSearch] = React.useState('');
  
  // Navigation states: 'list' | 'create' | 'edit'
  const [view, setView] = React.useState<'list' | 'create' | 'edit'>('list');
  const [editingTestimonial, setEditingTestimonial] = React.useState<Testimonial | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

  // Filter list
  const filtered = React.useMemo(() => {
    return testimonials.filter((t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      (t.role_or_company && t.role_or_company.toLowerCase().includes(search.toLowerCase()))
    );
  }, [testimonials, search]);

  // Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TestimonialInput>({
    resolver: zodResolver(testimonialSchema),
  });

  const startCreate = () => {
    reset({
      name: '',
      role_or_company: '',
      quote: '',
      image_url: '',
      status: 'draft',
      sort_order: 0,
    });
    setView('create');
  };

  const startEdit = (t: Testimonial) => {
    setEditingTestimonial(t);
    reset({
      name: t.name,
      role_or_company: t.role_or_company || '',
      quote: t.quote,
      image_url: t.image_url || '',
      status: t.status as any,
      sort_order: t.sort_order || 0,
    });
    setView('edit');
  };

  const onFormSubmit = async (data: TestimonialInput) => {
    setIsSaving(true);
    try {
      if (view === 'create') {
        const created = await createTestimonial(data);
        setTestimonials((prev) => [created as any, ...prev]);
        toast({
          title: 'Testimonial Logged',
          message: `${data.name} review registered.`,
          type: 'success',
        });
      } else if (view === 'edit' && editingTestimonial) {
        const updated = await updateTestimonial(editingTestimonial.id, data);
        setTestimonials((prev) =>
          prev.map((t) => (t.id === editingTestimonial.id ? (updated as any) : t))
        );
        toast({
          title: 'Testimonial Updated',
          message: `Saved changes for ${data.name}.`,
          type: 'success',
        });
      }
      setView('list');
    } catch (err: any) {
      toast({
        title: 'Error',
        message: err.message || 'An error occurred while saving.',
        type: 'error',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (t: Testimonial) => {
    if (!confirm(`Are you sure you want to delete ${t.name}'s testimonial?`)) return;

    try {
      await deleteTestimonial(t.id);
      setTestimonials((prev) => prev.filter((item) => item.id !== t.id));
      toast({
        title: 'Record Removed',
        message: `${t.name} review deleted successfully.`,
        type: 'success',
      });
    } catch (err: any) {
      toast({
        title: 'Delete Failed',
        message: err.message || 'Could not delete.',
        type: 'error',
      });
    }
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
                placeholder="SEARCH TESTIMONIALS..."
                className="pl-9 bg-background/50 uppercase text-[10px]"
              />
            </div>
            <Button onClick={startCreate} className="w-full sm:w-auto h-9 text-[10px]">
              <Plus className="h-4 w-4 mr-1" />
              CREATE TESTIMONIAL &gt;
            </Button>
          </div>

          <div className="border border-border/40 bg-card rounded-lg overflow-hidden glass-panel">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Role / Organization</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length > 0 ? (
                  filtered.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell className="font-bold text-foreground">{t.name}</TableCell>
                      <TableCell className="text-muted-foreground">{t.role_or_company || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge variant={t.status === 'published' ? 'success' : 'outline'}>
                          {t.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-primary font-bold">0{t.sort_order}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => startEdit(t)} className="h-7 text-[10px]">
                            <Edit3 className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(t)}
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
                    <TableCell colSpan={5} className="text-center py-16 text-muted-foreground">
                      No testimonials records registered.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* ----------------- FORM VIEW ----------------- */}
      {(view === 'create' || view === 'edit') && (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 max-w-4xl font-sans text-xs bg-secondary/15 p-6 sm:p-8 rounded-lg border border-border/40 glass-panel">
          
          <div className="flex justify-between items-center border-b border-border/40 pb-4 mb-4">
            <h3 className="font-mono text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-1.5">
              <Quote className="h-4 w-4 text-primary" />
              <span>{view === 'create' ? 'LOG NEW CLIENT TESTIMONIAL' : 'EDIT CLIENT TESTIMONIAL'}</span>
            </h3>
            <Button type="button" variant="outline" size="sm" onClick={() => setView('list')} className="h-8 text-[10px] font-mono">
              <X className="h-3.5 w-3.5 mr-1" />
              CANCEL
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-foreground">Client Name *</label>
              <Input
                placeholder="Jane Smith"
                {...register('name')}
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && <p className="text-[10px] text-destructive font-mono">{errors.name.message}</p>}
            </div>

            {/* Role / Org */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-foreground">Role / Company Name</label>
              <Input
                placeholder="CEO, Helios Inc"
                {...register('role_or_company')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border/20 pt-4">
            {/* Status */}
            <div className="space-y-1.5 col-span-1">
              <label className="text-xs font-mono font-bold text-foreground">Publish Status *</label>
              <Select
                options={[
                  { value: 'draft', label: 'Draft' },
                  { value: 'published', label: 'Published' },
                ]}
                {...register('status')}
              />
            </div>

            {/* Sort Order */}
            <div className="space-y-1.5 col-span-1">
              <label className="text-xs font-mono font-bold text-foreground">Sort Order</label>
              <Input
                type="number"
                {...register('sort_order', { valueAsNumber: true })}
              />
            </div>

            {/* Image URL */}
            <div className="space-y-1.5 col-span-1">
              <label className="text-xs font-mono font-bold text-foreground">Avatar / Quote Image URL</label>
              <Input
                placeholder="/images/avatars/jane.jpg"
                {...register('image_url')}
              />
            </div>
          </div>

          {/* Quote Text */}
          <div className="space-y-1.5 border-t border-border/20 pt-4">
            <label className="text-xs font-mono font-bold text-foreground">Quote / Review *</label>
            <Textarea
              placeholder="Write the client's detailed feedback statement..."
              rows={4}
              {...register('quote')}
              className={errors.quote ? 'border-destructive' : ''}
            />
            {errors.quote && <p className="text-[10px] text-destructive font-mono">{errors.quote.message}</p>}
          </div>

          <Button
            type="submit"
            disabled={isSaving}
            className="w-full font-mono text-xs py-5 justify-center mt-6"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>SAVING REVIEW DATA...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>SAVE TESTIMONIAL RECORD</span>
              </>
            )}
          </Button>

        </form>
      )}

    </div>
  );
}
