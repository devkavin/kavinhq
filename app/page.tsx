import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { NoteCard, ProjectCard, ServiceCard } from "@/components/cards";
import { Button } from "@/components/ui/button";
import { getNotes, getProjects, getServices } from "@/lib/data";

const process = [
  ["Discover", "Understand goals and constraints."],
  ["Plan", "Define the structure and scope."],
  ["Design", "Shape the interface and flow."],
  ["Build", "Develop the product carefully."],
  ["Launch", "Deploy, test, and hand over."],
  ["Improve", "Refine from real usage."]
];

export default async function Home() {
  const [allProjects, allServices, allNotes] = await Promise.all([getProjects(), getServices(), getNotes()]);
  const featuredProjects = allProjects.filter((project) => project.featured).slice(0, 3);

  return (
    <>
      <section className="shell grid min-h-[calc(100vh-64px)] items-center gap-12 py-16 md:grid-cols-[1.04fr_.96fr]">
        <div>
          <p className="eyebrow">Software engineer & systems builder</p>
          <h1 className="mt-8 max-w-3xl text-balance text-5xl font-semibold leading-[1.02] tracking-tight text-white md:text-7xl">
            I build clean, reliable websites and web systems.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">
            Kavin HQ is where I showcase my work, write about what I’m building, and help businesses turn rough ideas into practical digital products.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/work">View Work</Button>
            <Button href="/contact" variant="ghost">
              Request a Quote <ArrowRight className="ml-2" size={16} />
            </Button>
          </div>
        </div>
        <div className="soft-panel relative overflow-hidden rounded-lg p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_0%,rgba(56,189,248,.16),transparent_20rem)]" />
          <div className="relative rounded-md border border-slate-700/70 bg-slate-950/60 p-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="text-sm font-medium text-white">Project preview</span>
              <span className="text-xs text-slate-500">2026</span>
            </div>
            <div className="relative mt-5 aspect-[1.35] overflow-hidden rounded-md border border-slate-800">
              <Image alt="" className="object-cover" fill priority src="/images/project-real-estate.svg" />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {["Clear structure", "Responsive build", "Admin-ready", "Deployable"].map((item) => (
                <div className="flex items-center gap-2 text-sm text-slate-300" key={item}>
                  <Check className="text-sky-400" size={15} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-slate-800/70">
        <div className="shell">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Selected Work</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Recent practical builds</h2>
            </div>
            <Link className="hidden items-center gap-2 text-sm text-sky-300 sm:flex" href="/work">
              View all projects <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-slate-800/70">
        <div className="shell">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Services</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Ways I can help</h2>
            </div>
            <Link className="hidden items-center gap-2 text-sm text-sky-300 sm:flex" href="/services">
              View all services <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-5">
            {allServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-slate-800/70">
        <div className="shell">
          <p className="eyebrow">How I Work</p>
          <div className="mt-8 grid gap-4 md:grid-cols-6">
            {process.map(([title, text], index) => (
              <div className="relative rounded-lg border border-slate-800/80 bg-slate-900/20 p-5" key={title}>
                <span className="text-sm text-sky-400">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-7 text-sm font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-slate-800/70">
        <div className="shell">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Notes</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Writing from the work</h2>
            </div>
            <Link className="hidden items-center gap-2 text-sm text-sky-300 sm:flex" href="/notes">
              View all notes <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {allNotes.slice(0, 3).map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-slate-800/70">
        <div className="shell">
          <div className="soft-panel flex flex-col items-start justify-between gap-8 rounded-lg p-8 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white">Have a website, system, or product idea?</h2>
              <p className="mt-3 text-slate-400">Send me the rough idea. I’ll help shape it into something buildable.</p>
            </div>
            <Button href="/contact">Start a Project <ArrowRight className="ml-2" size={16} /></Button>
          </div>
        </div>
      </section>
    </>
  );
}
