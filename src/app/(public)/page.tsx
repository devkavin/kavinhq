import Link from "next/link";
import { ArrowRight, RadioTower } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { HqStatus } from "@/components/public/hq-status";
import { NoteCard } from "@/components/public/note-card";
import { ProjectCard } from "@/components/public/project-card";
import { Section, SectionHeading } from "@/components/public/section";
import { getPublishedNotes, getPublishedProjects, getPublishedServices } from "@/lib/data/public";
import { processSteps, stackChips } from "@/lib/constants/site";

export default async function HomePage() {
  const [projects, services, notes] = await Promise.all([
    getPublishedProjects({ featured: true, limit: 3 }),
    getPublishedServices(),
    getPublishedNotes({ limit: 3 })
  ]);

  return (
    <>
      <section className="hq-grid relative overflow-hidden">
        <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <div>
            <Badge variant="violet" className="mb-6">Mission Control for Digital Systems</Badge>
            <h1 className="max-w-5xl font-[var(--font-space)] text-4xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
              I build clean, reliable digital systems for businesses, teams, and real-world workflows.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Kavin HQ is the home base for my software work, case studies, technical notes, and business-focused web solutions.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg"><Link href="/work">View My Work <ArrowRight className="size-4" /></Link></Button>
              <Button asChild size="lg" variant="secondary"><Link href="/contact">Request a Quote</Link></Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-2">
              {stackChips.map((chip) => <Badge key={chip} variant="secondary">{chip}</Badge>)}
            </div>
          </div>
          <div className="grid gap-5">
            <HqStatus />
            <Card className="p-5">
              <div className="flex items-center gap-3">
                <RadioTower className="size-5 text-sky-300" />
                <p className="text-sm font-medium text-slate-100">Operational signal</p>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                {["Plan", "Build", "Deploy"].map((item) => (
                  <div key={item} className="rounded-md border border-slate-800 bg-slate-950/50 p-3 text-xs uppercase tracking-[0.16em] text-slate-400">
                    {item}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="Featured Work" title="Case studies with business context and engineering discipline." />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {projects.length ? projects.map((project) => <ProjectCard key={project.id} project={project} />) : <Empty label="Featured projects will appear here once published." />}
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="Services" title="Focused delivery for websites, dashboards, and practical systems." />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {services.map((service) => (
            <Card key={service.id} className="p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-sky-300">{String(service.sort_order).padStart(2, "0")}</p>
              <h3 className="mt-4 font-[var(--font-space)] text-lg font-semibold text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{service.short_description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="Process" title="A clear path from rough idea to working software." />
        <div className="mt-10 grid gap-3 md:grid-cols-7">
          {processSteps.map((step, index) => (
            <div key={step} className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs text-slate-500">{String(index + 1).padStart(2, "0")}</p>
              <p className="mt-3 font-medium text-slate-100">{step}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="Latest Notes" title="Technical notes from the workbench." />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {notes.length ? notes.map((note) => <NoteCard key={note.id} note={note} />) : <Empty label="Notes will appear here once published." />}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="glass rounded-lg p-8 md:p-12">
          <h2 className="font-[var(--font-space)] text-3xl font-semibold text-white">Have a website, system, or product idea?</h2>
          <Button asChild size="lg" className="mt-6"><Link href="/contact">Start a Project</Link></Button>
        </div>
      </Section>
    </>
  );
}

function Empty({ label }: { label: string }) {
  return <Card className="col-span-full p-8 text-center text-slate-400">{label}</Card>;
}
