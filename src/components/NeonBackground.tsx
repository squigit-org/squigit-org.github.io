import { useMemo } from "react";
import { motion } from "motion/react";

export function NeonBackground() {
  const paths = useMemo(
    () => [
      "M -5 220 C 160 40, 300 420, 480 250 S 820 20, 1100 190 S 1420 380, 1680 170",
      "M -20 620 C 120 500, 260 760, 470 630 S 860 470, 1110 620 S 1420 810, 1700 590",
      "M 70 980 C 260 840, 400 1140, 600 1000 S 900 800, 1120 980 S 1410 1180, 1680 900",
    ],
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full opacity-90"
        viewBox="0 0 1600 1400"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="blurGlow">
            <feGaussianBlur stdDeviation="10" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="neonLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="40%" stopColor="#06b6d4" />
            <stop offset="70%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
        {paths.map((d, i) => (
          <g key={i}>
            <motion.path
              d={d}
              stroke="url(#neonLine)"
              strokeWidth="2"
              strokeLinecap="round"
              className="opacity-25"
              filter="url(#blurGlow)"
              initial={{ pathLength: 0.2, pathOffset: 1 }}
              animate={{ pathLength: [0.2, 0.45, 0.2], pathOffset: [1, 0, -1] }}
              transition={{
                duration: 14 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.path
              d={d}
              stroke="url(#neonLine)"
              strokeWidth="1.2"
              strokeLinecap="round"
              className="opacity-40"
              initial={{ pathLength: 0.1, pathOffset: 0.8 }}
              animate={{
                pathLength: [0.1, 0.24, 0.1],
                pathOffset: [0.8, -0.2, -1.2],
              }}
              transition={{
                duration: 10 + i * 1.5,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.7,
              }}
            />
          </g>
        ))}
        <motion.circle
          cx="1300"
          cy="240"
          r="96"
          stroke="url(#neonLine)"
          strokeWidth="1.5"
          className="opacity-20"
          filter="url(#blurGlow)"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "1300px 240px" }}
        />
        <motion.circle
          cx="280"
          cy="760"
          r="74"
          stroke="url(#neonLine)"
          strokeWidth="1.5"
          className="opacity-20"
          filter="url(#blurGlow)"
          animate={{ rotate: -360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "280px 760px" }}
        />
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.09),transparent_35%),radial-gradient(circle_at_20%_60%,rgba(14,165,233,0.07),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(139,92,246,0.08),transparent_30%)]" />
    </div>
  );
}
