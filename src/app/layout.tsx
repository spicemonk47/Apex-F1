import type { Metadata } from "next";
import { Titillium_Web, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const display = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-display"
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono"
});
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "APEX — Formula 1 Terminal",
  description:
    "A Bloomberg-style terminal for Formula 1: live timing, telemetry and weather alongside the full championship archive back to 1950.",
  icons: { icon: "/favicon.svg" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} ${body.variable}`}>
      <body className="bg-void text-ink font-body antialiased">{children}</body>
    </html>
  );
}
