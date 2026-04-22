import { IconBase, type IconProps } from "./shared";

export function SparklesIcon({ className, size }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z" />
      <path d="M5 16l.8 2.2L8 19l-2.2.8L5 22l-.8-2.2L2 19l2.2-.8L5 16Z" />
      <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z" />
    </IconBase>
  );
}

export function SearchIcon({ className, size }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </IconBase>
  );
}

export function ScanTextIcon({ className, size }: IconProps) {
  return (
    <IconBase className={className} size={size}>
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
