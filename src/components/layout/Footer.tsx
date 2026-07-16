import {
  AppIcon,
  LinkedInIcon,
  GithubIcon,
  XIcon,
} from "@/components/icons";
import { LINKS, RESOURCE_LINKS } from "@/lib";

type FooterLink = {
  label: string;
  href: string | (() => void);
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

type FooterNavigationScope = "landing" | "site";
type FooterBottomLinks = "policies" | "home";

type FooterProps = {
  navigationScope?: FooterNavigationScope;
  bottomLinks?: FooterBottomLinks;
};

const openUseCasesDropdown = () => {
  window.dispatchEvent(new Event("squigit:open-use-cases"));
};

const homeAnchor = (anchor: string) => `/${anchor}`;

const getFooterSections = (
  navigationScope: FooterNavigationScope,
): FooterSection[] => {
  const anchorHref =
    navigationScope === "landing" ? (anchor: string) => anchor : homeAnchor;

  return [
    {
      title: "Product",
      links: [
        navigationScope === "landing"
          ? { label: "Use Cases", href: openUseCasesDropdown }
          : { label: "Use Cases", href: homeAnchor(LINKS.anchors.useCases) },
        { label: "Download App", href: anchorHref(LINKS.anchors.download) },
        { label: "Pricing", href: anchorHref(LINKS.anchors.pricing) },
        { label: "Packages", href: anchorHref(LINKS.anchors.products) },
      ],
    },
    {
      title: "Resources",
      links: RESOURCE_LINKS as FooterLink[],
    },
    {
      title: "Developer",
      links: [
        { label: "𝕏", href: LINKS.social.x },
        { label: "LinkedIn", href: LINKS.social.linkedIn },
        {
          label: "Contact",
          href: LINKS.contact.email,
        },
        { label: "GitHub", href: LINKS.squigit.repository },
      ],
    },
    {
      title: "Terms & Policies",
      links: [
        {
          label: "Terms of Service",
          href: LINKS.legal.terms,
        },
        {
          label: "Privacy Policy",
          href: LINKS.legal.privacy,
        },
        {
          label: "Security Policy",
          href: LINKS.squigit.securityPolicy,
        },
        {
          label: "Other Policies",
          href: LINKS.squigit.policies,
        },
      ],
    },
  ];
};

const socialLinks = [
  {
    label: "X",
    href: LINKS.social.x,
    icon: <XIcon className="h-7 w-7" />,
  },
  {
    label: "LinkedIn",
    href: LINKS.social.linkedIn,
    icon: <LinkedInIcon className="h-7 w-7" />,
  },
  {
    label: "GitHub",
    href: LINKS.squigit.repository,
    icon: <GithubIcon className="h-7 w-7" />,
  },
];

export function Footer({
  navigationScope = "landing",
  bottomLinks = "policies",
}: FooterProps = {}) {
  const footerSections = getFooterSections(navigationScope);
  const footerBottomLinks =
    bottomLinks === "home"
      ? [{ label: "Home", href: "/" }]
      : [
          { label: "Privacy", href: LINKS.legal.privacy },
          { label: "Terms", href: LINKS.legal.terms },
        ];

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
                            link.href.startsWith(LINKS.externalUrlPrefix)
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            link.href.startsWith(LINKS.externalUrlPrefix)
                              ? "noreferrer"
                              : undefined
                          }
                          className="text-sm text-white/60 transition hover:text-white cursor-pointer"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={link.href}
                          className="text-sm text-white/60 transition hover:text-white cursor-pointer"
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
            {footerBottomLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
