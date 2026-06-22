const seasons = [2026, 2025, 2024, 2023, 2022, 2021];
const drivers = [
  ["1", "VER", "Max Verstappen", "Red Bull", "#3671C6", "437"],
  ["4", "NOR", "Lando Norris", "McLaren", "#FF8000", "374"],
  ["16", "LEC", "Charles Leclerc", "Ferrari", "#E80020", "356"],
  ["81", "PIA", "Oscar Piastri", "McLaren", "#FF8000", "292"],
  ["55", "SAI", "Carlos Sainz", "Ferrari", "#E80020", "290"]
];
const races = ["Bahrain", "Jeddah", "Melbourne", "Suzuka", "Monaco", "Silverstone", "Spa", "Monza"];

export default function Page() {
  return (
    <main className="min-h-screen bg-void text-ink font-body">
      <div className="border-b border-grid bg-panel px-4 py-2 font-mono text-[11px] uppercase tracking-eyebrow text-ink-dim">
        APEX Terminal · OpenF1 · Jolpica · Static GitHub Pages Build
      </div>
      <section className="mx-auto grid max-w-7xl gap-4 p-4 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="border border-grid bg-panel">
          <header className="border-b border-grid bg-panel-2 p-4">
            <p className="eyebrow">Live Timing Tower</p>
            <h1 className="mt-2 font-display text-4xl font-black uppercase tracking-tight text-ink md:text-6xl">
              APEX Formula 1 Terminal
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-ink-dim">
              A Bloomberg-style F1 command center for live timing, tyres, weather, race control, and championship archive views.
            </p>
          </header>
          <div className="divide-y divide-grid">
            {drivers.map(([number, code, name, team, colour, points], index) => (
              <div key={code} className="grid grid-cols-[42px_70px_1fr_120px_80px] items-center gap-3 px-4 py-3 font-mono text-sm hover:bg-panel-2">
                <span className="num text-ink-faint">P{index + 1}</span>
                <span className="font-bold text-ink" style={{ borderLeft: `4px solid ${colour}`, paddingLeft: 10 }}>{code}</span>
                <span className="font-body text-ink">{name}</span>
                <span className="text-ink-dim">{team}</span>
                <span className="num text-right text-gain">{points}</span>
              </div>
            ))}
          </div>
        </div>
        <aside className="grid gap-4">
          <div className="border border-grid bg-panel p-4">
            <p className="eyebrow">Session Status</p>
            <div className="mt-4 grid grid-cols-2 gap-3 font-mono text-xs">
              <span className="border border-gain/40 p-3 text-gain">GREEN FLAG</span>
              <span className="border border-grid p-3 text-ink-dim">UTC CLOCK</span>
              <span className="border border-fastest/40 p-3 text-fastest">FASTEST LAP</span>
              <span className="border border-amber/40 p-3 text-amber">TYRE DATA</span>
            </div>
          </div>
          <div className="border border-grid bg-panel p-4">
            <p className="eyebrow">Season Archive</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {seasons.map((season) => <span key={season} className="border border-grid px-3 py-2 font-mono text-xs text-ink-dim">{season}</span>)}
            </div>
          </div>
          <div className="border border-grid bg-panel p-4">
            <p className="eyebrow">Calendar</p>
            <div className="mt-4 grid gap-2 font-mono text-xs text-ink-dim">
              {races.map((race, index) => <div key={race} className="flex justify-between border-b border-grid pb-2"><span>R{index + 1}</span><span>{race}</span></div>)}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
