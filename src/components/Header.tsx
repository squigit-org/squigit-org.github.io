import { useEffect, useRef, useState, type FocusEvent } from "react";
import { Button } from "@/src/components/ui/button";
import {
  AppLogoIcon,
  DownloadIcon,
  ChevronDownIcon,
} from "@/src/components/icons";
import { UseCases } from "@/src/features/UseCases";
import { Resources } from "@/src/features/Resources";
import { cn } from "@/src/lib/utils";

export function Header({
  onDropdownOpenChange,
  onUseCasesOpenChange,
}: {
  onDropdownOpenChange?: (open: boolean) => void;
  onUseCasesOpenChange?: (open: boolean) => void;
} = {}) {
  const [useCasesOpen, setUseCasesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const anyDropdownOpen = useCasesOpen || resourcesOpen;

  useEffect(() => {
    onDropdownOpenChange?.(anyDropdownOpen);
    onUseCasesOpenChange?.(useCasesOpen);
  }, [anyDropdownOpen, onDropdownOpenChange, onUseCasesOpenChange, useCasesOpen]);

  useEffect(() => {
    const handleOpenUseCases = () => {
      setUseCasesOpen(true);
      setResourcesOpen(false);
    };
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
    setResourcesOpen(false);
  };

  const openResources = () => {
    clearCloseTimeout();
    setResourcesOpen(true);
    setUseCasesOpen(false);
  };

  const closeDropdownsWithDelay = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = window.setTimeout(() => {
      setUseCasesOpen(false);
      setResourcesOpen(false);
    }, 120);
  };

  const closeDropdownsNow = () => {
    clearCloseTimeout();
    setUseCasesOpen(false);
    setResourcesOpen(false);
  };

  const handleDropdownTriggerBlur = (event: FocusEvent<HTMLButtonElement>) => {
    const nextFocusedElement = event.relatedTarget as Node | null;
    if (nextFocusedElement && headerRef.current?.contains(nextFocusedElement)) {
      return;
    }
    closeDropdownsWithDelay();
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-white/65 backdrop-blur-2xl"
      onMouseLeave={closeDropdownsWithDelay}
    >
      <div className="relative z-20 mx-auto flex h-12 w-full max-w-6xl items-center justify-between px-8 lg:px-10">
        <div className="flex items-center gap-4 lg:gap-5">
          <a
            href="#home"
            onClick={closeDropdownsNow}
            className="inline-flex items-center text-slate-950 transition-opacity hover:opacity-80"
            aria-label="Go to home"
          >
            <AppLogoIcon className="h-6 w-6" />
          </a>

          <nav className="flex flex-wrap items-center gap-1.5">
            <a
              href="#products"
              onClick={closeDropdownsNow}
              className="rounded-full px-3 py-1.5 text-[14px] font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
            >
              Products
            </a>
            <button
              type="button"
              onMouseEnter={openUseCases}
              onFocus={openUseCases}
              onBlur={handleDropdownTriggerBlur}
              aria-expanded={useCasesOpen}
              aria-controls="header-use-cases-dropdown"
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[14px] font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950",
                useCasesOpen && "bg-slate-100 text-slate-950",
              )}
            >
              <span>Use Cases</span>
              <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                <ChevronDownIcon
                  className={cn(
                    "h-full w-full origin-center transform-gpu will-change-transform transition-transform duration-200 ease-out",
                    useCasesOpen ? "rotate-180" : "rotate-0",
                  )}
                />
              </span>
            </button>
            <a
              href="#pricing"
              onClick={closeDropdownsNow}
              className="rounded-full px-3 py-1.5 text-[14px] font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
            >
              Pricing
            </a>
            <a
              href="#repository"
              onClick={closeDropdownsNow}
              className="rounded-full px-3 py-1.5 text-[14px] font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
            >
              Repository
            </a>
            <button
              type="button"
              onMouseEnter={openResources}
              onFocus={openResources}
              onBlur={handleDropdownTriggerBlur}
              aria-expanded={resourcesOpen}
              aria-controls="header-resources-dropdown"
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[14px] font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950",
                resourcesOpen && "bg-slate-100 text-slate-950",
              )}
            >
              <span>Resources</span>
              <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                <ChevronDownIcon
                  className={cn(
                    "h-full w-full origin-center transform-gpu will-change-transform transition-transform duration-200 ease-out",
                    resourcesOpen ? "rotate-180" : "rotate-0",
                  )}
                />
              </span>
            </button>
          </nav>
        </div>

        <a href="#download">
          <Button
            size="lg"
            className="h-9.5 rounded-full bg-slate-950 px-4 text-sm text-white hover:bg-slate-800"
          >
            Download
            <DownloadIcon className="h-4 w-4" />
          </Button>
        </a>
      </div>

      <div
        id="header-use-cases-dropdown"
        onMouseEnter={openUseCases}
        onMouseLeave={closeDropdownsWithDelay}
        className={cn(
          "absolute inset-x-0 top-full z-10 overflow-hidden bg-white backdrop-blur-2xl transition-all duration-300 ease-out",
          useCasesOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0",
        )}
      >
        <UseCases embedded open={useCasesOpen} />
      </div>

      <div
        id="header-resources-dropdown"
        onMouseEnter={openResources}
        onMouseLeave={closeDropdownsWithDelay}
        className={cn(
          "absolute inset-x-0 top-full z-10 overflow-hidden bg-white backdrop-blur-2xl transition-all duration-300 ease-out",
          resourcesOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0",
        )}
      >
        <Resources embedded open={resourcesOpen} />
      </div>
    </header>
  );
}
