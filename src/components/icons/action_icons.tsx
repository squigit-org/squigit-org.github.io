import { IconBase, type IconProps } from "./shared";

export function DownloadIcon({ className, size }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </IconBase>
  );
}

export function ChevronDownIcon({ className, size }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <path d="m6 9 6 6 6-6" />
    </IconBase>
  );
}
