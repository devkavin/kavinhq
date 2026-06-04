'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

const DEFAULT_PHRASES = [
  'business websites',
  'admin dashboards',
  'booking flows',
  'client portals',
  'custom web apps',
];

type HeroTypewriterTextProps = {
  phrases?: string[];
};

export function HeroTypewriterText({ phrases = DEFAULT_PHRASES }: HeroTypewriterTextProps) {
  const [phraseIndex, setPhraseIndex] = React.useState(0);
  const [visibleCount, setVisibleCount] = React.useState(phrases[0]?.length ?? 0);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  React.useEffect(() => {
    if (!hasMounted || phrases.length === 0) {
      return;
    }

    const phrase = phrases[phraseIndex];
    const isComplete = !isDeleting && visibleCount === phrase.length;
    const isEmpty = isDeleting && visibleCount === 0;
    const delay = isComplete ? 1800 : isEmpty ? 320 : isDeleting ? 34 : 58;

    const timeout = window.setTimeout(() => {
      if (isComplete) {
        setIsDeleting(true);
        return;
      }

      if (isEmpty) {
        setIsDeleting(false);
        setPhraseIndex((current) => (current + 1) % phrases.length);
        return;
      }

      setVisibleCount((current) => current + (isDeleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [hasMounted, isDeleting, phraseIndex, phrases, visibleCount]);

  const phrase = phrases[phraseIndex] ?? '';
  const visibleText = hasMounted ? phrase.slice(0, visibleCount) : phrase;

  return (
    <span className="inline-flex min-w-[10ch] items-baseline text-primary sm:min-w-[12ch]">
      <span>{visibleText}</span>
      <motion.span
        aria-hidden="true"
        className="ml-1 inline-block h-[0.82em] w-[0.08em] translate-y-[0.08em] bg-primary"
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
      />
      <span className="sr-only">{phrase}</span>
    </span>
  );
}
