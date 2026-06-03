import * as React from 'react';
import Link from 'next/link';
import { ShieldX, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0F172A] text-foreground font-mono px-6 relative select-none">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-20" />
      
      <div className="w-full max-w-md p-8 bg-card border border-rose-500/20 rounded-lg text-center space-y-6 glass-panel">
        
        <ShieldX className="h-16 w-16 text-rose-500 mx-auto animate-pulse" />
        
        <div className="space-y-2">
          <h1 className="text-lg font-bold text-foreground uppercase tracking-widest">// ACCESS DENIED</h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Authenticated profile does not match administrative privileges. Security logs updated.
          </p>
        </div>

        <div className="bg-secondary/40 border border-border/40 p-4 rounded text-left text-[11px] leading-relaxed">
          <span>Required Admin Email:</span>
          <span className="block text-primary font-bold">kavindra.senanayake@gmail.com</span>
          <span className="block mt-2 text-muted-foreground">If you believe this is an error, please log out and sign in with the correct credentials.</span>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <Link href="/">
            <Button variant="outline" className="w-full text-xs gap-1.5 h-10">
              <Home className="h-4 w-4" />
              <span>RETURN HOME</span>
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
