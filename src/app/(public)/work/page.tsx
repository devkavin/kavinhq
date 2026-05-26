import type { Metadata } from "next";
import { ProjectCard } from "@/components/public/project-card";
import { Section, SectionHeading } from "@/components/public/section";
import { Input } from "@/components/ui/input";
import { getPublishedProjects } from "@/lib/data/public";

export const metadata: Metadata = { title: "Work", description: "Published projects and case studies from Kavin HQ." };

export default async function WorkPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) {
  const params = await searchParams;
  const projects = await getPublishedProjects();
  const categories = [...new Set(projects.map((project) => project.category).filter(Boolean))] as string[];
  const q = (params.q || "").toLowerCase();
  const category = params.category || "";
  const filtered = projects.filter((project) => {
    const matchesCategory = !category || project.category === category;
    const haystack = `${project.title} ${project.stack?.join(" ")} ${project.summary}`.toLowerCase();
    return matchesCategory && (!q || haystack.includes(q));
  });

  return (
    <Section>
      <SectionHeading eyebrow="Work" title="Digital systems documented as business and engineering work." copy="Each case study tracks the problem, decisions, implementation shape, and outcome." />
      <form className="mt-10 grid gap-3 md:grid-cols-[1fr_auto]">
        <Input name="q" defaultValue={params.q} placeholder="Search title or stack" aria-label="Search projects" />
        <select name="category" defaultValue={category} className="focus-ring h-11 rounded-md border border-slate-700 bg-slate-950/70 px-3 text-sm text-slate-100">
          <option value="">All categories</option>
          {categories.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </form>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </Section>
  );
}
