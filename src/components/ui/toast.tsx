'use client';

import * as React from 'react';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  title?: string;
  message: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextType {
  toast: (item: Omit<ToastItem, 'id'>) => void;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | null>(null);

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider.');
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const toast = React.useCallback(({ title, message, type = 'default', duration = 4000 }: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        dismiss(id);
      }, duration);
    }
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      
      {/* Toast Portaling & Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'pointer-events-auto flex w-full items-start gap-3 rounded-lg border bg-card p-4 shadow-lg glass-card transition-all duration-300 animate-in slide-in-from-bottom-5',
              t.type === 'success' && 'border-emerald-500/20 bg-emerald-950/30 text-emerald-100',
              t.type === 'error' && 'border-rose-500/20 bg-rose-950/30 text-rose-100',
              t.type === 'warning' && 'border-amber-500/20 bg-amber-950/30 text-amber-100',
              t.type === 'info' && 'border-sky-500/20 bg-sky-950/30 text-sky-100'
            )}
          >
            {/* Status Icons */}
            <div className="shrink-0 mt-0.5">
              {t.type === 'success' && <CheckCircle className="h-5 w-5 text-emerald-400" />}
              {t.type === 'error' && <AlertCircle className="h-5 w-5 text-rose-400" />}
              {t.type === 'warning' && <AlertTriangle className="h-5 w-5 text-amber-400" />}
              {t.type === 'info' && <Info className="h-5 w-5 text-sky-400" />}
            </div>

            {/* Content */}
            <div className="flex-1">
              {t.title && <h4 className="font-bold text-sm leading-none mb-1 text-foreground">{t.title}</h4>}
              <p className="text-sm opacity-90">{t.message}</p>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={() => dismiss(t.id)}
              className="shrink-0 rounded-md p-1 opacity-70 hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-primary text-foreground cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
