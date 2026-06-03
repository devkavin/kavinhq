import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { hasAdminSession } from "@/lib/admin-auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const isSignedIn = await hasAdminSession();

  if (!isSignedIn) {
    redirect("/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
