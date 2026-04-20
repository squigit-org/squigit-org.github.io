import { useEffect, useRef, useState } from "react";
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

const HERO_BLANK_DELAY_MS = 150;
const POST_SUBTITLE_GAP_MS = 900;

export function Hero() {
  const [revealedLines, setRevealedLines] = useState(0);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showHeroMeta, setShowHeroMeta] = useState(false);

  const openUseCasesDropdown = () => {
    window.dispatchEvent(new Event("squigit:open-use-cases"));
  };

  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const subtitleRevealed = revealedLines >= subtitleLines.length;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setShowSubtitle(true);
    }, HERO_BLANK_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!subtitleRevealed) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShowHeroMeta(true);
    }, POST_SUBTITLE_GAP_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [subtitleRevealed]);

  const handleLineReveal = () => {
    setRevealedLines((count) => Math.min(count + 1, subtitleLines.length));
  };

  return (
    <section
      id="home"
      ref={targetRef}
      className="relative flex min-h-screen items-center justify-center px-5"
    >
      <motion.div
        style={{ y }}
        className="relative z-10 mx-auto -mt-14 max-w-5xl text-center sm:-mt-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={showHeroMeta ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex justify-center"
        >
          <div className="flex items-center gap-2 text-slate-950 sm:gap-2.5">
            <img
              src={heroIcon}
              alt="Squigit"
              className="h-10 w-10 object-contain sm:h-11 sm:w-11"
            />
            <span className="text-xl font-normal tracking-tight sm:text-2xl">
              Squigit
            </span>
          </div>
        </motion.div>

        <div className="mx-auto flex max-w-4xl flex-col items-center gap-0.5 sm:gap-1.5">
          {showSubtitle
            ? subtitleLines.map((line) => (
                <ScribbleWord
                  key={line}
                  text={line}
                  onRevealComplete={handleLineReveal}
                  className="text-3xl font-normal leading-[1.02] tracking-[-0.045em] text-slate-950 sm:text-4xl md:text-5xl lg:text-6xl"
                />
              ))
            : null}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 38 }}
          animate={showHeroMeta ? { opacity: 1, y: 0 } : { opacity: 0, y: 38 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a href="#download">
            <Button
              size="lg"
              className="rounded-full bg-slate-950 text-white hover:bg-slate-800"
            >
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download for Linux
            </Button>
          </a>
          <Button
            size="lg"
            variant="outline"
            onClick={openUseCasesDropdown}
            className="rounded-full border-slate-300 bg-white/90"
          >
            Explore use cases
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
