import { useEffect, useRef, useState, type FocusEvent } from "react";
import { Button } from "@/src/components/ui/button";
import {
  AppIcon,
  DownloadIcon,
  ChevronDownIcon,
  MenuIcon,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDesktopNav, setIsDesktopNav] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const anyDropdownOpen = isDesktopNav
    ? useCasesOpen || resourcesOpen
    : mobileMenuOpen;

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const resetNestedMenus = () => {
    setUseCasesOpen(false);
    setResourcesOpen(false);
  };

  const closeAllMenus = () => {
    clearCloseTimeout();
    resetNestedMenus();
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    onDropdownOpenChange?.(anyDropdownOpen);
    onUseCasesOpenChange?.(useCasesOpen);
  }, [anyDropdownOpen, onDropdownOpenChange, onUseCasesOpenChange, useCasesOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const syncNavigationMode = (matches: boolean) => {
      setIsDesktopNav(matches);
      closeAllMenus();
    };

    syncNavigationMode(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      syncNavigationMode(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    const handleOpenUseCases = () => {
      clearCloseTimeout();
      setMobileMenuOpen(!window.matchMedia("(min-width: 1024px)").matches);
      setUseCasesOpen(true);
      setResourcesOpen(false);
    };
    const handleCloseDropdowns = () => {
      closeAllMenus();
    };

    window.addEventListener("squigit:open-use-cases", handleOpenUseCases);
    window.addEventListener("squigit:close-dropdowns", handleCloseDropdowns);

    return () => {
      window.removeEventListener("squigit:open-use-cases", handleOpenUseCases);
      window.removeEventListener("squigit:close-dropdowns", handleCloseDropdowns);
      clearCloseTimeout();
    };
  }, []);

  const openUseCases = () => {
    if (!isDesktopNav) {
      return;
    }
    clearCloseTimeout();
    setMobileMenuOpen(false);
    setUseCasesOpen(true);
    setResourcesOpen(false);
  };

  const openResources = () => {
    if (!isDesktopNav) {
      return;
    }
    clearCloseTimeout();
    setMobileMenuOpen(false);
    setResourcesOpen(true);
    setUseCasesOpen(false);
  };

  const toggleUseCases = () => {
    clearCloseTimeout();
    if (useCasesOpen) {
      setUseCasesOpen(false);
      return;
    }
    setUseCasesOpen(true);
    setResourcesOpen(false);
    if (!isDesktopNav) {
      setMobileMenuOpen(true);
    }
  };

  const toggleResources = () => {
    clearCloseTimeout();
    if (resourcesOpen) {
      setResourcesOpen(false);
      return;
    }
    setResourcesOpen(true);
    setUseCasesOpen(false);
    if (!isDesktopNav) {
      setMobileMenuOpen(true);
    }
  };

  const toggleMobileMenu = () => {
    clearCloseTimeout();
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
      return;
    }
    setMobileMenuOpen(true);
    resetNestedMenus();
  };

  const closeDropdownsWithDelay = () => {
    if (!isDesktopNav) {
      return;
    }
    clearCloseTimeout();
    closeTimeoutRef.current = window.setTimeout(() => {
      setUseCasesOpen(false);
      setResourcesOpen(false);
    }, 120);
  };

  const closeDropdownsNow = () => {
    closeAllMenus();
  };

  useEffect(() => {
    if (!anyDropdownOpen) {
      return;
    }

    const handlePointerDownOutside = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (target && headerRef.current?.contains(target)) {
        return;
      }
      closeDropdownsNow();
    };

    window.addEventListener("pointerdown", handlePointerDownOutside);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDownOutside);
    };
  }, [anyDropdownOpen]);

  const handleDropdownTriggerBlur = (event: FocusEvent<HTMLButtonElement>) => {
    if (!isDesktopNav) {
      return;
    }
    const nextFocusedElement = event.relatedTarget as Node | null;
    if (nextFocusedElement && headerRef.current?.contains(nextFocusedElement)) {
      return;
    }
    closeDropdownsWithDelay();
  };

  return (
    <header
      ref={headerRef}
      className="relative sticky top-0 z-50 bg-white/65 backdrop-blur-2xl"
      onMouseLeave={isDesktopNav ? closeDropdownsWithDelay : undefined}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 -inset-y-px z-0 bg-white transition-opacity ease-linear",
          anyDropdownOpen ? "opacity-100 duration-150" : "opacity-0 duration-400",
        )}
      />

      <div className="relative z-20 mx-auto flex h-12 w-full max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-10">
        <div className="flex items-center gap-4 lg:gap-5">
          <a
            href="#home"
            onClick={closeDropdownsNow}
            className="inline-flex items-center text-slate-950 transition-opacity hover:opacity-80"
            aria-label="Go to home"
          >
            <AppIcon className="h-6 w-6" />
          </a>

          <nav className="hidden flex-wrap items-center gap-1.5 lg:flex">
            <a
              href="#products"
              onClick={closeDropdownsNow}
              className="rounded-full px-3 py-1.5 text-[14px] font-medium text-slate-700 transition-colors hover:text-slate-950"
            >
              Products
            </a>
            <button
              type="button"
              onClick={toggleUseCases}
              onMouseEnter={openUseCases}
              onFocus={openUseCases}
              onBlur={handleDropdownTriggerBlur}
              aria-expanded={useCasesOpen}
              aria-controls="header-use-cases-dropdown"
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[14px] font-medium text-slate-700 transition-colors hover:text-slate-950",
                useCasesOpen && "text-slate-950",
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
              className="rounded-full px-3 py-1.5 text-[14px] font-medium text-slate-700 transition-colors hover:text-slate-950"
            >
              Pricing
            </a>
            <a
              href="https://github.com/squigit-org/squigit"
              target="_blank"
              rel="noreferrer"
              onClick={closeDropdownsNow}
              className="rounded-full px-3 py-1.5 text-[14px] font-medium text-slate-700 transition-colors hover:text-slate-950"
            >
              Repository
            </a>
            <button
              type="button"
              onClick={toggleResources}
              onMouseEnter={openResources}
              onFocus={openResources}
              onBlur={handleDropdownTriggerBlur}
              aria-expanded={resourcesOpen}
              aria-controls="header-resources-dropdown"
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[14px] font-medium text-slate-700 transition-colors hover:text-slate-950",
                resourcesOpen && "text-slate-950",
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

        <a href="#download" className="hidden lg:block">
          <Button
            size="lg"
            className="h-9.5 rounded-full bg-slate-950 px-4 text-sm text-white hover:bg-slate-800"
          >
            Download
            <DownloadIcon className="h-4 w-4" />
          </Button>
        </a>

        <button
          type="button"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="header-mobile-menu"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-950 transition-colors hover:text-slate-700 lg:hidden"
        >
          <MenuIcon className="h-5 w-5" />
        </button>
      </div>

      <div
        id="header-mobile-menu"
        className={cn(
          "absolute inset-x-0 top-full z-20 grid overflow-hidden border-b bg-white/96 shadow-[0_18px_45px_-28px_rgba(15,23,42,0.38)] backdrop-blur-2xl lg:hidden transition-[grid-template-rows,opacity,border-color,transform] duration-300 ease-out",
          mobileMenuOpen
            ? "pointer-events-auto grid-rows-[1fr] border-slate-200/70 translate-y-0 opacity-100"
            : "pointer-events-none grid-rows-[0fr] border-transparent -translate-y-2 opacity-0",
        )}
      >
        <div className="min-h-0">
          <nav className="mx-auto max-h-[calc(100vh-3rem)] w-full max-w-6xl overflow-y-auto px-5 pb-5 pt-3 sm:px-6">
            <div className="flex flex-col gap-1">
              <a
                href="#products"
                onClick={closeDropdownsNow}
                className="rounded-full px-1 py-2 text-[15px] font-medium text-slate-700 transition-colors hover:text-slate-950"
              >
                Products
              </a>

              <button
                type="button"
                onClick={toggleUseCases}
                aria-expanded={useCasesOpen}
                aria-controls="header-use-cases-mobile"
                className={cn(
                  "inline-flex items-center justify-between gap-3 rounded-full px-1 py-2 text-left text-[15px] font-medium text-slate-700 transition-colors hover:text-slate-950",
                  useCasesOpen && "text-slate-950",
                )}
              >
                <span>Use Cases</span>
                <ChevronDownIcon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform duration-200 ease-out",
                    useCasesOpen ? "rotate-180" : "rotate-0",
                  )}
                />
              </button>

              <div
                id="header-use-cases-mobile"
                className={cn(
                  "grid overflow-hidden transition-[grid-template-rows,opacity] duration-250 ease-out",
                  useCasesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="min-h-0 overflow-hidden">
                  <UseCases
                    embedded
                    open={useCasesOpen}
                    layout="mobile"
                    onNavigate={closeDropdownsNow}
                  />
                </div>
              </div>

              <a
                href="#pricing"
                onClick={closeDropdownsNow}
                className="rounded-full px-1 py-2 text-[15px] font-medium text-slate-700 transition-colors hover:text-slate-950"
              >
                Pricing
              </a>

              <a
                href="https://github.com/squigit-org/squigit"
                target="_blank"
                rel="noreferrer"
                onClick={closeDropdownsNow}
                className="rounded-full px-1 py-2 text-[15px] font-medium text-slate-700 transition-colors hover:text-slate-950"
              >
                Repository
              </a>

              <button
                type="button"
                onClick={toggleResources}
                aria-expanded={resourcesOpen}
                aria-controls="header-resources-mobile"
                className={cn(
                  "inline-flex items-center justify-between gap-3 rounded-full px-1 py-2 text-left text-[15px] font-medium text-slate-700 transition-colors hover:text-slate-950",
                  resourcesOpen && "text-slate-950",
                )}
              >
                <span>Resources</span>
                <ChevronDownIcon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform duration-200 ease-out",
                    resourcesOpen ? "rotate-180" : "rotate-0",
                  )}
                />
              </button>

              <div
                id="header-resources-mobile"
                className={cn(
                  "grid overflow-hidden transition-[grid-template-rows,opacity] duration-250 ease-out",
                  resourcesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="min-h-0 overflow-hidden">
                  <Resources
                    embedded
                    open={resourcesOpen}
                    layout="mobile"
                    onNavigate={closeDropdownsNow}
                  />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div
        id="header-use-cases-dropdown"
        onMouseEnter={openUseCases}
        onMouseLeave={closeDropdownsWithDelay}
        className={cn(
          "absolute inset-x-0 top-full z-10 hidden overflow-hidden bg-white backdrop-blur-2xl transition-all duration-300 ease-out lg:block",
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
          "absolute inset-x-0 top-full z-10 hidden overflow-hidden bg-white backdrop-blur-2xl transition-all duration-300 ease-out lg:block",
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
