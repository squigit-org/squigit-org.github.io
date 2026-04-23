import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { TextEffectTwo } from "react-text-animate";
import { Button } from "@/src/components/ui/button";
import {
  AppBrandIcon,
  DownloadIcon,
  LinuxIcon,
  MacIcon,
  WindowsIcon,
} from "@/src/components/icons";
import { HERO_TEXT } from "@/src/lib/constants";

type HeroPlatform = "macos" | "windows" | "linux" | "unknown";

const HERO_TEXT_EFFECT = {
  animationDuration: 0.5,
  staggerDuration: 0.13,
  initialDelay: 0,
  filter: true,
} as const;

const HERO_PLATFORM_META = {
  macos: { label: "Download for macOS", icon: MacIcon },
  windows: { label: "Download for Windows", icon: WindowsIcon },
  linux: { label: "Download for Linux", icon: LinuxIcon },
  unknown: { label: "Download", icon: DownloadIcon },
} satisfies Record<
  HeroPlatform,
  { label: string; icon: typeof DownloadIcon }
>;

function detectHeroPlatform(): HeroPlatform {
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

export function Hero() {
  const [showHeroMeta, setShowHeroMeta] = useState(false);
  const [userPlatform, setUserPlatform] = useState<HeroPlatform>("unknown");

  const openUseCasesDropdown = () => {
    window.dispatchEvent(new Event("squigit:open-use-cases"));
  };

  const targetRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  const heroTextInView = useInView(textRef, { once: true, amount: 0.5 });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroSentence = HERO_TEXT.join(" ");

  useEffect(() => {
    setUserPlatform(detectHeroPlatform());
  }, []);

  useEffect(() => {
    if (!heroTextInView) {
      return;
    }

    const wordCount = heroSentence.trim().split(/\s+/).length;
    const totalDurationMs =
      (HERO_TEXT_EFFECT.initialDelay +
        HERO_TEXT_EFFECT.animationDuration +
        Math.max(wordCount - 1, 0) * HERO_TEXT_EFFECT.staggerDuration) *
      1000;
    const timeoutId = window.setTimeout(() => {
      setShowHeroMeta(true);
    }, totalDurationMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [heroSentence, heroTextInView]);

  const platformMeta = HERO_PLATFORM_META[userPlatform];
  const PlatformIcon = platformMeta.icon;

  return (
    <section
      id="home"
      ref={targetRef}
      className="relative flex min-h-screen items-center justify-center px-5"
    >
      <motion.div
        style={{ y }}
        className="relative z-10 mx-auto -mt-14 max-w-5xl text-center sm:-mt-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={showHeroMeta ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.98, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex justify-center"
        >
          <div className="flex items-center text-slate-950">
            <AppBrandIcon className="h-10 w-10 shrink-0 sm:h-11 sm:w-11" />
            <span className="pl-2 font-product-sans text-2xl font-[450] tracking-tight sm:text-3xl">
              Squigit
            </span>
          </div>
        </motion.div>

        <div
          ref={textRef}
          className="mx-auto flex max-w-4xl flex-col items-center gap-0.5 sm:gap-1.5"
        >
          <TextEffectTwo
            animateOnce
            key={heroSentence}
            className="text-center text-3xl font-semibold leading-[1.02] tracking-[-0.045em] text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl"
            text={heroSentence}
            animationDuration={HERO_TEXT_EFFECT.animationDuration}
            staggerDuration={HERO_TEXT_EFFECT.staggerDuration}
            initialDelay={HERO_TEXT_EFFECT.initialDelay}
            filter={HERO_TEXT_EFFECT.filter}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 38 }}
          animate={showHeroMeta ? { opacity: 1, y: 0 } : { opacity: 0, y: 38 }}
          transition={{ duration: 1.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-18 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a href="#download">
            <Button
              size="lg"
              className="h-12 rounded-full bg-slate-950 px-7 text-[1.03rem] text-white hover:bg-slate-800 cursor-pointer"
            >
              <PlatformIcon size={22} className="shrink-0" />
              {platformMeta.label}
            </Button>
          </a>
          <Button
            size="lg"
            onClick={openUseCasesDropdown}
            className="h-12 rounded-full bg-transparent px-5 text-[1.03rem] text-black cursor-pointer"
          >
            Explore use cases
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
