import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, HelpCircle, Check, Briefcase, Plus, Minus } from 'lucide-react';
import { getPublishedServices } from '@/actions/services';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Services & Capabilities',
  description: 'Clean development, design, and deployment services tailored for landing pages, multi-page business sites, and software dashboards.',
};

const HOW_I_WORK = [
  { step: '01', title: 'Discover & Align', desc: 'We audit your current platform, map out user workflows, and outline business specifications in a direct alignment session.' },
  { step: '02', title: 'Technical Planning', desc: 'Design database schemas, cloud infrastructure pipelines, and API pathways before any code is written.' },
  { step: '03', title: 'UX & Visual Mockups', desc: 'Develop wireframes and mockups that prioritize clarity, load speed, responsive sizing, and conversion.' },
  { step: '04', title: 'Next.js / Laravel Code', desc: 'Write clean, typed codebase structures with comprehensive CSS design tokens and component testing.' },
  { step: '05', title: 'QA & Stress Checks', desc: 'Conduct validations, performance audits, link health tests, and responsive layout validations.' },
  { step: '06', title: 'Server / DNS Deploy', desc: 'Launch on cloud platforms like Vercel or Hetzner, configure SSL, secure keys, and link domains.' },
  { step: '07', title: 'Optimize & Monitor', desc: 'Analyze early log files, monitor speed metrics, and schedule progressive refinements.' },
];

const FAQS = [
  {
    q: 'Do you build only landing pages?',
    a: 'No. While I develop high-converting single-page landing pages for marketing, I regularly build complex multi-page sites, admin dashboard panels, Stripe e-commerce storefronts, and custom backend systems.'
  },
  {
    q: 'Can you redesign an existing website?',
    a: 'Yes. Re-architecting stale, low-performance legacy codebases is a core service. I migrate legacy data, improve usability flows, optimize media assets, and build with Next.js to achieve sub-second load times while preserving your existing SEO link value.'
  },
  {
    q: 'Can you build dashboards or internal tools?',
    a: 'Yes. I design and build secure, role-restricted dashboard systems, customer portals, and internal workflows. I integrate these with Supabase Auth, PostgreSQL, and external APIs for seamless data tracking.'
  },
  {
    q: 'Do you provide hosting and deployment support?',
    a: 'Yes. I handle the entire server configuration, SSL certificate generation, and domain mapping process. The typical setup involves Next.js projects deployed to Vercel, or PHP/ASP.NET Core applications compiled into Docker containers running on secure VPS nodes.'
  },
  {
    q: 'How do we start?',
    a: 'Submit a quote inquiry using the contact form, detailing your project scope, timeline, and current system link. I will review it and follow up within 24 hours to schedule an initial alignment call.'
  }
];

