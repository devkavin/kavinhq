import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/public/section";

export const metadata: Metadata = { title: "About", description: "About Kavin and the systems behind Kavin HQ." };

const layers = [
  ["Frontend Layer", "React, Next.js, Tailwind"],
  ["Backend Layer", "Laravel, ASP.NET Core, PHP, C#"],
  ["Database Layer", "PostgreSQL, MySQL, SQL Server"],
  ["Deployment Layer", "Docker, Vercel, Hetzner, CI/CD"],
  ["Product Layer", "UX, dashboards, admin panels, landing pages"]
];

export default function AboutPage() {
  return (
    <Section>
      <SectionHeading eyebrow="About" title="Kavin builds practical systems where product thinking and engineering discipline meet." copy="The work is focused on websites, dashboards, workflow tools, and the quiet details that make software useful after launch." />
      <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-6">
          <h2 className="font-[var(--font-space)] text-2xl font-semibold text-white">Kavin / Kavindra</h2>
          <p className="mt-4 leading-7 text-slate-300">
            I am a software engineer focused on practical systems, websites, dashboards, and business workflows. Kavin HQ is where I document what I build, what I learn, and how I help businesses move from rough ideas to working software.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {["clarity", "maintainability", "reliability", "clean UX", "useful systems"].map((value) => (
              <span key={value} className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300">{value}</span>
            ))}
          </div>
        </Card>
        <div className="grid gap-4">
          {layers.map(([title, items]) => (
            <Card key={title} className="p-5">
              <p className="text-sm font-medium text-sky-300">{title}</p>
              <p className="mt-2 text-slate-300">{items}</p>
            </Card>
          ))}
        </div>
      </div>
      <div className="mt-12 glass rounded-lg p-8">
        <h2 className="font-[var(--font-space)] text-2xl font-semibold text-white">Kavin HQ is the operating base.</h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-400">It brings together project work, notes, services, experiments, and future business activity into one clear headquarters.</p>
        <Button asChild className="mt-6"><Link href="/contact">Start a Project</Link></Button>
      </div>
    </Section>
  );
}
