import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Code, Database, Server, Cpu, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getFeaturedProjects } from '@/actions/projects';
import { getLatestNotes } from '@/actions/notes';
import { getPublishedServices } from '@/actions/services';

const CREDIBILITY_CHIPS = [
  { name: 'Laravel', type: 'backend' },
  { name: 'ASP.NET Core', type: 'backend' },
  { name: 'React', type: 'frontend' },
  { name: 'Next.js', type: 'frontend' },
  { name: 'PostgreSQL', type: 'database' },
  { name: 'SQL Server', type: 'database' },
  { name: 'Docker', type: 'devops' },
  { name: 'Vercel', type: 'devops' },
  { name: 'Supabase', type: 'backend' },
];

const PROCESS_STEPS = [
  { step: '01', title: 'Talk', desc: 'We discuss what you need, who it is for, your timeline, and the best way to move forward.' },
  { step: '02', title: 'Build', desc: 'I design and develop the website or app, then share progress so you can review it along the way.' },
  { step: '03', title: 'Launch', desc: 'I test the important pages and forms, publish the project, and connect the domain.' },
  { step: '04', title: 'Support', desc: 'After launch, I help with fixes, small updates, and improvements as your needs change.' },
];

export default async function HomePage() {
  // Fetch dynamic content from server actions (with grace fallbacks)
  const featuredProjects = await getFeaturedProjects().catch(() => []);
  const latestNotes = await getLatestNotes(3).catch(() => []);
  const services = await getPublishedServices().catch(() => []);

  // Static fallback if database has not been seeded yet for services
  const activeServices = services.length > 0 ? services : [
    { title: 'Landing Page Development', slug: 'landing-page-development', short_description: 'High-converting, performance-optimized, and premium single-page layouts designed to turn traffic into pipeline.' },
    { title: 'Business Website Development', slug: 'business-website-development', short_description: 'Executive multi-page web presence detailing your team, mission, products, and insights, built for high trust.' },
    { title: 'Web App / Dashboard Development', slug: 'web-app-dashboard-development', short_description: 'Tailored web applications, internal tools, customer portals, and real-time interactive business dashboards.' },
    { title: 'Website Redesign', slug: 'website-redesign', short_description: 'Migrate legacy systems, modernize stale visual styles, optimize page load speed, and rebuild with cutting-edge tech.' },
    { title: 'Technical Consultation', slug: 'technical-consultation', short_description: 'Direct guidance on product architecture, technology stack decisions, database performance, and deployment systems.' }
  ];

  return (
    <div className="relative w-full">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex flex-col justify-center py-20 border-b border-border/40 overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />
        {/* Radial Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-4xl text-left font-sans">
            
            {/* System Status Mark */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-mono text-primary mb-6 glow-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span>SYSTEM ACTIVE // PORTFOLIO ONLINE</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1] mb-6">
              I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-400">clean, reliable digital systems</span> for businesses, teams, and workflows.
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              Kavin HQ is the home base for my software engineering work, case studies, technical notes, and business-focused web solutions.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/work">
                <Button size="lg" className="font-mono">
                  VIEW MY WORK &gt;
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="font-mono">
                  REQUEST A QUOTE
                </Button>
              </Link>
            </div>

            {/* Quick Stack */}
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
                // System Stack Core Integrations
              </p>
              <div className="flex flex-wrap gap-2 max-w-3xl">
                {CREDIBILITY_CHIPS.map((chip) => (
                  <span
                    key={chip.name}
                    className="inline-flex items-center rounded bg-secondary/80 border border-border/40 px-2.5 py-1 text-xs font-mono text-foreground hover:border-primary/30 transition-colors"
                  >
                    {chip.name}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FEATURED PROJECTS SECTION */}
      <section className="py-20 border-b border-border/40 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">// Featured Deliverables</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Recent Systems Built</h2>
            </div>
            <Link href="/work" className="mt-4 md:mt-0 text-sm font-mono text-primary hover:underline inline-flex items-center gap-1">
              <span>EXPLORE ALL WORK</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.length > 0 ? (
              featuredProjects.map((project) => (
                <Link key={project.id} href={`/work/${project.slug}`} className="group block">
                  <Card className="h-full overflow-hidden border-border/40 relative">
                    {/* Scanner line visual overlay */}
                    <div className="scanner-line opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="h-48 w-full bg-secondary/60 relative flex items-center justify-center border-b border-border/20 overflow-hidden">
                      {project.cover_image_url ? (
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-80" style={{ backgroundImage: `url(${project.cover_image_url})` }} />
                      ) : (
                        <Code className="h-12 w-12 text-muted-foreground/30" />
                      )}
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                      
                      <span className="absolute bottom-3 left-4 text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
                        {project.category.toUpperCase()}
                      </span>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <span className="text-xs font-mono text-muted-foreground">{project.year}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {project.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.slice(0, 4).map((tech: string) => (
                          <span key={tech} className="text-[10px] font-mono text-muted-foreground border border-border/40 px-1.5 py-0.5 rounded bg-background/20">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 border border-dashed border-border/40 rounded-lg font-mono text-sm text-muted-foreground">
                No featured projects seeded. Run migration/seeds or add items via admin dashboard.
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 3. SERVICES PREVIEW SECTION */}
      <section className="py-20 border-b border-border/40 bg-secondary/10 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">// Expertises Offered</p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">Software Services & Capabilities</h2>
            <p className="text-muted-foreground text-sm">
              Tailored development services aimed at streamlining operations, improving web visibility, and modernizing tech systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeServices.map((service, index) => (
              <Card key={service.slug} className="border-border/30 bg-card/60 relative">
                <div className="absolute top-4 right-4 text-xs font-mono text-muted-foreground/30 font-black">
                  0{index + 1}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.short_description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/services">
              <Button variant="outline" className="font-mono">
                VIEW SERVICE SPECS &gt;
              </Button>
            </Link>
          </div>

        </div>
      </section>

      {/* 4. PROCESS SECTION */}
      <section className="py-20 border-b border-border/40 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-16">
            <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">// How Projects Work</p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">A Simple Delivery Process</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="flex flex-col border-l border-border/40 pl-4 relative">
                <div className="text-xs font-mono text-primary font-black mb-1">
                  [{step.step}]
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. LATEST NOTES SECTION */}
      <section className="py-20 border-b border-border/40 bg-secondary/10 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">// Technical Logs</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Recent Writing & Guides</h2>
            </div>
            <Link href="/notes" className="mt-4 md:mt-0 text-sm font-mono text-primary hover:underline inline-flex items-center gap-1">
              <span>VIEW ALL NOTES</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNotes.length > 0 ? (
              latestNotes.map((note) => (
                <Link key={note.id} href={`/notes/${note.slug}`} className="group block">
                  <Card className="h-full border-border/30 bg-card/60">
                    <CardContent className="p-6 flex flex-col h-full justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground mb-3">
                          <span>{note.category.toUpperCase()}</span>
                          <span>{note.read_time ? `${note.read_time} MIN READ` : ''}</span>
                        </div>
                        <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                          {note.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-3 mb-4">
                          {note.excerpt}
                        </p>
                      </div>
                      <span className="text-[10px] font-mono text-primary mt-auto flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        READ ARTICLE &gt;
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 border border-dashed border-border/40 rounded-lg font-mono text-sm text-muted-foreground">
                No writing logs published yet. Visit the notes section soon.
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 dots-bg pointer-events-none opacity-20" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center font-sans">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Have a website, system, or product idea?
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Let&apos;s build software that simplifies workflows, improves performance, and boosts client trust. Initiate a project inquiry.
          </p>
          <Link href="/contact">
            <Button size="lg" className="font-mono">
              START A PROJECT
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
