import {
  AppIcon,
  LinkedInIcon,
  GithubIcon,
  XIcon,
} from "@/src/components/icons";
import { RESOURCE_LINKS } from "../lib/constants";

type FooterLink = {
  label: string;
  href: string | (() => void);
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

const openUseCasesDropdown = () => {
  window.dispatchEvent(new Event("squigit:open-use-cases"));
};

const footerSections: FooterSection[] = [
  {
    title: "Product",
    links: [
      { label: "Use Cases", href: openUseCasesDropdown },
      { label: "Download App", href: "#download" },
      { label: "Pricing", href: "#pricing" },
      { label: "Packages", href: "#products" },
    ],
  },
  {
    title: "Resources",
    links: RESOURCE_LINKS as FooterLink[],
  },
  {
    title: "Developer",
    links: [
      { label: "Twitter", href: "https://x.com/a7mddra" },
      {
        label: "Contact",
        href: "mailto:a7mddra@gmail.com?subject=Inquiry&body=Hi%20there,",
      },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/a7mddra/" },
      { label: "GitHub", href: "https://github.com/squigit-org/squigit" },
    ],
  },
  {
    title: "Terms & Policies",
    links: [
      {
        label: "Terms of Service",
        href: "/terms.html",
      },
      {
        label: "Privacy Policy",
        href: "/privacy.html",
      },
      {
        label: "Security Policy",
        href: "https://github.com/squigit-org/squigit/blob/main/docs/06-policies/SECURITY.md",
      },
      {
        label: "Other Policies",
        href: "https://github.com/squigit-org/squigit/tree/main/docs/06-policies",
      },
    ],
  },
];

const socialLinks = [
  {
    label: "X",
    href: "https://x.com/a7mddra",
    icon: <XIcon className="h-7 w-7" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/a7mddra/",
    icon: <LinkedInIcon className="h-7 w-7" />,
  },
  {
    label: "GitHub",
    href: "https://github.com/squigit-org/squigit",
    icon: <GithubIcon className="h-7 w-7" />,
  },
];

export function Footer() {
  return (
    <footer
      id="resources"
      className="border-t border-white/10 bg-[#03040a] text-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="flex flex-col justify-between gap-8">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <AppIcon className="h-10 w-10 text-white" />
                <span className="text-xl font-semibold tracking-tight">
                  Squigit
                </span>
              </div>

              <p className="max-w-sm text-sm leading-6 text-white/60">
                Squiggle what you see. Get instant understanding.
                <br />A fast, local-first visual assistant for your desktop.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="inline-flex items-center justify-center text-white/60 transition-colors hover:text-white"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="mb-4 text-sm font-semibold text-white">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {typeof link.href === "string" ? (
                        <a
                          href={link.href}
                          target={
                            link.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            link.href.startsWith("http")
                              ? "noreferrer"
                              : undefined
                          }
                          className="text-sm text-white/60 transition hover:text-white"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={link.href}
                          className="text-sm text-white/60 transition hover:text-white"
                        >
                          {link.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans">&copy; 2026 Squigit. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href="/privacy.html" className="transition hover:text-white">
              Privacy
            </a>
            <a href="/terms.html" className="transition hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
