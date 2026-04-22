import { useEffect, useState } from "react";
import { cn } from "@/src/lib/utils";
import { USE_CASES, USE_CASES_HERO_LINES } from "@/src/lib/constants";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";
import {
  SearchIcon,
  ScanTextIcon,
  SparklesIcon,
  ChevronDownIcon,
} from "@/src/components/icons";

type UseCasesLayout = "desktop" | "mobile";

export function UseCases({
  embedded = false,
  open = false,
  layout = "desktop",
  onNavigate,
}: {
  embedded?: boolean;
  open?: boolean;
  layout?: UseCasesLayout;
  onNavigate?: () => void;
}) {
  const overviewUrl =
    "https://github.com/squigit-org/squigit/blob/main/README.md";
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const isMobileEmbedded = embedded && layout === "mobile";
  const iconsByKey = {
    search: SearchIcon,
    scanText: ScanTextIcon,
    sparkles: SparklesIcon,
  } as const;

  useEffect(() => {
    if (!open) {
      setActiveItemIndex(null);
    }
  }, [open]);

  if (isMobileEmbedded) {
    return (
      <section className="px-1 py-3">
        <div
          className={cn(
            "grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-3 transition-all duration-200 ease-out",
            open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
          )}
        >
          <div className="flex h-full flex-col gap-3 pb-1">
            <h2 className="text-xl leading-snug font-[450] tracking-[-0.05em] text-slate-950">
              {USE_CASES_HERO_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>

            <p className="max-w-[11rem] text-sm text-slate-500">
              Explore how Squigit helps you
            </p>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                onNavigate?.();
                window.open(overviewUrl, "_blank", "noopener,noreferrer");
              }}
              className="w-fit rounded-full border-slate-300 bg-white/90 px-4 text-slate-900"
            >
              see overview
            </Button>
          </div>

          <div className="space-y-2">
            {USE_CASES.map((item, index) => {
              const Icon = iconsByKey[item.icon];
              const isActive = activeItemIndex === index;

              return (
                <div
                  key={item.title}
                  className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setActiveItemIndex((current) =>
                        current === index ? null : index,
                      )
                    }
                    className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-slate-700 transition-colors hover:text-slate-950"
                    aria-expanded={isActive}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-current" />
                    <span className="inline-flex items-center gap-1 text-[13px] font-medium leading-5 text-current">
                      <span>{item.shortLabel}</span>
                      <ChevronDownIcon
                        className={cn(
                          "h-4 w-4 shrink-0 text-current transition-transform duration-200 ease-out",
                          isActive ? "rotate-180" : "rotate-0",
                        )}
                      />
                    </span>
                  </button>

                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-200 ease-out",
                      isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="border-t border-slate-200/80 px-3 pb-3 pt-2.5">
                        <p className="text-sm font-semibold tracking-[-0.02em] text-slate-950">
                          {item.title}
                        </p>
                        <p className="mt-1.5 text-xs leading-5 text-slate-600">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={embedded ? undefined : "use-cases"}
      className={cn(
        embedded ? "py-8" : "relative px-6 py-24",
      )}
    >
      <div
        className={cn(
          "mx-auto",
          embedded
            ? "w-full max-w-6xl px-8 lg:px-10"
            : "max-w-7xl",
        )}
      >
        <div
          className={cn(
            embedded
              ? "grid items-start gap-x-14 gap-y-8 lg:grid-cols-[minmax(270px,340px)_1fr]"
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
                  ? "text-2xl leading-snug font-[450]"
                  : "text-4xl font-semibold md:text-5xl",
              )}
            >
              {USE_CASES_HERO_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            {embedded && (
              <>
                <p className="mt-3 text-sm text-slate-500">
                  Explore how Squigit helps you
                </p>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() =>
                    window.open(overviewUrl, "_blank", "noopener,noreferrer")
                  }
                  className="mt-4 w-fit rounded-full border-slate-300 bg-white/90"
                >
                  See overview
                </Button>
              </>
            )}
          </div>

          {embedded ? (
            <div
              className={cn(
                "transition-all duration-300 ease-out",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              )}
            >
              <div className="grid gap-3 lg:grid-cols-[minmax(180px,220px)_minmax(0,1fr)]">
                <div className="space-y-2">
                  {USE_CASES.map((item, index) => {
                    const Icon = iconsByKey[item.icon];
                    const isActive = activeItemIndex === index;
                    return (
                      <button
                        type="button"
                        key={item.title}
                        onClick={() =>
                          setActiveItemIndex((current) =>
                            current === index ? null : index,
                          )
                        }
                        style={{
                          transitionDelay: open ? `${index * 55}ms` : "0ms",
                        }}
                        className={cn(
                          "inline-flex items-center gap-3 py-2.5 text-left text-slate-700 transition-all duration-300 ease-out",
                          open ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0",
                          isActive
                            ? "translate-x-1 opacity-100 text-slate-950"
                            : "hover:translate-x-0.5 hover:text-slate-950",
                        )}
                        aria-expanded={isActive}
                      >
                        <Icon className="h-5 w-5 shrink-0 text-current" />
                        <span className="inline-flex items-center gap-1.5 text-[15px] font-medium text-current">
                          <span>{item.shortLabel}</span>
                          <ChevronDownIcon
                            className={cn(
                              "h-4 w-4 text-current transition-transform duration-200 ease-out",
                              isActive ? "rotate-0" : "-rotate-90",
                            )}
                          />
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div
                  className={cn(
                    "min-h-[176px] transition-all duration-250 ease-out",
                    activeItemIndex !== null
                      ? "translate-x-0 opacity-100"
                      : "translate-x-2 opacity-0",
                  )}
                >
                  {activeItemIndex !== null && (
                    <div>
                      <p className="text-lg font-semibold tracking-[-0.03em] text-slate-950">
                        {USE_CASES[activeItemIndex].title}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-slate-700">
                        {USE_CASES[activeItemIndex].desc}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {USE_CASES.map((item) => {
                const Icon = iconsByKey[item.icon];
                return (
                  <Card
                    key={item.title}
                    className="rounded-[2rem] border-slate-200 bg-white/90 shadow-sm backdrop-blur transition-all duration-400 ease-out"
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
          )}
        </div>
      </div>
    </section>
  );
}
