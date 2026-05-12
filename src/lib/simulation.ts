/** Deterministic demo physics — illustrative, not operational tuning advice. */

export type RackZone = {
  id: string;
  row: number;
  col: number;
  label: string;
  tempC: number;
};

export type Recommendation = {
  id: string;
  title: string;
  detail: string;
  estimatedDailySavingInr: number;
  pueDelta: number;
};

export const BASELINE_PUE = 1.48;
export const BASELINE_MONTHLY_KWH = 420_000;
export const BASELINE_MONTHLY_COST_INR = 4_620_000;

export const ENTERPRISE_LICENSE_MONTHLY_INR = 2_850_000;
export const VAYU_LICENSE_MONTHLY_INR = 185_000;

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

/** Smooth oscillation for live demo metrics */
export function oscillate(
  nowMs: number,
  phase: number,
  amplitude: number,
  center: number,
): number {
  const t = nowMs / 1000;
  return center + amplitude * Math.sin(t * 0.7 + phase);
}

export function effectivePue(appliedRecommendationIds: string[]): number {
  const recs = defaultRecommendations();
  let delta = 0;
  for (const id of appliedRecommendationIds) {
    const r = recs.find((x) => x.id === id);
    if (r) delta += r.pueDelta;
  }
  return clamp(BASELINE_PUE + delta, 1.12, BASELINE_PUE);
}

export function monthlyCoolingShare(): number {
  return 0.58;
}

export function projectedMonthlyCostInr(appliedRecommendationIds: string[]): number {
  const pue = effectivePue(appliedRecommendationIds);
  const coolingFrac = monthlyCoolingShare();
  const baselineCooling = BASELINE_MONTHLY_COST_INR * coolingFrac;
  const pueRatio = pue / BASELINE_PUE;
  const newCooling = baselineCooling * pueRatio;
  const other = BASELINE_MONTHLY_COST_INR * (1 - coolingFrac);
  return Math.round(other + newCooling);
}

export function carbonTonnesAvoidedMonthly(appliedRecommendationIds: string[]): number {
  const savedKwh =
    BASELINE_MONTHLY_KWH *
    monthlyCoolingShare() *
    (1 - effectivePue(appliedRecommendationIds) / BASELINE_PUE);
  const gridKgPerKwh = 0.713;
  return (savedKwh * gridKgPerKwh) / 1000;
}

export function rackZones(nowMs: number, appliedRecommendationIds: string[]): RackZone[] {
  const pueFactor = effectivePue(appliedRecommendationIds) / BASELINE_PUE;
  const zones: RackZone[] = [];
  let i = 0;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 6; col++) {
      const phase = row * 1.1 + col * 0.6;
      const base = 21 + oscillate(nowMs, phase, 2.2, 0);
      const hotspot = row === 2 && col >= 3 ? 2.4 : 0;
      const optimizedDrop = (1 - pueFactor) * 3.5;
      const tempC = clamp(base + hotspot - optimizedDrop, 17.5, 28);
      zones.push({
        id: `r${row}c${col}`,
        row,
        col,
        label: `R${row + 1}-${col + 1}`,
        tempC,
      });
      i++;
    }
  }
  return zones;
}

export function defaultRecommendations(): Recommendation[] {
  return [
    {
      id: "crac-setback",
      title: "Raise CRAC supply setpoint within ASHRAE envelope",
      detail:
        "Model suggests a 1.2°C coordinated setback across three CRAC strings while maintaining cold-aisle containment.",
      estimatedDailySavingInr: 118_000,
      pueDelta: -0.07,
    },
    {
      id: "vfd-fan-trim",
      title: "Trim CRAH fan curves during partial IT load",
      detail:
        "Align variable-frequency drives with measured rack inlet ΔT instead of fixed fan percentage.",
      estimatedDailySavingInr: 86_000,
      pueDelta: -0.05,
    },
    {
      id: "free-cooling-window",
      title: "Expand economizer window for night hours",
      detail:
        "Schedule mixing dampers to exploit wet-bulb dips in tier-2 climates without violating humidity bands.",
      estimatedDailySavingInr: 52_000,
      pueDelta: -0.03,
    },
  ];
}

export function monthlySeriesBaseline(): { month: string; kwh: number }[] {
  return [
    { month: "Jan", kwh: 398_000 },
    { month: "Feb", kwh: 405_000 },
    { month: "Mar", kwh: 418_000 },
    { month: "Apr", kwh: 428_000 },
    { month: "May", kwh: 441_000 },
    { month: "Jun", kwh: 436_000 },
  ];
}

export function monthlySeriesOptimized(appliedRecommendationIds: string[]): {
  month: string;
  kwh: number;
}[] {
  const ratio = effectivePue(appliedRecommendationIds) / BASELINE_PUE;
  return monthlySeriesBaseline().map((m) => ({
    ...m,
    kwh: Math.round(m.kwh * ratio),
  }));
}
