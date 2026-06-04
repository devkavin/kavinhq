import * as React from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getFeaturedProjects } from '@/actions/projects';
import { getLatestNotes } from '@/actions/notes';
import { getPublishedServices } from '@/actions/services';
import { HeroTypewriterText } from '@/components/public/hero-typewriter-text';
import { TechSphereCanvas } from '@/components/public/tech-sphere-canvas';

const CREDIBILITY_CHIPS = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Laravel',
  'ASP.NET Core',
  'PostgreSQL',
  'SQL Server',
  'Supabase',
  'Docker',
];

const HERO_PROOF_POINTS = ['Business websites', 'Internal dashboards', 'Client portals'];

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
    <div className="relative w-full overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden border-b border-white/[0.06] py-12 lg:py-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(45,212,191,0.18),transparent_34%),radial-gradient(circle_at_15%_20%,rgba(245,158,11,0.08),transparent_28%)]" />
        <div className="absolute inset-0 grid-bg opacity-35" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

        <div className="relative z-10 grid w-full items-center gap-6 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(460px,1.05fr)] lg:px-12 xl:px-16 2xl:px-24">
          <div className="max-w-3xl py-10 lg:py-16">
            <div className="mb-7 inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-[0_1px_0_rgba(255,255,255,0.04)_inset]">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>Websites, dashboards, and custom tools</span>
            </div>

            <h1 className="mb-6 text-5xl font-semibold leading-[0.98] tracking-normal text-foreground sm:text-6xl lg:text-7xl">
              I build <HeroTypewriterText /> that are easy to use and easy to manage.
            </h1>

            <p className="mb-8 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              If you need a new business website, an admin dashboard, or a custom workflow tool, I can help plan it, build it, and get it online.
            </p>

            <div className="mb-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/work">
                <Button size="lg" className="w-full px-6 font-semibold sm:w-auto">
                  View work
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full border-white/[0.12] bg-white/[0.02] px-6 sm:w-auto">
                  Request a quote
                </Button>
              </Link>
            </div>

            <div className="grid max-w-2xl gap-3 border-y border-white/[0.07] py-5 text-sm text-muted-foreground sm:grid-cols-3">
              {HERO_PROOF_POINTS.map((point) => (
                <div key={point} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 max-w-3xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Core stack
              </p>
              <div className="flex flex-wrap gap-2">
                {CREDIBILITY_CHIPS.map((chip) => (
                  <span key={chip} className="border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative -mx-8 min-h-[320px] sm:-mx-10 lg:mx-0 lg:min-h-[calc(100vh-4rem)]">
            <div className="absolute inset-y-16 left-0 hidden w-px bg-gradient-to-b from-transparent via-white/10 to-transparent lg:block" />
            <TechSphereCanvas />
          </div>
        </div>

        <Link
          href="#selected-work"
          aria-label="Scroll down to selected work"
          className="absolute bottom-5 left-1/2 z-20 inline-flex -translate-x-1/2 items-center gap-2 border border-white/[0.10] bg-background/70 px-4 py-2 text-xs font-medium text-muted-foreground shadow-2xl shadow-black/25 backdrop-blur-md transition-colors hover:border-primary/40 hover:text-foreground"
        >
          <span>Scroll down</span>
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        </Link>
      </section>

      {/* 2. FEATURED PROJECTS SECTION */}
      <section id="selected-work" className="relative scroll-mt-20 border-b border-white/[0.06] py-24">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12 xl:px-16">
          
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-primary">Selected work</p>
              <h2 className="max-w-2xl text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">Systems built to look sharp and hold up in real use.</h2>
            </div>
            <Link href="/work" className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-foreground">
              <span>Explore all work</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-8">
            {featuredProjects.length > 0 ? (
              featuredProjects.map((project) => (
                <Link key={project.id} href={`/work/${project.slug}`} className="group block">
                  <Card className="relative h-full overflow-hidden border-white/[0.08] bg-white/[0.025] transition-transform duration-300 hover:-translate-y-1">
                    <div className="relative flex h-64 w-full items-center justify-center overflow-hidden border-b border-white/[0.06] bg-secondary/40">
                      {project.cover_image_url ? (
                        <div className="absolute inset-0 bg-cover bg-center opacity-85 transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${project.cover_image_url})` }} />
                      ) : (
                        <Code className="h-12 w-12 text-muted-foreground/30" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                      
                      <span className="absolute bottom-4 left-4 border border-white/[0.08] bg-background/75 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-primary backdrop-blur">
                        {project.category.toUpperCase()}
                      </span>
                    </div>
                    
                    <CardContent className="p-6 sm:p-7">
                      <div className="mb-3 flex items-start justify-between gap-4">
                        <h3 className="text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                          {project.title}
                        </h3>
                        <span className="text-xs font-mono text-muted-foreground">{project.year}</span>
                      </div>
                      <p className="mb-5 line-clamp-2 text-sm leading-6 text-muted-foreground">
                        {project.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.slice(0, 4).map((tech: string) => (
                          <span key={tech} className="border border-white/[0.07] bg-white/[0.03] px-2 py-1 text-[10px] text-muted-foreground">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-2 border border-dashed border-white/[0.12] py-12 text-center text-sm text-muted-foreground">
                No featured projects seeded. Run migration/seeds or add items via admin dashboard.
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 3. SERVICES PREVIEW SECTION */}
      <section className="relative border-b border-white/[0.06] bg-white/[0.02] py-24">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12 xl:px-16">
          
          <div className="mb-14 grid gap-6 lg:grid-cols-[0.75fr_1fr] lg:items-end">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-primary">Services</p>
              <h2 className="text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">Practical software help without agency theater.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground lg:justify-self-end">
              Focused development services for founders and teams who need the web presence, product surface, and operational tooling to feel dependable.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden border border-white/[0.07] bg-white/[0.07] md:grid-cols-2 lg:grid-cols-3">
            {activeServices.map((service, index) => (
              <div key={service.slug} className="relative bg-background/95 p-6 transition-colors hover:bg-card/80 sm:p-8">
                <div className="mb-8 text-xs font-medium text-muted-foreground">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="mb-3 text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="text-sm leading-7 text-muted-foreground">
                  {service.short_description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/services">
              <Button variant="outline" className="border-white/[0.12] bg-white/[0.02]">
                View services
              </Button>
            </Link>
          </div>

        </div>
      </section>

      {/* 4. PROCESS SECTION */}
      <section className="relative border-b border-white/[0.06] py-24">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12 xl:px-16">
          
          <div className="mb-14 max-w-3xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-primary">Process</p>
            <h2 className="text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">Clear enough to move fast. Structured enough to avoid surprises.</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="relative border-t border-white/[0.08] pt-5">
                <div className="mb-6 text-xs font-medium text-primary">
                  {step.step}
                </div>
                <h3 className="mb-3 text-base font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm leading-7 text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. LATEST NOTES SECTION */}
      <section className="relative border-b border-white/[0.06] bg-white/[0.02] py-24">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12 xl:px-16">
          
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-primary">Notes</p>
              <h2 className="text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">Recent writing and technical notes.</h2>
            </div>
            <Link href="/notes" className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-foreground">
              <span>View all notes</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {latestNotes.length > 0 ? (
              latestNotes.map((note) => (
                <Link key={note.id} href={`/notes/${note.slug}`} className="group block">
                  <Card className="h-full border-white/[0.08] bg-background/70 transition-transform duration-300 hover:-translate-y-1">
                    <CardContent className="flex h-full flex-col justify-between p-6">
                      <div>
                        <div className="mb-5 flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                          <span>{note.category.toUpperCase()}</span>
                          <span>{note.read_time ? `${note.read_time} MIN READ` : ''}</span>
                        </div>
                        <h3 className="mb-3 line-clamp-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                          {note.title}
                        </h3>
                        <p className="mb-5 line-clamp-3 text-sm leading-7 text-muted-foreground">
                          {note.excerpt}
                        </p>
                      </div>
                      <span className="mt-auto flex items-center gap-2 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        Read article
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-3 border border-dashed border-white/[0.12] py-12 text-center text-sm text-muted-foreground">
                No writing logs published yet. Visit the notes section soon.
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 dots-bg opacity-20" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative z-10 mx-auto grid max-w-[1500px] gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12 xl:px-16">
          <div>
          <h2 className="mb-4 max-w-3xl text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
            Have a website, system, or product idea?
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            Let&apos;s build software that simplifies workflows, improves performance, and boosts client trust. Initiate a project inquiry.
          </p>
          </div>
          <Link href="/contact">
            <Button size="lg" className="w-full px-7 sm:w-auto">
              Start a project
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
