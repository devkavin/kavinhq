import { ServiceForm } from "@/components/service-form";

export default function NewServicePage() {
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight text-white">New Service</h1>
      <div className="mt-8">
        <ServiceForm />
      </div>
    </section>
  );
}
