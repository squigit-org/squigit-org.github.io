import { ScribbleWord } from "@/src/components/ui/ScribbleWord";

export function Quote({ quote }: { quote: string; index: number }) {
  return (
    <section className="relative flex min-h-[95vh] items-center justify-center px-6 py-24">
      <div className="mx-auto max-w-6xl text-center">
        <ScribbleWord
          text={quote}
          className="text-5xl font-semibold tracking-[-0.05em] text-slate-950 md:text-7xl lg:text-8xl"
        />
      </div>
    </section>
  );
}
