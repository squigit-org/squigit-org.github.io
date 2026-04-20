import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "@/src/components/ui/button";
import { DownloadIcon } from "@/src/components/icons";
import { ScribbleWord } from "@/src/components/ScribbleWord";
import squigitIcon from "@/src/assets/squigit-icon.png";

const subtitle =
  "Squiggle anything you see on your screen and get instant AI understanding.";

export function Hero() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <section
      ref={targetRef}
      className="relative flex min-h-screen items-center justify-center px-6"
    >
      <motion.div
        style={{ y, scale }}
        className="relative z-10 mx-auto max-w-6xl text-center"
      >
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm text-slate-700 shadow-sm">
          <img src={squigitIcon} alt="Squigit" className="h-6 w-6 rounded-md" />
          <span className="font-medium tracking-tight">Squigit</span>
        </div>

        <ScribbleWord
          text={subtitle}
          className="mx-auto max-w-5xl text-5xl font-light leading-[1.03] tracking-[-0.05em] text-slate-950 sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        />

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="#download">
            <Button
              size="lg"
              className="rounded-full bg-slate-950 px-7 text-white hover:bg-slate-800"
            >
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download for Linux
            </Button>
          </a>
          <a href="#use-cases">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-slate-300 bg-white/90 px-7"
            >
              Explore use cases
            </Button>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
