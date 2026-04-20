import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 py-40 text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl z-10"
      >
        <motion.h1 
          className="mb-8 text-[120px] font-black tracking-tighter text-slate-900 font-heading leading-[0.9]"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Squigit
        </motion.h1>
        <motion.p 
          className="text-2xl leading-relaxed text-slate-600 md:text-3xl max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Squiggle anything you see on your screen and get instant <span className="text-black font-bold">AI overview</span>, OCR, and Search without switching apps.
        </motion.p>
      </motion.div>
      
      {/* Sleek Interface Theme SVG Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-40">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path d="M100,200 C300,100 500,400 900,150" stroke="#CCFF00" strokeWidth="12" fill="transparent" strokeLinecap="round" strokeDasharray="20 30" />
          <path d="M800,600 C600,700 300,500 100,650" stroke="#00FFFF" strokeWidth="8" fill="transparent" strokeLinecap="round" strokeDasharray="10 20" />
          <circle cx="850" cy="450" r="80" stroke="#FF00FF" strokeWidth="2" fill="transparent" strokeDasharray="8 8" />
          <path d="M450,50 Q480,80 450,110 T450,170" stroke="#CCFF00" strokeWidth="20" fill="transparent" strokeLinecap="round" className="blur-xl opacity-30" />
        </svg>
      </div>
    </section>
  );
}
