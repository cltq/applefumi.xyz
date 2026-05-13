"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DiscordWidget() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let cleanup: () => void;
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = requestIdleCallback(() => setIsVisible(true), { timeout: 1000 });
      cleanup = () => cancelIdleCallback(id);
    } else {
      const id = setTimeout(() => setIsVisible(true), 100);
      cleanup = () => clearTimeout(id);
    }
    return cleanup;
  }, []);

  return (
    <motion.div
      className="relative w-[340px] h-[192px]"
      style={{
        clipPath: "inset(0 round 1rem)",
        WebkitClipPath: "inset(0 round 1rem)",
        willChange: "transform",
        isolation: "isolate",
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* ── Dark backdrop ───────────────────────────────────────────────────
          The iframe document has a white default background. Any pixel the
          widget doesn't paint shows through as white — no clip trick fixes
          this. This div sits behind the iframe and fills every unpainted gap
          with the widget's own dark theme background colour (#1e1f22).      */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#1e1f22",
        }}
      />

      {isVisible ? (
        <iframe
          title="Discord user embed"
          sandbox="allow-scripts allow-same-origin"
          loading="lazy"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "calc(100% + 40px)",
            height: "100%",
            border: "0",
            display: "block",
            colorScheme: "dark",
            // Transparent background so the dark div behind shows through
            // any gaps instead of the browser's default white
            backgroundColor: "transparent",
          }}
          src={[
            "https://widgets.vendicated.dev/user",
            "?id=969088519161139270",
            "&theme=dark",
            "&banner=true",
            "&full-banner=true",
            "&rounded-corners=false",
            "&discord-icon=true",
            "&badges=true",
            "&guess-nitro=true",
          ].join("")}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#1e1f22",
          }}
          className="animate-pulse"
        />
      )}
    </motion.div>
  );
}