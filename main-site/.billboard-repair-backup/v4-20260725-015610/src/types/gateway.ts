export type GatewayId = "system" | "works" | "manchild";

export type GatewayDestination = {
  id: GatewayId;
  index: string;
  eyebrow: string;
  title: string;
  statement: string;
  href: string;
  accent: string;
  videoSrc?: string;
  posterSrc?: string;
};
