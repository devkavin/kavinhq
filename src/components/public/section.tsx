import { cn } from "@/lib/utils";

export function Section({
  children,
  className
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return <section className={cn("mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8", className)}>{children}</section>;
}

export function SectionHeading({ eyebrow, title, copy }: { eyebrow?: string; title: string; copy?: string }) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">{eyebrow}</p> : null}
      <h2 className="font-[var(--font-space)] text-3xl font-semibold tracking-normal text-white sm:text-4xl">{title}</h2>
      {copy ? <p className="mt-4 text-base leading-7 text-slate-400">{copy}</p> : null}
    </div>
  );
}
