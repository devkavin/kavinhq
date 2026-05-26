import Link from "next/link";
import { publicNav } from "@/lib/constants/site";

export function PublicFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/60">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-[var(--font-space)] text-xl font-semibold text-white">Kavin HQ</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
            Mission control for practical software systems, business websites, dashboards, and technical notes.
          </p>
        </div>
        <div className="grid gap-2 text-sm">
          {publicNav.map((item) => (
            <Link key={item.href} href={item.href} className="text-slate-400 hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="text-sm text-slate-400">
          <p>kavinhq.com</p>
          <p className="mt-2">Open for selected projects.</p>
          <p className="mt-6">© {new Date().getFullYear()} Kavin HQ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
