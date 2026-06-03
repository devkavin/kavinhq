"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient, isSupabaseConfigured } from "@/lib/supabase";

export function LoginForm() {
  const [email, setEmail] = useState("kavindra.senanayake@gmail.com");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function signIn() {
    startTransition(async () => {
      if (!isSupabaseConfigured) {
        setMessage("Configure Supabase environment variables to enable admin sign in.");
        return;
      }

      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`
        }
      });

      setMessage(error ? error.message : "Check your email for the sign-in link.");
    });
  }

  return (
    <div className="soft-panel mx-auto max-w-md rounded-lg p-6">
      <h1 className="text-2xl font-semibold tracking-tight text-white">Admin Sign In</h1>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        Access is limited to the configured Kavin HQ admin email.
      </p>
      <label className="mt-6 grid gap-2 text-sm text-slate-300">
        Email
        <Input onChange={(event) => setEmail(event.target.value)} type="email" value={email} />
      </label>
      <Button className="mt-5 w-full" disabled={isPending} onClick={signIn} type="button">
        {isPending ? "Sending..." : "Send Sign-In Link"}
      </Button>
      {message ? <p className="mt-4 text-sm text-slate-400">{message}</p> : null}
    </div>
  );
}
