import Link from "next/link";
import { LogOut } from "lucide-react";
import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { adminNav } from "@/lib/constants/site";

export function AdminSidebar() {
  return (
    <aside className="border-r border-slate-800 bg-slate-950/80 p-4 lg:fixed lg:inset-y-0 lg:left-0 lg:w-72">
      <Link href="/admin" className="font-[var(--font-space)] text-xl font-semibold text-white">Kavin HQ</Link>
      <nav className="mt-8 grid gap-1">
        {adminNav.map((item) => (
          <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-900 hover:text-white">
            <item.icon className="size-4" />
            {item.label}
          </Link>
        ))}
      </nav>
      <form action={logout} className="mt-8">
        <Button variant="secondary" className="w-full" type="submit"><LogOut className="size-4" /> Logout</Button>
      </form>
    </aside>
  );
}
