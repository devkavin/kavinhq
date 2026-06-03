import { AdminResource } from "@/components/admin-resource";

export default function AdminSettingsPage() {
  return (
    <AdminResource
      description="Manage public site settings and profile details."
      items={[
        { title: "Brand name", description: "Kavin HQ", meta: "Public", status: "published" },
        { title: "Admin email", description: "kavindra.senanayake@gmail.com", meta: "Auth", status: "published" }
      ]}
      title="Settings"
    />
  );
}
