import { Panel } from "@/components/Panel";
import type { OpenF1Session } from "@/lib/types";
import { formatDateRange } from "@/lib/format";

export function SessionHeader({ session }: { session: OpenF1Session | null }) {
  return (
    <Panel label="Session" right={session?.session_type ?? "sync"}>
      <div className="p-3"><h2 className="font-display text-2xl font-black uppercase leading-none text-ink">{session ? session.country_name : "Loading"}</h2><div className="mt-2 grid grid-cols-2 gap-2 font-mono text-xs text-ink-dim"><span>{session?.meeting_name ?? "—"}</span><span className="text-right">{session?.circuit_short_name ?? "—"}</span><span>{session?.session_name ?? "—"}</span><span className="text-right">{session ? formatDateRange(session.date_start, session.date_end) : "—"}</span></div></div>
    </Panel>
  );
}
