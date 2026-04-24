import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValueEvent, useScroll } from "motion/react";
import { TextEffectFour } from "react-text-animate";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  WidgetCard,
} from "@/components/ui";
import {
  DownloadIcon,
  MacIcon,
  WindowsIcon,
  LinuxIcon,
} from "@/components/icons";
import { DOWNLOADS, LINKS } from "@/lib";
import { Setup, type SetupPlatform } from "./Setup";

type VisitorPlatform = "macos" | "windows" | "linux" | "unknown";
const DOWNLOAD_HEADING_STAGGER = 0.07;
const DOWNLOAD_HEADING_BASE_TEXT = "Download Squigit";
const DOWNLOAD_HEADING_HANDOFF_PADDING_MS = 40;
const DOWNLOAD_HEADING_LINE_GAP_CLASS = "gap-2";
const DOWNLOAD_CARD_VARIANTS = {
  hidden: { opacity: 0, y: 34, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1 },
} as const;

const VISITOR_PLATFORM_LABEL: Record<VisitorPlatform, string> = {
  macos: "macOS",
  windows: "Windows",
  linux: "Linux",
  unknown: "Free",
};

function detectVisitorPlatform(): VisitorPlatform {
  if (typeof navigator === "undefined") {
    return "unknown";
  }

  const navigatorWithUAData = navigator as Navigator & {
    userAgentData?: { platform?: string };
  };
  const fingerprint = [
    navigator.platform,
    navigator.userAgent,
    navigatorWithUAData.userAgentData?.platform,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (fingerprint.includes("mac")) {
    return "macos";
  }
  if (fingerprint.includes("win")) {
    return "windows";
  }
  if (fingerprint.includes("linux") || fingerprint.includes("x11")) {
    return "linux";
  }

  return "unknown";
}

function getPlatformIcon(name: string) {
  if (name === "MacOS") {
    return MacIcon;
  }
  if (name === "Windows") {
    return WindowsIcon;
  }
  if (name === "Linux") {
    return LinuxIcon;
  }
  return DownloadIcon;
}

function getPlatformIconClassName(name: string) {
  if (name === "MacOS") {
    return "h-7.5 w-7.5 pb-1 text-slate-950";
  }
  if (name === "Windows") {
    return "h-7.5 w-7.5 text-slate-950";
  }
  if (name === "Linux") {
    return "h-8.5 w-8.5 text-slate-950";
  }
  return "h-7 w-7 text-slate-950";
}

function getTextEffectFourStepCount(text: string) {
  const words = text.split(" ");
  return words.reduce((count, word, index) => {
    const graphemeCount = Array.from(word).length;
    const hasTrailingSpaceToken = index < words.length - 1;
    return count + graphemeCount + (hasTrailingSpaceToken ? 1 : 0);
  }, 0);
}

function isSetupPlatform(platformName: string): platformName is SetupPlatform {
  return (
    platformName === "MacOS" ||
    platformName === "Windows" ||
    platformName === "Linux"
  );
}

export function Download({ onNavigate }: { onNavigate?: () => void }) {
  const [visitorPlatform, setVisitorPlatform] = useState<VisitorPlatform>(
    "unknown",
  );
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [setupPlatform, setSetupPlatform] = useState<SetupPlatform | null>(
    null,
  );
  const [headingAnimationKey, setHeadingAnimationKey] = useState(0);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const headingWasInViewRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const scrollDirectionRef = useRef<"down" | "up">("down");
  const secondLineTimeoutRef = useRef<number | null>(null);
  const headingInView = useInView(headingRef, { amount: 0.55, once: false });
  const { scrollY } = useScroll();
  const headingSuffix = `for ${VISITOR_PLATFORM_LABEL[visitorPlatform]}`;
  const hasHeadingAnimationStarted = headingAnimationKey > 0;
  const lineOneDurationMs =
    Math.max(getTextEffectFourStepCount(DOWNLOAD_HEADING_BASE_TEXT) - 1, 0) *
      DOWNLOAD_HEADING_STAGGER *
      1000 +
    DOWNLOAD_HEADING_HANDOFF_PADDING_MS;

  const clearSecondLineTimeout = useCallback(() => {
    if (secondLineTimeoutRef.current === null) {
      return;
    }

    window.clearTimeout(secondLineTimeoutRef.current);
    secondLineTimeoutRef.current = null;
  }, []);

  const replayHeadingAnimation = useCallback(() => {
    clearSecondLineTimeout();
    setShowSecondLine(false);
    setHeadingAnimationKey((currentKey) => currentKey + 1);

    secondLineTimeoutRef.current = window.setTimeout(() => {
      setShowSecondLine(true);
      secondLineTimeoutRef.current = null;
    }, lineOneDurationMs);
  }, [clearSecondLineTimeout, lineOneDurationMs]);

  useEffect(() => {
    setVisitorPlatform(detectVisitorPlatform());
  }, []);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    return clearSecondLineTimeout;
  }, [clearSecondLineTimeout]);

  useMotionValueEvent(scrollY, "change", (currentScrollY) => {
    const scrollDelta = currentScrollY - lastScrollYRef.current;

    if (Math.abs(scrollDelta) >= 2) {
      scrollDirectionRef.current = scrollDelta > 0 ? "down" : "up";
      lastScrollYRef.current = currentScrollY;
    }
  });

  useEffect(() => {
    const enteredView = headingInView && !headingWasInViewRef.current;

    if (enteredView && scrollDirectionRef.current === "down") {
      replayHeadingAnimation();
    }

    headingWasInViewRef.current = headingInView;
  }, [headingInView, replayHeadingAnimation]);

  const openSetup = (platformName: string) => {
    if (!isSetupPlatform(platformName)) {
      return;
    }

    onNavigate?.();
    setSetupPlatform(platformName);
  };

  const closeSetup = () => {
    setSetupPlatform(null);
  };

  return (
    <section id="download" className="feature-scroll-section relative py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-10">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2
              ref={headingRef}
              className="relative text-4xl font-product-sans font-[450] tracking-[-0.05em] text-slate-950 md:text-5xl"
            >
              <span
                aria-hidden
                className={`invisible flex flex-col ${DOWNLOAD_HEADING_LINE_GAP_CLASS}`}
              >
                <span className="block">{DOWNLOAD_HEADING_BASE_TEXT}</span>
                <span className="block">{headingSuffix}</span>
              </span>
              <span
                className={`absolute inset-0 flex flex-col ${DOWNLOAD_HEADING_LINE_GAP_CLASS}`}
              >
                {hasHeadingAnimationStarted ? (
                  <TextEffectFour
                    key={`download-heading-base-${headingAnimationKey}`}
                    wrapperElement="span"
                    text={DOWNLOAD_HEADING_BASE_TEXT}
                    animateOnce
                    elementVisibilityAmount={0.55}
                    staggerDuration={DOWNLOAD_HEADING_STAGGER}
                    cursorConfig={
                      showSecondLine
                        ? { type: "hidden" }
                        : { marginLeft: "2px" }
                    }
                    className="block whitespace-nowrap"
                  />
                ) : (
                  <span className="block whitespace-nowrap">
                    {DOWNLOAD_HEADING_BASE_TEXT}
                  </span>
                )}
                {hasHeadingAnimationStarted && showSecondLine ? (
                  <TextEffectFour
                    key={`download-heading-suffix-${headingAnimationKey}-${visitorPlatform}`}
                    wrapperElement="span"
                    text={`${headingSuffix} `}
                    animateOnce
                    elementVisibilityAmount={0.55}
                    staggerDuration={DOWNLOAD_HEADING_STAGGER}
                    cursorConfig={{ marginLeft: "2px" }}
                    className="block whitespace-nowrap"
                  />
                ) : !hasHeadingAnimationStarted ? (
                  <span className="block whitespace-nowrap">
                    {headingSuffix}
                  </span>
                ) : (
                  <span aria-hidden className="block">
                    &nbsp;
                  </span>
                )}
              </span>
            </h2>
          </div>
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              onNavigate?.();
              window.open(
                LINKS.squigit.releases,
                "_blank",
                "noopener,noreferrer",
              );
            }}
            className="w-fit rounded-full border-slate-300 bg-white/90 px-4 text-slate-900 cursor-pointer"
          >
            View previous releases
          </Button>
        </div>

        <motion.div
          className="grid gap-6 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          transition={{ staggerChildren: 0.09, delayChildren: 0.05 }}
        >
          {DOWNLOADS.map((platform) => {
            const PlatformIcon = getPlatformIcon(platform.name);
            const platformIconClassName = getPlatformIconClassName(
              platform.name,
            );

            return (
              <motion.div
                key={platform.name}
                variants={DOWNLOAD_CARD_VARIANTS}
                transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="h-full rounded-[2rem] border-slate-200 bg-white/90 shadow-sm backdrop-blur transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_70px_-46px_rgba(15,23,42,0.55)]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-3xl tracking-[-0.04em]">
                      <PlatformIcon className={platformIconClassName} />
                      <span>{platform.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      {platform.items.map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => openSetup(platform.name)}
                          className="flex w-full items-center justify-start gap-2 rounded-2xl border-0 px-4 py-4 text-sm font-medium transition hover:bg-slate-50 cursor-pointer"
                        >
                          <DownloadIcon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                    <div className="rounded-2xl p-4">
                      <p className="mb-2 text-xxs font-[500] font-product-sans tracking-[0.18em] text-[#000]/95">
                        Minimum Requirements
                      </p>
                      <p className="text-sm leading-7 text-[#000]/80">
                        {platform.min}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      <WidgetCard
        open={setupPlatform !== null}
        onClose={closeSetup}
        title={setupPlatform ? `${setupPlatform} setup` : "Setup"}
      >
        {setupPlatform ? <Setup platform={setupPlatform} /> : null}
      </WidgetCard>
    </section>
  );
}
