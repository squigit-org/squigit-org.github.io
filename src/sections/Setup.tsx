import { useEffect, useState } from "react";
import { CodeBlock } from "@/components/ui";
import { PRODUCT_INSTALL } from "@/lib";

export type SetupPlatform = "MacOS" | "Windows" | "Linux";

type SetupStep = {
  title: string;
  lines: string[];
};

type LinuxSetupSection = {
  title: string;
  steps: SetupStep[];
};

type DesktopSetupPlatform = Exclude<SetupPlatform, "Linux">;

type DesktopSetupConfig = {
  installerFileName: string;
  installerExtension: ".exe" | ".dmg";
  dependencyLanguage: "bash" | "powershell";
  dependencyLines: string[];
};

const DOWNLOAD_RETRY_SECONDS = 15;

const LINUX_SETUP_SECTIONS: LinuxSetupSection[] = [
  {
    title: "Debian-based Linux distributions (e.g., Debian, Ubuntu)",
    steps: [
      {
        title: "Add the repository to sources.list.d",
        lines: PRODUCT_INSTALL.apt.slice(0, 3),
      },
      {
        title: "Update the package cache",
        lines: [PRODUCT_INSTALL.apt[3]],
      },
      {
        title: "Install the app",
        lines: ["sudo apt-get install Squigit"],
      },
      {
        title: "Install optional dependencies",
        lines: [
          "sudo apt-get install squigit-ocr # for extracting text from images",
          "sudo apt-get install squigit-stt # for dictating chat messages",
        ],
      },
    ],
  },
  {
    title: "RPM-based Linux distributions (e.g., RHEL, Fedora, SUSE)",
    steps: [
      {
        title: "Add the repository to /etc/yum.repos.d",
        lines: [PRODUCT_INSTALL.dnf[0]],
      },
      {
        title: "Update the package cache",
        lines: [PRODUCT_INSTALL.dnf[1]],
      },
      {
        title: "Install the app",
        lines: ["sudo dnf install Squigit"],
      },
      {
        title: "Install optional dependencies",
        lines: [
          "sudo dnf install squigit-ocr # for extracting text from images",
          "sudo dnf install squigit-stt # for dictating chat messages",
        ],
      },
    ],
  },
];

const DESKTOP_SETUP_CONFIG: Record<DesktopSetupPlatform, DesktopSetupConfig> = {
  MacOS: {
    installerFileName: "Squigit-installer.dmg",
    installerExtension: ".dmg",
    dependencyLanguage: "bash",
    dependencyLines: [
      PRODUCT_INSTALL.mac[0],
      "brew install squigit-ocr # for extracting text from images",
      "brew install squigit-stt # for dictating chat messages",
    ],
  },
  Windows: {
    installerFileName: "Squigit-Installer.exe",
    installerExtension: ".exe",
    dependencyLanguage: "powershell",
    dependencyLines: [
      `${PRODUCT_INSTALL.winget[0]} # for extracting text from images`,
      `${PRODUCT_INSTALL.winget[1]} # for dictating chat messages`,
    ],
  },
};

function startMockInstallerDownload(platform: DesktopSetupPlatform) {
  if (typeof document === "undefined" || typeof URL === "undefined") {
    return;
  }

  const config = DESKTOP_SETUP_CONFIG[platform];
  const payload = [
    "Squigit mock installer",
    `Platform: ${platform}`,
    `File: ${config.installerFileName}`,
    "This is a mock download until official installers are published.",
  ].join("\n");

  const blob = new Blob([payload], { type: "application/octet-stream" });
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = config.installerFileName;
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 1000);
}

export function Setup({ platform }: { platform: SetupPlatform }) {
  const desktopPlatform = platform === "Linux" ? null : platform;
  const [retryCountdown, setRetryCountdown] = useState(DOWNLOAD_RETRY_SECONDS);

  useEffect(() => {
    if (!desktopPlatform) {
      return;
    }

    startMockInstallerDownload(desktopPlatform);
    setRetryCountdown(DOWNLOAD_RETRY_SECONDS);
  }, [desktopPlatform]);

  useEffect(() => {
    if (!desktopPlatform || retryCountdown <= 0) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setRetryCountdown((previous) => Math.max(previous - 1, 0));
    }, 1000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [desktopPlatform, retryCountdown]);

  const handleRetryDownload = () => {
    if (!desktopPlatform || retryCountdown > 0) {
      return;
    }

    startMockInstallerDownload(desktopPlatform);
    setRetryCountdown(DOWNLOAD_RETRY_SECONDS);
  };

  if (desktopPlatform) {
    const config = DESKTOP_SETUP_CONFIG[desktopPlatform];

    return (
      <article className="flex w-full flex-col items-center gap-6 text-center">
        <div className="w-full max-w-3xl space-y-8 text-left">
          <section className="space-y-3">
            <p className="text-base leading-7 text-slate-700">
              Your download should begin automatically. If it doesn’t,{" "}
              <button
                type="button"
                onClick={handleRetryDownload}
                disabled={retryCountdown > 0}
                className="font-medium text-slate-900 underline decoration-slate-400 underline-offset-4 transition-colors hover:text-slate-700 disabled:cursor-not-allowed disabled:text-slate-500 disabled:no-underline cursor-pointer"
              >
                {retryCountdown > 0
                  ? `Retry in ${retryCountdown}s`
                  : "Retry download"}
              </button>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h4 className="text-xl font-product-sans font-[450] tracking-[-0.03em] text-slate-950">
              Install optional dependencies
            </h4>
            <CodeBlock
              language={config.dependencyLanguage}
              lines={config.dependencyLines}
            />
          </section>
        </div>
      </article>
    );
  }

  return (
    <article className="flex w-full flex-col items-center gap-6 text-center">
      <div className="w-full max-w-3xl space-y-10 text-left">
        {LINUX_SETUP_SECTIONS.map((section) => (
          <section key={section.title} className="space-y-5">
            <h4 className="text-xl font-product-sans font-[450] tracking-[-0.03em] text-slate-950">
              {section.title}
            </h4>
            <ol className="space-y-6">
              {section.steps.map((step, index) => (
                <li key={step.title} className="space-y-3">
                  <p className="text-base font-medium leading-7 text-slate-900">
                    {index + 1}. {step.title}
                  </p>
                  <CodeBlock language="bash" lines={step.lines} />
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </article>
  );
}
