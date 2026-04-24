import { useEffect, useState } from "react";
import { Footer, Header, Hero } from "@/components";
import {
  Overviews,
  Download,
  Pricing,
  Products,
  Quote,
} from "@/sections";
import { cn, QUOTES } from "@/lib";

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const closeHeaderDropdowns = () => {
    window.dispatchEvent(new Event("squigit:close-dropdowns"));
  };

  useEffect(() => {
    const syncViewportHeight = () => {
      const viewportHeight =
        window.visualViewport?.height ?? window.innerHeight;

      document.documentElement.style.setProperty(
        "--squigit-viewport-height",
        `${viewportHeight}px`,
      );
    };

    syncViewportHeight();
    window.addEventListener("resize", syncViewportHeight);
    window.visualViewport?.addEventListener("resize", syncViewportHeight);
    window.visualViewport?.addEventListener("scroll", syncViewportHeight);

    return () => {
      window.removeEventListener("resize", syncViewportHeight);
      window.visualViewport?.removeEventListener("resize", syncViewportHeight);
      window.visualViewport?.removeEventListener("scroll", syncViewportHeight);
    };
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setMounted(true);

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Header onDropdownOpenChange={setDropdownOpen} />
      <main className="relative mt-[-2.5rem]">
        <Hero />
        {mounted &&
          QUOTES.map((quote, index) => (
            <Quote key={quote} quote={quote} index={index} />
          ))}
        <Overviews />
        <Pricing />
        <Download />
        <Products />
        <div
          aria-hidden="true"
          onClick={closeHeaderDropdowns}
          className={cn(
            "absolute inset-0 z-30 bg-slate-950/10 transition-opacity duration-300 ease-out",
            dropdownOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
          )}
        />
      </main>
      <Footer />
    </div>
  );
}
