import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "@/src/components/ui/button";
import {
  DownloadIcon,
  GithubIcon,
  SparklesIcon,
  ChevronDownIcon,
} from "@/src/components/icons";

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
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm text-slate-700 shadow-sm"
        >
          <SparklesIcon className="h-4 w-4" />
          Open-source AI vision for desktop
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08 }}
          className="text-6xl font-semibold tracking-[-0.08em] text-slate-950 md:text-8xl lg:text-[9rem]"
        >
          Squigit
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18 }}
          className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 md:text-2xl md:leading-10"
        >
          Squiggle anything you see on your screen and get instant AI overview,
          OCR, and Search without switching apps.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.28 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a href="#download">
            <Button
              size="lg"
              className="rounded-full bg-slate-950 px-7 text-white hover:bg-slate-800"
            >
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download
            </Button>
          </a>
          <a
            href="https://github.com/squigit-org/squigit"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-slate-300 bg-white/90 px-7"
            >
              <GithubIcon className="mr-2 h-4 w-4" />
              View Repository
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="mt-20 flex flex-col items-center text-slate-500"
        >
          <span className="text-sm">Scroll to see it in motion</span>
          <ChevronDownIcon className="mt-2 h-5 w-5 animate-bounce" />
        </motion.div>
      </motion.div>
    </section>
  );
}
