import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");
  if (user.email !== process.env.ADMIN_EMAIL) redirect("/auth/access-denied");
  return (
    <div className="min-h-screen lg:pl-72">
      <AdminSidebar />
      <main className="p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
