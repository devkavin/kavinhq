import Link from "next/link";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";

const nav = [
  ["Work", "/work"],
  ["Services", "/services"],
  ["Notes", "/notes"],
  ["About", "/about"],
  ["Contact", "/contact"]
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950/65 backdrop-blur-xl">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Brand />
        <nav className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
          {nav.map(([label, href]) => (
            <Link className="transition hover:text-white" href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button className="h-9 px-4 text-xs" href="/contact" variant="secondary">
            Request a Quote
          </Button>
        </div>
      </div>
    </header>
  );
}
