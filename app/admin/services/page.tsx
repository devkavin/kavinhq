import { AdminTable } from "@/components/admin-table";
import { adminList } from "@/lib/admin-data";

export default async function AdminServicesPage() {
  const services = await adminList("services", "sort_order", true);
  return (
    <AdminTable
      description="Keep public service descriptions clean and current."
      editBasePath="/admin/services"
      newPath="/admin/services/new"
      rows={services.map((service: any) => ({ id: service.id, title: service.title, description: service.description, meta: `Order ${service.sort_order}`, status: service.status }))}
      table="services"
      title="Services"
    />
  );
}
