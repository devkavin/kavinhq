import { saveSetting } from "@/actions/admin";
import { ActionForm } from "@/components/admin/action-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { listTable } from "@/lib/data/admin";
import type { SiteSetting } from "@/types/database";

export default async function SettingsPage() {
  const settings = await listTable<SiteSetting>("site_settings");
  const homepage = settings.find((item) => item.key === "homepage")?.value || {
    headline: "I build clean, reliable digital systems for businesses, teams, and real-world workflows.",
    subheadline: "Kavin HQ is the home base for my software work, case studies, technical notes, and business-focused web solutions.",
    availability: "Open for selected projects",
    contact_email: "kavindra.senanayake@gmail.com",
    social_links: {}
  };
  return (
    <div>
      <h1 className="font-[var(--font-space)] text-3xl font-semibold text-white">Settings</h1>
      <Card className="mt-6 p-5">
        <ActionForm action={async (_state, formData) => saveSetting(formData)}>
          <div className="grid gap-4">
            <div className="grid gap-2"><Label htmlFor="key">Key</Label><Input id="key" name="key" defaultValue="homepage" /></div>
            <div className="grid gap-2"><Label htmlFor="value">JSON value</Label><Textarea id="value" name="value" rows={12} defaultValue={JSON.stringify(homepage, null, 2)} /></div>
            <Button type="submit">Save settings</Button>
          </div>
        </ActionForm>
      </Card>
    </div>
  );
}
