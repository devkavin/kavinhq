import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getProjectBySlug, getProjects } from "@/lib/data";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="section">
      <div className="shell">
        <Link className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white" href="/work">
          <ArrowLeft size={15} /> Back to work
        </Link>
        <div className="mt-9 grid gap-10 md:grid-cols-[.9fr_1.1fr] md:items-start">
          <div>
            <p className="eyebrow">{project.category} · {project.year}</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">{project.title}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-400">{project.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact">Request Similar Work</Button>
              <Button href="/work" variant="secondary">More Projects</Button>
            </div>
          </div>
          <div className="relative aspect-[1.45] overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
            <Image alt="" className="object-cover" fill priority src={project.image} />
          </div>
        </div>

        <div className="mt-16 grid gap-12 border-t border-slate-800/70 pt-12 md:grid-cols-[220px_1fr]">
          <aside className="hidden text-sm text-slate-500 md:block">
            {["Overview", "Problem", "Goal", "What I Built", "Tech Stack", "Key Features", "Screenshots", "Result", "Lessons"].map((item) => (
              <p className="py-2" key={item}>{item}</p>
            ))}
          </aside>
          <div className="space-y-14">
            <CaseSection title="Overview" text={project.overview} />
            <CaseSection title="Problem" text={project.problem} />
            <CaseSection title="Goal" text={project.goal} />
            <CaseSection title="What I Built" text={project.whatBuilt} />
            <section>
              <h2 className="text-2xl font-semibold text-white">Tech Stack</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.techStack.map((item) => (
                  <span className="rounded-md border border-slate-800 px-3 py-1.5 text-sm text-slate-300" key={item}>{item}</span>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-white">Key Features</h2>
              <div className="mt-5 grid gap-3">
                {project.keyFeatures.map((item) => (
                  <div className="flex items-start gap-3 text-slate-300" key={item}>
                    <Check className="mt-1 text-sky-400" size={16} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-white">Screenshots</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {project.gallery.map((image) => (
                  <div className="relative aspect-[1.55] overflow-hidden rounded-lg border border-slate-800 bg-slate-900" key={image}>
                    <Image alt="" className="object-cover" fill src={image} />
                  </div>
                ))}
              </div>
            </section>
            <CaseSection title="Result" text={project.result} />
            <CaseSection title="Lessons" text={project.lessons} />
          </div>
        </div>
      </div>
    </article>
  );
}

function CaseSection({ title, text }: { title: string; text: string }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-slate-400">{text}</p>
    </section>
  );
}
