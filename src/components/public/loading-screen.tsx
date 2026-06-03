'use client';

import * as React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const STATUS_ITEMS = [
  'Systems loaded',
  'Work indexed',
  'Services online',
  'Interface ready',
];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [activeStatusIdx, setActiveStatusIdx] = React.useState(-1);
  const [progress, setProgress] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(true);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    // Check if session storage indicates we have visited
    const hasVisited = sessionStorage.getItem('kavinhq-session-active');
    
    if (hasVisited) {
      setIsVisible(false);
      onComplete();
      return;
    }

    if (shouldReduceMotion) {
      // Instantly finish if user prefers reduced motion
      sessionStorage.setItem('kavinhq-session-active', 'true');
      setIsVisible(false);
      onComplete();
      return;
    }

    // Step-by-step progress and status message reveal
    const progressDuration = 1200; // Total loading time
    const intervalTime = 30;
    const increment = (100 / (progressDuration / intervalTime));

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(progressInterval);
          sessionStorage.setItem('kavinhq-session-active', 'true');
          setTimeout(() => {
            setIsVisible(false);
            onComplete();
          }, 200); // Small buffer before fading out
          return 100;
        }
        return next;
      });
    }, intervalTime);

    // Reveal status messages sequentially
    const statusInterval = setInterval(() => {
      setActiveStatusIdx((prev) => {
        if (prev < STATUS_ITEMS.length - 1) {
          return prev + 1;
        }
        clearInterval(statusInterval);
        return prev;
      });
    }, progressDuration / STATUS_ITEMS.length);

    return () => {
      clearInterval(progressInterval);
      clearInterval(statusInterval);
    };
  }, [onComplete, shouldReduceMotion]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F172A] text-foreground grid-bg select-none"
      >
        <div className="w-full max-w-md px-6 flex flex-col items-start font-mono">
          {/* Logo Mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 mb-2 text-primary font-bold tracking-wider text-2xl"
          >
            <span>KAVIN HQ</span>
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          </motion.div>

          <p className="text-muted-foreground text-sm mb-6">
            Initializing command center...
          </p>

          {/* Status logs */}
          <div className="w-full flex flex-col gap-1.5 min-h-[96px] mb-8 font-mono text-xs text-muted-foreground">
            {STATUS_ITEMS.map((item, idx) => {
              const show = activeStatusIdx >= idx;
              return (
                <div key={item} className="flex items-center gap-2">
                  <span className={show ? 'text-primary' : 'opacity-0'}>
                    [OK]
                  </span>
                  <span className={show ? 'text-foreground transition-colors duration-200' : 'opacity-20'}>
                    {item}...
                  </span>
                </div>
              );
            })}
          </div>

          {/* Progress Bar Container */}
          <div className="w-full h-1 bg-secondary rounded-full overflow-hidden border border-border/40 relative">
            <motion.div
              className="h-full bg-primary"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
          
          <div className="w-full flex justify-between text-[10px] text-muted-foreground mt-2 font-mono">
            <span>SECURE LINK: PORT 443</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
