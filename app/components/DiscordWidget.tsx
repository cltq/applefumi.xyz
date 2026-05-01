"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DiscordWidget() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay iframe load until after initial paint with fallback for older browsers
    if ("requestIdleCallback" in window) {
      const timer = requestIdleCallback(() => setIsVisible(true), {
        timeout: 1000,
      });
      return () => cancelIdleCallback(timer);
    } else {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <motion.div
      className="w-full h-full"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {isVisible ? (
        <iframe
          className="w-full h-full rounded-lg border-none"
          title="Discord user embed"
          sandbox="allow-scripts allow-same-origin"
          loading="lazy"
          src="https://widgets.vendicated.dev/user?id=969088519161139270&theme=dark&banner=true&full-banner=true&rounded-corners=true&discord-icon=true&badges=true&guess-nitro=true&"
        />
      ) : (
        <div className="w-full h-full rounded-lg bg-zinc-800/50 animate-pulse" />
      )}
    </motion.div>
  );
}
