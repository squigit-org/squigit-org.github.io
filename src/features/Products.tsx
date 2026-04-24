import { ExternalArrowIcon, LinuxIcon, MacIcon, WindowsIcon } from "@/src/components/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

type Product = {
  title: string;
  sourceName: string;
  sourceUrl: string;
  description: string;
  wingetUrl: string;
};

type Platform = {
  label: string;
  href: string;
  Icon: typeof MacIcon;
  iconClassName: string;
  paddingClassName: string;
  positionClassName: string;
};

const products: Product[] = [
  {
    title: "Squigit OCR",
    sourceName: "PaddleOCR",
    sourceUrl: "https://github.com/paddlepaddle/PaddleOCR",
    description:
      "to detect text in images and generate selectable text regions, allowing you to highlight, copy, and work with text directly from images.",
    wingetUrl: "https://github.com/microsoft/winget-pkgs/pull/362423",
  },
  {
    title: "Squigit STT",
    sourceName: "whisper.cpp",
    sourceUrl: "https://github.com/ggerganov/whisper.cpp",
    description:
      "for local speech recognition, enabling voice dictation for prompts, chat messages, and hands-free text input.",
    wingetUrl: "https://github.com/microsoft/winget-pkgs/pull/362944",
  },
];

const sharedPlatforms: Platform[] = [
  {
    label: "HomeBrew",
    href: "https://github.com/squigit-org/homebrew-tap/blob/main/README.md",
    Icon: MacIcon,
    iconClassName: "h-6.5 w-6.5 pb-1 text-slate-950",
    paddingClassName: "py-1 pr-2 pl-0",
    positionClassName: "min-[430px]:justify-self-start",
  },
  {
    label: "APT/DNF",
    href: "https://github.com/squigit-org/squigit-packages/blob/main/README.md",
    Icon: LinuxIcon,
    iconClassName: "h-7.5 w-7.5 text-slate-950",
    paddingClassName: "px-2 py-1",
    positionClassName: "min-[430px]:justify-self-center",
  },
];

const sourceLinkClassName =
  "inline-flex items-center gap-1 font-medium text-slate-700 transition hover:text-slate-950";
const platformLinkClassName =
  "inline-flex items-center gap-1 whitespace-nowrap rounded-md text-sm font-medium text-slate-700 transition hover:text-slate-950";
const externalArrowClassName = "scale-inline-100 translate-inline-px transform";
const iconSlotClassName = "inline-flex min-h-6 min-w-6 shrink-0 items-center justify-center";

function buildPlatforms(wingetUrl: string): Platform[] {
  return [
    ...sharedPlatforms,
    {
      label: "Winget",
      href: wingetUrl,
      Icon: WindowsIcon,
      iconClassName: "h-6.5 w-6.5 text-slate-950",
      paddingClassName: "px-2 py-1",
      positionClassName: "min-[430px]:justify-self-end",
    },
  ];
}

export function Products() {
  return (
    <section id="products" className="feature-scroll-section relative py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-10">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Products
          </p>
          <h2 className="text-4xl font-product-sans font-[450] tracking-[-0.05em] text-slate-950 md:text-5xl">
            Squigit OCR and Squigit STT sidecars.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Local companion tools that add text extraction and voice input capabilities to Squigit while running on your own machine.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {products.map((product) => (
            <Card
              key={product.title}
              className="h-full rounded-[2rem] border-slate-200 bg-white/90 shadow-sm"
            >
              <CardHeader>
                <CardTitle className="pt-4 pl-4 text-2xl font-product-sans font-[450] tracking-[-0.04em]">
                  {product.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col p-8 pt-4 text-sm leading-7 text-slate-600">
                <p>
                  Uses{" "}
                  <a
                    href={product.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={sourceLinkClassName}
                  >
                    {product.sourceName}
                    <ExternalArrowIcon className={externalArrowClassName} size={9} />
                  </a>{" "}
                  {product.description}
                </p>

                <div className="mt-auto pt-4">
                  <p className="font-medium text-slate-900">Available today on</p>
                  <div className="mt-2 grid w-full grid-cols-1 items-center gap-2 min-[430px]:grid-cols-3">
                    {buildPlatforms(product.wingetUrl).map((platform) => (
                      <a
                        key={`${product.title}-${platform.label}`}
                        href={platform.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`${platformLinkClassName} ${platform.paddingClassName} justify-self-start ${platform.positionClassName}`}
                      >
                        <span className={iconSlotClassName}>
                          <platform.Icon className={`${platform.iconClassName} shrink-0`} />
                        </span>
                        {platform.label}
                        <ExternalArrowIcon className={externalArrowClassName} size={9} />
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
