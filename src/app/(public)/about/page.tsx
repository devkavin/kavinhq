import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Cpu, Layers, HardDrive, ShieldAlert, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'About',
  description: 'Kavindra (Kavin) is a software engineer specializing in scalable dashboards, web systems, and custom database structures.',
};

const STACK_LAYERS = [
  {
    layer: 'Frontend UI Layer',
    techs: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zod', 'Redux Toolkit'],
    icon: Cpu,
  },
  {
    layer: 'Backend Systems Layer',
    techs: ['Laravel (PHP)', 'ASP.NET Core (C#)', 'Node.js', 'Express', 'PHP', 'C#'],
    icon: Layers,
  },
  {
    layer: 'Database Telemetry Layer',
    techs: ['PostgreSQL', 'Microsoft SQL Server', 'MySQL', 'Redis', 'Supabase DB'],
    icon: HardDrive,
  },
  {
    layer: 'Deployment Pipelines Layer',
    techs: ['Docker', 'Vercel', 'Hetzner Cloud', 'GitHub Actions CI/CD', 'Linux/Ubuntu'],
    icon: Award,
  },
];

const VALUES = [
  { title: 'Extreme Clarity', desc: 'Code structures and databases should be readable and document-first. No obfuscations, no over-engineered bloat.' },
  { title: 'High Maintainability', desc: 'I build systems utilizing clean architecture principles. Future developer teams should be able to hand over with ease.' },
  { title: 'Database Reliability', desc: 'Proper transaction scoping, custom indexing, and optimized schemas form the foundation of sub-second page performance.' },
  { title: 'Purposeful UX', desc: 'Interactive elements must serve a functional purpose. Minimal distraction, rapid navigation, and keyboard accessibility.' },
];

export default function AboutPage() {
  return (
    <div className="py-16 relative font-sans">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-20" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-mono text-primary mb-4 uppercase">
            <span>HQ ARCHIVES // PERSONAL dossier</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            About Kavindra // Kavin
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
            A software engineer building functional, maintainable, and sub-second digital systems for businesses.
          </p>
        </div>

        {/* Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
          
          <div className="lg:col-span-8 space-y-6 text-muted-foreground text-sm leading-relaxed">
            <p>
              I am a senior developer focusing on web applications, robust APIs, and dashboard telemetry. Throughout my engineering path, I have designed and deployed products ranging from simple high-converting single-page landing pages to logistics tracking panels.
            </p>
            <p>
              I believe in direct, clear communication. When building a software project, I focus heavily on planning schemas, decapping ingestion layers, and optimizing Core Web Vitals. The objective is to build systems that solve real business bottlenecks, reduce loading fatigue, and retain visitor trust.
            </p>
            <blockquote className="border-l-4 border-primary pl-4 font-mono text-xs italic text-foreground bg-secondary/35 p-4 rounded-r">
              “Kavin HQ is where I document what I build, what I learn, and how I help businesses move from rough ideas to working software.”
            </blockquote>
            <p>
              Whether you need to overhaul an existing legacy website that suffers from performance bottlenecks, launch a new product storefront, or wire up secure real-time dashboards with Supabase, I provide the technical plan and execute it.
            </p>
          </div>

          <div className="lg:col-span-4 bg-secondary/20 border border-border/40 p-6 rounded-lg font-mono text-xs text-muted-foreground space-y-4 glass-panel">
            <div className="flex items-center gap-1.5 font-bold text-foreground border-b border-border/20 pb-2 mb-2">
              <ShieldAlert className="h-4 w-4 text-primary" />
              <span>SYSTEM PROFILE</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-muted-foreground">Operator Name</span>
              <span className="text-foreground font-semibold">Kavindra Senanayake</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-muted-foreground">Base Domain</span>
              <span className="text-foreground font-semibold">kavinhq.com</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-muted-foreground">Focus Core</span>
              <span className="text-foreground font-semibold">System Arch & Full Stack Dev</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-muted-foreground">Preferred Frameworks</span>
              <span className="text-foreground font-semibold">Laravel, Next.js, .NET</span>
            </div>
          </div>

        </div>

        {/* System Stack Layer Map */}
        <div className="border-t border-border/20 pt-16 mb-20">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">// Stack Topology</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Systems Layer Mapping</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            {STACK_LAYERS.map((layer) => {
              const Icon = layer.icon;
              return (
                <Card key={layer.layer} className="border-border/30 bg-card/40">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-foreground font-bold border-b border-border/20 pb-2">
                      <Icon className="h-4.5 w-4.5 text-primary" />
                      <span>{layer.layer.toUpperCase()}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {layer.techs.map((tech) => (
                        <span key={tech} className="bg-secondary border border-border/40 px-2 py-0.5 rounded text-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Value List */}
        <div className="border-t border-border/20 pt-16 mb-20">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">// Engineering Standards</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Operational Core Values</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 font-sans">
            {VALUES.map((val) => (
              <div key={val.title} className="space-y-2">
                <h4 className="text-base font-bold text-foreground font-mono flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span>{val.title}</span>
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed pl-4">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="border-t border-border/20 pt-16 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Let&apos;s talk about your next system.
          </h3>
          <p className="text-sm text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
            I assist teams in moving from loose requirements or rough Figma files to secure, working production environments.
          </p>
          <Link href="/contact">
            <Button size="lg" className="font-mono">
              INITIATE SYSTEM LOG &gt;
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
