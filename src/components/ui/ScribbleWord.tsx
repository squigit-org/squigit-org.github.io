import { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib";

const ANIMATION_DURATION = 0.56;
const CLUSTER_WINDOW = 0.18;

function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function getCharacterDelay(text: string, index: number) {
  const wordIndex = text.slice(0, index).split(" ").length - 1;
  const clusterDelay = pseudoRandom(wordIndex + text.length * 0.37) * CLUSTER_WINDOW;
  const charJitter = pseudoRandom((index + 1) * 1.73 + text.length) * 0.065;

  return Math.min(CLUSTER_WINDOW, clusterDelay + charJitter);
}

export function ScribbleWord({
  text,
  className = "",
  onRevealComplete,
}: {
  text: string;
  className?: string;
  onRevealComplete?: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const hasCompletedRef = useRef(false);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const chars = text.split("");
  const delays = chars.map((char, index) =>
    char === " " ? 0 : getCharacterDelay(text, index),
  );
  const totalRevealTime = Math.max(...delays, 0) + ANIMATION_DURATION;

  useEffect(() => {
    hasCompletedRef.current = false;
  }, [text]);

  useEffect(() => {
    if (!inView || !onRevealComplete || hasCompletedRef.current) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        onRevealComplete();
      }
    }, totalRevealTime * 1000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [inView, onRevealComplete, totalRevealTime]);

  return (
    <div ref={ref} className={cn("inline-block", className)}>
      <div className="flex flex-wrap justify-center gap-x-[0.03em]">
        {chars.map((char, i) => {
          const isSpace = char === " ";

          return (
            <motion.span
              key={`${char}-${i}`}
              className={cn(
                "inline-block will-change-transform",
                isSpace ? "w-[0.3em]" : "",
              )}
              initial={{
                opacity: 0,
                x: (i % 2 === 0 ? -1 : 1) * (18 + (i % 4) * 5),
                y: (i % 3 === 0 ? -1 : 1) * (12 + (i % 3) * 4),
                rotate: (i % 2 === 0 ? -1 : 1) * (4 + (i % 5)),
                filter: "blur(6px)",
              }}
              animate={
                inView
                  ? {
                      opacity: 1,
                      x: 0,
                      y: 0,
                      rotate: 0,
                      filter: "blur(0px)",
                    }
                  : {}
              }
              transition={{
                duration: ANIMATION_DURATION,
                delay: delays[i],
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {isSpace ? "\u00A0" : char}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}
