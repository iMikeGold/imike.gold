"use client";

import { useState } from "react";
import { gatewayDestinations } from "@/config/gateway";
import type { GatewayId } from "@/types/gateway";
import { GatewayPanel } from "./GatewayPanel";

export function GatewayBillboard() {
  const [activeId, setActiveId] = useState<GatewayId | null>(null);

  return (
    <main className="billboard-shell">
      <header className="billboard-identity">
        <p className="billboard-kicker">SELECT AN ENTRY POINT</p>
        <h1>
          <span aria-hidden="true">(i),</span> MIKE GOLD
        </h1>
      </header>

      <section
        className="gateway-grid"
        aria-label="Choose how to enter the Mike Gold world"
        onMouseLeave={() => setActiveId(null)}
      >
        {gatewayDestinations.map((gateway) => (
          <GatewayPanel
            key={gateway.id}
            gateway={gateway}
            activeId={activeId}
            onActivate={setActiveId}
            onDeactivate={() => setActiveId(null)}
          />
        ))}
      </section>

      <div className="billboard-system-mark" aria-hidden="true">
        BILLBOARD OS / DISTRIBUTION BOARD
      </div>
    </main>
  );
}
