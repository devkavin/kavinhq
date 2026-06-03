"use client";

import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("kavinhq-loaded")) return;
    setVisible(true);
    const startedAt = Date.now();
    const timer = window.setTimeout(() => {
      const elapsed = Date.now() - startedAt;
      window.setTimeout(
        () => {
          sessionStorage.setItem("kavinhq-loaded", "true");
          setVisible(false);
        },
        Math.max(0, 680 - elapsed)
      );
    }, 1500);

    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950 text-white">
      <div className="w-64 text-center">
        <p className="text-lg font-semibold">Kavin HQ</p>
        <p className="mt-2 text-sm text-slate-400">Preparing workspace...</p>
        <div className="mt-6 h-px overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-full origin-left animate-[load_1.5s_ease-out_forwards] bg-sky-400" />
        </div>
      </div>
      <style jsx>{`
        @keyframes load {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          div {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
