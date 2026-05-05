"use client";

import { useEffect, useRef } from "react";

const TEXT = "Fumi | <3   ";
const GAP = "     ";
const FULL_TEXT = TEXT + GAP;

const SPEED = 220;
const DELAY_SPEED = 1000;
const WINDOW_SIZE = 10;

export default function Title() {
  const indexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    // Only run animation when tab is visible
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
      if (isVisibleRef.current && !timeoutRef.current) {
        tick();
      }
    };

    const tick = () => {
      if (!isVisibleRef.current) {
        timeoutRef.current = null;
        return;
      }

      const i = indexRef.current;
      const loop = FULL_TEXT.repeat(3);
      const visible = loop.slice(i, i + WINDOW_SIZE);

      document.title = visible;

      const isLoopEnd = i === FULL_TEXT.length - 1;
      indexRef.current = (i + 1) % FULL_TEXT.length;

      const nextDelay = isLoopEnd ? DELAY_SPEED : SPEED;
      timeoutRef.current = setTimeout(tick, nextDelay);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    // Delay initial start to not block FCP
    const startDelay = setTimeout(tick, 100);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(startDelay);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      document.title = "Fumi";
    };
  }, []);

  return null;
}
