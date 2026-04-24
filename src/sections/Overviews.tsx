import { useEffect, useRef, useState } from "react";
import {
  cubicBezier,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { TextEffectOne } from "react-text-animate";
import { ChevronDownIcon } from "@/components/icons";
import {
  AI_OVERVIEW_CARD_COPY,
  AI_OVERVIEW_CARD_LABELS,
  AI_OVERVIEWS_TITLE,
  cn,
  type OverviewCardCopy,
} from "@/lib";

type CardLayout = {
  x: string;
  y: string;
  z: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  scale: number;
  opacity: number;
};

type OverviewCardConfig = OverviewCardCopy & {
  background: string;
  border: string;
  lineColor: string;
  shadow: string;
  zIndex: number;
  start: number;
  launch: number;
  settle: number;
  resolveStart: number;
  resolveEnd: number;
  stackRotate: number;
  widthClassName: string;
  mobileClassName?: string;
  desktop: CardLayout;
  compact: CardLayout;
};

const overviewCards: OverviewCardConfig[] = [
  {
    ...AI_OVERVIEW_CARD_COPY.socialPost,
    background: "rgba(255, 239, 244, 0.96)",
    border: "rgba(248, 180, 195, 0.58)",
    lineColor: "rgba(248, 180, 195, 0.42)",
    shadow: "0 24px 72px -42px rgba(244, 114, 182, 0.56)",
    zIndex: 34,
    start: 0.03,
    launch: 0.08,
    settle: 0.32,
    resolveStart: 0.36,
    resolveEnd: 0.43,
    stackRotate: -5,
    widthClassName: "w-[15.6rem] sm:w-[22rem] lg:w-[25rem]",
    desktop: {
      x: "-27vw",
      y: "-17vh",
      z: 130,
      rotateX: 5,
      rotateY: -10,
      rotateZ: -4,
      scale: 0.98,
      opacity: 0.99,
    },
    compact: {
      x: "-12vw",
      y: "-24vh",
      z: 90,
      rotateX: 4,
      rotateY: -8,
      rotateZ: -4,
      scale: 0.82,
      opacity: 0.99,
    },
  },
  {
    ...AI_OVERVIEW_CARD_COPY.videoSummary,
    background: "rgba(231, 246, 255, 0.96)",
    border: "rgba(147, 197, 253, 0.56)",
    lineColor: "rgba(147, 197, 253, 0.4)",
    shadow: "0 24px 76px -44px rgba(96, 165, 250, 0.62)",
    zIndex: 37,
    start: 0.06,
    launch: 0.11,
    settle: 0.38,
    resolveStart: 0.42,
    resolveEnd: 0.49,
    stackRotate: 4,
    widthClassName: "w-[15.2rem] sm:w-[21rem] lg:w-[24rem]",
    desktop: {
      x: "25vw",
      y: "-10vh",
      z: 88,
      rotateX: 3,
      rotateY: 10,
      rotateZ: 3,
      scale: 0.94,
      opacity: 0.95,
    },
    compact: {
      x: "12vw",
      y: "-13vh",
      z: 74,
      rotateX: 3,
      rotateY: 8,
      rotateZ: 3,
      scale: 0.78,
      opacity: 0.95,
    },
  },
  {
    ...AI_OVERVIEW_CARD_COPY.shoppingInsight,
    background: "rgba(227, 250, 238, 0.97)",
    border: "rgba(134, 239, 172, 0.58)",
    lineColor: "rgba(134, 239, 172, 0.42)",
    shadow: "0 26px 80px -42px rgba(52, 211, 153, 0.62)",
    zIndex: 48,
    start: 0.09,
    launch: 0.14,
    settle: 0.44,
    resolveStart: 0.48,
    resolveEnd: 0.55,
    stackRotate: -1,
    widthClassName: "w-[16.2rem] sm:w-[23rem] lg:w-[27rem]",
    desktop: {
      x: "-2vw",
      y: "4vh",
      z: 230,
      rotateX: -3,
      rotateY: 2,
      rotateZ: 0,
      scale: 1.08,
      opacity: 1,
    },
    compact: {
      x: "0vw",
      y: "2vh",
      z: 180,
      rotateX: -3,
      rotateY: 1,
      rotateZ: 0,
      scale: 0.9,
      opacity: 1,
    },
  },
  {
    ...AI_OVERVIEW_CARD_COPY.codeExplanation,
    background: "rgba(242, 239, 255, 0.95)",
    border: "rgba(196, 181, 253, 0.58)",
    lineColor: "rgba(196, 181, 253, 0.42)",
    shadow: "0 23px 72px -44px rgba(167, 139, 250, 0.52)",
    zIndex: 28,
    start: 0.12,
    launch: 0.17,
    settle: 0.5,
    resolveStart: 0.54,
    resolveEnd: 0.61,
    stackRotate: 7,
    widthClassName: "w-[14.9rem] sm:w-[21rem] lg:w-[24rem]",
    desktop: {
      x: "-22vw",
      y: "20vh",
      z: 30,
      rotateX: -7,
      rotateY: -7,
      rotateZ: 5,
      scale: 0.88,
      opacity: 0.9,
    },
    compact: {
      x: "-13vw",
      y: "23vh",
      z: 26,
      rotateX: -6,
      rotateY: -6,
      rotateZ: 5,
      scale: 0.73,
      opacity: 0.9,
    },
  },
  {
    ...AI_OVERVIEW_CARD_COPY.placeOverview,
    background: "rgba(255, 248, 224, 0.95)",
    border: "rgba(253, 230, 138, 0.62)",
    lineColor: "rgba(253, 230, 138, 0.48)",
    shadow: "0 24px 76px -46px rgba(251, 191, 36, 0.54)",
    zIndex: 18,
    start: 0.15,
    launch: 0.2,
    settle: 0.56,
    resolveStart: 0.6,
    resolveEnd: 0.67,
    stackRotate: -8,
    widthClassName: "w-[15.3rem] sm:w-[21.5rem] lg:w-[25rem]",
    mobileClassName: "max-sm:hidden",
    desktop: {
      x: "12vw",
      y: "-18vh",
      z: -70,
      rotateX: 8,
      rotateY: 8,
      rotateZ: -2,
      scale: 0.86,
      opacity: 0.9,
    },
    compact: {
      x: "8vw",
      y: "-22vh",
      z: -54,
      rotateX: 7,
      rotateY: 6,
      rotateZ: -2,
      scale: 0.72,
      opacity: 0.9,
    },
  },
  {
    ...AI_OVERVIEW_CARD_COPY.documentBrief,
    background: "rgba(255, 242, 234, 0.95)",
    border: "rgba(253, 186, 116, 0.58)",
    lineColor: "rgba(253, 186, 116, 0.44)",
    shadow: "0 24px 76px -46px rgba(251, 146, 60, 0.54)",
    zIndex: 31,
    start: 0.18,
    launch: 0.23,
    settle: 0.62,
    resolveStart: 0.66,
    resolveEnd: 0.73,
    stackRotate: 5,
    widthClassName: "w-[14.6rem] sm:w-[20rem] lg:w-[23rem]",
    mobileClassName: "max-sm:hidden",
    desktop: {
      x: "25vw",
      y: "21vh",
      z: 68,
      rotateX: -5,
      rotateY: 12,
      rotateZ: -3,
      scale: 0.84,
      opacity: 0.92,
    },
    compact: {
      x: "13vw",
      y: "27vh",
      z: 54,
      rotateX: -4,
      rotateY: 8,
      rotateZ: -3,
      scale: 0.7,
      opacity: 0.92,
    },
  },
];

const SHUFFLE_INTERVAL_MS = 900;
const CRISP_SWAP_PROGRESS = 0.76;
const TITLE_FRAME_SCROLL_PORTION = 0.62;
const CARD_SEQUENCE_START_PROGRESS = 0.58;
const CARD_ANIMATION_SCROLL_PORTION = 0.42;
const COMPACT_CARD_Y_OFFSET = "8vh";
const ENTRY_PROGRESS_BOOST = 0.045;
const TITLE_OVERLAY_FADE_START_PROGRESS = 0.18;
const TITLE_OVERLAY_FADE_END_PROGRESS = 0.64;
const TITLE_SCALE_EASE = cubicBezier(0.22, 1, 0.36, 1);
const TITLE_SWAP_EASE = cubicBezier(0.16, 1, 0.3, 1);
const WHEEL_GESTURE_IDLE_MS = 180;
const WHEEL_GATE_EPSILON_PX = 2;
const WHEEL_LINE_HEIGHT_PX = 16;

function clampProgress(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

function getWheelDeltaY(event: WheelEvent) {
  if (event.deltaMode === 1) {
    return event.deltaY * WHEEL_LINE_HEIGHT_PX;
  }

  if (event.deltaMode === 2) {
    return event.deltaY * Math.max(window.innerHeight, 1);
  }

  return event.deltaY;
}

function getSectionScrollMetrics(section: HTMLElement) {
  const viewportHeight = Math.max(window.innerHeight, 1);
  const sectionTop = section.getBoundingClientRect().top + window.scrollY;
  const scrollRange = Math.max(section.offsetHeight - viewportHeight, 1);

  return {
    sectionTop,
    scrollRange,
    getScrollYForProgress: (progress: number) =>
      sectionTop + clampProgress(progress) * scrollRange,
  };
}

function useCompactOverviewLayout() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const syncLayout = () => setIsCompact(mediaQuery.matches);

    syncLayout();
    mediaQuery.addEventListener("change", syncLayout);

    return () => {
      mediaQuery.removeEventListener("change", syncLayout);
    };
  }, []);

  return isCompact;
}

