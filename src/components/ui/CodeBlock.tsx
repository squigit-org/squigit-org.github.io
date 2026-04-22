export function CodeBlock({ lines, language }: { lines: string[]; language: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-xl">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-xs text-slate-400">
        <span>{language}</span>
        <span>copy-ready</span>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-7 text-slate-100">
        <code>{lines.join("\n")}</code>
      </pre>
    </div>
  );
}
