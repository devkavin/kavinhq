import * as React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Kavin HQ services and site visitors.',
};

export default function PrivacyPage() {
  return (
    <div className="py-16 font-sans">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground mb-6 font-mono text-xl uppercase tracking-widest border-b border-border/40 pb-4">
          // PRIVACY POLICY
        </h1>
        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p className="text-xs font-mono">LAST UPDATED: JUNE 03, 2026</p>
          <p>
            At Kavin HQ (accessible from kavinhq.com), one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Kavin HQ and how we use it.
          </p>
          <h2 className="text-base font-bold text-foreground font-mono mt-8">// 1. INFORMATION WE COLLECT</h2>
          <p>
            We collect information that you send directly to us via our inquiry sheet, including your name, email address, company details, phone number, and project descriptions. This data is stored securely in our private Supabase database and is only used to coordinate project consultations.
          </p>
          <h2 className="text-base font-bold text-foreground font-mono mt-8">// 2. COOKIES AND TRACKING</h2>
          <p>
            We use essential session cookie structures (via Supabase Auth) to authenticate administrative access to our secure dashboards. Public visitors are not tracked via persistent cross-site cookies, except for basic session markers (such as remembering if you have visited during the current session to bypass the loading screen animation).
          </p>
          <h2 className="text-base font-bold text-foreground font-mono mt-8">// 3. THIRD-PARTY DATA HANDLING</h2>
          <p>
            We do not sell, rent, or lease your contact information or message logs to third parties. Data is processed solely through our secure Vercel hosting platform and database nodes.
          </p>
          <h2 className="text-base font-bold text-foreground font-mono mt-8">// 4. CONTACT RESOLUTIONS</h2>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at{' '}
            <a href="mailto:contact@kavinhq.com" className="text-primary hover:underline">
              contact@kavinhq.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
