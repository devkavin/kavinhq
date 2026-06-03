'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import { cn } from '@/lib/utils/cn';

const NAV_LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/notes', label: 'Notes' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/lab', label: 'Lab' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Close mobile menu on pathname change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-mono font-bold tracking-wider text-foreground hover:text-primary transition-colors text-lg">
          <Terminal className="h-5 w-5 text-primary" />
          <span>Kavin HQ</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/contact?type=request">
            <Button variant="outline" size="sm">
              Request a Quote
            </Button>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <Link href="/contact?type=request">
            <Button variant="outline" size="sm" className="px-3 text-xs">
              Quote
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            className="text-foreground"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Sheet
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        title="SYSTEM MENU"
      >
        <div className="flex flex-col gap-4 font-mono mt-4">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-base py-2 border-b border-border/20 transition-colors',
                  isActive ? 'text-primary font-bold' : 'text-muted-foreground hover:text-primary'
                )}
              >
                &gt; {link.label.toUpperCase()}
              </Link>
            );
          })}
          <div className="mt-8">
            <Link href="/contact?type=request" className="w-full">
              <Button className="w-full font-mono">
                REQUEST A QUOTE
              </Button>
            </Link>
          </div>
        </div>
      </Sheet>
    </header>
  );
}
