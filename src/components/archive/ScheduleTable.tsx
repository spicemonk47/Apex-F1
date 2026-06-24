import type { RaceSchedule } from "@/lib/types";
import { dateShort } from "@/lib/format";

export function ScheduleTable({ races }: { races: RaceSchedule[] }) {
  if (races.length === 0) return <div className="p-4 text-sm text-ink-faint">Loading calendar…</div>;
  return (
    <div className="divide-y divide-grid">
      {races.map((r) => (
        <article key={r.round} className="grid grid-cols-[44px_1fr] gap-3 p-3">
          <div className="num text-lg font-bold text-ink-faint">R{r.round}</div>
          <div>
            <h3 className="font-display text-lg font-bold uppercase leading-none text-ink">{r.raceName}</h3>
            <div className="mt-1 flex justify-between gap-3 font-mono text-xs text-ink-faint">
              <span>{r.Circuit.circuitName}</span>
              <time>{dateShort(r.date)}</time>
            </div>
            <p className="mt-1 text-xs text-ink-dim">{r.Circuit.Location.locality}, {r.Circuit.Location.country}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
