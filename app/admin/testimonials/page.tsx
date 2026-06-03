import { AdminTable } from "@/components/admin-table";
import { adminList } from "@/lib/admin-data";

export default async function AdminTestimonialsPage() {
  const testimonials = await adminList("testimonials", "sort_order", true);
  return (
    <AdminTable
      description="Manage client quotes when testimonials are ready to publish."
      editBasePath="/admin/testimonials"
      newPath="/admin/testimonials/new"
      rows={testimonials.map((testimonial: any) => ({
        id: testimonial.id,
        title: testimonial.name,
        description: testimonial.quote,
        meta: testimonial.company ?? testimonial.role ?? "",
        status: testimonial.status
      }))}
      table="testimonials"
      title="Testimonials"
    />
  );
}
