import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/src/lib/utils";

export function ScribbleWord({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <div className="relative z-10 flex flex-wrap justify-center gap-x-[0.03em]">
        {text.split("").map((char, i) => {
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
                x: (i % 2 === 0 ? -1 : 1) * (40 + (i % 5) * 10),
                y: (i % 3 === 0 ? -1 : 1) * (28 + (i % 4) * 8),
                rotate: (i % 2 === 0 ? -1 : 1) * (8 + (i % 7) * 2),
                filter: "blur(8px)",
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
                duration: 0.8,
                delay: i * 0.025,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {isSpace ? "\u00A0" : char}
            </motion.span>
          );
        })}
      </div>
      <svg
        className="pointer-events-none absolute -inset-x-6 -inset-y-4 z-0 h-[calc(100%+2rem)] w-[calc(100%+3rem)]"
        viewBox="0 0 600 180"
        fill="none"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M25 92 C 85 35, 170 18, 250 72 S 402 144, 575 86"
          stroke="url(#scribbleGradient)"
          strokeWidth="2.8"
          strokeLinecap="round"
          className="opacity-70"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.7 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <motion.path
          d="M38 118 C 120 154, 210 154, 298 118 S 468 84, 556 118"
          stroke="url(#scribbleGradient)"
          strokeWidth="1.8"
          strokeLinecap="round"
          className="opacity-40"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.4 } : {}}
          transition={{ duration: 1.3, delay: 0.18, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="scribbleGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
