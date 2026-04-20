import React from "react";

type IconProps = {
  className?: string;
};

function IconBase({
  className,
  children,
  viewBox = "0 0 24 24",
}: React.PropsWithChildren<{ className?: string; viewBox?: string }>) {
  return (
    <svg
      aria-hidden="true"
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

export function DownloadIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </IconBase>
  );
}

export function GithubIcon({ className }: IconProps) {
  return (
    <IconBase className={className} viewBox="0 0 24 24">
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3" />
      <path d="M15 22v-3.9a3.4 3.4 0 0 0-.9-2.6c3  -.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 19 5.2 4.8 4.8 0 0 0 18.9 2S17.7 1.7 15 3.5a13.4 13.4 0 0 0-6 0C6.3 1.7 5.1 2 5.1 2A4.8 4.8 0 0 0 5 5.2 5.2 5.2 0 0 0 3.7 8.8c0 5.2 3.2 6.4 6.2 6.7A3.4 3.4 0 0 0 9 18.1V22" />
    </IconBase>
  );
}

export function SparklesIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z" />
      <path d="M5 16l.8 2.2L8 19l-2.2.8L5 22l-.8-2.2L2 19l2.2-.8L5 16Z" />
      <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z" />
    </IconBase>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </IconBase>
  );
}

export function ScanTextIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M4 7V5a1 1 0 0 1 1-1h2" />
      <path d="M20 7V5a1 1 0 0 0-1-1h-2" />
      <path d="M4 17v2a1 1 0 0 0 1 1h2" />
      <path d="M20 17v2a1 1 0 0 1-1 1h-2" />
      <path d="M8 8h8" />
      <path d="M8 12h8" />
      <path d="M10 16h4" />
    </IconBase>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="m6 9 6 6 6-6" />
    </IconBase>
  );
}
