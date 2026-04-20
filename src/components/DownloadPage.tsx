import { motion } from "motion/react";
import { Download, Apple, Monitor, Terminal } from "lucide-react";
import { Button } from "@/src/components/ui/button";

const systems = [
  {
    name: "MacOS",
    icon: <Apple className="w-8 h-8" />,
    downloads: [
      { label: "Download for Apple Silicon", href: "https://github.com/squigit-org/squigit/releases" },
      { label: "Download for Intel", href: "https://github.com/squigit-org/squigit/releases" },
    ],
    requirements: "macOS versions with Apple security update support. This is typically the current and two previous versions. Min Version 12 (Monterey), X86 is not supported"
  },
  {
    name: "Windows",
    icon: <Monitor className="w-8 h-8" />,
    downloads: [
      { label: "Download for x64", href: "https://github.com/squigit-org/squigit/releases" },
      { label: "Download for ARM64", href: "https://github.com/squigit-org/squigit/releases" },
    ],
    requirements: "Windows 10 (64 bit)"
  },
  {
    name: "Linux",
    icon: <Terminal className="w-8 h-8" />,
    downloads: [
      { label: "Download", href: "https://github.com/squigit-org/squigit/releases" },
    ],
    requirements: "glibc >= 2.28, glibcxx >= 3.4.25 (e.g. Ubuntu 20. Debian 10, Fedora 36, RHEL 8)"
  }
];

export function DownloadPage() {
  return (
    <section className="container mx-auto px-4 py-32 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">Select download</h2>
        <p className="text-xl text-slate-600 font-medium tracking-tight">Pick your operating system to get started with Squigit.</p>
      </motion.div>

      <div className="bg-slate-100/50 p-8 rounded-[40px] border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {systems.map((system) => (
            <motion.div
              key={system.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all group"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-neon-lime/20 transition-colors">
                  {system.icon}
                </div>
                <h3 className="text-xl font-black font-heading tracking-tight">{system.name}</h3>
              </div>
              
              <div className="space-y-3 mb-6">
                {system.downloads.map((dl) => (
                  <div key={dl.label}>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 tracking-wider">{dl.label}</p>
                    <Button 
                      className="w-full rounded-xl h-10 bg-slate-950 text-white hover:bg-slate-800 transition-all font-bold text-xs"
                    >
                      <a href={dl.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full">
                        <Download className="w-3.5 h-3.5 mr-2" />
                        download
                      </a>
                    </Button>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-50">
                <p className="text-[9px] font-black text-slate-300 uppercase mb-1.5 tracking-widest">Requirements</p>
                <p className="text-[11px] text-slate-500 leading-relaxed font-mono">
                  {system.requirements}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
