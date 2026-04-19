# Squigit Linux Package Repositories

Squigit publishes signed Linux package repositories on GitHub Pages. Each lane keeps the latest installable package (`.deb` / `.rpm`) plus signed metadata so APT/DNF can install directly.

- Package repo site: `https://squigit-org.github.io/squigit-packages`
- Release assets archive: `https://github.com/squigit-org/squigit/releases`

## APT (Debian/Ubuntu)

1. Add repository + key

```bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://squigit-org.github.io/squigit-packages/keys/squigit-packages.asc | \
  gpg --dearmor | sudo tee /etc/apt/keyrings/squigit-packages.gpg >/dev/null
echo "deb [signed-by=/etc/apt/keyrings/squigit-packages.gpg] https://squigit-org.github.io/squigit-packages/apt stable ocr stt" | \
  sudo tee /etc/apt/sources.list.d/squigit-packages.list >/dev/null
```

2. Update cache

```bash
sudo apt update
```

3. Install packages

```bash
sudo apt install squigit-ocr squigit-stt
```

## DNF (Fedora/RHEL)

1. Add repository file

```bash
sudo curl -fsSL https://squigit-org.github.io/squigit-packages/rpm/squigit.repo \
  -o /etc/yum.repos.d/squigit.repo
```

2. Update cache

```bash
sudo dnf makecache
```

3. Install packages

```bash
sudo dnf install squigit-ocr squigit-stt
```
