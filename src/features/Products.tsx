export function Products() {
  return (
    <section id="products" className="relative py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-10">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Products
          </p>
          <h2 className="text-4xl font-product-sans font-[450] tracking-[-0.05em] text-slate-950 md:text-5xl">
            Squigit OCR and Squigit STT sidecars.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            These sidecars run locally and power text extraction and voice input:{" "}
            <span className="font-medium text-slate-900">squigit-ocr</span> and{" "}
            <span className="font-medium text-slate-900">squigit-stt</span>.
          </p>
          <p className="mt-4 text-base leading-7 text-slate-600">
            <span className="font-medium text-slate-900">squigit-ocr</span> uses
            the PaddleOCR framework to detect text regions and extract text with
            bounding boxes from captured images.{" "}
            <span className="font-medium text-slate-900">squigit-stt</span> uses
            the whisper.cpp framework to transcribe microphone audio into live
            voice-to-text chat input.
          </p>
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white/80 p-5 text-sm leading-7 text-slate-600">
            <p>As of April 22, 2026:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>macOS (Apple Silicon) is available via Homebrew tap.</li>
              <li>Linux is available via signed APT and DNF repositories.</li>
              <li>Windows is available via Winget.</li>
            </ul>
          </div>
          <p className="mt-6 text-base leading-7 text-slate-600">
            Commands and platform setup are now shown in the{" "}
            <span className="font-medium text-slate-900">Setup</span> flow.
          </p>
        </div>
      </div>
    </section>
  );
}
