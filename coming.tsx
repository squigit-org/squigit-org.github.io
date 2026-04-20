import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const QUOTES = [
  "Stuck on it? Squiggle it",
  "Feeling it? Circle it",
  "Can't describe it? Search it",
];

const DOWNLOADS = [
  {
    name: "MacOS",
    items: [
      { label: "Download for Apple Silicon", href: "#" },
      { label: "Download for Intel", href: "#" },
    ],
    min: "macOS versions with Apple security update support. This is typically the current and two previous versions. Min Version 12 (Monterey), X86 is not supported",
  },
  {
    name: "Windows",
    items: [
      { label: "Download for x64", href: "#" },
      { label: "Download for ARM64", href: "#" },
    ],
    min: "Windows 10 (64 bit)",
  },
  {
    name: "Linux",
    items: [{ label: "Download", href: "#" }],
    min: "glibc >= 2.28, glibcxx >= 3.4.25 (e.g. Ubuntu 20. Debian 10, Fedora 36, RHEL 8)",
  },
];

const PRODUCT_INSTALL = {
  mac: [
    "brew tap squigit-org/tap",
    "brew install squigit-ocr squigit-stt",
    "squigit-ocr --version",
    "squigit-stt --version",
  ],
  apt: [
    "sudo mkdir -p /etc/apt/keyrings",
    "curl -fsSL https://squigit-org.github.io/squigit-packages/keys/squigit-packages.asc | gpg --dearmor | sudo tee /etc/apt/keyrings/squigit-packages.gpg >/dev/null",
    'echo "deb [signed-by=/etc/apt/keyrings/squigit-packages.gpg] https://github.com/squigit-org/squigit-packages/raw/main/apt stable ocr stt" | sudo tee /etc/apt/sources.list.d/squigit-packages.list >/dev/null',
    "sudo apt-get update",
    "sudo apt-get install -y squigit-ocr squigit-stt",
  ],
  dnf: [
    "sudo curl -fsSL https://squigit-org.github.io/squigit-packages/rpm/squigit.repo -o /etc/yum.repos.d/squigit.repo",
    "sudo dnf makecache --refresh",
    "sudo dnf install -y squigit-ocr squigit-stt",
  ],
  winNow: [
    '$OcrTag = "ocr-v0.1.0"',
    '$SttTag = "stt-v0.1.0"',
    '$InstallRoot = Join-Path $env:LOCALAPPDATA "Programs\\Squigit"',
    '$OcrDir = Join-Path $InstallRoot "OCR"',
    '$SttDir = Join-Path $InstallRoot "STT"',
    "New-Item -ItemType Directory -Force -Path $OcrDir, $SttDir | Out-Null",
    '$OcrZip = Join-Path $env:TEMP "squigit-ocr-win-x64.zip"',
    '$SttZip = Join-Path $env:TEMP "squigit-stt-win-x64.zip"',
    'Invoke-WebRequest "https://github.com/squigit-org/squigit/releases/download/$OcrTag/squigit-ocr-win-x64.zip" -OutFile $OcrZip',
    'Invoke-WebRequest "https://github.com/squigit-org/squigit/releases/download/$SttTag/squigit-stt-win-x64.zip" -OutFile $SttZip',
    "Expand-Archive -LiteralPath $OcrZip -DestinationPath $OcrDir -Force",
    "Expand-Archive -LiteralPath $SttZip -DestinationPath $SttDir -Force",
    '$UserPath = [Environment]::GetEnvironmentVariable("Path", "User")',
    "foreach ($Entry in @($OcrDir, $SttDir)) { if (-not (($UserPath -split ';') -contains $Entry)) { if ([string]::IsNullOrWhiteSpace($UserPath)) { $UserPath = $Entry } else { $UserPath = \"$UserPath;$Entry\" } } }",
    '[Environment]::SetEnvironmentVariable("Path", $UserPath, "User")',
    '$env:Path = "$UserPath;$env:Path"',
    "squigit-ocr --version",
    "squigit-stt --version",
  ],
  winget: [
    "winget install --id SquigitOrg.SquigitOCR --exact --source winget --scope user --silent --disable-interactivity --accept-source-agreements --accept-package-agreements",
    "winget install --id SquigitOrg.SquigitSTT --exact --source winget --scope user --silent --disable-interactivity --accept-source-agreements --accept-package-agreements",
  ],
};

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type IconProps = {
  className?: string;
};

