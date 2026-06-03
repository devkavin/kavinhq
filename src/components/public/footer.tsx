import * as React from 'react';
import Link from 'next/link';
import { HQStatus } from '@/components/public/hq-status';

const NAVIGATION = {
  main: [
    { name: 'Work', href: '/work' },
    { name: 'Services', href: '/services' },
    { name: 'Notes', href: '/notes' },
    { name: 'About', href: '/about' },
    { name: 'Lab', href: '/lab' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
  social: [
    { name: 'GitHub', href: 'https://github.com/kavinhq' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/kavin' },
    { name: 'Twitter', href: 'https://twitter.com/kavinhq' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/50 relative overflow-hidden mt-auto">
      {/* Background Dots */}
      <div className="absolute inset-0 dots-bg pointer-events-none opacity-20" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 col-span-1">
            <Link href="/" className="font-mono font-bold tracking-wider text-foreground text-lg">
              KAVIN HQ
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Mission Control for Digital Systems. Designing, building, and deploying secure, high-performance web applications and workflow tools.
            </p>
            <div className="flex gap-4">
              {NAVIGATION.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors text-xs font-mono"
                >
                  [{item.name.toUpperCase()}]
                </Link>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 col-span-1">
            <div>
              <h3 className="text-sm font-mono font-bold text-foreground mb-4">SYSTEMS</h3>
              <ul className="space-y-2">
                {NAVIGATION.main.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-mono font-bold text-foreground mb-4">LEGAL</h3>
              <ul className="space-y-2">
                {NAVIGATION.legal.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Status Column */}
          <div className="mt-12 xl:mt-0 col-span-1 flex flex-col items-start xl:items-end">
            <HQStatus />
          </div>

        </div>

        {/* Bottom border & copyright */}
        <div className="mt-12 border-t border-border/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground font-mono">
            &copy; {currentYear} KAVIN HQ. ALL SYSTEMS OPERATIONAL.
          </p>
          <p className="text-[10px] text-muted-foreground font-mono">
            BUILT WITH NEXT.JS + SUPABASE | HOSTED ON VERCEL
          </p>
        </div>
      </div>
    </footer>
  );
}
