import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/public/section";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <Section>
      <SectionHeading eyebrow="Legal" title="Terms" />
      <div className="prose-hq mt-8 max-w-3xl">
        <p>The content on Kavin HQ is provided for general information about services, work, notes, and experiments. Project work begins only after scope, terms, and responsibilities are agreed in writing.</p>
        <p>Case studies, notes, and images may be updated as the portfolio evolves. This page can be replaced with formal legal terms before production launch.</p>
      </div>
    </Section>
  );
}
