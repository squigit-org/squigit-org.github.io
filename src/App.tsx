import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { QuoteSection } from "./components/QuoteSection";
import { DownloadPage } from "./components/DownloadPage";
import { ProductSection } from "./components/ProductSection";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderContent = () => {
    switch (currentPage) {
      case "download":
        return <DownloadPage />;
      case "products":
        return <ProductSection />;
      default:
        return (
          <>
            <Hero />
            <QuoteSection />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-pink-100 selection:text-pink-600">
      <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="px-10 py-12 flex flex-col md:flex-row justify-between items-center border-t border-slate-100 text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400 gap-8">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-neon-lime"></div>
          <span>Open Source AI Vision Utility</span>
        </div>
        <div className="flex gap-8">
          <a href="https://github.com/squigit-org/squigit" className="hover:text-black transition-colors">GitHub</a>
          <span>v0.1.0-alpha</span>
          <span>MIT License</span>
        </div>
      </footer>
    </div>
  );
}
