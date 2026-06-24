import type { ConstructorStanding, DriverStanding } from "@/lib/types";
import { teamColour } from "@/lib/teams";

type Mode = "DRIVERS" | "CONSTRUCTORS";

export function StandingsTable({ mode, drivers, constructors }: { mode: Mode; drivers: DriverStanding[]; constructors: ConstructorStanding[]; }) {
  const max = Math.max(...(mode === "DRIVERS" ? drivers.map((d) => Number(d.points)) : constructors.map((c) => Number(c.points))), 1);
  const rows = mode === "DRIVERS" ? drivers.map((d) => ({ pos: d.position, code: d.Driver.code ?? d.Driver.familyName.slice(0, 3).toUpperCase(), name: `${d.Driver.givenName} ${d.Driver.familyName}`, sub: d.Constructors.map((c) => c.name).join(" / "), points: d.points, wins: d.wins, colour: teamColour(d.Constructors[0]?.constructorId) })) : constructors.map((c) => ({ pos: c.position, code: c.Constructor.name.slice(0, 3).toUpperCase(), name: c.Constructor.name, sub: c.Constructor.nationality, points: c.points, wins: c.wins, colour: teamColour(c.Constructor.constructorId) }));
  if (rows.length === 0) return <div className="p-4 text-sm text-ink-faint">Loading standings…</div>;
  return (
    <table className="w-full border-collapse">
      <thead className="sticky top-0 bg-panel-2"><tr>{["POS", "", mode === "DRIVERS" ? "DRIVER" : "TEAM", "PTS", "WINS"].map((h, i) => <th key={i} className={`border-b border-grid px-3 py-2 font-mono text-[10px] uppercase tracking-eyebrow text-ink-faint ${i >= 3 ? "text-right" : "text-left"}`}>{h}</th>)}</tr></thead>
      <tbody>{rows.map((r) => <tr key={`${r.pos}-${r.name}`} className="border-b border-grid/70 hover:bg-panel-2"><td className="relative px-3 py-2"><span className="absolute left-0 top-0 h-full w-[3px]" style={{ background: r.colour }} /><span className="num font-bold text-ink">{r.pos}</span></td><td className="px-2 font-display font-bold text-ink">{r.code}</td><td className="px-3 py-2"><div className="font-medium text-ink">{r.name}</div><div className="font-mono text-[10px] text-ink-faint">{r.sub}</div><div className="mt-1 h-1 bg-grid"><div className="h-full" style={{ width: `${(Number(r.points) / max) * 100}%`, background: r.colour }} /></div></td><td className="num px-3 text-right text-gain">{r.points}</td><td className="num px-3 text-right text-ink-dim">{r.wins}</td></tr>)}</tbody>
    </table>
  );
}
