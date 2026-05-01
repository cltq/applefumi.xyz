"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DiscordWidget() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay iframe load until after initial paint
    const timer = requestIdleCallback(() => setIsVisible(true), {
      timeout: 1000,
    });
    return () => cancelIdleCallback(timer);
  }, []);

  if (!isVisible) {
    return (
      <div className="w-full h-full rounded-lg bg-zinc-800/50 animate-pulse" />
    );
  }

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
      <iframe
        className="w-full h-full rounded-lg border-none"
        title="Discord user embed"
        sandbox="allow-scripts"
        loading="lazy"
        src="https://widgets.vendicated.dev/user?id=969088519161139270&theme=dark&banner=true&full-banner=true&rounded-corners=true&discord-icon=true&badges=true&guess-nitro=true&"
      />
    </motion.div>
  );
}
