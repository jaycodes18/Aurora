import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  X,
} from "lucide-react";
import { AnimatePresence, m } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import type { TabId } from "../tabIds";

export type DemoStep = {
  tab: TabId;
  title: string;
  body: string;
};

const STEPS: DemoStep[] = [
  {
    tab: "overview",
    title: "Operations pulse",
    body:
      "Live PUE, INR projections, and IT vs cooling split — plus proactive notices when the envelope drifts.",
  },
  {
    tab: "floor",
    title: "Thermal intuition",
    body:
      "Each tile is a containment segment. Cool cyan shifts toward amber as load concentrates.",
  },
  {
    tab: "optimization",
    title: "Apply intelligence",
    body:
      "Toggle HVAC policies and watch savings reconcile instantly — your pitch-friendly sandbox.",
  },
  {
    tab: "analytics",
    title: "Finance-grade charts",
    body:
      "Energy curves and illustrative license stacks ready for diligence slides.",
  },
  {
    tab: "architecture",
    title: "Integration reality",
    body:
      "Edge ingest, cloud optimize, audited APIs — software layered over mechanical assets you already own.",
  },
  {
    tab: "reports",
    title: "Evidence on demand",
    body:
      "One-click plaintext export plus SDG narrative for submission portals.",
  },
];

type GuidedDemoProps = {
  open: boolean;
  onClose: () => void;
  setTab: (t: TabId) => void;
  reducedMotion: boolean;
};

export function GuidedDemo({ open, onClose, setTab, reducedMotion }: GuidedDemoProps) {
  const [step, setStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  const syncTab = useCallback(
    (index: number) => {
      const s = STEPS[index];
      if (s) setTab(s.tab);
    },
    [setTab],
  );

  useEffect(() => {
    if (!open) return;
    syncTab(step);
  }, [open, step, syncTab]);

  useEffect(() => {
    if (!open || !autoPlay) return;
    const id = window.setInterval(() => {
      setStep((prev) => (prev >= STEPS.length - 1 ? 0 : prev + 1));
    }, 5200);
    return () => window.clearInterval(id);
  }, [open, autoPlay]);

  useEffect(() => {
    if (!open) {
      setAutoPlay(false);
      setStep(0);
    }
  }, [open]);

  const go = (delta: number) => {
    setStep((prev) =>
      Math.min(STEPS.length - 1, Math.max(0, prev + delta)),
    );
    setAutoPlay(false);
  };

  const content = STEPS[step];

  return (
    <AnimatePresence>
      {open ? (
        <>
          <m.button
            type="button"
            aria-label="Dismiss tour backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center p-4 sm:justify-end sm:p-8">
            <m.div
              role="dialog"
              aria-labelledby="demo-title"
              aria-describedby="demo-body"
              initial={reducedMotion ? false : { opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: 24, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="pointer-events-auto w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900 shadow-panel ring-1 ring-teal-500/15"
            >
              <div className="flex items-center justify-between gap-4 border-b border-zinc-800 px-5 py-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-400/90">
                  Guided tour · {step + 1}/{STEPS.length}
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-800 hover:text-white"
                  aria-label="Close tour"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="px-5 py-6">
                <h2 id="demo-title" className="text-xl font-semibold text-white">
                  {content?.title}
                </h2>
                <p id="demo-body" className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {content?.body}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-800 px-5 py-4">
                <div className="flex gap-1.5">
                  {STEPS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Step ${i + 1}`}
                      onClick={() => {
                        setStep(i);
                        setAutoPlay(false);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === step ? "w-8 bg-teal-400" : "w-2 bg-zinc-700 hover:bg-zinc-600"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setAutoPlay((a) => !a)}
                    className="flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 hover:border-teal-500/40 hover:text-teal-300"
                  >
                    {autoPlay ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                    {autoPlay ? "Pause" : "Auto"}
                  </button>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    disabled={step === 0}
                    className="flex items-center gap-1 rounded-lg border border-zinc-600 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-200 disabled:opacity-30"
                  >
                    <ChevronLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    disabled={step >= STEPS.length - 1}
                    className="flex items-center gap-1 rounded-lg bg-teal-500 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-950 disabled:opacity-30 hover:bg-teal-400"
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </m.div>
          </div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
