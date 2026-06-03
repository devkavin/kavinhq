import * as React from 'react';
import type { Metadata } from 'next';
import { getPublishedProjects } from '@/actions/projects';
import { WorkGrid } from '@/components/public/work-grid';

export const metadata: Metadata = {
  title: 'Work & Case Studies',
  description: 'Technical case studies and systems built by Kavin HQ, detailing stack choices, goals, and outcomes.',
};

export default async function WorkPage() {
  const projects = await getPublishedProjects().catch(() => []);

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-mono text-primary mb-4 uppercase">
            <span>HQ ARCHIVES // CASE REGISTRIES</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Systems & Case Studies
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
            Detailed reports of software platforms, business websites, and telemetry panels built for real-world workflows.
          </p>
        </div>

        {/* Client side grid filtering */}
        <WorkGrid initialProjects={projects} />

      </div>
    </div>
  );
}
