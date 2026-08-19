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
    min: "Windows 11 (64-bit), OS build 22621 or newer.",
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
    "brew install squigit-cli squigit-ocr",
    "squigit-cli --version",
    "squigit-ocr --version",
  ],
  apt: [
    "sudo mkdir -p /etc/apt/keyrings",
    `curl -fsSL ${LINKS.packages.aptKey} | gpg --dearmor | sudo tee /etc/apt/keyrings/distribution.gpg >/dev/null`,
    `echo "deb [signed-by=/etc/apt/keyrings/distribution.gpg] ${LINKS.packages.aptRepository} stable cli ocr" | sudo tee /etc/apt/sources.list.d/distribution.list >/dev/null`,
    "sudo apt-get update",
    "sudo apt-get install -y squigit-cli squigit-ocr",
  ],
  dnf: [
    `sudo curl -fsSL ${LINKS.packages.rpmRepositoryFile} -o /etc/yum.repos.d/squigit.repo`,
    "sudo dnf makecache --refresh",
    "sudo dnf install -y squigit-cli squigit-ocr",
  ],
  winget: [
    "winget install SquigitOrg.SquigitCLI",
    "winget install SquigitOrg.SquigitOCR",
  ],
};
