import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { Brand } from "@/components/brand";

const links = [
  ["Work", "/work"],
  ["Services", "/services"],
  ["Notes", "/notes"],
  ["About", "/about"],
  ["Contact", "/contact"]
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800/70 py-12">
      <div className="shell grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Brand />
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
            Clean digital products that solve real problems for businesses and teams.
          </p>
          <div className="mt-6 flex gap-3 text-slate-400">
            <Link aria-label="GitHub" className="transition hover:text-white" href="https://github.com/">
              <Github size={18} />
            </Link>
            <Link aria-label="LinkedIn" className="transition hover:text-white" href="https://linkedin.com/">
              <Linkedin size={18} />
            </Link>
            <Link aria-label="Email" className="transition hover:text-white" href="mailto:hello@kavinhq.com">
              <Mail size={18} />
            </Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-white">Navigate</p>
          <div className="mt-4 grid gap-2 text-sm text-slate-400">
            {links.map(([label, href]) => (
              <Link className="transition hover:text-white" href={href} key={href}>
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-white">Contact</p>
          <div className="mt-4 grid gap-2 text-sm text-slate-400">
            <Link className="transition hover:text-white" href="mailto:hello@kavinhq.com">
              hello@kavinhq.com
            </Link>
            <span>Colombo, Sri Lanka</span>
            <span>Usually replies within 24 hours</span>
          </div>
        </div>
      </div>
      <div className="shell mt-10 border-t border-slate-800/70 pt-6 text-xs text-slate-500">
        © 2026 Kavin HQ. All rights reserved.
      </div>
    </footer>
  );
}
