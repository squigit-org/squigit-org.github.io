import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { SparklesIcon } from "@/src/components/icons";
import { ScribbleWord } from "@/src/components/ScribbleWord";

export function QuoteSection({ quote, index }: { quote: string; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: false, amount: 0.35 });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[95vh] items-center justify-center px-6 py-24"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-[8%] top-[18%] h-44 w-44 rounded-full border border-cyan-400/30 blur-[1px]"
          animate={{ rotate: 360, scale: isInView ? 1.08 : 0.96 }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.8 },
          }}
        />
        <motion.div
          className="absolute bottom-[16%] right-[10%] h-56 w-56 rounded-full border border-violet-500/30"
          animate={{ rotate: -360, scale: isInView ? 1 : 0.9 }}
          transition={{
            rotate: { duration: 24, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.8 },
          }}
        />
        <motion.svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1200 700"
          fill="none"
          preserveAspectRatio="none"
          initial={false}
        >
          <motion.path
            d={
              index % 2 === 0
                ? "M60 350 C 240 90, 430 120, 600 350 S 980 600, 1140 340"
                : "M80 270 C 240 520, 440 570, 620 330 S 930 60, 1130 310"
            }
            stroke="url(#sectionGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            className="opacity-40"
            initial={{ pathLength: 0.15, pathOffset: 1 }}
            animate={{ pathLength: [0.15, 0.35, 0.15], pathOffset: [1, 0, -1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <defs>
            <linearGradient id="sectionGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-700 shadow-sm backdrop-blur">
          <SparklesIcon className="h-4 w-4" />
          Scroll-triggered scribble text
        </div>
        <ScribbleWord
          text={quote}
          className="text-5xl font-semibold tracking-[-0.05em] text-slate-950 md:text-7xl lg:text-8xl"
        />
      </div>
    </section>
  );
}
