export function lapTime(seconds: number | null | undefined): string {
  if (seconds == null) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds - m * 60;
  return `${m}:${s.toFixed(3).padStart(6, "0")}`;
}
export function gap(v: number | string | null | undefined): string { if (v == null) return "—"; if (v === 0) return "LEADER"; return typeof v === "number" ? `+${v.toFixed(3)}` : String(v); }
export function shortInterval(v: number | string | null | undefined): string { if (v == null) return "—"; return typeof v === "number" ? `+${v.toFixed(3)}` : String(v); }
export function shortTime(iso: string): string { return new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" }); }
export function dateShort(iso: string): string { return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", timeZone: "UTC" }).toUpperCase(); }
export function formatDateRange(start: string, end: string): string { return `${dateShort(start)} · ${shortTime(start)}–${shortTime(end)} UTC`; }
export function utcClock(now: Date): string { return now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "UTC" }) + " UTC"; }
export function ensureHash(colour: string | null | undefined): string { if (!colour) return "#8A909B"; return colour.startsWith("#") ? colour : `#${colour}`; }
