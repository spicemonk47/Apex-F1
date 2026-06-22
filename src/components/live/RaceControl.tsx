import { Panel } from "@/components/Panel";
import type { OpenF1RaceControl } from "@/lib/types";
import { shortTime } from "@/lib/format";

const FLAG_COLOUR: Record<string, string> = {
  GREEN: "text-gain",
  YELLOW: "text-amber",
  RED: "text-f1",
  CHEQUERED: "text-ink"
};

export function RaceControl({ messages }: { messages: OpenF1RaceControl[] }) {
  return (
    <Panel label="Race Control" right={`${messages.length} msgs`} bodyClassName="overflow-auto">
      <div className="divide-y divide-grid">
        {messages.length === 0 ? (
          <div className="p-3 text-sm text-ink-faint">Waiting for race-control feed…</div>
        ) : messages.map((m, i) => (
          <article key={`${m.date}-${i}`} className="grid grid-cols-[70px_1fr] gap-2 p-3 text-xs">
            <time className="num text-ink-faint">{shortTime(m.date)}</time>
            <div>
              <div className="font-mono uppercase tracking-eyebrow text-ink-faint">
                {m.category} {m.flag && <span className={FLAG_COLOUR[m.flag] ?? "text-ink"}>· {m.flag}</span>}
              </div>
              <p className="mt-1 text-sm leading-snug text-ink-dim">{m.message}</p>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}
