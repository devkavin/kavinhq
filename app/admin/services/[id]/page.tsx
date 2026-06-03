import { notFound } from "next/navigation";
import { ServiceForm } from "@/components/service-form";
import { adminGet } from "@/lib/admin-data";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await adminGet("services", id);
  if (!service) notFound();

  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight text-white">Edit Service</h1>
      <div className="mt-8">
        <ServiceForm service={service} />
      </div>
    </section>
  );
}
