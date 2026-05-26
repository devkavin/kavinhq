import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", {
  variants: {
    variant: {
      default: "border-sky-400/30 bg-sky-400/10 text-sky-200",
      secondary: "border-slate-700 bg-slate-900 text-slate-300",
      violet: "border-violet-400/30 bg-violet-400/10 text-violet-200",
      success: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
    }
  },
  defaultVariants: { variant: "default" }
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
