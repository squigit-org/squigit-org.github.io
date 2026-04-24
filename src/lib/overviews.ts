export type OverviewMessage = {
  title: string;
  text: string;
};

export type OverviewCardCopy = {
  id: string;
  title: string;
  text: string;
  alternates: OverviewMessage[];
};

export const AI_OVERVIEWS_TITLE = "Get AI-powered overviews";

export const AI_OVERVIEW_CARD_LABELS = {
  title: "AI overview",
  source: "Generated from your screen",
  loading: "Generating...",
} as const;

export const AI_OVERVIEW_CARD_COPY = {
  socialPost: {
    id: "social-post",
    title: "Social post overview",
    text: "This post is announcing a limited-time offer. The main action is to check the comments for pricing and availability.",
    alternates: [
      {
        title: "Comment thread brief",
        text: "The replies are mostly asking about sizes, delivery areas, and whether the discount applies this weekend.",
      },
      {
        title: "Marketplace signal",
        text: "The post looks promotional, with urgency around stock and a request to message the seller before checkout.",
      },
      {
        title: "Audience reaction",
        text: "Most visible comments are positive, but several people are waiting for a clearer price and pickup details.",
      },
      {
        title: "Offer check",
        text: "The visible caption points to a short sale window, with the strongest signal around availability and replies.",
      },
      {
        title: "Post intent",
        text: "This looks designed to drive direct messages rather than a checkout flow, so details may live in comments.",
      },
    ],
  },
  videoSummary: {
    id: "video-summary",
    title: "Video summary",
    text: "This video compares three budget laptops and highlights battery life, display quality, and upgrade options.",
    alternates: [
      {
        title: "Watchlist summary",
        text: "The creator recommends prioritizing RAM, keyboard comfort, and warranty terms over benchmark scores.",
      },
      {
        title: "Chapter overview",
        text: "The middle section focuses on real-world browsing, video calls, and thermals after long sessions.",
      },
      {
        title: "Video takeaway",
        text: "The best value pick is not the cheapest model, because storage and screen brightness matter more.",
      },
      {
        title: "Creator verdict",
        text: "The final recommendation favors balanced specs and a comfortable keyboard over raw processor speed.",
      },
      {
        title: "Comparison brief",
        text: "The side-by-side section makes battery, display brightness, and upgrade access the main decision points.",
      },
    ],
  },
  shoppingInsight: {
    id: "shopping-insight",
    title: "Shopping insight",
    text: "The product looks like a mid-range wireless headset. The key selling points are noise cancellation, long battery life, and lightweight design.",
    alternates: [
      {
        title: "Price comparison",
        text: "Similar headsets are cheaper during seasonal sales, but this listing includes stronger battery claims.",
      },
      {
        title: "Review pattern",
        text: "Positive reviews mention comfort and battery life, while lower ratings focus on microphone quality.",
      },
      {
        title: "Buying note",
        text: "Check return terms and replacement ear pads before ordering, especially if you use headphones daily.",
      },
      {
        title: "Feature scan",
        text: "The listing emphasizes wireless range, lightweight fit, and fast charging more than microphone performance.",
      },
      {
        title: "Deal signal",
        text: "The price appears reasonable if noise cancellation and battery life match the listed claims.",
      },
    ],
  },
  codeExplanation: {
    id: "code-explanation",
    title: "Code explanation",
    text: "This component renders a reusable footer with external links, brand identity, and responsive spacing.",
    alternates: [
      {
        title: "Component scan",
        text: "The layout is mostly presentational, with link groups, icon imports, and mobile-friendly spacing.",
      },
      {
        title: "Code risk",
        text: "The structure looks stable, but repeated link markup could be moved into a small config array.",
      },
      {
        title: "Refactor note",
        text: "The footer would be easier to extend if social links and product links shared the same data shape.",
      },
      {
        title: "Implementation read",
        text: "The code is mostly layout and icon composition, with no complex state or data fetching paths.",
      },
      {
        title: "Maintainability note",
        text: "The repeated class names are manageable, but link metadata could become noisy as the footer grows.",
      },
    ],
  },
  placeOverview: {
    id: "place-overview",
    title: "Place overview",
    text: "This location appears to be a popular cafe near the city center, with strong reviews for desserts and quiet seating.",
    alternates: [
      {
        title: "Route context",
        text: "The map suggests a short walk from the main street, with parking more likely on nearby side roads.",
      },
      {
        title: "Visit timing",
        text: "Reviews imply afternoons are quieter, while evenings are busier and better for groups.",
      },
      {
        title: "Local highlight",
        text: "Desserts, calm seating, and friendly service are the recurring positives in the visible review snippets.",
      },
      {
        title: "Map context",
        text: "The place sits close to a busy route, so walking may be easier than finding a nearby parking spot.",
      },
      {
        title: "Review summary",
        text: "Recent impressions suggest a relaxed cafe with better dessert ratings than main dish ratings.",
      },
    ],
  },
  documentBrief: {
    id: "document-brief",
    title: "Document brief",
    text: "The document explains project milestones, current blockers, and the next actions required before launch.",
    alternates: [
      {
        title: "Action items",
        text: "The next steps are design review, release notes, QA signoff, and a final owner for rollout.",
      },
      {
        title: "Project status",
        text: "Most work appears complete, but launch depends on resolving two blockers and confirming dates.",
      },
      {
        title: "Meeting brief",
        text: "The notes emphasize deadlines, responsible owners, and what must be clarified before shipping.",
      },
      {
        title: "Blocker summary",
        text: "The biggest unresolved items are approval timing, QA ownership, and final copy before launch.",
      },
      {
        title: "Launch readout",
        text: "The plan is close to ready, but the document still needs a clearer owner for the release checklist.",
      },
    ],
  },
} satisfies Record<string, OverviewCardCopy>;
