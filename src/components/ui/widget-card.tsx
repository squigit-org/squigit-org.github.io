import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { CloseIcon } from "@/src/components/icons";
import { cn } from "@/src/lib/utils";

type WidgetCardProps = {
  open: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
  className?: string;
};

export function WidgetCard({
  open,
  title = "Widget",
  children,
  onClose,
  className,
}: WidgetCardProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const focusRafId = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusRafId);
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.paddingRight = previousBodyPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 top-12 z-40 flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close setup window"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/5 backdrop-blur-[1.5px]"
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "relative z-10 w-full max-w-4xl overflow-hidden rounded-[0.95rem] border border-[#000]/20 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.35)] motion-safe:animate-[widget-rise_320ms_cubic-bezier(0.16,1,0.3,1)]",
          className,
        )}
      >
        <header className="flex items-center justify-start border-b border-slate-200 px-5 py-4 sm:px-6">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close setup window"
            className="inline-flex h-8 w-8 items-center justify-center text-slate-500 transition hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 cursor-pointer"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </header>
        <div className="max-h-[min(78vh,46rem)] overflow-y-auto px-5 py-6 sm:px-6 sm:py-7">
          {children}
        </div>
      </section>
    </div>
  );
}
