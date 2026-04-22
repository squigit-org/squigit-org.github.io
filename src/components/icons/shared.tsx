import type { CSSProperties, PropsWithChildren } from "react";

export type IconProps = {
  className?: string;
  size?: number | string;
};

export function getIconSizeStyle(
  size?: number | string,
): CSSProperties | undefined {
  if (size === undefined) {
    return undefined;
  }

  return {
    width: typeof size === "number" ? `${size}px` : size,
    height: typeof size === "number" ? `${size}px` : size,
  };
}

export function IconBase({
  className,
  size,
  children,
  viewBox = "0 0 24 24",
}: PropsWithChildren<{
  className?: string;
  size?: number | string;
  viewBox?: string;
}>) {
  return (
    <svg
      aria-hidden="true"
      style={getIconSizeStyle(size)}
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
