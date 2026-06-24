"use client";

import { useEffect, useMemo, useState } from "react";
import { Panel } from "@/components/Panel";
import { getDrivers, getIntervals, getLaps, getLatestSession, getPositions, getRaceControl, getStints, getWeather, buildTower } from "@/lib/openf1";
import type { OpenF1RaceControl, OpenF1Session, OpenF1Weather, TowerRow } from "@/lib/types";
import { usePoll } from "@/hooks/usePoll";
import { TimingTower } from "./TimingTower";
import { SessionHeader } from "./SessionHeader";
import { WeatherStrip } from "./WeatherStrip";
import { RaceControl } from "./RaceControl";
import { TYRE_LEGEND } from "@/lib/tyres";

export function LiveBoard({ onSession, onFlag, onFeed }: { onSession: (s: OpenF1Session | null) => void; onFlag: (f: string | null) => void; onFeed: (ok: boolean) => void; }) {
  const [session, setSession] = useState<OpenF1Session | null>(null);
  const [tower, setTower] = useState<TowerRow[]>([]);
  const [weather, setWeather] = useState<OpenF1Weather | null>(null);
  const [raceControl, setRaceControl] = useState<OpenF1RaceControl[]>([]);
  const [error, setError] = useState<string | null>(null);
  usePoll(async () => { const s = await getLatestSession(); setSession(s); onSession(s); }, 30_000, []);
  usePoll(async () => { try { const [drivers, positions, intervals, laps, stints] = await Promise.all([getDrivers(), getPositions(), getIntervals(), getLaps(), getStints()]); setTower(buildTower(drivers, positions, intervals, laps, stints)); setError(null); onFeed(true); } catch (e) { setError("feed issue"); onFeed(false); } }, 5_000, []);
  usePoll(async () => setWeather(await getWeather()), 30_000, []);
  usePoll(async () => { const rc = await getRaceControl(); setRaceControl(rc.slice(-12).reverse()); }, 8_000, []);
  useEffect(() => { onFlag(raceControl.find((m) => m.flag)?.flag ?? null); }, [raceControl, onFlag]);
  const fastest = useMemo(() => { const laps = tower.map((r) => r.last_lap).filter((n): n is number => typeof n === "number" && n > 0); return laps.length ? Math.min(...laps) : null; }, [tower]);
  return (
    <div className="grid h-full min-h-0 gap-3 p-3 lg:grid-cols-[minmax(0,1fr)_360px]">
      <Panel label="Timing Tower" right={error ?? `${tower.length} cars`} bodyClassName="overflow-auto"><TimingTower rows={tower} fastestLap={fastest} /></Panel>
      <div className="grid min-h-0 gap-3 lg:grid-rows-[auto_auto_1fr]">
        <SessionHeader session={session} />
        <Panel label="Tyres / Weather" right="live feed"><div className="space-y-4 p-3"><div className="grid grid-cols-5 gap-2">{TYRE_LEGEND.map((t) => <div key={t.name} className="border border-grid p-2 text-center font-mono text-xs"><span className="mx-auto mb-1 block h-3 w-3 rounded-full" style={{ background: t.colour }} />{t.label}</div>)}</div><WeatherStrip w={weather} /></div></Panel>
        <RaceControl messages={raceControl} />
      </div>
    </div>
  );
}
