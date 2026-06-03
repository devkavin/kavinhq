import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'accent' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
          // Variants
          variant === 'default' &&
            'bg-primary text-primary-foreground shadow hover:bg-primary/90 shadow-primary/20 hover:shadow-primary/30 font-semibold',
          variant === 'outline' &&
            'border border-border bg-transparent text-foreground hover:bg-secondary hover:text-primary hover:border-primary/50',
          variant === 'ghost' &&
            'bg-transparent text-foreground hover:bg-secondary hover:text-primary',
          variant === 'link' &&
            'bg-transparent text-primary underline-offset-4 hover:underline p-0',
          variant === 'accent' &&
            'bg-accent text-accent-foreground shadow hover:bg-accent/90 shadow-accent/20 hover:shadow-accent/30 font-semibold',
          variant === 'destructive' &&
            'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow shadow-destructive/20',
          // Sizes
          size === 'default' && 'h-10 px-4 py-2',
          size === 'sm' && 'h-8 rounded px-3 text-xs',
          size === 'lg' && 'h-12 rounded-md px-8 text-base',
          size === 'icon' && 'h-10 w-10 p-0',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
