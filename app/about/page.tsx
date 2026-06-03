export const metadata = { title: "About" };

const groups = [
  ["Frontend", "React, Next.js, Tailwind"],
  ["Backend", "Laravel, ASP.NET Core, PHP, C#"],
  ["Database", "PostgreSQL, MySQL, SQL Server"],
  ["Deployment", "Vercel, Docker, Supabase"]
];

export default function AboutPage() {
  return (
    <section className="section">
      <div className="shell">
        <div className="grid gap-12 md:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="eyebrow">About</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white">Kavin HQ is the work home of Kavin/Kavindra.</h1>
          </div>
          <div className="space-y-6 text-lg leading-8 text-slate-400">
            <p>
              I’m a software engineer focused on building clean websites, business systems, dashboards, and web products that fit real workflows.
            </p>
            <p>
              Kavin HQ is where I collect my work, write notes from the process, and help businesses turn rough ideas into practical digital products.
            </p>
            <p>
              My approach is simple: understand the problem, design the flow, build carefully, and keep the system maintainable after launch.
            </p>
          </div>
        </div>
        <div className="mt-16 border-y border-slate-800/80 py-10">
          <h2 className="text-2xl font-semibold text-white">Skills and Systems</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {groups.map(([title, text]) => (
              <div key={title}>
                <p className="text-sm font-medium text-sky-300">{title}</p>
                <p className="mt-3 text-base leading-7 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
