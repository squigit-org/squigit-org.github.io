import { motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const content = `
# Squigit OCR + STT Installation

This guide installs both sidecars:

- \`squigit-ocr\`
- \`squigit-stt\`

As of April 20, 2026:

- macOS (Apple Silicon) is available via Homebrew tap.
- Linux is available via signed APT and DNF repositories.
- Windows Winget manifests are prepared, but Winget publication is not merged yet, so use direct ZIP installs for now.

## macOS (Apple Silicon / arm64)

\`\`\`bash
brew tap squigit-org/tap
brew install squigit-ocr squigit-stt
\`\`\`

Verify:

\`\`\`bash
squigit-ocr --version
squigit-stt --version
\`\`\`

## Debian/Ubuntu (APT)

### 1) Add Squigit repository

\`\`\`bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://squigit-org.github.io/squigit-packages/keys/squigit-packages.asc | \\
  gpg --dearmor | sudo tee /etc/apt/keyrings/squigit-packages.gpg >/dev/null
echo "deb [signed-by=/etc/apt/keyrings/squigit-packages.gpg] https://github.com/squigit-org/squigit-packages/raw/main/apt stable ocr stt" | \\
  sudo tee /etc/apt/sources.list.d/squigit-packages.list >/dev/null
\`\`\`

### 2) Update package index

\`\`\`bash
sudo apt-get update
\`\`\`

### 3) Install

\`\`\`bash
sudo apt-get install -y squigit-ocr squigit-stt
\`\`\`

## Fedora/RHEL (DNF)

### 1) Add Squigit repository

\`\`\`bash
sudo curl -fsSL https://squigit-org.github.io/squigit-packages/rpm/squigit.repo \\
  -o /etc/yum.repos.d/squigit.repo
\`\`\`

### 2) Update package metadata

\`\`\`bash
sudo dnf makecache --refresh
\`\`\`

### 3) Install

\`\`\`bash
sudo dnf install -y squigit-ocr squigit-stt
\`\`\`

## Windows (clean machine, right now)

Winget package IDs are defined as:

- \`SquigitOrg.SquigitOCR\`
- \`SquigitOrg.SquigitSTT\`

But until Winget PRs are merged, install from release ZIPs.

### PowerShell install (user scope)

\`\`\`powershell
$OcrTag = "ocr-v0.1.0"
$SttTag = "stt-v0.1.0"

$InstallRoot = Join-Path $env:LOCALAPPDATA "Programs\\Squigit"
$OcrDir = Join-Path $InstallRoot "OCR"
$SttDir = Join-Path $InstallRoot "STT"
New-Item -ItemType Directory -Force -Path $OcrDir, $SttDir | Out-Null

$OcrZip = Join-Path $env:TEMP "squigit-ocr-win-x64.zip"
$SttZip = Join-Path $env:TEMP "squigit-stt-win-x64.zip"

Invoke-WebRequest "https://github.com/squigit-org/squigit/releases/download/$OcrTag/squigit-ocr-win-x64.zip" -OutFile $OcrZip
Invoke-WebRequest "https://github.com/squigit-org/squigit/releases/download/$SttTag/squigit-stt-win-x64.zip" -OutFile $SttZip

Expand-Archive -LiteralPath $OcrZip -DestinationPath $OcrDir -Force
Expand-Archive -LiteralPath $SttZip -DestinationPath $SttDir -Force

$UserPath = [Environment]::GetEnvironmentVariable("Path", "User")
foreach ($Entry in @($OcrDir, $SttDir)) {
  if (-not (($UserPath -split ';') -contains $Entry)) {
    if ([string]::IsNullOrWhiteSpace($UserPath)) {
      $UserPath = $Entry
    } else {
      $UserPath = "$UserPath;$Entry"
    }
  }
}
[Environment]::SetEnvironmentVariable("Path", $UserPath, "User")
$env:Path = "$UserPath;$env:Path"

squigit-ocr --version
squigit-stt --version
\`\`\`

If newer tags exist, replace:

- \`ocr-v0.1.0\`
- \`stt-v0.1.0\`

with the current tags from:

- https://github.com/squigit-org/squigit/releases

## Windows (when Winget is live)

Use these exact commands:

\`\`\`powershell
winget install --id SquigitOrg.SquigitOCR --exact --source winget --scope user --silent --disable-interactivity --accept-source-agreements --accept-package-agreements
winget install --id SquigitOrg.SquigitSTT --exact --source winget --scope user --silent --disable-interactivity --accept-source-agreements --accept-package-agreements
\`\`\`
`;

export function ProductSection() {
  return (
    <section className="container mx-auto px-4 py-32 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-900 rounded-[40px] p-10 text-slate-300 font-mono text-sm overflow-hidden flex flex-col shadow-2xl border-4 border-slate-800 min-h-[600px] relative"
      >
        <div className="flex gap-2.5 mb-8 border-b border-white/5 pb-6">
          <div className="w-3.5 h-3.5 rounded-full bg-red-500/40"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/40"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-green-500/40"></div>
          <span className="ml-4 opacity-40 text-xs tracking-widest uppercase">squigit-ocr-stt-install.sh</span>
          <div className="ml-auto w-2 h-2 rounded-full bg-neon-lime animate-pulse"></div>
        </div>

        <div className="prose prose-invert prose-zinc max-w-none 
          prose-headings:font-heading prose-headings:tracking-tighter prose-headings:font-black
          prose-h1:text-neon-lime prose-h2:text-neon-cyan prose-h3:text-neon-pink
          prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl
          prose-code:text-neon-lime prose-code:before:content-none prose-code:after:content-none
          prose-a:text-neon-cyan hover:prose-a:text-white transition-colors"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>

        <div className="mt-12 flex justify-between items-center pt-6 border-t border-white/5 opacity-40 text-[10px] tracking-widest uppercase font-bold">
          <span>github.com/squigit-org/squigit</span>
          <div className="flex gap-4">
            <span className="text-neon-lime">System Ready</span>
            <span className="animate-pulse text-neon-lime">_</span>
          </div>
        </div>

        {/* Decorative background blur in terminal */}
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-neon-lime/5 blur-3xl rounded-full -mr-32 pointer-events-none"></div>
      </motion.div>
    </section>
  );
}
