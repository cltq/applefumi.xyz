"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { glassmorphism, glassmorphismBorder } from "@/app/lib/styles";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Test", path: "/test" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const normalizedPath = pathname?.replace(/\/$/, "") || "/";
  const activeLink =
    navLinks.find((item) => item.path === normalizedPath) || navLinks[0];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed left-0 right-0 flex justify-center z-50 transition-all duration-500 ease-out pointer-events-none ${
        isScrolled ? "top-4" : "top-0"
      }`}
    >
      <nav
        ref={navRef}
        className="relative flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-2.5 pointer-events-auto transition-all duration-500 ease-out"
        style={{
          ...glassmorphism,
          ...glassmorphismBorder,
          width: isScrolled ? "auto" : "100%",
          maxWidth: isScrolled ? "none" : "100%",
          borderRadius: isScrolled ? "9999px" : "0px",
          justifyContent: isScrolled ? "center" : "space-between",
          background: isScrolled
            ? "rgba(10, 10, 10, 0.75)"
            : "rgba(10, 10, 10, 0.85)",
          backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
          WebkitBackdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
          boxShadow: isScrolled
            ? "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
      >
        <div className="flex items-center">
          <Image
            src="/vercel.svg"
            alt="logo"
            width={16}
            height={16}
            className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
          />
        </div>

        <div className="flex items-center gap-1 sm:gap-0.5">
          {navLinks.map((nav) => {
            const isActive = activeLink.path === nav.path;
            return (
              <button
                key={nav.path}
                onClick={() => router.push(nav.path)}
                className="relative z-10 px-3 sm:px-4 py-1.5 text-xs sm:text-sm border-none outline-none cursor-pointer select-none transition-all duration-300 ease-in-out hover:scale-105 font-[family-name:var(--font-geist-mono)]"
                style={{
                  background: "transparent",
                  color: isActive
                    ? "rgba(255,255,255,0.98)"
                    : "rgba(255,255,255,0.78)",
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: "0.01em",
                  textShadow: isActive
                    ? "0 0 12px rgba(255, 255, 255, 0.6)"
                    : "none",
                  transition:
                    "color 0.2s ease, transform 0.25s ease, text-shadow 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (
                      e.currentTarget as HTMLButtonElement
                    ).style.color = "rgba(255,255,255,0.98)";
                    (
                      e.currentTarget as HTMLButtonElement
                    ).style.textShadow = "0 0 8px rgba(255, 255, 255, 0.5)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (
                      e.currentTarget as HTMLButtonElement
                    ).style.color = "rgba(255,255,255,0.78)";
                    (e.currentTarget as HTMLButtonElement).style.textShadow =
                      "none";
                  }
                }}
              >
                {nav.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
