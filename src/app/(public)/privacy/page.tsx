import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/public/section";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <Section>
      <SectionHeading eyebrow="Legal" title="Privacy Policy" />
      <div className="prose-hq mt-8 max-w-3xl">
        <p>Kavin HQ collects project inquiry details only so the request can be reviewed and answered. This may include your name, email, company or brand, project context, and optional contact links.</p>
        <p>Admin-uploaded content and inquiry records are stored in Supabase. Data is not sold, rented, or shared for advertising.</p>
        <p>This page is a professional placeholder and can be expanded with jurisdiction-specific legal language before launch.</p>
      </div>
    </Section>
  );
}
