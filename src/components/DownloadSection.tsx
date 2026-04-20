import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { DownloadIcon } from "@/src/components/icons";
import { DOWNLOADS } from "@/src/lib/constants";

export function DownloadSection() {
  return (
    <section id="download" className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Select download
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
              Get Squigit on your platform.
            </h2>
          </div>
          <p className="max-w-xl text-slate-600">
            Pick your OS, download the right build, and start circling anything
            on your screen.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {DOWNLOADS.map((platform) => (
            <Card
              key={platform.name}
              className="rounded-[2rem] border-slate-200 bg-white/90 shadow-sm backdrop-blur"
            >
              <CardHeader>
                <CardTitle className="text-3xl tracking-[-0.04em]">
                  {platform.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {platform.items.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-4 text-sm font-medium transition hover:border-slate-300 hover:bg-slate-50"
                    >
                      <span>{item.label}</span>
                      <DownloadIcon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Minimum Requirements
                  </p>
                  <p className="text-sm leading-7 text-slate-600">
                    {platform.min}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
