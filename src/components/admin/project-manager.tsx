'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FolderGit2, Plus, Edit3, Trash2, Save, X, Search, Check, AlertTriangle, Eye, Loader2 } from 'lucide-react';
import { projectSchema, type ProjectInput } from '@/lib/validations/schemas';
import { createProject, updateProject, deleteProject } from '@/actions/projects';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/toast';

interface Project {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  summary: string;
  category: string;
  year: string;
  role: string;
  focus: string;
  status: string;
  featured: boolean;
  stack: string[];
  cover_image_url?: string;
  gallery_images: any;
  problem: string;
  goal: string;
  my_role: string;
  tech_stack: string;
  key_features: any;
  architecture_flow: string;
  challenges: string;
  outcome: string;
  what_i_learned: string;
  live_url?: string;
  github_url?: string;
  sort_order: number;
}

export function ProjectManager({ initialProjects }: { initialProjects: Project[] }) {
  const { toast } = useToast();
  const [projects, setProjects] = React.useState<Project[]>(initialProjects);
  const [search, setSearch] = React.useState('');
  
  // Navigation states: 'list' | 'create' | 'edit'
  const [view, setView] = React.useState<'list' | 'create' | 'edit'>('list');
  const [editingProject, setEditingProject] = React.useState<Project | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

  // Filter projects by search
  const filteredProjects = React.useMemo(() => {
    return projects.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [projects, search]);

  // Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
  });

  const startCreate = () => {
    reset({
      title: '',
      slug: '',
      excerpt: '',
      summary: '',
      category: 'Web App / Dashboard Development',
      year: new Date().getFullYear().toString(),
      role: 'Lead Systems Engineer',
      focus: 'Architectural Scaling',
      status: 'draft',
      featured: false,
      stack: [],
      cover_image_url: '',
      gallery_images: [],
      problem: '',
      goal: '',
      my_role: '',
      tech_stack: '',
      key_features: [],
      architecture_flow: '',
      challenges: '',
      outcome: '',
      what_i_learned: '',
      live_url: '',
      github_url: '',
      sort_order: 0,
    });
    setView('create');
  };

  const startEdit = (p: Project) => {
    setEditingProject(p);
    reset({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt || '',
      summary: p.summary || '',
      category: p.category,
      year: p.year || '',
      role: p.role || '',
      focus: p.focus || '',
      status: p.status as any,
      featured: p.featured,
      stack: p.stack || [],
      cover_image_url: p.cover_image_url || '',
      gallery_images: Array.isArray(p.gallery_images) ? p.gallery_images : [],
      problem: p.problem || '',
      goal: p.goal || '',
      my_role: p.my_role || '',
      tech_stack: p.tech_stack || '',
      key_features: Array.isArray(p.key_features) ? p.key_features : [],
      architecture_flow: p.architecture_flow || '',
      challenges: p.challenges || '',
      outcome: p.outcome || '',
      what_i_learned: p.what_i_learned || '',
      live_url: p.live_url || '',
      github_url: p.github_url || '',
      sort_order: p.sort_order || 0,
    });
    setView('edit');
  };

  const onFormSubmit = async (data: ProjectInput) => {
    setIsSaving(true);
    try {
      if (view === 'create') {
        const newProj = await createProject(data);
        setProjects((prev) => [newProj as any, ...prev]);
        toast({
          title: 'Project Created',
          message: `${data.title} was registered successfully.`,
          type: 'success',
        });
      } else if (view === 'edit' && editingProject) {
        const updatedProj = await updateProject(editingProject.id, data);
        setProjects((prev) =>
          prev.map((p) => (p.id === editingProject.id ? (updatedProj as any) : p))
        );
        toast({
          title: 'Project Updated',
          message: `${data.title} was updated successfully.`,
          type: 'success',
        });
      }
      setView('list');
    } catch (err: any) {
      toast({
        title: 'Error',
        message: err.message || 'An error occurred while saving the project.',
        type: 'error',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (p: Project) => {
    if (!confirm(`Are you sure you want to delete "${p.title}"? This cannot be undone.`)) return;

    try {
      await deleteProject(p.id, p.slug);
      setProjects((prev) => prev.filter((proj) => proj.id !== p.id));
      toast({
        title: 'Project Deleted',
        message: `${p.title} has been removed.`,
        type: 'success',
      });
    } catch (err: any) {
      toast({
        title: 'Delete Failed',
        message: err.message || 'Could not delete the project.',
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
                placeholder="SEARCH PROJECTS..."
                className="pl-9 bg-background/50 uppercase text-[10px]"
              />
            </div>
            <Button onClick={startCreate} className="w-full sm:w-auto h-9 text-[10px]">
              <Plus className="h-4 w-4 mr-1" />
              CREATE PROJECT &gt;
            </Button>
          </div>

          <div className="border border-border/40 bg-card rounded-lg overflow-hidden glass-panel">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-bold text-foreground">{p.title}</TableCell>
                      <TableCell className="text-muted-foreground">{p.category}</TableCell>
                      <TableCell>{p.year}</TableCell>
                      <TableCell>
                        <Badge variant={p.status === 'published' ? 'success' : 'outline'}>
                          {p.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {p.featured ? (
                          <span className="text-emerald-400 font-bold">[YES]</span>
                        ) : (
                          <span className="text-muted-foreground">[NO]</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => startEdit(p)} className="h-7 text-[10px]">
                            <Edit3 className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(p)}
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
                      No projects found.
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
              <FolderGit2 className="h-4 w-4 text-primary" />
              <span>{view === 'create' ? 'CREATE NEW PROJECT REGISTER' : 'EDIT PROJECT CONFIG'}</span>
            </h3>
            <Button type="button" variant="outline" size="sm" onClick={() => setView('list')} className="h-8 text-[10px] font-mono">
              <X className="h-3.5 w-3.5 mr-1" />
              CANCEL
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-foreground">Project Title *</label>
              <Input
                placeholder="Vanguard Dashboard Systems"
                {...register('title')}
                className={errors.title ? 'border-destructive' : ''}
              />
              {errors.title && <p className="text-[10px] text-destructive font-mono">{errors.title.message}</p>}
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-foreground">Slug (alphanumeric and hyphens only) *</label>
              <Input
                placeholder="vanguard-dashboard-systems"
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
                placeholder="Web App / Dashboard Development"
                {...register('category')}
              />
            </div>

            {/* Year */}
            <div className="space-y-1.5 col-span-1">
              <label className="text-xs font-mono font-bold text-foreground">Year</label>
              <Input
                placeholder="2026"
                {...register('year')}
              />
            </div>

            {/* Sort Order */}
            <div className="space-y-1.5 col-span-1">
              <label className="text-xs font-mono font-bold text-foreground">Sort Order</label>
              <Input
                type="number"
                placeholder="0"
                {...register('sort_order', { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Role */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-foreground">Lead Role</label>
              <Input
                placeholder="Lead Systems Engineer"
                {...register('role')}
              />
            </div>

            {/* Focus */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-foreground">Focus Target</label>
              <Input
                placeholder="Real-time Telemetry Scaling"
                {...register('focus')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border/20 pt-4">
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

            {/* Featured */}
            <div className="space-y-1.5 flex flex-col justify-center">
              <label className="text-xs font-mono font-bold text-foreground mb-2">Featured Project</label>
              <div className="flex items-center gap-2 h-10">
                <input
                  type="checkbox"
                  id="featured"
                  className="h-4 w-4 rounded border-input bg-secondary focus:ring-1 focus:ring-primary accent-primary"
                  {...register('featured')}
                />
                <label htmlFor="featured" className="text-xs text-muted-foreground font-mono">FEATURE ON HOME</label>
              </div>
            </div>

            {/* Cover Image URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-foreground">Cover Image URL</label>
              <Input
                placeholder="/images/placeholders/vanguard.webp"
                {...register('cover_image_url')}
              />
            </div>
          </div>

          {/* Stack Tags */}
          <div className="space-y-1.5 border-t border-border/20 pt-4">
            <label className="text-xs font-mono font-bold text-foreground block">Stack Integrations (Comma separated list)</label>
            <Input
              placeholder="Next.js, Tailwind CSS, PostgreSQL, Supabase"
              onChange={(e) => {
                const arr = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                setValue('stack', arr);
              }}
              defaultValue={editingProject?.stack?.join(', ') || ''}
            />
          </div>

          {/* Live & Source links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border/20 pt-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-foreground">Live App URL</label>
              <Input
                placeholder="https://app.vanguard.com"
                {...register('live_url')}
                className={errors.live_url ? 'border-destructive' : ''}
              />
              {errors.live_url && <p className="text-[10px] text-destructive font-mono">{errors.live_url.message}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-foreground">Github Source URL</label>
              <Input
                placeholder="https://github.com/kavinhq/vanguard"
                {...register('github_url')}
                className={errors.github_url ? 'border-destructive' : ''}
              />
              {errors.github_url && <p className="text-[10px] text-destructive font-mono">{errors.github_url.message}</p>}
            </div>
          </div>

          {/* Case Narrative text block */}
          <div className="space-y-4 border-t border-border/20 pt-4">
            <h4 className="font-mono text-xs font-bold text-foreground uppercase tracking-widest">// Case Narrative Contents</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-foreground">Excerpt (Short card copy)</label>
                <Textarea placeholder="A brief description of this project..." {...register('excerpt')} rows={3} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-foreground">Summary (Paragraph overview)</label>
                <Textarea placeholder="Detailed summary overview..." {...register('summary')} rows={3} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-foreground">The Problem Faced</label>
                <Textarea placeholder="Legacy code was causing latency..." {...register('problem')} rows={3} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-foreground">The Goal Targeted</label>
                <Textarea placeholder="Create sub-second loads and direct checkout..." {...register('goal')} rows={3} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-foreground">My Role / Duties</label>
                <Textarea placeholder="Configured database triggers..." {...register('my_role')} rows={3} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-foreground">Technical Stack Description</label>
                <Textarea placeholder="We chose Next.js for SSR caching..." {...register('tech_stack')} rows={3} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-foreground">Architecture details / Flow</label>
                <Textarea placeholder="MQTT Broker -> telemetry ingestion -> db copy..." {...register('architecture_flow')} rows={3} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-foreground">Engineering Challenges</label>
                <Textarea placeholder="Ingesting logs at scale without write-locks..." {...register('challenges')} rows={3} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-foreground">Outcome / Metrics achieved</label>
                <Textarea placeholder="Lighthouse page speeds reduced to 0.6s..." {...register('outcome')} rows={3} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-foreground">What I Learned</label>
                <Textarea placeholder="Balancing static regenerations is key..." {...register('what_i_learned')} rows={3} />
              </div>
            </div>
          </div>

          <div className="space-y-1.5 border-t border-border/20 pt-4">
            <label className="text-xs font-mono font-bold text-foreground block">Key Features List (Comma separated)</label>
            <Input
              placeholder="Real-timeSVG tracking, Stripe Payments, Batch DB insertion"
              onChange={(e) => {
                const arr = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                setValue('key_features', arr);
              }}
              defaultValue={editingProject?.key_features?.join(', ') || ''}
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
                <span>SAVING PROJECT DATA...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>SAVE PROJECT RECORD</span>
              </>
            )}
          </Button>

        </form>
      )}

    </div>
  );
}
