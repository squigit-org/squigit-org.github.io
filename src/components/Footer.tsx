import { GithubIcon } from "@/src/components/icons";

export function Footer() {
  return (
    <footer
      id="resources"
      className="relative border-t border-slate-200 py-10"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-10">
        <div>
          <p className="text-lg font-product-sans font-[480] tracking-[-0.04em] text-slate-950">
            Squigit
          </p>
          <p className="text-sm text-slate-600">
            Open-source desktop AI vision utility for screen capture, OCR, and
            search.
          </p>
        </div>
        <div id="repository" className="flex items-center gap-3">
          <a
            href="https://github.com/squigit-org/squigit"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub Repository
          </a>
        </div>
      </div>
    </footer>
  );
}
