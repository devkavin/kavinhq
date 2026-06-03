import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-slate-700/70 bg-slate-950/35 px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-sky-300/60",
        className
      )}
      {...props}
    />
  );
}
