import type { GatewayDestination } from "@/types/gateway";

/**
 * BillBoard OS display order:
 * 1. Meet the Manchild — blue
 * 2. Explore the Works — gold
 * 3. Enter the System — red
 *
 * To connect footage later, add videoSrc and optionally posterSrc.
 */
export const gatewayDestinations: GatewayDestination[] = [
  {
    id: "manchild",
    index: "01",
    eyebrow: "MIKE GOLD / ENGINEER",
    title: "MEET THE MANCHILD",
    statement: "The machinery has an engineer.",
    href: "https://mikegold.co.uk",
    accent: "#4f6fdc",
  },
  {
    id: "works",
    index: "02",
    eyebrow: "HOUSE OF GOLD",
    title: "EXPLORE THE WORKS",
    statement: "Discover the designer’s world.",
    href: "https://houseofgold.online",
    accent: "#d4a94f",
  },
  {
    id: "system",
    index: "03",
    eyebrow: "MEMORY OS / ARCHIVE",
    title: "ENTER THE SYSTEM",
    statement: "The creative’s archive is awake.",
    href: "https://imikegold.com",
    accent: "#d94343",
  },
];
