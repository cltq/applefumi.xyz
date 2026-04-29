"use client";
import { useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const navLinks = [
  { label: "Home", path: "/" },
  // { label: "About", path: "/about" },
  { label: "Test", path: "/test" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  const normalizedPath = pathname?.replace(/\/$/, "") || "/";
  const activeLink =
    navLinks.find((item) => item.path === normalizedPath) || navLinks[0];

  return (
    <div
      className="fixed left-0 right-0 z-50 flex justify-center pointer-events-none"
      style={{
        top: "1rem",
      }}
    >
      <nav
        ref={navRef}
        className="flex items-center justify-between pointer-events-auto"
        style={{
          width: "auto",
          padding: "0.5rem 1.2rem",
          borderRadius: "500px",
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          boxShadow: "none",
        }}
      >
        {/* Logo — left side */}
        <div className="flex items-center flex-shrink-0">
          <button
            onClick={() => router.push("/")}
            className="cursor-pointer hover:scale-110 transition-transform duration-200"
          >
            <Image
              src="/favicon.ico"
              alt="logo"
              width={24}
              height={24}
              className="w-5 h-5 sm:w-7 sm:h-7"
            />
          </button>
        </div>

        {/* Nav links — right side */}
        <div className="flex items-center gap-1">
          {navLinks.map((nav) => {
            const isActive = activeLink.path === nav.path;
            return (
              <button
                key={nav.path}
                onClick={() => router.push(nav.path)}
                className="relative z-10 px-3 sm:px-2 py-1.5 text-xs sm:text-sm border-none outline-none cursor-pointer select-none transition-all duration-300 ease-in-out hover:scale-105 font-[family-name:var(--font-geist-mono)] rounded-md"
                style={{
                  background: "transparent",
                  color: isActive
                    ? "rgb(255, 255, 255)"
                    : "rgba(255, 255, 255, 0.56)",
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: "0.02em",
                  textShadow: isActive
                    ? "0 0 16px rgba(255, 255, 255, 0.5)"
                    : "none",
                  borderRadius: "6px",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "rgba(255,255,255,0.95)";
                    (e.currentTarget as HTMLButtonElement).style.textShadow =
                      "0 0 12px rgba(255, 255, 255, 0.4)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "rgba(255,255,255,0.7)";
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
        <div className="flex items-center flex-shrink-0">
          <button
            onClick={async () => {
              // Open window synchronously (required by mobile browsers to avoid popup block)
              const win = window.open('https://haunt.gg/fumi', '_blank', 'noopener,noreferrer');
              try {
                const response = await fetch('/api/s/haunt');
                const data = await response.json();
                if (data.url && win && !win.closed) {
                  win.location.href = data.url;
                }
              } catch (error) {
                console.error('Failed to fetch redirect URL:', error);
                // Window already opened with fallback URL — nothing more to do
              }
            }}
            className="cursor-pointer hover:scale-110 transition-transform duration-200"
          >
            <Image
              src="/hauntgg.png"
              alt="logo"
              width={25}
              height={25}
              className="w-5 h-5 sm:w-7 sm:h-7"
            />
          </button>
        </div>
      </nav>
    </div>
  );
}
