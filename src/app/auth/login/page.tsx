'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Terminal, Lock, Mail, ShieldAlert } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectedFrom = searchParams.get('redirectedFrom') || '/admin';

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      // Check if user email matches admin email
      const user = data.user;
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'kavindra.senanayake@gmail.com';
      
      if (user && user.email !== adminEmail) {
        // Sign out right away if they are not the admin
        await supabase.auth.signOut();
        router.push('/auth/access-denied');
        return;
      }

      router.push(redirectedFrom);
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setErrorMsg('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0F172A] text-foreground font-mono px-6 relative">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-20" />

      <div className="w-full max-w-sm p-6 sm:p-8 bg-card border border-border/40 rounded-lg space-y-6 glass-panel">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 font-bold tracking-wider text-primary text-xl">
            <Terminal className="h-5 w-5 text-primary" />
            <span>KAVIN HQ</span>
          </div>
          <p className="text-[10px] text-muted-foreground uppercase">// ADMIN CONSOLE LINK</p>
        </div>

        {errorMsg && (
          <div className="bg-rose-950/40 border border-rose-500/25 p-3.5 rounded text-[11px] text-rose-300 flex items-start gap-2">
            <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs font-mono">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-muted-foreground uppercase tracking-widest text-[10px]">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="ADMIN@KAVINHQ.COM"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9 text-xs uppercase"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-muted-foreground uppercase tracking-widest text-[10px]">Security Key / Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9 text-xs"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full text-xs py-5 justify-center mt-2"
          >
            {isLoading ? 'ESTABLISHING HANDSHAKE...' : 'ESTABLISH LINK'}
          </Button>
        </form>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense fallback={null}>
      <LoginForm />
    </React.Suspense>
  );
}
