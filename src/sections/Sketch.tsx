import { useLayoutEffect, useRef, useState } from "react";
import { TextShimmer } from "@/components/ui";

const OCR_SELECTED_TEXT = "relies on understanding";

const SKETCH_STEPS = [
  {
    title: "Capture what you mean",
    lines: [
      "Press one hotkey, then circle, squiggle, or drag over anything on screen.",
      "Squigit grabs only that moment, exactly as you selected it.",
    ],
  },
  {
    title: "Turn images into usable text",
    lines: [
      "Local OCR adds an invisible text layer directly over the image.",
      "Select, copy, search, or translate text without sending it anywhere.",
    ],
  },
  {
    title: "Ask about what you captured",
    lines: [
      "Your capture opens in a full chat, ready for follow-up questions.",
      "Ask Squigit to explain, compare, summarize, or help you decide what to do next.",
    ],
  },
] as const;

function useScaledStage(sourceWidth: number) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState<number | null>(null);

  useLayoutEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const syncScale = () => {
      const width = node.clientWidth;

      if (width > 0) {
        setScale(width / sourceWidth);
      }
    };

    syncScale();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(syncScale)
        : null;

    resizeObserver?.observe(node);
    window.addEventListener("resize", syncScale);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", syncScale);
    };
  }, [sourceWidth]);

  return { ref, scale };
}

function useInlineMenuLayout(activePage: number) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const pagesRef = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const syncMenuLayout = () => {
      const menu = menuRef.current;
      const slider = sliderRef.current;
      const pages = pagesRef.current;

      if (!menu || !slider || pages.length < 3 || pages.some((page) => !page)) {
        return;
      }

      const widths = pages.map((page) => page?.offsetWidth ?? 0);
      let targetWidth = widths[0];
      let slideOffset = 0;

      if (activePage === 1) {
        targetWidth = widths[1];
        slideOffset = -widths[0];
      } else if (activePage === 2) {
        targetWidth = widths[2];
        slideOffset = -(widths[0] + widths[1]);
      }

      menu.style.width = `${targetWidth}px`;
      slider.style.transform = `translateX(${slideOffset}px)`;
    };

    syncMenuLayout();
    document.fonts?.ready.then(syncMenuLayout).catch(() => undefined);
    window.addEventListener("resize", syncMenuLayout);

    return () => {
      window.removeEventListener("resize", syncMenuLayout);
    };
  }, [activePage]);

  return { menuRef, pagesRef, sliderRef };
}

