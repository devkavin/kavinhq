import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, GitBranch, Cpu, Award, Zap, HelpCircle } from 'lucide-react';
import { getProjectBySlug, getPublishedProjects } from '@/actions/projects';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug).catch(() => null);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} Case Study`,
    description: project.excerpt || `Technical breakdown of ${project.title}.`,
    openGraph: {
      title: `${project.title} Case Study | Kavin HQ`,
      description: project.excerpt || `Technical breakdown of ${project.title}.`,
      type: 'article',
      images: project.cover_image_url ? [project.cover_image_url] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug).catch(() => null);

  if (!project) {
    notFound();
  }

  // Fetch related projects (same category or others, excluding current)
  const allProjects = await getPublishedProjects().catch(() => []);
  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id)
    .slice(0, 2);

  return (
    <div className="py-12 relative">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-20" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back Link */}
        <Link
          href="/work"
          className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>&lt; BACK TO CASE REGISTER</span>
        </Link>

        {/* Hero Header */}
        <div className="border-b border-border/40 pb-8 mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-primary mb-3">
            <span>[ SYSTEM: {project.category.toUpperCase()} ]</span>
            <span>//</span>
            <span>YEAR: {project.year}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-4xl leading-relaxed">
            {project.excerpt}
          </p>
        </div>

        {/* Rich Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Main Case Content (Columns 1 & 2) */}
          <div className="lg:col-span-2 space-y-12 font-sans">
            
            {/* Cover Banner */}
            {project.cover_image_url && (
              <div
                className="w-full h-64 sm:h-96 rounded-lg border border-border/40 bg-cover bg-center overflow-hidden"
                style={{ backgroundImage: `url(${project.cover_image_url})` }}
              />
            )}

            {/* Problem & Goal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-rose-500" />
                  <span>The Problem</span>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {project.problem || 'Not specified.'}
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>The Goal</span>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {project.goal || 'Not specified.'}
                </p>
              </div>
            </div>

            {/* Key Features (JSONB list) */}
            {project.key_features && Array.isArray(project.key_features) && project.key_features.length > 0 && (
              <div className="space-y-4 border-t border-border/20 pt-8">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Key Features Built</span>
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                  {project.key_features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 bg-secondary/30 border border-border/40 p-3 rounded">
                      <span className="text-primary font-bold">[{idx + 1}]</span>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Architecture Flow */}
            {project.architecture_flow && (
              <div className="space-y-3 border-t border-border/20 pt-8">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-primary" />
                  <span>System Architecture / Flow</span>
                </h3>
                <div className="bg-secondary/40 border border-border/40 p-4 rounded font-mono text-xs text-muted-foreground whitespace-pre-wrap">
                  {project.architecture_flow}
                </div>
              </div>
            )}

            {/* Challenges */}
            {project.challenges && (
              <div className="space-y-3 border-t border-border/20 pt-8">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-violet-400" />
                  <span>Engineering Challenges</span>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {project.challenges}
                </p>
              </div>
            )}

            {/* Outcomes & Learnings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border/20 pt-8">
              <div className="space-y-3">
                <h4 className="font-bold text-foreground text-base uppercase font-mono">// Outcomes & Results</h4>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {project.outcome || 'Not specified.'}
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-foreground text-base uppercase font-mono">// Key Takeaways</h4>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {project.what_i_learned || 'Not specified.'}
                </p>
              </div>
            </div>

            {/* Screenshots Gallery */}
            {project.gallery_images && Array.isArray(project.gallery_images) && project.gallery_images.length > 0 && (
              <div className="space-y-4 border-t border-border/20 pt-8">
                <h3 className="text-lg font-bold text-foreground font-mono text-sm uppercase tracking-widest">// System Snapshots</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery_images.map((img: string, idx: number) => (
                    <div
                      key={idx}
                      className="w-full h-48 rounded border border-border/40 bg-cover bg-center overflow-hidden"
                      style={{ backgroundImage: `url(${img})` }}
                    />
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sticky Summary Sidebar (Column 3) */}
          <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-6">
            <Card className="border-border/40 bg-card/60 font-mono text-xs text-muted-foreground glass-panel">
              <CardContent className="p-6 space-y-6">
                
                <h3 className="font-bold text-sm text-foreground border-b border-border/40 pb-2">
                  SYSTEM PARAMETERS
                </h3>

                <div className="space-y-4">
                  <div>
                    <span className="block text-[10px] uppercase text-muted-foreground mb-1">Role / Duty</span>
                    <span className="text-foreground font-semibold">{project.role || 'Lead Engineer'}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-muted-foreground mb-1">Focus Core</span>
                    <span className="text-foreground font-semibold">{project.focus || 'Development'}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-muted-foreground mb-1">Temporal Year</span>
                    <span className="text-foreground font-semibold">{project.year}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-muted-foreground mb-1">Database / Stack Integration</span>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {project.stack.map((tech) => (
                        <span key={tech} className="text-[10px] bg-secondary border border-border/40 px-1.5 py-0.5 rounded text-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                {(project.live_url || project.github_url) && (
                  <div className="pt-4 border-t border-border/20 flex flex-col gap-2">
                    {project.live_url && (
                      <Link href={project.live_url} target="_blank" rel="noreferrer">
                        <Button className="w-full text-xs font-mono justify-center gap-1.5 h-9">
                          <span>LAUNCH APP</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    )}
                    {project.github_url && (
                      <Link href={project.github_url} target="_blank" rel="noreferrer">
                        <Button variant="outline" className="w-full text-xs font-mono justify-center gap-1.5 h-9">
                          <span>VIEW SOURCE</span>
                          <GitBranch className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    )}
                  </div>
                )}

              </CardContent>
            </Card>

            {/* Quick Consultation Promo */}
            <Card className="border-primary/20 bg-primary/5 font-mono text-xs text-muted-foreground">
              <CardContent className="p-6 space-y-4">
                <p className="text-foreground font-bold">
                  Need a similar system built?
                </p>
                <p className="text-[11px] leading-relaxed">
                  We build highly customized applications, database structures, and dashboards based on business requirements. Let&apos;s consult.
                </p>
                <Link href="/contact?type=quote" className="block">
                  <Button variant="outline" className="w-full text-xs font-mono justify-center h-8 hover:bg-primary hover:text-primary-foreground">
                    INITIATE QUOTE
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

        </div>

        {/* Related Projects Section */}
        {relatedProjects.length > 0 && (
          <div className="mt-20 border-t border-border/20 pt-12">
            <h3 className="text-xl font-bold text-foreground mb-8 font-mono text-sm uppercase tracking-widest">
              // Related case logs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((p) => (
                <Link key={p.id} href={`/work/${p.slug}`} className="group block">
                  <Card className="border-border/30 bg-card/40">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-mono text-primary uppercase">{p.category}</span>
                        <span className="text-xs font-mono text-muted-foreground">{p.year}</span>
                      </div>
                      <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {p.title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-2 leading-relaxed">
                        {p.excerpt}
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
