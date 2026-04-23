import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24">
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
              <CardTitle className="text-2xl font-product-sans font-[450] tracking-[-0.04em]">
                How billing works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-7 text-slate-600">
              <p>You choose the providers and use your own API keys.</p>
              <p>
                Usage is billed by the provider directly, usually free at low
                volume and pay-as-you-go beyond free limits.
              </p>
              <p>
                You keep full control over limits, keys, and spending in your
                provider dashboards.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-slate-200 bg-white/90 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-product-sans font-[450] tracking-[-0.04em]">
                Current providers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-7 text-slate-600">
              <p>
                <span className="font-medium text-slate-900">Google AI Studio</span>{" "}
                for Gemini AI usage.
              </p>
              <p>
                <span className="font-medium text-slate-900">ImgBB</span> for image
                hosting used in reverse-image workflows.
              </p>
              <p>
                Both currently offer generous free tiers, and we plan to support
                more AI providers in the future.
              </p>
              <a
                href="https://github.com/squigit-org/squigit/blob/main/docs/06-policies/BYOK.md"
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
              >
                Read BYOK policy
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
