"use client";

import { useEffect, useRef } from "react";

export function usePoll(fn: () => Promise<void>, interval: number, deps: React.DependencyList) {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = async () => {
      if (cancelled) return;
      if (document.visibilityState !== "hidden") {
        try { await fnRef.current(); } catch {}
      }
      timer = setTimeout(tick, interval);
    };
    tick();
    return () => { cancelled = true; clearTimeout(timer); };
  }, deps);
}
