import { AdminResource } from "@/components/admin-resource";

export default function AdminTestimonialsPage() {
  return (
    <AdminResource
      description="Manage client quotes when testimonials are ready to publish."
      items={[{ title: "No testimonials yet", description: "Add only real testimonials when they are available.", meta: "Pending", status: "draft" }]}
      title="Testimonials"
    />
  );
}
