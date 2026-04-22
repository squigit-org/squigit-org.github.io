import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Quote } from "./features/Quote";
import { Download } from "./features/Download";
import { Pricing } from "./features/Pricing";
import { Products } from "./features/Products";
import { Footer } from "./components/Footer";
import { QUOTES } from "./lib/constants";
import { cn } from "./lib/utils";

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
        <Pricing />
        <Download />
        <Products />
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 z-30 bg-slate-950/10 transition-opacity duration-300 ease-out",
            dropdownOpen ? "opacity-100" : "opacity-0",
          )}
        />
      </main>
      <Footer />
    </div>
  );
}
