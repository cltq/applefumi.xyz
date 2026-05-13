"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useCallback, useState, ReactElement } from "react";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Test", path: "/test" },
  { label: "Test2", path: "/testt" },
];

const NAV_STYLES = {
  container:
    "w-full max-w-3xl rounded-2xl border border-white/10 bg-black/70 shadow-[0_0_50px_rgba(0,0,0,0.4)] font-[family-name:var(--font-geist-mono)]",
  topBar: "flex items-center px-4 py-3 md:px-6 md:py-3",
  spacer: "flex-1",
};

interface NavLinkProps {
  nav: (typeof NAV_LINKS)[0];
  isActive: boolean;
  onClick: () => void;
}

function DesktopNavLink({ nav, isActive, onClick }: NavLinkProps): ReactElement {
  return (
    <button
      key={nav.path}
      onClick={onClick}
      className="relative px-3 py-1.5 text-sm font-medium transition-all duration-200"
    >
      <span className={`relative z-10 ${isActive ? "text-white" : "text-white/60 hover:text-white"}`}>
        {nav.label}
      </span>
      <div
        className={`absolute inset-0 rounded-md bg-white/10 transition-all duration-300 ${
          isActive ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      />
    </button>
  );
}

function NavbarLogo({
  isHovered,
  onClick,
  onHoverEnter,
  onHoverLeave,
}: {
  isHovered: string | null;
  onClick: () => void;
  onHoverEnter: () => void;
  onHoverLeave: () => void;
}): ReactElement {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverLeave}
      className="flex items-center justify-center transition-transform duration-200"
      style={{
        transform: isHovered === "logo" ? "scale(1.08)" : "scale(1)",
      }}
      aria-label="Go to homepage"
    >
      <Image
        src="/favicon.ico"
        alt="Fumi logo"
        width={36}
        height={36}
        className="rounded-lg"
        priority
      />
    </button>
  );
}

function HauntButton({
  isHovered,
  onClick,
  onHoverEnter,
  onHoverLeave,
}: {
  isHovered: string | null;
  onClick: () => void;
  onHoverEnter: () => void;
  onHoverLeave: () => void;
}): ReactElement {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverLeave}
      className="flex items-center justify-center transition-transform duration-200"
      style={{
        transform: isHovered === "haunt" ? "scale(1.08)" : "scale(1)",
      }}
      aria-label="Visit Haunt.gg profile"
    >
      <Image
        src="/hauntgg.png"
        alt="Haunt.gg logo"
        width={36}
        height={36}
        className="rounded-lg"
      />
    </button>
  );
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const normalizedPath = pathname?.replace(/\/$/, "") || "/";
  const activeLink = NAV_LINKS.find((item) => item.path === normalizedPath) || NAV_LINKS[0];

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

  const handleNavClick = useCallback((path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  }, [router]);

  return (
    <div
      className="fixed inset-x-0 z-50 flex justify-center px-4"
      style={{
        top: "max(1rem, env(safe-area-inset-top))",
      }}
    >
      <nav className={`${NAV_STYLES.container} relative`}>
        {/* TOP BAR */}
        <div className={NAV_STYLES.topBar}>
          {/* LEFT */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <NavbarLogo
              isHovered={isHovered}
              onClick={() => router.push("/")}
              onHoverEnter={() => setIsHovered("logo")}
              onHoverLeave={() => setIsHovered(null)}
            />
            <span
              className="text-xl font-bold tracking-tight text-white"
              style={{
                textShadow: "0 0 20px rgba(255,255,255,0.2)",
              }}
            >
              AppleFumi
            </span>
          </div>

          {/* SPACER */}
          <div className={NAV_STYLES.spacer} />

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-1 mr-5">
            {NAV_LINKS.map((nav) => (
              <DesktopNavLink
                key={nav.path}
                nav={nav}
                isActive={activeLink.path === nav.path}
                onClick={() => router.push(nav.path)}
              />
            ))}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            {/* MOBILE HAMBURGER */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="md:hidden flex items-center justify-center p-2 rounded-md transition-colors duration-200 hover:bg-white/10 min-h-[44px] min-w-[44px]"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <div className="flex flex-col gap-[5px] w-5">
                <span
                  className={`block h-[2px] bg-white/60 rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                  }`}
                />
                <span
                  className={`block h-[2px] bg-white/60 rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-[2px] bg-white/60 rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                  }`}
                />
              </div>
            </button>

            <HauntButton
              isHovered={isHovered}
              onClick={handleHauntClick}
              onHoverEnter={() => setIsHovered("haunt")}
              onHoverLeave={() => setIsHovered(null)}
            />
          </div>
        </div>

        {/* MOBILE SIDEBAR */}
        <div
          className={`md:hidden absolute right-0 top-[calc(100%-1rem)] border-x border-b border-white/10 bg-black/40 backdrop-blur-xl rounded-b-2xl rounded-t-none shadow-[0_0_50px_rgba(0,0,0,0.4)] font-[family-name:var(--font-geist-mono)] transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? "w-48 opacity-100" : "w-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-1 p-4 whitespace-nowrap">
            {NAV_LINKS.map((nav) => {
              const isActive = activeLink.path === nav.path;
              return (
                <button
                  key={nav.path}
                  onClick={() => handleNavClick(nav.path)}
                  className={`px-3 py-2 text-sm font-medium text-right rounded-md transition-all duration-200 ${
                    isActive ? "text-white bg-white/10" : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {nav.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}