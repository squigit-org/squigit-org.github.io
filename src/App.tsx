import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { QuoteSection } from "./components/QuoteSection";
import { DownloadSection } from "./components/DownloadSection";
import { ProductsSection } from "./components/ProductsSection";
import { Footer } from "./components/Footer";
import { QUOTES } from "./lib/constants";

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Header />
      <main className="relative">
        <Hero />
        {mounted &&
          QUOTES.map((quote, index) => (
            <QuoteSection key={quote} quote={quote} index={index} />
          ))}
        <DownloadSection />
        <ProductsSection />
      </main>
      <Footer />
    </div>
  );
}
