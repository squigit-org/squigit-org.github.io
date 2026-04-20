import { cn } from "@/src/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";
import { SearchIcon, ScanTextIcon, SparklesIcon } from "@/src/components/icons";

export function UseCases({ embedded = false }: { embedded?: boolean }) {
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
        embedded ? "h-full overflow-y-auto py-8" : "relative py-24",
      )}
    >
      <div className="mx-auto max-w-7xl">
        <div className={cn("max-w-2xl", embedded ? "mb-8" : "mb-12")}>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Use Cases
          </p>
          <h2 className="text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
            Built for the moments where pointing is easier than explaining.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className={cn(
                  "rounded-[2rem] border-slate-200 shadow-sm backdrop-blur",
                  embedded ? "bg-white/70" : "bg-white/90",
                )}
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
    </section>
  );
}
