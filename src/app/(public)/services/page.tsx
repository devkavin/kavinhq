import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/public/section";
import { getPublishedServices } from "@/lib/data/public";
import { processSteps } from "@/lib/constants/site";

export const metadata: Metadata = { title: "Services", description: "Business-focused web development services from Kavin HQ." };

const faqs = [
  ["Do you build only landing pages?", "No. Landing pages are one focused service, but I also build business websites, dashboards, internal systems, and technical improvements."],
  ["Can you redesign an existing website?", "Yes. I can audit what exists, preserve what works, and rebuild the experience with clearer UX, stronger performance, and cleaner content structure."],
  ["Can you build dashboards or internal systems?", "Yes. I build workflow dashboards, admin panels, reporting views, and business tools backed by reliable databases and maintainable code."],
  ["Do you provide hosting/deployment support?", "Yes. I can handle Vercel deployment, Supabase setup, Docker-based deployments, DNS guidance, and production readiness checks."],
  ["How do we start?", "Send a short project inquiry. I will review the business goal, scope, timeline, and technical shape before recommending a practical next step."]
];

export default async function ServicesPage() {
  const services = await getPublishedServices();
  return (
    <Section>
      <SectionHeading eyebrow="Services" title="Digital systems built with clarity before complexity." copy="No public price menu. Each engagement starts with scope, constraints, and business context." />
      <div className="mt-12 grid gap-6">
        {services.map((service, index) => (
          <Card key={service.id} className="grid gap-8 p-6 lg:grid-cols-[0.85fr_1fr_1fr_auto]">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-sky-300">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-4 font-[var(--font-space)] text-2xl font-semibold text-white">{service.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{service.short_description}</p>
              <p className="mt-5 text-sm text-slate-300">{service.who_it_is_for}</p>
            </div>
            <List title="Included" items={service.what_is_included || []} />
            <List title="Deliverables" items={service.deliverables || []} />
            <div className="lg:self-end"><Button asChild><Link href="/contact">Request a Quote</Link></Button></div>
          </Card>
        ))}
      </div>
      <div className="mt-16">
        <SectionHeading eyebrow="How I Work" title="A steady workflow from first conversation to iteration." />
        <div className="mt-8 grid gap-3 md:grid-cols-7">
          {processSteps.map((step) => <div key={step} className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-100">{step}</div>)}
        </div>
      </div>
      <div className="mt-16">
        <SectionHeading eyebrow="FAQ" title="Straight answers before a project starts." />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {faqs.map(([q, a]) => (
            <Card key={q} className="p-5">
              <h3 className="font-semibold text-white">{q}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{a}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-sm font-medium text-slate-100">{title}</p>
      <ul className="mt-3 grid gap-2 text-sm text-slate-400">
        {items.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-sky-300" />{item}</li>)}
      </ul>
    </div>
  );
}
