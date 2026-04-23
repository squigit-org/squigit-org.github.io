import { useEffect, useMemo, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-powershell";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-python";

const PRISM_LANGUAGE_BY_ALIAS: Record<string, string> = {
  bash: "bash",
  sh: "bash",
  shell: "bash",
  shellscript: "bash",
  zsh: "bash",
  powershell: "powershell",
  ps: "powershell",
  ps1: "powershell",
  pwsh: "powershell",
  javascript: "javascript",
  js: "javascript",
  typescript: "typescript",
  ts: "typescript",
  json: "json",
  python: "python",
  py: "python",
};

function resolvePrismLanguage(language: string) {
  return PRISM_LANGUAGE_BY_ALIAS[language.trim().toLowerCase()] ?? "bash";
}

async function copyToClipboard(text: string) {
  if (
    typeof navigator !== "undefined" &&
    navigator.clipboard &&
    typeof window !== "undefined" &&
    window.isSecureContext
  ) {
    await navigator.clipboard.writeText(text);
    return;
  }

  if (typeof document === "undefined") {
    throw new Error("Clipboard unavailable");
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
}

export function CodeBlock({
  lines,
  language,
}: {
  lines: string[];
  language: string;
}) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement | null>(null);
  const source = useMemo(() => lines.join("\n"), [lines]);
  const prismLanguage = useMemo(() => resolvePrismLanguage(language), [language]);
  const languageLabel = language.trim().toLowerCase();

  useEffect(() => {
    if (!codeRef.current) {
      return;
    }
    Prism.highlightElement(codeRef.current);
  }, [prismLanguage, source]);

  useEffect(() => {
    if (!copied) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setCopied(false);
    }, 1500);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [copied]);

  const handleCopy = async () => {
    try {
      await copyToClipboard(source);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 text-xs">
        <span className="font-medium uppercase tracking-[0.08em] text-slate-500">
          {languageLabel}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          aria-label="Copy code to clipboard"
        >
          {copied ? <CheckIcon className="h-3.5 w-3.5" /> : <CopyIcon className="h-3.5 w-3.5" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <pre className="code-scrollbar overflow-x-auto bg-slate-50 p-4">
        <code
          ref={codeRef}
          className={`language-${prismLanguage} block text-sm leading-7`}
        >
          {source}
        </code>
      </pre>
    </div>
  );
}
