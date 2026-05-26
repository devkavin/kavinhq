import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/public/section";
import { ProjectCard } from "@/components/public/project-card";
import { getProjectBySlug, getPublishedProjects } from "@/lib/data/public";
import { absoluteUrl } from "@/lib/utils";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary || project.excerpt || undefined,
    alternates: { canonical: absoluteUrl(`/work/${slug}`) }
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [project, allProjects] = await Promise.all([getProjectBySlug(slug), getPublishedProjects({ limit: 3 })]);
  if (!project) notFound();
  const sections = [
    ["Problem", project.problem],
    ["Goal", project.goal],
    ["My Role", project.my_role],
    ["Tech Stack", project.tech_stack],
    ["Architecture / Flow", project.architecture_flow],
    ["Challenges", project.challenges],
    ["Outcome", project.outcome],
    ["What I Learned", project.what_i_learned]
  ].filter(([, value]) => value);
  const related = allProjects.filter((item) => item.slug !== project.slug).slice(0, 2);

  return (
    <Section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "CreativeWork", name: project.title, url: absoluteUrl(`/work/${project.slug}`) }) }}
      />
      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <article>
          <Badge>{project.category || "Case Study"}</Badge>
          <h1 className="mt-5 font-[var(--font-space)] text-4xl font-semibold text-white md:text-6xl">{project.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{project.summary || project.excerpt}</p>
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
            <Image src={project.cover_image_url || "/images/placeholders/project.svg"} alt="" fill priority className="object-cover" />
          </div>
          <div className="prose-hq mt-10 max-w-none">
            {sections.map(([title, value]) => (
              <section key={title}>
                <h2>{title}</h2>
                <p>{value}</p>
              </section>
            ))}
            {project.key_features?.length ? (
              <section>
                <h2>Key Features</h2>
                <ul>{project.key_features.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
            ) : null}
          </div>
          {project.gallery_images?.length ? (
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {project.gallery_images.map((image) => (
                <div key={image} className="relative aspect-[16/10] overflow-hidden rounded-lg border border-slate-800">
                  <Image src={image} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
          ) : null}
        </article>
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <Card className="p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Project Summary</p>
            <dl className="mt-5 grid gap-4 text-sm">
              {[
                ["Year", project.year],
                ["Role", project.role],
                ["Focus", project.focus],
                ["Category", project.category]
              ].map(([key, value]) => <div key={key}><dt className="text-slate-500">{key}</dt><dd className="mt-1 text-slate-100">{value || "Indexed"}</dd></div>)}
            </dl>
            <div className="mt-5 flex flex-wrap gap-2">{project.stack?.map((item) => <Badge key={item} variant="secondary">{item}</Badge>)}</div>
          </Card>
        </aside>
      </div>
      <div className="mt-16 glass rounded-lg p-8">
        <h2 className="font-[var(--font-space)] text-2xl font-semibold text-white">Want something like this?</h2>
        <Button asChild className="mt-5"><Link href="/contact">Request a Quote</Link></Button>
      </div>
      {related.length ? <div className="mt-16 grid gap-6 md:grid-cols-2">{related.map((item) => <ProjectCard key={item.id} project={item} />)}</div> : null}
    </Section>
  );
}
