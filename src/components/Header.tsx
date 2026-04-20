import { useEffect, useRef, useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  AppLogoIcon,
  DownloadIcon,
  ChevronDownIcon,
} from "@/src/components/icons";
import { UseCases } from "@/src/components/UseCases";
import { cn } from "@/src/lib/utils";

export function Header() {
  const [useCasesOpen, setUseCasesOpen] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleOpenUseCases = () => setUseCasesOpen(true);
    window.addEventListener("squigit:open-use-cases", handleOpenUseCases);

    return () => {
      window.removeEventListener("squigit:open-use-cases", handleOpenUseCases);
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const openUseCases = () => {
    clearCloseTimeout();
    setUseCasesOpen(true);
  };

  const closeUseCasesWithDelay = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = window.setTimeout(() => {
      setUseCasesOpen(false);
    }, 120);
  };

  const closeUseCasesNow = () => {
    clearCloseTimeout();
    setUseCasesOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl"
      onMouseLeave={closeUseCasesWithDelay}
    >
      <div className="relative z-20 mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-8 lg:px-12">
        <div className="flex items-center gap-4 lg:gap-5">
          <a
            href="#home"
            onClick={closeUseCasesNow}
            className="inline-flex items-center text-slate-950 transition-opacity hover:opacity-80"
            aria-label="Go to home"
          >
            <AppLogoIcon className="h-6 w-6" />
          </a>

          <nav className="flex flex-wrap items-center gap-1.5">
            <a
              href="#products"
              onClick={closeUseCasesNow}
              className="rounded-full px-3 py-1.5 text-[13px] font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
            >
              Products
            </a>
            <button
              type="button"
              onMouseEnter={openUseCases}
              onFocus={openUseCases}
              onBlur={closeUseCasesWithDelay}
              aria-expanded={useCasesOpen}
              aria-controls="header-use-cases-dropdown"
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[13px] font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950",
                useCasesOpen && "bg-slate-100 text-slate-950",
              )}
            >
              Use Cases
              <ChevronDownIcon
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200 ease-out",
                  useCasesOpen && "rotate-180",
                )}
              />
            </button>
            <a
              href="#repository"
              onClick={closeUseCasesNow}
              className="rounded-full px-3 py-1.5 text-[13px] font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
            >
              Repository
            </a>
            <a
              href="#resources"
              onClick={closeUseCasesNow}
              className="rounded-full px-3 py-1.5 text-[13px] font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
            >
              Resources
            </a>
          </nav>
        </div>

        <a href="#download">
          <Button
            size="lg"
            className="h-9 rounded-full bg-slate-950 px-5 text-sm text-white hover:bg-slate-800"
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            Download
          </Button>
        </a>
      </div>

      <div
        id="header-use-cases-dropdown"
        onMouseEnter={openUseCases}
        onMouseLeave={closeUseCasesWithDelay}
        className={cn(
          "absolute inset-x-0 top-full z-10 h-[50vh] border-b border-slate-200/80 bg-white/70 shadow-xl backdrop-blur-2xl transition-all duration-300 ease-out",
          useCasesOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0",
        )}
      >
        <UseCases embedded />
      </div>
    </header>
  );
}
