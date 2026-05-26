import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AccessDeniedPage() {
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <Card className="max-w-md p-6 text-center">
        <h1 className="font-[var(--font-space)] text-2xl font-semibold text-white">Access denied</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">This admin area is restricted to the configured Kavin HQ admin email.</p>
        <Button asChild className="mt-6"><Link href="/">Return to site</Link></Button>
      </Card>
    </main>
  );
}
