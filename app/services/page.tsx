import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getServices } from "@/lib/data";

export const metadata = { title: "Services" };

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <section className="section">
      <div className="shell">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-semibold tracking-tight text-white">Services</h1>
          <p className="mt-5 text-lg leading-8 text-slate-400">
            Practical design and development help for businesses that need clear websites, internal tools, and reliable web systems.
          </p>
        </div>
        <div className="mt-14 divide-y divide-slate-800/80 border-y border-slate-800/80">
          {services.map((service) => (
            <section className="grid gap-6 py-10 md:grid-cols-[.7fr_1.3fr] md:items-start" key={service.id}>
              <h2 className="text-2xl font-semibold text-white">{service.title}</h2>
              <div>
                <p className="max-w-3xl text-base leading-8 text-slate-400">{service.details}</p>
                <Button className="mt-6" href="/contact" variant="secondary">
                  Request a Quote <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
