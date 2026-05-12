import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { m } from "framer-motion";
import { PageIntro } from "./PageIntro";
import { useDemo } from "../context/DemoContext";
import {
  BASELINE_MONTHLY_COST_INR,
  ENTERPRISE_LICENSE_MONTHLY_INR,
  VAYU_LICENSE_MONTHLY_INR,
  monthlySeriesBaseline,
  monthlySeriesOptimized,
  projectedMonthlyCostInr,
} from "../lib/simulation";
import { useReducedMotion } from "../lib/useReducedMotion";

const GRID = "#3f3f46";
const AXIS = "#a1a1aa";
const BASELINE_STROKE = "#71717a";
const OPT_STROKE = "#2dd4bf";
const BAR_VAYU = "#14b8a6";
const BAR_OTHER = "#52525b";
const TOOLTIP_BG = "#18181b";
const TOOLTIP_BORDER = "#3f3f46";

function formatInrShort(n: number) {
  return `₹${(n / 100000).toFixed(1)}L`;
}

export function Analytics() {
  const reduced = useReducedMotion();
  const { appliedIds } = useDemo();
  const baseline = monthlySeriesBaseline();
  const optimized = monthlySeriesOptimized(appliedIds);
  const merged = baseline.map((b, i) => ({
    month: b.month,
    baselineKwh: b.kwh,
    optimizedKwh: optimized[i]?.kwh ?? b.kwh,
  }));

  const modeledBill = projectedMonthlyCostInr(appliedIds);
  const competitorTotal = modeledBill + ENTERPRISE_LICENSE_MONTHLY_INR;
  const vayuTotal = modeledBill + VAYU_LICENSE_MONTHLY_INR;

  const comparison = [
    { name: "Vayu + facility", value: vayuTotal, fill: BAR_VAYU },
    { name: "Enterprise + facility", value: competitorTotal, fill: BAR_OTHER },
  ];

  return (
    <div>
      <PageIntro index="/ 03" title="Energy economics" eyebrow="Charts">
        Baseline vs optimized load curves and illustrative license stacks — swap inputs
        after real quotes.
      </PageIntro>

      <div className="grid gap-8 lg:grid-cols-2">
        <m.section
          className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 sm:p-7"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="text-base font-semibold text-white">Monthly kWh</h2>
          <p className="mt-1 text-sm text-zinc-500">Baseline vs optimized trajectory.</p>
          <div className="mt-6 h-72 min-w-0 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={merged} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
                <CartesianGrid stroke={GRID} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="month" stroke={AXIS} tick={{ fill: AXIS, fontSize: 11 }} tickLine={false} axisLine={{ stroke: GRID }} />
                <YAxis stroke={AXIS} tick={{ fill: AXIS, fontSize: 11 }} tickLine={false} axisLine={{ stroke: GRID }} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: TOOLTIP_BG,
                    border: `1px solid ${TOOLTIP_BORDER}`,
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "#e4e4e7" }}
                  formatter={(value: number, name: string) => [
                    `${value.toLocaleString()} kWh`,
                    name === "baselineKwh" ? "Baseline" : "Optimized",
                  ]}
                />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                <Line type="monotone" dataKey="baselineKwh" name="Baseline" stroke={BASELINE_STROKE} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="optimizedKwh" name="Optimized" stroke={OPT_STROKE} strokeWidth={2} dot={false} activeDot={{ r: 5, fill: OPT_STROKE }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </m.section>

        <m.section
          className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 sm:p-7"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: reduced ? 0 : 0.08 }}
        >
          <h2 className="text-base font-semibold text-white">Monthly spend</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Facility {formatInrShort(modeledBill)} / mo · Reference facility{" "}
            {formatInrShort(BASELINE_MONTHLY_COST_INR)} / mo.
          </p>
          <div className="mt-6 h-72 min-w-0 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparison} layout="vertical" margin={{ left: 4, right: 16 }}>
                <CartesianGrid stroke={GRID} strokeDasharray="4 4" horizontal={false} />
                <XAxis type="number" stroke={AXIS} tick={{ fill: AXIS, fontSize: 10 }} tickFormatter={(v) => formatInrShort(v)} tickLine={false} axisLine={{ stroke: GRID }} />
                <YAxis type="category" dataKey="name" stroke={AXIS} width={148} tick={{ fill: AXIS, fontSize: 10 }} tickLine={false} axisLine={{ stroke: GRID }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: TOOLTIP_BG,
                    border: `1px solid ${TOOLTIP_BORDER}`,
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                  formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, "Total"]}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} animationDuration={reduced ? 0 : 600} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </m.section>
      </div>
    </div>
  );
}
