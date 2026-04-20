import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "@/src/components/ui/button";
import { DownloadIcon } from "@/src/components/icons";
import { ScribbleWord } from "@/src/components/ScribbleWord";
import heroIcon from "@/src/assets/icon.png";

const subtitleLines = [
  "Squiggle anything you see",
  "on your screen and get",
  "instant AI understanding.",
];

export function Hero() {
  const [revealedLines, setRevealedLines] = useState(0);

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
  const subtitleRevealed = revealedLines >= subtitleLines.length;

  const handleLineReveal = () => {
    setRevealedLines((count) => Math.min(count + 1, subtitleLines.length));
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
          initial={{ opacity: 0, y: 24 }}
          animate={subtitleRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.45, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex justify-center"
        >
          <div className="flex items-center gap-4 text-slate-950">
            <img
              src={heroIcon}
              alt="Squigit"
              className="h-14 w-14 object-contain sm:h-16 sm:w-16"
            />
            <span className="text-2xl font-normal tracking-tight sm:text-3xl">
              Squigit
            </span>
          </div>
        </motion.div>

        <div className="mx-auto flex max-w-5xl flex-col items-center gap-1 sm:gap-2">
          {subtitleLines.map((line) => (
            <ScribbleWord
              key={line}
              text={line}
              onRevealComplete={handleLineReveal}
              className="text-4xl font-normal leading-[1.02] tracking-[-0.045em] text-slate-950 sm:text-5xl md:text-6xl lg:text-[4.8rem]"
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={subtitleRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.48, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
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
