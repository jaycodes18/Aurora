import { Activity, Clapperboard, Cpu, Gauge, LayoutGrid, Presentation, Sparkles, Waves } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";
import { DemoProvider } from "./context/DemoContext";
import { Analytics } from "./components/Analytics";
import { Architecture } from "./components/Architecture";
import { FloorPlan } from "./components/FloorPlan";
import { GuidedDemo } from "./components/GuidedDemo";
import { Optimization } from "./components/Optimization";
import { Overview } from "./components/Overview";
import { Reports } from "./components/Reports";
import { TAB_ORDER, tabFromHash } from "./lib/tabOrder";
import { useReducedMotion } from "./lib/useReducedMotion";
import { useCallback, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { TabId } from "./tabIds";

export type { TabId };

const tabs: { id: TabId; label: string; icon: typeof Gauge }[] = [
  { id: "overview", label: "Overview", icon: Gauge },
  { id: "optimization", label: "Optimize", icon: Sparkles },
  { id: "analytics", label: "Energy", icon: Activity },
  { id: "floor", label: "Thermal", icon: LayoutGrid },
  { id: "architecture", label: "System", icon: Cpu },
  { id: "reports", label: "Reports", icon: Presentation },
];

function Shell({
  tab,
  setTab,
  demoOpen,
  setDemoOpen,
  reducedMotion,
}: {
  tab: TabId;
  setTab: (t: TabId) => void;
  demoOpen: boolean;
  setDemoOpen: Dispatch<SetStateAction<boolean>>;
  reducedMotion: boolean;
}) {
  const tDur = reducedMotion ? 0 : 0.28;

  const tabContent = () => {
    switch (tab) {
      case "overview":
        return <Overview />;
      case "optimization":
        return <Optimization />;
      case "analytics":
        return <Analytics />;
      case "floor":
        return <FloorPlan />;
      case "architecture":
        return <Architecture />;
      case "reports":
        return <Reports />;
      default:
        return null;
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="pointer-events-none fixed inset-0 border-grid-soft opacity-[0.35]" aria-hidden />

      <header className="sticky top-0 z-20 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-teal-500/40 bg-teal-500/10 shadow-glow">
              <Waves className="h-5 w-5 text-teal-400" aria-hidden />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-white">
                Vayu
              </h1>
              <p className="mt-0.5 text-xs text-zinc-500">
                Cooling intelligence · simulated telemetry
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setDemoOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-lg border border-teal-500/40 bg-teal-500/10 px-4 py-2 text-sm font-medium text-teal-300 transition hover:bg-teal-500/20 hover:shadow-glow"
            >
              <Clapperboard className="h-4 w-4 opacity-90" />
              {demoOpen ? "Hide tour" : "Guided tour"}
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
          <nav
            className="flex gap-1 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/60 p-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Main"
          >
            {tabs.map(({ id, label, icon: Icon }, i) => {
              const active = tab === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTab(id)}
                  className={`relative flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:px-4 ${
                    active
                      ? "text-white"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {active ? (
                    <m.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-zinc-800 shadow-inner border border-zinc-700/80"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : null}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className="h-4 w-4 opacity-80" />
                    <span>{label}</span>
                    <kbd className="hidden rounded bg-zinc-950 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 sm:inline">
                      {i + 1}
                    </kbd>
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <AnimatePresence mode="wait">
          <m.div
            key={tab}
            role="tabpanel"
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -14 }}
            transition={{ duration: tDur, ease: [0.22, 1, 0.36, 1] }}
          >
            {tabContent()}
          </m.div>
        </AnimatePresence>
      </main>

      <footer className="border-t border-zinc-800 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-center sm:flex-row sm:text-left sm:px-6 lg:px-8">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Vayu prototype · SMB India · Stage 2 demo
          </p>
          <p className="font-mono text-[11px] text-zinc-500">
            Keys <span className="text-teal-500/90">1–6</span> jump tabs ·{" "}
            <span className="text-teal-500/90">#optimization</span> deep links
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const reducedMotion = useReducedMotion();
  const [tab, setTabState] = useState<TabId>(() => tabFromHash(window.location.hash) ?? "overview");

  const setTab = useCallback((t: TabId) => {
    setTabState(t);
    window.history.replaceState(null, "", `#${t}`);
  }, []);

  useEffect(() => {
    const onHash = () => {
      const next = tabFromHash(window.location.hash);
      if (next) setTabState(next);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }
      const n = Number.parseInt(e.key, 10);
      if (n >= 1 && n <= TAB_ORDER.length) {
        setTab(TAB_ORDER[n - 1]!);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setTab]);

  const [demoOpen, setDemoOpen] = useState(() => {
    try {
      return sessionStorage.getItem("vayu-demo-dismissed") !== "1";
    } catch {
      return true;
    }
  });

  const handleDemoClose = useCallback(() => {
    try {
      sessionStorage.setItem("vayu-demo-dismissed", "1");
    } catch {
      /* ignore */
    }
    setDemoOpen(false);
  }, []);

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, "", `#${tab}`);
    }
  }, [tab]);

  return (
    <DemoProvider>
      <Shell
        tab={tab}
        setTab={setTab}
        demoOpen={demoOpen}
        setDemoOpen={setDemoOpen}
        reducedMotion={reducedMotion}
      />
      <GuidedDemo
        open={demoOpen}
        onClose={handleDemoClose}
        setTab={setTab}
        reducedMotion={reducedMotion}
      />
    </DemoProvider>
  );
}
