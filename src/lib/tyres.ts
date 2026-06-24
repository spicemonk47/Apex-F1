export interface Tyre { label: string; name: string; colour: string; }
const TYRES: Record<string, Tyre> = { SOFT: { label: "S", name: "Soft", colour: "#E10600" }, MEDIUM: { label: "M", name: "Medium", colour: "#FFD12E" }, HARD: { label: "H", name: "Hard", colour: "#F0F0F0" }, INTERMEDIATE: { label: "I", name: "Intermediate", colour: "#2BD576" }, WET: { label: "W", name: "Wet", colour: "#36C5F0" } };
const UNKNOWN: Tyre = { label: "·", name: "Unknown", colour: "#565C66" };
export function tyre(compound: string | null | undefined): Tyre { if (!compound) return UNKNOWN; return TYRES[compound.toUpperCase()] ?? UNKNOWN; }
export const TYRE_LEGEND: Tyre[] = [TYRES.SOFT, TYRES.MEDIUM, TYRES.HARD, TYRES.INTERMEDIATE, TYRES.WET];
