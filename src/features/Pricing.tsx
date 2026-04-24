import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { ExternalArrowIcon } from "@/src/components/icons";

export function Pricing() {
  return (
    <section id="pricing" className="feature-scroll-section relative py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-10">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Pricing
          </p>
          <h2 className="text-4xl font-product-sans font-[450] tracking-[-0.05em] text-slate-950 md:text-5xl">
            BYOK pricing. Pay-as-you-go with your chosen providers.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Squigit uses a Bring Your Own Key model. You connect your own keys,
            and billing stays directly between you and the providers with no
            Squigit markup.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-[2rem] border-slate-200 bg-white/90 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl pt-4 pl-4 font-product-sans font-[450] tracking-[-0.04em]">
                How billing works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-8 pt-4 text-sm leading-7 text-slate-600">
              <p>Connect your preferred providers using your own API credentials.</p>
              <p>
                Usage is billed directly by each provider based on their pricing and applicable free-tier allowances.
              </p>
              <p>
                Maintain full control over spending, rate limits, and account management through your provider dashboards.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-slate-200 bg-white/90 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl pt-4 pl-4 font-product-sans font-[450] tracking-[-0.04em]">
                Current providers
              </CardTitle>
            </CardHeader>
            <CardContent className=" p-8 pt-4 text-sm leading-7 text-slate-600">
              <p>
                <span className="font-medium text-slate-900">Google AI Studio</span>{" "}
                for Gemini model access and inference usage.
              </p>
              <p>
                <span className="font-medium text-slate-900">ImgBB</span> for image
                for image hosting used in reverse image workflows.
              </p>
              <p className="pt-5">
                Both providers currently offer generous free-tier access.
                <br />Additional providers are planned over time.
              </p>
              <a
                href="https://github.com/squigit-org/squigit/blob/main/docs/06-policies/BYOK.md"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 pt-2 text-sm font-medium text-slate-700 transition hover:text-slate-950 cursor-pointer"
              >
                Read BYOK policy
                <ExternalArrowIcon
                  className="scale-inline-100 translate-inline-px  transform"
                  size={9}
                />
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
