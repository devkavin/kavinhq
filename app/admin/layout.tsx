import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { isSupabaseConfigured } from "@/lib/supabase";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (isSupabaseConfigured) {
    const supabase = await createServerSupabaseClient();
    const { data } = await supabase.auth.getUser();
    const adminEmail = process.env.ADMIN_EMAIL ?? "kavindra.senanayake@gmail.com";

    if (!data.user || data.user.email !== adminEmail) {
      redirect("/login");
    }
  }

  return <AdminShell>{children}</AdminShell>;
}
