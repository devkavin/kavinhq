import { AdminResource } from "@/components/admin-resource";
import { getServices } from "@/lib/data";

export default async function AdminServicesPage() {
  const services = await getServices();
  return (
    <AdminResource
      description="Keep public service descriptions clean and current."
      items={services.map((service) => ({ title: service.title, description: service.description, meta: `Order ${service.sortOrder}`, status: service.status }))}
      title="Services"
    />
  );
}
