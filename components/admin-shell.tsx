import Link from "next/link";
import { BarChart3, FileText, FolderKanban, ImageIcon, Inbox, MessageSquareQuote, Settings, Wrench } from "lucide-react";
import { signOutAdmin } from "@/app/admin/actions";
import { Brand } from "@/components/brand";

const adminNav = [
  ["Overview", "/admin", BarChart3],
  ["Projects", "/admin/projects", FolderKanban],
  ["Notes", "/admin/notes", FileText],
  ["Services", "/admin/services", Wrench],
  ["Testimonials", "/admin/testimonials", MessageSquareQuote],
  ["Contact Inquiries", "/admin/inquiries", Inbox],
  ["Media", "/admin/media", ImageIcon],
  ["Settings", "/admin/settings", Settings]
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell grid gap-8 py-10 md:grid-cols-[240px_1fr]">
      <aside className="rounded-lg border border-slate-800 bg-slate-950/45 p-4 md:sticky md:top-24 md:h-fit">
        <Brand />
        <nav className="mt-6 grid gap-1">
          {adminNav.map(([label, href, Icon]) => (
            <Link className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white" href={href as string} key={href as string}>
              <Icon size={16} /> {label as string}
            </Link>
          ))}
        </nav>
        <form action={signOutAdmin} className="mt-6 border-t border-slate-800 pt-4">
          <button className="w-full rounded-md border border-slate-800 px-3 py-2 text-left text-sm text-slate-400 transition hover:border-sky-300/35 hover:text-white" type="submit">
            Sign out
          </button>
        </form>
      </aside>
      <div>{children}</div>
    </div>
  );
}
