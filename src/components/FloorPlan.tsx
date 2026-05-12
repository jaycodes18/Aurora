import { m } from "framer-motion";
import { PageIntro } from "./PageIntro";
import { useDemo } from "../context/DemoContext";
import { rackZones } from "../lib/simulation";
import { useReducedMotion } from "../lib/useReducedMotion";
import { useLiveClock } from "../lib/useLiveClock";

function tempStyles(c: number): { box: string; text: string } {
  if (c < 20) return { box: "bg-cyan-950", text: "text-cyan-100" };
  if (c < 22) return { box: "bg-teal-900", text: "text-teal-50" };
  if (c < 24) return { box: "bg-teal-700", text: "text-white" };
  if (c < 26) return { box: "bg-amber-700", text: "text-amber-50" };
  return { box: "bg-orange-600", text: "text-white" };
}

export function FloorPlan() {
  const reduced = useReducedMotion();
  const now = useLiveClock(2500);
  const { appliedIds } = useDemo();
  const zones = rackZones(now, appliedIds);

  return (
    <div>
      <PageIntro index="/ 04" title="Thermal floor" eyebrow="Spatial view">
        Cool cyan toward warm amber — segment inlets update on a gentle timer so judges
        see motion without CFD exports.
      </PageIntro>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-wrap gap-4 text-[11px] font-medium uppercase tracking-wider text-zinc-500">
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-8 rounded-sm bg-cyan-950 ring-1 ring-cyan-700/50" /> Cool
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-8 rounded-sm bg-teal-700" /> Nominal
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-8 rounded-sm bg-amber-700" /> Warm
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-8 rounded-sm bg-orange-600" /> Hot
            </span>
          </div>
          <p className="font-mono text-[11px] text-zinc-600">Cold aisles vertical</p>
        </div>

        <div
          className="mt-10 grid max-w-3xl gap-1.5 sm:gap-2"
          style={{ gridTemplateColumns: "repeat(6, minmax(0, 1fr))" }}
        >
          {zones.map((z, i) => {
            const { box, text } = tempStyles(z.tempC);
            return (
              <m.div
                key={z.id}
                initial={reduced ? false : { opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: reduced ? 0 : i * 0.02, duration: 0.25 }}
                className={`flex aspect-square flex-col items-center justify-center rounded-lg ${box} ${text} shadow-inner ring-1 ring-black/20`}
              >
                <span className="text-[9px] font-medium uppercase tracking-wide opacity-90 sm:text-[10px]">
                  {z.label}
                </span>
                <span className="mt-1 font-mono text-[10px] tabular-nums sm:text-xs">
                  {z.tempC.toFixed(1)}°
                </span>
              </m.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
