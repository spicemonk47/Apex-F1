"use client";

import { useMemo, useState } from "react";
import { Panel } from "@/components/Panel";
import { SEASONS, getConstructorStandings, getDriverStandings, getSchedule } from "@/lib/jolpica";
import type { ConstructorStanding, DriverStanding, RaceSchedule } from "@/lib/types";
import { usePoll } from "@/hooks/usePoll";
import { StandingsTable } from "./StandingsTable";
import { ScheduleTable } from "./ScheduleTable";

type Mode = "DRIVERS" | "CONSTRUCTORS";

export function ArchiveBoard() {
  const [season, setSeason] = useState(SEASONS[0]);
  const [mode, setMode] = useState<Mode>("DRIVERS");
  const [drivers, setDrivers] = useState<DriverStanding[]>([]);
  const [constructors, setConstructors] = useState<ConstructorStanding[]>([]);
  const [schedule, setSchedule] = useState<RaceSchedule[]>([]);

  usePoll(async () => {
    const [d, c, s] = await Promise.all([
      getDriverStandings(season),
      getConstructorStandings(season),
      getSchedule(season)
    ]);
    setDrivers(d);
    setConstructors(c);
    setSchedule(s);
  }, 60 * 60_000, [season]);

  const yearOptions = useMemo(() => SEASONS.slice(0, 20), []);

  return (
    <div className="grid h-full min-h-0 gap-3 p-3 lg:grid-cols-[260px_minmax(0,1fr)_420px]">
      <Panel label="Season" right="1950 → now">
        <div className="flex h-full flex-col gap-3 p-3">
          <select value={season} onChange={(e) => setSeason(Number(e.target.value))} className="border border-grid bg-panel-2 p-2 font-mono text-sm text-ink">
            {yearOptions.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
          <div className="grid grid-cols-2 gap-2">
            {(["DRIVERS", "CONSTRUCTORS"] as Mode[]).map((m) => <button key={m} onClick={() => setMode(m)} className={`border px-2 py-2 font-mono text-[10px] ${mode === m ? "border-f1 text-ink" : "border-grid text-ink-faint"}`}>{m}</button>)}
          </div>
          <div className="mt-auto border-t border-grid pt-3 font-mono text-xs text-ink-faint">
            {schedule.length} races · {drivers.length || constructors.length} classified
          </div>
        </div>
      </Panel>
      <Panel label={`${season} ${mode.toLowerCase()} standings`} right="archive" bodyClassName="overflow-auto">
        <StandingsTable mode={mode} drivers={drivers} constructors={constructors} />
      </Panel>
      <Panel label="Calendar" right={`${schedule.length} rounds`} bodyClassName="overflow-auto">
        <ScheduleTable races={schedule} />
      </Panel>
    </div>
  );
}
