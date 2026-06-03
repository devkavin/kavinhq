import * as React from 'react';
import { Sidebar } from '@/components/admin/sidebar';
import { ToastProvider } from '@/components/ui/toast';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <div className="flex flex-col md:flex-row min-h-screen bg-[#0F172A] text-[#E5E7EB] font-sans relative">
        {/* Ambient Glow background */}
        <div className="absolute top-0 right-0 w-[500px] h-[250px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Sidebar Nav */}
        <Sidebar />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative z-10">
          <div className="mx-auto max-w-6xl w-full">
            {children}
          </div>
        </main>
      </div>
    </ToastProvider>
  );
}
