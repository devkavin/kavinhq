import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Cpu, Beaker, Terminal } from 'lucide-react';
import { getPublishedLabItems } from '@/actions/lab';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Lab & Experiments',
  description: 'Future experiments, micro-tools, web widgets, and systems prototypes built by Kavin HQ.',
};

export default async function LabPage() {
  const labItems = await getPublishedLabItems().catch(() => []);

  return (
    <div className="py-16 relative font-sans">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-20" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-mono text-primary mb-4 uppercase">
            <span>HQ ARCHIVES // MICROLAB ITEMS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Laboratory & Prototypes
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
            A storage folder for micro-tools, experimental code libraries, systems telemetry prototypes, and widgets.
          </p>
        </div>

        {/* Lab Items List */}
        {labItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {labItems.map((item) => (
              <Card key={item.id} className="border-border/40 bg-card/60 flex flex-col justify-between glass-card font-mono text-xs">
                
                <div>
                  {item.image_url ? (
                    <div
                      className="w-full h-40 bg-cover bg-center border-b border-border/20 relative"
                      style={{ backgroundImage: `url(${item.image_url})` }}
                    />
                  ) : (
                    <div className="w-full h-40 bg-secondary/40 flex items-center justify-center border-b border-border/20">
                      <Beaker className="h-10 w-10 text-muted-foreground/30" />
                    </div>
                  )}

                  <CardContent className="p-6 space-y-3">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-primary font-bold">// LAB EXPERIMENT</span>
                      <span className="text-muted-foreground">ORDER: {item.sort_order}</span>
                    </div>

                    <h3 className="text-sm font-bold text-foreground line-clamp-1">{item.title}</h3>
                    <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-3">{item.excerpt}</p>
                    
                    <div className="flex flex-wrap gap-1 pt-2">
                      {item.tags.map((tag: string) => (
                        <span key={tag} className="text-[9px] bg-secondary border border-border/30 px-1.5 py-0.5 rounded text-foreground">
                          #{tag.toLowerCase()}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </div>

                {item.external_url && (
                  <div className="p-6 pt-0 mt-auto border-t border-border/20 pt-4">
                    <Link href={item.external_url} target="_blank" rel="noreferrer">
                      <Button variant="outline" className="w-full text-[10px] font-mono justify-center gap-1 h-8">
                        <span>LAUNCH EXPERIMENT</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                )}

              </Card>
            ))}
          </div>
        ) : (
          /* Empty state as requested */
          <div className="flex flex-col items-center justify-center text-center py-24 border border-dashed border-border/40 rounded-lg max-w-xl mx-auto bg-card/10">
            <Beaker className="h-12 w-12 text-primary/40 mb-4 animate-pulse" />
            <h3 className="font-mono text-sm font-bold text-foreground mb-1 uppercase">
              // EXPERIMENT LOGS VACANT
            </h3>
            <p className="text-xs text-muted-foreground max-w-xs">
              Experiments will appear here soon. Stay tuned for micro-tools and widget prototypes.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
