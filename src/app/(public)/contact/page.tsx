import type { Metadata } from "next";
import { ContactForm } from "@/components/public/contact-form";
import { HqStatus } from "@/components/public/hq-status";
import { Section, SectionHeading } from "@/components/public/section";

export const metadata: Metadata = { title: "Contact", description: "Send a project inquiry to Kavin HQ." };

export default function ContactPage() {
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading eyebrow="Contact" title="Bring the project into mission control." copy="Share the business goal, timeline, and current state. I will review it and respond with a practical next step." />
          <div className="mt-8"><HqStatus /></div>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
