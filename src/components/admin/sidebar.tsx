'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Terminal,
  LayoutDashboard,
  FolderGit2,
  FileText,
  Briefcase,
  Quote,
  Mail,
  Image as ImageIcon,
  Settings,
  LogOut,
  Menu,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import { cn } from '@/lib/utils/cn';

const MENU_ITEMS = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: FolderGit2 },
  { href: '/admin/notes', label: 'Notes', icon: FileText },
  { href: '/admin/services', label: 'Services', icon: Briefcase },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Quote },
  { href: '/admin/inquiries', label: 'Inquiries', icon: Mail },
  { href: '/admin/media', label: 'Media', icon: ImageIcon },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/auth/login');
    router.refresh();
  };

  const NavLinks = ({ className = '' }) => (
    <nav className={cn('flex flex-col gap-1', className)}>
      {MENU_ITEMS.map((item) => {
        const isActive =
          item.href === '/admin'
            ? pathname === '/admin'
            : pathname.startsWith(item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer',
              isActive
                ? 'bg-primary text-primary-foreground font-semibold shadow shadow-primary/20'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{item.label}</span>
          </Link>
        );
      })}

      <button
        onClick={handleSignOut}
        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-rose-400 hover:bg-rose-950/20 hover:text-rose-300 transition-colors mt-8 cursor-pointer text-left w-full border-t border-border/20 pt-4"
      >
        <LogOut className="h-4 w-4 shrink-0" />
        <span>Log Out</span>
      </button>
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border/40 bg-card h-screen sticky top-0 shrink-0 font-mono text-xs">
        {/* Header */}
        <div className="h-16 flex items-center gap-2 border-b border-border/40 px-6 font-bold text-foreground text-sm tracking-wider">
          <Terminal className="h-5 w-5 text-primary" />
          <span>KAVIN HQ</span>
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <NavLinks />
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden h-16 border-b border-border/40 bg-card flex items-center justify-between px-4 sticky top-0 z-30 w-full font-mono text-xs">
        <div className="flex items-center gap-2 font-bold text-foreground text-sm tracking-wider">
          <Terminal className="h-5 w-5 text-primary" />
          <span>KAVIN HQ</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileOpen(true)}
          aria-label="Open sidebar menu"
          className="text-foreground"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Sidebar Drawer */}
      <Sheet
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        title="ADMIN NAVIGATION"
      >
        <div className="py-4 font-mono">
          <NavLinks />
        </div>
      </Sheet>
    </>
  );
}