function OverviewCard({
  card,
  index,
  isCompact,
  isCrispFrame,
  shuffleIndex,
  timelineProgress,
}: {
  card: OverviewCardConfig;
  index: number;
  isCompact: boolean;
  isCrispFrame: boolean;
  shuffleIndex: number;
  timelineProgress: MotionValue<number>;
}) {
  const layout = isCompact ? card.compact : card.desktop;
  const finalY = isCompact
    ? `calc(${layout.y} + ${COMPACT_CARD_Y_OFFSET})`
    : layout.y;
  const crispTop = isCompact
    ? `calc(50% + ${layout.y} + ${COMPACT_CARD_Y_OFFSET})`
    : `calc(50% + ${layout.y})`;
  const messages = [{ title: card.title, text: card.text }, ...card.alternates];
  const message =
    shuffleIndex === 0
      ? messages[0]
      : messages[(shuffleIndex + index) % messages.length];
  const stackScale = 0.22 + index * 0.018;
  const stackEnd = card.start + 0.035;
  const pulsePeak = card.settle + 0.018;
  const pulseSettle = card.settle + 0.052;
  const fadeEnd = 1;

  const opacity = useTransform(
    timelineProgress,
    [0, card.start - 0.02, card.start + 0.045, fadeEnd],
    [0, 0, layout.opacity, layout.opacity],
  );
  const x = useTransform(
    timelineProgress,
    [0, card.start, card.launch, card.settle, fadeEnd],
    ["0vw", "0vw", "0vw", layout.x, layout.x],
  );
  const y = useTransform(
    timelineProgress,
    [0, card.start, card.launch, card.settle, fadeEnd],
    ["0vh", "0vh", "0vh", finalY, finalY],
  );
  const scale = useTransform(
    timelineProgress,
    [
      0,
      card.start,
      stackEnd,
      card.launch,
      card.settle,
      pulsePeak,
      pulseSettle,
      fadeEnd,
    ],
    [
      0.12,
      0.12,
      stackScale,
      0.42,
      1.035,
      0.985,
      1,
      1,
    ],
  );
  const skeletonOpacity = useTransform(
    timelineProgress,
    [
      card.start,
      card.resolveStart,
      Math.min(card.resolveStart + 0.05, card.resolveEnd),
      card.resolveEnd,
    ],
    [1, 1, 0.74, 0],
  );
  const contentOpacity = useTransform(
    timelineProgress,
    [card.resolveStart, card.resolveEnd],
    [0, 1],
  );
  const contentY = useTransform(
    timelineProgress,
    [card.resolveStart, card.resolveEnd],
    [8, 0],
  );
  const rotateZ = useTransform(
    timelineProgress,
    [card.start, card.launch, card.settle, card.resolveEnd, fadeEnd],
    [card.stackRotate, card.stackRotate, layout.rotateZ * 0.72, 0, 0],
  );

  if (isCrispFrame) {
    return (
      <div
        className={cn("absolute", card.mobileClassName)}
        style={{
          left: `calc(50% + ${layout.x})`,
          top: crispTop,
          transform: "translate(-50%, -50%)",
          zIndex: card.zIndex,
          opacity: layout.opacity,
        }}
      >
        <article
          aria-label={`${card.title}: ${card.text}`}
          className={cn(
            "relative min-h-[11.5rem] overflow-hidden rounded-[1.5rem] border px-4 py-4 text-slate-950 shadow-sm sm:min-h-[14.25rem] sm:rounded-[2rem] sm:px-6 sm:py-5",
            card.widthClassName,
          )}
          style={{
            backgroundColor: card.background,
            borderColor: card.border,
            boxShadow: card.shadow,
          }}
        >
          <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-white/10 sm:rounded-[2rem]" />
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-white/80" />

          <div className="relative">
            <div key={`${card.id}-${message.title}-${shuffleIndex}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.62rem] font-semibold leading-none text-slate-950/80">
                    {AI_OVERVIEW_CARD_LABELS.title}
                  </p>
                  <p className="mt-1 text-[0.62rem] leading-none text-slate-700/74">
                    {AI_OVERVIEW_CARD_LABELS.source}
                  </p>
                </div>
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/45 text-slate-700 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)]">
                  <ChevronDownIcon size={13} />
                </span>
              </div>
              <h3 className="mt-3.5 font-product-sans text-[1.12rem] font-[450] leading-[1.3] text-slate-950 sm:mt-4 sm:text-2xl sm:leading-7">
                {message.title}
              </h3>
              <p className="mt-2.5 text-[0.79rem] leading-[1.35] text-slate-800/86 sm:mt-3 sm:text-[0.92rem] sm:leading-6">
                {message.text}
              </p>
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "absolute left-1/2 top-1/2",
        card.mobileClassName,
      )}
      style={{ transform: "translate(-50%, -50%)", zIndex: card.zIndex }}
    >
      <motion.article
        aria-label={`${card.title}: ${card.text}`}
        className={cn(
          "relative min-h-[11.5rem] overflow-hidden rounded-[1.5rem] border px-4 py-4 text-slate-950 shadow-sm will-change-[transform,opacity] sm:min-h-[14.25rem] sm:rounded-[2rem] sm:px-6 sm:py-5",
          card.widthClassName,
        )}
        style={{
          x,
          y,
          scale,
          rotateZ,
          opacity,
          backgroundColor: card.background,
          borderColor: card.border,
          boxShadow: card.shadow,
        }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-white/10 sm:rounded-[2rem]" />
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-white/80" />

        <motion.div
          aria-hidden="true"
          className="absolute inset-0 px-4 py-4 sm:px-6 sm:py-5"
          style={{ opacity: skeletonOpacity }}
        >
          <p className="text-[0.62rem] font-semibold leading-none text-slate-950/78">
            {AI_OVERVIEW_CARD_LABELS.loading}
          </p>
          <div className="mt-6 space-y-3.5">
            {[82, 58, 92, 74].map((width, lineIndex) => (
              <span
                key={`${card.id}-skeleton-${lineIndex}`}
                className="ai-overview-skeleton-line block h-3 rounded-full"
                style={{
                  width: `${width}%`,
                  backgroundColor: card.lineColor,
                }}
              />
            ))}
          </div>
          <div className="mt-5 flex justify-end">
            <span
              className="ai-overview-skeleton-line block h-3 w-24 rounded-full"
              style={{ backgroundColor: card.lineColor }}
            />
          </div>
        </motion.div>

        <motion.div
          className="relative"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <div
            key={`${card.id}-${message.title}-${shuffleIndex}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.62rem] font-semibold leading-none text-slate-950/80">
                  {AI_OVERVIEW_CARD_LABELS.title}
                </p>
                <p className="mt-1 text-[0.62rem] leading-none text-slate-700/74">
                  {AI_OVERVIEW_CARD_LABELS.source}
                </p>
              </div>
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/45 text-slate-700 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)]">
                <ChevronDownIcon size={13} />
              </span>
            </div>
            <h3 className="mt-3.5 font-product-sans text-[1.12rem] font-[450] leading-[1.3] text-slate-950 sm:mt-4 sm:text-2xl sm:leading-7">
              {message.title}
            </h3>
            <p className="mt-2.5 text-[0.79rem] leading-[1.35] text-slate-800/86 sm:mt-3 sm:text-[0.92rem] sm:leading-6">
              {message.text}
            </p>
          </div>
        </motion.div>
      </motion.article>
    </div>
  );
}

