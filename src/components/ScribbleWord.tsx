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
    <div ref={ref} className={cn("inline-block", className)}>
      <motion.span
        className="inline-block will-change-transform"
        initial={{
          opacity: 0,
          x: -16,
          y: 12,
          rotate: -2,
          skewX: 10,
          filter: "blur(8px)",
        }}
        animate={
          inView
            ? {
                opacity: 1,
                x: 0,
                y: 0,
                rotate: 0,
                skewX: 0,
                filter: "blur(0px)",
              }
            : {}
        }
        transition={{
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {text}
      </motion.span>
    </div>
  );
}
