import type { ReactNode } from "react";
import { m } from "framer-motion";
import { useReducedMotion } from "../lib/useReducedMotion";

type PageIntroProps = {
  index: string;
  title: string;
  eyebrow: string;
  children: ReactNode;
};

export function PageIntro({ index, title, eyebrow, children }: PageIntroProps) {
  const reduced = useReducedMotion();

  return (
    <m.section
      className="mb-10 lg:mb-12"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="mb-3 font-mono text-[11px] tabular-nums text-teal-500/80">{index}</p>
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h1>
      <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
        {eyebrow}
      </p>
      <div className="mt-5 max-w-2xl text-[15px] leading-relaxed text-zinc-400">{children}</div>
    </m.section>
  );
}
