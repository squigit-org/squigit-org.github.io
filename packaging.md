# Squigit Linux Package Repositories

Squigit publishes signed Linux package repositories for Debian/Ubuntu (APT) and Fedora/RHEL (DNF).

- Package repo site: `https://squigit-org.github.io/squigit-packages`
- Release assets archive: `https://github.com/squigit-org/squigit/releases`

## APT (Debian/Ubuntu)

1. Add the repository to `sources.list.d`

```bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://squigit-org.github.io/squigit-packages/keys/squigit-packages.asc | \
  gpg --dearmor | sudo tee /etc/apt/keyrings/squigit-packages.gpg >/dev/null
echo "deb [signed-by=/etc/apt/keyrings/squigit-packages.gpg] https://github.com/squigit-org/squigit-packages/raw/main/apt stable ocr stt" | \
  sudo tee /etc/apt/sources.list.d/squigit-packages.list >/dev/null
```

2. Update the package cache

```bash
sudo apt update
```

3. Install the packages

```bash
sudo apt install squigit-ocr squigit-stt
```

## DNF (Fedora/RHEL)

1. Add the repository to `/etc/yum.repos.d`

```bash
sudo curl -fsSL https://squigit-org.github.io/squigit-packages/rpm/squigit.repo \
  -o /etc/yum.repos.d/squigit.repo
```

2. Update the package cache

```bash
sudo dnf makecache
```

3. Install the packages

```bash
sudo dnf install squigit-ocr squigit-stt
```
