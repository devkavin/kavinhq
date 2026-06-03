import { AdminResource } from "@/components/admin-resource";

export default function AdminInquiriesPage() {
  return (
    <AdminResource
      description="Review submitted project inquiries from the contact form."
      items={[{ title: "No inquiries loaded", description: "Supabase contact submissions will appear here once connected.", meta: "Inbox", status: "open" }]}
      title="Contact Inquiries"
    />
  );
}
