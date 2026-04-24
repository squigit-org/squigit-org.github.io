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
import { cn } from "@/lib";

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

type OverviewCardConfig = {
  id: string;
  title: string;
  text: string;
  alternates: OverviewMessage[];
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

type OverviewMessage = {
  title: string;
  text: string;
};

const overviewCards: OverviewCardConfig[] = [
  {
    id: "social-post",
    title: "Social post overview",
    text: "This post is announcing a limited-time offer. The main action is to check the comments for pricing and availability.",
    alternates: [
      {
        title: "Comment thread brief",
        text: "The replies are mostly asking about sizes, delivery areas, and whether the discount applies this weekend.",
      },
      {
        title: "Marketplace signal",
        text: "The post looks promotional, with urgency around stock and a request to message the seller before checkout.",
      },
      {
        title: "Audience reaction",
        text: "Most visible comments are positive, but several people are waiting for a clearer price and pickup details.",
      },
      {
        title: "Offer check",
        text: "The visible caption points to a short sale window, with the strongest signal around availability and replies.",
      },
      {
        title: "Post intent",
        text: "This looks designed to drive direct messages rather than a checkout flow, so details may live in comments.",
      },
    ],
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
    id: "video-summary",
    title: "Video summary",
    text: "This video compares three budget laptops and highlights battery life, display quality, and upgrade options.",
    alternates: [
      {
        title: "Watchlist summary",
        text: "The creator recommends prioritizing RAM, keyboard comfort, and warranty terms over benchmark scores.",
      },
      {
        title: "Chapter overview",
        text: "The middle section focuses on real-world browsing, video calls, and thermals after long sessions.",
      },
      {
        title: "Video takeaway",
        text: "The best value pick is not the cheapest model, because storage and screen brightness matter more.",
      },
      {
        title: "Creator verdict",
        text: "The final recommendation favors balanced specs and a comfortable keyboard over raw processor speed.",
      },
      {
        title: "Comparison brief",
        text: "The side-by-side section makes battery, display brightness, and upgrade access the main decision points.",
      },
    ],
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
    id: "shopping-insight",
    title: "Shopping insight",
    text: "The product looks like a mid-range wireless headset. The key selling points are noise cancellation, long battery life, and lightweight design.",
    alternates: [
      {
        title: "Price comparison",
        text: "Similar headsets are cheaper during seasonal sales, but this listing includes stronger battery claims.",
      },
      {
        title: "Review pattern",
        text: "Positive reviews mention comfort and battery life, while lower ratings focus on microphone quality.",
      },
      {
        title: "Buying note",
        text: "Check return terms and replacement ear pads before ordering, especially if you use headphones daily.",
      },
      {
        title: "Feature scan",
        text: "The listing emphasizes wireless range, lightweight fit, and fast charging more than microphone performance.",
      },
      {
        title: "Deal signal",
        text: "The price appears reasonable if noise cancellation and battery life match the listed claims.",
      },
    ],
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
    id: "code-explanation",
    title: "Code explanation",
    text: "This component renders a reusable footer with external links, brand identity, and responsive spacing.",
    alternates: [
      {
        title: "Component scan",
        text: "The layout is mostly presentational, with link groups, icon imports, and mobile-friendly spacing.",
      },
      {
        title: "Code risk",
        text: "The structure looks stable, but repeated link markup could be moved into a small config array.",
      },
      {
        title: "Refactor note",
        text: "The footer would be easier to extend if social links and product links shared the same data shape.",
      },
      {
        title: "Implementation read",
        text: "The code is mostly layout and icon composition, with no complex state or data fetching paths.",
      },
      {
        title: "Maintainability note",
        text: "The repeated class names are manageable, but link metadata could become noisy as the footer grows.",
      },
    ],
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
    id: "place-overview",
    title: "Place overview",
    text: "This location appears to be a popular cafe near the city center, with strong reviews for desserts and quiet seating.",
    alternates: [
      {
        title: "Route context",
        text: "The map suggests a short walk from the main street, with parking more likely on nearby side roads.",
      },
      {
        title: "Visit timing",
        text: "Reviews imply afternoons are quieter, while evenings are busier and better for groups.",
      },
      {
        title: "Local highlight",
        text: "Desserts, calm seating, and friendly service are the recurring positives in the visible review snippets.",
      },
      {
        title: "Map context",
        text: "The place sits close to a busy route, so walking may be easier than finding a nearby parking spot.",
      },
      {
        title: "Review summary",
        text: "Recent impressions suggest a relaxed cafe with better dessert ratings than main dish ratings.",
      },
    ],
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
    id: "document-brief",
    title: "Document brief",
    text: "The document explains project milestones, current blockers, and the next actions required before launch.",
    alternates: [
      {
        title: "Action items",
        text: "The next steps are design review, release notes, QA signoff, and a final owner for rollout.",
      },
      {
        title: "Project status",
        text: "Most work appears complete, but launch depends on resolving two blockers and confirming dates.",
      },
      {
        title: "Meeting brief",
        text: "The notes emphasize deadlines, responsible owners, and what must be clarified before shipping.",
      },
      {
        title: "Blocker summary",
        text: "The biggest unresolved items are approval timing, QA ownership, and final copy before launch.",
      },
      {
        title: "Launch readout",
        text: "The plan is close to ready, but the document still needs a clearer owner for the release checklist.",
      },
    ],
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

const titleText = "Get AI-powered overviews";
const SHUFFLE_START_PROGRESS = 0.7;
const SHUFFLE_INTERVAL_MS = 900;
const CRISP_SWAP_PROGRESS = 0.76;
const TITLE_FRAME_SCROLL_PORTION = 0.62;
const CARD_SEQUENCE_START_PROGRESS = 0.58;
const CARD_ANIMATION_SCROLL_PORTION = 0.42;
const COMPACT_CARD_Y_OFFSET = "8vh";
const ENTRY_PROGRESS_BOOST = 0.045;
const TITLE_SCALE_EASE = cubicBezier(0.22, 1, 0.36, 1);
const TITLE_SWAP_EASE = cubicBezier(0.16, 1, 0.3, 1);

function clampProgress(value: number) {
  return Math.min(Math.max(value, 0), 1);
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
                    AI overview
                  </p>
                  <p className="mt-1 text-[0.62rem] leading-none text-slate-700/74">
                    Generated from your screen
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
            Generating...
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
                  AI overview
                </p>
                <p className="mt-1 text-[0.62rem] leading-none text-slate-700/74">
                  Generated from your screen
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
  const [shuffleActive, setShuffleActive] = useState(false);
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
      setShuffleActive(false);
      setIsCrispFrame(false);
      setShuffleIndex(0);
      titleWasInViewRef.current = false;
      setTitleAnimationKey(0);
      titleFrameProgress.set(0);
      timelineProgress.set(0);
    } else if (nextZone === "below") {
      setShuffleActive(false);
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

    const shouldShuffleMessages =
      sectionZoneRef.current === "inside" &&
      effectiveProgress >= SHUFFLE_START_PROGRESS;

    setShuffleActive((current) =>
      current === shouldShuffleMessages ? current : shouldShuffleMessages,
    );

    if (!shouldShuffleMessages && effectiveProgress < SHUFFLE_START_PROGRESS) {
      setShuffleIndex(0);
    }

    previousRawProgressRef.current = nextProgress;
  });

  useEffect(() => {
    if (!shuffleActive) {
      return;
    }

    setShuffleIndex((currentIndex) =>
      currentIndex === 0 ? 1 : currentIndex,
    );

    const intervalId = window.setInterval(() => {
      setShuffleIndex((currentIndex) => currentIndex + 1);
    }, SHUFFLE_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [shuffleActive]);

  useEffect(() => {
    const enteredView = titleInView && !titleWasInViewRef.current;

    if (enteredView && scrollDirectionRef.current === "down") {
      setTitleAnimationKey((currentKey) => currentKey + 1);
    }

    titleWasInViewRef.current = titleInView;
  }, [titleInView]);

  const titleOpacity = useTransform(
    titleFrameProgress,
    [0, 0.82, 0.9, 1],
    [1, 1, 0.92, 0],
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
            aria-label={titleText}
            className="relative mx-auto w-max max-w-[calc(100vw-2.5rem)] whitespace-nowrap font-product-sans text-[1.42rem] font-[450] leading-[0.9] text-slate-950 min-[390px]:text-[1.56rem] sm:max-w-[calc(100vw-4rem)] sm:text-[4.8rem] sm:leading-[0.88] lg:text-[5.75rem]"
          >
            <span aria-hidden="true" className="invisible block">
              {titleText}
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
                  text={titleText}
                  staggerDuration={0.018}
                  elementVisibilityAmount={0.35}
                  lineHeight={0.9}
                  className="ai-overviews-title-effect block whitespace-nowrap"
                />
              ) : (
                titleText
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
