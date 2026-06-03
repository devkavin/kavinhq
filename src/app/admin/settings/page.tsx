import * as React from 'react';
import type { Metadata } from 'next';
import { getSiteSettingByKey } from '@/actions/settings';
import { SettingsForm } from '@/components/admin/settings-form';
import { Settings, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Site Configuration Settings | Admin Console',
};

export default async function AdminSettingsPage() {
  // Fetch current setting records with deep defaults in case DB is not populated yet
  const heroSetting = (await getSiteSettingByKey('homepage_hero').catch(() => null)) as any || {
    headline: 'I build clean, reliable digital systems for businesses, teams, and real-world workflows.',
    subheadline: 'Kavin HQ is the home base for my software work, case studies, technical notes, and business-focused web solutions.',
  };

  const availabilitySetting = (await getSiteSettingByKey('availability').catch(() => null)) as any || {
    status: 'available',
    message: 'Open for selected projects',
  };

  const contactSetting = (await getSiteSettingByKey('contact_info').catch(() => null)) as any || {
    email: 'contact@kavinhq.com',
    response_time: 'Usually within 24 hours',
  };

  const socialsSetting = (await getSiteSettingByKey('social_links').catch(() => null)) as any || {
    github: 'https://github.com/kavinhq',
    linkedin: 'https://linkedin.com/in/kavin',
    twitter: 'https://twitter.com/kavinhq',
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-border/40 pb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[10px] font-mono text-primary mb-2 uppercase">
            <span>SITE CONFIG // GLOBAL registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            <span>Site Settings</span>
          </h1>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground bg-secondary/35 border border-border/40 p-2 rounded">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>CONFIG FILE: site_settings</span>
        </div>
      </div>

      {/* Settings Form */}
      <SettingsForm
        initialHero={heroSetting}
        initialAvailability={availabilitySetting}
        initialContact={contactSetting}
        initialSocials={socialsSetting}
      />

    </div>
  );
}
