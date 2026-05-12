import { Check, RotateCcw } from "lucide-react";
import { LayoutGroup, m } from "framer-motion";
import { PageIntro } from "./PageIntro";
import { useDemo } from "../context/DemoContext";
import {
  carbonTonnesAvoidedMonthly,
  defaultRecommendations,
  effectivePue,
  projectedMonthlyCostInr,
} from "../lib/simulation";
import { useReducedMotion } from "../lib/useReducedMotion";

function formatInr(n: number) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

export function Optimization() {
  const reduced = useReducedMotion();
  const { appliedIds, toggleApplied } = useDemo();
  const recs = defaultRecommendations();
  const pue = effectivePue(appliedIds);
  const baselineCost = projectedMonthlyCostInr([]);
  const currentCost = projectedMonthlyCostInr(appliedIds);
  const monthlySaving = baselineCost - currentCost;
  const co2 = carbonTonnesAvoidedMonthly(appliedIds);

  return (
    <div>
      <PageIntro index="/ 02" title="Optimization" eyebrow="AI workspace">
        Toggle recommendations to see modeled PUE, rupees, and carbon respond — your
        sandbox twin for customer pilots.
      </PageIntro>

      <LayoutGroup>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <m.aside
            className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 lg:col-span-4 lg:p-8"
            layout
            transition={{ duration: reduced ? 0 : 0.25 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Impact snapshot
            </p>
            <dl className="mt-8 space-y-6 font-mono text-sm">
              <div className="flex justify-between gap-4 border-b border-zinc-800 pb-5">
                <dt className="text-zinc-500">PUE</dt>
                <dd className="tabular-nums text-teal-400">{pue.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-zinc-800 pb-5">
                <dt className="text-zinc-500">Bill (sim)</dt>
                <dd className="tabular-nums text-white">{formatInr(currentCost)}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-zinc-800 pb-5">
                <dt className="text-zinc-500">Savings / mo</dt>
                <dd className="tabular-nums text-teal-300">
                  {monthlySaving > 0 ? formatInr(monthlySaving) : "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">CO₂ avoided</dt>
                <dd className="tabular-nums text-zinc-300">{co2.toFixed(1)} t</dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={() =>
                recs.forEach((r) => {
                  if (!appliedIds.includes(r.id)) toggleApplied(r.id);
                })
              }
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-teal-400 hover:shadow-glow"
            >
              <Check className="h-4 w-4" />
              Apply all safe
            </button>
            <button
              type="button"
              onClick={() => appliedIds.forEach((id) => toggleApplied(id))}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 py-3 text-sm font-medium text-zinc-400 transition hover:border-zinc-500 hover:text-white"
            >
              <RotateCcw className="h-4 w-4" />
              Reset scenario
            </button>
          </m.aside>

          <ul className="space-y-4 lg:col-span-8">
            {recs.map((r) => {
              const on = appliedIds.includes(r.id);
              return (
                <m.li
                  key={r.id}
                  layout
                  transition={{ duration: reduced ? 0 : 0.22 }}
                  className={`rounded-2xl border p-6 transition-colors duration-300 sm:p-7 ${
                    on
                      ? "border-teal-500/40 bg-teal-500/5 shadow-glow"
                      : "border-zinc-800 bg-zinc-900/25 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                    <div className="max-w-xl">
                      <h2 className="text-lg font-semibold text-white">{r.title}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{r.detail}</p>
                      <p className="mt-4 font-mono text-xs text-zinc-500">
                        ΔPUE {r.pueDelta.toFixed(2)} · ~{formatInr(r.estimatedDailySavingInr)}{" "}
                        / day
                      </p>
                    </div>
                    <m.button
                      type="button"
                      layout
                      onClick={() => toggleApplied(r.id)}
                      whileTap={reduced ? undefined : { scale: 0.97 }}
                      className={`shrink-0 rounded-xl px-6 py-2.5 text-sm font-semibold transition ${
                        on
                          ? "bg-teal-500/20 text-teal-300 ring-1 ring-teal-500/40"
                          : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                      }`}
                    >
                      {on ? "Applied" : "Apply"}
                    </m.button>
                  </div>
                </m.li>
              );
            })}
          </ul>
        </div>
      </LayoutGroup>
    </div>
  );
}