function StepText({ step }: { step: (typeof SKETCH_STEPS)[number] }) {
  return (
    <div className="font-product-sans">
      <h2 className="max-w-[13ch] text-2xl font-semibold leading-[1.02] tracking-[-0.04em] text-slate-950 sm:text-3xl md:text-4xl lg:text-5xl">
        {step.title}
      </h2>
      <p className="mt-5 max-w-xl text-lg font-semibold leading-[1.2] tracking-[-0.02em] text-slate-500 sm:text-xl md:text-2xl">
        {step.lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
    </div>
  );
}

function StageHeading() {
  return (
    <h1 style={{ fontSize: 80, marginBottom: 40, fontWeight: 700 }}>
      Digital Photography
    </h1>
  );
}

function RectStage() {
  return (
    <div className="stage" id="stage-left">
      <div className="pdf-layer">
        <StageHeading />
        <div className="text-paragraph">
          In the realm of digital photography, capturing a clear image relies on
          understanding the basic principles of light and exposure. The camera
          sensor acts to record the available light entering through the lens.
          Unlike traditional film, the digital sensor instantly processes the
          scene into a viewable format. This paragraph highlights the importance
          of keeping the subject in focus, adjusting settings from dark to
          bright in under a second.
        </div>
        <div className="text-caption">
          Figure 1.1: Illustration of a standard digital capture process in a
          studio.
        </div>
      </div>
      <div className="selection-box-rect"></div>
      <div className="cursor-wrapper-rect">
        <div className="cursor-rect">
          <div className="cursor-normal">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 255 362"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 305.971V0L221.195 221.984H91.7908L83.9476 224.353L0 305.971Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M173.363 318.853L104.567 348.18L15.219 136.322L85.5601 106.651L173.363 318.853Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M147.915 305.849L112.725 320.636L53.5669 179.754L88.6993 164.947L147.915 305.849Z"
                fill="black"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.0833 45.9883V259.738L75.7417 204.982L83.9094 202.327H174.899L19.0833 45.9883Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="cursor-clicked">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 255 362"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="255"
                height="362"
              >
                <rect width="255" height="362" fill="#FF0000" />
              </mask>
              <g mask="url(#mask0)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M34.7691 303.117L0 -0.871674L236.181 195.546L112.767 209.662L105.556 212.871L34.7691 303.117Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M201.57 297.006L139.292 333.647L30.0054 132.907L93.7188 95.7557L201.57 297.006Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M175.823 286.861L143.943 305.391L71.5136 171.875L103.337 153.332L175.823 286.861Z"
                  fill="black"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M23.4258 42.7371L47.7154 255.102L95.5288 194.521L103.017 190.991L189.794 181.066L23.4258 42.7371Z"
                  fill="black"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function FreeStage() {
  return (
    <div className="stage" id="stage-right">
      <div className="pdf-layer">
        <StageHeading />
        <div className="text-paragraph">
          In the realm of digital photography, capturing a clear image relies on
          understanding the basic principles of light and exposure. The camera
          sensor acts to record the available light entering through the lens.
          Unlike traditional film, the digital sensor instantly processes the
          scene into a viewable format. This paragraph highlights the importance
          of keeping the subject in focus, adjusting settings from dark to
          bright in under a second.
        </div>
        <div className="text-caption">
          Figure 1.1: Illustration of a standard digital capture process in a
          studio.
        </div>
      </div>
      <div className="dim-overlay-container">
        <svg width="100%" height="100%" viewBox="0 0 1080 1080">
          <rect
            className="dim-solid"
            x="0"
            y="0"
            width="1080"
            height="1080"
          />
        </svg>
      </div>
      <svg className="drawing-stroke" viewBox="0 0 1080 1080">
        <path
          className="stroke-path"
          d="M 800,200 C 600,150 400,180 300,300 C 150,450 200,700 350,850 C 500,950 800,900 900,750 C 1000,600 950,300 800,200 Z"
        />
      </svg>
      <div className="cursor-free">
        <div className="cursor-normal">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 255 362"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 305.971V0L221.195 221.984H91.7908L83.9476 224.353L0 305.971Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M173.363 318.853L104.567 348.18L15.219 136.322L85.5601 106.651L173.363 318.853Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M147.915 305.849L112.725 320.636L53.5669 179.754L88.6993 164.947L147.915 305.849Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.0833 45.9883V259.738L75.7417 204.982L83.9094 202.327H174.899L19.0833 45.9883Z"
              fill="black"
            />
          </svg>
        </div>
        <div className="cursor-clicked">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 255 362"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask1"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="255"
              height="362"
            >
              <rect width="255" height="362" fill="#FF0000" />
            </mask>
            <g mask="url(#mask1)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M34.7691 303.117L0 -0.871674L236.181 195.546L112.767 209.662L105.556 212.871L34.7691 303.117Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M201.57 297.006L139.292 333.647L30.0054 132.907L93.7188 95.7557L201.57 297.006Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M175.823 286.861L143.943 305.391L71.5136 171.875L103.337 153.332L175.823 286.861Z"
                fill="black"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.4258 42.7371L47.7154 255.102L95.5288 194.521L103.017 190.991L189.794 181.066L23.4258 42.7371Z"
                fill="black"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function CaptureFrame() {
  const { ref, scale } = useScaledStage(2200);

  return (
    <div
      ref={ref}
      className="sketch-art sketch-scene sketch-capture-scene"
      aria-hidden="true"
    >
      <div
        className="sketch-scaled-stage sketch-capture-stage-set"
        style={{
          transform: `scale(${scale ?? 0})`,
          visibility: scale == null ? "hidden" : "visible",
        }}
      >
        <RectStage />
        <FreeStage />
      </div>
    </div>
  );
}

function OcrStage() {
  const [activePage, setActivePage] = useState(0);
  const { menuRef, pagesRef, sliderRef } = useInlineMenuLayout(activePage);
  const openInjectedUrl = (action: "search" | "translate") => {
    const injectedText = encodeURIComponent(OCR_SELECTED_TEXT);
    const url =
      action === "search"
        ? `https://www.google.com/search?q=${injectedText}`
        : `https://translate.google.com/?sl=auto&tl=en&text=${injectedText}&op=translate`;

    const openedWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (openedWindow) {
      openedWindow.opener = null;
    }
  };

  return (
    <div
      className="stage"
      id="stage-bottom"
      style={{ width: 1120 }}
    >
      <div className="pdf-layer">
        <StageHeading />
        <div className="text-paragraph">
          In the realm of digital photography, capturing a clear image
          <span className="text-selection-container">
            <span className="text-selection-bg"></span>
            <span style={{ position: "relative", zIndex: 1 }}>
              relies on understanding
            </span>

            <div className="inline-menu-anchor">
              <div
                id="inlineMenu"
                ref={menuRef}
                className="menu active animating-layout"
                aria-label="Inline text menu"
              >
                <div id="menuSlider" ref={sliderRef} className="menuSlider">
                  <div
                    id="page1"
                    ref={(element) => {
                      pagesRef.current[0] = element;
                    }}
                    className="menuPage"
                  >
                    <button className="menuItem" type="button" data-action="copy" tabIndex={-1}>
                      Copy
                    </button>
                    <div className="divider"></div>
                    <button className="menuItem" type="button" data-action="selectAll" tabIndex={-1}>
                      Select All
                    </button>
                    <div className="divider"></div>
                    <button
                      className="menuItem navArrow"
                      type="button"
                      data-page="1"
                      aria-label="Next page"
                      onClick={() => setActivePage(1)}
                      tabIndex={-1}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>
                  </div>

                  <div
                    id="page2"
                    ref={(element) => {
                      pagesRef.current[1] = element;
                    }}
                    className="menuPage"
                  >
                    <button
                      className="menuItem navArrow"
                      type="button"
                      data-page="0"
                      aria-label="Previous page"
                      onClick={() => setActivePage(0)}
                      tabIndex={-1}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    </button>
                    <div className="divider"></div>
                    <button
                      className="menuItem"
                      type="button"
                      data-action="search"
                      onClick={() => openInjectedUrl("search")}
                    >
                      Search
                    </button>
                    <div className="divider"></div>
                    <button
                      className="menuItem"
                      type="button"
                      data-action="translate"
                      onClick={() => openInjectedUrl("translate")}
                    >
                      Translate
                    </button>
                  </div>

                  <div
                    id="pageFlat"
                    ref={(element) => {
                      pagesRef.current[2] = element;
                    }}
                    className="menuPage"
                  >
                    <button className="menuItem" type="button" data-action="copy" tabIndex={-1}>
                      Copy
                    </button>
                    <div className="divider"></div>
                    <button
                      className="menuItem"
                      type="button"
                      data-action="search"
                      onClick={() => openInjectedUrl("search")}
                    >
                      Search
                    </button>
                    <div className="divider"></div>
                    <button
                      className="menuItem"
                      type="button"
                      data-action="translate"
                      onClick={() => openInjectedUrl("translate")}
                    >
                      Translate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </span>{" "}
          the basic principles of light and exposure. The camera sensor acts to
          record the available light entering through the lens. Unlike
          traditional film, the digital sensor instantly processes the scene
          into a viewable format. This paragraph highlights the importance of
          keeping the subject in focus, adjusting settings from dark to bright
          in under a second.
        </div>
        <div className="text-caption">
          Figure 1.1: Illustration of a standard digital capture process in a
          studio.
        </div>
      </div>
    </div>
  );
}

function OcrFrame() {
  const { ref, scale } = useScaledStage(1120);

  return (
    <div
      ref={ref}
      className="sketch-art sketch-scene sketch-ocr-scene"
    >
      <div
        className="sketch-scaled-stage sketch-ocr-stage-set"
        style={{
          transform: `scale(${scale ?? 0})`,
          visibility: scale == null ? "hidden" : "visible",
        }}
      >
        <div style={{ transform: "translate(-560px, -1120px)" }}>
          <OcrStage />
        </div>
      </div>
    </div>
  );
}

function ChatFrame() {
  return (
    <div className="sketch-scene sketch-chat-scene" aria-hidden="true">
      <TextShimmer
        text="Hi I'm Squigit"
        className="sketch-chat-copy font-product-sans text-center text-[clamp(2.4rem,5vw,4.8rem)] font-bold leading-none tracking-[-0.04em]"
        duration={2.5}
        spread={4}
        minSpreadPx={44}
        spotWidth={52}
        peakWidth={10}
      />
    </div>
  );
}

export function Sketch() {
  return (
    <section className="relative py-24 sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-slate-200/80" />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-24 px-5 sm:gap-28 sm:px-6 lg:gap-36 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(22rem,0.9fr)] lg:gap-16">
          <CaptureFrame />
          <StepText step={SKETCH_STEPS[0]} />
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[minmax(22rem,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <StepText step={SKETCH_STEPS[1]} />
          <OcrFrame />
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(22rem,0.9fr)] lg:gap-16">
          <ChatFrame />
          <StepText step={SKETCH_STEPS[2]} />
        </div>
      </div>
    </section>
  );
}
