import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "@/src/components/ui/button";
import { AppLogoIcon, DownloadIcon } from "@/src/components/icons";
import { ScribbleWord } from "@/src/components/ScribbleWord";

const subtitle =
  "Squiggle anything you see on your screen and get instant AI understanding.";

export function Hero() {
  const openUseCasesDropdown = () => {
    window.dispatchEvent(new Event("squigit:open-use-cases"));
  };

  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const fadeInLift = {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <section
      id="home"
      ref={targetRef}
      className="relative flex min-h-screen items-center justify-center px-6"
    >
      <motion.div
        style={{ y, scale }}
        className="relative z-10 mx-auto max-w-6xl text-center"
      >
        <motion.div
          {...fadeInLift}
          className="mb-10 inline-flex items-center gap-3 text-slate-950"
        >
          <AppLogoIcon className="h-10 w-10 text-slate-950" />
          <span className="text-2xl font-normal tracking-tight">Squigit</span>
        </motion.div>

        <ScribbleWord
          text={subtitle}
          className="mx-auto max-w-5xl text-5xl font-light leading-[1.03] tracking-[-0.05em] text-slate-950 sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        />

        <motion.div
          {...fadeInLift}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a href="#download">
            <Button
              size="lg"
              className="rounded-full bg-slate-950 px-7 text-white hover:bg-slate-800"
            >
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download for Linux
            </Button>
          </a>
          <Button
            size="lg"
            variant="outline"
            onClick={openUseCasesDropdown}
            className="rounded-full border-slate-300 bg-white/90 px-7"
          >
            Explore use cases
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
