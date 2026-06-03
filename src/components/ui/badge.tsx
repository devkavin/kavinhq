import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'info';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        variant === 'default' &&
          'border-transparent bg-primary/10 text-primary border-primary/20',
        variant === 'secondary' &&
          'border-transparent bg-secondary text-secondary-foreground',
        variant === 'outline' && 'text-foreground border-border',
        variant === 'destructive' &&
          'border-transparent bg-destructive/10 text-destructive border-destructive/20',
        variant === 'success' &&
          'border-transparent bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        variant === 'info' &&
          'border-transparent bg-violet-500/10 text-violet-400 border-violet-500/20',
        className
      )}
      {...props}
    />
  );
}

export { Badge };
