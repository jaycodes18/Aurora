import { AlertTriangle, Droplets, Zap } from "lucide-react";
import { m } from "framer-motion";
import { PageIntro } from "./PageIntro";
import { useDemo } from "../context/DemoContext";
import {
  BASELINE_PUE,
  effectivePue,
  oscillate,
  projectedMonthlyCostInr,
  rackZones,
} from "../lib/simulation";
import { useReducedMotion } from "../lib/useReducedMotion";
import { useLiveClock } from "../lib/useLiveClock";

function formatInr(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Overview() {
  const reduced = useReducedMotion();
  const now = useLiveClock();
  const { appliedIds } = useDemo();
  const pue = effectivePue(appliedIds);
  const cost = projectedMonthlyCostInr(appliedIds);
  const zones = rackZones(now, appliedIds);
  const maxT = Math.max(...zones.map((z) => z.tempC));
  const minT = Math.min(...zones.map((z) => z.tempC));
  const hotspot = maxT > 26.5;

  const itKw = Math.round(oscillate(now, 0, 120, 980));
  const coolKw = Math.round(itKw * (pue - 1));

  const metrics = [
    {
      label: "Live PUE (simulated)",
      value: pue.toFixed(2),
      hint: `Baseline modeled at ${BASELINE_PUE.toFixed(2)}.`,
      accent: true,
    },
    {
      label: "Projected monthly utility",
      value: formatInr(cost),
      hint: "Cooling ~58% of facility energy (illustrative).",
    },
    {
      label: "IT load (estimated)",
      value: `${itKw} kW`,
      hint: `Cooling overhead ~${coolKw} kW at current PUE.`,
      icon: Zap,
    },
    {
      label: "Rack inlet spread",
      value: `${minT.toFixed(1)}–${maxT.toFixed(1)}°C`,
      hint: "Synthetic gradients for demo.",
      icon: Droplets,
    },
  ];

  return (
    <div>
      <PageIntro index="/ 01" title="Operations" eyebrow="Live dashboard">
        Vayu reads BMS and DCIM telemetry, forecasts thermal risk, and proposes HVAC
        setpoints inside safe inlet bands — for operators without enterprise DCIM
        budgets.
      </PageIntro>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((mrow, i) => (
          <m.article
            key={mrow.label}
            custom={i}
            variants={reduced ? undefined : cardVariants}
            initial={reduced ? false : "hidden"}
            animate="show"
            className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition-colors duration-300 hover:border-teal-500/35 hover:shadow-glow"
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-teal-500/5 blur-2xl transition-opacity group-hover:opacity-100" />
            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-zinc-500">
              {mrow.icon ? (
                <mrow.icon className="h-3.5 w-3.5 text-teal-500/70" aria-hidden />
              ) : null}
              {mrow.label}
            </div>
            <p
              className={`mt-4 font-mono text-3xl font-semibold tabular-nums tracking-tight sm:text-[2rem] ${
                mrow.accent ? "text-gradient-accent" : "text-white"
              }`}
            >
              {mrow.value}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">{mrow.hint}</p>
          </m.article>
        ))}
      </div>

      <m.section
        className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 sm:p-8"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduced ? 0 : 0.25, duration: 0.35 }}
      >
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Notices
          </h2>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
          </span>
        </div>
        <ul className="mt-6 space-y-5">
          {hotspot ? (
            <li className="flex gap-4 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" aria-hidden />
              <p className="text-sm leading-relaxed text-zinc-300">
                Elevated rack inlet temperatures on the east aisle. Open{" "}
                <strong className="text-white">Optimize</strong> to apply queued fan
                trims.
              </p>
            </li>
          ) : (
            <li className="flex gap-3 text-sm leading-relaxed text-zinc-400">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(45,212,191,0.7)]" />
              Thermal envelope stable. Scanning economizer windows for tonight&apos;s
              forecast.
            </li>
          )}
          <li className="flex gap-3 text-sm leading-relaxed text-zinc-500">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
            Batch latency modeled ~90s (demo assumption).
          </li>
        </ul>
      </m.section>
    </div>
  );
}
