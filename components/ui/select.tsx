import { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-md border border-slate-700/70 bg-slate-950/35 px-3 text-sm text-slate-100 outline-none transition focus:border-sky-300/60",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
