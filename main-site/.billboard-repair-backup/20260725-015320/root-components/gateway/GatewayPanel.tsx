"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, MouseEvent } from "react";
import type { GatewayDestination, GatewayId } from "@/types/gateway";

type GatewayPanelProps = {
  gateway: GatewayDestination;
  activeId: GatewayId | null;
  onActivate: (id: GatewayId) => void;
  onDeactivate: () => void;
};

export function GatewayPanel({
  gateway,
  activeId,
  onActivate,
  onDeactivate,
}: GatewayPanelProps) {
  const reduceMotion = useReducedMotion();
  const isActive = activeId === gateway.id;
  const anotherIsActive = activeId !== null && !isActive;

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const isCompact = window.matchMedia("(max-width: 820px)").matches;

    // On compact screens, the first tap reveals the selected world.
    // The second tap follows the link. Keyboard activation remains immediate.
    if (isCompact && event.detail !== 0 && !isActive) {
      event.preventDefault();
      onActivate(gateway.id);
    }
  }

  return (
    <motion.article
      className="gateway-panel"
      data-active={isActive}
      data-muted={anotherIsActive}
      style={{ "--gateway-accent": gateway.accent } as CSSProperties}
      animate={{
        flex: isActive ? 1.55 : anotherIsActive ? 0.725 : 1,
        opacity: anotherIsActive ? 0.42 : 1,
      }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.52, ease: [0.22, 1, 0.36, 1] }
      }
      onHoverStart={() => onActivate(gateway.id)}
      onHoverEnd={onDeactivate}
      onFocusCapture={() => onActivate(gateway.id)}
      onBlurCapture={onDeactivate}
    >
      <a
        className="gateway-link"
        href={gateway.href}
        aria-label={`${gateway.title}: ${gateway.statement}`}
        onClick={handleClick}
      >
        <GatewayMedia gateway={gateway} active={isActive} />

        <div className="gateway-shade" aria-hidden="true" />
        <div className="gateway-scan" aria-hidden="true" />

        <div className="gateway-topline">
          <span>{gateway.index}</span>
          <span>{gateway.eyebrow}</span>
        </div>

        <div className="gateway-copy">
          <motion.h2
            animate={{ y: isActive && !reduceMotion ? -8 : 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            {gateway.title}
          </motion.h2>

          <div className="gateway-reveal">
            <p>{gateway.statement}</p>
            <span className="gateway-enter" aria-hidden="true">
              ENTER <span>↗</span>
            </span>
          </div>
        </div>

        <div className="gateway-status" aria-hidden="true">
          <span className="status-light" />
          {gateway.videoSrc ? "SIGNAL LIVE" : "SIGNAL RESERVED"}
        </div>
      </a>
    </motion.article>
  );
}

function GatewayMedia({
  gateway,
  active,
}: {
  gateway: GatewayDestination;
  active: boolean;
}) {
  if (!gateway.videoSrc) {
    return (
      <div className="gateway-standby" aria-hidden="true">
        <div className="standby-orbit" />
        <div className="standby-grid" />
        <div className="standby-pulse" data-running={active} />
      </div>
    );
  }

  return (
    <video
      className="gateway-video"
      src={gateway.videoSrc}
      poster={gateway.posterSrc}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      aria-hidden="true"
    />
  );
}
