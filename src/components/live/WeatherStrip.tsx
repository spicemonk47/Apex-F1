import type { OpenF1Weather } from "@/lib/types";

export function WeatherStrip({ w }: { w: OpenF1Weather | null }) {
  const cell = (label: string, value: string, tone = "text-ink") => <div className="flex flex-col items-center gap-0.5 px-1 py-2"><span className="eyebrow">{label}</span><span className={`num text-[13px] ${tone}`}>{value}</span></div>;
  const n = (v: number | null | undefined, suffix: string) => v == null ? "—" : `${Math.round(v)}${suffix}`;
  return <div className="grid grid-cols-4 divide-x divide-grid border border-grid bg-panel-2">{cell("TRACK", n(w?.track_temperature, "°"), "text-amber")}{cell("AIR", n(w?.air_temperature, "°"))}{cell("HUM", n(w?.humidity, "%"))}{cell("RAIN", w?.rainfall ? "YES" : "NO", w?.rainfall ? "text-info" : "text-ink-dim")}</div>;
}
