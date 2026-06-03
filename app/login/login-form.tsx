"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signInWithPassword } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function signIn() {
    startTransition(async () => {
      const result = await signInWithPassword(password);
      setMessage(result.message);

      if (result.ok) {
        router.replace("/admin");
        router.refresh();
      }
    });
  }

  return (
    <div className="soft-panel mx-auto max-w-md rounded-lg p-6">
      <h1 className="text-2xl font-semibold tracking-tight text-white">Admin Sign In</h1>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        Enter the admin password to manage Kavin HQ content.
      </p>
      <label className="mt-6 grid gap-2 text-sm text-slate-300">
        Password
        <Input
          autoComplete="current-password"
          onChange={(event) => setPassword(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") signIn();
          }}
          type="password"
          value={password}
        />
      </label>
      <Button className="mt-5 w-full" disabled={isPending} onClick={signIn} type="button">
        {isPending ? "Signing in..." : "Sign In"}
      </Button>
      {message ? <p className="mt-4 text-sm text-slate-400">{message}</p> : null}
    </div>
  );
}
