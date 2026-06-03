import * as React from 'react';
import type { Metadata } from 'next';
import { Mail, Clock, Phone } from 'lucide-react';
import { ContactForm } from '@/components/public/contact-form';

export const metadata: Metadata = {
  title: 'Contact & Inquiries',
  description: 'Request a project quote or schedule a consultation with Kavin HQ.',
};

interface Props {
  searchParams: Promise<{ type?: string }>;
}

export default async function ContactPage({ searchParams }: Props) {
  const { type } = await searchParams;

  return (
    <div className="py-16 relative">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-20" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-mono text-primary mb-4 uppercase">
            <span>HQ COMMUNICATIONS // INBOUND PORTS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Start a Project // Consultations
          </h1>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed">
            Fill in the parameters below. We audit scope details and follow up within 24 hours to schedule an alignment call.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Quick Contact Info (Cols 1-4) */}
          <div className="lg:col-span-4 space-y-4 font-mono text-xs text-muted-foreground lg:sticky lg:top-24">
            
            <div className="bg-secondary/35 border border-border/40 p-5 rounded-lg space-y-4 glass-panel">
              <div className="flex items-center gap-2 text-foreground font-bold border-b border-border/20 pb-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>DIRECT LOGS</span>
              </div>
              <div className="space-y-1">
                <span>Primary Email:</span>
                <a href="mailto:contact@kavinhq.com" className="block text-foreground hover:underline font-semibold text-[11px]">
                  contact@kavinhq.com
                </a>
              </div>
            </div>

            <div className="bg-secondary/35 border border-border/40 p-5 rounded-lg space-y-4 glass-panel">
              <div className="flex items-center gap-2 text-foreground font-bold border-b border-border/20 pb-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>RESPONSE DELAY</span>
              </div>
              <div className="space-y-1 leading-relaxed">
                <span>Inquiry review and scheduling usually occurs within:</span>
                <span className="block text-foreground font-semibold">24 Hours (Mon-Fri)</span>
              </div>
            </div>

            <div className="bg-secondary/35 border border-border/40 p-5 rounded-lg space-y-4 glass-panel">
              <div className="flex items-center gap-2 text-foreground font-bold border-b border-border/20 pb-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>CHANNELS</span>
              </div>
              <div className="space-y-1">
                <span>Supports messaging:</span>
                <span className="block text-foreground font-semibold">WhatsApp & Telegram Link</span>
              </div>
            </div>

          </div>

          {/* Zod Form Sheet (Cols 5-12) */}
          <div className="lg:col-span-8">
            <ContactForm defaultType={type} />
          </div>

        </div>

      </div>
    </div>
  );
}
