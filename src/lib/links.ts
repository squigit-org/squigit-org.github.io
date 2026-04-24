const SQUIGIT_REPO = "https://github.com/squigit-org/squigit";
const SQUIGIT_PACKAGES_SITE = "https://squigit-org.github.io/squigit-packages";
const SQUIGIT_PACKAGES_REPO = "https://github.com/squigit-org/squigit-packages";

export const LINKS = {
  externalUrlPrefix: "https://",
  anchors: {
    home: "#home",
    products: "#products",
    useCases: "#use-cases",
    pricing: "#pricing",
    download: "#download",
  },
  legal: {
    privacy: "/legal/privacy.html",
    terms: "/legal/terms.html",
  },
  contact: {
    email: "mailto:a7mddra@gmail.com?subject=Inquiry&body=Hi%20there,",
  },
  social: {
    x: "https://x.com/a7mddra",
    linkedIn: "https://www.linkedin.com/in/a7mddra/",
  },
  squigit: {
    repository: SQUIGIT_REPO,
    docs: `${SQUIGIT_REPO}/tree/main/docs`,
    changelog: `${SQUIGIT_REPO}/blob/main/CHANGELOG.md`,
    releases: `${SQUIGIT_REPO}/releases`,
    readme: `${SQUIGIT_REPO}/blob/main/README.md`,
    byokPolicy: `${SQUIGIT_REPO}/blob/main/docs/06-policies/BYOK.md`,
    securityPolicy: `${SQUIGIT_REPO}/blob/main/docs/06-policies/SECURITY.md`,
    policies: `${SQUIGIT_REPO}/tree/main/docs/06-policies`,
  },
  packages: {
    aptKey: `${SQUIGIT_PACKAGES_SITE}/keys/squigit-packages.asc`,
    aptRepository: `${SQUIGIT_PACKAGES_REPO}/raw/main/apt`,
    rpmRepositoryFile: `${SQUIGIT_PACKAGES_SITE}/rpm/squigit.repo`,
    readme: `${SQUIGIT_PACKAGES_REPO}/blob/main/README.md`,
    homebrewReadme: "https://github.com/squigit-org/homebrew-tap/blob/main/README.md",
  },
  products: {
    paddleOcrSource: "https://github.com/paddlepaddle/PaddleOCR",
    whisperCppSource: "https://github.com/ggerganov/whisper.cpp",
    ocrWingetPullRequest: "https://github.com/microsoft/winget-pkgs/pull/362423",
    sttWingetPullRequest: "https://github.com/microsoft/winget-pkgs/pull/362944",
  },
} as const;
