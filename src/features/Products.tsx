import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";
import { CodeBlock } from "@/src/components/ui/CodeBlock";
import { PRODUCT_INSTALL } from "@/src/lib/constants";

export function Products() {
  return (
    <section id="products" className="relative py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-10">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Products
          </p>
          <h2 className="text-4xl font-product-sans font-[450] tracking-[-0.05em] text-slate-950 md:text-5xl">
            Squigit OCR and Squigit STT installation.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            This guide installs both sidecars:{" "}
            <span className="font-medium text-slate-900">squigit-ocr</span> and{" "}
            <span className="font-medium text-slate-900">squigit-stt</span>.
          </p>
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white/80 p-5 text-sm leading-7 text-slate-600">
            <p>As of April 22, 2026:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>macOS (Apple Silicon) is available via Homebrew tap.</li>
              <li>Linux is available via signed APT and DNF repositories.</li>
              <li>Windows is available via Winget.</li>
            </ul>
          </div>
        </div>

        <div className="grid gap-8">
          <Card className="rounded-[2rem] border-slate-200 bg-white/90 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-product-sans font-[450] tracking-[-0.04em]">
                macOS (Apple Silicon / arm64)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock language="bash" lines={PRODUCT_INSTALL.mac} />
            </CardContent>
          </Card>

          <div className="grid gap-8 xl:grid-cols-2">
            <Card className="rounded-[2rem] border-slate-200 bg-white/90 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl tracking-[-0.04em]">
                  Debian/Ubuntu (APT)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="bash" lines={PRODUCT_INSTALL.apt} />
              </CardContent>
            </Card>
            <Card className="rounded-[2rem] border-slate-200 bg-white/90 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl tracking-[-0.04em]">
                  Fedora/RHEL (DNF)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="bash" lines={PRODUCT_INSTALL.dnf} />
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-[2rem] border-slate-200 bg-white/90 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl tracking-[-0.04em]">
                Windows (Winget)
              </CardTitle>
              <CardDescription className="text-base leading-7 text-slate-600">
                Install with these package IDs:{" "}
                <span className="font-medium text-slate-900">
                  SquigitOrg.SquigitOCR
                </span>{" "}
                and{" "}
                <span className="font-medium text-slate-900">
                  SquigitOrg.SquigitSTT
                </span>
                .
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock language="powershell" lines={PRODUCT_INSTALL.winget} />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
