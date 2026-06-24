"use client";

import { useState } from "react";
import { StatusBar } from "@/components/StatusBar";
import { LiveBoard } from "@/components/live/LiveBoard";
import { ArchiveBoard } from "@/components/archive/ArchiveBoard";
import type { OpenF1Session } from "@/lib/types";

type Tab = "LIVE" | "ARCHIVE";

export default function Page() {
  const [tab, setTab] = useState<Tab>("LIVE");
  const [session, setSession] = useState<OpenF1Session | null>(null);
  const [flag, setFlag] = useState<string | null>(null);
  const [feedOk, setFeedOk] = useState<boolean>(false);

  return (
    <div className="flex h-dvh min-h-0 flex-col">
      <StatusBar session={session} flag={flag} feedOk={feedOk} />
      <nav role="tablist" aria-label="Terminal sections" className="flex border-b border-grid bg-panel">
        {(["LIVE", "ARCHIVE"] as Tab[]).map((t) => {
          const active = t === tab;
          return (
            <button key={t} role="tab" aria-selected={active} onClick={() => setTab(t)} className={`relative px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-eyebrow transition-colors ${active ? "text-ink" : "text-ink-faint hover:text-ink-dim"}`}>
              {t}
              {active && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-f1" aria-hidden />}
            </button>
          );
        })}
        <span className="ml-auto self-center pr-3 font-mono text-[10px] text-ink-faint">openf1 · jolpica</span>
      </nav>
      <main className="min-h-0 flex-1">
        {tab === "LIVE" ? <LiveBoard onSession={setSession} onFlag={setFlag} onFeed={setFeedOk} /> : <ArchiveBoard />}
      </main>
    </div>
  );
}
