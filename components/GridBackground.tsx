"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";

export default function GridBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<{ scale: number }>({ scale: 1 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let rafId: number;

    const animateLoop = () => {
      currentX += (mouseX - currentX) * 0.2; // fast follow
      currentY += (mouseY - currentY) * 0.2;

      el.style.setProperty("--x", `${currentX}px`);
      el.style.setProperty("--y", `${currentY}px`);
      el.style.setProperty("--glow-scale", `${glowRef.current.scale}`);

      rafId = requestAnimationFrame(animateLoop);
    };

    animateLoop();

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setActive(true); // enable effect after first move
    };

    window.addEventListener("mousemove", handleMove);

    // Breathing glow effect with anime.js
    const breathingAnim = animate(glowRef.current, {
      scale: [1, 1.25, 1],
      duration: 3000,
      ease: "inOutSine",
      loop: true,
    });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafId);
      breathingAnim.pause();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 bg-[#0b0b0f]"
      style={{
        ["--x" as string]: "50%",
        ["--y" as string]: "50%",
        ["--glow-scale" as string]: "1",
      }}
    >
      {/* Base grid — fades in on mount */}
      <div
        className="absolute inset-0 animate-[gridFadeIn_1.2s_ease-out_forwards]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          opacity: 0,
        }}
      />

      {/* Brighter grid near cursor */}
      {active && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            maskImage: `radial-gradient(circle calc(160px * var(--glow-scale)) at var(--x) var(--y), white, transparent 70%)`,
            WebkitMaskImage: `radial-gradient(circle calc(160px * var(--glow-scale)) at var(--x) var(--y), white, transparent 70%)`,
          }}
        />
      )}

      {/* Thicker grid near cursor */}
      {active && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.16) 2px, transparent 2px),
              linear-gradient(90deg, rgba(255,255,255,0.16) 2px, transparent 2px)
            `,
            backgroundSize: "48px 48px",
            maskImage: `radial-gradient(circle calc(100px * var(--glow-scale)) at var(--x) var(--y), white, transparent 70%)`,
            WebkitMaskImage: `radial-gradient(circle calc(100px * var(--glow-scale)) at var(--x) var(--y), white, transparent 70%)`,
          }}
        />
      )}
    </div>
  );
}