function IconBase({
  className,
  children,
  viewBox = "0 0 24 24",
}: React.PropsWithChildren<{ className?: string; viewBox?: string }>) {
  return (
    <svg
      aria-hidden="true"
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

function DownloadIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </IconBase>
  );
}

function GithubIcon({ className }: IconProps) {
  return (
    <IconBase className={className} viewBox="0 0 24 24">
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3" />
      <path d="M15 22v-3.9a3.4 3.4 0 0 0-.9-2.6c3  -.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 19 5.2 4.8 4.8 0 0 0 18.9 2S17.7 1.7 15 3.5a13.4 13.4 0 0 0-6 0C6.3 1.7 5.1 2 5.1 2A4.8 4.8 0 0 0 5 5.2 5.2 5.2 0 0 0 3.7 8.8c0 5.2 3.2 6.4 6.2 6.7A3.4 3.4 0 0 0 9 18.1V22" />
    </IconBase>
  );
}

function SparklesIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z" />
      <path d="M5 16l.8 2.2L8 19l-2.2.8L5 22l-.8-2.2L2 19l2.2-.8L5 16Z" />
      <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z" />
    </IconBase>
  );
}

function SearchIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </IconBase>
  );
}

function ScanTextIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M4 7V5a1 1 0 0 1 1-1h2" />
      <path d="M20 7V5a1 1 0 0 0-1-1h-2" />
      <path d="M4 17v2a1 1 0 0 0 1 1h2" />
      <path d="M20 17v2a1 1 0 0 1-1 1h-2" />
      <path d="M8 8h8" />
      <path d="M8 12h8" />
      <path d="M10 16h4" />
    </IconBase>
  );
}

function ChevronDownIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="m6 9 6 6 6-6" />
    </IconBase>
  );
}

function runStaticChecks() {
  const tests = [
    {
      name: "quotes count",
      pass: QUOTES.length === 3,
    },
    {
      name: "downloads include all platforms",
      pass:
        DOWNLOADS.map((item) => item.name).join(",") === "MacOS,Windows,Linux",
    },
    {
      name: "product install sections exist",
      pass: ["mac", "apt", "dnf", "winNow", "winget"].every(
        (key) => key in PRODUCT_INSTALL,
      ),
    },
    {
      name: "each quote is non-empty",
      pass: QUOTES.every((quote) => quote.trim().length > 0),
    },
  ];

  const failed = tests.filter((test) => !test.pass);
  if (failed.length > 0) {
    throw new Error(
      `Static checks failed: ${failed.map((test) => test.name).join(", ")}`,
    );
  }
}

runStaticChecks();

