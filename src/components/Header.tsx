import { Button } from "@/src/components/ui/button";
import { DownloadIcon } from "@/src/components/icons";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <nav className="flex flex-wrap items-center gap-2">
          {[
            ["Products", "#products"],
            ["Use Cases", "#use-cases"],
            ["Repository", "#repository"],
            ["Resources", "#resources"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
            >
              {label}
            </a>
          ))}
        </nav>

        <a href="#download">
          <Button className="rounded-full bg-slate-950 px-5 text-white hover:bg-slate-800">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Download
          </Button>
        </a>
      </div>
    </header>
  );
}
