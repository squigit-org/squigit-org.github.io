# Squigit OCR + STT Installation

This guide installs both sidecars:

- `squigit-ocr`
- `squigit-stt`

As of April 20, 2026:

- macOS (Apple Silicon) is available via Homebrew tap.
- Linux is available via signed APT and DNF repositories.
- Windows Winget manifests are prepared, but Winget publication is not merged yet, so use direct ZIP installs for now.

## macOS (Apple Silicon / arm64)

```bash
brew tap squigit-org/tap
brew install squigit-ocr squigit-stt
```

Verify:

```bash
squigit-ocr --version
squigit-stt --version
```

## Debian/Ubuntu (APT)

### 1) Add Squigit repository

```bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://squigit-org.github.io/squigit-packages/keys/squigit-packages.asc | \
  gpg --dearmor | sudo tee /etc/apt/keyrings/squigit-packages.gpg >/dev/null
echo "deb [signed-by=/etc/apt/keyrings/squigit-packages.gpg] https://github.com/squigit-org/squigit-packages/raw/main/apt stable ocr stt" | \
  sudo tee /etc/apt/sources.list.d/squigit-packages.list >/dev/null
```

### 2) Update package index

```bash
sudo apt-get update
```

### 3) Install

```bash
sudo apt-get install -y squigit-ocr squigit-stt
```

## Fedora/RHEL (DNF)

### 1) Add Squigit repository

```bash
sudo curl -fsSL https://squigit-org.github.io/squigit-packages/rpm/squigit.repo \
  -o /etc/yum.repos.d/squigit.repo
```

### 2) Update package metadata

```bash
sudo dnf makecache --refresh
```

### 3) Install

```bash
sudo dnf install -y squigit-ocr squigit-stt
```

## Windows (clean machine, right now)

Winget package IDs are defined as:

- `SquigitOrg.SquigitOCR`
- `SquigitOrg.SquigitSTT`

But until Winget PRs are merged, install from release ZIPs.

### PowerShell install (user scope)

```powershell
$OcrTag = "ocr-v0.1.0"
$SttTag = "stt-v0.1.0"

$InstallRoot = Join-Path $env:LOCALAPPDATA "Programs\Squigit"
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
```

If newer tags exist, replace:

- `ocr-v0.1.0`
- `stt-v0.1.0`

with the current tags from:

- https://github.com/squigit-org/squigit/releases

## Windows (when Winget is live)

Use these exact commands:

```powershell
winget install --id SquigitOrg.SquigitOCR --exact --source winget --scope user --silent --disable-interactivity --accept-source-agreements --accept-package-agreements
winget install --id SquigitOrg.SquigitSTT --exact --source winget --scope user --silent --disable-interactivity --accept-source-agreements --accept-package-agreements
```
