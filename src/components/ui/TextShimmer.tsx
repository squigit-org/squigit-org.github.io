/**
 * @license
 * Copyright 2026 a7mddra
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { clsx } from "clsx";

interface TextShimmerProps {
  text: string;
  compact?: boolean;
  className?: string;
  duration?: number;
  spread?: number;
  spotWidth?: number;
  minSpreadPx?: number;
  angle?: number;
  peakWidth?: number;
  bleedInner?: number;
  bleedOuter?: number;
}

export const TextShimmer: React.FC<TextShimmerProps> = ({
  text,
  compact = false,
  className,
  duration = 2,
  spread = 2,
  spotWidth,
  minSpreadPx,
  angle,
  peakWidth,
  bleedInner,
  bleedOuter,
}) => {
  const spotWidthPx =
    spotWidth ??
    Math.max(text.length * spread, minSpreadPx ?? (compact ? 18 : 24));
  const angleValue = angle != null ? `${angle}deg` : "90deg";
  const peakWidthValue = `${peakWidth ?? 7}px`;
  const bleedInnerValue = `${bleedInner ?? 10}px`;
  const bleedOuterValue = `${bleedOuter ?? 22}px`;
  const spotWidthValue = `${spotWidthPx}px`;

  return (
    <div
      className={clsx(className)}
      aria-hidden="true"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        minWidth: 0,
        minHeight: compact ? 34 : 60,
        padding: compact ? "0.75rem 0" : "2rem 0",
      }}
    >
      <span
        style={{
          display: "inline-block",
          maxWidth: "100%",
          minWidth: 0,
          fontSize: "inherit",
          fontWeight: "inherit",
          lineHeight: "inherit",
          color: "transparent",
          WebkitTextFillColor: "transparent",
          backgroundImage: `
            linear-gradient(
              ${angleValue},
              transparent calc(50% - (${spotWidthValue} + ${bleedOuterValue})),
              rgba(255, 255, 255, 0.12) calc(50% - (${spotWidthValue} + ${bleedInnerValue})),
              rgba(255, 255, 255, 0.3) calc(50% - (${spotWidthValue} + 2px)),
              rgba(255, 255, 255, 0.65) calc(50% - ${spotWidthValue}),
              rgba(255, 255, 255, 0.96) calc(50% - ${peakWidthValue}),
              rgba(255, 255, 255, 0.96) calc(50% + ${peakWidthValue}),
              rgba(255, 255, 255, 0.65) calc(50% + ${spotWidthValue}),
              rgba(255, 255, 255, 0.3) calc(50% + (${spotWidthValue} + 2px)),
              rgba(255, 255, 255, 0.12) calc(50% + (${spotWidthValue} + ${bleedInnerValue})),
              transparent calc(50% + (${spotWidthValue} + ${bleedOuterValue}))
            ),
            linear-gradient(#8a8a8a, #8a8a8a)
          `,
          backgroundPosition: "130% center, 0 0",
          backgroundSize: "300% 100%, auto",
          backgroundRepeat: "no-repeat, no-repeat",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          animation: `textShimmerSweep ${duration}s linear infinite`,
          willChange: "background-position",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default TextShimmer;
