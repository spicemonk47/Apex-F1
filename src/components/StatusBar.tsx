"use client";

import { useEffect, useState } from "react";
import type { OpenF1Session } from "@/lib/types";
import { utcClock } from "@/lib/format";

function isLiveWindow(s: OpenF1Session | null): boolean {
  if (!s) return false;
  const start = new Date(s.date_start).getTime() - 30 * 60_000;
  const end = new Date(s.date_end).getTime() + 30 * 60_000;
  const now = Date.now();
  return now >= start && now <= end;
}

const FLAG_TONE: Record<string, string> = {
  GREEN: "text-gain border-gain/40",
  YELLOW: "text-amber border-amber/40",
  "DOUBLE YELLOW": "text-amber border-amber/40",
  RED: "text-f1 border-f1/50",
  CHEQUERED: "text-ink border-grid",
  CLEAR: "text-gain border-gain/40"
};

export function StatusBar({ session, flag, feedOk }: { session: OpenF1Session | null; flag: string | null; feedOk: boolean; }) {
  const [clock, setClock] = useState("--:--:-- UTC");
  useEffect(() => {
    const t = setInterval(() => setClock(utcClock(new Date())), 1000);
    setClock(utcClock(new Date()));
    return () => clearInterval(t);
  }, []);
  const live = isLiveWindow(session);
  const tone = flag ? FLAG_TONE[flag.toUpperCase()] ?? "text-ink-dim border-grid" : "text-ink-dim border-grid";
  return (
    <header className="flex h-9 shrink-0 items-center gap-3 border-b border-grid bg-void px-3 font-mono text-[10px] uppercase tracking-eyebrow text-ink-faint">
      <span className="font-display text-[13px] font-black tracking-[0.22em] text-ink">APEX</span>
      <span className="hidden sm:inline">Formula 1 Terminal</span>
      <span className="h-3 w-px bg-grid" />
      <span className={live ? "text-gain" : "text-ink-faint"}><span className={`mr-1 inline-block h-2 w-2 ${live ? "animate-livepulse bg-gain" : "bg-ink-faint"}`} />{live ? "LIVE" : "LATEST"}</span>
      <span className="hidden min-w-0 truncate md:inline">{session ? `${session.year} ${session.country_name} · ${session.session_name}` : "loading session"}</span>
      <span className={`ml-auto border px-2 py-1 ${tone}`}>{flag ?? "NO FLAG"}</span>
      <span className={feedOk ? "text-gain" : "text-amber"}>{feedOk ? "FEED OK" : "SYNC"}</span>
      <time className="text-ink-dim">{clock}</time>
    </header>
  );
}
