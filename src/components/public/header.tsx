"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { publicNav } from "@/lib/constants/site";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-[var(--font-space)] text-lg font-semibold text-white">
          Kavin HQ
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {publicNav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-slate-300 transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button asChild size="sm">
            <Link href="/contact">Request a Quote</Link>
          </Button>
        </div>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/70" />
            <Dialog.Content className="fixed right-0 top-0 z-50 h-full w-80 border-l border-slate-800 bg-slate-950 p-6">
              <Dialog.Title className="font-[var(--font-space)] text-lg font-semibold">Kavin HQ</Dialog.Title>
              <div className="mt-8 grid gap-4">
                {publicNav.map((item) => (
                  <Dialog.Close asChild key={item.href}>
                    <Link href={item.href} className="text-slate-200">
                      {item.label}
                    </Link>
                  </Dialog.Close>
                ))}
                <Dialog.Close asChild>
                  <Button asChild className="mt-4">
                    <Link href="/contact">Request a Quote</Link>
                  </Button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
