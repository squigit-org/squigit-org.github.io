export const QUOTES = [
  "Stuck on it? Squiggle it",
  "Feeling it? Circle it",
  "Can't describe it? Search it",
];

export const DOWNLOADS = [
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
    href: "https://github.com/squigit-org/squigit/tree/main/docs",
  },
  {
    label: "Changelog",
    href: "https://github.com/squigit-org/squigit/blob/main/CHANGELOG.md",
  },
  {
    label: "Releases",
    href: "https://github.com/squigit-org/squigit/releases",
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
  winget: [
    "winget install --id SquigitOrg.SquigitOCR --exact --source winget --scope user --silent --disable-interactivity --accept-source-agreements --accept-package-agreements",
    "winget install --id SquigitOrg.SquigitSTT --exact --source winget --scope user --silent --disable-interactivity --accept-source-agreements --accept-package-agreements",
  ],
};

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
      pass: ["mac", "apt", "dnf", "winget"].every(
        (key) => key in PRODUCT_INSTALL,
      ),
    },
    {
      name: "use case fields are non-empty",
      pass: USE_CASES.every(
        (item) =>
          item.shortLabel.trim().length > 0 &&
          item.title.trim().length > 0 &&
          item.desc.trim().length > 0,
      ),
    },
    {
      name: "each quote is non-empty",
      pass: QUOTES.every((quote) => quote.trim().length > 0),
    },
    {
      name: "resource links are non-empty",
      pass: RESOURCE_LINKS.every(
        (item) =>
          item.label.trim().length > 0 && item.href.startsWith("https://"),
      ),
    },
    {
      name: "use case hero lines are non-empty",
      pass: USE_CASES_HERO_LINES.every((line) => line.trim().length > 0),
    },
    {
      name: "resources hero lines are non-empty",
      pass: RESOURCES_HERO_LINES.every((line) => line.trim().length > 0),
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
