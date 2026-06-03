import { ProjectCard } from "@/components/cards";
import { Input } from "@/components/ui/input";
import { getProjects } from "@/lib/data";

export const metadata = { title: "Work" };

export default async function WorkPage() {
  const projects = await getProjects();
  const categories = ["All", ...Array.from(new Set(projects.map((project) => project.category)))];

  return (
    <section className="section">
      <div className="shell">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-semibold tracking-tight text-white">Work</h1>
          <p className="mt-5 text-lg leading-8 text-slate-400">
            A selection of websites, dashboards, and web systems built for business workflows.
          </p>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-y border-slate-800/70 py-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <span className="rounded-md border border-slate-800 px-3 py-1.5 text-sm text-slate-300" key={category}>
                {category}
              </span>
            ))}
          </div>
          <div className="w-full md:w-72">
            <Input aria-label="Search projects" placeholder="Search projects..." />
          </div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
