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

export function AppLogoIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 827 827"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M116.791 593.519C116.897 624.434 129.224 654.054 151.085 675.915C172.946 697.776 202.565 710.104 233.48 710.21H326.953V827H233.28C202.632 826.987 172.287 820.938 143.978 809.197C115.668 797.457 89.9473 780.254 68.2852 758.573C46.6231 736.893 29.4429 711.157 17.7266 682.837C6.01032 654.517 -0.0131451 624.166 0 593.519V500.047H116.791V593.519ZM662.22 603.163C678.913 596.249 697.281 594.44 715.002 597.965C732.723 601.49 749 610.191 761.776 622.967C774.553 635.743 783.254 652.021 786.779 669.742C790.304 687.463 788.494 705.831 781.58 722.523C774.666 739.216 762.957 753.484 747.934 763.522C732.91 773.561 715.248 778.919 697.18 778.919C672.951 778.919 649.714 769.293 632.582 752.161C615.45 735.029 605.825 711.793 605.825 687.564C605.825 669.496 611.183 651.834 621.221 636.811C631.259 621.787 645.527 610.077 662.22 603.163ZM326.953 116.862H233.48C202.565 116.968 172.946 129.304 151.085 151.178C129.224 173.052 116.897 202.689 116.791 233.624V326.953H0V233.424C0.0131396 202.757 6.06309 172.393 17.8037 144.065C29.5443 115.738 46.7462 90.0024 68.4268 68.3271C90.1074 46.6518 115.842 29.4608 144.162 17.7373C172.482 6.01382 202.833 -0.0131094 233.48 0H326.953V116.862ZM593.719 0C624.367 0.0131396 654.712 6.06309 683.022 17.8037C711.332 29.5443 737.053 46.7462 758.715 68.4268C780.377 90.1074 797.557 115.842 809.273 144.162C820.99 172.482 827.013 202.833 827 233.48V326.953H710.209V233.48C710.103 202.565 697.775 172.946 675.914 151.085C654.053 129.224 624.434 116.897 593.519 116.791H500.046V0H593.719Z"
        fill="currentColor"
      />
      <path
        d="M413.877 63.4409C413.877 256.226 569.55 412.651 762.047 413.871L764.314 413.877C570.773 413.877 413.877 570.773 413.877 764.314C413.877 571.529 258.205 415.103 65.7075 413.884L63.4409 413.877C256.982 413.877 413.877 256.982 413.877 63.4409Z"
        fill="currentColor"
      />
    </svg>
  );
}
