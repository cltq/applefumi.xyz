"use client";

import { useEffect, useRef } from "react";

const fullTitle = "Fumi";

export default function TypewriterTitle() {
  const iRef = useRef(0);
  const directionRef = useRef<"forward" | "backward">("forward");

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (directionRef.current === "forward") {
        iRef.current++;
        document.title = fullTitle.slice(0, iRef.current);
        if (iRef.current >= fullTitle.length) {
          directionRef.current = "backward";
          timeout = setTimeout(tick, 1500);
          return;
        }
      } else {
        iRef.current--;
        const title = fullTitle.slice(0, iRef.current) || "\u200B";
        document.title = title;
        if (iRef.current <= 0) {
          directionRef.current = "forward";
        }
      }
      timeout = setTimeout(tick, 120);
    };

    timeout = setTimeout(tick, 500);

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
