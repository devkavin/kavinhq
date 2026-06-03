'use client';

import * as React from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, Eye, Tag, Calendar, User, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

interface Project {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string;
  year: string | null;
  role: string | null;
  focus: string | null;
  status: string;
  featured: boolean;
  stack: string[];
  cover_image_url?: string | null;
}

export function WorkGrid({ initialProjects }: { initialProjects: Project[] }) {
  const [search, setSearch] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('ALL');
  const [hoveredProjectId, setHoveredProjectId] = React.useState<string | null>(null);

  // Extract unique categories
  const categories = React.useMemo(() => {
    const cats = new Set(initialProjects.map((p) => p.category));
    return ['ALL', ...Array.from(cats)];
  }, [initialProjects]);

  // Filter project lists
  const filteredProjects = React.useMemo(() => {
    return initialProjects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.stack.some((tech) => tech.toLowerCase().includes(search.toLowerCase()));
      
      const matchesCategory =
        selectedCategory === 'ALL' || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [initialProjects, search, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Header controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-secondary/20 p-4 border border-border/40 rounded-lg font-mono text-sm">
        
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="SEARCH BY TITLE OR STACK..."
            className="pl-9 bg-background/50 uppercase text-xs"
          />
        </div>

        {/* Categories filters */}
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
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const isHovered = hoveredProjectId === project.id;
            return (
              <Link
                key={project.id}
                href={`/work/${project.slug}`}
                className="group block relative"
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
              >
                <Card className="h-full overflow-hidden border-border/40 relative">
                  
                  {/* Visual Scanner Overlay */}
                  <div className="scanner-line opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Project Banner cover */}
                  <div className="h-56 w-full bg-secondary/60 relative flex items-center justify-center border-b border-border/20 overflow-hidden">
                    {project.cover_image_url ? (
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-80"
                        style={{ backgroundImage: `url(${project.cover_image_url})` }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40">
                        <span className="text-[10px] font-mono text-muted-foreground/30">// NO COVER ATTACHED</span>
                      </div>
                    )}
                    
                    {/* Gradient shading */}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    
                    {/* Category Label */}
                    <span className="absolute bottom-3 left-4 text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded uppercase">
                      {project.category}
                    </span>

                    {/* Featured Badge */}
                    {project.featured && (
                      <span className="absolute top-3 right-4 text-[9px] font-mono text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded uppercase font-bold">
                        FEATURED SYSTEM
                      </span>
                    )}

                    {/* Mission-Control Scanner Overlay on Hover */}
                    <div className={cn(
                      'absolute inset-0 bg-slate-950/95 flex flex-col justify-center p-6 font-mono text-xs text-muted-foreground border-b border-border/40 transition-opacity duration-300 ease-in-out pointer-events-none',
                      isHovered ? 'opacity-100' : 'opacity-0'
                    )}>
                      <div className="text-primary font-bold text-sm mb-4 border-b border-primary/20 pb-1.5 flex items-center gap-1.5">
                        <Eye className="h-4 w-4 animate-pulse" />
                        <span>HQ PROJECT SCANNER ACTIVE</span>
                      </div>
                      <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 max-w-sm">
                        <div className="flex items-center gap-1.5">
                          <Tag className="h-3.5 w-3.5 text-primary" />
                          <span>TYPE:</span>
                        </div>
                        <span className="text-foreground font-semibold">{project.category.toUpperCase()}</span>

                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-primary" />
                          <span>YEAR:</span>
                        </div>
                        <span className="text-foreground font-semibold">{project.year || 'N/A'}</span>

                        <div className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-primary" />
                          <span>ROLE:</span>
                        </div>
                        <span className="text-foreground font-semibold line-clamp-1">{(project.role || 'Lead Engineer').toUpperCase()}</span>

                        <div className="flex items-center gap-1.5">
                          <Target className="h-3.5 w-3.5 text-primary" />
                          <span>FOCUS:</span>
                        </div>
                        <span className="text-foreground font-semibold line-clamp-1">{(project.focus || 'Development').toUpperCase()}</span>
                      </div>
                      <div className="mt-4 text-[10px] text-primary/70 animate-pulse uppercase">
                        &gt; CLICK TO VIEW SYSTEM DOCUMENTATION &gt;&gt;
                      </div>
                    </div>
                  </div>

                  {/* Text Details */}
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                      {project.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono text-muted-foreground border border-border/40 px-1.5 py-0.5 rounded bg-background/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>

                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-border/40 rounded-lg font-mono text-sm text-muted-foreground">
          No projects found matching the query.
        </div>
      )}
    </div>
  );
}
