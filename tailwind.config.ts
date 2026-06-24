import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#08090B",
        panel: "#101216",
        "panel-2": "#15181D",
        grid: "#20242B",
        ink: "#E6E8EC",
        "ink-dim": "#8A909B",
        "ink-faint": "#565C66",
        f1: "#E10600",
        amber: "#FFB020",
        gain: "#2BD576",
        fastest: "#B26BFF",
        info: "#36C5F0"
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      },
      letterSpacing: { eyebrow: "0.18em" },
      keyframes: { livepulse: { "0%, 100%": { opacity: "1", transform: "scale(1)" }, "50%": { opacity: "0.35", transform: "scale(0.82)" } }, flashin: { "0%": { backgroundColor: "rgba(54,197,240,0.16)" }, "100%": { backgroundColor: "transparent" } } },
      animation: { livepulse: "livepulse 1.4s ease-in-out infinite", flashin: "flashin 0.9s ease-out" }
    }
  },
  plugins: []
};

export default config;