export function Overviews() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const maxTitleProgressRef = useRef(0);
  const maxProgressRef = useRef(0);
  const previousRawProgressRef = useRef(0);
  const resetBufferViewportRatioRef = useRef(0.16);
  const lastScrollYRef = useRef(0);
  const scrollDirectionRef = useRef<"down" | "up">("down");
  const sectionZoneRef = useRef<"above" | "inside" | "below">("above");
  const wheelGestureActiveRef = useRef(false);
  const wheelGestureStartYRef = useRef(0);
  const wheelGateActiveRef = useRef(false);
  const wheelIdleTimerRef = useRef<number | null>(null);
  const [isCrispFrame, setIsCrispFrame] = useState(false);
  const [shuffleIndex, setShuffleIndex] = useState(0);
  const [titleAnimationKey, setTitleAnimationKey] = useState(0);
  const titleWasInViewRef = useRef(false);
  const isCompact = useCompactOverviewLayout();
  const titleInView = useInView(titleRef, { amount: 0.45, once: false });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const { scrollY } = useScroll();
  const titleFrameProgress = useMotionValue(0);
  const timelineProgress = useMotionValue(0);

  useEffect(() => {
    const syncResetBuffer = () => {
      const sectionHeight =
        sectionRef.current?.offsetHeight ?? window.innerHeight * 1.5;
      const viewportHeight = Math.max(window.innerHeight, 1);
      const bufferRatio =
        (viewportHeight / Math.max(sectionHeight, 1)) * 0.3;
      resetBufferViewportRatioRef.current = Math.min(
        Math.max(bufferRatio, 0.1),
        0.24,
      );
    };

    const syncZone = () => {
      const sectionRect = sectionRef.current?.getBoundingClientRect();
      if (!sectionRect) {
        return;
      }

      const viewportHeight = Math.max(window.innerHeight, 1);
      const resetBufferPx =
        viewportHeight * resetBufferViewportRatioRef.current;
      if (sectionRect.top >= viewportHeight + resetBufferPx) {
        sectionZoneRef.current = "above";
      } else if (sectionRect.bottom <= -resetBufferPx) {
        sectionZoneRef.current = "below";
      } else {
        sectionZoneRef.current = "inside";
      }
    };

    syncResetBuffer();
    syncZone();
    lastScrollYRef.current = window.scrollY;
    window.addEventListener("resize", syncResetBuffer);
    window.addEventListener("resize", syncZone);

    return () => {
      window.removeEventListener("resize", syncResetBuffer);
      window.removeEventListener("resize", syncZone);
    };
  }, []);

  useEffect(() => {
    const releaseWheelGateOnIdle = () => {
      if (wheelIdleTimerRef.current !== null) {
        window.clearTimeout(wheelIdleTimerRef.current);
      }

      wheelIdleTimerRef.current = window.setTimeout(() => {
        wheelGestureActiveRef.current = false;
        wheelGateActiveRef.current = false;
        wheelIdleTimerRef.current = null;
      }, WHEEL_GESTURE_IDLE_MS);
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey) {
        return;
      }

      const section = sectionRef.current;
      if (!section) {
        return;
      }

      const deltaY = getWheelDeltaY(event);
      if (Math.abs(deltaY) < 1 || Math.abs(deltaY) < Math.abs(event.deltaX)) {
        return;
      }

      if (!wheelGestureActiveRef.current) {
        wheelGestureActiveRef.current = true;
        wheelGestureStartYRef.current = window.scrollY;
      }

      releaseWheelGateOnIdle();

      if (wheelGateActiveRef.current) {
        event.preventDefault();
        return;
      }

      if (deltaY <= 0) {
        return;
      }

      const { getScrollYForProgress } = getSectionScrollMetrics(section);
      const cardGateScrollY = getScrollYForProgress(
        CARD_SEQUENCE_START_PROGRESS,
      );
      const currentScrollY = window.scrollY;
      const nextScrollY = currentScrollY + deltaY;
      const gestureStartedBeforeCards =
        wheelGestureStartYRef.current <
        cardGateScrollY - WHEEL_GATE_EPSILON_PX;
      const gestureCrossesIntoCards =
        currentScrollY < cardGateScrollY - WHEEL_GATE_EPSILON_PX &&
        nextScrollY >= cardGateScrollY - WHEEL_GATE_EPSILON_PX;

      if (!gestureStartedBeforeCards || !gestureCrossesIntoCards) {
        return;
      }

      wheelGateActiveRef.current = true;
      event.preventDefault();
      window.scrollTo({
        top: cardGateScrollY,
        left: window.scrollX,
        behavior: "auto",
      });
    };

    const listenerOptions: AddEventListenerOptions = {
      capture: true,
      passive: false,
    };

    window.addEventListener("wheel", handleWheel, listenerOptions);

    return () => {
      window.removeEventListener("wheel", handleWheel, listenerOptions);

      if (wheelIdleTimerRef.current !== null) {
        window.clearTimeout(wheelIdleTimerRef.current);
      }
    };
  }, []);

  useMotionValueEvent(scrollY, "change", (currentScrollY) => {
    const scrollDelta = currentScrollY - lastScrollYRef.current;

    if (Math.abs(scrollDelta) < 1) {
      return;
    }
    scrollDirectionRef.current = scrollDelta > 0 ? "down" : "up";
    lastScrollYRef.current = currentScrollY;

    const sectionRect = sectionRef.current?.getBoundingClientRect();
    if (!sectionRect) {
      return;
    }

    const viewportHeight = Math.max(window.innerHeight, 1);
    const resetBufferPx =
      viewportHeight * resetBufferViewportRatioRef.current;
    let nextZone: "above" | "inside" | "below";
    if (sectionRect.top >= viewportHeight + resetBufferPx) {
      nextZone = "above";
    } else if (sectionRect.bottom <= -resetBufferPx) {
      nextZone = "below";
    } else {
      nextZone = "inside";
    }

    if (nextZone === sectionZoneRef.current) {
      return;
    }

    sectionZoneRef.current = nextZone;

    // Re-arm animation only after the whole section is off-screen above the user.
    if (nextZone === "above") {
      maxTitleProgressRef.current = 0;
      maxProgressRef.current = 0;
      previousRawProgressRef.current = 0;
      setIsCrispFrame(false);
      titleWasInViewRef.current = false;
      setTitleAnimationKey(0);
      titleFrameProgress.set(0);
      timelineProgress.set(0);
    }
  });

  useMotionValueEvent(scrollYProgress, "change", (rawProgress) => {
    const nextProgress = clampProgress(rawProgress);
    const forwardTitleProgress = clampProgress(
      nextProgress / TITLE_FRAME_SCROLL_PORTION,
    );
    const shouldPrimeEntry =
      sectionZoneRef.current === "inside" &&
      nextProgress >= CARD_SEQUENCE_START_PROGRESS;
    const forwardAnimationProgress =
      nextProgress < CARD_SEQUENCE_START_PROGRESS
        ? 0
        : clampProgress(
            (nextProgress - CARD_SEQUENCE_START_PROGRESS) /
              CARD_ANIMATION_SCROLL_PORTION +
              (shouldPrimeEntry ? ENTRY_PROGRESS_BOOST : 0),
          );
    const previousProgress = previousRawProgressRef.current;
    let effectiveTitleProgress = maxTitleProgressRef.current;
    let effectiveProgress = maxProgressRef.current;

    if (nextProgress >= previousProgress) {
      maxTitleProgressRef.current = Math.max(
        maxTitleProgressRef.current,
        forwardTitleProgress,
      );
      effectiveTitleProgress = maxTitleProgressRef.current;
      maxProgressRef.current = Math.max(
        maxProgressRef.current,
        forwardAnimationProgress,
      );
      effectiveProgress = maxProgressRef.current;
    }

    titleFrameProgress.set(effectiveTitleProgress);
    timelineProgress.set(effectiveProgress);
    const shouldUseCrispFrame = effectiveProgress >= CRISP_SWAP_PROGRESS;
    setIsCrispFrame((current) =>
      current === shouldUseCrispFrame ? current : shouldUseCrispFrame,
    );

    previousRawProgressRef.current = nextProgress;
  });

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setShuffleIndex((currentIndex) => currentIndex + 1);
    }, SHUFFLE_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const enteredView = titleInView && !titleWasInViewRef.current;

    if (enteredView && scrollDirectionRef.current === "down") {
      setTitleAnimationKey((currentKey) => currentKey + 1);
    }

    titleWasInViewRef.current = titleInView;
  }, [titleInView]);

  const titleOpacity = useTransform(
    timelineProgress,
    [
      0,
      TITLE_OVERLAY_FADE_START_PROGRESS,
      TITLE_OVERLAY_FADE_END_PROGRESS,
      CRISP_SWAP_PROGRESS,
    ],
    [1, 1, 0, 0],
    { ease: TITLE_SWAP_EASE },
  );
  const titleScale = useTransform(
    titleFrameProgress,
    [0, 0.32, 0.62, 0.86, 1],
    [1, 0.96, 0.91, 0.87, 0.85],
    { ease: TITLE_SCALE_EASE },
  );
  const cardsStageOpacity = useTransform(
    titleFrameProgress,
    [0, 0.88, 1],
    [0, 0, 1],
    { ease: TITLE_SWAP_EASE },
  );
  const hasTitleAnimationStarted = titleAnimationKey > 0;
  const shouldColdHideTitle =
    titleInView &&
    !titleWasInViewRef.current &&
    scrollDirectionRef.current === "down";
  const shouldHideAnimatedTitle = !titleInView || shouldColdHideTitle;

  return (
    <section
      id="ai-overviews"
      ref={sectionRef}
      aria-labelledby="ai-overviews-title"
      className="relative h-[320vh] bg-[#fdfdfb]"
    >
      <div className="sticky top-0 flex h-[var(--squigit-viewport-height,100vh)] min-h-[38rem] overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(253,253,251,0.78)_44%,rgba(255,255,255,1)_100%)]"
        />
        <motion.div
          className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center px-5 text-center will-change-[opacity,transform]"
          style={{ opacity: titleOpacity, scale: titleScale }}
        >
          <h2
            ref={titleRef}
            id="ai-overviews-title"
            aria-label={AI_OVERVIEWS_TITLE}
            className="relative mx-auto w-max max-w-[calc(100vw-2.5rem)] whitespace-nowrap font-product-sans text-[1.42rem] font-[450] leading-[0.9] text-slate-950 min-[390px]:text-[1.56rem] sm:max-w-[calc(100vw-4rem)] sm:text-[4.8rem] sm:leading-[0.88] lg:text-[5.75rem]"
          >
            <span aria-hidden="true" className="invisible block">
              {AI_OVERVIEWS_TITLE}
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-0 block",
                shouldHideAnimatedTitle ? "invisible" : "visible",
              )}
            >
              {hasTitleAnimationStarted ? (
                <TextEffectOne
                  key={`overview-title-${titleAnimationKey}`}
                  animateOnce
                  wrapperElement="span"
                  text={AI_OVERVIEWS_TITLE}
                  staggerDuration={0.018}
                  elementVisibilityAmount={0.35}
                  lineHeight={0.9}
                  className="ai-overviews-title-effect block whitespace-nowrap"
                />
              ) : (
                AI_OVERVIEWS_TITLE
              )}
            </span>
          </h2>
        </motion.div>

        <motion.div
          className="relative h-full w-full"
          style={{
            opacity: cardsStageOpacity,
            perspective: "1200px",
            perspectiveOrigin: "50% 48%",
            transformStyle: "preserve-3d",
          }}
        >
          {overviewCards.map((card, index) => (
            <OverviewCard
              key={card.id}
              card={card}
              index={index}
              isCompact={isCompact}
              isCrispFrame={isCrispFrame}
              shuffleIndex={shuffleIndex}
              timelineProgress={timelineProgress}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
