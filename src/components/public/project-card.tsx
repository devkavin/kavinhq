import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Project } from "@/types/database";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <Card className="relative h-full overflow-hidden">
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
          <Image
            src={project.cover_image_url || "/images/placeholders/project.svg"}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
          {project.featured ? <Badge className="absolute left-4 top-4">Featured</Badge> : null}
          <div className="absolute inset-0 grid translate-y-4 place-items-center bg-slate-950/82 p-6 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
            <div className="w-full rounded-lg border border-sky-400/25 bg-slate-950/75 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-sky-300">Project Scanner</p>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                {[
                  ["TYPE", project.category],
                  ["STACK", project.stack?.slice(0, 3).join(", ")],
                  ["STATUS", project.status],
                  ["ROLE", project.role],
                  ["FOCUS", project.focus]
                ].map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-slate-500">{key}</dt>
                    <dd className="mt-1 text-slate-100">{value || "Indexed"}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{project.category || "Case Study"} · {project.year || "Now"}</p>
              <h3 className="mt-2 font-[var(--font-space)] text-xl font-semibold text-white">{project.title}</h3>
            </div>
            <ArrowUpRight className="mt-1 size-5 text-sky-300 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">{project.summary || project.excerpt}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {(project.stack || []).slice(0, 4).map((item) => (
              <Badge key={item} variant="secondary">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
}
