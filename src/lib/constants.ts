import { LINKS } from "./links";

export const DOWNLOADS = [
  {
    name: "macOS",
    items: [{ label: "Download for Apple Silicon", href: "#" }],
    min: "macOS versions with Apple security update support. This is typically the current and two previous versions. Minimum version 12 (Monterey). Apple Silicon (M1+) only.",
  },
  {
    name: "Windows",
    items: [{ label: "Download for x64", href: "#" }],
    min: "Windows 10 (64 bit)",
  },
  {
    name: "Linux",
    items: [{ label: "Download", href: "#" }],
    min: "glibc >= 2.35, glibcxx >= 3.4.30 (e.g. Ubuntu 22.04, Debian 12, Fedora 38, RHEL 9)",
  },
];

export type UseCaseIconKey = "search" | "scanText" | "sparkles";

export const HERO_TEXT = [
  "Get instant understanding of",
  "anything you squiggle.",
];

export const USE_CASES: Array<{
  icon: UseCaseIconKey;
  shortLabel: string;
  title: string;
  desc: string;
}> = [
  {
    icon: "sparkles",
    shortLabel: "Quick Review",
    title: "Instant overview",
    desc: "Circle any UI, screen bug, design, object, or snippet and get an immediate AI explanation in place.",
  },
  {
    icon: "scanText",
    shortLabel: "Text Context",
    title: "OCR that keeps context",
    desc: "Pull text from your screen, then keep chatting with the captured context instead of losing your flow.",
  },
  {
    icon: "search",
    shortLabel: "Visual Search",
    title: "Visual search without app switching",
    desc: "From one hotkey to capture, inspect, and search. No screenshot folder juggling, no tab chaos.",
  },
];

export const USE_CASES_HERO_LINES = [
  "built for the moments",
  "where pointing is easier",
  "than explaining.",
];

export const RESOURCES_HERO_LINES = [
  "Evreything you",
  "need to stay up-to-",
  "date and get help",
];

export const RESOURCE_LINKS: Array<{
  label: string;
  href: string;
}> = [
  {
    label: "Documentation",
    href: LINKS.squigit.docs,
  },
  {
    label: "Changelog",
    href: LINKS.squigit.changelog,
  },
  {
    label: "Releases",
    href: LINKS.squigit.releases,
  },
];

export const PRODUCT_INSTALL = {
  mac: [
    "brew tap squigit-org/tap",
    "brew install squigit-ocr squigit-stt",
    "squigit-ocr --version",
    "squigit-stt --version",
  ],
  apt: [
    "sudo mkdir -p /etc/apt/keyrings",
    `curl -fsSL ${LINKS.packages.aptKey} | gpg --dearmor | sudo tee /etc/apt/keyrings/squigit-packages.gpg >/dev/null`,
    `echo "deb [signed-by=/etc/apt/keyrings/squigit-packages.gpg] ${LINKS.packages.aptRepository} stable ocr stt" | sudo tee /etc/apt/sources.list.d/squigit-packages.list >/dev/null`,
    "sudo apt-get update",
    "sudo apt-get install -y squigit-ocr squigit-stt",
  ],
  dnf: [
    `sudo curl -fsSL ${LINKS.packages.rpmRepositoryFile} -o /etc/yum.repos.d/squigit.repo`,
    "sudo dnf makecache --refresh",
    "sudo dnf install -y squigit-ocr squigit-stt",
  ],
  winget: [
    "winget install SquigitOrg.SquigitOCR",
    "winget install SquigitOrg.SquigitSTT",
  ],
};
