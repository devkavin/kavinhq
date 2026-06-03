'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Briefcase, Edit3, Save, X, Eye, Loader2 } from 'lucide-react';
import { serviceSchema, type ServiceInput } from '@/lib/validations/schemas';
import { getAdminServices, updateService, createService } from '@/actions/services';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/toast';

interface Service {
  id: string;
  title: string;
  slug: string;
  short_description?: string;
  who_it_is_for?: string;
  what_is_included: string[];
  deliverables: string[];
  sort_order: number;
  status: string;
}

export function ServiceManager({ initialServices }: { initialServices: Service[] }) {
  const { toast } = useToast();
  const [services, setServices] = React.useState<Service[]>(initialServices);
  
  // Navigation states: 'list' | 'edit'
  const [view, setView] = React.useState<'list' | 'edit'>('list');
  const [editingService, setEditingService] = React.useState<Service | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

  // Hook Form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ServiceInput>({
    resolver: zodResolver(serviceSchema),
  });

  const startEdit = (s: Service) => {
    setEditingService(s);
    reset({
      title: s.title,
      slug: s.slug,
      short_description: s.short_description || '',
      who_it_is_for: s.who_it_is_for || '',
      what_is_included: s.what_is_included || [],
      deliverables: s.deliverables || [],
      sort_order: s.sort_order || 0,
      status: s.status as any,
    });
    setView('edit');
  };

  const onFormSubmit = async (data: ServiceInput) => {
    setIsSaving(true);
    try {
      if (editingService) {
        const updated = await updateService(editingService.id, data);
        setServices((prev) =>
          prev.map((s) => (s.id === editingService.id ? (updated as any) : s))
        );
        toast({
          title: 'Service Updated',
          message: `${data.title} was updated successfully.`,
          type: 'success',
        });
      }
      setView('list');
    } catch (err: any) {
      toast({
        title: 'Error',
        message: err.message || 'An error occurred while saving the service.',
        type: 'error',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      
      {/* ----------------- LIST VIEW ----------------- */}
      {view === 'list' && (
        <div className="border border-border/40 bg-card rounded-lg overflow-hidden glass-panel">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[10%]">Order</TableHead>
                <TableHead className="w-[35%]">Service Title</TableHead>
                <TableHead className="w-[30%]">Client Profile</TableHead>
                <TableHead className="w-[15%]">Status</TableHead>
                <TableHead className="w-[10%] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.length > 0 ? (
                services.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-bold text-primary">0{s.sort_order}</TableCell>
                    <TableCell className="font-bold text-foreground">{s.title}</TableCell>
                    <TableCell className="text-muted-foreground">{s.who_it_is_for || 'All profiles'}</TableCell>
                    <TableCell>
                      <Badge variant={s.status === 'published' ? 'success' : 'outline'}>
                        {s.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => startEdit(s)} className="h-7 text-[10px]">
                        <Edit3 className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-16 text-muted-foreground">
                    No services registered.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* ----------------- EDIT VIEW ----------------- */}
      {view === 'edit' && editingService && (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 max-w-4xl font-sans text-xs bg-secondary/15 p-6 sm:p-8 rounded-lg border border-border/40 glass-panel">
          
          <div className="flex justify-between items-center border-b border-border/40 pb-4 mb-4">
            <h3 className="font-mono text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-1.5">
              <Briefcase className="h-4 w-4 text-primary" />
              <span>EDIT SERVICE CONFIG: {editingService.title.toUpperCase()}</span>
            </h3>
            <Button type="button" variant="outline" size="sm" onClick={() => setView('list')} className="h-8 text-[10px] font-mono">
              <X className="h-3.5 w-3.5 mr-1" />
              CANCEL
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title (Read-only as they are seeded) */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-foreground">Service Title *</label>
              <Input
                placeholder="Service Title"
                {...register('title')}
                readOnly
                className="bg-secondary/40 text-muted-foreground"
              />
            </div>

            {/* Slug (Read-only) */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-foreground">Slug *</label>
              <Input
                placeholder="slug"
                {...register('slug')}
                readOnly
                className="bg-secondary/40 text-muted-foreground"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border/20 pt-4">
            {/* Sort Order */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-foreground">Sort Order</label>
              <Input
                type="number"
                {...register('sort_order', { valueAsNumber: true })}
              />
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-foreground">Status *</label>
              <Select
                options={[
                  { value: 'draft', label: 'Draft' },
                  { value: 'published', label: 'Published' },
                ]}
                {...register('status')}
              />
            </div>

            {/* Who is it for */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-foreground">Target Client Profile</label>
              <Input
                placeholder="SaaS founders, Professional firms..."
                {...register('who_it_is_for')}
              />
            </div>
          </div>

          {/* Short description */}
          <div className="space-y-1.5 border-t border-border/20 pt-4">
            <label className="text-xs font-mono font-bold text-foreground">Short Description</label>
            <Textarea
              placeholder="Provide a brief explanation of this service..."
              rows={3}
              {...register('short_description')}
            />
          </div>

          {/* What is Included (list) */}
          <div className="space-y-1.5 border-t border-border/20 pt-4">
            <label className="text-xs font-mono font-bold text-foreground block">System Inclusions (Comma separated list)</label>
            <Input
              placeholder="Analytics integration, Custom UI/UX, Speed performance score"
              onChange={(e) => {
                const arr = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                setValue('what_is_included', arr);
              }}
              defaultValue={editingService?.what_is_included?.join(', ') || ''}
            />
          </div>

          {/* Deliverables (list) */}
          <div className="space-y-1.5 border-t border-border/20 pt-4">
            <label className="text-xs font-mono font-bold text-foreground block">Core Deliverables (Comma separated list)</label>
            <Input
              placeholder="Production files, deployment pipelines, support documentation"
              onChange={(e) => {
                const arr = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                setValue('deliverables', arr);
              }}
              defaultValue={editingService?.deliverables?.join(', ') || ''}
            />
          </div>

          <Button
            type="submit"
            disabled={isSaving}
            className="w-full font-mono text-xs py-5 justify-center mt-6"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>SAVING SERVICE DATA...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>SAVE SERVICE RECORD</span>
              </>
            )}
          </Button>

        </form>
      )}

    </div>
  );
}
