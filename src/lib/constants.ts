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
  winNow: [
    '$OcrTag = "ocr-v0.1.0"',
    '$SttTag = "stt-v0.1.0"',
    '$InstallRoot = Join-Path $env:LOCALAPPDATA "Programs\\\\Squigit"',
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
