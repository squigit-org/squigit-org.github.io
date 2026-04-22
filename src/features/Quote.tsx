import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { SparklesIcon } from "@/src/components/icons";
import { ScribbleWord } from "@/src/components/ui/ScribbleWord";

export function Quote({ quote, index }: { quote: string; index: number }) {
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
      </div>

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <ScribbleWord
          text={quote}
          className="text-5xl font-semibold tracking-[-0.05em] text-slate-950 md:text-7xl lg:text-8xl"
        />
      </div>
    </section>
  );
}
