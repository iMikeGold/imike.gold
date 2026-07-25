"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  useEffect,
  useRef,
  type CSSProperties,
  type MouseEvent,
} from "react";
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

    // Compact screens use the first tap to engage the feed and the second
    // tap to enter the selected destination. Keyboard activation is immediate.
    if (isCompact && event.detail !== 0 && !isActive) {
      event.preventDefault();
      onActivate(gateway.id);
    }
  }

  const feedStatus = !gateway.videoSrc
    ? "DISTRIBUTION FEED NOT LOADED"
    : isActive
      ? "DISTRIBUTION FEED PLAYING"
      : "DISTRIBUTION FEED PAUSED";

  return (
    <article
      className="gateway-panel"
      data-active={isActive}
      data-muted={anotherIsActive}
      style={{ "--gateway-accent": gateway.accent } as CSSProperties}
      onMouseEnter={() => onActivate(gateway.id)}
      onMouseLeave={onDeactivate}
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
              {gateway.videoSrc ? "OPEN FEED" : "ENTER"} <span>↗</span>
            </span>
          </div>
        </div>

        <div className="gateway-status" aria-hidden="true">
          <span className="status-light" data-playing={isActive && !!gateway.videoSrc} />
          {feedStatus}
        </div>
      </a>
    </article>
  );
}

function GatewayMedia({
  gateway,
  active,
}: {
  gateway: GatewayDestination;
  active: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (active) {
      void video.play().catch(() => {
        // Some browsers may still reject programmatic playback.
        // The panel remains usable and the destination link still works.
      });
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [active]);

  if (!gateway.videoSrc) {
    return (
      <div className="gateway-standby" aria-hidden="true">
        <div className="standby-orbit" />
        <div className="standby-grid" />
        <div className="standby-pulse" data-running={active} />
        <div className="feed-playhead" data-running={active}>
          <span>▶</span>
        </div>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      className="gateway-video"
      src={gateway.videoSrc}
      poster={gateway.posterSrc}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}
