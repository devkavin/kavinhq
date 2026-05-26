import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/public/section";
import { getPublishedLabItems } from "@/lib/data/public";

export const metadata: Metadata = { title: "Lab", description: "Experiments, mini tools, and prototypes from Kavin HQ." };

export default async function LabPage() {
  const items = await getPublishedLabItems();
  return (
    <Section>
      <SectionHeading eyebrow="Lab" title="Experiments, mini tools, and prototypes." />
      {items.length ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              {item.image_url ? <div className="relative aspect-[16/10]"><Image src={item.image_url} alt="" fill className="object-cover" /></div> : null}
              <div className="p-5">
                <h2 className="font-[var(--font-space)] text-xl font-semibold text-white">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2">{item.tags?.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}</div>
                {item.external_url ? <Link href={item.external_url} className="mt-5 inline-flex items-center gap-2 text-sm text-sky-300"><ExternalLink className="size-4" /> Open</Link> : null}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="mt-10 p-10 text-center text-slate-400">Experiments will appear here soon.</Card>
      )}
    </Section>
  );
}
