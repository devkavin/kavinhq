import Link from "next/link";
import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary: "border-sky-400/35 bg-sky-400 text-slate-950 hover:bg-sky-300",
  secondary: "border-slate-700/80 bg-slate-900/60 text-slate-100 hover:border-sky-300/45 hover:bg-slate-900",
  ghost: "border-transparent bg-transparent text-slate-200 hover:text-white"
};

export function Button({ className, href, variant = "primary", ...props }: ButtonProps) {
  const classes = cn(
    "inline-flex h-11 items-center justify-center rounded-md border px-5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link className={classes} href={href}>
        {props.children}
      </Link>
    );
  }

  return <button className={classes} {...props} />;
}
