import { cn } from "@/src/lib/utils";
import { RESOURCE_LINKS, RESOURCES_HERO_LINES } from "@/src/lib/constants";
import { ChevronDownIcon } from "@/src/components/icons";

export function Resources({
  embedded = false,
  open = false,
}: {
  embedded?: boolean;
  open?: boolean;
}) {
  return (
    <section
      id={embedded ? undefined : "resources"}
      className={cn(embedded ? "py-8" : "relative px-6 py-24")}
    >
      <div
        className={cn(
          "mx-auto",
          embedded ? "w-full max-w-6xl px-8 lg:px-10" : "max-w-7xl",
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
                Resources
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
              {RESOURCES_HERO_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>

          <div
            className={cn(
              "flex flex-col items-start gap-2 transition-all duration-300 ease-out",
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            {RESOURCE_LINKS.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  transitionDelay: open ? `${index * 55}ms` : "0ms",
                }}
                className={cn(
                  "inline-flex items-center gap-3 py-2.5 text-left text-slate-700 transition-all duration-300 ease-out",
                  open ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0",
                  "hover:translate-x-0.5 hover:text-slate-950",
                )}
              >
                <span className="inline-flex items-center gap-1.5 text-[15px] font-medium text-current">
                  <span>{item.label}</span>
                  <ChevronDownIcon className="h-4 w-4 -rotate-90 text-current transition-transform duration-200 ease-out" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
