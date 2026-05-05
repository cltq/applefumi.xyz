"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useCallback, useState } from "react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Test", path: "/test" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const normalizedPath = pathname?.replace(/\/$/, "") || "/";
  const activeLink =
    navLinks.find((item) => item.path === normalizedPath) || navLinks[0];

  const handleHauntClick = useCallback(async () => {
    const win = window.open(
      "https://haunt.gg/fumi",
      "_blank",
      "noopener,noreferrer"
    );
    try {
      const response = await fetch("/api/s/haunt");
      const data = await response.json();
      if (data.url && win && !win.closed) {
        win.location.href = data.url;
      }
    } catch (error) {
      console.error("Failed to fetch redirect URL:", error);
    }
  }, []);

  return (
    <div
      className="fixed left-0 right-0 z-50 flex justify-center pointer-events-none animate-slideDown"
      style={{
        top: "max(1rem, env(safe-area-inset-top))",
      }}
    >
      <nav
        className="flex items-center gap-3 pointer-events-auto px-5 py-2 rounded-full"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
        }}
      >
        {/* Logo — left side */}
        <button
          onClick={() => router.push("/")}
          onMouseEnter={() => setIsHovered("logo")}
          onMouseLeave={() => setIsHovered(null)}
          className="cursor-pointer flex-shrink-0 mr-1 sm:mr-2 transition-transform duration-150"
          style={{
            transform: isHovered === "logo" ? "scale(1.15)" : "scale(1)",
          }}
          aria-label="Go to homepage"
        >
          <Image
            src="/favicon.ico"
            alt="Fumi logo"
            width={32}
            height={32}
            className="w-8 h-8 sm:w-7 sm:h-7"
            priority
          />
        </button>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {navLinks.map((nav) => {
            const isActive = activeLink.path === nav.path;
            return (
              <button
                key={nav.path}
                onClick={() => router.push(nav.path)}
                className="relative z-10 px-3 py-2 border-none outline-none cursor-pointer select-none rounded-md min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                {/* Active pill background */}
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-full transition-all duration-200"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      boxShadow:
                        "0 0 0 1px rgba(255, 255, 255, 0.35), 0 0 10px rgba(255, 255, 255, 0.08)",
                    }}
                  />
                )}
                <span
                  className={`relative z-10 text-base sm:text-sm tracking-wide transition-all duration-200 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-white/60 font-normal hover:text-white/80"
                  }`}
                  style={{
                    textShadow: isActive
                      ? "0 0 16px rgba(255, 255, 255, 0.5)"
                      : "none",
                  }}
                >
                  {nav.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Haunt logo — right side */}
        <button
          onClick={handleHauntClick}
          onMouseEnter={() => setIsHovered("haunt")}
          onMouseLeave={() => setIsHovered(null)}
          className="cursor-pointer flex-shrink-0 ml-1 sm:ml-2 transition-transform duration-150"
          style={{
            transform: isHovered === "haunt" ? "scale(1.15)" : "scale(1)",
          }}
          aria-label="Visit Haunt.gg profile"
        >
          <Image
            src="/hauntgg.png"
            alt="Haunt.gg logo"
            width={32}
            height={32}
            className="w-8 h-8 sm:w-7 sm:h-7"
          />
        </button>
      </nav>
    </div>
  );
}
