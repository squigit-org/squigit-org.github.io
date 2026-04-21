import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";
import { SearchIcon, ScanTextIcon, SparklesIcon } from "@/src/components/icons";

export function UseCases({
  embedded = false,
  open = false,
}: {
  embedded?: boolean;
  open?: boolean;
}) {
  const items = [
    {
      icon: SearchIcon,
      title: "Instant overview",
      desc: "Circle any UI, screen bug, design, object, or snippet and get an immediate AI explanation in place.",
    },
    {
      icon: ScanTextIcon,
      title: "OCR that keeps context",
      desc: "Pull text from your screen, then keep chatting with the captured context instead of losing your flow.",
    },
    {
      icon: SparklesIcon,
      title: "Visual search without app switching",
      desc: "From one hotkey to capture, inspect, and search. No screenshot folder juggling, no tab chaos.",
    },
  ];

  return (
    <section
      id={embedded ? undefined : "use-cases"}
      className={cn(
        "px-6",
        embedded ? "py-5" : "relative py-24",
      )}
    >
      <div className={cn("mx-auto", embedded ? "max-w-6xl" : "max-w-7xl")}>
        <div
          className={cn(
            embedded
              ? "grid items-center gap-6 lg:grid-cols-[minmax(220px,300px)_1fr]"
              : "",
          )}
        >
          <div
            className={cn(
              "max-w-2xl",
              embedded ? "mb-0 flex h-full flex-col justify-center" : "mb-12",
            )}
          >
            {!embedded && (
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                Use Cases
              </p>
            )}
            <h2
              className={cn(
                "tracking-[-0.05em] text-slate-950",
                embedded
                  ? "text-2xl leading-snug font-medium"
                  : "text-4xl font-semibold md:text-5xl",
              )}
            >
              Built for the moments where pointing is easier than explaining.
            </h2>
            {embedded && (
              <>
                <p className="mt-3 text-sm text-slate-500">
                  Explore how Squigit helps you
                </p>
                <a
                  href="https://github.com/squigit-org/squigit/blob/main/README.md"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-slate-300 bg-white/90"
                  >
                    See overview
                  </Button>
                </a>
              </>
            )}
          </div>

          <div className={cn("grid", embedded ? "grid-cols-1 gap-4 sm:grid-cols-3" : "gap-6 md:grid-cols-3")}>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className={cn(
                  "rounded-[2rem] border-slate-200 shadow-sm backdrop-blur transition-all duration-400 ease-out",
                  embedded && (open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"),
                  embedded ? "bg-white/70" : "bg-white/90",
                )}
                style={
                  embedded
                    ? { transitionDelay: open ? `${items.indexOf(item) * 70}ms` : "0ms" }
                    : undefined
                }
              >
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-2xl tracking-[-0.04em]">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-7 text-slate-600">
                    {item.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
