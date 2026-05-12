import { Check, Download } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import { PageIntro } from "./PageIntro";
import { useDemo } from "../context/DemoContext";
import {
  carbonTonnesAvoidedMonthly,
  effectivePue,
  projectedMonthlyCostInr,
} from "../lib/simulation";
import { useReducedMotion } from "../lib/useReducedMotion";

function formatInr(n: number) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

const SDG_STATEMENT = `Vayu advances UN Sustainable Development Goal 9 (Industry, Innovation and Infrastructure) by equipping small and medium data centers with affordable cooling optimization software that improves energy productivity without wholesale hardware replacement. In Indian tier 2 and tier 3 cities, digital infrastructure must scale responsibly; trimming cooling overhead preserves capital for compute upgrades while easing grid stress for neighboring consumers. Our roadmap ties impact to transparent metrics: cohort-average facility PUE improvements versus modeled baselines, verified INR savings on utility bills across pilot halls, and tonnes of CO₂ avoided using conservative grid emission factors—reported in customer-ready dossiers for enterprises and future Data Center Economic Zone partnerships.`;

export function Reports() {
  const reduced = useReducedMotion();
  const { appliedIds } = useDemo();
  const pue = effectivePue(appliedIds);
  const cost = projectedMonthlyCostInr(appliedIds);
  const co2 = carbonTonnesAvoidedMonthly(appliedIds);
  const baselineCost = projectedMonthlyCostInr([]);
  const saving = baselineCost - cost;

  const [exported, setExported] = useState(false);

  useEffect(() => {
    if (!exported) return;
    const t = window.setTimeout(() => setExported(false), 3200);
    return () => window.clearTimeout(t);
  }, [exported]);

  const handleExport = () => {
    const lines = [
      "Vayu — Efficiency snapshot (demo export)",
      `Timestamp (local): ${new Date().toISOString()}`,
      `Modeled PUE: ${pue.toFixed(3)}`,
      `Projected monthly utility (sim): ${formatInr(cost)}`,
      `Monthly cooling savings vs modeled baseline: ${formatInr(saving)}`,
      `CO₂ avoided vs baseline (grid avg.): ${co2.toFixed(2)} tonnes / month`,
      "",
      "SDG alignment (Stage 2 draft):",
      SDG_STATEMENT,
    ];
    const blob = new Blob([lines.join("\n")], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vayu-impact-summary.txt";
    a.click();
    URL.revokeObjectURL(url);
    setExported(true);
  };

  const words = SDG_STATEMENT.trim().split(/\s+/).length;

  return (
    <div className="relative">
      <PageIntro index="/ 06" title="Reports" eyebrow="Exports">
        Plain-text receipt plus SDG copy (~{words} words). Trim for organiser limits if
        needed.
      </PageIntro>

      <AnimatePresence>
        {exported ? (
          <m.div
            role="status"
            initial={reduced ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            className="fixed left-1/2 top-24 z-[60] flex -translate-x-1/2 items-center gap-3 rounded-xl border border-teal-500/40 bg-zinc-900 px-5 py-3 shadow-panel ring-1 ring-teal-500/20"
          >
            <Check className="h-5 w-5 text-teal-400" aria-hidden />
            <span className="text-sm font-medium text-white">download started — check your files folder</span>
          </m.div>
        ) : null}
      </AnimatePresence>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-white">Impact snapshot</h2>
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-teal-400 hover:shadow-glow"
          >
            <Download className="h-4 w-4" />
            Download .txt
          </button>
        </div>
        <dl className="mt-10 grid gap-8 sm:grid-cols-2">
          {[
            ["Modeled PUE", pue.toFixed(3)],
            ["Monthly utility (sim)", formatInr(cost)],
            ["Cooling savings vs baseline", formatInr(saving)],
            ["CO₂ avoided (modeled)", `${co2.toFixed(2)} t / mo`],
          ].map(([label, val]) => (
            <div key={label} className="border-t border-zinc-800 pt-8">
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                {label}
              </dt>
              <dd className="mt-3 font-mono text-xl tabular-nums text-teal-300">{val}</dd>
            </div>
          ))}
        </dl>
      </div>

      <article className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/25 p-6 sm:p-8">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          SDG alignment (draft)
        </h2>
        <p className="mt-6 max-w-3xl text-[15px] leading-[1.75] text-zinc-400">{SDG_STATEMENT}</p>
      </article>
    </div>
  );
}
