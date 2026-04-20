import { motion } from "motion/react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const leftLinks = [
    { name: "Products", id: "products" },
    { name: "Use Cases", id: "home" }, // Use cases usually on home
    { name: "Repository", url: "https://github.com/squigit-org/squigit" },
    { name: "Resources", id: "home" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-10">
        <div className="flex items-center gap-8">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-2xl font-black tracking-tighter hover:opacity-80 transition-opacity font-heading"
          >
            <div className="w-3.5 h-3.5 rounded-full bg-neon-lime border-2 border-black"></div>
            SQUIGIT
          </button>
          <nav className="hidden md:flex items-center gap-6">
            {leftLinks.map((link) => (
              link.url ? (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-slate-500 hover:text-black transition-colors"
                >
                  {link.name}
                </a>
              ) : (
                <button
                  key={link.name}
                  onClick={() => onNavigate(link.id || 'home')}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    currentPage === link.id ? "text-black underline underline-offset-4" : "text-slate-500 hover:text-black"
                  )}
                >
                  {link.name}
                </button>
              )
            ))}
          </nav>
        </div>
        <div>
          <Button 
            onClick={() => onNavigate('download')}
            className={cn(
              "rounded-full px-6 py-5 text-sm font-bold transition-all shadow-lg active:scale-95",
              currentPage === 'download' ? "bg-slate-800" : "bg-black text-white hover:bg-slate-800"
            )}
          >
            Download
          </Button>
        </div>
      </div>
    </header>
  );
}
