import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <Card className="w-full max-w-md p-6">
        <p className="font-[var(--font-space)] text-2xl font-semibold text-white">Kavin HQ Admin</p>
        <p className="mt-2 text-sm text-slate-400">Sign in with the admin account to manage the command center.</p>
        {params.error ? <p className="mt-4 rounded-md border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">Login failed. Check the email and password.</p> : null}
        <form action={login} className="mt-6 grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required autoComplete="current-password" />
          </div>
          <Button type="submit">Sign in</Button>
        </form>
      </Card>
    </main>
  );
}
