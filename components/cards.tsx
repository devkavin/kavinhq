import Image from "next/image";
import Link from "next/link";
import type { Note, Project, Service } from "@/lib/types";
import { ArrowRight, Building2, LayoutDashboard, MessagesSquare, PanelTop, RefreshCw } from "lucide-react";

const icons = { PanelTop, Building2, LayoutDashboard, RefreshCw, MessagesSquare };

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link className="group block overflow-hidden rounded-lg border border-slate-800/90 bg-slate-900/35 transition hover:border-sky-300/35" href={`/work/${project.slug}`}>
      <div className="relative aspect-[1.52] overflow-hidden bg-slate-900">
        <Image
          alt=""
          className="object-cover transition duration-500 group-hover:scale-[1.035]"
          fill
          sizes="(min-width: 900px) 33vw, 100vw"
          src={project.image}
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-base font-semibold text-white">{project.title}</h3>
          <span className="text-xs text-slate-500">{project.year}</span>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-400">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.slice(0, 3).map((tag) => (
            <span className="rounded-md border border-slate-800 px-2.5 py-1 text-xs text-slate-400" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.icon as keyof typeof icons] ?? PanelTop;
  return (
    <Link className="group rounded-lg border border-slate-800/80 bg-slate-900/25 p-6 transition hover:border-sky-300/35" href="/services">
      <Icon className="text-sky-400" size={24} strokeWidth={1.8} />
      <h3 className="mt-5 text-base font-semibold text-white">{service.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-400">{service.description}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm text-slate-300 transition group-hover:text-sky-300">
        View service <ArrowRight size={14} />
      </span>
    </Link>
  );
}

export function NoteCard({ note }: { note: Note }) {
  return (
    <Link className="group block overflow-hidden rounded-lg border border-slate-800/90 bg-slate-900/35 transition hover:border-sky-300/35" href={`/notes/${note.slug}`}>
      <div className="relative aspect-[1.65] overflow-hidden bg-slate-900">
        <Image
          alt=""
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          fill
          sizes="(min-width: 900px) 33vw, 100vw"
          src={note.image}
        />
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
          {new Date(note.date).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })} · {note.readTime}
        </p>
        <h3 className="mt-3 text-base font-semibold leading-6 text-white">{note.title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-400">{note.excerpt}</p>
      </div>
    </Link>
  );
}
