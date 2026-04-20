import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/src/lib/utils";

const quotes = [
  "Stuck on it? Squiggle it",
  "Feeling it? Circle it",
  "Can't describe it? Search it"
];

function AnimatedText({ text, index }: { text: string, index: number }) {
  const chars = text.split("");
  
  const getStyle = () => {
    switch(index) {
      case 0: return "font-serif italic text-slate-800";
      case 1: return "font-black text-black tracking-tight uppercase text-5xl";
      case 2: return "font-mono text-slate-400 text-3xl";
      default: return "";
    }
  };

  return (
    <motion.div 
      className={cn("flex flex-wrap justify-center gap-x-[0.1em]", getStyle())}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.02
          }
        }
      }}
    >
      {chars.map((char, charIdx) => {
        let decoration = "";
        if (index === 0 && text.includes("on it?") && text.indexOf(char) >= text.indexOf("on it?") && text.indexOf(char) < text.indexOf("on it?") + 6) {
            decoration = "bg-neon-lime text-black inline-block px-0.5";
        }
        if (index === 1 && text.includes("Circle it") && text.indexOf(char) >= text.indexOf("Circle it")) {
            decoration = "underline decoration-neon-cyan decoration-4 underline-offset-4";
        }
        if (index === 2 && (char === "[" || char === "]")) {
            decoration = "text-neon-pink";
        }

        return (
          <motion.span
            key={charIdx}
            variants={{
              hidden: { 
                opacity: 0, 
                y: Math.random() * 100 - 50, 
                x: Math.random() * 100 - 50,
                rotate: Math.random() * 40 - 20,
              },
              visible: { 
                opacity: 1, 
                y: 0, 
                x: 0,
                rotate: 0,
                transition: {
                  type: "spring",
                  damping: 10,
                  stiffness: 80
                }
              }
            }}
            className={cn("inline-block whitespace-pre", decoration)}
          >
            {char}
          </motion.span>
        );
      })}
    </motion.div>
  );
}

function NeonSnake({ color, delay = 0, path, dashed = false }: { color: string, delay?: number, path: string, dashed?: boolean }) {
  return (
    <motion.path
      d={path}
      fill="transparent"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeDasharray={dashed ? "15 15" : "none"}
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ 
        pathLength: 1, 
        opacity: [0, 0.6, 0.6, 0],
        transition: {
          pathLength: { duration: 5, ease: "easeInOut", repeat: Infinity, delay },
          opacity: { duration: 5, ease: "easeInOut", repeat: Infinity, delay }
        }
      }}
      className="filter drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
      style={{ filter: `drop-shadow(0 0 10px ${color})` }}
    />
  );
}

export function QuoteSection() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="relative min-h-screen py-40 bg-white overflow-hidden">
      {/* Background Neon Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <NeonSnake 
            color="#CCFF00" 
            path="M -100 200 C 250 100 500 400 1100 150" 
            delay={0}
            dashed
          />
          <NeonSnake 
            color="#00FFFF" 
            path="M 1100 600 C 750 700 500 500 -100 650" 
            delay={1.5}
            dashed
          />
          <NeonSnake 
            color="#FF00FF" 
            path="M 850 450 a 80 80 0 1 1 0 1" 
            delay={3}
            dashed
          />
          <path d="M450,50 Q480,80 450,110 T450,170" stroke="#CCFF00" strokeWidth="30" fill="transparent" strokeLinecap="round" className="blur-3xl opacity-20" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10 space-y-[40vh]">
        {quotes.map((quote, idx) => {
            // Apply special formatting to the third quote for the theme
            const formattedQuote = idx === 2 ? `[ ${quote} ]` : quote;
            return (
              <div key={idx} className="flex justify-center items-center h-[30vh]">
                <AnimatedText text={formattedQuote} index={idx} />
              </div>
            );
        })}
      </div>
    </section>
  );
}