export default async function ServicesPage() {
  const dbServices = await getPublishedServices().catch(() => []);

  // Standard fallback seeded ordered services
  const activeServices = dbServices.length > 0 ? dbServices : [
    {
      title: 'Landing Page Development',
      slug: 'landing-page-development',
      short_description: 'High-converting, performance-optimized, and premium single-page layouts designed to turn traffic into pipeline.',
      who_it_is_for: 'SaaS startups, product launches, and lead-generation campaigns.',
      what_is_included: ['Custom UI/UX styling', 'Tailwind CSS production build', 'Interactive components via Framer Motion', 'Speed and SEO optimization', 'Analytics and tracking scripts integration'],
      deliverables: ['Production-ready single page website', 'Analytics dashboard setup (Vercel/Google)', 'Source code files', 'Deployment support']
    },
    {
      title: 'Business Website Development',
      slug: 'business-website-development',
      short_description: 'Executive multi-page web presence detailing your team, mission, products, and insights, built for high trust.',
      who_it_is_for: 'Professional firms, agency partners, and mid-sized enterprises.',
      what_is_included: ['Up to 8 custom structured pages', 'Dynamic blog or resources section', 'Contact form & CRM/Supabase integration', 'Content Management Dashboard', 'SEO & metadata optimization'],
      deliverables: ['Multi-page Next.js web application', 'Admin content editor portal', 'Domain setup and DNS config', 'Training documentation']
    },
    {
      title: 'Web App / Dashboard Development',
      slug: 'web-app-dashboard-development',
      short_description: 'Tailored web applications, internal tools, customer portals, and real-time interactive business dashboards.',
      who_it_is_for: 'Product teams, operations managers, and data-heavy businesses.',
      what_is_included: ['Database design & migrations (PostgreSQL)', 'Supabase Auth & Roles integrations', 'State management & caching', 'Interactive charts and tables', 'Real-time updates & webhooks'],
      deliverables: ['Custom web app or dashboard portal', 'Secure DB instance & auth schemas', 'Interactive reports & exporting features', 'API documentation']
    },
    {
      title: 'Website Redesign',
      slug: 'website-redesign',
      short_description: 'Migrate legacy systems, modernize stale visual styles, optimize page load speed, and rebuild with cutting-edge tech.',
      who_it_is_for: 'Established companies with low-performance sites or outdated architectures.',
      what_is_included: ['Full UX audit & layout improvements', 'Legacy platform data migration', 'Performance speed optimization (100% Core Web Vitals)', 'Mobile-first rewrite in Next.js', 'Consistent link structures to retain SEO value'],
      deliverables: ['Fully rebuilt web system', 'Audit report (Before/After)', 'Migration verification checklist']
    },
    {
      title: 'Technical Consultation',
      slug: 'technical-consultation',
      short_description: 'Direct guidance on product architecture, technology stack decisions, database performance, and deployment systems.',
      who_it_is_for: 'Founders, technical leaders, and development teams needing external oversight.',
      what_is_included: ['3x Architecture review sessions', 'Database schema auditing', 'Cloud hosting recommendations (Vercel/Hetzner)', 'CI/CD pipeline planning'],
      deliverables: ['Comprehensive technical blueprint document', 'Performance review report', 'Recommended codebase templates']
    }
  ];

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-mono text-primary mb-4 uppercase">
            <span>HQ OPERATIONS // CAPABILITY specs</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Development Services
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
            I deliver robust, clean digital systems from technical blueprinting up to deployment pipelines.
          </p>
        </div>

        {/* Services List in exact order */}
        <div className="space-y-12 mb-24">
          {activeServices.map((service, index) => (
            <Card key={service.slug} className="border-border/40 bg-card/60 overflow-hidden relative glass-card">
              <div className="scanner-line opacity-10" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
                
                {/* Header Info */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded font-black">
                      0{index + 1}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">CAPABILITY SPEC</span>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground tracking-tight">{service.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.short_description}</p>
                  
                  {service.who_it_is_for && (
                    <div className="border-t border-border/20 pt-3">
                      <span className="block text-[10px] font-mono text-muted-foreground uppercase mb-1">Target Client Profile</span>
                      <p className="text-xs text-foreground font-medium">{service.who_it_is_for}</p>
                    </div>
                  )}
                </div>

                {/* What is Included list (JSONB) */}
                <div className="lg:col-span-4 space-y-3">
                  <h4 className="text-xs font-mono font-bold text-foreground uppercase tracking-widest">// System Inclusions</h4>
                  <ul className="space-y-2">
                    {((service.what_is_included as string[]) || []).map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables list (JSONB) & CTA */}
                <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-bold text-foreground uppercase tracking-widest">// Core Deliverables</h4>
                    <ul className="space-y-2">
                      {((service.deliverables as string[]) || []).map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border/20">
                    <Link href={`/contact?type=${encodeURIComponent(service.title)}`}>
                      <Button variant="outline" className="w-full text-xs font-mono justify-center gap-1">
                        <span>REQUEST A QUOTE</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>

              </div>
            </Card>
          ))}
        </div>

        {/* How I Work Section */}
        <div className="border-t border-border/20 pt-20 mb-24">
          <div className="max-w-3xl mb-16">
            <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">// Procedural Guidelines</p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Operational Delivery Method</h2>
          </div>

          <div className="relative border-l border-border/40 pl-6 space-y-12 font-sans">
            {HOW_I_WORK.map((step) => (
              <div key={step.step} className="relative">
                {/* Dot marker */}
                <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary border-4 border-[#0F172A]" />
                
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start">
                  <span className="text-xs font-mono text-primary font-bold">[{step.step}]</span>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-foreground">{step.title}</h4>
                    <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="border-t border-border/20 pt-20">
          <div className="max-w-3xl mb-16">
            <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">// Query Resolutions</p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Frequently Answered Queries</h2>
          </div>

          <div className="space-y-4 max-w-4xl font-sans">
            {FAQS.map((faq) => (
              <div key={faq.q} className="border border-border/40 rounded-lg bg-card/40 p-5 space-y-2 glass-panel">
                <h4 className="text-base font-bold text-foreground flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
