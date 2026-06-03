'use client';

import * as React from 'react';
import { Save, Loader2, Settings, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { updateSiteSetting } from '@/actions/settings';

interface SettingsFormProps {
  initialHero: { headline: string; subheadline: string };
  initialAvailability: { status: 'available' | 'maintenance'; message: string };
  initialContact: { email: string; response_time: string };
  initialSocials: { github: string; linkedin: string; twitter: string };
}

export function SettingsForm({
  initialHero,
  initialAvailability,
  initialContact,
  initialSocials,
}: SettingsFormProps) {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = React.useState(false);

  // Form states
  const [hero, setHero] = React.useState(initialHero);
  const [avail, setAvail] = React.useState(initialAvailability);
  const [contact, setContact] = React.useState(initialContact);
  const [socials, setSocials] = React.useState(initialSocials);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Run updates sequentially
      await updateSiteSetting('homepage_hero', hero);
      await updateSiteSetting('availability', avail);
      await updateSiteSetting('contact_info', contact);
      await updateSiteSetting('social_links', socials);

      toast({
        title: 'Settings Saved',
        message: 'All site settings keys updated successfully.',
        type: 'success',
      });
    } catch (err: any) {
      toast({
        title: 'Save Failed',
        message: err.message || 'An error occurred while saving settings.',
        type: 'error',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs">
      
      {/* 1. Homepage Hero Content */}
      <Card className="border-border/40 bg-card/60 glass-card">
        <CardContent className="p-6 space-y-4">
          <h3 className="font-bold text-sm text-foreground border-b border-border/20 pb-2 uppercase tracking-wider">
            // Homepage Hero Copy
          </h3>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground uppercase">Hero Headline</label>
              <Input
                value={hero.headline}
                onChange={(e) => setHero({ ...hero, headline: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground uppercase">Hero Subheadline</label>
              <Input
                value={hero.subheadline}
                onChange={(e) => setHero({ ...hero, subheadline: e.target.value })}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Availability Status */}
      <Card className="border-border/40 bg-card/60 glass-card">
        <CardContent className="p-6 space-y-4">
          <h3 className="font-bold text-sm text-foreground border-b border-border/20 pb-2 uppercase tracking-wider">
            // Operational Availability
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground uppercase">Status Port</label>
              <select
                value={avail.status}
                onChange={(e) => setAvail({ ...avail, status: e.target.value as any })}
                className="flex h-10 w-full rounded-md border border-input bg-secondary px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary cursor-pointer"
              >
                <option value="available" className="bg-card text-foreground">ONLINE / AVAILABLE</option>
                <option value="maintenance" className="bg-card text-foreground">OFFLINE / MAINTENANCE</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground uppercase">Availability Status Message</label>
              <Input
                value={avail.message}
                onChange={(e) => setAvail({ ...avail, message: e.target.value })}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Direct Contact Details */}
      <Card className="border-border/40 bg-card/60 glass-card">
        <CardContent className="p-6 space-y-4">
          <h3 className="font-bold text-sm text-foreground border-b border-border/20 pb-2 uppercase tracking-wider">
            // Contact Parameter Channels
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground uppercase">Primary Contact Email</label>
              <Input
                type="email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground uppercase">Estimated Response Time</label>
              <Input
                value={contact.response_time}
                onChange={(e) => setContact({ ...contact, response_time: e.target.value })}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. Social Links */}
      <Card className="border-border/40 bg-card/60 glass-card">
        <CardContent className="p-6 space-y-4">
          <h3 className="font-bold text-sm text-foreground border-b border-border/20 pb-2 uppercase tracking-wider">
            // Social Endpoint Links
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground uppercase">GitHub URL</label>
              <Input
                type="url"
                value={socials.github}
                onChange={(e) => setSocials({ ...socials, github: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground uppercase">LinkedIn URL</label>
              <Input
                type="url"
                value={socials.linkedin}
                onChange={(e) => setSocials({ ...socials, linkedin: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground uppercase">Twitter / X URL</label>
              <Input
                type="url"
                value={socials.twitter}
                onChange={(e) => setSocials({ ...socials, twitter: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Button
        type="submit"
        disabled={isSaving}
        className="w-full font-mono text-xs py-5 justify-center"
      >
        {isSaving ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>SAVING site SETTINGS TOPOLOGY...</span>
          </>
        ) : (
          <>
            <Save className="h-4 w-4" />
            <span>SAVE SITE SETTINGS</span>
          </>
        )}
      </Button>

    </form>
  );
}
