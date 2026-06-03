'use client';

import * as React from 'react';
import { Header } from '@/components/public/header';
import { Footer } from '@/components/public/footer';
import { LoadingScreen } from '@/components/public/loading-screen';
import { ToastProvider } from '@/components/ui/toast';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = React.useState(true);

  // Check sessionStorage directly on mount to prevent flashing
  React.useEffect(() => {
    const hasVisited = sessionStorage.getItem('kavinhq-session-active');
    if (hasVisited) {
      setIsLoading(false);
    }
  }, []);

  return (
    <ToastProvider>
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}
      
      {/* Page Reveal */}
      <div className={`flex flex-col min-h-screen relative transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Header />
        
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative z-10">
          {children}
        </main>
        
        <Footer />
      </div>
    </ToastProvider>
  );
}
