"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export function FirstVisitLoader() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (sessionStorage.getItem("kavin-hq-loaded") || reduce) return;
    const reveal = window.setTimeout(() => setShow(true), 0);
    const started = Date.now();
    const ready = () => {
      const remaining = Math.max(0, 800 - (Date.now() - started));
      window.setTimeout(() => {
        sessionStorage.setItem("kavin-hq-loaded", "1");
        setShow(false);
      }, remaining);
    };
    if (document.readyState === "complete") ready();
    else window.addEventListener("load", ready, { once: true });
    const max = window.setTimeout(ready, 2000);
    return () => {
      window.clearTimeout(reveal);
      window.clearTimeout(max);
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="w-[min(88vw,420px)]">
            <p className="font-[var(--font-space)] text-3xl font-semibold tracking-[0.16em] text-slate-50">KAVIN HQ</p>
            <p className="mt-3 text-sm text-slate-400">Initializing command center...</p>
            <div className="mt-8 h-px overflow-hidden bg-slate-800">
              <motion.div className="h-full bg-sky-400" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.1 }} />
            </div>
            <div className="mt-6 grid gap-2 text-xs uppercase tracking-[0.18em] text-slate-500">
              {["Systems loaded", "Work indexed", "Services online", "Interface ready"].map((line, index) => (
                <motion.span key={line} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.18 }}>
                  {line}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