function NeonBackground() {
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

function ScribbleWord({
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

function QuoteSection({ quote, index }: { quote: string; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: false, amount: 0.35 });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[95vh] items-center justify-center px-6 py-24"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-[8%] top-[18%] h-44 w-44 rounded-full border border-cyan-400/30 blur-[1px]"
          animate={{ rotate: 360, scale: isInView ? 1.08 : 0.96 }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.8 },
          }}
        />
        <motion.div
          className="absolute bottom-[16%] right-[10%] h-56 w-56 rounded-full border border-violet-500/30"
          animate={{ rotate: -360, scale: isInView ? 1 : 0.9 }}
          transition={{
            rotate: { duration: 24, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.8 },
          }}
        />
        <motion.svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1200 700"
          fill="none"
          preserveAspectRatio="none"
          initial={false}
        >
          <motion.path
            d={
              index % 2 === 0
                ? "M60 350 C 240 90, 430 120, 600 350 S 980 600, 1140 340"
                : "M80 270 C 240 520, 440 570, 620 330 S 930 60, 1130 310"
            }
            stroke="url(#sectionGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            className="opacity-40"
            initial={{ pathLength: 0.15, pathOffset: 1 }}
            animate={{ pathLength: [0.15, 0.35, 0.15], pathOffset: [1, 0, -1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <defs>
            <linearGradient id="sectionGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-700 shadow-sm backdrop-blur">
          <SparklesIcon className="h-4 w-4" />
          Scroll-triggered scribble text
        </div>
        <ScribbleWord
          text={quote}
          className="text-5xl font-semibold tracking-[-0.05em] text-slate-950 md:text-7xl lg:text-8xl"
        />
      </div>
    </section>
  );
}

function CodeBlock({ lines, language }: { lines: string[]; language: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-xl">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-xs text-slate-400">
        <span>{language}</span>
        <span>copy-ready</span>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-7 text-slate-100">
        <code>{lines.join("\n")}</code>
      </pre>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <nav className="flex flex-wrap items-center gap-2">
          {[
            ["Products", "#products"],
            ["Use Cases", "#use-cases"],
            ["Repository", "#repository"],
            ["Resources", "#resources"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
            >
              {label}
            </a>
          ))}
        </nav>

        <a href="#download">
          <Button className="rounded-full bg-slate-950 px-5 text-white hover:bg-slate-800">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Download
          </Button>
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <section
      ref={targetRef}
      className="relative flex min-h-screen items-center justify-center px-6"
    >
      <motion.div
        style={{ y, scale }}
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm text-slate-700 shadow-sm"
        >
          <SparklesIcon className="h-4 w-4" />
          Open-source AI vision for desktop
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08 }}
          className="text-6xl font-semibold tracking-[-0.08em] text-slate-950 md:text-8xl lg:text-[9rem]"
        >
          Squigit
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18 }}
          className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 md:text-2xl md:leading-10"
        >
          Squiggle anything you see on your screen and get instant AI overview,
          OCR, and Search without switching apps.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.28 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a href="#download">
            <Button
              size="lg"
              className="rounded-full bg-slate-950 px-7 text-white hover:bg-slate-800"
            >
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download
            </Button>
          </a>
          <a
            href="https://github.com/squigit-org/squigit"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-slate-300 bg-white/90 px-7"
            >
              <GithubIcon className="mr-2 h-4 w-4" />
              View Repository
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="mt-20 flex flex-col items-center text-slate-500"
        >
          <span className="text-sm">Scroll to see it in motion</span>
          <ChevronDownIcon className="mt-2 h-5 w-5 animate-bounce" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function UseCases() {
  const items = [
    {
      icon: SearchIcon,
      title: "Instant overview",
      desc: "Circle any UI, screen bug, design, object, or snippet and get an immediate AI explanation in place.",
    },
    {
      icon: ScanTextIcon,
      title: "OCR that keeps context",
      desc: "Pull text from your screen, then keep chatting with the captured context instead of losing your flow.",
    },
    {
      icon: SparklesIcon,
      title: "Visual search without app switching",
      desc: "From one hotkey to capture, inspect, and search. No screenshot folder juggling, no tab chaos.",
    },
  ];

  return (
    <section id="use-cases" className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Use Cases
          </p>
          <h2 className="text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
            Built for the moments where pointing is easier than explaining.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className="rounded-[2rem] border-slate-200 bg-white/90 shadow-sm backdrop-blur"
              >
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-2xl tracking-[-0.04em]">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-7 text-slate-600">
                    {item.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DownloadSection() {
  return (
    <section id="download" className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Select download
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
              Get Squigit on your platform.
            </h2>
          </div>
          <p className="max-w-xl text-slate-600">
            Pick your OS, download the right build, and start circling anything
            on your screen.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {DOWNLOADS.map((platform) => (
            <Card
              key={platform.name}
              className="rounded-[2rem] border-slate-200 bg-white/90 shadow-sm backdrop-blur"
            >
              <CardHeader>
                <CardTitle className="text-3xl tracking-[-0.04em]">
                  {platform.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {platform.items.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-4 text-sm font-medium transition hover:border-slate-300 hover:bg-slate-50"
                    >
                      <span>{item.label}</span>
                      <DownloadIcon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Minimum Requirements
                  </p>
                  <p className="text-sm leading-7 text-slate-600">
                    {platform.min}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductsSection() {
  return (
    <section id="products" className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Products
          </p>
          <h2 className="text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
            Squigit OCR and Squigit STT installation.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            This guide installs both sidecars:{" "}
            <span className="font-medium text-slate-900">squigit-ocr</span> and{" "}
            <span className="font-medium text-slate-900">squigit-stt</span>.
          </p>
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white/80 p-5 text-sm leading-7 text-slate-600">
            <p>As of April 20, 2026:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>macOS (Apple Silicon) is available via Homebrew tap.</li>
              <li>Linux is available via signed APT and DNF repositories.</li>
              <li>
                Windows Winget manifests are prepared, but Winget publication is
                not merged yet, so use direct ZIP installs for now.
              </li>
            </ul>
          </div>
        </div>

        <div className="grid gap-8">
          <Card className="rounded-[2rem] border-slate-200 bg-white/90 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl tracking-[-0.04em]">
                macOS (Apple Silicon / arm64)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock language="bash" lines={PRODUCT_INSTALL.mac} />
            </CardContent>
          </Card>

          <div className="grid gap-8 xl:grid-cols-2">
            <Card className="rounded-[2rem] border-slate-200 bg-white/90 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl tracking-[-0.04em]">
                  Debian/Ubuntu (APT)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="bash" lines={PRODUCT_INSTALL.apt} />
              </CardContent>
            </Card>
            <Card className="rounded-[2rem] border-slate-200 bg-white/90 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl tracking-[-0.04em]">
                  Fedora/RHEL (DNF)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="bash" lines={PRODUCT_INSTALL.dnf} />
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-[2rem] border-slate-200 bg-white/90 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl tracking-[-0.04em]">
                Windows (clean machine, right now)
              </CardTitle>
              <CardDescription className="text-base leading-7 text-slate-600">
                Winget package IDs are defined as{" "}
                <span className="font-medium text-slate-900">
                  SquigitOrg.SquigitOCR
                </span>{" "}
                and{" "}
                <span className="font-medium text-slate-900">
                  SquigitOrg.SquigitSTT
                </span>
                , but until Winget PRs are merged, install from release ZIPs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock language="powershell" lines={PRODUCT_INSTALL.winNow} />
              <p className="mt-4 text-sm text-slate-600">
                If newer tags exist, replace{" "}
                <span className="font-medium text-slate-900">ocr-v0.1.0</span>{" "}
                and{" "}
                <span className="font-medium text-slate-900">stt-v0.1.0</span>{" "}
                with the current tags from the releases page.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-slate-200 bg-white/90 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl tracking-[-0.04em]">
                Windows (when Winget is live)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock language="powershell" lines={PRODUCT_INSTALL.winget} />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      id="resources"
      className="relative border-t border-slate-200 px-6 py-10"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold tracking-[-0.04em] text-slate-950">
            Squigit
          </p>
          <p className="text-sm text-slate-600">
            Open-source desktop AI vision utility for screen capture, OCR, and
            search.
          </p>
        </div>
        <div id="repository" className="flex items-center gap-3">
          <a
            href="https://github.com/squigit-org/squigit"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub Repository
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function SquigitLandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <NeonBackground />
      <Header />
      <main className="relative">
        <Hero />
        {mounted &&
          QUOTES.map((quote, index) => (
            <QuoteSection key={quote} quote={quote} index={index} />
          ))}
        <UseCases />
        <DownloadSection />
        <ProductsSection />
      </main>
      <Footer />
    </div>
  );
}
