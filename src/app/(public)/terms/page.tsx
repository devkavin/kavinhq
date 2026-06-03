import * as React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Kavin HQ website and technical consultations.',
};

export default function TermsPage() {
  return (
    <div className="py-16 font-sans">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground mb-6 font-mono text-xl uppercase tracking-widest border-b border-border/40 pb-4">
          // TERMS OF SERVICE
        </h1>
        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p className="text-xs font-mono">LAST UPDATED: JUNE 03, 2026</p>
          <p>
            Welcome to Kavin HQ. By accessing kavinhq.com, you agree to comply with and be bound by the following terms and conditions of use. If you disagree with any part of these terms, please do not access this site.
          </p>
          <h2 className="text-base font-bold text-foreground font-mono mt-8">// 1. CONSULTATION AGREEMENT</h2>
          <p>
            Submitting a quote inquiry does not bind Kavin HQ to deliver code or services until a formal project agreement is signed by both parties. Technical consultation blueprints are recommendations and should be audited by your systems teams prior to deployment.
          </p>
          <h2 className="text-base font-bold text-foreground font-mono mt-8">// 2. WEBSITE USE RESTRICTIONS</h2>
          <p>
            You may not attempt to spam, scrape, or perform denial-of-service triggers on our contact forms, database endpoints, or admin sub-modules. Honeypot systems are enabled to automatically flags and discard automated bot submissions.
          </p>
          <h2 className="text-base font-bold text-foreground font-mono mt-8">// 3. DISCLAIMERS</h2>
          <p>
            This website and the materials on Kavin HQ are provided &quot;as is&quot;. Kavin HQ makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability or fitness for a particular purpose.
          </p>
        </div>
      </div>
    </div>
  );
}
