import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  side?: 'left' | 'right';
  className?: string;
}

export function Sheet({ isOpen, onClose, title, children, side = 'right', className }: SheetProps) {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <div className={cn('fixed inset-0 z-50 pointer-events-none', isOpen && 'pointer-events-auto')}>
      {/* Overlay */}
      <div 
        className={cn(
          'fixed inset-0 bg-background/80 backdrop-blur-sm cursor-pointer opacity-0 transition-opacity duration-300',
          isOpen && 'opacity-100'
        )} 
        onClick={onClose} 
      />

      {/* Sheet Content */}
      <div 
        className={cn(
          'fixed inset-y-0 z-50 w-3/4 max-w-sm border-border bg-card p-6 shadow-lg glass-card flex flex-col transition-transform duration-300 ease-in-out',
          side === 'right' ? 'right-0 border-l' : 'left-0 border-r',
          isOpen ? 'translate-x-0' : (side === 'right' ? 'translate-x-full' : '-translate-x-full'),
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-border/40">
          {title && <h2 className="text-lg font-bold text-foreground">{title}</h2>}
          <button 
            onClick={onClose}
            className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary text-foreground cursor-pointer p-1"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
