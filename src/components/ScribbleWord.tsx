import { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/src/lib/utils";

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

  useEffect(() => {
    hasCompletedRef.current = false;
  }, [text]);

  return (
    <div ref={ref} className={cn("inline-block", className)}>
      <div className="flex flex-wrap justify-center gap-x-[0.03em]">
        {chars.map((char, i) => {
          const isSpace = char === " ";
          const isLast = i === chars.length - 1;

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
                duration: 0.56,
                delay: i * 0.012,
                ease: [0.22, 1, 0.36, 1],
              }}
              onAnimationComplete={
                isLast
                  ? () => {
                      if (!hasCompletedRef.current) {
                        hasCompletedRef.current = true;
                        onRevealComplete?.();
                      }
                    }
                  : undefined
              }
            >
              {isSpace ? "\u00A0" : char}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}
