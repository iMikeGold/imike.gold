import type { GatewayDestination } from "@/types/gateway";

/**
 * BillBoard OS is deliberately data-light.
 *
 * To power a panel later:
 * 1. Add its MP4/WebM to public/media/gateway/<panel>/
 * 2. Add videoSrc below, for example:
 *    videoSrc: "/media/gateway/system/preview.mp4"
 * 3. Optionally add posterSrc.
 *
 * Until then, the panel renders its built-in unlit display state.
 */
export const gatewayDestinations: GatewayDestination[] = [
  {
    id: "system",
    index: "01",
    eyebrow: "MEMORY OS / ARCHIVE",
    title: "ENTER THE SYSTEM",
    statement: "The archive is awake.",
    href: "https://imikegold.com",
    accent: "#d94343",
  },
  {
    id: "works",
    index: "02",
    eyebrow: "HOUSE OF GOLD",
    title: "EXPLORE THE WORKS",
    statement: "Discover the world.",
    href: "https://houseofgold.online",
    accent: "#d4a94f",
  },
  {
    id: "manchild",
    index: "03",
    eyebrow: "MIKE GOLD / ENGINEER",
    title: "MEET THE MANCHILD",
    statement: "The machinery has a maker.",
    href: "https://mikegold.co.uk",
    accent: "#4f6fdc",
  },
];
